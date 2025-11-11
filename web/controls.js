/* Copyright 2024 - Herber eDevelopment - Jaroslav Herber */

var bKeyboardVisible = false, bControlsOpened = false, bUiOpened = false, bPipActive = false, oVolume = false, oVolumeBar = false, bVolumeChange = false;
var iVolumeVisibleTimeout = false, bMouseOpenedNav = false, bMouseOpenedEpg = false;
var bControlsArrowVisible = false;

function doKey( iKeyCode ) {
	document.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': iKeyCode}));
}

function initControls() {

	oInputM3u.onfocus = function(e) {
		document.body.classList.add('keyboard-opened');
		//var aPos = absoluteOffset(this);
		try {
			getEl('settings').scrollTo(0, this.offsetTop - 40);
		} catch( e ) {}
	};

	oInputM3u.onclick = function(e) {
		try {
			getEl('settings').scrollTo(0, this.offsetTop - 40);
		} catch( e ) {}
	};

	oInputM3u.onkeydown = function(e) {
		var k = e.keyCode;
		if( k === 13 ) {
			downloadButton();
			return true;
		}
	};

	oInputM3u.onblur = function(e) {
		document.body.classList.remove('keyboard-opened');
	};

	//debug(tizen.tvinputdevice.getSupportedKeys()); // list all possible keys
	//tizen.tvinputdevice.registerKeyBatch(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Info', 'E-Manual', 'Guide', 'Menu', 'Tools', 'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue']);
	//tizen.tvinputdevice.registerKeyBatch(['ChannelUp', 'ChannelDown', 'PreviousChannel', 'ChannelList', 'MediaPlay', 'MediaStop', 'MediaPause']);

	var aButtons = {
		'ChannelUp': 33,		// Page UP
		'ChannelDown': 34,		// Page Down
		'PreviousChannel': 8,	// Back
		'ChannelList': 2,
		'MediaPlay': 32,		// Space
		'MediaStop': 2,
		'MediaPause': 2,

		'Info': 72,		// H
		'E-Manual': 72,	// H
		'Guide': 72,	// H
		'Menu': 77,		// M
		'Tools': 77,	// M

		'ColorF0Red': 82,		// R
		'ColorF1Green': 71,		// G
		'ColorF2Yellow': 89,	// Y
		'ColorF3Blue': 66,		// B

		'BackButton': 27		// ESC
	};

	if( sDeviceFamily === 'Android' ) {
		aButtons['ChannelUp'] = 1011;
		aButtons['ChannelDown'] = 1012;
		aButtons['PreviousChannel'] = 1017;
		aButtons['ChannelList'] = 1013;
		aButtons['MediaPlay'] = 1014;
		aButtons['MediaStop'] = 1015;
		aButtons['MediaPause'] = 1016;

		aButtons['Info'] = 1005;
		aButtons['E-Manual'] = 1005;
		aButtons['Guide'] = 1006;
		aButtons['Menu'] = 1007;

		aButtons['ColorF0Red'] = 1001;
		aButtons['ColorF1Green'] = 1002;
		aButtons['ColorF2Yellow'] = 1003;
		aButtons['ColorF3Blue'] = 1004;

		aButtons['BackButton'] = 999;
	}

	if( sDeviceFamily === 'LG' ) {
		// https://webostv.developer.lge.com/design/webos-tv-system-ui/remote-control/
		aButtons['ColorF0Red'] = 403;
		aButtons['ColorF1Green'] = 404;
		aButtons['ColorF2Yellow'] = 405;
		aButtons['ColorF3Blue'] = 406; // also Guide
		aButtons['BackButton'] = 461;

		aButtons['Guide'] = 406; // Blue button
		// Page up/down are not supported in LG. Use arrows instead
		aButtons['ChannelUp'] = 38;
		aButtons['ChannelDown'] = 40;
		//aButtons['PreviousChannel'] = 40;
	}

	if( sDeviceFamily === 'Browser' ) {
		aButtons['ChannelUp'] = 38;		// Pfeil nach oben
		aButtons['ChannelDown'] = 40;	// Pfeil nach unten
		// 33 = Bild hoch, bzw. Channel UP in LG
		// 34 = Bild runter, bzw. Channel DOWN in LG
	}

	getEl('sLangId').onkeydown = function(e) {
		var k = e.keyCode;
		if( k == 38 || k == 40 ) {
			return false; // arrow down/up need to switch to other input-field. Not change the value
		}
		return true;
	}

	oSearchField.onfocus = function(e) {
		this.select();
		bSearchFocused = true;
	}

	oSearchField.onblur = function(e) {
		setTimeout(function() {
			bSearchFocused = false;
		}, 100);
	}

	var iSaveButtonIndex = getEl('settings_save_button').dataset.index;

	oSearchField.onkeypress = function(e) {
		if( this.value.length > 14 ) {
			this.value = this.value.substring(0,14);
			return false;
		}
	}

	// Key 113 -> F2 ist mapped as backbutton in android app
	oSearchField.onkeydown = function(e) {
		var k = e.keyCode;
		if( this.value == '' && (k == 37 || k == 39) ) {
			oSearchField.blur();
			return false;
		}

		if( k == 38 || k == 40 || k == 13 || k == 65385 || k == 65376 || k == 10009 || k == 27 || k == 113 || k == aButtons['BackButton'] ) {
			oSearchField.blur();
			return false;
		}

		return true;
	}

	// add eventListener for keydown
	document.addEventListener('keydown', function(e) {

		if( bSearchFocused || e.target.id === 'search_field' ) {
			return false;
		}

		var k = e.keyCode;
		//debug('WebView KeyCode: ' + k);
		// focus in an input. Do default.

		// Disable default behaviour of arrow buttons
		if( k == 38 || k == 40 ) {
			e.preventDefault();
		}

		var oActiveElement = document.activeElement;
		if( bSettingsOpened && oActiveElement && oActiveElement.nodeName === 'INPUT' ) {
			if( (k === 13 || k === 32 || k === 37 || k === 39) && oActiveElement.className.indexOf('switch_input') > -1 ) {
				e.preventDefault();
				oActiveElement.click();
				return true;
			}
			if( k !== 40 && k !== 38 ) {
				return true;
			}
		}

		if( bConfirmBoxOpened ) {
			e.preventDefault();

			switch( k ) {
				case 37: // LEFT
				case 39: // RIGHT
					toggleConfirmOptions();
					break;
				case 13: // OK button (keyboard ENTER)
					if( bYesConfirmSelected ) {
						closeApp();
					} else {
						closeConfirm();
					}
					break;

				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
					closeConfirm();
					break;

			}

			return false;
		}


		if( bHistoryBrowserOpened ) {
			e.preventDefault();

			switch( k ) {
				case 37: // LEFT
				case 39: // RIGHT
					getEl('history_manager_content').classList.toggle('delete-mode');
					break;
				case 38: // UP
					if( getFocusedHistoryItem() ) {
						moveListUp();
					}
					break;
				case 40: // DOWN
					if( getFocusedHistoryItem() ) {
						moveListDown();
					}
					break;
				case 13: // OK button (keyboard ENTER)
					if( getEl('history_manager_content').classList.contains('delete-mode') ) {
						var oItem = document.querySelector('#history_manager_content li.selected .delete-history-item');
						if( oItem ) {
							oItem.onclick();
						}
						return false;
					}

					var oItem = document.querySelector('#history_manager_content li.selected .history-url');
					if( oItem && oItem.innerText ) {
						loadHistoryPlaylist(oItem);
					}
					break;

				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
					closeHistoryBrowser();
					break;

			}

			return false;
		}


		if( bModalOpened ) {
			hideModal(); e.preventDefault();
			return false;
		}

		if( bStatusOpened ) {
			if( iStatusTimeout ) {
				clearTimeout(iStatusTimeout);
			}
			hideStatus(); e.preventDefault();
			return false;
		}

		if( bGuideOpened ) {
			hideGuide(); e.preventDefault();
			return false;
		}

		// Some global keys
		switch( k ) {
			case aButtons['Info']:
			case aButtons['E-Manual']:
				//showGuide();
				showControlsGuide(sDeviceFamily);
				break;
			case aButtons['Guide']:
				showEpgOverview(); return false;
				break;

			case aButtons['Menu']:
			case aButtons['Tools']:
				toggleSettings(); return false;
				break;

			case aButtons['ColorF3Blue']:
				if( sDeviceFamily === 'Samsung' ) {
					toggleDebugger();
				}
				break;

			case 10182: // EXIT
				if( sDeviceFamily === 'Samsung' ) {
					tizen.application.getCurrentApplication().hide();
				}
				break;

		}


		// USB manager opened
		if( bUsbManagerOpened ) {

			e.preventDefault();
			switch( k ) {
				case 38: // UP
					browseFileOperation('up'); break;
				case 40: // DOWN
					browseFileOperation('down'); break;
				case 8: // BACK
				case 37: // LEFT
					browseFileOperation('left'); break;
				case 39: // RIGHT
					browseFileOperation('right'); break;
				case 13: // OK button
					browseFileOperation('ok'); break;
				case 10009: // RETURN
					closeUsbManager();
					break;

			}

			return false;

		}

		// Settings layer opened
		if( bSettingsOpened ) {

			// Premium Settings
			if( bAdvancedSettingsOpened === 3 ) {

				var oCurrentSettingsField = oPremiumSettingsFields[iPremiumSettingsFocusedField];
				switch( k ) {

					case 37: // LEFT
						if( oCurrentSettingsField.dataset.left ) {
							iPremiumSettingsFocusedField = oCurrentSettingsField.dataset.left;
							oPremiumSettingsFields[iPremiumSettingsFocusedField].focus();
							return false;
						}
						return true;
						break;

					case 39: // RIGHT
						if( oCurrentSettingsField.dataset.right ) {
							iPremiumSettingsFocusedField = oCurrentSettingsField.dataset.right;
							oPremiumSettingsFields[iPremiumSettingsFocusedField].focus();
							return false;
						}
						return true;
						break;

					case 38: // UP
						if( oCurrentSettingsField.dataset.up ) {
							iPremiumSettingsFocusedField = oCurrentSettingsField.dataset.up;
						} else {
							iPremiumSettingsFocusedField--;
						}

						if( iPremiumSettingsFocusedField < 0 ) {
							iPremiumSettingsFocusedField = iPremiumSettingsFieldsLength - 1;
						}

						oPremiumSettingsFields[iPremiumSettingsFocusedField].focus();
						break;

					case 40: // DOWN
						if( oCurrentSettingsField.dataset.down ) {
							iPremiumSettingsFocusedField = oCurrentSettingsField.dataset.down;
						} else {
							iPremiumSettingsFocusedField++;
						}

						if( iPremiumSettingsFocusedField >= iPremiumSettingsFieldsLength ) {
							iPremiumSettingsFocusedField = 0;
						}

						oPremiumSettingsFields[iPremiumSettingsFocusedField].focus();
						break;

					case aButtons['BackButton']:
					case 10009: // RETURN
					case 27:	// ESC
					case 113:	// F2 - backbutton in android
						toggleAdvancedSettings(2);
						break;

				}

				return false;

			}


			// Advanced Settings
			if( bAdvancedSettingsOpened === 2 ) {

				var oCurrentSettingsField = oAdvancedSettingsFields[iAdvancedSettingsFocusedField];
				switch( k ) {

					case 37: // LEFT
						if( oCurrentSettingsField.dataset.left ) {
							iAdvancedSettingsFocusedField = oCurrentSettingsField.dataset.left;
							oAdvancedSettingsFields[iAdvancedSettingsFocusedField].focus();
							return false;
						}
						return true;
						break;

					case 39: // RIGHT
						if( oCurrentSettingsField.dataset.right ) {
							iAdvancedSettingsFocusedField = oCurrentSettingsField.dataset.right;
							oAdvancedSettingsFields[iAdvancedSettingsFocusedField].focus();
							return false;
						}
						return true;
						break;

					case 38: // UP
						iAdvancedSettingsFocusedField--;

						if( iAdvancedSettingsFocusedField < 0 ) {
							iAdvancedSettingsFocusedField = iAdvancedSettingsFieldsLength - 1;
						}

						oAdvancedSettingsFields[iAdvancedSettingsFocusedField].focus();
						break;

					case 40: // DOWN
						iAdvancedSettingsFocusedField++;

						if( iAdvancedSettingsFocusedField >= iAdvancedSettingsFieldsLength ) {
							iAdvancedSettingsFocusedField = 0;
						}

						oAdvancedSettingsFields[iAdvancedSettingsFocusedField].focus();
						break;

					case aButtons['BackButton']:
					case 10009: // RETURN
					case 27:	// ESC
					case 113:	// F2 - backbutton in android
						toggleAdvancedSettings(1);
						break;

				}

				return false;

			}

			// General settings
			var oCurrentSettingsField = oSettingsFields[iSettingsFocusedField];
			switch( k ) {

				case 37: // LEFT
					if( oCurrentSettingsField.dataset.left ) {
						iSettingsFocusedField = oCurrentSettingsField.dataset.left;
						oSettingsFields[iSettingsFocusedField].focus();
					}
					e.preventDefault();
					break;

				case 39: // RIGHT
					if( oCurrentSettingsField.dataset.right ) {
						iSettingsFocusedField = oCurrentSettingsField.dataset.right;
						oSettingsFields[iSettingsFocusedField].focus();
					}
					e.preventDefault();
					break;

				case 38: // UP
					if( oCurrentSettingsField.dataset.up ) {
						iSettingsFocusedField = oCurrentSettingsField.dataset.up;
					} else {
						iSettingsFocusedField--;
					}

					if( iSettingsFocusedField < 0 ) {
						iSettingsFocusedField = iSettingsFieldsLength - 1;
					}

					if( !bSaveExitAllowed && iSettingsFocusedField >= iSaveButtonIndex ) {
						iSettingsFocusedField = iSaveButtonIndex - 1; // skip save button
					}

					oSettingsFields[iSettingsFocusedField].focus();
					break;

				case 40: // DOWN
					if( oCurrentSettingsField.dataset.down ) {
						iSettingsFocusedField = oCurrentSettingsField.dataset.down;
					} else {
						iSettingsFocusedField++;
					}

					if( !bSaveExitAllowed && iSettingsFocusedField >= iSaveButtonIndex ) {
						iSettingsFocusedField = 0;
					}

					if( iSettingsFocusedField >= iSettingsFieldsLength ) {
						iSettingsFocusedField = 0;
					}

					oSettingsFields[iSettingsFocusedField].focus();
					break;

				case aButtons['ColorF0Red']:

					var sLangId = getLangId();
					/*
					if( sLangId == 'de' ) {
						getEl('sM3uUrl').value = "https://iptv-org.github.io/iptv/countries/de.m3u";
					} else if( sLangId == 'ru' ) {
						getEl('sM3uUrl').value = "https://iptv-org.github.io/iptv/countries/ru.m3u";
					} else if( sLangId == 'fr' ) {
						getEl('sM3uUrl').value = "https://iptv-org.github.io/iptv/countries/fr.m3u";
					} else if( sLangId == 'it' ) {
						getEl('sM3uUrl').value = "https://iptv-org.github.io/iptv/countries/it.m3u";
					} else if( sLangId == 'es' ) {
						getEl('sM3uUrl').value = "https://iptv-org.github.io/iptv/countries/es.m3u";
					} else {
						getEl('sM3uUrl').value = "https://iptv-org.github.io/iptv/countries/us.m3u";
					}
					*/

					getEl('sM3uUrl').value = "https://m3u-ip.tv/demo-pl.php?lang=" + getLangId();
					focusSettingsField('settings_download_button'); // focus download button
					downloadButton();

					break;

				case aButtons['ColorF1Green']:
					if( bSaveExitAllowed ) {
						saveButton();
					}
					break;
				/*
				case 13: // OK button

					break;
					*/
				case 65376:
					if( document.activeElement && document.activeElement.id === 'sM3uUrl' ) {
						focusSettingsField('settings_download_button'); // focus download button
						downloadButton();
					}

					break;

				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
					if( bSettingsLoaded ) {
						saveButton();
					} else {
						customConfirmExit(getLang('closeAppHint'));
					}

					break;
			}

			return false;
		}


		// EPG overview opened
		if( bEpgOverviewOpened ) {

			e.preventDefault();

			switch( k ) {
				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
				case 69:	// E
					hideEpgOverview();
					break;
				case 38: // UP
					moveToEpgOverviewItem('up');
					break;
				case 40: // DOWN
					moveToEpgOverviewItem('down');
					break;
				case 37: // LEFT
					moveToEpgOverviewItem('left');
					break;
				case 39: // RIGHT
					moveToEpgOverviewItem('right');
					break;

				case aButtons['ChannelUp']: // PAGE UP
				case 33:
					moveToEpgOverviewItem('up10');
					break;
				case aButtons['ChannelDown']: // PAGE DOWN
				case 34:
					moveToEpgOverviewItem('down10');
					break;

				case 13: // OK button
					moveToEpgOverviewItem('enter');
					break;
			}

			return false;

		}


		if( bEpgOpened ) {
			e.preventDefault();

			switch( k ) {
				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
				case 69:	// E
					hideEpg();
					break;
				case 38: // UP
					oEpgChannelContent.scrollTop -= 90;
					break;
				case 40: // DOWN
					oEpgChannelContent.scrollTop += 90;
					break;
				case aButtons['ChannelUp']: // PAGE UP
				case 33:
					oEpgChannelContent.scrollTop = 0;
					break;
				case aButtons['ChannelDown']: // PAGE DOWN
				case 34:
					oEpgChannelContent.scrollTop += 1000;
					break;

				case 13: // OK button
					hideEpg();
					break;
			}

			return false;
		}


		// Channel settings opened
		if( bChannelSettingsOpened ) {

			if( sChannelSetting ) {

				var oSettingSelectBoxes = false;

				// Sub / Dub settings opened
				if( sChannelSetting === 'sub-dub' ) {
					oSettingSelectBoxes = document.querySelectorAll('#channel_settings_subs select');
				} else if( sChannelSetting === 'video' ) {
					oSettingSelectBoxes = document.querySelectorAll('#channel_settings_video select');
				}

				if( oSettingSelectBoxes && oSettingSelectBoxes.length ) {
					switch( k ) {
						case 33: // PAGE UP
						case 38: // UP
							iChannelSettingsFocusedField--;
							if( iChannelSettingsFocusedField < 0 ) {
								iChannelSettingsFocusedField = oSettingSelectBoxes.length - 1;
							}

							oSettingSelectBoxes[iChannelSettingsFocusedField].focus();
							break;
						case 34: // PAGE DOWN
						case 40: // DOWN
							iChannelSettingsFocusedField++;
							if( iChannelSettingsFocusedField >= oSettingSelectBoxes.length ) {
								iChannelSettingsFocusedField = 0;
							}

							oSettingSelectBoxes[iChannelSettingsFocusedField].focus();
							break;

						case 37: // LEFT
							hideChannelSettings(); e.preventDefault();
							break;
						case 39: // RIGHT
							showChannelSettings(); e.preventDefault();
							break;

						case 13: // OK button
							return true;
							break;

						case aButtons['BackButton']:
						case 10009: // RETURN
						case 27:	// ESC
						case 113:	// F2 - backbutton in android
							hideChannelSettings();
							break;
					}

					return false;

				}

			}

			e.preventDefault();

			switch( k ) {

				case 33: // PAGE UP
				case 38: // UP
					oSelectedItem = moveListUp();
					break;
				case 34: // PAGE DOWN
				case 40: // DOWN
					oSelectedItem = moveListDown();
					break;
				case 37: // LEFT
					hideChannelSettings();
					break;
				case 39: // RIGHT
					if( sChannelSetting ) {
						showChannelSettings();
					} else {
						hideChannelSettings();
					}
					break;

				case 13: // OK button
					selectListItem();
					break;

				case aButtons['ColorF2Yellow']:
					toggleFavourite(iCurrentChannel);
					break;

				case aButtons['ColorF1Green']:
					toggleSubtitles();
					break;

				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
					hideChannelSettings();
					break;

			}

			return false;

		}


		// Nav opened
		if( bNavOpened ) {

			e.preventDefault();

			// Edit mode
			if( bChannelEditModeActive ) {

				console.log('bChannelEditModeActive');

				switch( k ) {

					case 37: // LEFT
					case 39: // RIGHT
						toggleChannelEditMode(sChannelEditMode == 'move' ? 'delete' : 'move');
						break;

					case 33: // PAGE UP
					case 38: // UP
						oSelectedItem = moveListUp();
						break;

					case 34: // PAGE DOWN
					case 40: // DOWN
						oSelectedItem = moveListDown();
						break;

					case aButtons['ChannelUp']:
						oSelectedItem = moveListUp(10);
						break;

					case aButtons['ChannelDown']:
						oSelectedItem = moveListDown(10);
						break;

					case 13: // OK button
						console.log(sChannelEditMode);
						if( sChannelEditMode == 'delete' ) {
							removeChannel(oSelectedItem.dataset.channelnum);
						} else {

						}
						break;

					case aButtons['BackButton']:
					case 10009: // RETURN
					case 27:	// ESC
					case 113:	// F2 - backbutton in android
						toggleChannelEditMode('exit');
						break;

				}

				return false;

			}


			switch( k ) {
				case 48: // 0
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: // 9
					channelInput(k - 48);
					hideNav();
					break;

				case 33: // Page UP / Channel UP
					if( !bGroupsOpened ) {
						oSelectedItem = moveListUp(10);
					}
					break;
				case 34: // Page DOWN / Channel DOWN
					if( !bGroupsOpened ) {
						oSelectedItem = moveListDown(10);
					}
					break;
				case 38: // UP
					oSelectedItem = moveListUp();
					break;
				case 40: // DOWN
					oSelectedItem = moveListDown();
					break;
				case 37: // LEFT
					showGroups();
					break;
				case 39: // RIGHT
					if( bGroupsOpened ) {
						hideGroups();
					} else {
						hideNav();
					}
					break;

				case aButtons['ChannelUp']: // for Samsung
					// scroll faster
					if( !bGroupsOpened ) {
						oSelectedItem = moveListUp(10);
					}
					break;

				case aButtons['ChannelDown']: // for Samsung
					// scroll faster
					if( !bGroupsOpened ) {
						oSelectedItem = moveListDown(10);
					}
					break;

				case aButtons['PreviousChannel']:
					// search previous channel in list

					break;
				case 13: // OK button
					/*
					if( bSearchFocused ) {
						oSearchField.blur();
						bSearchFocused = false;
						return false;
					}
					*/
					selectListItem();
					break;

				case aButtons['ColorF0Red']:
					focusSearchField();
					break;

				case aButtons['ColorF2Yellow']:
					if( !bGroupsOpened ) {
						toggleFavourite('FROMLIST');
					}
					break;

				case aButtons['BackButton']:
				case 10009: // RETURN
				case 27:	// ESC
				case 113:	// F2 - backbutton in android
					/*
					if( bSearchFocused ) {
						oSearchField.blur();
						bSearchFocused = false;
						return false;
					}
					*/
					hideNav();
			}

			return false;
		}

		// no other layer opened. Channel playing
		switch( k ) {

			case aButtons['ColorF0Red']:
				focusSearchField();
				break;

			case aButtons['ColorF2Yellow']:
				toggleFavourite(iCurrentChannel);
				break;

			case aButtons['ColorF1Green']:
				toggleSubtitles();
				break;

			case 69:	// E
				e.preventDefault();
				toggleEpgOverview();
				break;

			case 85:	// U
			case 83:	// S
				toggleSubtitles();
				break;

			case aButtons['BackButton']:
			case 10009: // RETURN
			case 27:	// ESC
			case 113:	// F2 - backbutton in android

				if( sDeviceFamily === 'Browser' && document.fullscreenElement && document.exitFullscreen ) {
					document.exitFullscreen();
				} else if( bChannelNameOpened ) {
					hideChannelName();
				} else if( bChannelInputOpened ) {
					hideChannelInput();
				} else if( bEpgOverviewOpened ) {
					hideEpgOverview();
				} else if( bChannelSettingsOpened ) {
					hideChannelSettings();
				} else if( bControlsOpened ) {
                    hideControls();
                } else if( bUiOpened ) {
				    hideUi();
				} else {
					customConfirmExit(getLang('closeAppHint'));
				}

				break;

			case 48: // 0
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57: // 9
				channelInput(k - 48);
				break;

			case aButtons['PreviousChannel']:
				if( iPreviousChannel ) {
					loadChannel(iPreviousChannel);
				}
				break;

			case aButtons['MediaPlay']:
				if( sDeviceFamily === 'Browser' ) {
					togglePlayState();
					return false;
				}
				//webapis.avplay.play();
				//oHlsApi.startLoad();
				break;

			case aButtons['MediaStop']:
				//webapis.avplay.pause();
				showNav();
				break;

			case aButtons['MediaPause']:
				//webapis.avplay.pause();
				break;

			case 10073: // Channel list
			case aButtons['ChannelList']:
				toggleNav();
				break;

			case 33: // Page UP / Channel UP
			case aButtons['ChannelUp']:
				channelUp();
				break;

			case 34: // Page DOWN / Channel DOWN
			case aButtons['ChannelDown']:
				channelDown();
				break;

			case 38: // UP
				if( sDeviceFamily === 'Android' ) {
					channelUp();
				} else if( bDebuggerActive ) {
					// scroll debugger
				} else {
					showNav();
				}
				break;

			case 40: // DOWN
				if( sDeviceFamily === 'Android' ) {
					channelDown();
				} else if( bDebuggerActive ) {
					// scroll debugger
				} else {
					showNav();
				}
				break;

			case 39: // RIGHT
				showChannelSettings();
				break;
			case 37: // LEFT
				showNav();
				break;

			case 13: // OK button
				if( iChannelInputNumber ) {
					clearTimeout(iChannelInputTimer);
					loadChannel(iChannelInputNumber);
					iChannelInputNumber = '';
					//getEl('channel_input').style.display = 'none';
					hideChannelInput();

					return false;
				}

				if( bChannelNameOpened && bChannelHasEpg ) {
					hideChannelName();
					showEpg();
				} else {
					showChannelName();
				}

				break;

			case 73: // i
				showControlsGuide(sDeviceFamily);
				break;

			case 109:	// - (Numpad)
			case 189:	// -
				changeVolume('-', true);
				break;

			case 107:	// + (Numpad)
			case 187:	// +
				changeVolume('+', true);
				break;

			default:
				//showModal('Key code : ' + k);
				//console.log(k);
				break;
		}
	});

	/*
	oChannelList.addEventListener('wheel', function(ev) {
		debug(ev);
	});*/

	initTouchControls();
	switch( sDeviceFamily ) {
		case 'Browser':
		case 'LG':
			initMouseControls();
			break;
		case 'Android':
			initAndroidControls();
			break;
	}

	initVirtualKeyboard();

}


function getNextNodeElement( aNodeList, oCurrentElement ) {



}



function showControlsArrow() {
	if( !bControlsArrowVisible && !bNavOpened ) {
		bControlsArrowVisible = true;
		document.body.classList.add('mousemove');
	}
}

function hideControlsArrow() {
	if( bControlsArrowVisible ) {
		bControlsArrowVisible = false;
		document.body.classList.remove('mousemove');
	}
}


function initMouseControls() {

	oGroupsNav.onwheel = function( oEl ) {
		this.scrollTop += (oEl.wheelDelta < 0 ? 1 : -1) * 162;
		oEl.preventDefault();
	};
	oChannelList.onwheel = function( oEl ) {
		this.scrollTop += (oEl.wheelDelta < 0 ? 1 : -1) * 162;
		oEl.preventDefault();
	};

	document.body.onwheel = function( oEl ) {

		if( bEpgOpened || bEpgOverviewOpened || bNavOpened || bSearchFocused || bConfirmBoxOpened || bGuideOpened || bSettingsOpened || bModalOpened ) {
			return true;
		}

		if( oEl.target.id === 'volume' || oEl.target.id === 'volume_bar' ) {
			changeVolume(oEl.wheelDelta > 0 ? '+' : '-', false);
			return true;
		}

		if( oEl.wheelDelta > 0 ) {
			if( getMousewheelSetting() === 'volume' ) {
				changeVolume('+', true);
			} else {
				channelUp();
			}

		} else {
			if( getMousewheelSetting() === 'volume' ) {
				changeVolume('-', true);
			} else {
				channelDown();
			}
		}

	};

	// Leave window
	document.addEventListener("mouseout", function(e) {
		e = e ? e : window.event;
		var oEl = e.relatedTarget || e.toElement;
		if( !oEl || oEl.nodeName == "HTML" ) {
			if( bEpgOpened ) {
				hideEpg();
			}
		}
	});

	var oPlayer = document.getElementById('player'), iHideArrowTimeout = 0;
	var oPlaybackController = document.getElementById('playback_controller');

	oPlayer.onclick = function() {
		if( !bChannelSettingsOpened ) {
			showChannelName();
		}
	};

	document.getElementById('epg_nav_list_container').addEventListener('mouseover', function(ev) {
		if( bMouseOpenedNav ) {
			hideNav();
		}
	});

	document.getElementById('nav_activator').addEventListener('mouseover', function(ev) {
		bMouseOpenedNav = true;
		hideControlsArrow();
		showNav();
	});

	document.getElementById('controls_activator').addEventListener('mouseover', function(ev) {
		if( bNavOpened ) {
			return false;
		}

		showControls();
		hideNav();
	});

	document.getElementById('epg_activator').addEventListener('mouseover', function(ev) {
		if( bNavOpened ) {
			return false;
		}

		bMouseOpenedEpg = true;
		hideChannelName();
		hideControlsArrow();
		showEpg();
	});

	oPlayer.addEventListener('mousemove', function(ev) {
		clearTimeout(iHideArrowTimeout);
		showControlsArrow();

		// Mouse cursor on left edge - open nav
		/*
		if( ev.pageX < 5 ) {
			bMouseOpenedNav = true;
			showNav();
			return false;
		} else */

		if( bMouseOpenedNav ) {
			hideNav();
			return false;
		}

		if( bNavOpened ) {
			return false;
		}

		// Mouse cursor on right edge - open epg
		//if( (oAvPlayer.offsetWidth - ev.pageX) < 10 ) {
		if( ev.pageY < 30 ) {
			bMouseOpenedEpg = true;
			hideChannelName();
			showEpg();
			return false;
		} else if( bMouseOpenedEpg ) {
			bMouseOpenedEpg = false;
			hideEpg();
			return false;
		}

		//var iPercentY = ev.pageY / oAvPlayer.offsetHeight;
		//if( iPercentY > 0.8 ) {
		if( (oAvPlayer.offsetHeight - ev.pageY) < 90 ) {
			showControls();
			hideControlsArrow();
		} else {
			hideControls();
			iHideArrowTimeout = setTimeout(function() {
				hideControlsArrow();
			}, 500);
		}
	}, {passive: true});

	window.addEventListener('mouseout', function(ev) {
		clearTimeout(iHideArrowTimeout);
		iHideArrowTimeout = setTimeout(function() {
			hideControlsArrow();
			hideControls();
		}, 500);
	}, {passive: true});

	oPlaybackController.addEventListener('mouseout', function(ev) {
		clearTimeout(iHideArrowTimeout);
		iHideArrowTimeout = setTimeout(function() {
			hideControlsArrow();
			hideControls();
		}, 500);
	}, {passive: true});

	oPlaybackController.addEventListener('mouseover', function(ev) {
		clearTimeout(iHideArrowTimeout);
		hideControlsArrow();
		showControls();
	}, {passive: true});


	if( sDeviceFamily === 'Browser' ) {
		initPlaybackControls();
	}

	// Use custom fullscreen
	/*
	document.addEventListener('webkitfullscreenchange', function(ev) {
		ev.preventDefault();
		//toggleFullScreen();
		console.log( ev );
		return false;
	});

	oPlayer.addEventListener('click', function(ev) {
		console.log( ev );
	}, false);
	*/

	if( sDeviceFamily === 'Browser' ) {
		document.addEventListener('contextmenu', function(ev) {
			ev.preventDefault();
			showControlsGuide(sDeviceFamily);
			return false;
		}, false);
	}
}


function initAndroidControls() {

	if( bIsAndroidTv ) {
		return false;
	}

	var oPlayer = document.getElementById('player'), iHideArrowTimeout = 0;
	var oPlaybackController = document.getElementById('playback_controller');

	oPlayer.onclick = function() {
		if( bControlsOpened || bEpgOpened || bChannelSettingsOpened ) {
			clearUi(0);
			return false;
		}

		if( bChannelNameOpened && bChannelHasEpg ) {
			hideChannelName();
			showEpg();
		} else {
			showChannelName();
		}
	};

}


function initTouchControls() {

	var cX = 0, cY = 0, newX = 0, newY = 0, bMoving = false, oBody = document.body;

	oBody.addEventListener("touchstart", touchPlayerStart, {passive: true});
	oBody.addEventListener("touchmove", touchPlayerMove, {passive: true});
	oBody.addEventListener("touchend", touchPlayerEnd, false);

	if( sDeviceFamily === 'Browser' ) {
		oAvPlayer.ondblclick = function() {
			toggleFullScreen();
		};
	}

	function touchPlayerStart(e) {

		if( bEpgOpened || bEpgOverviewOpened || bSearchFocused || bConfirmBoxOpened || bGuideOpened || bSettingsOpened || bModalOpened ) {
			//e.preventDefault();
			bMoving = false;
			return false;
		}

		cX = e.touches[0].screenX;
		cY = e.touches[0].screenY;
		bMoving = true;
	}

	function touchPlayerMove(e) {

		if( !bMoving ) {
			return false;
		}

		//touchPlayerEnd(e);
		if( e.touches.length ) {
			newX = e.touches[0].screenX;
			newY = e.touches[0].screenY;
		}

		// activate if X movement is twice as far as Y movement
		if( (Math.abs(cX - newX)) > (Math.abs(cY - newY) * 2) ) {

			if( (cX - newX) > 100 ) {

				if( bNavOpened ) {
					// RIGHT
					if( bGroupsOpened ) {
						hideGroups();
					} else {
						hideNav();
					}
				} else {
				    showChannelSettings();
				}

				bMoving = false; return false;
			}

			if( (cX - newX) < -100 ) {

				if( bChannelSettingsOpened ) {
				    hideChannelSettings();
				} else if( bNavOpened ) {
					// LEFT
					showGroups();
				} else {
					showNav();
				}

				bMoving = false; return false;
			}

		} else if( !bNavOpened && !bChannelSettingsOpened ) {

			if( (cY - newY) > 80 ) {
				channelUp();
				bMoving = false; return false;
			}

			if( (cY - newY) < -80 ) {
				channelDown();
				bMoving = false; return false;
			}

		}

	}

	var tLastTapTime = 0;
	function touchPlayerEnd(e) {

		if( sDeviceFamily === 'Browser' ) {
			var tNow = new Date().getTime(), tTimeFly = tNow - tLastTapTime;
			if( tTimeFly < 500 && tTimeFly > 0 ) {
				tLastTapTime = 0;
				toggleFullScreen();
				return false;
			}
			tLastTapTime = new Date().getTime();
		}

		if( bFirstPlayStatus === 1 ) {
			playVideo();
		}

		bFirstPlayStatus = 2;

		if( e.touches.length ) {
			newX = e.touches[0].screenX;
			newY = e.touches[0].screenY;
		}

	}


	oChannelList.onclick = function(el) {

		if( is(el.target, 'li') ) {
			oSelectedItem = el.target;
			selectListItem();
		} else if( is(el.target.parentElement, 'li') ) {
			oSelectedItem = el.target.parentElement;
			selectListItem();
		} else if( is(el.target, 'img') ) { // logo
			oSelectedItem = el.target.parentElement.parentElement;
			selectListItem();
		}

	};

	oGroupsNav.onclick = function(el) {

		if( is(el.target, 'li') ) {
			oSelectedItem = el.target;
			selectListItem();
		} else if( is(el.target.parentElement, 'li') ) {
			oSelectedItem = el.target.parentElement;
			selectListItem();
		}

	};

	oChannelSettingsList.onclick = function(el) {
		if( is(el.target, 'li') ) {
			oSelectedItem = el.target;
			selectListItem();
		} else if( is(el.target.parentElement, 'li') ) {
			oSelectedItem = el.target.parentElement;
			selectListItem();
		}
	};

}


var is = function(el, selector) {
	return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};


// LG
function initVirtualKeyboard() {

	document.addEventListener('keyboardStateChange', function(event) {
		if( event.detail.visibility ) {
			console.log("Virtual keyboard appeared");
			bKeyboardVisible = true;
			// Do something.
		} else {
			console.log("Virtual keyboard disappeared");
			bKeyboardVisible = false;

			if( document.activeElement && document.activeElement.nodeName === 'INPUT' ) {
				document.activeElement.blur();
			}

			// Do something.
		}
	}, false);

}


function toggleFullScreen() {
	try {
		if( !document.fullscreenElement ) {
			document.documentElement.requestFullscreen();
			getEl('cs_fs').classList.add('active');
		} else if( document.exitFullscreen ) {
			document.exitFullscreen();
			getEl('cs_fs').classList.remove('active');
		}
	} catch( e ) { }
}


function togglePip() {

	try {
		if( document.pictureInPictureElement ) {
			getEl('cs_pip').classList.remove('active');
			bPipActive = false;
			document.exitPictureInPicture();
		} else if( document.pictureInPictureEnabled ) {
			getEl('cs_pip').classList.add('active');
			bPipActive = true;
			oAvPlayer.requestPictureInPicture();
		}
	} catch( e ) { }

}


function focusSearchField() {

    if( !bNavOpened ) {
        showNav();
    }

    if( bGroupsOpened ) {
        hideGroups();
    }

    oSearchField.blur();
    setTimeout(function() {
        oSearchField.focus();
    }, 501);

}


/* #### Controls #### */
function toggleControls() {
	if( bControlsOpened ) {
		hideControls();
	} else {
		showControls();
	}
}

function showControls() {
	if( !bControlsOpened ) {
		clearUi(0);
		bControlsOpened = true;
		if( typeof(m3uConnector) === 'object' ) {
		    m3uConnector.showControls();
		}
		document.body.classList.add('controls-enabled');
	}
}

function hideControls() {
	if( bControlsOpened ) {
		bControlsOpened = false;
		if( typeof(m3uConnector) === 'object' ) {
            m3uConnector.hideControls();
            return;
        }
		document.body.classList.remove('controls-enabled');
	}
}


function toggleUi() {
    if( bUiOpened ) {
        hideUi();
    } else {
        showUi();
    }
}

function showUi() {
	if( !bUiOpened ) {
		bUiOpened = true;
		if( bEpgLoaded ) {
		    showElement('epg_ui_element');

		    if( bEpgLoaded ) {
		        showEpg();
		    }

		} else {
		    hideElement('epg_ui_element');
		    hideEpg();
		}
		document.body.classList.add('ui-enabled');
	}
}

function hideUi() {
    if( bUiOpened ) {
        bUiOpened = false;
        hideEpg();
        document.body.classList.remove('ui-enabled');
    }
}


function changeButtonState( sType ) {

	if( sType == 'playpause' ) {
		var oPlayPause = document.getElementById('playpause');
		if( oAvPlayer.paused || oAvPlayer.ended ) {
			oPlayPause.setAttribute('data-state', 'play');
			oPlayPause.classList.add('active');
		}
		else {
			oPlayPause.setAttribute('data-state', 'pause');
			oPlayPause.classList.remove('active');
		}
	}
	else if( sType == 'volume' ) {
		var oVolume = document.getElementById('volume');

		if( oAvPlayer.muted ) {
			oVolume.className = 'control-item volume-0';
		} else {
			if( oAvPlayer.volume < 0.6 ) {
				oVolume.className = 'control-item volume-50';
			} else {
				oVolume.className = 'control-item volume-100';
			}
		}
	}

}


function changeVolume( sDir, bVolumneOnly ) {

	bVolumeChange = bVolumneOnly || false;

	if( sDir && oAvPlayer ) {
		var currentVolume = oAvPlayer.volume;
		if( sDir === '+' ) {
			if( currentVolume < 1 ) currentVolume += 0.1;
		}
		else if( sDir === '-' ) {
			if( currentVolume > 0 ) currentVolume -= 0.1;
		}

		setVolume(currentVolume);

		// If the volume has been turned off, also set it as muted
		if( currentVolume <= 0 ) {
			oAvPlayer.muted = true;
			oAvPlayer.volume = 0;
		}
		else oAvPlayer.muted = false;
		oVolume.setAttribute('data-state', oAvPlayer.muted ? 'unmute' : 'mute');

	}

	// change volume with mousewheel
	if( bVolumeChange ) {
		var oPlaybackController = document.getElementById('playback_controller');
		oPlaybackController.classList.add('show-volume');
		if( iVolumeVisibleTimeout ) { clearTimeout(iVolumeVisibleTimeout); }
		iVolumeVisibleTimeout = setTimeout(function() {
			oPlaybackController.classList.remove('show-volume');
		}, 1000);
	}

	changeButtonState('volume');

}


function setVolume( fVol ) {

	if( typeof(fVol) === 'string' ) {
		fVol = parseFloat(fVol);
	}

	fVol = fVol.toFixed(2);

	if( fVol < 0 ) { fVol = 0; }
	else if( fVol > 1 ) { fVol = 1; }

	oAvPlayer.volume = fVol;
	oVolumeBar.value = fVol;
	localStorage.setItem('fVolume', fVol);

}

function transformTime( iSeconds, bAddHours ) {

	var iHours = Math.floor(iSeconds / 3600);
	var iMinutes = Math.floor((iSeconds % 3600) / 60);
	iSeconds = Math.floor(iSeconds % 60);

	if( iMinutes < 10 ) { iMinutes = "0" + iMinutes; }
	if( iSeconds < 10 ) { iSeconds = "0" + iSeconds; }

	if( bAddHours ) {

		if( iHours < 10 ) { iHours   = "0" + iHours; }
		return iHours + ':' + iMinutes + ':' + iSeconds;
	}

	return iMinutes + ':' + iSeconds;
}


function initPlaybackControls() {

	oVolume = document.getElementById('volume');
	oVolumeBar = document.getElementById('volume_bar');

	var fSavedVolume = localStorage.getItem('fVolume');
	if( fSavedVolume ) {
		setVolume(fSavedVolume);
	}

	var oPlayPause = document.getElementById('playpause');
	var oProgress = document.getElementById('progress');

	// Add event listeners for video specific events
	oAvPlayer.addEventListener('play', function() {
		changeButtonState('playpause');
	}, false);
	oAvPlayer.addEventListener('pause', function() {
		changeButtonState('playpause');
	}, false);

	getEl('jump_start').addEventListener('click', function(e) {
		oAvPlayer.currentTime = 0;
	});

	getEl('fast_backwards').addEventListener('click', function(e) {
		if( oAvPlayer.currentTime < 10 ) {
			oAvPlayer.currentTime = 0;
		} else {
			oAvPlayer.currentTime -= 10;
		}
	});

	oPlayPause.addEventListener('click', function(e) {
		togglePlayState();
	});

	getEl('fast_forwards').addEventListener('click', function(e) {
		if( (oAvPlayer.currentTime + 14) < oAvPlayer.duration ) {
			oAvPlayer.currentTime += 10;
		} else {
			oAvPlayer.currentTime = oAvPlayer.duration - 5;
		}
	});

	getEl('jump_end').addEventListener('click', function(e) {
		oAvPlayer.currentTime = oAvPlayer.duration - 5;
	});

	/*
	// The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
	stop.addEventListener('click', function(e) {
		oAvPlayer.pause();
		oAvPlayer.currentTime = 0;
		oProgress.value = 0;
		// Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
		changeButtonState('playpause');
	});
	*/
	oVolume.addEventListener('click', function(e) {
		oAvPlayer.muted = !oAvPlayer.muted;
		if( !oAvPlayer.muted && oAvPlayer.volume <= 0 ) {
			setVolume(0.5);
		}
		changeButtonState('volume');
	});

	oAvPlayer.addEventListener('volumechange', function() {
		changeVolume();
	}, false);

	oVolumeBar.addEventListener('input', function(e) {
		var currentVolume = this.value;
		oAvPlayer.volume = currentVolume;
		// Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
		if( currentVolume <= 0 ) {
			oAvPlayer.muted = true;
		} else {
			oAvPlayer.muted = false;
		}
	});

	oVolumeBar.addEventListener('change', function(e) {
		setVolume(this.value);
	});

	oAvPlayer.addEventListener('loadedmetadata', function() {
		oProgress.setAttribute('max', oAvPlayer.duration);
	});

	// As the video is playing, update the progress bar
	oAvPlayer.addEventListener('timeupdate', function() {
		oProgress.setAttribute('max', oAvPlayer.duration);
		oProgress.value = oAvPlayer.currentTime;
		if( bControlsOpened ) {
			var bAddHours = oAvPlayer.duration > 3599;
			getEl('time_progress').innerText = transformTime(oAvPlayer.currentTime, bAddHours) + ' / ' + transformTime(oAvPlayer.duration, bAddHours);
		}

	});

	oProgress.addEventListener('click', function(e) {
		var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
		oAvPlayer.currentTime = pos * oAvPlayer.duration;
	});

}
