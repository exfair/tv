/* Copyright 2024 - Herber eDevelopment - Jaroslav Herber */
/*
 * TODO:
 * - check if favourite name changed. UPDATE: favs are deleted if m3u is reimported. Good?
 * - settings-options for puffer
 * - better error-handling -> if channels cannot be loaded, wrong file format, etc
 *
 * IDEEN:
- Multiple Playlisten-Auswahl und Verwaltung
	- Favoriten auf Playlist-Ebene
- Favorites an Playlists knÃ¼pfen
- Designauswahl
- Record-Funktion?
 *
 * */

function getEl( sId ) {
	return document.getElementById(sId);
}

var bDebuggerEnabled = true, oDebugger = getEl('debugger'), iRetryChannelLoad = 0;

var aCurrentChannel = false, iCurrentChannel = false, sCurrentChannelName = false, sCurrentChannelGroup = false, sCurrentChannelLogo = false,
iPreviousChannel = false, bChannelWasAlreadyPlaying = false,
bPlayerLoaded = false, bSettingsLoaded = false, bPlaylistFileLoaded = false, bDownloadRunning = false, sUserAgent = 'Mozilla/5.0 (m3u-ip.tv ' + sAppVersion + ') ' + sDeviceFamily,
iDownloadId = false, iChannelInputNumber = '', sSelectedGroup = false, bJustStarted = true, bStorageInitReady = false,
iSelectedAudioTrack = false, iSelectedSubtitleTrack = false, iSelectedVideoTrack = false,
bChannelSettingsOpened = false, sChannelSetting = false, iChannelSettingsFocusedField = 0, sFilter = false, bIsBooting = true,

// EPG
bEpgLoaded = false, bEpgOpened = false, bEpgOverviewOpened = false, sPlaylistEpgUrl = false, bChannelHasEpg = false, bPlaylistEpgCompatible = false,
bEpgBooted = false, aLazyLoadedEpgChannels = [],

aSubTitleTracks = [], aAudioTracks = [], aVideoTracks = [], bTrackInfoLoaded = false,

aFavourites = false, iVisibleChannels = 0, iFavChannels = false, bPlaylistHasFavs = false, aPlaylistHistory = false, aChannelList = [], aFilteredChannelList = [], oSelectedItem = false,
iStatusTimeout = false, iChannelNameTimer = false, iZapTimer = false, iChannelInputTimer = false, bGuideOpened = false,
iReconnectTimer = false, iReconnectTryAfter = 1000, bStreamWasInterrupted = false,
bChannelNameOpened = false, bChannelInputOpened = false, bConfirmBoxOpened = false, bYesConfirmSelected = false,
bAdvancedSettingsOpened = false, bSettingsOpened = false, bNavOpened = false, bGroupsOpened = false, bStatusOpened = false, bModalOpened = false,
bSubtitlesActive = false, bDebuggerActive = false, bChannelErrorOpened = false, bSearchFocused = false, bSaveExitAllowed = false,
sLocalCacheFile = 'downloads/herber-playlist.m3u', bNeedNavRefresh = false, bUsbManagerOpened = false,
iNavChannelHeight = 54, aLazyLoadedChannels = [], aChannelOrder = [], bChannelEditModeActive = false, sChannelEditMode = false, bHistoryBrowserOpened = false,

oHlsApi = false, bHlsFrameworkLoaded = false, oHlsOptions = {}, oAvPlayer = getEl('player'),
oDashApi = false, bDashFrameworkLoaded = false, sCurrentVideoEngine = 'hls',

// Some DOM-Elements
oSearchField = getEl('search_field'),
oInputM3u = getEl('sM3uUrl'), oInputEpgUrl = getEl('epg_url'), oInputEpgTimeShift = getEl('epg_time_shift'), oInputCustomUserAgent = getEl('user_agent_setting'),
oEpgChannelList = getEl('epg_nav_list'), oEpgOverview = getEl('epg_overview_table'), oEpgSourceFromPlaylist = getEl('epg_url_from_playlist'),
oLoader = getEl('loader'), oCheckboxEpgSetting = getEl('enable_epg_setting'), oCheckboxEpgFromPlaylistSetting = getEl('epg_prefere_playlist'),
oBufferSetting = getEl('buffer_setting'), oVideoFormatSetting = getEl('video_format_setting'),
oNav = getEl('nav'), oGroupsNav = getEl('group_list'), oChannelList = getEl('channel_list'),
oChannelSettingsList = getEl('channel_settings_list'), oChannelSubDubSettings = getEl('channel_settings_subs'),

iSettingsFocusedField = 0, iAdvancedSettingsFocusedField = 0, iPremiumSettingsFocusedField = 0, iBufferLength = 15,
oSettingsFields = document.querySelectorAll('#main_settings .focusable'), iSettingsFieldsLength = oSettingsFields.length,
oAdvancedSettingsFields = document.querySelectorAll('#advanced_settings .focusable'), iAdvancedSettingsFieldsLength = oAdvancedSettingsFields.length,
oPremiumSettingsFields = document.querySelectorAll('#premium_settings .focusable'), iPremiumSettingsFieldsLength = oPremiumSettingsFields.length;

// Channel info
var oChannelInfo = getEl('channel_info'),
oChannelTrack = getEl('channel_tracking'),
oChannelName = getEl('channel_name'),
oChannelNum = getEl('channel_number'),
oChannelGroup = getEl('channel_group'),
oChannelEpg = getEl('channel_epg'),
oPrevChannel = getEl('channel_prev'),
oNextChannel = getEl('channel_next'),
oChannelNumberInput = getEl('channel_input');

// DRM session
var sDrmSessionId = "m3u" + Date.now();

switch( sDeviceFamily ) {
	case 'Browser':
		break;
	case 'Samsung':
	case 'LG':
	case 'Android':
		iNavChannelHeight = 64;
		break;
}

if( sDeviceFamily === 'Android' && !bIsAndroidTv ) {
	iNavChannelHeight = 54;
}


// ---- Helpers
function debug( mVar ) {
	if( bDebuggerEnabled ) {
		if( sDeviceFamily !== 'Browser' ) {
			var oDate = new Date(), iMinutes = oDate.getMinutes(), iSeconds = oDate.getSeconds();
			if( iSeconds < 10 ) { iSeconds = '0' + iSeconds; }
			if( iMinutes < 10 ) { iMinutes = '0' + iMinutes; }
			var sDate = oDate.getHours() + ":" + iMinutes + ":" + iSeconds;
			oDebugger.innerHTML = sDate + ': ' + mVar + '<hr>' + oDebugger.innerHTML;
			oDebugger.scrollTop = 0;
		}
		console.log(mVar);
		//console.trace(mVar);
		//console.log(new Error().stack);
		if( typeof(debugCallback) === 'function' ) {
			debugCallback(sDate + ': ' + mVar);
		}
	}
}

function debugError( e ) {
	if( bDebuggerEnabled ) {
		console.log(e.message);
		console.trace(e);
		console.log(e.trace);
	}
}


function defocus() {

	var oActiveElement = document.activeElement;
	if( oActiveElement ) {
		oActiveElement.blur();
	}

	//getEl('defocus').focus();

}


function getMatch( sContent, sRegExp, iMatchNum ) {

	iMatchNum = iMatchNum || 1;
	var aData = sContent.match(sRegExp);
	if( aData && aData.length > iMatchNum ) {
		return aData[iMatchNum];
	}

	return '';

}


function fireRequest( sUrl, oFormdata, sOnSuccess, sOnFailure, sOnProgress ) {

	var oHttp = new XMLHttpRequest(), bFailureFired = false;
	oHttp.timeout = 600000; // 10 min timeout
	oHttp.onreadystatechange = function() {
		if( oHttp.readyState == XMLHttpRequest.DONE ) { // oHttpRequest.DONE == 4
			if( !oHttp.status || oHttp.status > 399 ) {
				if( !bFailureFired ) { bFailureFired = true; sOnFailure(oHttp); }
			} else {
				sOnSuccess(oHttp);
			}
		}
	};

	if( typeof(sOnProgress) === 'function' ) {
		//oHttp.addEventListener('loadstart', sOnProgress);
		//oHttp.addEventListener('load', sOnProgress);
		//oHttp.addEventListener('loadend', sOnProgress);
		oHttp.addEventListener('progress', sOnProgress);
	}

	oHttp.addEventListener('error', function(oEv) {
		if( !bFailureFired ) { bFailureFired = true; sOnFailure(oHttp); }
	});
	oHttp.addEventListener('abort', function() {
		if( !bFailureFired ) { bFailureFired = true; sOnFailure(oHttp); }
	});
	oHttp.addEventListener('timeout', function() {
		if( !bFailureFired ) { bFailureFired = true; sOnFailure(oHttp); }
	});

	if( sUrl && typeof(sOnSuccess) === 'function' && typeof(sOnFailure) === 'function' ) {
		try {
			if( oFormdata ) {
				oHttp.open("POST", sUrl, true);
				oHttp.send(oFormdata);
			} else {
				oHttp.open("GET", sUrl, true);
				if( sDeviceFamily !== 'Android' ) {
					//oHttp.setRequestHeader('Cache-Control', 'no-cache');
					//oHttp.setRequestHeader('Pragma', 'no-cache');
					//oHttp.setRequestHeader('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
				}
				oHttp.send();
			}
		} catch( e ) {
			if( !bFailureFired ) { bFailureFired = true; sOnFailure(e); }
			debugError(e);
			return false;
		}
		return true;
	}

	return false;

}


function insertDemoPlaylistUrl() {
	oInputM3u.scrollIntoView();
	oInputM3u.value = 'https://m3u-ip.tv/demo-pl.php?lang=' + getLangId();
	downloadButton();
}


function savePlaylistToStorage( sStorageName, sContent ) {

	if( typeof(localforage) === 'object' ) {
		localforage.setItem('sChannelListStorage', sContent);
		return true;
	}

	localStorage.setItem('sChannelListStorage', sContent);
	return true;

}

function getPlaylistFromStorage( sStorageName ) {

	var sContent = localStorage.getItem('sChannelListStorage');

	if( typeof(localforage) === 'object' ) {

		if( sContent ) {
			localStorage.removeItem('sChannelListStorage');
			savePlaylistToStorage('default', sContent);
		}

		/*
		localforage.getItem('sChannelListStorage').then(function(sStorageValue) {
			debug("playlist loaded from forage");
			sContent = sStorageValue;
		}).catch(function(err) {
			debugError(err);
		});
		*/

	}

	return sContent;

}

function removePlaylistFromStorage( sStorageName ) {

	if( typeof(localforage) === 'object' ) {
		localforage.removeItem('sChannelListStorage');
	}

	localStorage.removeItem('sChannelListStorage');

}


function openExternalLink( oEl ) {
	//navigator.app.loadUrl(oEl.href, {openExternal: true});
	window.open(oEl.href, "_system");
	return false;
}


function showElement( sId, bFade ) {
	bFade = bFade || false;

	var oEl = getEl(sId);
	if( !oEl ) { return false; }

	if( bFade ) {
		oEl.style.opacity = '1';
	} else {
		oEl.style.display = 'block';
	}
}

function hideElement( sId, bFade ) {
	bFade = bFade || false;

	var oEl = getEl(sId);
	if( !oEl ) { return false; }

	if( bFade ) {
		oEl.style.opacity = '0';
	} else {
		oEl.style.display = 'none';
	}
}


function showModal( sMessage, sError ) {
	sError = sError || false;

	hideStatus();
	if( sError ) {
		sMessage += '<br><br><span class="small">' + sError + '</span>';
	}

	bModalOpened = true;
	defocus();
	getEl('modal_content').innerHTML = sMessage + '<br><br><span class="small">' + getLang('hideModalHint') + '</span>';
	showElement('modal');
}

function hideModal() {
	bModalOpened = false;
	hideElement('modal');
	getEl('modal_content').style.width = 'auto';
	getEl('modal_content').style.maxWidth = 'auto';
}

function showGuide() {
	showControlsGuide(sDeviceFamily);
	return false;

	bGuideOpened = true;
	document.body.classList.add('showguide');
	getEl('guide_content').scrollIntoView();
}

function hideGuide() {
	bGuideOpened = false;
	document.body.classList.remove('showguide');
}

function showControlsGuide( sPlatForm ) {

	getEl('modal_content').style.width = '70%';
	getEl('modal_content').style.maxWidth = '1100px';
	var sGuide = '<h2>' + getLang('guideControlsHeadline') + '</h2><ul class="unordered-list ALIGNLEFT" style="margin-bottom: 0">' + getLang('guideControls') + '</ul>';
	showModal(sGuide);

}


function showChannelError( sError, sErrorCode ) {
	bChannelErrorOpened = true;
	getEl('channel_error_content').innerHTML = sError + '<br><br><span class="small">' + sErrorCode + '</span>';
	showElement('channel_error');
	oLoader.style.display = 'none';
}

function hideChannelError() {
	if( bChannelErrorOpened ) {
		bChannelErrorOpened = false;
		hideElement('channel_error');
	}
}


function focusSettingsField( sId ) {
	iSettingsFocusedField = getEl(sId).dataset.index; // focus download button
	oSettingsFields[iSettingsFocusedField].focus();
}


function showSaveExitButton() {
	var oSaveButton = getEl('settings_save_button');
	bSaveExitAllowed = true;
	iSettingsFocusedField = oSaveButton.dataset.index; // save-button

	getEl('main_settings').classList.add('playlist-ready');

	if( bSettingsOpened ) {
		oSaveButton.focus();
	}
}


function hideSaveExitButton() {
	bSaveExitAllowed = false;

	getEl('main_settings').classList.remove('playlist-ready');
	hideElement('playlist_downloaded');
}

function checkM3uUrl( sM3uUrl ) {
	return (sM3uUrl && sM3uUrl.length > 8 /*&& sM3uUrl.toLowerCase().indexOf('.m3u') > 4*/);
}

function getPlaylist() {
	return localStorage.getItem('sM3uList');
}


// Check network status
function checkNetwork() {

	if( sDeviceFamily === 'Samsung' ) {
		try{
			// Check network status
			webapis.network.addNetworkStateChangeListener(function(value) {
				if( value == webapis.network.NetworkState.GATEWAY_DISCONNECTED ) {
					// Something you want to do when network is disconnected
					showModal(getLang("connectionLost"));
					debug("GATEWAY_DISCONNECTED");
					if( bPlayerLoaded && iCurrentChannel ) {
						webapis.avplay.pause();
					}

				} else if( value == webapis.network.NetworkState.GATEWAY_CONNECTED ) {
					// Something you want to do when network is connected again
					hideModal();
					debug("GATEWAY_CONNECTED");
					if( bPlayerLoaded && iCurrentChannel ) {
						webapis.avplay.play();
					}
				}
			});
		} catch( e ) {
			debugError(e);
		}
	}

	// LG: TODO: https://itnext.io/how-to-check-network-connection-on-smarttv-webos-and-tizen-75256c67584b

}


function loadAndPlayFromCache() {

	if( !loadChannelListFromCache() ) {
		showSettings(true);
		return false;
	}

	playlistReadyHandler();

}


// First init function
function boot() {

	checkNetwork();

	applyLang();

	if( typeof(sDefaultUrl) === 'string' ) {
		// download from GET-param
		oInputM3u.value = sDefaultUrl;
		downloadPlaylistAjax(sDefaultUrl, playlistReadyHandler);
		//playlistReadyHandler();
		return false;
	}

	// no settings in storage yet
	var sM3uList = getPlaylist(), oSetting = false;
	if( !sM3uList ) {
		if( oInputCustomUserAgent ) {
			oInputCustomUserAgent.value = sUserAgent;
		}

		showSettings(true);
		return false;
	}

	// Only load valid playlist
	oInputM3u.value = sM3uList;

	loadSettings();

	oSetting = getEl('reload_playlist_setting');
	if( oSetting && getReloadPlaylistSetting() == '1' ) {
		oSetting.checked = true;
		// Reload playlist
		if( sM3uList && sM3uList.indexOf('USB://') !== 0 && sM3uList.indexOf('local://') !== 0 ) {
			debug('reload playlist: ' + sM3uList);
			downloadPlaylistAjax(sM3uList, playlistReadyHandler, function() {
				loadAndPlayFromCache();
			});
			return false;
		}
	}

	// m3u file was already downloaded, use it
	loadAndPlayFromCache();

}


function setPreferredTrackLanguage() {

	switch( sDeviceFamily ) {
		case 'LG':
			break;
		case 'Samsung':
			break;
		case 'Apple':
			break;
		case 'Android':
			m3uConnector.setPreferredTrackLanguage(getLangId());
			break;
		default:

	}

}


function resetSettings() {

	localStorage.setItem('iLastChannel', 1);
	//localStorage.removeItem('aFavourites');

	//localStorage.removeItem('sEpgUrl');
	localStorage.removeItem('sEpgLastUpdated');
	localStorage.removeItem('sEpgLastUrl');
	//setEpgEnableSetting(false);

	removeGroupFilter();

	hideElement('epg_activator');

	if( iReconnectTimer ) {
		clearTimeout(iReconnectTimer);
		iReconnectTimer = false;
	}

	if( oEpgOverview ) {
		hideEpgOverview(true);
	}

	if( oEpgChannelList ) {
		oEpgChannelList.innerHTML = '';
		bEpgNavListBuilt = false;
	}

	if( oEpgSourceFromPlaylist ) {
		oEpgSourceFromPlaylist.innerHTML = getLang('noEpgUrlInPlaylist');
	}

	sFilter = false;
	//aFavourites = false;
	bTrackInfoLoaded = false;
	sPlaylistEpgUrl = false;
	bIsGrabbing = false;
	bPlaylistEpgCompatible = false;
	aChannelList = []; // remove old channels
	bPlaylistFileLoaded = false;
	hideSaveExitButton();
	resetEpgStatus();

	if( iCurrentChannel ) {
		resetPlayer();
	}

	iCurrentChannel = false;
	bPlayerLoaded = false;

}


function downloadUsbPlaylist( sUrl ) {

	// Download from USB
	if( sDeviceFamily === 'Samsung' && sUrl.indexOf('USB://') === 0 ) {

		if( !bStorageInitReady ) {
			bStorageInitReady = true;
			initStorage();
			return true;
		}

		if( !iNumOfMountedUSB ) {
			showModal(getLang('errorNoUsbMounted'));
			return true;
		}

		var sFileName = sUrl.replace('USB://', '');

		tizen.filesystem.listStorages(function(storages) {
			for( var i = 0; i < storages.length; i++ ) {
				if( storages[i].type == "EXTERNAL" && storages[i].state == "MOUNTED" ) {
					tizen.filesystem.resolve(storages[i].label, function(oResolver) {
						var oFile = oResolver.resolve(sFileName);
						if( oFile != null && oFile.fileSize > 0 ) {
							oFile.openStream("r",
								 function(fs) {
									var sText = fs.read(oFile.fileSize);
									if( sText.indexOf('#EXTM3U') !== 0 ) {
										showModal("Not a valid m3u playlist! #EXTM3U is missing!");
										onDownloadError();
									} else if( savePlaylist(sText) ) {
										onDownloadSuccess();
									} else {
										showModal(getLang('checkM3uFileError'));
										onDownloadError();
									}
									fs.close();
								 }, function(e) {
									debug("Error " + e.message);
									showModal(getLang('checkM3uDownloadError'), 'Detailed error: ' + e.message);
									onDownloadError();
								 }, "UTF-8"
							 );
						} else {
							showModal(getLang('checkM3uFileError'));
						}
					});
					break;
				}
			}
		});

		return true;
	}

	return false;

}


function getDetailedHttpError( oHttp ) {

	var sStatusInfo = '<b>' + (oHttp.statusText ? oHttp.statusText : 'Unknown error') + '</b>';

	switch( oHttp.status ) {
		case 0:
		case 400:
        case 401:
        case 403:
            sStatusInfo += '<br>Your URL might be malformed or not available. Please check it.'; break;
        case 404:
            sStatusInfo += '<br>The requested URL was not found on the server. Please check it.'; break;
        case 408:
            sStatusInfo += '<br>The server took too long to respond. Try again later.'; break;
        case 429:
            sStatusInfo += '<br>You have sent too many requests in a short time. Try again later.'; break;
        case 500:
            sStatusInfo += '<br>Something went wrong on the server. Please contact your IPTV provider or try again later.'; break;
        case 502:
            sStatusInfo += '<br>The server received an invalid response from an upstream server. Please contact your IPTV provider or try again later.'; break;
        case 503:
            sStatusInfo += '<br>The server is currently unavailable. Try again later.'; break;
        case 504:
            sStatusInfo += '<br>The server did not receive a timely response from another server. Please contact your IPTV provider or try again later.'; break;
		default:
			if( oHttp.status > 400 && oHttp.status < 500 ) {
				sStatusInfo += '<br>The server responded with an error. It is likely that your URL is wrong or not available anymore. Please contact your IPTV provider.';
			} else if( oHttp.status >= 500 ) {
                sStatusInfo += '<br>Server Error: The server encountered an issue. Try again later or contact your IPTV provider.';
            }
	}

	return 'Detailed error: ' + oHttp.status + ' - ' + sStatusInfo;

}


// With file_get_contents
function downloadPlaylistProxy( sUrl, oOriginHttp ) {

	bDownloadRunning = true;
	showStatus(getLang('downloadM3uStatus'), false);

	var oFormData = new FormData();
	oFormData.append('sUrl', sUrl);

	// to avoid CORS issue, use proxy-download script
	fireRequest('https://m3u-ip.tv/download.php?device=' + sDeviceFamily, oFormData, function(oHttp) {
		hideStatus();
		bDownloadRunning = false;
		if( oHttp.responseText && oHttp.responseText.indexOf('ERROR') !== 0 ) {
			if( savePlaylist(oHttp.responseText) ) {
				savePlaylistToHistory(sUrl);
				onDownloadSuccess();
			}
		} else {
			// if no remote download possible, try local download with ajax
			//downloadPlaylistAjax(sUrl);
			showModal(getLang('checkM3uDownloadError'), getDetailedHttpError(oOriginHttp));
		}
	}, function(oHttp) {
		showModal(getLang('checkM3uDownloadError'), getDetailedHttpError(oHttp));
		hideStatus();
		bDownloadRunning = false;
	}, function(oHttp) { // progress
		if( oHttp.loaded ) {
			var sDownloaded = (oHttp.loaded / 1024).toFixed(2);
			if( oHttp.total ) {
				sDownloaded += ' / ' + (oHttp.total / 1024).toFixed(2);
			}
			showStatus(getLang('downloadM3uStatus') + '<br>' + sDownloaded + ' KB', false);
		}
	});

	return true;

}


// Web version
function downloadPlaylistAjax( sUrl, sCallback, sCallbackError ) {

	// Load demolist from demo-channels.js
	if( sUrl === "https://m3u-ip.tv/demo-pl.php" && typeof(sDemoPlaylist) !== 'undefined' ) {
		if( savePlaylist(sDemoPlaylist) ) {
			onDownloadSuccess();
		}
		return true;
	}

	if( downloadUsbPlaylist(sUrl) ) {
		return true;
	}

	bDownloadRunning = true;
	showStatus(getLang('downloadM3uStatus'), false);

	fireRequest(sUrl, false, function(oHttp) {
		hideStatus();
		bDownloadRunning = false;
		if( oHttp.responseText && oHttp.responseText !== 'ERROR' ) {
			if( savePlaylist(oHttp.responseText) ) {
				savePlaylistToHistory(sUrl);
				onDownloadSuccess();
			}
		} else {
			// if no remote download possible, try local download
		}
		if( typeof(sCallback) === 'function' ) {
			sCallback();
		}
	}, function(oHttp) {
		hideStatus();
		bDownloadRunning = false;
		if( typeof(sCallbackError) === 'function' ) {
			sCallbackError();
			return;
		}

		if( sDeviceFamily === 'Browser' ) {
			downloadPlaylistProxy(sUrl, oHttp); // Try proxy fallback (CORS elimination)
		} else {
			showModal(getLang('checkM3uDownloadError'), getDetailedHttpError(oHttp));
		}
	}, function(oHttp) { // progress
		if( oHttp.loaded ) {
			var sDownloaded = (oHttp.loaded / 1024).toFixed(2);
			if( oHttp.total ) {
				sDownloaded += ' / ' + (oHttp.total / 1024).toFixed(2);
			}
			showStatus(getLang('downloadM3uStatus') + '<br>' + sDownloaded + ' KB', false);
		}
	});

	return true;

}


function savePlaylist( sContent ) {

	try {
		if( sContent && sContent.length > 4900000 ) {
			showModal(getLang('checkM3uDownloadSizeError'));
			sContent = sContent.substr(0, 4900000);
		}

		return savePlaylistToStorage('default', sContent);
	} catch( e ) {
		debugError(e);
	}

	return false;

}


function deletePlaylist() {

	debug('deletePlaylist');

	if( bDownloadRunning ) {
		return false;
	}

	resetSettings();

	// first delete old m3u file from cache/downloads
	try {
		removePlaylistFromStorage('default');
	} catch( e ) {
		debugError(e);
	}

}


function onDownloadSuccess() {

	if( loadChannelListFromCache() ) {
		//playlistReadyHandler();
		//getEl('playlist_downloaded').innerHTML = aChannelList.length + ' <span class="i18n" data-langid="channelsLoaded">' + getLang('channelsLoaded') + '</span>';
		var sText = getLang('playlistDownloaded').replace('%i', aChannelList.length);
		showModal(sText);

		if( bSettingsOpened ) {
			focusSettingsField('settings_save_button');
		}

	} else {
		showModal(getLang('checkM3uFileError'));
	}

	hideStatus();

}

function onDownloadError() {
	debug('create file error!');
	hideStatus();
}


function showStatus( sStatusText, mTimeout ) {

	if( typeof(mTimeout) === 'undefined' ) {
		mTimeout = 3000;
	}

	var oStatus = getEl('status');
	oStatus.innerHTML = '<div id="status_text">' + sStatusText + '</div>';
	oStatus.style.display = 'block';
	bStatusOpened = true;

	if( iStatusTimeout ) {
		clearTimeout(iStatusTimeout);
	}

	if( mTimeout ) {
		iStatusTimeout = setTimeout(hideStatus, mTimeout);
	}

}

function hideStatus() {
	hideElement('status');
	bStatusOpened = false;
}


// ---- Settings
function loadUsbButton() {

	if( !bStorageInitReady ) {
		bStorageInitReady = true;
		initStorage();
		return true;
	}

	openUsbManager();

}


function openExplorerButton() {

	var oFilePicker = getEl('file_picker');
	if( oFilePicker ) {
		deletePlaylist();
		oFilePicker.value = '';
		oFilePicker.click();
	}

}


function getFocusedHistoryItem() {
	return document.querySelector('#history_manager_content li.selected');
}

function focusHistoryItem( oEl ) {

	var oLastActive = getFocusedHistoryItem();
	if( oLastActive ) {
		oLastActive.classList.remove('selected');
	}

	oEl.classList.add('selected');

}


function loadHistoryPlaylist( oEl ) {
	closeHistoryBrowser();
	oInputM3u.value = oEl.innerText;
	downloadButton();
}


function deleteHistoryItem( sKey, oButton ) {

	var aHistory = getPlaylistHistory();
	for( var sName in aHistory ) {
		if( sKey == sName ) {
			delete aHistory[sName]; break;
		}
	}

	localStorage.setItem('aPlaylistHistory', JSON.stringify(aHistory));

	moveListDown();
	oButton.parentNode.remove();

}


function savePlaylistToHistory( sPlaylistUrl ) {

	if( !sPlaylistUrl ) {
		return false;
	}

	var aTmp = getPlaylistHistory(), oDate = new Date(), iSize = Object.keys(aTmp).length;

	// Playlist is already in history. Skip
	for( var sName in aTmp ) {
		if( sPlaylistUrl == aTmp[sName] ) {
			return false;
		}
	}

	// Only allow 10 lists in history
	if( iSize > 10 ) {
		delete aTmp[Object.keys(aTmp)[0]];
	}

	aTmp[oDate.toLocaleString()] = sPlaylistUrl;
	aPlaylistHistory = aTmp;
	localStorage.setItem('aPlaylistHistory', JSON.stringify(aPlaylistHistory));

	return true;

}


function getPlaylistHistory() {

	if( !aPlaylistHistory ) {
		aPlaylistHistory = localStorage.getItem('aPlaylistHistory');
		if( !aPlaylistHistory ) {
			aPlaylistHistory = {};
		} else {
			aPlaylistHistory = JSON.parse(aPlaylistHistory);
		}
	}
	return aPlaylistHistory;

}


function openHistoryButton() {

	var sListHtml = '', aHistory = getPlaylistHistory(), i = 0;
	for( var sName in aHistory ) {
		var sActive = i == 0 ? 'selected' : ''; i++;
		sListHtml += '<li class="' + sActive + '" onmouseover="focusHistoryItem(this)"><b>' + sName + '</b><div class="history-url" onclick="loadHistoryPlaylist(this)">' + aHistory[sName] + '</div><svg class="delete-history-item" onclick="deleteHistoryItem(\'' + sName + '\', this)" height="30" width="30"><use href="images/icons.svg#trash" height="30" width="30"></use></svg></li>';
	}

	if( sListHtml ) {
		getEl('history_manager_content').innerHTML = '<div class="close-button" onclick="closeHistoryBrowser()"></div><ul>' + sListHtml + '</ul>';
		showElement('history_manager');
		bHistoryBrowserOpened = true;
	} else {
		showModal(getLang('errorNoPlaylistHistory'));
	}

}


function closeHistoryBrowser() {
	hideElement('history_manager');
	getEl('history_manager_content').classList.remove('delete-mode');
	bHistoryBrowserOpened = false;
}


function filePickerHandler( oPicker ) {

	var file = oPicker.files[0];
	if( !file ) {
		return false;
	}

	var reader = new FileReader();

	reader.readAsText(file);
	reader.onload = function() {
		var sText = reader.result;
		if( sText.indexOf('#EXTM3U') === 0 ) {
			savePlaylistToStorage('default', sText);
			oInputM3u.value = 'local://' + file.name;
			onDownloadSuccess();
		} else {
			showModal(getLang('checkM3uFileError'));
			onDownloadError();
		}
	};

	reader.onerror = function() {
		showModal(getLang('checkM3uDownloadError'), 'Detailed error: ' + reader.error);
		onDownloadError();
	};

}


function downloadButton() {

	hideElement('playlist_downloaded');

	try {
		if( bDownloadRunning ) {
			if( sDeviceFamily === 'Samsung' && iDownloadId ) {
				debug( tizen.download.getState(iDownloadId) );
				tizen.download.cancel(iDownloadId); // Abort download of last m3u
			}
			return false;
		}
	} catch( e ) {
		debugError(e);
	}

	var sM3uUrl = oInputM3u.value;
	if( !sM3uUrl ) {
		showModal(getLang('errorNoM3uUrl'));
		return false;
	}

	if( !checkM3uUrl(sM3uUrl) ) {
		showModal(getLang('checkM3uDownloadError'));
		return false;
	}

	localStorage.setItem('sM3uList', sM3uUrl);

	if( sM3uUrl.indexOf('local://') === 0 ) {
		openExplorerButton();
		return false;
	}

	deletePlaylist(); // remove old first before download
	downloadPlaylistAjax(sM3uUrl);

}


function saveButton() {

	var sM3uUrl = oInputM3u.value;
	if( !checkM3uUrl(sM3uUrl) ) {
		showModal(getLang('errorNoM3uUrl'));
		return false;
	}

	localStorage.setItem('sM3uList', sM3uUrl);
	setPreferredTrackLanguage();
	playlistReadyHandler();

	if( iCurrentChannel === false ) {
		loadChannel(1);
	} else {
		if( sDeviceFamily === 'Samsung' && webapis.avplay.getState() === 'IDLE' ) {
			stopVideo();
			playVideo();
		}
	}

}


function deleteButton() {
	deletePlaylist();
	oInputM3u.focus();
	oInputM3u.select();
	iSettingsFocusedField = oInputM3u.dataset.index;
}


// Fired after Playlist was loaded
function playlistReadyHandler() {

	hideModal();

	try {
		if( bPlaylistFileLoaded ) {
			bSettingsLoaded = true;
			hideSettings();

			var sLastStoredGroup = localStorage.getItem('sSelectedGroup');
			if( sLastStoredGroup && sLastStoredGroup !== '__all' ) {
				setGroupFilter(sLastStoredGroup);
			}

			buildNav();
			epgTryLoading();
		}
	} catch( e ) {
		showChannelError('Framework loading error', e.message);
		debugError(e);
	}

}


function setEpgUrl( sUrl ) {

	debug("setEpgUrl " + sUrl);
	localStorage.setItem('sEpgUrl', sUrl);
	oInputEpgUrl.value = sUrl;
	bIsGrabbing = false;

	/*
	if( sPlaylistEpgUrl && sPlaylistEpgUrl !== sUrl ) {
		showElement('hint_use_playlist_epg');
	} else {
		hideElement('hint_use_playlist_epg');
	}
	*/

}


// Used in hint_use_playlist_epg in index.php
function setPlaylistEpgUrl() {
	if( sPlaylistEpgUrl ) {
		setEpgUrl(sPlaylistEpgUrl);
	}
}


function getEpgUrl() {

	if( getEnabledEpgFromPlaylistSetting() == '1' && sPlaylistEpgUrl ) {
		return sPlaylistEpgUrl;
	}

	var sStoredEpgUrl = localStorage.getItem('sEpgUrl');
	if( sStoredEpgUrl ) {
		//oInputEpgUrl.value = sStoredEpgUrl;
		return sStoredEpgUrl;
	}

	if( typeof(oInputEpgUrl) === 'object' && oInputEpgUrl.value ) {
		return oInputEpgUrl.value;
	}

	return false;

}


function loadChannelListFromCache() {

	var sContent = getPlaylistFromStorage('default'), iCount = 0;

	oEpgSourceFromPlaylist.innerHTML = getLang('noEpgUrlInPlaylist');

	aChannelList = []; sPlaylistEpgUrl = false;
	if( sContent ) {

		if( sContent.indexOf('#EXTM3U') !== 0 ) {
			showModal("Not a valid m3u playlist! #EXTM3U is missing!");
			//return false;
		} else if( oInputEpgUrl ) {
			sPlaylistEpgUrl = getMatch(sContent, /(url-tvg|x-tvg-url|epg-url|tvg-url)="([^"]+)"/, 2);
			oEpgSourceFromPlaylist.innerHTML = sPlaylistEpgUrl;
		}

		sContent = sContent.replace(/\r?\n/g, "\n");
		var sSplitter = "\n", aLines = sContent.split(sSplitter), aChannel = {};

		aLines.forEach(function(sLine) {

			sLine = sLine.trim();

			if( sLine.startsWith('#EXTVLCOPT:') ) {

				if( sLine.indexOf('#EXTVLCOPT:http-referrer=') === 0 ) {
					aChannel.ref = sLine.replace('#EXTVLCOPT:http-referrer=', '');
				} else if( sLine.indexOf('#EXTVLCOPT:http-user-agent=') === 0 ) {
					aChannel.ua = sLine.replace('#EXTVLCOPT:http-user-agent=', '');
				}

			} else if( sLine.startsWith('#KODIPROP:') ) {

				if( sLine.indexOf('#KODIPROP:inputstream.adaptive.license_type') === 0 ) {
					aChannel.drmT = sLine.replace('#KODIPROP:inputstream.adaptive.license_type=', '');
				} else if( sLine.indexOf('#KODIPROP:inputstream.adaptive.license_key=') === 0 ) {
					aChannel.drmK = sLine.replace('#KODIPROP:inputstream.adaptive.license_key=', '');
				} else if( sLine.indexOf('#KODIPROP:inputstream.adaptive.stream_headers=referer=') === 0 ) {
					aChannel.ref = sLine.replace('#KODIPROP:inputstream.adaptive.stream_headers=referer=', '');
				} else if( sLine.indexOf('#KODIPROP:inputstream.adaptive.stream_headers=user-agent=') === 0 ) {
					aChannel.ua = sLine.replace('#KODIPROP:inputstream.adaptive.stream_headers=user-agent=', '');
				} else if( sLine.indexOf('#KODIPROP:inputstream.adaptive.stream_headers=') === 0 ) {
				    aChannel.headers = sLine.replace('#KODIPROP:inputstream.adaptive.stream_headers=', '');
				}

			} else if( sLine.startsWith('#EXTGRP:') ) {

				aChannel.group = sLine.replace('#EXTGRP:', '');

			} else if( sLine.startsWith('#EXTINF:') ) {

				var sChannelName = '', aChannelName = sLine.match(/",(.+)/);
				if( !aChannelName ) {
					aChannelName = sLine.match(/,(.+)/);
				}

				if( aChannelName && aChannelName.length === 2 ) {
					sChannelName = aChannelName[1];
				}

				var sLogo = getMatch(sLine, /tvg-logo="([^"]+)"/);
				var sTvgId = getMatch(sLine, /tvg-id="([^"]+)"/);
				var sTvgName = getMatch(sLine, /tvg-name="([^"]+)"/);
				var sGroup = getMatch(sLine, /group-title="([^"]+)"/);

				if( !sGroup ) {
					sGroup = '-';
				}

				aChannel.name = sChannelName;
				aChannel.group = sGroup;

				if( sLogo ) {
					aChannel.logo = sLogo;
				}

				if( sTvgId ) {
					aChannel.tvgid = sTvgId;
				} else {
					aChannel.tvgid = sChannelName;
				}
				bPlaylistEpgCompatible = true;

				if( sTvgName ) {
					aChannel.tvgn = sTvgName;
					bPlaylistEpgCompatible = true;
				}

			} else if( aChannel && sLine && !sLine.startsWith('#') ) {

				if( aChannel.name ) {
					iCount++;
					aChannel.url = sLine;
					aChannel.id = iCount;
					aChannelList.push(aChannel);
				}

				aChannel = {}; // reset

			}

		});

	}

	if( aChannelList && aChannelList.length > 0 ) {
		bPlaylistFileLoaded = true;
		showElement('playlist_downloaded');
		getEl('playlist_downloaded').innerHTML = aChannelList.length + ' <span class="i18n" data-langid="channelsLoaded">' + getLang('channelsLoaded') + '</span>';
		showSaveExitButton();

		if( sPlaylistEpgUrl ) {
			resetEpgStatus();
			/*
			if( sPlaylistEpgUrl !== getEpgUrl() ) {
				setEpgUrl(sPlaylistEpgUrl);
				bNeedEpgUpdate = true;
				setEpgEnableSetting(true);
				startEgpGrabbing();
			}*/

			var sSavedEpgUrl = getEpgUrl();
			if( !sSavedEpgUrl ) {
				setEpgUrl(sPlaylistEpgUrl);
				if( typeof(startEgpGrabbing) === 'function' ) {
					bNeedEpgUpdate = true;
					setEpgEnableSetting(true);
					startEgpGrabbing();
				}
			} else {
				/*
				if( sPlaylistEpgUrl !== sSavedEpgUrl ) {
					showElement('hint_use_playlist_epg');
				} else {
					hideElement('hint_use_playlist_epg');
				}*/
			}
		}

		return true;
	}

	return false;

}


function toggleSettings() {
	if( bSettingsOpened ) {
		hideSettings();
	} else {
		showSettings();
	}
}


function toggleAdvancedSettings( iStep ) {

	document.body.classList.remove('open-advanced-settings');
	document.body.classList.remove('open-premium-settings');

	switch( iStep ) {
		case 1:
			getEl('settings_general_tab').classList.add('active');
			getEl('settings_advanced_tab').classList.remove('active');
			iSettingsFocusedField = 0;
			oSettingsFields[0].focus();
			break;
		case 2:
			document.body.classList.add('open-advanced-settings');
			getEl('settings_general_tab').classList.remove('active');
			getEl('settings_advanced_tab').classList.add('active');
			iAdvancedSettingsFocusedField = 0;
			oAdvancedSettingsFields[0].focus();
			break;
		case 3:
			document.body.classList.add('open-premium-settings');
			iPremiumSettingsFocusedField = 0;
			oPremiumSettingsFields[0].focus();
			break;
	}

	bAdvancedSettingsOpened = iStep;

}


function showSettings( bFirstRun ) {
	clearUi(0);

	if( iReconnectTimer ) {
		clearTimeout(iReconnectTimer);
		iReconnectTimer = false;
	}

	showElement('settings');
	bSettingsOpened = true;
	oSettingsFields[iSettingsFocusedField].focus();

	if( bFirstRun ) {
        getEl('settings').scrollTo(0, 0);
    }
}


function hideSettings() {

	// don't hide settings layer, if settings are not ready
	if( !bSettingsLoaded ) {
		saveButton();
		return false;
	}

	if( bPlaylistFileLoaded ) {
		hideElement('settings');
		bSettingsOpened = false;
		initPlayer();

		// Grab EPG data, if settings are closed
		if( !bIsBooting && getEnabledEpgSetting() == '1' && bNeedEpgUpdate ) {
			startEgpGrabbing();
		}

		return true;
	}

	showModal(getLang('checkM3uDownloadError'));
	return false;
}


function loadSettings() {

	var oSetting = getEl('mousewheel_setting');
	if( oSetting ) {
		oSetting.value = getMousewheelSetting();
	}

	if( oBufferSetting ) {
		var sBufferSetting = getBufferSetting();
		oBufferSetting.value = sBufferSetting;
		setBufferSetting(sBufferSetting);
	}

	if( oVideoFormatSetting ) {
		var sVideoFormatSetting = getVideoFormatSetting();
		oVideoFormatSetting.value = sVideoFormatSetting;
		switchVideoFormat(sVideoFormatSetting);
	}

	if( oInputCustomUserAgent ) {
		var sCustomUserAgent = getUserAgentSetting();
		oInputCustomUserAgent.value = sCustomUserAgent;
		setUserAgentSetting(sCustomUserAgent);
	}

	if( oCheckboxEpgSetting && getEnabledEpgSetting() == '1' ) {
		oCheckboxEpgSetting.checked = true;
	}

	var sStoredEpgUrl = localStorage.getItem('sEpgUrl');
	if( sStoredEpgUrl ) {
		oInputEpgUrl.value = sStoredEpgUrl;
	}

	if( oCheckboxEpgFromPlaylistSetting && getEnabledEpgFromPlaylistSetting() == '1' ) {
		oCheckboxEpgFromPlaylistSetting.checked = true;
		oInputEpgUrl.setAttribute('readonly', true);
	}

	oSettingsFields.forEach(function(oItem) {
		oItem.addEventListener('mouseover', function() {
			iSettingsFocusedField = oItem.dataset.index;
			oItem.focus();
		});
	});

	oAdvancedSettingsFields.forEach(function(oItem) {
		oItem.addEventListener('mouseover', function() {
			iAdvancedSettingsFocusedField = oItem.dataset.index;
			oItem.focus();
		});
	});

}


function loadLatestVersion() {

	switch( sDeviceFamily ) {
		case 'LG':
			location.href = 'http://m3u-ip.tv/lg/'; break;
		case 'Samsung':
			location.href = 'http://m3u-ip.tv/samsung/'; break;
		case 'Apple':
			location.href = 'http://m3u-ip.tv/apple/'; break;
		case 'Android':
			location.href = 'http://m3u-ip.tv/android/'; break;
		default:
			location.href = 'http://m3u-ip.tv/browser/'; break;
	}

}


function setMousewheelSetting( sSetting ) {
	localStorage.setItem('sMousewheelSetting', sSetting);
}


function getMousewheelSetting() {

	var sSetting = localStorage.getItem('sMousewheelSetting');
	if( !sSetting ) {
		sSetting = 'volume';
	}

	return sSetting;

}


function setBufferSetting( sSetting ) {
	localStorage.setItem('sBufferSetting', sSetting);
	if( sSetting === '-' ) {
		iBufferLength = 0;
	} else {
		iBufferLength = parseInt(sSetting);
	}

	applyBufferSetting();
}


function applyBufferSetting() {

	//debug('apply buffer seconds: ' + iBufferLength);

	switch( sDeviceFamily ) {
		case 'Browser':
		case 'LG':
			if( oHlsApi ) {
				oHlsApi.config.maxBufferLength = iBufferLength;
				oHlsApi.config.maxBufferSize = iBufferLength * 2000000;
			}
			break;
		case 'Samsung':

			var sState = webapis.avplay.getState();
			if( sState === 'PLAYING' ) {
				stopVideo();
				sState = webapis.avplay.getState();
				debug('applyBufferSetting stop stream. Status: ' + sState);
			}

			if( sState === 'IDLE' ) {
				// https://msx.benzac.de/wiki/index.php?title=Tizen_Player#Syntax
				// this crashes some channels :(
				//webapis.avplay.setStreamingProperty("PREBUFFER_MODE", (iBufferLength * 1000).toString());
				webapis.avplay.setTimeoutForBuffering(iBufferLength);

				// For the initial buffering
				webapis.avplay.setBufferingParam("PLAYER_BUFFER_FOR_PLAY", "PLAYER_BUFFER_SIZE_IN_SECOND", iBufferLength);  // in seconds
				// For the rebuffering
				webapis.avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME", "PLAYER_BUFFER_SIZE_IN_SECOND", iBufferLength + 15);  // in seconds
				//debug('applyBufferSetting OK');
			}

			break;
		case 'Android':
			m3uConnector.setBufferLength(iBufferLength);
			break;
	}

}


function getBufferSetting() {

	var sSetting = localStorage.getItem('sBufferSetting');
	if( !sSetting ) {
		sSetting = '30';
	}

	return sSetting;

}


function setVideoFormatSetting( sMode ) {
	localStorage.setItem('sVideoFormatSetting', sMode);
	switchVideoFormat(sMode);
}

function getVideoFormatSetting() {

	var sSetting = localStorage.getItem('sVideoFormatSetting');
	if( !sSetting ) {
		sSetting = 'fit';
	}

	return sSetting;

}


function setReloadPlaylistSetting( bChecked ) {
	localStorage.setItem('sReloadPlaylistSetting', bChecked ? '1' : '0');
}

function getReloadPlaylistSetting() {

	var sSetting = localStorage.getItem('sReloadPlaylistSetting');
	if( !sSetting ) {
		sSetting = '0';
	}

	return sSetting;

}


function setAdditionalHeaders() {

	if( !aCurrentChannel ) { return false; }

	var sChannelUserAgent = '', sChannelReferrer = '', sHeaders = '';
	if( aCurrentChannel.ref ) {
		sChannelReferrer = aCurrentChannel.ref;
	}

	if( aCurrentChannel.ua ) {
		sChannelUserAgent = aCurrentChannel.ua;
	}

	if( aCurrentChannel.headers ) {
		sHeaders = aCurrentChannel.headers;
	}

	switch( sDeviceFamily ) {
		case 'Browser':
			if( typeof(window.chrome.webview) === "object" ) {
				window.chrome.webview.postMessage({
					action: "setChannelCustomData",
					sUa: sUserAgent,
					sChannelUa: sChannelUserAgent,
					sChannelRef: sChannelReferrer,
					sChannelHeaders: sHeaders
				});
			}
			break;

		case 'Android':
			m3uConnector.setChannelCustomData(sChannelUserAgent, sChannelReferrer, sHeaders);
			break;
	}

}


function applyUserAgent() {

	//debug('apply user agent: ' + sUserAgent);

	switch( sDeviceFamily ) {
		case 'Browser':
		case 'LG':
			if( typeof(window.chrome.webview) === "object" ) {
				window.chrome.webview.postMessage({
					action: "setUserAgent",
					sUa: sUserAgent
				});
			}

			break;
		case 'Samsung':

			if( sUserAgent ) {
				var sState = webapis.avplay.getState();
				if( sState === 'PLAYING' ) {
					stopVideo();
					sState = webapis.avplay.getState();
					//debug('applyUserAgent stop stream. Status: ' + sState);
				}

				if( sState === 'IDLE' ) {
					var aCurrentChannel = aChannelList[iCurrentChannel - 1];
					if( aCurrentChannel.ua ) {
						webapis.avplay.setStreamingProperty("USER_AGENT", aCurrentChannel.ua);
					} else {
						webapis.avplay.setStreamingProperty("USER_AGENT", sUserAgent);
					}

					//debug('setStreamingProperty USER_AGENT: ' + sUserAgent);
					// This crashes app on startup
					//tizen.websetting.setUserAgentString(sUserAgent);
				}
			}

			break;
		case 'Android':
			m3uConnector.setUserAgent(sUserAgent);
			break;
	}

}


function setUserAgentSetting( sNewUserAgent ) {

	if( sNewUserAgent ) {
		sUserAgent = sNewUserAgent;
	} else {
		sUserAgent = 'Mozilla/5.0 (m3u-ip.tv ' + sAppVersion + ') ' + sDeviceFamily;
	}

	localStorage.setItem('sCustomUserAgent', sUserAgent);

	applyUserAgent();

}

function getUserAgentSetting() {

	var sSetting = localStorage.getItem('sCustomUserAgent');
	if( !sSetting ) {
		sSetting = sUserAgent;
	}

	return sSetting;

}


function setEpgFromPlaylistSetting( bChecked ) {

	if( bChecked ) {
		setEpgEnableSetting(true);
		oInputEpgUrl.setAttribute('readonly', true);
	} else {
		oInputEpgUrl.removeAttribute('readonly');
	}

	oCheckboxEpgFromPlaylistSetting.checked = bChecked;
	localStorage.setItem('sEnabledEpgFromPlaylistSetting', bChecked ? '1' : '0');

}

function getEnabledEpgFromPlaylistSetting() {

	var sSetting = localStorage.getItem('sEnabledEpgFromPlaylistSetting');
	if( !sSetting ) {
		sSetting = '0';
	}

	return sSetting;

}


function setEpgEnableSetting( bChecked ) {
	if( !bChecked ) {
		resetEpgData();
		setEpgFromPlaylistSetting(false);
	}

	oCheckboxEpgSetting.checked = bChecked;
	localStorage.setItem('sEnableEpgSetting', bChecked ? '1' : '0');
}

function getEnabledEpgSetting() {

	var sSetting = localStorage.getItem('sEnableEpgSetting');
	if( !sSetting ) {
		sSetting = '0';
	}

	return sSetting;

}


function getClearKeyJsonKeys( sDrmKeyString ) {

	var aClearkeys = {};

	if( sDrmKeyString.indexOf("{") === 0 ) {
		var oParsed = JSON.parse(sDrmKeyString);
		if( oParsed.keys ) {
			oParsed.keys.forEach(function(sKey) {
				aClearkeys[sKey.kid] = sKey.k;
			});
		} else {
			// Multi HEX
			for( var sItemKey in oParsed ) {
				var sKid = hexToBase64(sItemKey), sKey = hexToBase64(oParsed[sItemKey]);
				aClearkeys[sKid] = sKey;
				break;
			}
		}
	} else if( sDrmKeyString.length == 65 && sDrmKeyString.indexOf(":") == 32 ) {
		var aKeyParts = sDrmKeyString.split(":");
		var sKid = hexToBase64(aKeyParts[0]), sKey = hexToBase64(aKeyParts[1]);
		aClearkeys[sKid] = sKey;
	}

	//console.log(aClearkeys);

	return aClearkeys;

}


function setDrmHandler() {

	if( !aCurrentChannel ) { return false; }

	switch( sDeviceFamily ) {
		case 'Browser':
		case 'LG':
			if( sCurrentVideoEngine === 'dash' ) {
				if( !bDashFrameworkLoaded ) {
					loadDashFramework();
				}
				//oDashApi.setProtectionData({});
				//oDashApi.getProtectionController().setRobustnessLevel('SW_SECURE_CRYPTO');
			}

			if( aCurrentChannel.drmT && aCurrentChannel.drmK ) {

				oHlsApi.config.emeEnabled = true;
				switch( aCurrentChannel.drmT ) {
					case 'com.widevine.alpha':
					case 'widevine':
						if( sCurrentVideoEngine === 'dash' && oDashApi ) {
							oDashApi.setProtectionData({
								"com.widevine.alpha": {
									"serverURL": aCurrentChannel.drmK,
									"priority": 1
								}
							});
							return;
						}

						oHlsApi.config.drmSystems = {
							'com.widevine.alpha': {
								licenseUrl: aCurrentChannel.drmK
							}
						}
						break;
					case 'com.microsoft.playready':
					case 'playready':
						if( sCurrentVideoEngine === 'dash' && oDashApi ) {
							oDashApi.setProtectionData({
								"com.microsoft.playready": {
									"serverURL": aCurrentChannel.drmK,
									"priority": 1
								}
							});
							return;
						}

						oHlsApi.config.drmSystems = {
							'com.microsoft.playready': {
								licenseUrl: aCurrentChannel.drmK
							}
						}
						break;
					case 'com.apple.fps':
					case 'fairplay':
						oHlsApi.config.drmSystems = {
							'com.apple.fps': {
								licenseUrl: aCurrentChannel.drmK
								//serverCertificateUrl: serverCertificateUrl
							}
						}
						break;
					case 'org.w3.clearkey':
					case 'clearkey':
						if( sCurrentVideoEngine === 'dash' && oDashApi ) {
							if( aCurrentChannel.drmK.indexOf("http") === 0 ) {
								oDashApi.setProtectionData({
									"org.w3.clearkey": {
										"serverURL": aCurrentChannel.drmK,
										"priority": 1
									}
								});
							} else {
								oDashApi.setProtectionData({
									"org.w3.clearkey": {
										"clearkeys": getClearKeyJsonKeys(aCurrentChannel.drmK),
										"priority": 1
									}
								});
							}

							return;

						}

						oHlsApi.config.drmSystems = {
							'org.w3.clearkey': {
								licenseUrl: aCurrentChannel.drmK
							}
						}
						break;
				}

				return {};

			}

			if( oHlsApi ) {
				oHlsApi.config.emeEnabled = false;
				oHlsApi.config.drmSystems = {};
			}

			break;
		case 'Samsung':
			// https://developer.samsung.com/smarttv/develop/api-references/samsung-product-api-references/avplay-api.html#AVPlayManager-setDrm
			if( webapis.avplay.getState() === 'IDLE' && aCurrentChannel.drmT && aCurrentChannel.drmK ) {
				switch( aCurrentChannel.drmT ) {
					case 'com.widevine.alpha':
					case 'widevine':
						var aDrmParam = {
							AppSession: sDrmSessionId,
							LicenseServer: aCurrentChannel.drmK
						};
						webapis.avplay.setDrm("WIDEVINE_CDM", "SetProperties", JSON.stringify(aDrmParam));
						break;
					case 'com.microsoft.playready':
					case 'playready':
						var aDrmParam = {
							DeleteLicenseAfterUse: true,
							GetChallenge: true
							//UserAgent: sUserAgent,
							//CustomData: "love ya"
							//LicenseServer: aCurrentChannel.drmK
						};
						webapis.avplay.setDrm("PLAYREADY", "SetProperties", JSON.stringify(aDrmParam));
						break;
					case 'com.apple.fps':
					case 'fairplay':
						break;
					case 'org.w3.clearkey':
					case 'clearkey':
						break;
				}
			}
			break;
		case 'Android':
			if( aCurrentChannel.drmT ) {
				m3uConnector.setDrmLicense(aCurrentChannel.drmT, aCurrentChannel.drmK);
			} else {
				m3uConnector.setDrmLicense('-', '-');
			}
			break;
	}

	return {};

}


function resetPlayer() {

	try {
		switch( sDeviceFamily ) {
			case 'Browser':
			case 'LG':
				if( sCurrentVideoEngine === 'dash' && oDashApi ) {
					oDashApi.attachSource(null);
				} else if( oHlsApi ) {
					//oHlsApi.destroy();
					oHlsApi.stopLoad();
					oHlsApi.detachMedia();
					//oPlayerEngine.reset();
				}
				break;
			case 'Samsung':
				stopVideo();
				getEl('subtitles').innerHTML = '';
				break;
			case 'Android':
			case 'Apple':
				m3uConnector.resetPlayer();
				break;

		}
	} catch( e ) {
		debugError(e);
	}

}


function stopStream() {
	switch( sDeviceFamily ) {
		case 'Browser':
		case 'LG':
			if( sCurrentVideoEngine === 'dash' && oDashApi ) {
				oDashApi.attachSource(null);
			} else if( oHlsApi ) {
				oHlsApi.stopLoad();
				oHlsApi.detachMedia();
			}
			break;
		case 'Samsung':
			//stopVideo();
			webapis.avplay.close();
			getEl('subtitles').innerHTML = '';
			break;
		case 'Android':
		case 'Apple':
			break;
	}
}


function playDashVideo( sUrl ) {

	if( !bDashFrameworkLoaded ) {
		loadDashFramework();
	}

	if( oDashApi && sUrl ) {
		oDashApi.attachView(oAvPlayer);
		oDashApi.attachSource(sUrl);
		oDashApi.updateSettings({streaming: {text: {defaultEnabled: bSubtitlesActive}}});
		oDashApi.attachTTMLRenderingDiv(getEl('ttml_subtitles'));
	}

}


function playHlsVideo( sUrl ) {

	if( !sUrl ) {
		return false;
	}

	if( !bHlsFrameworkLoaded ) {
		loadHlsFramework();
	}

	if( oHlsApi ) {
		//oAvPlayer.src = sUrl;
		oHlsApi.attachMedia(oAvPlayer);
		oHlsApi.loadSource(sUrl);
		oHlsApi.subtitleDisplay = bSubtitlesActive;
	} else if( oAvPlayer.canPlayType('application/vnd.apple.mpegurl') ) {
		oAvPlayer.src = sUrl;
	}

}


// ---- Player
function loadChannel( iNum ) {

	iNum = parseInt(iNum);

	if( iNum < 1 || iNum === iCurrentChannel ) {
		return false;
	}

	if( iReconnectTimer ) {
		clearTimeout(iReconnectTimer);
		iReconnectTimer = false;
	}

	aSubTitleTracks = []; aAudioTracks = []; aVideoTracks = []; bTrackInfoLoaded = false;
	oChannelTrack.innerHTML = '';

	iRetryChannelLoad = 0;
	iSelectedAudioTrack = false;
	iSelectedVideoTrack = false;
	//iSelectedSubtitleTrack = false;
	iReconnectTryAfter = 1000;
	bChannelHasEpg = false; // Reset and set later
	oChannelInfo.className = '';

	hideChannelError();
	hideEpgOverview();
	hideChannelSettings();

	if( sDeviceFamily !== 'Android' ) {
		oLoader.style.display = 'block';
	}

	if( iNum > aChannelList.length ) {
		iNum = aChannelList.length;
	}

	iPreviousChannel = iCurrentChannel;
	iCurrentChannel = iNum;

	aCurrentChannel = aChannelList[iCurrentChannel - 1];
	if( !aCurrentChannel ) {
		aCurrentChannel = aChannelList[0];
		iCurrentChannel = 1;
	}

	if( !aCurrentChannel ) {
		return false;
	}

	var sUrl = aCurrentChannel.url;
	sCurrentChannelName = aCurrentChannel.name;
	sCurrentChannelGroup = aCurrentChannel.group;
	sCurrentChannelLogo = false;
	if( typeof(aCurrentChannel.logo) === 'string' ) {
		sCurrentChannelLogo = aCurrentChannel.logo;
	}

	if( sCurrentChannelGroup !== sSelectedGroup && sSelectedGroup !== '__fav' ) {
		sSelectedGroup = false;
	}

	try {
		stopStream();
	} catch( e ) {
		debugError(e);
	}

	if( !sUrl ) {
		showChannelError('This channel has no URL', 'Code: NO_CHANNEL_URL');
		return false;
	}

	if( sUrl.indexOf(".mpd") > 5 || sUrl.indexOf("type=mpd") > 5 || sUrl.indexOf("/dash/") > 5 ) {
		sCurrentVideoEngine = 'dash';
	} else {
		sCurrentVideoEngine = 'hls';
	}

	// activate channel in nav
	var oNavChannel = getEl('nav_ch_' + iCurrentChannel);
	var oOldNavChannel = document.querySelector('#channel_list li.active');
	var oLastSelectedNavItem = document.querySelector('#channel_list li.selected');

	if( oLastSelectedNavItem ) {
		oLastSelectedNavItem.classList.remove('selected');
	}

	if( oOldNavChannel ) {
		oOldNavChannel.classList.remove('active');
	}

	if( oNavChannel ) {
		oSelectedItem = oNavChannel;
		oNavChannel.classList.add('active', 'selected'); // can be filtered out!
		scrollToListItem(oNavChannel);
	}

	showChannelName();

	if( typeof(loadChannelEpgCallback) === 'function' ) {
		loadChannelEpgCallback();
	}

	bChannelWasAlreadyPlaying = false;

	try {
		switch( sDeviceFamily ) {
			case 'Browser':
			case 'LG':
				//oHlsApi = new Hls(oHlsOptions);
				applyBufferSetting();

				if( typeof(bIsWindowsApp) !== "undefined" && bIsWindowsApp ) {
					setAdditionalHeaders();
				}

				setDrmHandler();

				if( sCurrentVideoEngine === 'dash' ) {
					playDashVideo(sUrl);
				} else {
					playHlsVideo(sUrl);
				}

				//loadTrackInfo();
				break;
			case 'Samsung':
				webapis.avplay.open(sUrl);
				try {
					//webapis.avplay.setSilentSubtitle(false);
					webapis.avplay.setDisplayRect(0, 0, window.innerWidth, window.innerHeight);
					applyUserAgent();
					applyBufferSetting();
					/*
					debug("setVideoStillMode");
					webapis.avplay.setVideoStillMode("true");
					*/
				} catch( e ) {
					debugError(e);
				}

				setDrmHandler();
				playVideo();
				break;
			case 'Android':
				setAdditionalHeaders();
				setDrmHandler();
				m3uConnector.loadVideo(sUrl, iCurrentChannel + '. ' + sCurrentChannelName, sCurrentChannelGroup, sCurrentChannelLogo);
				bPlaying = true;
				if( getEl('playpause') ) {
					changeButtonState('playpause');
				}
				break;
		}

	} catch( e ) {
		debug('loadChannel. Something went wrong!!! ' + e.message);

		// Stream broke, Try restart
		if( sDeviceFamily === 'Samsung' ) {
			//showModal(webapis.avplay.getState(), e.message);
			tryReconnect();
		}
	}

	return true;

}


var successLoadCallback = function() {
	//debug('successLoadCallback: The media has finished preparing');

	localStorage.setItem('iLastChannel', iCurrentChannel);
	localStorage.setItem('sLastChannelName', sCurrentChannelName);
	iRetryChannelLoad = 0;
	iReconnectTryAfter = 1000;
	bStreamWasInterrupted = false;
	bChannelWasAlreadyPlaying = true;

	//webapis.avplay.setDisplayRect(0, 0, window.innerWidth, window.innerHeight);
	//switchVideoFormat(false); // set fullscreen / original mode

	if( bChannelSettingsOpened ) {
		buildSubDubForm();
	}

	bPlayerLoaded = true;
	webapis.avplay.play();
};


var errorLoadCallback = function() {
	bPlayerLoaded = false;
	debug('errorLoadCallback: The media has failed to prepare');
	stopVideo();

	// Try again
	/*
	if( iRetryChannelLoad < 3 ) {
		debug('errorLoadCallback. Retry channel load. Count: ' + iRetryChannelLoad);
		tryReconnect();
	}*/
};


function openUiElement( sElement ) {

	var aUiElements = ['Nav', 'Epg', 'EpgOverview', 'ChannelName', 'ChannelSettings', 'Controls'];

	for( var i; i < aUiElements.length; i++ ) {

		if( aUiElements[i] == sElement ) {
			// show
		} else {
			// hide
		}

	}

}


function clearUi( sExclude ) {
    if( sExclude !== 'epg' ) hideEpg();
    if( sExclude !== 'epgOverview' ) hideEpgOverview();
    if( sExclude !== 'nav' ) hideNav();
    if( sExclude !== 'channelName' ) hideChannelName();
    if( sExclude !== 'channelSettings' ) hideChannelSettings();
    if( sExclude !== 'controls' ) hideControls();
}


// ---- channel list
function toggleNav() {
	if( bNavOpened ) {
		showNav();
	} else {
		hideNav();
	}
}

function showNav() {

	clearUi('nav');
	bNavOpened = true;

	// Logos found in EPG functions, rebuild nav with new logos
	if( bNeedNavRefresh ) {
		bNeedNavRefresh = false;
		buildNav();
	} else {
		buildEpgNavList();
		syncScrollEpgList(oChannelList);
	}

	hideControlsArrow();
	channelScrollEvent();
	document.body.classList.add('nav-opened');

	oSearchField.removeAttribute('disabled');

	// if no favs available remove the fav-group selection
	if( sSelectedGroup === '__fav' && !getFavsCount() ) {
		removeGroupFilter();
		buildNav();
		return false;
	}

	oSelectedItem = getCurrentSelectedItem();

	/*
	// on channel select, show detailed EPG info
	if( oSelectedItem && oSelectedItem.dataset.channelnum ) {
		if( typeof(loadNavChannelEpgCallback) === 'function' ) {
			loadNavChannelEpgCallback(oSelectedItem.dataset.channelnum);
		}
	}
	*/

}

function hideNav() {
	oSearchField.setAttribute('disabled', 'disabled');
	//oNav.style.width = '0';
	hideGroups();
	bNavOpened = false;
	bMouseOpenedNav = false;
	document.body.classList.remove('nav-opened');
}


function showGroups() {
	bGroupsOpened = true;
	bMouseOpenedNav = false;
	oSearchField.removeAttribute('disabled');
	//oGroupsNav.style.width = iNavWidth + 'px';
	oSelectedItem = getCurrentSelectedItem();
	oSelectedItem.classList.add('selected');
	document.body.classList.add('groups-opened');
	scrollToListItem(oSelectedItem);
}

function hideGroups() {
	//oGroupsNav.style.width = '0';
	bGroupsOpened = false;
	document.body.classList.remove('groups-opened');
}


function toggleControlsSettings() {

	if( bChannelSettingsOpened ) {
		hideChannelSettings();
	} else {
		showChannelSettings();
	}

}


/* Channel settings */
var iRetryTrackLoading = false;

function updateVideoTrackInfo() {
	var sInfo = ' - ' + getLang('channelSettingResolution') + ': ' + oPlayerEngine.videoWidth() + 'x' + oPlayerEngine.videoHeight();
	oChannelTrack.innerHTML = sInfo;
}


// Get audio tracks, subtitle tracks, resolution, codecs and bitrate
function loadTrackInfo() {

	if( bTrackInfoLoaded ) {
		return true;
	}

	//oChannelTrack.innerHTML = '';
	var sInfo = '';

	try {
		switch( sDeviceFamily ) {
			case 'Browser':
			case 'LG':
				// reset track info and set again
				aSubTitleTracks = []; aAudioTracks = []; aVideoTracks = [];

				if( sCurrentVideoEngine === 'dash' && oDashApi ) {

					// Subtitles
					var oTrackInfo = oDashApi.getTracksFor('text');
					if( oTrackInfo ) {
						var iTrackInfoCount = oTrackInfo.length;
						for( var i = 0; i < iTrackInfoCount; i++ ) {
							aSubTitleTracks.push({id: i, index: oTrackInfo[i].index, name: oTrackInfo[i].lang});
						}
					}

					// Audio
					var oTrackInfo = oDashApi.getTracksFor('audio');
					if( oTrackInfo ) {
						var oCurrentTrack = oDashApi.getCurrentTrackFor('audio');
						var iTrackInfoCount = oTrackInfo.length;
						for( var i = 0; i < iTrackInfoCount; i++ ) {
							if( oCurrentTrack == oTrackInfo[i] ) { iSelectedAudioTrack = i; }
							aAudioTracks.push({id: i, index: oTrackInfo[i].index, name: oTrackInfo[i].lang});
						}
					}

					// Video
					var oTrackInfo = oDashApi.getTracksFor('video');
					if( oTrackInfo ) {
						var oCurrentTrack = oDashApi.getCurrentTrackFor('video');
						var iTrackInfoCount = oTrackInfo.length;
						for( var i = 0; i < iTrackInfoCount; i++ ) {
							if( oCurrentTrack == oTrackInfo[i] ) { iSelectedVideoTrack = i; }
							var sName = oTrackInfo[i].lang;
							if( sName ) { sName += ' - ' }
							sName += oTrackInfo[i].codec;
							aVideoTracks.push({id: i, index: oTrackInfo[i].index, name: sName});
						}
					}

				} else if( oHlsApi ) {

					// Subtitles
					var oTrackInfo = oHlsApi.subtitleTracks;
					if( oTrackInfo ) {
						var iTrackInfoCount = oTrackInfo.length;
						for( var i = 0; i < iTrackInfoCount; i++ ) {
							aSubTitleTracks.push({id: oTrackInfo[i].id, name: oTrackInfo[i].lang + ' - ' + oTrackInfo[i].name});
						}
					}

					// Audio
					var oTrackInfo = oHlsApi.audioTracks;
					if( oTrackInfo ) {
						var iTrackInfoCount = oTrackInfo.length;
						for( var i = 0; i < iTrackInfoCount; i++ ) {
							aAudioTracks.push({id: oTrackInfo[i].id, name: oTrackInfo[i].lang + ' - ' + oTrackInfo[i].name});
						}
					}

				}

				break;

			case 'Samsung':
				if( webapis.avplay.getState() === 'IDLE' ) {
					return false;
				}

				var oTrackInfo = webapis.avplay.getTotalTrackInfo();
				if( oTrackInfo ) {
					var iTrackInfoCount = oTrackInfo.length;

					// reset track info and set again
					aSubTitleTracks = []; aAudioTracks = []; aVideoTracks = [];

					for( var i = 0; i < iTrackInfoCount; i++ ) {
						//sInfo += oTrackInfo[i].type + ': ';
						var oExtraInfo = JSON.parse(oTrackInfo[i].extra_info);
						if( oExtraInfo ) {
							if( oExtraInfo.fourCC ) {
								if( oTrackInfo[i].type === 'VIDEO' ) {
									sInfo += (sInfo ? '<br>' : '') + oExtraInfo.fourCC;
									if( oExtraInfo.Bit_rate && oExtraInfo.Bit_rate != '99999999' ) {
										var iMbits = (oExtraInfo.Bit_rate / 1000000).toFixed(3);
										sInfo += ' (' + iMbits + ' Mbit/s)';
									}
									if( oExtraInfo.Width && oExtraInfo.Height ) {
										sInfo += ' - ' + getLang('channelSettingResolution') + ': ' + oExtraInfo.Width + 'x' + oExtraInfo.Height;
									}
								} else if( i < 3 ) { // AUDIO
									sInfo += (sInfo ? '<br>' : '') + oExtraInfo.fourCC;
									if( oExtraInfo.bit_rate && oExtraInfo.bit_rate != '99999999' ) {
										var iMbits = (oExtraInfo.bit_rate / 1000000).toFixed(3);
										sInfo += ' (' + iMbits + ' Mbit/s)';
										if( oExtraInfo.language ) {
											sInfo += ' - ' + oExtraInfo.language;
										}
									}
								} else if( i === 3 ) {
									sInfo += '<br>...';
								}
							}

							switch( oTrackInfo[i].type ) {
								case 'TEXT':
									aSubTitleTracks.push({id: oTrackInfo[i].index, name: oExtraInfo.track_lang});
									break;
								case 'VIDEO':
									aVideoTracks.push({id: oTrackInfo[i].index, name: oExtraInfo.fourCC});
									break;
								case 'AUDIO':
									var sName = oExtraInfo.language ? oExtraInfo.language : getLang('channelSettingAudioDefault');
									if( oExtraInfo.bit_rate ) {
										var iMbits = (oExtraInfo.bit_rate / 1000000).toFixed(3);
										sName += ' - ' + oExtraInfo.fourCC + ' (' + iMbits + ' Mbit/s)';
									}
									aAudioTracks.push({id: oTrackInfo[i].index, name: sName});
									break;
							}

						}
					}

					oChannelTrack.innerHTML = sInfo;

				}
				break;

			case 'Android':
			case 'Apple':
				// is updated in CustomPlayer: AnalyticsListener
				//var oTrackInfo = m3uConnector.getTotalTrackInfo(), sInfo = '';
				break;
		}

		bTrackInfoLoaded = true;

	} catch( e ) {
		debug('loadTrackInfo error: ' + e.message);
	}

	return bTrackInfoLoaded;

}


function switchVideoFormat( sMode ) {

	/*
	if( sChannelSetting !== 'video' ) {
		debug('switchVideoFormat not allowed');
		return false;
	}*/

	//setVideoFormatSetting(sMode);

	if( sMode === false ) {
		sMode = getVideoFormatSetting();
	}

	try {
		switch( sDeviceFamily ) {
			case 'LG':
			case 'Browser':
				var sCss = 'contain';
				if( sMode == 'fill' ) {
					sCss = 'fill';
				} else if( sMode == 'zoom' ) {
					sCss = 'cover';
				}

				oAvPlayer.style.objectFit = sCss;
				break;
			case 'Samsung':
				if( sMode == 'fill' ) {
					webapis.avplay.setDisplayMethod("PLAYER_DISPLAY_MODE_FULL_SCREEN");
				} else {
					webapis.avplay.setDisplayMethod("PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO");
				}
				break;
			case 'Android':
			case 'Apple':
				m3uConnector.setAspectMode(sMode);

		}
	} catch( e ) {
		debug('switchPlayerAspectMode error: ' + e.message);
	}

}


function switchVideoTrack( iTrackId ) {

	if( sChannelSetting !== 'sub-dub' ) {
		debug('switchVideoTrack not allowed');
		return false;
	}

	iTrackId = parseInt(iTrackId);

	try {
		if( sCurrentVideoEngine === 'dash' && oDashApi ) {
			var oVideoTracks = oDashApi.getTracksFor('video');
			if( oVideoTracks && oVideoTracks[iTrackId] ) {
				oDashApi.setCurrentTrack(oVideoTracks[iTrackId]);
			}
		} else if( oHlsApi ) {
			//
		} else if( sDeviceFamily === 'Samsung' && aVideoTracks.length ) {
			//webapis.avplay.setSelectTrack('VIDEO', iTrackId);
		} else if( sDeviceFamily === 'Android' && aVideoTracks.length ) {
			//m3uConnector.setSelectTrack('VIDEO', iTrackId);
		}
		iSelectedVideoTrack = iTrackId;
		debug('Switched video track: ' + iTrackId);
	} catch( e ) { debugError(e); }

}


function switchAudioTrack( iTrackId ) {

	if( sChannelSetting !== 'sub-dub' ) {
		debug('switchAudioTrack not allowed');
		return false;
	}

	iTrackId = parseInt(iTrackId);

	try {
		if( sCurrentVideoEngine === 'dash' && oDashApi ) {
			var oAudioTracks = oDashApi.getTracksFor('audio');
			if( oAudioTracks && oAudioTracks[iTrackId] ) {
				oDashApi.setCurrentTrack(oAudioTracks[iTrackId]);
			}
		} else if( oHlsApi ) {
			oHlsApi.audioTrack = iTrackId;
		} else if( sDeviceFamily === 'Samsung' && aAudioTracks.length ) {
			webapis.avplay.setSelectTrack('AUDIO', iTrackId);
		} else if( sDeviceFamily === 'Android' && aAudioTracks.length ) {
			m3uConnector.setSelectTrack('AUDIO', iTrackId);
		}
		iSelectedAudioTrack = iTrackId;
		debug('Switched audio track: ' + iTrackId);
	} catch( e ) { debugError(e); }

}


function switchSubtitleTrack( iTrackId ) {

	if( sChannelSetting !== 'sub-dub' ) {
		debug('switchSubtitleTrack not allowed');
		return false;
	}

	try {
		if( iTrackId == 'OFF' ) {
			hideSubtitles();
			return false;
		}

		iTrackId = parseInt(iTrackId);

		showSubtitles();
		if( sCurrentVideoEngine === 'dash' && oDashApi ) {
			oDashApi.setTextTrack(iTrackId);
		} else if( oHlsApi ) {
			oHlsApi.subtitleTrack = iTrackId;
		} else if( sDeviceFamily === 'Samsung' && aSubTitleTracks.length ) {
			webapis.avplay.setSelectTrack('TEXT', iTrackId);
		} else if( sDeviceFamily === 'Android' && aSubTitleTracks.length ) {
			m3uConnector.setSelectTrack('TEXT', iTrackId);
		}
		iSelectedSubtitleTrack = iTrackId;
		debug('Switched subtitle track: ' + iTrackId);
	} catch( e ) { debugError(e); }

}


function buildSubDubForm() {

	if( sDeviceFamily === 'Samsung' ) {
		var sState = webapis.avplay.getState();
		if( sState !== 'READY' && sState !== 'PLAYING' && sState !== 'PAUSED' && !iRetryTrackLoading ) {
			oChannelSubDubSettings.innerHTML = '<p style="margin-top: 60px;">' + getLang('loading') + '</p>';
			return false;
		}
	}

	loadTrackInfo();

	var sHtml = '';
	if( aAudioTracks || aSubTitleTracks ) {

		// Audio-Tracks
		sHtml += '<div class="channel-setting form-row"><label>' + getLang('audioTrack') + '</label>';
		var iCount = aAudioTracks.length;
		if( iCount > 1 ) {
			sHtml += '<select class="selection" onchange="switchAudioTrack(this.value);">';
				for( var i = 0; i < iCount; i++ ) {
					var sSelectedAttr = '';
					if( iSelectedAudioTrack == aAudioTracks[i].id ) {
						sSelectedAttr = 'selected="selected"';
					}
					sHtml += '<option value="' + aAudioTracks[i].id + '" ' + sSelectedAttr + '>' + aAudioTracks[i].name + '</option>';
				}
			sHtml += '</select>';
		} else if( iCount === 1 ) {
			sHtml += '<p class="selection">' + aAudioTracks[0].name + '</p>';
		} else {
			sHtml += '<p class="selection">' + getLang('channelSettingAudioDefault') + '</p>';
		}

		sHtml += '</div><div class="HR"></div>';

		// Subtitle-Tracks
		sHtml += '<div class="channel-setting form-row"><label>' + getLang('subtitleTrack') + '</label>';
		var iCount = aSubTitleTracks.length;
		if( iCount ) {
			sHtml += '<select class="selection" onchange="switchSubtitleTrack(this.value);">';
				sHtml += '<option value="OFF">' + getLang('channelSettingSubOff') + '</option>';
				for( var i = 0; i < iCount; i++ ) {
					var sSelectedAttr = '';
					if( bSubtitlesActive && iSelectedSubtitleTrack == aSubTitleTracks[i].id ) {
						sSelectedAttr = 'selected="selected"';
					}
					sHtml += '<option value="' + aSubTitleTracks[i].id + '" ' + sSelectedAttr + '>' + aSubTitleTracks[i].name + '</option>';
				}
			sHtml += '</select>';
		} else {
			sHtml += '<p class="selection">' + getLang('channelSettingSubNoTrack') + '</p>';
		}

		sHtml += '</div>';

	}

	if( aVideoTracks ) {

		var iCount = aVideoTracks.length;
		if( iCount ) {
			// Video-Tracks
			sHtml += '<div class="HR"></div><div class="channel-setting form-row"><label>' + getLang('videoTrack') + '</label>';
			sHtml += '<select class="selection" onchange="switchVideoTrack(this.value);">';
				//sHtml += '<option value="OFF">' + getLang('channelSettingSubOff') + '</option>';
				for( var i = 0; i < iCount; i++ ) {
					var sSelectedAttr = '';
					if( iSelectedVideoTrack == aVideoTracks[i].id ) {
						sSelectedAttr = 'selected="selected"';
					}
					sHtml += '<option value="' + aVideoTracks[i].id + '" ' + sSelectedAttr + '>' + aVideoTracks[i].name + '</option>';
				}
			sHtml += '</select></div>';
		}

	}

	oChannelSubDubSettings.innerHTML = sHtml;

}


function showChannelSetting( sSetting ) {

	sChannelSetting = sSetting;
	iChannelSettingsFocusedField = 0;

	var sChannelSettingContainerId = false;
	switch( sSetting ) {
		case 'video':
			sChannelSettingContainerId = '#channel_settings_video';
			break;
		case 'sub-dub':
			sChannelSettingContainerId = '#channel_settings_subs';
			break;
		default:
			sChannelSettingContainerId = '#channel_settings_content';
	}

	var oSettingSelectBoxes = document.querySelectorAll(sChannelSettingContainerId + ' select');
	if( oSettingSelectBoxes && oSettingSelectBoxes.length ) {
		setTimeout(function() {
			oSettingSelectBoxes[iChannelSettingsFocusedField].focus();
		}, 50);
	}

	getEl('list_container_right').className = 'edit-' + sSetting;
	document.body.classList.add('channel-setting-edit');

}


function hideChannelSetting() {
	sChannelSetting = false;
	defocus();
	getEl('list_container_right').className = '';
	document.body.classList.remove('channel-setting-edit');
}


function showChannelSettings() {

	clearUi('channelSettings');

	if( sChannelSetting ) {
		hideChannelSetting();
	}

	if( !bChannelSettingsOpened ) {
		bChannelSettingsOpened = true;
		oSelectedItem = getCurrentSelectedItem();
		oSelectedItem.classList.add('selected');
		document.body.classList.add('channel-settings-opened');
		buildSubDubForm();
	}

}

function hideChannelSettings() {
	if( bChannelSettingsOpened ) {
		bChannelSettingsOpened = false;
		document.body.classList.remove('channel-settings-opened');
	}
	hideChannelSetting();
}


function toggleEpgOverview() {

	if( !bEpgOverviewOpened ) {
		showEpgOverview();
	} else {
		hideEpgOverview();
	}

}


function showEpgOverview() {

	clearUi('epgOverview');

	if( getEnabledEpgSetting() == '0' ) {
		showSettings();
		toggleAdvancedSettings(2);
		return false;
	} else if( !bEpgLoaded && !bEpgBooted ) {
		epgBoot();
	}

	bEpgOverviewOpened = true;
	document.body.classList.add('epg-overview');
	buildEpgOverview();

	try {
		//oEpgOverview.scrollTop = ((iCurrentChannel - 1) * 49) - 200;
		var oLastActiveEpgCh = document.querySelector('.e-name.active');
		if( oLastActiveEpgCh ) {
			oLastActiveEpgCh.classList.remove('active');
		}
		getEl('e-n' + (iCurrentChannel - 1)).classList.add('active');
	} catch( e ) {
		debugError(e);
	}

	/*
	var oParentBox = oListItem.parentElement.parentElement,
		iBoxHeight = oParentBox.offsetHeight,
		iScrolled = oParentBox.scrollTop;

	if( oListItem.offsetTop < (iScrolled + (iBoxHeight * 0.3)) ) {
		oParentBox.scrollTop = oListItem.offsetTop - (iBoxHeight * 0.5);
	} else if( oListItem.offsetTop > (iScrolled + (iBoxHeight * 0.7)) ) {
		oParentBox.scrollTop = oListItem.offsetTop - (iBoxHeight * 0.5);
	}
	*/

}


function hideEpgOverview( bRemoveHtml ) {

	bRemoveHtml = bRemoveHtml || false;
	bRemoveHtml = true;

	bEpgOverviewOpened = false;
	document.body.classList.remove('epg-overview');

	if( bRemoveHtml ) {
		bEpgTableBuilt = false;
		oEpgOverview.innerHTML = '';
	}

}


function showEpg() {

	if( !bEpgLoaded || bEpgOpened ) {
		return false;
	}

	clearUi('epg');
	bEpgOpened = true;

	if( typeof(loadChannelEpg) === 'function' ) {
		loadChannelEpg();
	}

	document.body.classList.add('epg-enabled');
}


function hideEpg() {
	bEpgOpened = false;
	document.body.classList.remove('epg-enabled');
}


function toggleChannelEditMode( sMode ) {

	document.body.classList.remove('channel-edit', 'channel-edit-move', 'channel-edit-delete');

	if( sMode == 'exit' ) {
		sChannelEditMode = false;
		bChannelEditModeActive = false;
		showGroups();
		buildNav(true);
		// Refresh EPG-List
		iSecondsSinceEpgNavListRefresh = 9999;
		iSecondsSinceEpgOverviewRefresh = 9999;
		return false;
	}

	sChannelEditMode = sMode;
	bChannelEditModeActive = true;

	switch( sMode ) {
		case 'move':
			document.body.classList.add('channel-edit', 'channel-edit-move');
			showNav();
			break;
		case 'delete':
			document.body.classList.add('channel-edit', 'channel-edit-delete');
			showNav();
			break;
		default:
			showNav();
			break;

	}

	return true;

}


function removeChannel( iChNum ) {

	aChannelList.splice(iChNum - 1, 1);
	//buildNav(true);
	var oSelected = getCurrentSelectedItem();
	moveListDown();
	oSelected.remove();

}


function getCurrentSelectedItem() {

	var oSelected = false;

	if( bHistoryBrowserOpened ) {

		oSelected = getFocusedHistoryItem();

	} else if( bChannelSettingsOpened ) {
		oSelected = document.querySelector('#channel_settings_nav li.selected');

		if( !oSelected ) {
			oSelected = document.querySelector('#channel_settings_nav li:first-child');
		}

	} else if( bGroupsOpened ) {
		oSelected = document.querySelector('#group_list li.selected');

		if( !oSelected && sSelectedGroup ) {

			switch( sSelectedGroup ) {
				case '__all':
					oSelected = getEl('all_channels_group');
					break;
				case '__fav':
					oSelected = getEl('favourites_group');
					break;
				default:
					oSelected = getEl('nav_gr_' + sSelectedGroup);
			}

		}

		if( !oSelected ) {
			oSelected = document.querySelector('#group_list li:first-child');
		}

	} else {
		oSelected = document.querySelector('#channel_list li.selected');
		if( !oSelected && iCurrentChannel ) {
			oSelected = getEl('nav_ch_' + iCurrentChannel);
		}

		if( !oSelected ) {
			oSelected = document.querySelector('#channel_list li:first-child');
		}

	}

	if( !oSelected ) {
		oSelected = document.querySelector('#channel_list li:first-child');
	}

	return oSelected;

}


function scrollToListItem( oListItem ) {

	var oParentBox = oListItem.parentElement.parentElement,
		iBoxHeight = oParentBox.offsetHeight,
		iScrolled = oParentBox.scrollTop;

	if( oListItem.offsetTop < (iScrolled + (iBoxHeight * 0.3)) ) {
		oParentBox.scrollTop = oListItem.offsetTop - (iBoxHeight * 0.5);
	} else if( oListItem.offsetTop > (iScrolled + (iBoxHeight * 0.7)) ) {
		oParentBox.scrollTop = oListItem.offsetTop - (iBoxHeight * 0.5);
	}

}


function moveListUp( iSteps ) {

	iSteps = iSteps || 1;
	var oSelected = getCurrentSelectedItem();

	if( oSelected ) {
		oSelected.classList.remove('selected');
		var oSelectedItem = oSelected;

		if( oSelected.dataset.prev ) {
			oSelectedItem = document.querySelector('#' + oSelected.dataset.prev + ' li:last-child');
		} else {
			for( var i = 1; i <= iSteps; i++ ) {
				oSelectedItem = oSelectedItem.previousElementSibling;
				if( !oSelectedItem ) {
					oSelectedItem = oSelected.parentElement.lastElementChild;
					break;
				}
			}
		}

		scrollToListItem(oSelectedItem);
		oSelectedItem.classList.add('selected');
		focusListItem(oSelectedItem);
	}

	return oSelectedItem;

}

function moveListDown( iSteps ) {

	iSteps = iSteps || 1;
	var oSelected = getCurrentSelectedItem();

	if( oSelected ) {
		oSelected.classList.remove('selected');
		var oSelectedItem = oSelected;

		if( oSelected.dataset.next ) {
			oSelectedItem = document.querySelector('#' + oSelected.dataset.next + ' li:first-child');
		} else {
			for( var i = 1; i <= iSteps; i++ ) {
				oSelectedItem = oSelectedItem.nextElementSibling;
				if( !oSelectedItem ) {
					oSelectedItem = oSelected.parentElement.firstElementChild;
					break;
				}
			}
		}

		scrollToListItem(oSelectedItem);
		oSelectedItem.classList.add('selected');
		focusListItem(oSelectedItem);
	}

	return oSelectedItem;

}


function focusListItem( oSelectedItem ) {

	if( oSelectedItem && oSelectedItem.dataset.channelnum ) {
		if( typeof(loadNavChannelEpgCallback) === 'function' ) {
			loadNavChannelEpgCallback(oSelectedItem.dataset.channelnum);
		}
	}

}


function removeGroupFilter() {
	sSelectedGroup = false;
	localStorage.removeItem('sSelectedGroup');
	getEl('active_group').innerText = '';
	getEl('search_input').classList.remove('group-filter');
}


function setGroupFilter( sGroup ) {
	sSelectedGroup = sGroup;
	localStorage.setItem('sSelectedGroup', sGroup);
	var sGroupTitle = '';

	switch( sGroup ) {
		case '__all':
			break;
		case '__fav':
			sGroupTitle = getLang('favourites');
			break;
		default:
			if( sGroup ) {
				sGroupTitle = 'Â» ' + sGroup;
			}
	}

	getEl('active_group').innerText = sGroupTitle;
	if( sGroupTitle ) {
		getEl('search_input').classList.add('group-filter');
	} else {
		getEl('search_input').classList.remove('group-filter');
	}
}


function selectListItem() {

	if( bChannelSettingsOpened ) {

		if( oSelectedItem.dataset.setting ) {
			showChannelSetting(oSelectedItem.dataset.setting);
		} else if( oSelectedItem.id === 'channel-setting-audio' ) {
            toggleAudio();
        } else if( oSelectedItem.id === 'channel-setting-subs' ) {
            toggleSubtitles();
        } else if( oSelectedItem.id === 'channel-setting-favourite' ) {
			toggleFavourite(iCurrentChannel);
		} else if( oSelectedItem.id === 'channel-setting-playback' ) {
            toggleControls();
        }

		return false;
	}

	if( bGroupsOpened ) {

		var sLastSelectedGroup = sSelectedGroup;
		if( oSelectedItem.dataset.group ) {
			sSelectedGroup = oSelectedItem.dataset.group;
		}

		if( sSelectedGroup === '__all' ) {
			//removeGroupFilter();
		}

		if( sSelectedGroup === '__fav' ) {
			//getFavsCount();
			countFavChannels();
			if( !bPlaylistHasFavs ) {
				showModal(getLang("errorNoFavouritesYet"));
				sSelectedGroup = sLastSelectedGroup;
				return false;
			}
		}

		if( sSelectedGroup ) {
			setGroupFilter(sSelectedGroup);
		}

		switch( oSelectedItem.id ) {
			case 'settings_group':
				hideNav();
				showSettings();
				break;
			case 'nav_switch_to_v3':
				localStorage.removeItem('bLoadV2');
				window.location.href = "../index.html";
				return false; break;
			case 'nav_epg_overview':
				showEpgOverview();
				break;
			case 'nav_debug':
				toggleDebugger();
				break;
			case 'nav_search':
                focusSearchField();
                break;
			case 'open_guide':
				showControlsGuide(sDeviceFamily);
				break;
			case 'nav_channel_edit':
				toggleChannelEditMode('move');
				break;
			case 'open_debugger':
				toggleDebugger();
				break;
			default:

				if( sSelectedGroup === '__fav' && !getFavsCount() ) {
					showModal(getLang("errorNoFavouritesYet"));
					//removeGroupFilter();
					return false;
				}

				hideGroups();
				buildNav();
		}

		return false;
	}

	if( oSelectedItem && oSelectedItem.dataset.channelnum ) {
		loadChannel(oSelectedItem.dataset.channelnum);
		hideNav();
	}

}


function refreshFavStatus() {

	if( iCurrentChannel === false ) {
		return false;
	}

	if( isFavourite(iCurrentChannel) ) {
		//sOutput = 'â­ ' + sOutput;
		document.body.classList.add('is-favourite-channel');
	} else {
		document.body.classList.remove('is-favourite-channel');
	}

}


function showChannelName() {

	clearUi('channelName');

	if( iCurrentChannel === false ) {
		return false;
	}

	var iNext = getNextChannelNum(), iPrev = getPrevChannelNum();
	var sOutput = "<span id='ch_name'>"  + sCurrentChannelName + "</span>";
	refreshFavStatus();

	var sChannelNumberLogo = iCurrentChannel;
	if( sCurrentChannelLogo ) {
		sChannelNumberLogo = '<img id="ch_logo" src="' + sCurrentChannelLogo + '">' + sChannelNumberLogo;
	}

	oChannelEpg.innerHTML = '';
	oChannelNum.innerHTML = sChannelNumberLogo;

	// Add current EPG channel info
	sLoadingFromDb = false;
	loadChannelEpg(iCurrentChannel);
	if( bChannelHasEpg ) {
		//oChannelGroup.innerHTML = 'EPG';
	}

	if( !sCurrentChannelGroup || sCurrentChannelGroup == '-' ) {
		oChannelGroup.innerHTML = '';
	} else {
		oChannelGroup.innerHTML = sCurrentChannelGroup;
	}

	if( iPrev && aChannelList[iPrev - 1] ) {
		oPrevChannel.innerHTML = iPrev + ". " + aChannelList[iPrev - 1].name;
	} else {
		oPrevChannel.innerHTML = '';
	}

	if( iNext && aChannelList[iNext - 1] ) {
		oNextChannel.innerHTML = iNext + ". " + aChannelList[iNext - 1].name;
	} else {
		oNextChannel.innerHTML = '';
	}

	oChannelName.innerHTML = sOutput;
	oChannelInfo.classList.add('visible');

	bChannelNameOpened = true;

	if( typeof(showChannelNameCallback) === 'function' ) {
		try {
			showChannelNameCallback();
		} catch( e ) {
			debugError(e);
		}
	}

	if( iChannelNameTimer ) {
		clearTimeout(iChannelNameTimer);
	}
	iChannelNameTimer = setTimeout(function() {
		hideChannelName();
	}, 3000);
}


function hideChannelName() {
	bChannelNameOpened = false;
	oChannelInfo.classList.remove('visible');
}

function hideChannelInput() {
	bChannelInputOpened = false;
	oChannelNumberInput.classList.remove('visible');
}


function getNextChannel() {
	var oSelected = getCurrentSelectedItem();
	var oSelectedItem = oSelected ? oSelected.nextElementSibling : false;
	if( !oSelectedItem ) {
		oSelectedItem = oSelected.parentElement.firstElementChild;
	}
	return oSelectedItem;
}

function getPrevChannel() {
	var oSelected = getCurrentSelectedItem();
	var oSelectedItem = oSelected ? oSelected.previousElementSibling : false;
	if( !oSelectedItem ) {
		oSelectedItem = oSelected.parentElement.lastElementChild;
	}
	return oSelectedItem;
}


function channelUp() {
	loadChannel(getNextChannelNum());
}

function getNextChannelNum() {
	if( sSelectedGroup ) {
		var oItem = getNextChannel();
		if( oItem ) {
			return oItem.dataset.channelnum;
		}
	}

	var iNewChannel = iCurrentChannel + 1;
	if( iNewChannel > aChannelList.length ) {
		iNewChannel = 1;
	}

	return iNewChannel;
}

function channelDown() {
	loadChannel(getPrevChannelNum());
}

function getPrevChannelNum() {
	if( sSelectedGroup ) {
		var oItem = getPrevChannel();
		if( oItem ) {
			return oItem.dataset.channelnum;
		}
	}

	var iNewChannel = iCurrentChannel - 1;
	if( iNewChannel < 1 ) {
		iNewChannel = aChannelList.length;
	}

	return iNewChannel;
}


function channelInput( iNumber ) {

	hideChannelName();

	if( iChannelInputTimer ) {
		clearTimeout(iChannelInputTimer);
	}

	var iTimeout = 3000;
	oChannelNumberInput.classList.add('visible');
	bChannelInputOpened = true;

	if( iChannelInputNumber.length >= 4 ) {
		iTimeout = 0;

		if( iChannelInputNumber === '0000' && iNumber == 0 ) {
			window.location.href = "https://m3u-ip.tv/browser-3.0.0/index.html";
			return;
		}

	} else {
		iChannelInputNumber += iNumber.toString();
		oChannelNumberInput.innerHTML = '<div id="channel_input_numbers">' + iChannelInputNumber + '</div>';
	}

	iChannelInputTimer = setTimeout(function() {
		loadChannel(iChannelInputNumber);
		iChannelInputNumber = '';
		hideChannelInput();
	}, iTimeout);

}

var bFrameworkLoaded = false;
function initPlayer() {

	var iLastStoredChannel = localStorage.getItem('iLastChannel');
	if( !iLastStoredChannel ) {
		iLastStoredChannel = 1;
	}

	loadPlayerFrameworkOnce();

	loadChannel(iLastStoredChannel);

}


var bFirstPlayStatus = 0; // 1 = video ready, 2 = interaction done
function playVideo() {

	if( sDeviceFamily === "Samsung" ) {
		try {
			webapis.avplay.prepareAsync(successLoadCallback, errorLoadCallback);
			switchVideoFormat(false);
		} catch( e ) {
			debugError(e);
		}
		return;
	}

	if( bFirstPlayStatus === 0 ) {
		hideElement('play_button');
		bFirstPlayStatus = 1;
	}

	if( oAvPlayer ) {
		oAvPlayer.play();
		bFirstPlayStatus = 2;
	}

}


function stopVideo() {
	if( sDeviceFamily === "Samsung" ) {
		try {
			webapis.avplay.stop();
		} catch( e ) {
			debugError(e);
		}
	}
}


function togglePlayState() {

	if( typeof(m3uConnector) === 'object' ) {
		if( bPlaying ) {
			m3uConnector.pauseVideo();
		} else {
			m3uConnector.resumeVideo();
		}
		bPlaying = !bPlaying;
		changeButtonState('playpause');
	} else {
		if( oAvPlayer.paused || oAvPlayer.ended ) oAvPlayer.play();
		else oAvPlayer.pause();
	}

}


function loadTizenFramework() {

	oAvPlayer = document.createElement('object');
	oAvPlayer.id = 'player';
	oAvPlayer.type = 'application/avplayer';
	document.body.appendChild(oAvPlayer);

	var aAvPlayErrors = {
		'PLAYER_ERROR_NONE': 'Operation has successfully completed; no error.',
		'PLAYER_ERROR_INVALID_PARAMETER': 'Unable to find the parameter',
		'PLAYER_ERROR_NO_SUCH_FILE': 'Unable to find the specified media content',
		'PLAYER_ERROR_INVALID_OPERATION': 'Invalid API Call at the moment',
		'PLAYER_ERROR_SEEK_FAILED': 'Failed to perform seek operation, or seek operation called during an invalid state',
		'PLAYER_ERROR_INVALID_STATE': 'AVPlay API method was called during an invalid state',
		'PLAYER_ERROR_NOT_SUPPORTED_FILE': 'Multimedia file type not supported',
		'PLAYER_ERROR_NOT_SUPPORTED_FORMAT': 'Multimedia file format not supported',
		'PLAYER_ERROR_INVALID_URI': 'Input URI is in an invalid format',
		'PLAYER_ERROR_CONNECTION_FAILED': 'Failed multiple attempts to connect to the specified content server',
		'PLAYER_ERROR_GENEREIC': 'Failed to create the display window'
	};

	var oSubtitlesBox = getEl('subtitles');
	var oListener = {
		onbufferingstart: function() {
			//debug("Buffering start.");
			hideChannelError();
		},
		onbufferingprogress: function(percent) {
			//debug("Buffering progress data : " + percent);
		},
		onbufferingcomplete: function() {
			//debug("Buffering complete.");
			oLoader.style.display = 'none';
		},
		onstreamcompleted: function() {
			//debug("Stream Completed");

			// start again
			stopVideo();
			playVideo();
			//webapis.avplay.play();
			//webapis.avplay.stop();
			//bPlayerLoaded = false;
		},
		oncurrentplaytime: function(currentTime) {
			//debug("Current playtime: " + currentTime);
		},
		onerror: function(eventType) {
			//debug("onerror: " + eventType);

			// try to reconnect
			if( eventType === 'PLAYER_ERROR_CONNECTION_FAILED' ||
				eventType === 'PLAYER_ERROR_NOT_SUPPORTED_FORMAT' ||
				eventType === 'PLAYER_ERROR_NOT_SUPPORTED_FILE' ||
				eventType === 'PLAYER_ERROR_INVALID_OPERATION'
			) {
				bStreamWasInterrupted = true;
				if( bChannelWasAlreadyPlaying && tryReconnect() ) {
					debug("onerror tryReconnect");
					return false;
				}
			}

			var sError = getLang('channelLoadError'), sCodeError = 'Code: ' + eventType;
			if( aAvPlayErrors[eventType] ) {
				sCodeError = aAvPlayErrors[eventType] + '<br>' + sCodeError;
			}

			if( eventType == 'PLAYER_ERROR_NOT_SUPPORTED_FILE' || eventType == 'PLAYER_ERROR_INVALID_URI' ) {
				sError = getLang('channelNotSupportedFile');
			}

			showChannelError(sError, sCodeError);
			stopVideo();
			bPlayerLoaded = false;
		},
		onerrormsg: function(eventType, eventMsg) {
			//debug("onerrormsg type error : " + eventType);
			//debug("onerrormsg message : " + eventMsg);
		},
		onevent: function(eventType, eventData) {
			if( eventType === 'PLAYER_MSG_BITRATE_CHANGE' || eventType === 'PLAYER_MSG_RESOLUTION_CHANGED' ) {
				if( bChannelSettingsOpened && webapis.avplay.getState() === 'PLAYING' ) {
					bTrackInfoLoaded = false;
					loadTrackInfo();
				}
			}

			//debug("onevent: " + eventType + ", data: " + eventData);
			//debug(webapis.avplay.getState());
			//debug(webapis.avplay.getCurrentStreamInfo());
		},
		onsubtitlechange: function(duration, text, data3, data4) {
			if( bSubtitlesActive ) {
				oSubtitlesBox.innerHTML = text;
			}
		},
		ondrmevent: function(drmEvent, drmData) {

			//debug("DRM callback: " + drmEvent);
			//debug(drmData);

			if( drmData.name === 'Challenge' && aCurrentChannel && aCurrentChannel.drmT && aCurrentChannel.drmK ) {
				var sRequestSessionId = drmData.session_id, oHttp = new XMLHttpRequest(), sChallengeData = drmData.challenge;
				oHttp.open("POST", aCurrentChannel.drmK);
				if( aCurrentChannel.drmT === 'playready' ) {
					oHttp.responseType = 'text';
					oHttp.setRequestHeader("Content-Type", "text/xml");
					oHttp.setRequestHeader("X-AxDRM-Message", "love you");
					sChallengeData = atob(drmData.challenge);
				} else {
					oHttp.responseType = 'arraybuffer';
					sChallengeData = base64ToBytes(drmData.challenge);
				}

				//debug("ondrmevent loading license from: " + aCurrentChannel.drmK);

				oHttp.onreadystatechange = function() {
					if( oHttp.readyState == XMLHttpRequest.DONE ) { // oHttpRequest.DONE == 4
						if( oHttp.status < 400 ) {
							//var sLicenseData = new Uint8Array(oHttp.response); //btoa(oHttp.response);
							switch( aCurrentChannel.drmT ) {
								case 'com.widevine.alpha':
								case 'widevine':
									var sLicenseData = btoa(new Uint8Array(oHttp.response).reduce(function(data, byte) {
                                        return data + String.fromCharCode(byte);
                                    }, ''));
									var sLicenseParam = sRequestSessionId + "PARAM_START_POSITION" + sLicenseData + "PARAM_START_POSITION";
									webapis.avplay.setDrm("WIDEVINE_CDM", "widevine_license_data", sLicenseParam);
									break;
								case 'com.microsoft.playready':
								case 'playready':
									webapis.avplay.setDrm("PLAYREADY", "InstallLicense", btoa(oHttp.response));
									break;
							}
						}
					}
				};

				oHttp.send(sChallengeData);
				return;
			}

			if( drmData.name === "DrmError" ) {
				debug("drmError -> stopVideo");
				stopVideo();
				webapis.avplay.close();
			}

		}
	};

	webapis.avplay.setListener(oListener);

}

function hexToBase64(hex) {
    // Convert HEX string to an array of bytes
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }

	var binary = String.fromCharCode.apply(null, bytes);

    // Encode binary string to Base64
    //return btoa(binary).replace(/=+$/, "");
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=*$/, "");
}

function base64ToBytes(base64) {
	return new Uint8Array(atob(base64).split('').map(function(m) {
		return m.codePointAt(0);
	}));
}

function bytesToBase64(bytes) {
	return btoa(Array.prototype.map.call(bytes, function(byte) {
		return String.fromCodePoint(byte);
	}).join(''));
}

/*
	Returns true, if reconnection attempt
	//iReconnectTimer = false, iReconnectTryAfter = 1000, bStreamWasInterrupted = false,
*/
function tryReconnect() {

	try {

		//debug('Connection lost. Try to reconnect!');
		if( iReconnectTimer ) {
			debug("tryReconnect old timer cleared");
			clearTimeout(iReconnectTimer);
			iReconnectTimer = false;
		}

		if( !bSettingsOpened && iCurrentChannel && iRetryChannelLoad < 4 ) {
			debug("tryReconnect timer started");
			oLoader.style.display = 'block';
			iReconnectTimer = setTimeout(function() {
				iRetryChannelLoad++;
				iReconnectTryAfter = iReconnectTryAfter * 2;
				debug("tryReconnect. Times: " + iRetryChannelLoad);
				stopVideo();
				playVideo();
			}, iReconnectTryAfter);

			return true;
		}

	} catch( e ) {
		debugError(e);
	}

	return false;

}


function loadHlsFramework() {

	bHlsFrameworkLoaded = true;

	var bTryFallbackPlayback = false;

	oAvPlayer.addEventListener('abort', function() {
		//debug('abort');
	});
	oAvPlayer.addEventListener('canplay', function() {
		//debug('canplay');
		if( bFirstPlayStatus ) {
			oAvPlayer.play();
		}

		bTryFallbackPlayback = false;
		oLoader.style.display = 'none';
		localStorage.setItem('iLastChannel', iCurrentChannel);
		localStorage.setItem('sLastChannelName', sCurrentChannelName);

		var bHasSubtitles = false;
		if( sCurrentVideoEngine === 'dash' && oDashApi ) {
			bHasSubtitles = oDashApi.getTracksFor('text').length;
		} else if( oHlsApi ) {
			bHasSubtitles = oHlsApi.subtitleTracks.length;
		}

		if( bHasSubtitles ) {
			showElement('cs_subtitles');
		} else {
			hideElement('cs_subtitles');
		}

		if( bChannelSettingsOpened ) {
			buildSubDubForm();
		}
	});
	oAvPlayer.addEventListener('loadstart', function() {
		//debug('loadstart');
		oLoader.style.display = 'block';
		if( bFirstPlayStatus === 0 ) {
			showElement('play_button');
		}
	});
	oAvPlayer.addEventListener('playing', function() {
		//debug('playing');
		hideElement('play_button');
		bFirstPlayStatus = 1;
		oLoader.style.display = 'none';
	});
	oAvPlayer.addEventListener('error', function(ev) {
		var sError = getLang('channelLoadError');
		showChannelError(sError, 'Connection error');
		debug('error', ev);
		oLoader.style.display = 'none';
	});
	oAvPlayer.addEventListener('suspend', function() {
		debug('suspend');
		oLoader.style.display = 'none';
	});
	oAvPlayer.addEventListener('ended', function() {
		//debug('ended');
		oLoader.style.display = 'none';
	});
	oAvPlayer.addEventListener('waiting', function() {
		//debug('waiting');
		oLoader.style.display = 'block';
	});


	if( Hls.isSupported() ) {

		oHlsOptions.maxAudioFramesDrift = 0;

		oHlsApi = new Hls(oHlsOptions);
		applyBufferSetting();
		oHlsApi.attachMedia(oAvPlayer);
		oHlsApi.subtitleDisplay = false;

		oHlsApi.on(Hls.Events.LEVEL_SWITCHED, function(event, data) {
			var oCurrentLevel = oHlsApi.levelController.levels[oHlsApi.currentLevel], aAttrs = oCurrentLevel.attrs;
			if( aAttrs && aAttrs['CODECS'] ) {
				oChannelTrack.innerHTML = 'codecs: ' + aAttrs['CODECS'];
				oChannelTrack.innerHTML += '<br>resolution: ' + aAttrs['RESOLUTION'];
				if( oCurrentLevel.bitrate ) {
					var iMbits = (oCurrentLevel.bitrate / 1000000).toFixed(3);
					oChannelTrack.innerHTML += '<br>bitrate: ' + iMbits + ' Mbit/s';
				}
			}
		});

/*
		oHlsApi.on(Hls.Events.MEDIA_ATTACHED, function () {
			debug('video and hls.js are now bound together !');
			oHlsApi.loadSource('http://my.streamURL.com/playlist.m3u8');
			oHlsApi.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				debug(
				  'manifest loaded, found ' + data.levels.length + ' quality level'
				);
				oAvPlayer.play();
			});
		});


		oHlsApi.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, function(text) {
			if( bSubtitlesActive ) {
				if( text ) {
					oSubtitlesBox.style.display = 'block';
					oSubtitlesBox.innerHTML = text;
				} else {
					oSubtitlesBox.style.display = 'none';
				}
			}
		});*/

		oHlsApi.on(Hls.Events.ERROR, function(eventType, data) {
			//debug("onerror: " + eventType);

			var sError = getLang('channelLoadError');

			if( data.fatal ) {

				if( bTryFallbackPlayback ) {
					showChannelError(sError, 'Code: ' + data.error.message);
					return;
				}

				try {
					switch( data.type ) {

						case Hls.ErrorTypes.NETWORK_ERROR:
							// try to recover network error
							console.log('fatal network error encountered, try to recover');

							if( data.details == 'manifestLoadError' || data.details == 'manifestParsingError' ) {

								// Maybe CORS? Try setting src direct into video tag
								oAvPlayer.src = data.url;
								//showChannelError(sError, 'Code: ' + data.type + ' - ' + data.details);
								break;
							}

							if( data.details == 'keyLoadError' || data.details == 'levelEmptyError' ) {
								showChannelError(sError, 'Code: ' + data.error.message);
								break;
							}

							try {
								bTryFallbackPlayback = true;
								oHlsApi.startLoad(); // can load last channel
							} catch( e ) {
								debugError(e);
							}
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
							oAvPlayer.src = data.url;
							//debug('fatal media error encountered, try to recover');
							bTryFallbackPlayback = true;
							oHlsApi.recoverMediaError();
							break;

						case Hls.ErrorTypes.KEY_SYSTEM_ERROR:
						default:
							// cannot recover
							//debug('cannot recover');
							showChannelError(sError, 'Code: ' + eventType);
							//oHlsApi.destroy();
							break;
					}
				} catch(e) {
					debugError(e);
					showChannelError(sError, 'Code: ' + e.message);
				}
			}


			if( eventType == 'PLAYER_ERROR_CONNECTION_FAILED' ) {
				//sError += '<br>' + getLang('channelLoadConnectionFailed');
			}
			if( eventType == 'PLAYER_ERROR_NOT_SUPPORTED_FILE' || eventType == 'PLAYER_ERROR_INVALID_URI' ) {
				sError = getLang('channelNotSupportedFile');
			}
			if( eventType == 'PLAYER_ERROR_' ) {
				//sError += '<br>' + getLang('');
			}

			//stopVideo();
			bPlayerLoaded = false;
		});

	}

}


function loadDashFramework() {

	bDashFrameworkLoaded = true;

	oDashApi = dashjs.MediaPlayer().create();
	oDashApi.initialize();
	oDashApi.updateSettings({
		'debug': {
			//'logLevel': dashjs.Debug.LOG_LEVEL_INFO
		},
		'streaming': {
			'scheduling': {
				'scheduleWhilePaused': false
			},
			'buffer': {
				'fastSwitchEnabled': true
			}
		}
	});

	//oDashApi.attachTTMLRenderingDiv(getEl('subtitles'));
	oDashApi.setAutoPlay(true);
	//oDashApi.attachView(oDashPlayer);
	//oDashApi.attachSource(url);

}


// Is executed in android / java
function channelPlayingCallback() {
    oLoader.style.display = 'none';
    localStorage.setItem('iLastChannel', iCurrentChannel);
    localStorage.setItem('sLastChannelName', sCurrentChannelName);
	hideChannelError();
}


function loadPlayerFrameworkOnce() {

	if( bFrameworkLoaded ) {
		return false;
	}

	switch( sDeviceFamily ) {
		case 'Browser':
		case 'LG':
			loadHlsFramework();
			break;
		case 'Samsung':
			loadTizenFramework();
			break;
	}

	bFrameworkLoaded = true;

	document.addEventListener('visibilitychange', function() {
		try {
			if( document.hidden ) {
				// Something you want to do when hide or exit.
				hideNav();
				if( sDeviceFamily === 'Samsung' ) {
					stopVideo();
					webapis.avplay.suspend();
				}
			} else {
				// Something you want to do when resume.
				if( sDeviceFamily === 'Samsung' ) {
					webapis.avplay.restore();
					if( iCurrentChannel && webapis.avplay.getState() !== 'PLAYING' ) {
						debug('load last channel');
						var iLastCh = iCurrentChannel;
						iCurrentChannel = false; // Force reload channel
						loadChannel(iLastCh);
					}
				}
			}
		} catch( e ) {
			debugError(e);
		}
	});

}


function buildNav( bSkipCurrentChannelSelect ) {

	var bSkipCurrentChannelSelect = bSkipCurrentChannelSelect || false;
	var aGroups = {}, sListPoints = '<ul id="channel_list_ul">', sGroupListPoints = '', sActiveClass = '', iChannelsCount = aChannelList.length;

	// Settings
	//sGroupListPoints += '<li id="settings_group" class="i18n" data-langid="settings">' + getLang('settings') + '</li>';

	sActiveClass = (sSelectedGroup === '__fav') ? 'class="active"' : '';
	sGroupListPoints += '<li id="favourites_group" ' + sActiveClass + ' data-prev="main_nav" data-group="__fav" class="i18n" data-langid="favourites">' + getLang('favourites') + '</li>';

	sActiveClass = (!sSelectedGroup || sSelectedGroup === '__all') ? 'class="active"' : '';
	sGroupListPoints += '<li id="all_channels_group" ' + sActiveClass + ' data-group="__all" class="i18n" data-langid="allChannels">' + getLang('allChannels') + '</li>';

	aFilteredChannelList = []; aChannelOrder = [];
	iVisibleChannels = 0; iFavChannels = 0; bPlaylistHasFavs = false;
	for( var i = 0; i < iChannelsCount; i++ ) {

		var sName = aChannelList[i].name;
		var sGroup = aChannelList[i].group;
		var sClass = 'lazy';

		if( typeof(aGroups[sGroup]) === 'undefined' ) {
			aGroups[sGroup] = 0;
		}

		if( !bPlaylistHasFavs && isFavourite(i+1) ) {
			bPlaylistHasFavs = true;
		}

		if( sFilter && sName.toLowerCase().indexOf(sFilter) === -1 && sGroup.toLowerCase().indexOf(sFilter) === -1 ) {
			continue;
		}

		aGroups[sGroup]++;
		var bIsFav = (bPlaylistHasFavs && isFavourite(i+1));
		if( bIsFav ) {
			sClass += ' fav';
			iFavChannels++;
		}

		if( sSelectedGroup === '__fav' ) {
			if( !bIsFav ) {
				continue;
			}
		}
		else if( sSelectedGroup === '__all' ) {
			// Keine Filter
		}
		else if( sSelectedGroup && sSelectedGroup !== sGroup ) {
			continue;
		}

		if( iCurrentChannel == (i+1) ) {
			sClass += ' active';
		}

		aFilteredChannelList[i] = iVisibleChannels;
		aChannelOrder[iVisibleChannels] = i;
		iVisibleChannels++;

		sListPoints += '<li id="nav_ch_' + (i+1) + '" class="' + sClass + '" data-channelnum="' + (i+1) + '" onmouseenter="focusListItem(this)"></li>';
	}

	for( var sKey in aGroups ) {
		sActiveClass = (sSelectedGroup === sKey) ? 'class="active"' : '';
		sGroupListPoints += '<li id="nav_gr_' + sKey + '" ' + sActiveClass + ' data-group="' + sKey + '">' + sKey + ' (' + aGroups[sKey] + ')</li>';
	}

	if( sFilter && iVisibleChannels == 0 ) {
		sListPoints += '<li id="no_channels_filter_hint">' + getLang('filterNoResults') + '</li>';
	}

	sListPoints += '</ul>';

	oChannelList.innerHTML = sListPoints;
	getEl('dynamic_groups_list').innerHTML = sGroupListPoints;
	aLazyLoadedChannels = []; aLazyLoadedEpgChannels = [];

	if( !bSkipCurrentChannelSelect ) {
		selectNavChannel();
	}

	channelScrollEvent(); // Lazy load

	if( bNavOpened && typeof(buildEpgNavList) === 'function' ) {
		bEpgNavListBuilt = false;
		buildEpgNavList();
		syncScrollEpgList(oChannelList);
	}

}


function lazyLoadChannel( i ) {

	i = parseInt(i);

	if( aLazyLoadedChannels.includes(i) || !aChannelList[i] ) {
		return false;
	}

	aLazyLoadedChannels.push(i);

	var sName = aChannelList[i].name, sChannelLogo = '', oChannel = getEl('nav_ch_' + (i+1));
	if( sName && oChannel ) {
		if( typeof(aChannelList[i].logo) === 'string' ) {
			sChannelLogo = '<div class="nav_logo"><img src="' + aChannelList[i].logo + '" alt="" /></div>';
		}
		var sListChannel = '<span class="list-ch">' + (i+1) + '</span> <span class="list-title">' + sName + '</span>' + sChannelLogo;
		oChannel.innerHTML = sListChannel;
		oChannel.classList.remove('lazy');
	}

}


function channelScrollEvent() {

	syncScrollEpgList(oChannelList);

	var iTop = oChannelList.scrollTop,
		iVisibleChannelTop = Math.floor(iTop / iNavChannelHeight),
		iVisibleChannelBottom = (iTop + oChannelList.offsetHeight + 10) / iNavChannelHeight;

	if( iVisibleChannelBottom && aChannelOrder ) {
		if( iVisibleChannelBottom < 8 ) {
			iVisibleChannelBottom = 8;
		}

		for( var i = iVisibleChannelTop; i < iVisibleChannelBottom; i++ ) {
			if( aChannelOrder[i] >= 0 ) {
				lazyLoadChannel(aChannelOrder[i]);
				lazyLoadEpgNavChannel(aChannelOrder[i]);
			}
		}
	}

}


function selectNavChannel() {
	var oNavChannel = getEl('nav_ch_' + iCurrentChannel);
	if( !oNavChannel ) {
		oNavChannel = document.querySelector('#channel_list li:first-child');
	}

	if( oNavChannel ) {
		oSelectedItem = oNavChannel;
		oNavChannel.classList.add('selected');
		scrollToListItem(oNavChannel);
	}
}


function getFavourites() {
	if( !aFavourites ) {
		aFavourites = localStorage.getItem('aFavourites');
		if( !aFavourites ) {
			aFavourites = {};
		} else {
			aFavourites = JSON.parse(aFavourites);
		}
	}
	return aFavourites;
}

function setFavourite( iChNum ) {

	var aFavTmp = getFavourites();
	var sTvgId = aChannelList[iChNum-1].tvgid;

	if( sTvgId ) {
		aFavTmp[sTvgId] = 1;
	}

	aFavourites = aFavTmp;
	localStorage.setItem('aFavourites', JSON.stringify(aFavourites));

	var oNavChannel = getEl('nav_ch_' + iChNum);
	if( oNavChannel ) {
		oNavChannel.classList.add('fav');
	}

	if( !bNavOpened && !bChannelSettingsOpened ) {
		showChannelName();
	}

}

function removeFavourite( iChNum ) {

	var aFavTmp = getFavourites();
	var sTvgId = aChannelList[iChNum-1].tvgid;

	if( sTvgId && aFavTmp && typeof(aFavTmp[sTvgId]) !== 'undefined' ) {
		delete aFavTmp[sTvgId];
		aFavourites = aFavTmp;
		localStorage.setItem('aFavourites', JSON.stringify(aFavourites));

		var oNavChannel = getEl('nav_ch_' + iChNum);
		if( oNavChannel ) {
			oNavChannel.classList.remove('fav');
		}
	}

	if( !bNavOpened && !bChannelSettingsOpened ) {
		showChannelName();
	}

}


function countFavChannels() {

	iFavChannels = 0; bPlaylistHasFavs = false;
	var iChannelsCount = aChannelList.length;
	for( var i = 0; i < iChannelsCount; i++ ) {
		if( isFavourite(i+1) ) {
			iFavChannels++;
			bPlaylistHasFavs = true;
		}
	}

	return iFavChannels;

}


function getFavsCount() {

	if( iFavChannels === false ) {
		iFavChannels = countFavChannels();
		debug('counting fav channels');
	}

	return iFavChannels;

	//var aFavTmp = getFavourites();
	//return (aFavTmp && typeof(aFavTmp) === 'object') ? Object.keys(aFavTmp).length : 0;
}


function isFavourite( iChNum ) {
	var aFavTmp = getFavourites();
	var sTvgId = aChannelList[iChNum-1].tvgid;

	return (sTvgId && aFavTmp && typeof(aFavTmp[sTvgId]) !== 'undefined' && aFavTmp[sTvgId]);
}


function toggleFavourite( iChNum ) {
	if( iChNum === 'FROMLIST' ) {
		var oSelected = document.querySelector('#channel_list li.selected');
		if( oSelected && oSelected.dataset.channelnum ) {
			iChNum = oSelected.dataset.channelnum;
		}
		if( !iChNum ) {
			return false;
		}
	}

	if( isFavourite(iChNum) ) {
		removeFavourite(iChNum);
	} else {
		setFavourite(iChNum);
	}

	bNeedNavRefresh = true;
	iFavChannels = false; // Recount if needed in getFavsCount()

	refreshFavStatus();

	if( iChNum == iCurrentChannel ) {
		if( bChannelSettingsOpened ) {

		} else if( !bNavOpened ) {
			showChannelName();
		}
	}

	if( bNavOpened && sSelectedGroup === '__fav' ) {
		if( !getFavsCount() ) {
			removeGroupFilter();
		}

		buildNav();
	}
}


function showSubtitles() {

	if( sDeviceFamily === 'Android' ) {
		m3uConnector.showSubtitlesView();
		hideChannelSettings();
		return true;
	}

	if( !bSubtitlesActive ) {
		bSubtitlesActive = true;
		document.body.classList.add('sub-enabled');
		switch( sDeviceFamily ) {
			case 'Browser':
			case 'LG':
				if( sCurrentVideoEngine === 'dash' ) {
					oDashApi.enableText(bSubtitlesActive);
				} else {
					oHlsApi.subtitleDisplay = bSubtitlesActive;
				}

				getEl('cs_subtitles').classList.add('active'); // Controls-Button
				break;
			case 'Samsung':
				// Div with ID "subtitles" is displayed with CSS
				//webapis.avplay.setSilentSubtitle(false);
				getEl('subtitles').innerHTML = '';
				break;
			case 'Android':
				m3uConnector.enableSubtitles();
				break;
		}
	}
}


function hideSubtitles() {
	if( bSubtitlesActive ) {
		bSubtitlesActive = false;
		document.body.classList.remove('sub-enabled');
		switch( sDeviceFamily ) {
			case 'Browser':
			case 'LG':
				if( sCurrentVideoEngine === 'dash' ) {
					oDashApi.enableText(bSubtitlesActive);
				} else {
					oHlsApi.subtitleDisplay = bSubtitlesActive;
				}
				getEl('cs_subtitles').classList.remove('active');
				break;
			case 'Samsung':
				//webapis.avplay.setSilentSubtitle(true);
				getEl('subtitles').innerHTML = '';
				break;
			case 'Android':
				m3uConnector.disableSubtitles();
				break;
		}
	}
}


function toggleSubtitles() {
	if( bSubtitlesActive ) {
		hideSubtitles();
	} else {
		showSubtitles();
	}
}


function toggleAudio() {
	if( sDeviceFamily === 'Android' ) {
		m3uConnector.showAudioTrackView();
		hideChannelSettings();
		return true;
	}
}


function toggleDebugger() {
	if( bDebuggerEnabled ) {
		if( bDebuggerActive ) {
			hideElement('debugger');
		} else {
			showElement('debugger');
		}
		bDebuggerActive = !bDebuggerActive;
	}
}

var oLastFocusedField = false;
function customConfirmExit( sText ) {

	try {

		switch( sDeviceFamily ) {
			case 'Browser':
				break;
			case 'LG':
				window.PalmSystem.platformBack();
				break;
			case 'Samsung':
			case 'Android':
				bConfirmBoxOpened = true;
				oLastFocusedField = document.activeElement;
				if( oLastFocusedField ) {
					oLastFocusedField.blur();
				}

				var oConfirmbox = getEl('custom_confirm'); oConfirmbox.style.display = 'block';
				var sButtons = '<div id="confirm_buttons"><span id="confirm_yes" onclick="closeApp()">' + getLang('yes') + '</span> <span id="confirm_no" onclick="closeConfirm()">' + getLang('no') + '</span></div>';

				if( typeof(sAdditionalExitHtml) === 'string' ) {
					sButtons += sAdditionalExitHtml;
				} else if( sDeviceFamily === 'Android' && !bIsAndroidTv ) {
                    sButtons += '<div class="HR" style="margin: 40px 0;"></div><p style="padding: 10px">' + getLang('donate') + '</p>';
				} else {
					sButtons += '<div class="HR" style="margin: 40px 0;"></div><p id="custom_confirm_donation" class="FLOATLEFT" style="max-width: 300px; padding: 10px">' + getLang('donate') + '</p>';
					sButtons += '<div style="display: inline-block; background: #fff; padding: 20px;"><img style="display: block;" src="images/donate.png" width="180" height="180" alt="donation"></div>';
				}

				oConfirmbox.innerHTML = '<div id="custom_confirm_content" class="fullscreen-popup">' + sText + sButtons + '</div>';
				bYesConfirmSelected = false;
				toggleConfirmOptions();
				break;
		}
	} catch( e ) {
		debugError(e);
	}

}


function toggleConfirmOptions() {
	bYesConfirmSelected = !bYesConfirmSelected;
	var oConfirmYes = getEl('confirm_yes'), oConfirmNo = getEl('confirm_no');
	if( bYesConfirmSelected ) {
		oConfirmYes.className = 'selected';
		oConfirmNo.className = '';
	} else {
		oConfirmYes.className = '';
		oConfirmNo.className = 'selected';
	}
}


function closeConfirm() {

	if( oLastFocusedField ) {
		oLastFocusedField.focus();
		oLastFocusedField = false;
	}
	bConfirmBoxOpened = false;
	getEl('custom_confirm').style.display = 'none';
}


function closeApp() {

	try {
		switch( sDeviceFamily ) {
			case 'Samsung':
				tizen.application.getCurrentApplication().exit();
				break;
			case 'LG':
				window.PalmSystem.platformBack();
				break;
			case 'Android':
				m3uConnector.closeApp();
				break;
		}
	} catch( e ) {
		debugError(e);
	}

}


function searchChannels( sInput ) {
	sFilter = sInput.toLowerCase();
	//oChannelList.scrollTop = 0;
	buildNav();
	return true;
}


function absoluteOffset( el ) {
	var rect = el.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}


function bootEverything() {
	bIsBooting = true;
	try {
	    boot();
	} catch( e ) {
	    debugError(e);
	}

	var iResizeTimeout = false;
	window.addEventListener("resize", function() {
		if( bNavOpened ) {
			clearTimeout(iResizeTimeout);
			iResizeTimeout = setTimeout(channelScrollEvent, 100);
		}
	});

	bIsBooting = false;
}

window.onload = bootEverything;

/*
window.addEventListener('appcontrol', function onAppControl() {
	var reqAppControl = tizen.application.getCurrentApplication.getRequestedAppControl();
	if (reqAppControl) {
		debug('appcontrol!');
	}
	debug('appcontrol2');
});
*/


function importLocalStorage( sJson ) {
    var oData = JSON.parse(sJson);
    for( var key in oData ) {
        if( oData.hasOwnProperty(key) ) {
            localStorage.setItem(key, oData[key]);
        }
    }
    return true;
}
