/* Copyright 2024 - Herber eDevelopment - Jaroslav Herber */

var oEpgChannelContainer = getEl('epg_container'), oEpgChannelContent = getEl('epg'), oEpgClock = getEl('epg_overview_time'), oEpgNavClock = getEl('epg_nav_time'),
oNavChannelEpg = getEl('epg_nav_channel'), iEpgClockTimer = false, oEpgTimeShiftInput = getEl('epg_time_shift'), iEpgTimeShift = 0,
oEpgGrapIntervalInput = getEl('epg_grab_interval'), oEpgDownloadStatus = getEl('epg_downloaded'), oEpgProgramDownloadStatus = getEl('epg_downloaded_programms');

var bDbInitiated = false, oDb = false, sLoadingFromDb = false, iDbVersion = 10, bIsGrabbing = false, bNeedEpgUpdate = false, bEpgTableBuilt = false, aAltIds = {},
iSecondsSinceEpgOverviewRefresh = 0, iSecondsSinceEpgNavListRefresh = 0, iSecondsSinceEpgChannelRefresh = 0,
bEpgNavListBuilt = false, iEpgNavListClockTimer = false, iSelectedEpgOverviewChannel = false;

var iEpgOverviewScrollMin = 0, iEpgOverviewScrollMax = 0, iLastOverviewScrollPos = 0, aLazyLoadedOverviewItems = [], iEpgOverviewItemHeight = 49;


Date.prototype.addHours = function( h ) {
	this.setTime(this.getTime() + (h*3600000));
	return this;
};

Date.prototype.subHours = function( h ) {
	this.setTime(this.getTime() - (h*3600000));
	return this;
};

function getTimeNow() {

	if( iEpgTimeShift ) {
		var oDateNowLocal = new Date();
		oDateNowLocal.addHours(iEpgTimeShift);
		return oDateNowLocal.getTime();
	} else {
		return new Date().getTime();
	}

}

function insertCharAt( sString, sChar, iPos ) {
	return sString.substring(0, iPos) + sChar + sString.substring(iPos);
}


function syncScrollEpgList(oNav) {

	if( bEpgLoaded ) {
		oEpgChannelList.scrollTop = oNav.scrollTop;
	}

}


function getEpgDateObject( sTimeString, iAddTimezoneHours ) {

	if( sTimeString ) {

		var oDate = new Date(sTimeString);
		var iTimezoneOffset = oDate.getTimezoneOffset();
		if( iTimezoneOffset ) {
			oDate.addHours(Math.round(iTimezoneOffset / 60 * -1));
		}

		if( iAddTimezoneHours ) {
			iAddTimezoneHours = Math.round(iAddTimezoneHours / 100);
			if( iAddTimezoneHours ) {
				oDate.addHours(iAddTimezoneHours);
			}
		}

		return oDate;

	}

	return false;

}


function getEpgTimeString( oDate, aOptions ) {

	var aOptions = aOptions || {
		hour: '2-digit',
		minute: '2-digit'
	};

	return oDate.toLocaleTimeString(navigator.language, aOptions);

}


var bEpgClockInit = false;
function initEpgClock() {

	if( bEpgClockInit ) {
		return false;
	}

	bEpgClockInit = true;

	/*if( iEpgNavListClockTimer ) {
		clearInterval(iEpgNavListClockTimer);
	}*/

	if( iEpgClockTimer ) {
		clearInterval(iEpgClockTimer);
	}

	epgTimer();
	iEpgClockTimer = setInterval(function() {
		epgTimer();

		iSecondsSinceEpgNavListRefresh++;
		iSecondsSinceEpgOverviewRefresh++;
		iSecondsSinceEpgChannelRefresh++;
		// Wenn Ãœbersicht geÃ¶ffnet, dann jede Minute Tabelle aktualisieren
		if( bEpgOverviewOpened && iSecondsSinceEpgOverviewRefresh > 120 ) {
			refreshEpgOverviewTable();
		}
		if( bNavOpened && iSecondsSinceEpgNavListRefresh > 60 ) {
			refreshEpgNavList();
		}

		if( sLoadingFromDb && iSecondsSinceEpgChannelRefresh > 60 ) {
			sLoadingFromDb = false;
			iSecondsSinceEpgChannelRefresh = 0;
		}
	}, 1000);

}


/*
function refreshAltIds() {

	return false;

	if( Object.keys(aAltIds).length || !oDb ) {
		return false;
	}

	debug('refreshAltIds start');

	var oRequest = oDb.transaction("epgAlternativeIds").objectStore("epgAlternativeIds").openCursor();
	oRequest.onsuccess = function() {
		var oRecord = event.target.result;
		if( oRecord ) {
			if( oRecord.value.name ) {
				aAltIds[oRecord.value.name] = oRecord.value.id;
			}
			oRecord.continue();
		} else {
			iSecondsSinceEpgNavListRefresh = 9999;
			iSecondsSinceEpgOverviewRefresh = 9999;
			bNeedNavRefresh = true;
			debug('refreshAltIds done');
		}
	};

}


var sLastFoundAlternativeId = false;
function getAlternativeNameId( sTvgName ) {

	refreshAltIds();

	if( aAltIds[sTvgName] && aAltIds[sTvgName] !== sTvgName ) {
		return aAltIds[sTvgName];
	}

	return false;

}*/


function updateEpgTimeShift( bForceUpdate ) {

	var bForceUpdate = bForceUpdate || false;
	if( bForceUpdate ) {
		bNeedEpgUpdate = true;
	}

	iEpgTimeShift = oEpgTimeShiftInput.value; // global var
	localStorage.setItem('sEpgTimeShiftSetting', iEpgTimeShift);
	getEl('epg_time_shift_output').innerText = '(' + parseFloat(iEpgTimeShift).toFixed(1) + ' h)';

	bEpgNavListBuilt = false;
	bEpgTableBuilt = false;
	iSecondsSinceEpgNavListRefresh = 9999;
	iSecondsSinceEpgOverviewRefresh = 9999;
	iSecondsSinceEpgChannelRefresh = 9999;
	resetEpgStatus();

}


function updateEpgGrabInterval( bForceUpdate ) {

	var bForceUpdate = bForceUpdate || false;
	if( bForceUpdate ) {
		bNeedEpgUpdate = true;
	}

	setGrabbingInterval();

	if( isEpgOutdated() ) {
		startEgpGrabbing();
	}

}


function isEpgOutdated() {

	var sLastUpdateTime = localStorage.getItem('sEpgLastUpdated'),
		sLastEpgUrl = localStorage.getItem('sEpgLastUrl');

	if( sLastEpgUrl !== getEpgUrl() ) {
		return true;
	}

	var iGrabIntervalSetting = oEpgGrapIntervalInput.value;
	if( sLastUpdateTime && iGrabIntervalSetting ) {
		var bIsOutdated = ( Date.now() - (iGrabIntervalSetting * 3600000) > parseInt(sLastUpdateTime) );
		if( !bIsOutdated ) {
			var sLastDownloadDate = new Date(parseInt(sLastUpdateTime)).toLocaleString();
			debug('no EPG download needed. Last download was on ' + sLastDownloadDate);
			oEpgDownloadStatus.innerText = sLastDownloadDate;
			oEpgDownloadStatus.className = 'icon icon-check';
		}
		return bIsOutdated;
	}

	return true;

}


// EPG DB
function initDb() {

	try {
		var oDbOpen = indexedDB.open("m3u", iDbVersion);

		oDbOpen.onupgradeneeded = function() {
			debug('onupgradeneeded');
			oDb = oDbOpen.result;

			// recreate DB
			for( var i = 0; i < oDb.objectStoreNames.length; i++ ) {
				oDb.deleteObjectStore(oDb.objectStoreNames[i]);
			}

			createObjectStores(oDb);
		};

		oDbOpen.onsuccess = function() {
			// Start a new transaction
			oDb = oDbOpen.result;

			if( oDb.objectStoreNames.length < 2 ) {
				//createObjectStores(oDb);
				debug("DB recreation neeeded");
			}
			debug('db open success');
			bDbInitiated = 'OK';

		};
		oDbOpen.onerror = function(event) {
			debug("Error loading db");
		};

	} catch( e ) {
		debug(e.message);
	}

}


function loadEpgDb() {

	if( !bDbInitiated && getEnabledEpgSetting() == '1' ) {

		bDbInitiated = 'ERROR'; // Is overwriten if success
		initDb();

	}

}


function stopDb() {

	if( oDb ) {
		oDb.close();
		debug('db closed');

		bDbInitiated = false;
		oDb = false;
	}

}


function createObjectStores( oDb ) {

	try {
		var oStore = oDb.createObjectStore("epgStore", {keyPath: "id"});

		//oStore = oDb.createObjectStore("epgAlternativeIds", {keyPath: 'name'});
		//oStore.createIndex("id", "name", { unique: false });

		oStore = oDb.createObjectStore("epgProgramme", {keyPath: ['id', 'start']});
		oStore.createIndex("id", "id", { unique: false });
	} catch( e ) {
		debug(e.message);
	}

}


function parseAlternativeChannelIds( oStore, sContent, sId ) {

	var aMatches = sContent.match(/<display-name[^>]*>([\s\S]*?)<\/display-name>/g);

	if( aMatches ) {
		var iCount = aMatches.length;
		for( var i = 0; i < iCount; i++ ) {

			var sDisplayTag = aMatches[i];
			var sDisplayName = getMatch(sDisplayTag, /<display-name[^>]*>(.+)<\/display-name>/),
				sLangId = getMatch(sDisplayTag, /lang="([^"]+)"/);
			oStore.put({id: sId, name: sDisplayName, lang: sLangId});

		}
	}

}


var oActiveWorker = false;
function loadEpgSource( sUrl ) {

	if( getEnabledEpgSetting() == '0' ) {
		bIsGrabbing = false;
		return false;
	}

	if( !aChannelList ) {
		debug('no playlist to grab against. Please load playlist first');
		return false;
	}

	if( !bPlaylistEpgCompatible ) {
		notCompatibleHandler();
		return false;
	}

	if( !bNeedEpgUpdate && isEpgOutdated() ) {
		bNeedEpgUpdate = true;
	}

	if( !bNeedEpgUpdate ) {
		showElement('epg_activator');
		bEpgLoaded = true;
		document.body.classList.add('epg-loaded');
		bIsGrabbing = false;

		if( bNavOpened ) {
			bEpgNavListBuilt = false;
			buildEpgNavList();
		}

		if( bEpgOverviewOpened ) {
			buildEpgOverview();
		}
		return false;
	}

	loadEpgDb();

	bEpgLoaded = false; aAltIds = {};
	document.body.classList.remove('epg-loaded');
	oEpgDownloadStatus.innerText = getLang('epgIsDownloading') + '...';
	oEpgDownloadStatus.className = 'e-loading';
	oEpgProgramDownloadStatus.innerText = '';
	hideElement('epg_activator');

	if( window.Worker ) {

		if( oActiveWorker ) {
			oActiveWorker.terminate();
			oActiveWorker = false;
		}

		bNeedEpgUpdate = false;
		bIsGrabbing = true;

		var sLangEpgChannelsProcessed = getLang('epgChannelsProcessed');
		var sLangEpgProgramsProcessed = getLang('epgProgramsProcessed');

		debug('Start epg download worker. Try grab EPG: ' + sUrl);
		oActiveWorker = new Worker("./js/epg-worker.js?v=h" + iDbVersion);

		oActiveWorker.postMessage({
			'url': sUrl,
			'timeshift': iEpgTimeShift,
			'interval': oEpgGrapIntervalInput.value,
			'version': iDbVersion,
			'playlist': aChannelList
		});

		oActiveWorker.onmessage = function(e) {
			var sResponseText = e.data;
			if( sResponseText ) {

				if( typeof(sResponseText) === 'object' ) {
					aAltIds[sResponseText.name] = sResponseText.id;
					return true;
				} else if( sResponseText.indexOf('OK channels: ') == 0  ) {
					oEpgDownloadStatus.innerText = sResponseText.replace('OK channels: ', sLangEpgChannelsProcessed);
					return true;
				} else if( sResponseText.indexOf('OK programms: ') == 0  ) {
					oEpgProgramDownloadStatus.innerText = sResponseText.replace('OK programms: ', sLangEpgProgramsProcessed);
					return true;
				} else if( sResponseText.indexOf('DB ERROR: ') == 0  ) {
					if( sResponseText === 'DB ERROR: Not enough space' ) {
						showModal(getLang('epgQuotaExceededError'));
					} else {
						showModal(sResponseText);
					}
					resetEpgStatus();
					oEpgDownloadStatus.innerText = sResponseText.replace('DB ERROR: ', '');
					return true;
				}

				switch( sResponseText ) {
					case 'downloading':
						oEpgDownloadStatus.innerText = getLang('epgIsDownloading');
						break;
					case 'playlist not compatible':
						resetEpgStatus();
						notCompatibleHandler();
						break;
					case 'finish insertChannels':
					case 'start programmsImport':
						oEpgDownloadStatus.className = 'icon icon-check';
						oEpgProgramDownloadStatus.className = 'e-loading';
						oEpgProgramDownloadStatus.innerText = sLangEpgProgramsProcessed + '...';
						break;
					case 'finish':
						bEpgLoaded = true;
						bIsGrabbing = false;
						document.body.classList.add('epg-loaded');
						showElement('epg_activator');
						oEpgDownloadStatus.className = 'icon icon-check';
						oEpgProgramDownloadStatus.className = 'icon icon-check';

						localStorage.setItem('sEpgLastUpdated', Date.now()),
						localStorage.setItem('sEpgLastUrl', sUrl);

						if( bNavOpened ) {
							bEpgNavListBuilt = false;
							buildEpgNavList();
						}

						if( bEpgOverviewOpened ) {
							buildEpgOverview();
						}
						break;

					default:
						resetEpgStatus();
						oEpgDownloadStatus.innerText = sResponseText;
				}

			}

		};

		oActiveWorker.onerror = function(e) {
			bIsGrabbing = false;
			resetEpgStatus();
			oEpgDownloadStatus.innerText = e.message;
		};

	} else {
		debug('Your device doesn\'t support web workers.');
		bIsGrabbing = false;
	}
}


function epgItemClick( oEl, oEv ) {

	// Zoom image
	if( oEv.target.classList.contains('p-icon') ) {
		oEl.classList.toggle('p-zoom');
	} else {

		// Remove previous click-classes from other epg-items
		var oItems = document.getElementsByClassName('p-item');
		if( oItems ) {
			[].forEach.call(oItems, function(oItem) {
				if( oItem !== oEl ) {
					oItem.classList.remove('p-zoom', 'active');
				}
			});
		}

		// Open extended channel info
		if( oEl.classList.contains('short') ) {
			oEl.classList.toggle('active');
		}

	}

}



function loadChannelEpg( iChNum, sTvgId ) {

	if( !bEpgLoaded ) {
		return false;
	}

	iChNum = iChNum || iCurrentChannel;
	iChNum--; // because iCurrentChannel is not key value

	var sTvgId = sTvgId || false, sAltId = sTvgId;

	if( !sTvgId && iChNum >= 0 ) {
		var aCurrentChannel = aChannelList[iChNum];
		if( aCurrentChannel && typeof(aCurrentChannel.tvgid) === 'string' ) {
			sTvgId = aCurrentChannel.tvgid;
		}
	}

	if( !sTvgId ) {
		oEpgChannelContent.innerHTML = getLang('noEpgForChannel');
		oEpgChannelContainer.classList.add('no-epg');
		sLoadingFromDb = false;
	}
	else if( sLoadingFromDb !== sTvgId && oDb ) {

		oEpgChannelContent.innerHTML = getLang('epgIsDownloading');
		oEpgChannelContainer.className = '';

		sLoadingFromDb = sTvgId;
		var iReferredChannel = iChNum + 1, iDateNow = getTimeNow();
		var oRequest = oDb.transaction("epgStore").objectStore("epgStore").get(sTvgId);
		oRequest.chNum = iChNum;

		//debug('load from db...' + sTvgId);
		oRequest.onsuccess = function() {

			if( !this.result ) {

				oEpgChannelContent.innerHTML = getLang('noEpgForChannel');
				oEpgChannelContainer.classList.add('no-epg');

			}
			else if( this.result.id ) {

				if( this.result.epgid ) {
					sTvgId = this.result.epgid;
				}

				bChannelHasEpg = true;
				oChannelInfo.classList.add('show-epg');

				oEpgChannelContainer.classList.add('has-epg');

				var sEpgHtml = '<div class="epg-chno">' + iReferredChannel + '</div>',
					sProgrammHtml = '', sMoreProgrammHtml = ''; //, sContent = this.result.xml;

				var sDisplayName = this.result.name; // getMatch(sContent, /<display-name>(.+)<\/display-name>/);
				var sIconUrl = this.result.icon; // getMatch(sContent, /<icon src="([^"]+)"/);

				if( sIconUrl ) {
					sEpgHtml += '<div class="epg-icon-container"><img class="epg-icon" src="' + sIconUrl + '"></div>';

				} else if( sDisplayName ) {
					sEpgHtml = '<h2 class="epg-title">' + sDisplayName + '</h2>';
				}

				// Get program
				var oProgramIndex = oDb.transaction("epgProgramme").objectStore("epgProgramme").index('id');
				//oProgramIndex.get(sTvgId);
				var singleKeyRange = IDBKeyRange.only(sTvgId);

				var iCount = 0;

				oEpgChannelContent.innerHTML = sEpgHtml;
				oEpgChannelContainer.classList.remove('no-epg');

				oProgramIndex.openCursor(singleKeyRange).onsuccess = function(event) {
					var oRecord = event.target.result;
					if( oRecord && oRecord.value ) {

						var tStart = oRecord.value.start, tStop = oRecord.value.stop,
							tzShift = oRecord.value.tz;

						//sContent = oRecord.value.xml;
						// "<programme start=\"20221023092500 +0000\" stop=\"20221023101000 +0000\" channel=\"ZDFinfo.de\"><title lang=\"de\">Da Vinci Code an der Loire</title></programme>"

						// Check time
						var oStartTime = getEpgDateObject(tStart, tzShift);
						var oEndTime = getEpgDateObject(tStop, tzShift);

						if( !oStartTime || !oEndTime ) {
							oRecord.continue();
							return true;
						}

						// expired
						if( iDateNow > oEndTime.getTime() ) {
							oRecord.continue();
							return true;
						}

						var sTitle = oRecord.value.title; //getMatch(sContent, /<title([^>]+)>(.+)<\/title>/, 2);
						var sDesc = oRecord.value.desc; //getMatch(sContent, /<desc([^>]+)>(.+)<\/desc>/, 2);
						var sIcon = oRecord.value.icon; //getMatch(sContent, /<icon src="([^"]+)"/, 1);

						sProgrammHtml = '';

						// Channel > 1. Short Preview
						if( iCount > 0 ) {
							if( iCount === 1 ) {
								sProgrammHtml = '<p class="p-after">' + getLang('epgAfter') + ' <span class="HR"></span></p>';
							}
							sProgrammHtml += '<div class="p-item short" onclick="epgItemClick(this, event);">';
						} else {
							sProgrammHtml = '<p class="p-now">' + getLang('epgNow') + ' <span class="HR"></span></p>';
							sProgrammHtml += '<div class="p-item" onclick="epgItemClick(this, event);">';

							// Current program in channel info
							if( oRecord.value.duration ) {
								if( oStartTime.getTime() < iDateNow ) {
									var iElapsedPct = Math.round(((iDateNow - oStartTime.getTime()) / (oEndTime.getTime() - oStartTime.getTime())) * 100);
									oChannelEpg.innerHTML = /*getLang('epgNow') + ':<br>'*/ '<div id="channel_info_epg_timeline"><div id="channel_info_epg_elapsed" style="width: ' + iElapsedPct + '%"></div></div>' + sTitle;
								}
							}

						}

						// Ausgabe
						if( iEpgTimeShift ) {
							oEndTime.subHours(iEpgTimeShift);
							oStartTime.subHours(iEpgTimeShift);
						}

						var sStartTime = getEpgTimeString(oStartTime);
						var sEndTime = getEpgTimeString(oEndTime);

						if( sIcon ) {
							sProgrammHtml += '<img class="p-icon" src="' + sIcon + '">';
							sProgrammHtml += '<div class="p-body has-image">';
						} else {
							sProgrammHtml += '<div class="p-body">';
						}

						if( sTitle ) {
							sProgrammHtml += '<h3 class="p-title">' + sTitle + '</h3>';
						}

						if( sStartTime ) {
							sProgrammHtml += '<p class="p-time"><i class="NOBR">' + sStartTime + '</i> - <i class="NOBR">' + sEndTime + '</i></p>';
						}

						if( sDesc ) {
							sProgrammHtml += '<p class="p-desc">' + sDesc + '</p>';
						}
						sProgrammHtml += '</div>';

						sProgrammHtml += '<div class="CLEAR"></div></div>';

						iCount++;
						if( iCount > 5 ) {
							sMoreProgrammHtml += sProgrammHtml;
						} else {
							oEpgChannelContent.innerHTML += sProgrammHtml;
						}

						oRecord.continue();
					}
				};

			}
		};
		oRequest.oncomplete = function() {
			debug('EPG complete');
		};
		oRequest.onerror = function() {
			debug('EPG onerror');
		};

	}

}


function buildEpgNavList() {

	if( !bEpgLoaded ) {
		oEpgChannelList.innerHTML = '';
		return false;
	}

	if( bEpgNavListBuilt ) {
		if( iSecondsSinceEpgNavListRefresh > 120 ) {
			refreshEpgNavList();
		}
		return true;
	}

	if( aFilteredChannelList.length === 0 ) {
		oEpgChannelList.innerHTML = '';
	} else if( oDb ) {

		var sTableHtml = '', sProgrammHtml = '';

		/*var iMinChannel = 1, iMaxChannel = aFilteredChannelList.length + 1;
		for( var i = iMinChannel; i < iMaxChannel; i++ ) {
			var iChNum = i - 1;
			if( typeof(aFilteredChannelList[iChNum]) !== 'undefined' ) {
				sTableHtml += '<li id="en-c' + iChNum + '"></li>';
			}
		}*/

		/*for( var iChNum in aFilteredChannelList ) {
			if( typeof(aFilteredChannelList[iChNum]) !== 'undefined' ) {
				sTableHtml += '<li id="en-c' + iChNum + '"></li>';
			}
		}*/

		var iHeight = getEl('channel_list_ul').offsetHeight;
		oEpgChannelList.innerHTML = '<ul id="epg_nav_channels" style="height: ' + iHeight + 'px">' + sTableHtml + '</ul>';
		syncScrollEpgList(oChannelList);

		refreshEpgNavList();
		initEpgClock();

		bEpgNavListBuilt = true;
	}

}


function buildEpgOverview() {

	if( bEpgTableBuilt ) {
		if( iSecondsSinceEpgOverviewRefresh > 120 ) {
			refreshEpgOverviewTable();
		}
		return true;
	}

	if( oDb && iCurrentChannel ) {

		var sTableHtml = '', sProgrammHtml = '', aCurrentChannel = aChannelList[iCurrentChannel - 1];
		var iMinChannel = 1, iMaxChannel = aChannelList.length + 1;

		/*
		if( aCurrentChannel && typeof(aCurrentChannel.tvgid) === 'string' ) {
			//sTvgId = aCurrentChannel.tvgid;
		}

		var iMinChannel = iCurrentChannel - 10, iMaxChannel = iCurrentChannel + 10;

		if( iMinChannel < 0 ) {
			iMinChannel = 0;
		}

		if( iMaxChannel >= aChannelList.length ) {
			iMaxChannel = aChannelList.length;
		}*/

		//debug('load overview from db...');
		for( var i = iMinChannel; i < iMaxChannel; i++ ) {
			var iChNum = i - 1;
			if( typeof(aChannelList[iChNum]) !== 'undefined' ) {
				/*
				var sActiveClass = '';
				if( iChNum === iCurrentChannel ) {
					sActiveClass = ' active';
				}
				*/

				sTableHtml += '<div id="e-n' + iChNum + '" class="e-name" onclick="loadChannel(' + i + ')">' + i + '. ' + aChannelList[iChNum].name;

				if( typeof(aChannelList[iChNum].tvgid) === 'string' && aChannelList[iChNum].tvgid ) {
					sProgrammHtml += '<div id="e-ch' + iChNum + '" class="e-prog-row e-loading" data-tvgid="' + aChannelList[iChNum].tvgid + '"></div>';
				} else {
					sProgrammHtml += '<div class="e-prog-row">' + getLang('noEpgForChannel') + '</div>';
				}

				sTableHtml += '</div>';
			}
		}

		oEpgOverview.innerHTML = '<div id="epg_channels">' + sTableHtml + '</div><div id="epg_programme" class="custom-scrollbar">' + sProgrammHtml + '</div>';
		iSelectedEpgOverviewChannel = false;

		oEpgOverview.scrollTop = ((iCurrentChannel - 1) * 49) - 200;
		refreshEpgOverviewTable();
		initEpgClock();

		bEpgTableBuilt = true;

	}

}


function epgTimer() {
	var oDateNow = new Date();
	/*
	let h = oDateNow.getHours();
	let m = oDateNow.getMinutes();
	let s = oDateNow.getSeconds();
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	oEpgClock.innerHTML = h + ":" + m + ":" + s;
	oEpgNavClock.innerHTML = h + ":" + m + ":" + s;
	*/

	var sTime = getEpgTimeString(oDateNow, {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	oEpgClock.innerHTML = sTime;
	oEpgNavClock.innerHTML = sTime;
}


function loadOverviewChannel( iChNum, sAltId ) {

	if( oDb && typeof(aChannelList[iChNum]) !== 'undefined' && typeof(aChannelList[iChNum].tvgid) === 'string' ) {

		var sAltId = sAltId || false;
		var sTvgId = sAltId ? sAltId : aChannelList[iChNum].tvgid;

		if( !sTvgId ) {
			return false;
		}

		var oRequest = oDb.transaction("epgStore").objectStore("epgStore").get(sTvgId);

		if( typeof(aChannelList[iChNum].tvgn) === 'string' ) {
			oRequest.altId = aChannelList[iChNum].tvgn;
		}

		oRequest.chNum = iChNum;
		oRequest.dropUp = (iChNum > 3 && (iChNum + 6 > aChannelList.length));

		oRequest.onsuccess = function(ev) {

			//var oInsert = document.querySelector('div[data-tvgid="' + this.sTvgId + '"]');
			var oInsert = getEl('e-ch' + this.chNum), bDropUp = this.dropUp;
			if( !oInsert ) {
				return false;
			}

			oInsert.classList.remove('e-loading');

			if( !this.result ) {

				// Not found. Try with alternative ID / tvg-name
				/*
				if( !sAltId && typeof(aChannelList[this.chNum].tvgn) === 'string' ) {
					var sFoundTvgId = getAlternativeNameId(aChannelList[this.chNum].tvgn);
					if( sFoundTvgId ) {
						// Found! Overwrite tvgid and reload
						aChannelList[this.chNum].tvgid = sFoundTvgId;
						loadOverviewChannel(this.chNum, sFoundTvgId);
						return false;
					}
				}*/

				oInsert.innerHTML = getLang('noEpgForChannel');

			}
			else if( this.result.id ) {

				if( this.result.epgid ) {
					sTvgId = this.result.epgid;
				}

				var sTableHtml = '', sIcon = this.result.icon;
				if( sIcon ) {
					aChannelList[this.chNum].logo = sIcon;
				} else if( aChannelList[this.chNum].logo ) {
					sIcon = aChannelList[this.chNum].logo;
				}

				if( sIcon ) {
					sTableHtml = '<div class="e-logo"><img src="' + sIcon + '"></div>';
				}

				oInsert.innerHTML = sTableHtml;

				var oEpgProgramContainer = document.createElement('div');
				oEpgProgramContainer.className = 'e-prog';

				var singleKeyRange = IDBKeyRange.only(sTvgId), iCount = 0, iDateNow = getTimeNow();

				aChannelList[this.chNum].hasEpg = true;

				oDb.transaction("epgProgramme").objectStore("epgProgramme").index('id')
				.openCursor(singleKeyRange).onsuccess = function(event) {
					var oRecord = event.target.result;
					if( oRecord && oRecord.value ) {

						var oEndTime = getEpgDateObject(oRecord.value.stop, oRecord.value.tz);
						var oStartTime = getEpgDateObject(oRecord.value.start, oRecord.value.tz);
						var sActive = '', sDropUpClass = bDropUp ? ' p-up' : '';

						// expired
						if( iDateNow > oEndTime.getTime() ) {
							oRecord.continue();
							return true;
						}

						var sTimelineWidth = '';
						if( oRecord.value.duration ) {
							var iDuration = oRecord.value.duration;

							if( oStartTime.getTime() < iDateNow ) {
								iDuration = oEndTime.getTime() - iDateNow;
								var iElapsedPct = Math.round(((iDateNow - oStartTime.getTime()) / (oEndTime.getTime() - oStartTime.getTime())) * 100);
								var iRemainingPct = Math.round(100 - iElapsedPct);
								sTimelineWidth = 'background: linear-gradient(90deg, #c99503 0, #ff5e00 ' + iElapsedPct + '%, green ' + iElapsedPct + '%);';
								sActive = ' p-live';
							}

							sTimelineWidth = 'style="' + sTimelineWidth + ' min-width: ' + Math.floor(iDuration / 10000) + 'px"';
						}

						// Ausgabe
						if( iEpgTimeShift ) {
							oEndTime.subHours(iEpgTimeShift);
							oStartTime.subHours(iEpgTimeShift);
						}

						oEpgProgramContainer.innerHTML += '<div class="p-i' + sActive + '" ' + sTimelineWidth + '><b>' + oRecord.value.title + '</b><div class="p-drop' + sDropUpClass + '"><h3 class="p-title">' + oRecord.value.title + '</h3><i class="p-time">' + getEpgTimeString(oStartTime) + ' - ' + getEpgTimeString(oEndTime) + '</i><p class="p-desc">' + oRecord.value.desc + '</p></div></div>';
						iCount++;
					}
					if( oRecord && iCount < 14 ) {
						oRecord.continue();
					}
				};

				oInsert.appendChild(oEpgProgramContainer);

			} else {
				oInsert.innerHTML = getLang('noEpgForChannel');
			}

		};

		oRequest.oncomplete = function() {
			debug('EPG complete');
		};
		oRequest.onerror = function() {
			debug('EPG onerror');
		};
	}

}


var iProgHover = 0;
function moveToEpgOverviewItem( sDir ) {

	var iMaxChannel = aChannelList.length - 1;

	if( iSelectedEpgOverviewChannel === false ) {
		iSelectedEpgOverviewChannel = iCurrentChannel - 1;
	}

	var iType = 1; // 1 = up/down, 2 = left/right

	switch( sDir ) {
		case 'up':
			iSelectedEpgOverviewChannel--;
			if( iSelectedEpgOverviewChannel < 0 ) {
				iSelectedEpgOverviewChannel = iMaxChannel;
			}
			break;
		case 'up10':
			iSelectedEpgOverviewChannel -= 10;
			if( iSelectedEpgOverviewChannel < 0 ) {
				iSelectedEpgOverviewChannel = iMaxChannel;
			}
			break;
		case 'down':
			iSelectedEpgOverviewChannel++;
			if( iSelectedEpgOverviewChannel > iMaxChannel ) {
				iSelectedEpgOverviewChannel = 0;
			}
			break;
		case 'down10':
			iSelectedEpgOverviewChannel += 10;
			if( iSelectedEpgOverviewChannel > iMaxChannel ) {
				iSelectedEpgOverviewChannel = 0;
			}
			break;
		case 'left':
			if( iProgHover ) {
				iProgHover--;
			}
			iType = 2;
			break;
		case 'right':
			iProgHover++;
			iType = 2;
			break;

		case 'enter':
			loadChannel(iSelectedEpgOverviewChannel + 1);
			break;
	}

	try {

		var oSelectedProgramm = document.querySelector('.p-i.hover');
		if( oSelectedProgramm ) {
			oSelectedProgramm.classList.remove('hover');
		}

		if( iType === 1 ) {
			oEpgOverview.scrollTop = (iSelectedEpgOverviewChannel * 49) - 200;
			var oLastActiveEpgCh = document.querySelector('.e-name.selected');
			if( oLastActiveEpgCh ) {
				oLastActiveEpgCh.classList.remove('selected');
			}
			getEl('e-n' + (iSelectedEpgOverviewChannel)).classList.add('selected');
		}

		oSelectedProgramm = document.querySelector('#e-ch' + iSelectedEpgOverviewChannel + ' .e-prog .p-i:nth-child(' + iProgHover + ')');
		if( !oSelectedProgramm && iProgHover > 1 ) {
			oSelectedProgramm = document.querySelector('#e-ch' + iSelectedEpgOverviewChannel + ' .e-prog .p-i:last-child');
			iProgHover--;
		}

		if( oSelectedProgramm ) {
			oSelectedProgramm.classList.add('hover');
			var iScrollLeft = oSelectedProgramm.offsetLeft - 200;
			if( iProgHover < 2 || iScrollLeft < 0 ) {
				iScrollLeft = 0;
			}
			getEl('epg_programme').scrollLeft = iScrollLeft;
		} else {
			getEl('epg_programme').scrollLeft = 0;
			if( iProgHover ) {
				iProgHover = 1;
			}
		}
	} catch( e ) {}

	return true;

}



function loadEpgNavChannel( iChNum, sAltId ) {

	if( oDb && typeof(aChannelList[iChNum]) !== 'undefined' && typeof(aChannelList[iChNum].tvgid) === 'string' ) {

		var sAltId = sAltId || false;
		var sTvgId = sAltId ? sAltId : aChannelList[iChNum].tvgid;

		if( !sTvgId ) {
			return false;
		}

		var oRequest = oDb.transaction("epgStore").objectStore("epgStore").get(sTvgId);

		if( typeof(aChannelList[iChNum].tvgn) === 'string' ) {
			oRequest.altId = aChannelList[iChNum].tvgn;
		}

		oRequest.chNum = iChNum;
		//oRequest.dropUp = ( aChannelList.length > 20 && (iChNum + 10 > aChannelList.length) );

		var iReferredChannel = iChNum;

		oRequest.onsuccess = function(ev) {

			if( !this.result ) {

				// Not found. Try with alternative ID / tvg-name
				/*
				if( !sAltId && typeof(aChannelList[this.chNum].tvgn) === 'string' ) {
					var sFoundTvgId = getAlternativeNameId(aChannelList[this.chNum].tvgn);
					if( sFoundTvgId ) {
						// Found! Overwrite tvgid and reload
						aChannelList[this.chNum].tvgid = sFoundTvgId;
						loadEpgNavChannel(this.chNum, sFoundTvgId);
						return false;
					}
				}*/

			}
			else if( this.result.id ) {

				if( this.result.epgid ) {
					sTvgId = this.result.epgid;
				}

				var oInsert = getEl('en-c' + this.chNum);
				if( !oInsert ) {
					if( typeof(aFilteredChannelList[this.chNum]) !== 'undefined' ) {
						oInsert = document.createElement('li');
						oInsert.id = 'en-c' + this.chNum;
						oInsert.style.top = aFilteredChannelList[this.chNum] * iNavChannelHeight + 'px';
						getEl('epg_nav_channels').appendChild(oInsert);
					}
				}

				if( !oInsert ) {
					return false;
				}

				var sIconUrl = this.result.icon;
				if( sIconUrl ) {
					// Save channel icon in aChannelList, if not exists
					var aTmp = aChannelList[iReferredChannel];

					if( aTmp && (typeof(aTmp.logo) !== 'string' || !aTmp.logo) ) {
						if( iReferredChannel === this.chNum ) {
							aChannelList[iReferredChannel].logo = sIconUrl;

							var oChannel = getEl('nav_ch_' + (iReferredChannel+1));
							if( oChannel && oChannel.className.indexOf('lazy') === -1 ) {
								oChannel.innerHTML += '<div class="nav_logo"><img src="' + sIconUrl + '" /></div>';
							}

							if( (iCurrentChannel - 1) == this.chNum ) {
								sCurrentChannelLogo = sIconUrl;
							}
						}
						//bNeedNavRefresh = true;
					}
				}

				var oEpgProgramContainer = document.createElement('div');
				oEpgProgramContainer.className = 'en-prog';

				var singleKeyRange = IDBKeyRange.only(sTvgId), iCount = 0, iDateNow = getTimeNow();

				aChannelList[this.chNum].hasEpg = true;

				oDb.transaction("epgProgramme").objectStore("epgProgramme").index('id')
				.openCursor(singleKeyRange).onsuccess = function(event) {
					var oRecord = event.target.result;
					if( oRecord && oRecord.value ) {

						var oEndTime = getEpgDateObject(oRecord.value.stop, oRecord.value.tz);
						var oStartTime = getEpgDateObject(oRecord.value.start, oRecord.value.tz);
						var sActive = '', sTimelineWidth = '', sStatus = '';

						// expired
						if( iDateNow > oEndTime.getTime() ) {
							oRecord.continue(); return true;
						}

						if( oRecord.value.duration ) {
							if( oStartTime.getTime() < iDateNow ) {
								var iElapsedPct = Math.round(((iDateNow - oStartTime.getTime()) / (oEndTime.getTime() - oStartTime.getTime())) * 100);
								var iRemainingPct = Math.round(100 - iElapsedPct);

								sActive = ' p-live';
								//sStatus = getLang('epgNow') + ' - ';
								sTimelineWidth = 'style="background-image: linear-gradient(90deg, #c99503 0, #ff5e00 ' + iElapsedPct + '%, green ' + iElapsedPct + '%)"';
							}

							// Ausgabe
							if( iEpgTimeShift ) {
								oStartTime.subHours(iEpgTimeShift);
							}
							sStatus = getEpgTimeString(oStartTime) + ' - ';
						}
						// <div class="p-drop' + sDropUpClass + '"><h3 class="p-title">' + oRecord.value.title + '</h3><i class="p-time">' + oStartTime.toLocaleString() + ' - ' + oEndTime.toLocaleString() + '</i><p class="p-desc">' + oRecord.value.desc + '</p></div>
						oEpgProgramContainer.innerHTML += '<div class="p-i' + sActive + '" ' + sTimelineWidth + '><b>' + sStatus + oRecord.value.title + '</b></div>';

						if( !iCount ) {
							oInsert.innerHTML = '';
							oInsert.appendChild(oEpgProgramContainer);
						}

						iCount++;
					}
					if( oRecord && iCount < 2 ) {
						oRecord.continue();
					}
				};

			}

		};

		oRequest.oncomplete = function() {
			debug('EPG complete');
		};
		oRequest.onerror = function() {
			debug('EPG onerror');
		};
	}

}


function loadChannelEpgCallback() {
	oEpgChannelContent.innerHTML = '';
	//hideEpg();
	loadChannelEpg();
}


var iGrabInterval = false;
function setGrabbingInterval() {

	if( iGrabInterval ) {
		clearInterval(iGrabInterval);
	}

	resetEpgStatus();

	var iGrabIntervalSetting = oEpgGrapIntervalInput.value;
	iGrabInterval = setInterval(function() {
		startEgpGrabbing();
	}, iGrabIntervalSetting * 3600000);

	localStorage.setItem('iEpgGrabingInterval', iGrabIntervalSetting);

}

function notCompatibleHandler() {
	showModal(getLang('epgNotCompatibleWithPlaylist'));
	setEpgEnableSetting(false);
}


function resetEpgStatus() {
	oEpgDownloadStatus.innerText = '';
	oEpgDownloadStatus.className = '';
	oEpgProgramDownloadStatus.innerText = '';
	oEpgProgramDownloadStatus.className = '';
	bIsGrabbing = false;
}


function resetEpgData() {

	if( bDbInitiated === 'ERROR' ) {
		stopDb();
	}

	bEpgLoaded = false;
	bEpgTableBuilt = false;
	bEpgNavListBuilt = false;
	oEpgChannelList.innerHTML = '';
	oEpgOverview.innerHTML = '';
	resetEpgStatus();
	aAltIds = {};

	localStorage.removeItem('sEpgLastUpdated');

	if( iGrabInterval ) {
		clearInterval(iGrabInterval);
	}
}


function downloadEpg() {

	// already in process
	if( bIsGrabbing ) {
		return false;
	}

	bNeedEpgUpdate = true;
	resetEpgData();

	if( getEnabledEpgSetting() == '0' ) {
		setEpgEnableSetting(true);
	}

	epgTryLoading();

}


function startEgpGrabbing() {

	// already in process
	if( bIsGrabbing || bDownloadRunning || bIsBooting ) {
		return false;
	}

	var sEpgUrl = getEpgUrl();
	if( sEpgUrl ) {
		loadEpgSource(sEpgUrl);
		return true;
	}

	oEpgDownloadStatus.innerText = getLang('noEpgUrlGiven');
	oEpgDownloadStatus.className = '';
	return false;

}


function loadEpgSettings() {

	var iTimeShift = localStorage.getItem('sEpgTimeShiftSetting');
	if( !iTimeShift ) {
		iTimeShift = 0;
	}
	oEpgTimeShiftInput.value = iTimeShift;
	loadEpgDb();
	updateEpgTimeShift();

	var iGrabbingInterval = localStorage.getItem('iEpgGrabingInterval');
	if( iGrabbingInterval ) {
		oEpgGrapIntervalInput.value = iGrabbingInterval;
	}

}


function lazyLoadOverviewChannel( i ) {

	if( aLazyLoadedOverviewItems.includes(i) ) {
		return false;
	}

	var yPos = iEpgOverviewItemHeight * i;
	if( i && yPos > iEpgOverviewScrollMin && yPos < iEpgOverviewScrollMax ) {
		aLazyLoadedOverviewItems.push(i);
		loadOverviewChannel(i - 1);
	}

	return true;

}


function refreshEpgOverviewTable() {

	iLastOverviewScrollPos = oEpgOverview.scrollTop;
	iEpgOverviewScrollMin = oEpgOverview.scrollTop - iEpgOverviewItemHeight;
	iEpgOverviewScrollMax = oEpgOverview.scrollTop + oEpgOverview.offsetHeight + (iEpgOverviewItemHeight * 2);
	aLazyLoadedOverviewItems = [];

	iSecondsSinceEpgOverviewRefresh = 0;
	var iMaxChannel = aChannelList.length + 1;
	for( var i = 1; i < iMaxChannel + 1; i++ ) {
		lazyLoadOverviewChannel(i);
	}

}


function refreshEpgNavList() {

	iSecondsSinceEpgNavListRefresh = 0;
	aLazyLoadedEpgChannels = [];

	channelScrollEvent();

	/*
	for( var iChNum in aFilteredChannelList ) {
		if( typeof(aFilteredChannelList[iChNum]) !== 'undefined' ) {
			loadEpgNavChannel(parseInt(iChNum));
		}
	}
	*/

	/*var iMaxChannel = aChannelList.length + 1;
	for( var i = 1; i < iMaxChannel + 1; i++ ) {
		loadEpgNavChannel(i - 1);
	}*/

}


function lazyLoadEpgNavChannel( i ) {

	if( !bEpgLoaded || !bNavOpened ) {
		return false;
	}

	i = parseInt(i);

	if( aLazyLoadedEpgChannels.includes(i) || !aChannelList[i] ) {
		return false;
	}

	aLazyLoadedEpgChannels.push(i);

	if( typeof(aFilteredChannelList[i]) !== 'undefined' ) {
		loadEpgNavChannel(i);
	}

	return true;

}


loadEpgSettings();


function epgTryLoading() {
	if( window.Worker && typeof(oInputEpgUrl) === 'object' && getEnabledEpgSetting() == '1' ) {
		setGrabbingInterval();
		startEgpGrabbing();
		//refreshAltIds();
	}
}

function epgBoot() {

	if( bEpgBooted || bIsGrabbing || bDownloadRunning || bIsBooting ) {
		return false;
	}

	bEpgBooted = true;
	epgTryLoading();

}

setTimeout(function() {
	epgBoot();
}, sDeviceFamily === 'Browser' ? 2000 : 2000);



oEpgOverview.onscroll = function(ev) {

	var iScTop = this.scrollTop, iScHeight = this.offsetHeight;

	if( Math.abs(iScTop - iLastOverviewScrollPos) < iEpgOverviewItemHeight ) {
		return false;
	}

	iLastOverviewScrollPos = iScTop;

	var iVisibleMinChannel = Math.floor(iScTop / iEpgOverviewItemHeight),
		iVisibleMaxChannel = Math.ceil((iScTop + iScHeight) / (iEpgOverviewItemHeight)) + 1;

	iEpgOverviewScrollMin = iScTop - iEpgOverviewItemHeight;
	iEpgOverviewScrollMax = iScTop + iScHeight + (iEpgOverviewItemHeight * 2);

	for( var i = iVisibleMinChannel; i <= iVisibleMaxChannel; i++ ) {
		lazyLoadOverviewChannel(i);
	}

};
