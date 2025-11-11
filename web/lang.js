/* Copyright 2024 - Herber eDevelopment - Jaroslav Herber */

// en, es, it, fr, de, ru, tr, pl, pt, cs, ar, fi, ro, no, el, ko, vi, uk, id, ja, hi, zh

// For old devices!
if( typeof(NodeList.prototype.forEach) === 'undefined' ) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

if( typeof(String.prototype.startsWith) === 'undefined' ) {
	String.prototype.startsWith = function(search, position) {
		position = position || 0;
		return this.substring(position, position + search.length) === search;
	};
}

if( typeof(Element.prototype.scrollTo) === 'undefined' ) {
	Element.prototype.scrollTo = function(x, y) {
		this.scrollLeft = x;
		this.scrollTop = y;
	};
}

if( typeof(Array.prototype.includes) === 'undefined' ) {
	Array.prototype.includes = function(element, fromIndex) {
		fromIndex = fromIndex || 0;
		if( fromIndex < 0 ) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}

		for( var i = fromIndex; i < this.length; i++ ) {
			if( this[i] === element ) {
				return true;
			}
		}
		return false;
	};
}

var i18n = {
'en': {
	'yes': 'yes', 'no': 'no',

	'm3uSource': 'URL to m3u(8)-file',
	'chooseLang': 'Language',
	'usbLoadLabel': 'Playlist from USB',
	'openUsbButton': 'browse USB',
	'localLoadLabel': 'Local m3u(8)-file',
	'openExplorerButton': 'open explorer',
	'openHistoryButton': 'history',
	'downloadButton': 'load playlist',
	'saveButton': 'save and play',
	'deleteButton': 'delete playlist',
	'generalSettingsButton': 'general settings',
	'advancedSettingsButton': 'advanced settings',

	'closeAppHint': 'Do you want to close this app?',
	'hideModalHint': 'Press any button to close this message.',
	'playlistDownloaded': 'Playlist successfully downloaded.<br>%i channels loaded.',
	'channelsLoaded': 'channels',
	'filterNoResults': 'No channels found for the given filter.',

	'redButtonHint': '<span class="red-button">A</span> search',
	'helpHint': 'Press <span class="red-button">A</span>-button to insert demo channel list.<br><br>Press INFO on the remote control at any time for a user guide.',

	'supportContact': 'For more information, visit https://m3u-ip.tv/en',
	'supportContactLinked': 'For more information, visit <a href="https://m3u-ip.tv/en/" target="_blank">https://m3u-ip.tv/en</a>',
	'donate': 'If you like this app, please support me with a little donation.<br>Visit <b class="NOBR">https://m3u-ip.tv</b><br>or via QR-code.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (credit card)',
	'downloadM3uStatus': 'Loading playlist. Please wait a moment.',
	'usbMountedStatus': 'USB mounted',

	'connectionLost': 'Network connection lost. Please check your network.',
	'checkM3uError': 'Could not load playlist. HTTP status-code: ',
	'checkM3uFileError': 'Not a valid m3u(8)-playlist. Please check file.',
	'checkM3uDownloadError': 'Could not load playlist. Please check the URL.',
	'checkM3uDownloadSizeError': 'The playlist contains too many channels. Please reduce them to max 20.000 channels.',
	'checkM3uTimeoutError': 'Timeout occurred while loading your playlist. Please try again.',
	'errorNoUsbMounted': 'No USB storage detected. Please connect a USB storage device first.',
	'errorNoM3uUrl': 'Please enter a valid URL to your m3u(8) playlist.',
	'channelLoadError': 'This channel is not available at the moment. Please try again later.',
	'channelLoadConnectionFailed': '(Connection to the stream failed.)',
	'channelNotSupportedFile': 'This channel cannot be loaded due to an incompatible format.',
	'errorNoFavouritesYet': 'You don\'t have any favorite channels yet. Press the YELLOW button to favorite a channel.',
	'errorNoPlaylistHistory': 'No playlist in history yet. Please insert a URL in the field below.',

	// Menu
	'searchPlaceholder': 'Search',
	'allChannels': 'All channels',
	'favourites': 'â­ Favorites',
	'groups': 'Groups',
	'channels': 'Channels',
	'settings_menu': 'Settings',
	'epg_menu': 'EPG',
	'guide_menu': 'Guide',

	'guideControlsHeadline': 'Controls',

	// Advanced Settings
	'tabGeneralSettings': 'General Settings',
	'tabAdvancedSettings': 'Advanced Settings',
	'chooseMousewheel': 'Mousewheel',
	'volumeSetting': 'Volume up/down',
	'channelSetting': 'Channel forward/back',
	'reloadPlaylistOnStart': 'Download playlist on each start',
	'bufferSetting': 'Buffer',
	'customUserAgentSetting': 'User Agent',

	// Channel Settings
	'loading': 'loading...',
	'audioTrack': 'Audio track',
	'videoTrack': 'Video track',
	'subtitleTrack': 'Subtitle track',
	'channelSettings': 'Channel settings',
	'channelSettingSubtitle': 'subtitle / audio',
	'channelSettingAudio': 'audio',
	'channelSettingVideo': 'video / format',
	'channelSettingFavs': 'put channel in favourites',
	'channelSettingPlayback': 'show playback controls',
	'channelSettingAudioDefault': 'default track',
	'channelSettingSubNoTrack': 'not available',
	'channelSettingSubOff': 'disable',
	'channelSettingResolution': 'resolution',
	'channelSettingFormat': 'Video format',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'fill / stretch',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'EPG source',
	'epgSourceFromPlaylist': 'EPG URL from playlist',
	'usePlaylistEpgUrl': 'Use EPG source from your playlist instead?',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'EPG grab interval',
	'downloadEpgButton': 'download EPG now',
	'noEpgForChannel': 'No EPG for this channel',
	'noEpgUrlGiven': 'No EPG URL set',
	'noEpgUrlInPlaylist': 'Not available in playlist',
	'epgQuotaExceededError': 'Not enough free space to save EPG data. Please free up some space. For example by deleting not used apps.',
	'epgNotCompatibleWithPlaylist': 'Your playlist is not compatible with this EGP-URL.',
	'epgIsDownloading': 'Loading EPG ...',
	'epgChannelsProcessed': 'channels: ',
	'epgProgramsProcessed': 'programs: ',
	'epgNow': 'Now',
	'epgAfter': 'After',

},
'es': {
	'yes': 'sÃ­', 'no': 'no',

	'm3uSource': 'URL del archivo m3u(8)',
	'chooseLang': 'Lenguaje',
	'usbLoadLabel': 'Lista de canales desde USB',
	'openUsbButton': 'navegar por USB',
	'localLoadLabel': 'Archivo m3u(8) local',
	'openExplorerButton': 'abierto explorador',
	'openHistoryButton': 'historia',
	'downloadButton': 'descargar archivo',
	'saveButton': 'guardar y jugar',
	'deleteButton': 'eliminar',
	'generalSettingsButton': 'ajustes generales',
	'advancedSettingsButton': 'avanzado',

	'closeAppHint': 'Â¿Quieres cerrar esta aplicaciÃ³n?',
	'hideModalHint': 'Presione cualquier botÃ³n para cerrar este mensaje.',
	'playlistDownloaded': 'La lista de reproducciÃ³n se descargÃ³ correctamente.<br>%i canales cargados.',
	'channelsLoaded': 'canales',
	'filterNoResults': 'No se encontraron canales para el filtro dado.',

	'redButtonHint': '<span class="red-button">A</span> buscar',
	'helpHint': 'Presione el botÃ³n <span class="red-button">A</span> para insertar la lista de canales de demostraciÃ³n.<br><br>Presione INFO en el control remoto en cualquier momento para obtener una guÃ­a del usuario.',

	'supportContact': 'Para mÃ¡s informaciÃ³n, visite https://m3u-ip.tv/es',
	'supportContactLinked': 'Para mÃ¡s informaciÃ³n, visite <a href="https://m3u-ip.tv/es/" target="_blank">https://m3u-ip.tv/es</a>',
	'donate': 'Si te gusta esta aplicaciÃ³n, apÃ³yame con una pequeÃ±a donaciÃ³n.<br>Visita <b class="NOBR">https://m3u-ip.tv</b><br>o a travÃ©s del cÃ³digo QR.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (tarjeta de crÃ©dito)',
	'downloadM3uStatus': 'Cargando lista de reproducciÃ³n. Por favor, espere un momento.',
	'usbMountedStatus': 'USB mounted',

	'connectionLost': 'Se perdiÃ³ la conexiÃ³n de red. Por favor, compruebe su red.',
	'checkM3uError': 'No se pudo cargar la lista de reproducciÃ³n. CÃ³digo de estado HTTP: ',
	'checkM3uFileError': 'No es una lista de reproducciÃ³n m3u(8) vÃ¡lida. Por favor verifique el archivo.',
	'checkM3uDownloadError': 'No se pudo cargar la lista de reproducciÃ³n. Por favor, compruebe la URL.',
	'checkM3uDownloadSizeError': 'La playlist contiene demasiados canales. RedÃºzcalos a un mÃ¡ximo de 20.000 canales.',
	'checkM3uTimeoutError': 'Se agotÃ³ el tiempo de espera mientras cargaba su lista de reproducciÃ³n. IntÃ©ntalo de nuevo.',
	'errorNoUsbMounted': 'No se detectÃ³ ninguna memoria USB. Primero conecte una memoria USB.',
	'errorNoM3uUrl': 'Ingrese una URL vÃ¡lida para su lista de reproducciÃ³n m3u(8).',
	'channelLoadError': 'Este canal no estÃ¡ disponible en este momento. Por favor, intÃ©ntelo de nuevo mÃ¡s tarde.',
	'channelLoadConnectionFailed': '(Error en la conexiÃ³n a la transmisiÃ³n).',
	'channelNotSupportedFile': 'Este canal no se puede cargar debido a un formato incompatible.',
	'errorNoFavouritesYet': 'AÃºn no tienes ningÃºn canal favorito. Presiona el botÃ³n amarillo para marcar un canal como favorito.',
	'errorNoPlaylistHistory': 'No hay lista de reproducciÃ³n en la historia todavÃ­a. Por favor inserte una URL en el campo de abajo.',

	// Menu
	'searchPlaceholder': 'BÃºsqueda',
	'allChannels': 'Todos los canales',
	'favourites': 'â­ Canales favoritos',
	'groups': 'Grupos',
	'channels': 'Canales',
	'settings_menu': 'Ajustes',
	'epg_menu': 'EPG',
	'guide_menu': 'GuÃ­a',

	'guideControlsHeadline': 'Control',

	// Advanced Settings
	'tabGeneralSettings': 'ConfiguraciÃ³n general',
	'tabAdvancedSettings': 'ConfiguraciÃ³n avanzada',
	'chooseMousewheel': 'Mousewheel',
	'volumeSetting': 'Subir/bajar volumen',
	'channelSetting': 'Canal arriba/abajo',
	'reloadPlaylistOnStart': 'Descargar lista de reproducciÃ³n en cada inicio',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'cargando...',
	'audioTrack': 'Pista de audio',
	'subtitleTrack': 'Pista de subtÃ­tulos',
	'channelSettings': 'ConfiguraciÃ³n del canal',
	'channelSettingSubtitle': 'subtÃ­tulo / audio',
	'channelSettingAudio': 'audio',
	'channelSettingVideo': 'video / formato',
	'channelSettingFavs': 'aÃ±adir canal a favoritos',
	'channelSettingPlayback': 'mostrar controles de reproducciÃ³n',
	'channelSettingAudioDefault': 'pista predeterminada',
	'channelSettingSubNoTrack': 'no disponible',
	'channelSettingSubOff': 'desactivar',
	'channelSettingResolution': 'resoluciÃ³n',
	'channelSettingFormat': 'Formato de video',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'rellenar / estirar',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'fuente EPG',
	'epgSourceFromPlaylist': 'URL de EPG desde la lista de reproducciÃ³n',
	'usePlaylistEpgUrl': 'Â¿Usar la fuente EPG de tu lista de reproducciÃ³n en su lugar?',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'Intervalo de captura de EPG',
	'downloadEpgButton': 'descargar EPG ahora',
	'noEpgForChannel': 'No hay EPG para este canal',
	'noEpgUrlGiven': 'No se ha establecido ninguna URL de EPG',
	'noEpgUrlInPlaylist': 'No disponible en la lista de reproducciÃ³n',
	'epgQuotaExceededError': 'No hay suficiente espacio libre para guardar datos EPG. Libere algo de espacio. Por ejemplo, eliminando aplicaciones no utilizadas.',
	'epgNotCompatibleWithPlaylist': 'Su lista de reproducciÃ³n no es compatible con este EGP-URL.',
	'epgIsDownloading': 'Cargando EPG ...',
	'epgChannelsProcessed': 'canales: ',
	'epgProgramsProcessed': 'programas: ',
	'epgNow': 'Ahora',
	'epgAfter': 'DespuÃ©s',

},
'it': {
	'yes': 'sÃ¬', 'no': 'no',

	'm3uSource': 'URL al file m3u(8)',
	'chooseLang': 'Lingua',
	'usbLoadLabel': 'Lista canali da USB',
	'openUsbButton': 'sfoglia USB',
	'localLoadLabel': 'File m3u(8) locale',
	'openExplorerButton': 'apri esploratore',
	'openHistoryButton': 'storia',
	'downloadButton': 'ottieni il file',
	'saveButton': 'salva e gioca',
	'deleteButton': 'cancella',
	'generalSettingsButton': 'impostazioni generali',
	'advancedSettingsButton': 'avanzato',

	'closeAppHint': 'Vuoi chiudere questa app?',
	'hideModalHint': 'Premere un pulsante qualsiasi per chiudere questo messaggio.',
	'playlistDownloaded': 'Playlist scaricata con successo.<br>%i canali caricati.',
	'channelsLoaded': 'canali',
	'filterNoResults': 'Nessun canale trovato per il filtro fornito.',

	'redButtonHint': '<span class="red-button">A</span> ricerca',
	'helpHint': 'Premi il pulsante <span class="red-button">A</span> per inserire l\'elenco dei canali demo.<br><br>Premere INFO sul telecomando in qualsiasi momento per ottenere una guida per l\'utente.',

	'supportContact': 'Per ulteriori informazioni, visita https://m3u-ip.tv/it',
	'supportContactLinked': 'Per ulteriori informazioni, visita <a href="https://m3u-ip.tv/it/" target="_blank">https://m3u-ip.tv/it</a>',
	'donate': 'Se ti piace questa app, supportami con una piccola donazione.<br>Visita <b class="NOBR">https://m3u-ip.tv</b><br>o tramite QR-code.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (carta di credito)',
	'downloadM3uStatus': 'Caricamento playlist. Per favore aspetta un momento.',
	'usbMountedStatus': 'USB mounted',

	'connectionLost': 'Connessione di rete persa. Si prega di controllare la rete.',
	'checkM3uError': 'Impossibile caricare la playlist. Codice di stato HTTP: ',
	'checkM3uFileError': 'Non Ã¨ una playlist m3u(8) valida. Si prega di controllare il file.',
	'checkM3uDownloadError': 'Impossibile caricare la playlist. Si prega di controllare l\'URL.',
	'checkM3uDownloadSizeError': 'La playlist contiene troppi canali. Si prega di ridurli a un massimo di 20.000 canali.',
	'checkM3uTimeoutError': 'Si Ã¨ verificato un timeout durante il caricamento della playlist. Per favore riprova.',
	'errorNoUsbMounted': 'Nessuna memoria USB rilevata. Si prega di collegare prima una memoria USB.',
	'errorNoM3uUrl': 'Inserisci un URL valido per la tua playlist m3u(8).',
	'channelLoadError': 'Questo canale non Ã¨ al momento disponibile. Per favore riprova piÃ¹ tardi.',
	'channelLoadConnectionFailed': '(Connessione al flusso non riuscita.)',
	'channelNotSupportedFile': 'Questo canale non puÃ² essere caricato a causa di un formato incompatibile.',
	'errorNoFavouritesYet': 'Non hai ancora nessun canale preferito. Premi il pulsante giallo per aggiungere un canale ai preferiti.',
	'errorNoPlaylistHistory': 'Ancora nessuna playlist nella cronologia. Inserisci un URL nel campo sottostante.',

	// Menu
	'searchPlaceholder': 'Ricerca',
	'allChannels': 'Tutti i canali',
	'favourites': 'â­ Preferiti',
	'groups': 'Gruppi',
	'channels': 'Canali',
	'settings_menu': 'Impostazioni',
	'epg_menu': 'EPG',
	'guide_menu': 'Guida',

	'guideControlsHeadline': 'Controllo',

	// Advanced Settings
	'tabGeneralSettings': 'Impostazioni Generali',
	'tabAdvancedSettings': 'Impostazioni avanzate',
	'chooseMousewheel': 'Mousewheel',
	'volumeSetting': 'Volume su/giÃ¹',
	'channelSetting': 'Canale su/giÃ¹',
	'reloadPlaylistOnStart': 'Scarica playlist a ogni avvio',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'caricamento...',
	'audioTrack': 'Traccia audio',
	'subtitleTrack': 'Traccia sottotitoli',
	'channelSettings': 'Impostazioni canale',
	'channelSettingSubtitle': 'sottotitolo / audio',
	'channelSettingAudio': 'audio',
	'channelSettingVideo': 'video / formato',
	'channelSettingFavs': 'aggiungi canale ai preferiti',
	'channelSettingPlayback': 'mostra controlli di riproduzione',
	'channelSettingAudioDefault': 'traccia predefinita',
	'channelSettingSubNoTrack': 'non disponibile',
	'channelSettingSubOff': 'disattiva',
	'channelSettingResolution': 'risoluzione',
	'channelSettingFormat': 'Formato video',
	'channelSettingFormatOriginal': 'originale',
	'channelSettingFormatFill': 'riempi / estendi',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'Fonte EPG',
	'epgSourceFromPlaylist': 'URL EPG dalla playlist',
	'usePlaylistEpgUrl': 'Utilizzare invece la sorgente EPG dalla tua playlist?',
	'epgTimeShift': 'Timeshift EPG',
	'epgGrabInterval': 'Intervallo di presa EPG',
	'downloadEpgButton': 'scarica subito l\'EPG',
	'noEpgForChannel': 'Nessun EPG per questo canale',
	'noEpgUrlGiven': 'Nessun URL EPG impostato',
	'noEpgUrlInPlaylist': 'Non disponibile nella playlist',
	'epgQuotaExceededError': 'Spazio libero insufficiente per salvare i dati EPG. Si prega di liberare spazio. Ad esempio eliminando le app non utilizzate.',
	'epgNotCompatibleWithPlaylist': 'La tua playlist non Ã¨ compatibile con questo URL EGP.',
	'epgIsDownloading': 'Caricamento dell\'EPG ...',
	'epgChannelsProcessed': 'canali: ',
	'epgProgramsProcessed': 'programmi: ',
	'epgNow': 'Adesso',
	'epgAfter': 'Dopo di che',

},
'fr': {
	'yes': 'oui', 'no': 'non',

	'm3uSource': 'URL vers le fichier m3u(8)',
	'chooseLang': 'Langue',
	'usbLoadLabel': 'Liste des chaÃ®nes depuis USB',
	'openUsbButton': 'parcourir USB',
	'localLoadLabel': 'Fichier m3u(8) local',
	'openExplorerButton': 'ouvrir l\'explorateur',
	'openHistoryButton': 'l\'histoire',
	'downloadButton': 'Obtenir le fichier',
	'saveButton': 'enregistrer et jouer',
	'deleteButton': 'effacer',
	'generalSettingsButton': 'rÃ©glages gÃ©nÃ©raux',
	'advancedSettingsButton': 'AvancÃ©e',

	'closeAppHint': 'Voulez-vous fermer cette application?',
	'hideModalHint': 'Appuyez sur n\'importe quel bouton pour fermer ce message.',
	'playlistDownloaded': 'La liste de lecture a Ã©tÃ© tÃ©lÃ©chargÃ©e avec succÃ¨s.<br>%i chaÃ®nes chargÃ©es.',
	'channelsLoaded': 'chaÃ®nes',
	'filterNoResults': 'Aucune chaÃ®ne trouvÃ©e pour le filtre donnÃ©.',

	'redButtonHint': '<span class="red-button">A</span> chercher',
	'helpHint': 'Appuyez sur le bouton <span class="red-button">A</span> pour insÃ©rer la liste des chaÃ®nes de dÃ©monstration.<br><br>Appuyez sur INFO sur la tÃ©lÃ©commande Ã  tout moment pour un guide de l\'utilisateur.',

	'supportContact': 'Pour plus d\'informations, visitez https://m3u-ip.tv/fr',
	'supportContactLinked': 'Pour plus d\'informations, visitez <a href="https://m3u-ip.tv/fr/" target="_blank">https://m3u-ip.tv/fr</a>',
	'donate': 'Si vous aimez cette application, merci de me soutenir avec un petit don.<br>Visitez <b class="NOBR">https://m3u-ip.tv</b><br>ou via QR-code.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (carte de crÃ©dit)',
	'downloadM3uStatus': 'Chargement de la playlist. Patientez s\'il-vous-plait.',
	'usbMountedStatus': 'USB mounted',

	'connectionLost': 'Connexion rÃ©seau perdue. Veuillez vÃ©rifier votre rÃ©seau.',
	'checkM3uError': 'Impossible de charger la playlist. Code d\'Ã©tat HTTP: ',
	'checkM3uFileError': 'Liste de lecture m3u(8) non valide. Veuillez vÃ©rifier le fichier.',
	'checkM3uDownloadError': 'Impossible de charger la playlist. Veuillez vÃ©rifier l\'URL.',
	'checkM3uDownloadSizeError': 'La playlist contient trop de canaux. Veuillez les rÃ©duire Ã  20.000 canaux maximum.',
	'checkM3uTimeoutError': 'Un dÃ©lai d\'attente s\'est produit lors du chargement de votre playlist. Veuillez rÃ©essayer.',
	'errorNoUsbMounted': 'Aucune mÃ©moire USB dÃ©tectÃ©e. Veuillez d\'abord connecter une mÃ©moire USB.',
	'errorNoM3uUrl': 'Veuillez saisir une URL valide vers votre liste de lecture m3u(8).',
	'channelLoadError': 'Cette chaÃ®ne n\'est pas disponible pour le moment. Veuillez rÃ©essayer plus tard.',
	'channelLoadConnectionFailed': '(La connexion au flux a Ã©chouÃ©.)',
	'channelNotSupportedFile': 'Impossible de charger cette chaÃ®ne en raison d\'un format incompatible.',
	'errorNoFavouritesYet': 'Vous n\'avez pas encore de chaÃ®nes prÃ©fÃ©rÃ©es. Appuyez sur le bouton jaune pour ajouter une chaÃ®ne Ã  vos favoris.',
	'errorNoPlaylistHistory': 'Pas encore de playlist dans l\'historique. Veuillez insÃ©rer une URL dans le champ ci-dessous.',

	// Menu
	'searchPlaceholder': 'Recherche',
	'allChannels': 'Toutes les chaÃ®nes',
	'favourites': 'â­ Favoris',
	'groups': 'Groupes',
	'channels': 'Canaux',
	'settings_menu': 'RÃ©glages',
	'epg_menu': 'EPG',
	'guide_menu': 'Guide',

	'guideControlsHeadline': 'ContrÃ´le',

	// Advanced Settings
	'tabGeneralSettings': 'ParamÃ¨tres gÃ©nÃ©raux',
	'tabAdvancedSettings': 'ParamÃ¨tres avancÃ©s',
	'chooseMousewheel': 'Mousewheel',
	'volumeSetting': 'Volume haut/bas',
	'channelSetting': 'ChaÃ®ne haut/bas',
	'reloadPlaylistOnStart': 'TÃ©lÃ©charger la playlist Ã  chaque dÃ©marrage',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'chargement...',
	'audioTrack': 'Piste audio',
	'subtitleTrack': 'Piste de sous-titres',
	'channelSettings': 'ParamÃ¨tres du canal',
	'channelSettingSubtitle': 'sous-titre / audio',
	'channelSettingAudio': 'audio',
	'channelSettingVideo': 'vidÃ©o / format',
	'channelSettingFavs': 'ajouter le canal aux favoris',
	'channelSettingPlayback': 'afficher les contrÃ´les de lecture',
	'channelSettingAudioDefault': 'piste par dÃ©faut',
	'channelSettingSubNoTrack': 'non disponible',
	'channelSettingSubOff': 'dÃ©sactiver',
	'channelSettingResolution': 'rÃ©solution',
	'channelSettingFormat': 'Format vidÃ©o',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'remplir / Ã©tirer',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'Source EPG',
	'epgSourceFromPlaylist': 'URL EPG depuis la playlist',
	'usePlaylistEpgUrl': 'Utiliser la source EPG de votre liste de lecture Ã  la placeÂ ?',
	'epgTimeShift': 'DÃ©calage EPG',
	'epgGrabInterval': 'Intervalle de capture EPG',
	'downloadEpgButton': 'tÃ©lÃ©charger EPG maintenant',
	'noEpgForChannel': 'Pas d\'EPG pour cette chaÃ®ne',
	'noEpgUrlGiven': 'Aucune URL EPG dÃ©finie',
	'noEpgUrlInPlaylist': 'Non disponible dans la playlist',
	'epgQuotaExceededError': 'Espace libre insuffisant pour enregistrer les donnÃ©es EPG. Veuillez libÃ©rer de l\'espace. Par exemple en supprimant les applications non utilisÃ©es.',
	'epgNotCompatibleWithPlaylist': 'Votre liste de lecture n\'est pas compatible avec cette URL EGP.',
	'epgIsDownloading': 'Chargement de l\'EPG ...',
	'epgChannelsProcessed': 'canaux: ',
	'epgProgramsProcessed': 'programmes: ',
	'epgNow': 'Maintenant',
	'epgAfter': 'AprÃ¨s cela',

},
'de': {
	'yes': 'ja', 'no': 'nein',

	'm3uSource': 'URL zur m3u(8)-Datei',
	'chooseLang': 'Spache',
	'usbLoadLabel': 'Playlist von USB laden',
	'openUsbButton': 'USB durchsuchen',
	'localLoadLabel': 'Lokale m3u(8)-Datei',
	'openExplorerButton': 'Explorer Ã¶ffnen',
	'openHistoryButton': 'Verlauf',
	'downloadButton': 'Datei laden',
	'saveButton': 'abspielen',
	'deleteButton': 'lÃ¶schen',
	'generalSettingsButton': 'Haupteinstellungen',
	'advancedSettingsButton': 'Fortgeschritten',

	'closeAppHint': 'MÃ¶chtest du die APP beenden?',
	'hideModalHint': 'DrÃ¼cke eine beliebige Taste um diesen Hinweis zu schlieÃŸen.',
	'playlistDownloaded': 'Die Playliste wurde erfolgreich heruntergeladen.<br>%i KanÃ¤le wurden geladen.',
	'channelsLoaded': 'KanÃ¤le',
	'filterNoResults': 'Keine KanÃ¤le fÃ¼r den angegebenen Filter gefunden.',

	'redButtonHint': '<span class="red-button">A</span> suchen',
	'helpHint': 'DrÃ¼cke <span class="red-button">A</span> um eine Demo Kanalliste einzufÃ¼gen.<br><br>DrÃ¼cke jederzeit INFO auf der Fernbedienung fÃ¼r eine ausfÃ¼hrliche Bedienungsanleitung.',

	'supportContact': 'Mehr Informationen unter https://m3u-ip.tv/de',
	'supportContactLinked': 'Mehr Informationen unter <a href="https://m3u-ip.tv/de/" target="_blank">https://m3u-ip.tv/de</a>',
	'donate': 'Wenn dir diese App gefÃ¤llt, bitte unterstÃ¼tze mich mit einer kleinen Spende.<br>Besuche <b class="NOBR">https://m3u-ip.tv</b><br>oder Ã¼ber QR-Code.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (Kreditkarte)',
	'downloadM3uStatus': 'Playlist wird geladen. Bitte warte einen Moment.',
	'usbMountedStatus': 'USB mounted',

	'connectionLost': 'Kein Internetzugang. Bitte prÃ¼fe dein Netzwerk.',
	'checkM3uError': 'Playlist konnte nicht geladen werden. HTTP Status-Code: ',
	'checkM3uFileError': 'Keine gÃ¼ltige m3u(8)-Playlist. Bitte Datei prÃ¼fen.',
	'checkM3uDownloadError': 'Playlist konnte nicht geladen werden. Bitte URL prÃ¼fen.',
	'checkM3uDownloadSizeError': 'Die Playlist enthÃ¤lt zu viele KanÃ¤le. Bitte reduziere diese auf maximal 20.000 KanÃ¤le.',
	'checkM3uTimeoutError': 'ZeitÃ¼berschreitung beim Laden der Playlist. Bitte erneut versuchen.',
	'errorNoUsbMounted': 'Kein USB Speicher erkannt. Bitte schlieÃŸe zuerst ein USB Speicher an.',
	'errorNoM3uUrl': 'Bitte gebe eine gÃ¼ltige URL zu deiner m3u(8)-Playlist an.',
	'channelLoadError': 'Dieser Kanal ist zurzeit nicht erreichbar. Bitte versuche es spÃ¤ter nochmal.',
	'channelLoadConnectionFailed': '(Verbindung zum Stream fehlgeschlagen.)',
	'channelNotSupportedFile': 'Dieser Kanal kann wegen eines inkompatiblen Formats nicht geladen werden.',
	'errorNoFavouritesYet': 'Du hast noch keine Kanal-Favoriten. DrÃ¼cke die gelbe Taste um ein Kanal zu favorisieren.',
	'errorNoPlaylistHistory': 'Noch keine Playliste im Verlauf. Bitte gebe eine URL in das Feld unten ein.',

	// Menu
	'searchPlaceholder': 'Suche',
	'allChannels': 'Alle KanÃ¤le',
	'favourites': 'â­ Favoriten',
	'groups': 'Gruppen',
	'channels': 'KanÃ¤le',
	'settings_menu': 'Einstellungen',
	'epg_menu': 'EPG',
	'guide_menu': 'Anleitung',

	'guideControlsHeadline': 'Steuerung',

	// Advanced Settings
	'tabGeneralSettings': 'Haupteinstellungen',
	'tabAdvancedSettings': 'Fortgeschritten',
	'chooseMousewheel': 'Mausrad',
	'volumeSetting': 'LautstÃ¤rke leiser/lauter',
	'channelSetting': 'Kanal vor/zurÃ¼ck',
	'reloadPlaylistOnStart': 'Playlist bei jedem Start herunterladen',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'wird geladen...',
	'audioTrack': 'Audio Tonspur',
	'videoTrack': 'Video',
	'subtitleTrack': 'Untertitel',
	'channelSettings': 'Kanaleinstellungen',
	'channelSettingSubtitle': 'Untertitel / Audio',
	'channelSettingAudio': 'Audio',
	'channelSettingVideo': 'Video / Format',
	'channelSettingFavs': 'Kanal zu Favoriten hinzufÃ¼gen',
	'channelSettingPlayback': 'Wiedergabesteuerung anzeigen',
	'channelSettingAudioDefault': 'Standard',
	'channelSettingSubNoTrack': 'nicht verfÃ¼gbar',
	'channelSettingSubOff': 'deaktivieren',
	'channelSettingResolution': 'AuflÃ¶sung',
	'channelSettingFormat': 'Videoformat',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'fÃ¼llen / strecken',
	'channelSettingFormatZoom': 'zoomen',

	// EPG
	'epgSource': 'EPG Quelle',
	'epgSourceFromPlaylist': 'EPG-URL aus der Playlist',
	'usePlaylistEpgUrl': 'EPG Quelle aus der Playlist stattdessen verwenden?',
	'epgTimeShift': 'EPG Zeitversatz',
	'epgGrabInterval': 'EPG Aktualisierungsintervall',
	'downloadEpgButton': 'EPG jetzt laden',
	'noEpgForChannel': 'Kein EPG fÃ¼r diesen Kanal',
	'noEpgUrlGiven': 'Keine EPG URL konfiguriert',
	'noEpgUrlInPlaylist': 'In der Playlist nicht verfÃ¼gbar',
	'epgQuotaExceededError': 'Nicht genÃ¼gend freier Speicherplatz zum Speichern von EPG-Daten vorhanden. Bitte gebe etwas Platz frei. Zum Beispiel durch das LÃ¶schen nicht genutzter Apps.',
	'epgNotCompatibleWithPlaylist': 'Deine Playlist ist nicht kompatiblel mit dieser EGP-URL.',
	'epgIsDownloading': 'EPG wird geladen...',
	'epgChannelsProcessed': 'KanÃ¤le: ',
	'epgProgramsProcessed': 'Programme: ',
	'epgNow': 'Jetzt',
	'epgAfter': 'Danach',

},
'ru': {
	'yes': 'Ğ´Ğ°', 'no': 'Ğ½ĞµÑ‚',

	'm3uSource': 'URL-Ğ°Ğ´Ñ€ĞµÑ  m3u(8) Ñ„Ğ°Ğ¹Ğ»Ğ°',
	'chooseLang': 'ÑĞ·Ñ‹Ğº',
	'usbLoadLabel': 'Ğ—Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ñ USB',
	'openUsbButton': 'Ğ¿Ñ€Ğ¾ÑĞ¼Ğ¾Ñ‚Ñ€ĞµÑ‚ÑŒ USB',
	'localLoadLabel': 'Ğ›Ğ¾ĞºĞ°Ğ»ÑŒĞ½Ñ‹Ğ¹ Ñ„Ğ°Ğ¹Ğ» m3u(8)',
	'openExplorerButton': 'Ğ¤Ğ°Ğ¹Ğ»Ğ¾Ğ²Ñ‹Ğ¹ Ğ¿Ñ€Ğ¾Ğ²Ğ¾Ğ´Ğ½Ğ¸Ğº',
	'openHistoryButton': 'Ğ¸ÑÑ‚Ğ¾Ñ€Ğ¸Ñ',
	'downloadButton': 'Ğ·Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ Ñ„Ğ°Ğ¹Ğ»',
	'saveButton': 'ÑÑ‚Ğ°Ñ€Ñ‚Ğ¾Ğ²Ğ°Ñ‚ÑŒ',
	'deleteButton': 'ÑƒĞ´Ğ°Ğ»ÑÑ‚ÑŒ',
	'generalSettingsButton': 'ĞĞ±Ñ‰Ğ¸Ğµ Ğ½Ğ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸',
	'advancedSettingsButton': 'Ğ”Ğ¾Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ñ‹Ğµ Ğ½Ğ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸',

	'closeAppHint': 'Ğ’Ñ‹ Ñ…Ğ¾Ñ‚Ğ¸Ñ‚Ğµ Ğ·Ğ°ĞºÑ€Ñ‹Ñ‚ÑŒ ÑÑ‚Ğ¾ Ğ¿Ñ€Ğ¸Ğ»Ğ¾Ğ¶ĞµĞ½Ğ¸Ğµ?',
	'hideModalHint': 'ĞĞ°Ğ¶Ğ¼Ğ¸Ñ‚Ğµ Ğ»ÑĞ±ÑƒÑ ĞºĞ»Ğ°Ğ²Ğ¸ÑˆÑƒ, Ñ‡Ñ‚Ğ¾Ğ±Ñ‹ Ğ·Ğ°ĞºÑ€Ñ‹Ñ‚ÑŒ ÑÑ‚Ğ¾ ÑƒĞ²ĞµĞ´Ğ¾Ğ¼Ğ»ĞµĞ½Ğ¸Ğµ.',
	'playlistDownloaded': 'ĞŸĞ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ ÑƒÑĞ¿ĞµÑˆĞ½Ğ¾ Ğ·Ğ°Ğ³Ñ€ÑƒĞ¶ĞµĞ½.<br>Ğ—Ğ°Ğ³Ñ€ÑƒĞ¶ĞµĞ½Ğ¾ %i ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ².',
	'channelsLoaded': 'ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ²',
	'filterNoResults': 'ĞĞµÑ‚ ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ², ÑĞ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²ÑƒÑÑ‰Ğ¸Ñ… ÑƒĞºĞ°Ğ·Ğ°Ğ½Ğ½Ğ¾Ğ¼Ñƒ Ñ„Ğ¸Ğ»ÑŒÑ‚Ñ€Ñƒ.',

	'redButtonHint': '<span class="red-button">A</span> ĞŸĞ¾Ğ¸ÑĞº',
	'helpHint': 'ĞĞ°Ğ¶Ğ¼Ğ¸Ñ‚Ğµ ĞºĞ½Ğ¾Ğ¿ĞºÑƒ <span class="red-button">A</span>, Ñ‡Ñ‚Ğ¾Ğ±Ñ‹ Ğ²ÑÑ‚Ğ°Ğ²Ğ¸Ñ‚ÑŒ ÑĞ¿Ğ¸ÑĞ¾Ğº Ğ´ĞµĞ¼Ğ¾Ğ½ÑÑ‚Ñ€Ğ°Ñ†Ğ¸Ğ¾Ğ½Ğ½Ñ‹Ñ… ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ².<br><br>ĞĞ°Ğ¶Ğ¼Ğ¸Ñ‚Ğµ INFO Ğ½Ğ° Ğ¿ÑƒĞ»ÑŒÑ‚Ğµ Ğ´Ğ¸ÑÑ‚Ğ°Ğ½Ñ†Ğ¸Ğ¾Ğ½Ğ½Ğ¾Ğ³Ğ¾ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ñ Ğ² Ğ»ÑĞ±Ğ¾Ğ¹ Ğ¼Ğ¾Ğ¼ĞµĞ½Ñ‚, Ñ‡Ñ‚Ğ¾Ğ±Ñ‹ Ğ¾Ñ‚ĞºÑ€Ñ‹Ñ‚ÑŒ Ñ€ÑƒĞºĞ¾Ğ²Ğ¾Ğ´ÑÑ‚Ğ²Ğ¾ Ğ¿Ğ¾Ğ»ÑŒĞ·Ğ¾Ğ²Ğ°Ñ‚ĞµĞ»Ñ.',

	'supportContact': 'Ğ”Ğ»Ñ Ğ¿Ğ¾Ğ»ÑƒÑ‡ĞµĞ½Ğ¸Ñ Ğ´Ğ¾Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ğ¾Ğ¹ Ğ¸Ğ½Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ†Ğ¸Ğ¸ Ğ¿Ğ¾ÑĞµÑ‚Ğ¸Ñ‚Ğµ https://m3u-ip.tv/ru',
	'supportContactLinked': 'Ğ”Ğ»Ñ Ğ¿Ğ¾Ğ»ÑƒÑ‡ĞµĞ½Ğ¸Ñ Ğ´Ğ¾Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ğ¾Ğ¹ Ğ¸Ğ½Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ†Ğ¸Ğ¸ Ğ¿Ğ¾ÑĞµÑ‚Ğ¸Ñ‚Ğµ <a href="https://m3u-ip.tv/ru/" target="_blank">https://m3u-ip.tv/ru</a>',
	'donate': 'Ğ•ÑĞ»Ğ¸ Ğ²Ğ°Ğ¼ Ğ½Ñ€Ğ°Ğ²Ğ¸Ñ‚ÑÑ ÑÑ‚Ğ¾ Ğ¿Ñ€Ğ¸Ğ»Ğ¾Ğ¶ĞµĞ½Ğ¸Ğµ, Ğ¿Ğ¾Ğ´Ğ´ĞµÑ€Ğ¶Ğ¸Ñ‚Ğµ Ğ¼ĞµĞ½Ñ Ğ½ĞµĞ±Ğ¾Ğ»ÑŒÑˆĞ¸Ğ¼ Ğ¿Ğ¾Ğ¶ĞµÑ€Ñ‚Ğ²Ğ¾Ğ²Ğ°Ğ½Ğ¸ĞµĞ¼.<br>ĞŸĞ¾ÑĞµÑ‚Ğ¸Ñ‚Ğµ <b class="NOBR">https://m3u-ip.tv</b><br>Ğ¸Ğ»Ğ¸ Ñ Ğ¿Ğ¾Ğ¼Ğ¾Ñ‰ÑŒÑ QR-ĞºĞ¾Ğ´Ğ°.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (ĞºÑ€ĞµĞ´Ğ¸Ñ‚Ğ½Ğ°Ñ ĞºĞ°Ñ€Ñ‚Ğ°)',
	'downloadM3uStatus': 'ĞŸĞ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ·Ğ°Ğ³Ñ€ÑƒĞ¶Ğ°ĞµÑ‚ÑÑ. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¿Ğ¾Ğ´Ğ¾Ğ¶Ğ´Ğ¸Ñ‚Ğµ Ğ½ĞµÑĞºĞ¾Ğ»ÑŒĞºĞ¾ ÑĞµĞºÑƒĞ½Ğ´.',
	'usbMountedStatus': 'USB mounted',

	'connectionLost': 'ĞŸĞ¾Ñ‚ĞµÑ€ÑĞ½Ğ¾ ÑĞµÑ‚ĞµĞ²Ğ¾Ğµ ÑĞ¾ĞµĞ´Ğ¸Ğ½ĞµĞ½Ğ¸Ğµ. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¿Ñ€Ğ¾Ğ²ĞµÑ€ÑŒÑ‚Ğµ ÑĞ²Ğ¾Ñ ÑĞµÑ‚ÑŒ.',
	'checkM3uError': 'ĞĞµ ÑƒĞ´Ğ°Ğ»Ğ¾ÑÑŒ Ğ·Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚. ĞšĞ¾Ğ´ ÑĞ¾ÑÑ‚Ğ¾ÑĞ½Ğ¸Ñ HTTP: ',
	'checkM3uFileError': 'ĞĞµĞ²ĞµÑ€Ğ½Ñ‹Ğ¹ m3u(8)-Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¿Ñ€Ğ¾Ğ²ĞµÑ€ÑŒÑ‚Ğµ Ñ„Ğ°Ğ¹Ğ».',
	'checkM3uDownloadError': 'ĞĞµ ÑƒĞ´Ğ°Ğ»Ğ¾ÑÑŒ Ğ·Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¿Ñ€Ğ¾Ğ²ĞµÑ€ÑŒÑ‚Ğµ URL-Ğ°Ğ´Ñ€ĞµÑ',
	'checkM3uDownloadSizeError': 'Ğ’ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğµ ÑĞ»Ğ¸ÑˆĞºĞ¾Ğ¼ Ğ¼Ğ½Ğ¾Ğ³Ğ¾ ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ². ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, ÑƒĞ¼ĞµĞ½ÑŒÑˆĞ¸Ñ‚Ğµ Ğ¸Ñ… Ğ´Ğ¾ 20.000 ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ².',
	'checkM3uTimeoutError': 'Ğ’Ñ€ĞµĞ¼Ñ Ğ·Ğ°Ğ³Ñ€ÑƒĞ·ĞºĞ¸ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ° Ğ¸ÑÑ‚ĞµĞºĞ»Ğ¾. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¿Ğ¾Ğ¿Ñ€Ğ¾Ğ±ÑƒĞ¹Ñ‚Ğµ ĞµÑ‰Ğµ Ñ€Ğ°Ğ·.',
	'errorNoUsbMounted': 'USB-Ğ½Ğ°ĞºĞ¾Ğ¿Ğ¸Ñ‚ĞµĞ»ÑŒ Ğ½Ğµ Ñ€Ğ°ÑĞ¿Ğ¾Ğ·Ğ½Ğ°ĞµÑ‚ÑÑ. Ğ¡Ğ½Ğ°Ñ‡Ğ°Ğ»Ğ° Ğ¿Ğ¾Ğ´ĞºĞ»ÑÑ‡Ğ¸Ñ‚Ğµ USB-Ğ½Ğ°ĞºĞ¾Ğ¿Ğ¸Ñ‚ĞµĞ»ÑŒ.',
	'errorNoM3uUrl': 'ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ²Ğ²ĞµĞ´Ğ¸Ñ‚Ğµ URL Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ° m3u(8).',
	'channelLoadError': 'Ğ­Ñ‚Ğ¾Ñ‚ ĞºĞ°Ğ½Ğ°Ğ» ÑĞµĞ¹Ñ‡Ğ°Ñ Ğ½ĞµĞ´Ğ¾ÑÑ‚ÑƒĞ¿ĞµĞ½. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¿Ğ¾Ğ¿Ñ€Ğ¾Ğ±ÑƒĞ¹Ñ‚Ğµ Ğ¿Ğ¾Ğ·Ğ¶Ğµ.',
	'channelLoadConnectionFailed': '(ĞĞµ ÑƒĞ´Ğ°Ğ»Ğ¾ÑÑŒ Ğ¿Ğ¾Ğ´ĞºĞ»ÑÑ‡Ğ¸Ñ‚ÑŒÑÑ Ğº Ğ¿Ğ¾Ñ‚Ğ¾ĞºÑƒ.)',
	'channelNotSupportedFile': 'Ğ­Ñ‚Ğ¾Ñ‚ ĞºĞ°Ğ½Ğ°Ğ» Ğ½Ğµ Ğ¼Ğ¾Ğ¶ĞµÑ‚ Ğ±Ñ‹Ñ‚ÑŒ Ğ·Ğ°Ğ³Ñ€ÑƒĞ¶ĞµĞ½ Ğ¸Ğ·-Ğ·Ğ° Ğ½ĞµÑĞ¾Ğ²Ğ¼ĞµÑÑ‚Ğ¸Ğ¼Ğ¾Ğ³Ğ¾ Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ‚Ğ°.',
	'errorNoFavouritesYet': 'Ğ£ Ğ²Ğ°Ñ Ğ¿Ğ¾ĞºĞ° Ğ½ĞµÑ‚ Ğ¸Ğ·Ğ±Ñ€Ğ°Ğ½Ğ½Ñ‹Ñ… ĞºĞ°Ğ½Ğ°Ğ»Ğ¾Ğ². ĞĞ°Ğ¶Ğ¼Ğ¸Ñ‚Ğµ Ğ–Ğ•Ğ›Ğ¢Ğ£Ğ® ĞºĞ½Ğ¾Ğ¿ĞºÑƒ, Ñ‡Ñ‚Ğ¾Ğ±Ñ‹ Ğ´Ğ¾Ğ±Ğ°Ğ²Ğ¸Ñ‚ÑŒ ĞºĞ°Ğ½Ğ°Ğ» Ğ² Ğ¸Ğ·Ğ±Ñ€Ğ°Ğ½Ğ½Ğ¾Ğµ.',
	'errorNoPlaylistHistory': 'ĞŸĞ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ° Ğ² Ğ¸ÑÑ‚Ğ¾Ñ€Ğ¸Ğ¸ Ğ¿Ğ¾ĞºĞ° Ğ½ĞµÑ‚. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ²ÑÑ‚Ğ°Ğ²ÑŒÑ‚Ğµ URL Ğ² Ğ¿Ğ¾Ğ»Ğµ Ğ½Ğ¸Ğ¶Ğµ.',

	// Menu
	'searchPlaceholder': 'ĞŸĞ¾Ğ¸ÑĞº',
	'allChannels': 'Ğ’ÑĞµ ĞºĞ°Ğ½Ğ°Ğ»Ñ‹',
	'favourites': 'â­ Ğ¸Ğ·Ğ±Ñ€Ğ°Ğ½Ğ½Ğ¾Ğµ',
	'groups': 'Ğ³Ñ€ÑƒĞ¿Ğ¿Ñ‹',
	'channels': 'ĞºĞ°Ğ½Ğ°Ğ»Ñ‹',
	'settings_menu': 'ĞĞ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸',
	'epg_menu': 'Ñ‚ĞµĞ»ĞµĞ³Ğ¸Ğ´',
	'guide_menu': 'Ğ“Ğ¸Ğ´',

	'guideControlsHeadline': 'ĞšĞ»Ğ°Ğ²Ğ¸ÑˆĞ¸',

	// Advanced Settings
	'tabGeneralSettings': 'ĞĞ±Ñ‰Ğ¸Ğµ Ğ½Ğ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸',
	'tabAdvancedSettings': 'Ğ”Ğ¾Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ñ‹Ğµ Ğ½Ğ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸',
	'chooseMousewheel': 'ĞšĞ¾Ğ»ĞµÑĞ¾ Ğ¼Ñ‹ÑˆĞ¸',
	'volumeSetting': 'Ğ£Ğ²ĞµĞ»Ğ¸Ñ‡ĞµĞ½Ğ¸Ğµ/ÑƒĞ¼ĞµĞ½ÑŒÑˆĞµĞ½Ğ¸Ğµ Ğ³Ñ€Ğ¾Ğ¼ĞºĞ¾ÑÑ‚Ğ¸',
	'channelSetting': 'ĞšĞ°Ğ½Ğ°Ğ» Ğ²Ğ²ĞµÑ€Ñ…/Ğ²Ğ½Ğ¸Ğ·',
	'reloadPlaylistOnStart': 'Ğ—Ğ°Ğ³Ñ€ÑƒĞ¶Ğ°Ñ‚ÑŒ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ¿Ñ€Ğ¸ ĞºĞ°Ğ¶Ğ´Ğ¾Ğ¼ Ğ·Ğ°Ğ¿ÑƒÑĞºĞµ',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'Ğ·Ğ°Ğ³Ñ€ÑƒĞ·ĞºĞ°...',
	'audioTrack': 'ĞÑƒĞ´Ğ¸Ğ¾Ğ´Ğ¾Ñ€Ğ¾Ğ¶ĞºĞ°',
	'subtitleTrack': 'Ğ”Ğ¾Ñ€Ğ¾Ğ¶ĞºĞ° ÑÑƒĞ±Ñ‚Ğ¸Ñ‚Ñ€Ğ¾Ğ²',
	'channelSettings': 'ĞĞ°ÑÑ‚Ñ€Ğ¾Ğ¹ĞºĞ¸ ĞºĞ°Ğ½Ğ°Ğ»Ğ°',
	'channelSettingSubtitle': 'ÑÑƒĞ±Ñ‚Ğ¸Ñ‚Ñ€Ñ‹ / Ğ°ÑƒĞ´Ğ¸Ğ¾',
	'channelSettingAudio': 'Ğ°ÑƒĞ´Ğ¸Ğ¾',
	'channelSettingVideo': 'Ğ²Ğ¸Ğ´ĞµĞ¾ / Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ‚',
	'channelSettingFavs': 'Ğ´Ğ¾Ğ±Ğ°Ğ²Ğ¸Ñ‚ÑŒ ĞºĞ°Ğ½Ğ°Ğ» Ğ² Ğ¸Ğ·Ğ±Ñ€Ğ°Ğ½Ğ½Ğ¾Ğµ',
	'channelSettingPlayback': 'Ğ¿Ğ¾ĞºĞ°Ğ·Ğ°Ñ‚ÑŒ ÑĞ»ĞµĞ¼ĞµĞ½Ñ‚Ñ‹ ÑƒĞ¿Ñ€Ğ°Ğ²Ğ»ĞµĞ½Ğ¸Ñ Ğ²Ğ¾ÑĞ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²ĞµĞ´ĞµĞ½Ğ¸ĞµĞ¼',
	'channelSettingAudioDefault': 'Ğ´Ğ¾Ñ€Ğ¾Ğ¶ĞºĞ° Ğ¿Ğ¾ ÑƒĞ¼Ğ¾Ğ»Ñ‡Ğ°Ğ½Ğ¸Ñ',
	'channelSettingSubNoTrack': 'Ğ½ĞµĞ´Ğ¾ÑÑ‚ÑƒĞ¿Ğ½Ğ¾',
	'channelSettingSubOff': 'Ğ¾Ñ‚ĞºĞ»ÑÑ‡Ğ¸Ñ‚ÑŒ',
	'channelSettingResolution': 'Ñ€Ğ°Ğ·Ñ€ĞµÑˆĞµĞ½Ğ¸Ğµ',
	'channelSettingFormat': 'Ğ¤Ğ¾Ñ€Ğ¼Ğ°Ñ‚ Ğ²Ğ¸Ğ´ĞµĞ¾',
	'channelSettingFormatOriginal': 'Ğ¾Ñ€Ğ¸Ğ³Ğ¸Ğ½Ğ°Ğ»',
	'channelSettingFormatFill': 'Ğ·Ğ°Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ñ‚ÑŒ / Ñ€Ğ°ÑÑ‚ÑĞ½ÑƒÑ‚ÑŒ',
	'channelSettingFormatZoom': 'ÑƒĞ²ĞµĞ»Ğ¸Ñ‡Ğ¸Ñ‚ÑŒ',

	// EPG
	'epgSource': 'Ğ˜ÑÑ‚Ğ¾Ñ‡Ğ½Ğ¸Ğº Ğ­ĞŸĞŸ',
	'epgSourceFromPlaylist': 'URL Ğ­ĞŸĞŸ Ğ¸Ğ· Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ°',
	'usePlaylistEpgUrl': 'Ğ’Ğ¼ĞµÑÑ‚Ğ¾ ÑÑ‚Ğ¾Ğ³Ğ¾ Ğ¸ÑĞ¿Ğ¾Ğ»ÑŒĞ·Ğ¾Ğ²Ğ°Ñ‚ÑŒ Ğ¸ÑÑ‚Ğ¾Ñ‡Ğ½Ğ¸Ğº Ğ­ĞŸĞŸ Ğ¸Ğ· Ğ²Ğ°ÑˆĞµĞ³Ğ¾ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ°?',
	'epgTimeShift': 'Ğ­ĞŸĞŸ Ğ¢Ğ°Ğ¹Ğ¼ÑˆĞ¸Ñ„Ñ‚',
	'epgGrabInterval': 'Ğ˜Ğ½Ñ‚ĞµÑ€Ğ²Ğ°Ğ» Ğ·Ğ°Ñ…Ğ²Ğ°Ñ‚Ğ° Ğ­ĞŸĞŸ',
	'downloadEpgButton': 'ÑĞºĞ°Ñ‡Ğ°Ñ‚ÑŒ Ğ­ĞŸĞŸ ÑĞµĞ¹Ñ‡Ğ°Ñ',
	'noEpgForChannel': 'ĞĞµÑ‚ Ğ­ĞŸĞŸ Ğ´Ğ»Ñ ÑÑ‚Ğ¾Ğ³Ğ¾ ĞºĞ°Ğ½Ğ°Ğ»Ğ°',
	'noEpgUrlGiven': 'ĞĞµ Ğ·Ğ°Ğ´Ğ°Ğ½ URL-Ğ°Ğ´Ñ€ĞµÑ Ğ­ĞŸĞŸ',
	'noEpgUrlInPlaylist': 'ĞĞµĞ´Ğ¾ÑÑ‚ÑƒĞ¿Ğ½Ğ¾ Ğ² Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğµ',
	'epgQuotaExceededError': 'ĞĞµĞ´Ğ¾ÑÑ‚Ğ°Ñ‚Ğ¾Ñ‡Ğ½Ğ¾ ÑĞ²Ğ¾Ğ±Ğ¾Ğ´Ğ½Ğ¾Ğ³Ğ¾ Ğ¼ĞµÑÑ‚Ğ° Ğ´Ğ»Ñ ÑĞ¾Ñ…Ñ€Ğ°Ğ½ĞµĞ½Ğ¸Ñ Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ… Ğ­ĞŸĞŸ. ĞŸĞ¾Ğ¶Ğ°Ğ»ÑƒĞ¹ÑÑ‚Ğ°, Ğ¾ÑĞ²Ğ¾Ğ±Ğ¾Ğ´Ğ¸Ñ‚Ğµ Ğ¼ĞµÑÑ‚Ğ¾. ĞĞ°Ğ¿Ñ€Ğ¸Ğ¼ĞµÑ€, ÑƒĞ´Ğ°Ğ»Ğ¸Ğ² Ğ½ĞµĞ¸ÑĞ¿Ğ¾Ğ»ÑŒĞ·ÑƒĞµĞ¼Ñ‹Ğµ Ğ¿Ñ€Ğ¸Ğ»Ğ¾Ğ¶ĞµĞ½Ğ¸Ñ.',
	'epgNotCompatibleWithPlaylist': 'Ğ’Ğ°Ñˆ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ½ĞµÑĞ¾Ğ²Ğ¼ĞµÑÑ‚Ğ¸Ğ¼ Ñ ÑÑ‚Ğ¸Ğ¼ Ğ­ĞŸĞŸ-URL.',
	'epgIsDownloading': 'Ğ—Ğ°Ğ³Ñ€ÑƒĞ·ĞºĞ° Ğ­ĞŸĞŸ...',
	'epgChannelsProcessed': 'ĞºĞ°Ğ½Ğ°Ğ»Ñ‹: ',
	'epgProgramsProcessed': 'Ğ¿Ñ€Ğ¾Ğ³Ñ€Ğ°Ğ¼Ğ¼Ñ‹: ',
	'epgNow': 'Ğ¡ĞµĞ¹Ñ‡Ğ°Ñ',
	'epgAfter': 'ĞŸĞ¾ÑĞ»Ğµ ÑÑ‚Ğ¾Ğ³Ğ¾',

},
'tr': {
	'yes': 'evet', 'no': 'hayÄ±r',

	'm3uSource': 'm3u(8)-dosyasÄ±nÄ±n URL\'si',
	'chooseLang': 'Dil',
	'usbLoadLabel': 'USB\'den oynatma listesi',
	'openUsbButton': 'USB\'ye gÃ¶z at',
	'localLoadLabel': 'Yerel m3u(8)-dosyasÄ±',
	'openExplorerButton': 'gezgini aÃ§',
	'openHistoryButton': 'Tarih',
	'downloadButton': 'Ã§alma listesi indir',
	'saveButton': 'kaydet ve oyna',
	'deleteButton': 'Ã§alma listesini sil',
	'generalSettingsButton': 'Genel Ayarlar',
	'advancedSettingsButton': 'GeliÅŸmiÅŸ Ayarlar',

	'closeAppHint': 'Bu uygulamayÄ± kapatmak istiyor musunuz?',
	'hideModalHint': 'Bu mesajÄ± kapatmak iÃ§in herhangi bir dÃ¼ÄŸmeye basÄ±n.',
	'playlistDownloaded': 'Oynatma listesi baÅŸarÄ±yla indirildi.<br>%i kanal yÃ¼klendi.',
	'channelsLoaded': 'kanallar',
	'filterNoResults': 'Verilen filtre iÃ§in kanal bulunamadÄ±.',

	'redButtonHint': '<span class="red-button">A</span> aramak',
	'helpHint': 'Demo kanal listesi eklemek iÃ§in <span class="red-button">A</span>-dÃ¼ÄŸmesine basÄ±n.<br><br>KullanÄ±cÄ± kÄ±lavuzu iÃ§in istediÄŸiniz zaman uzaktan kumandadaki INFO\'a basÄ±n.',

	'supportContact': 'Daha fazla bilgi iÃ§in https://m3u-ip.tv/tr adresini ziyaret edin.',
	'supportContactLinked': 'Daha fazla bilgi iÃ§in <a href="https://m3u-ip.tv/tr/" target="_blank">https://m3u-ip.tv/tr</a> adresini ziyaret edin.',
	'donate': 'Bu uygulamayÄ± beÄŸendiyseniz, lÃ¼tfen bana kÃ¼Ã§Ã¼k bir baÄŸÄ±ÅŸla destek olun.<br><b class="NOBR">https://m3u-ip.tv</b><br>veya QR kodu ile ziyaret edin.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (kredi kartÄ±)',
	'downloadM3uStatus': 'Oynatma listesi yÃ¼kleniyor. Bir sÃ¼re bekleyin lÃ¼tfen.',
	'usbMountedStatus': 'USB takÄ±lÄ±',

	'connectionLost': 'AÄŸ baÄŸlantÄ±sÄ± kesildi. LÃ¼tfen aÄŸÄ±nÄ±zÄ± kontrol edin.',
	'checkM3uError': 'Oynatma listesi yÃ¼klenemedi. HTTP durum kodu: ',
	'checkM3uFileError': 'GeÃ§erli bir m3u(8)-Ã§alma listesi deÄŸil. LÃ¼tfen dosyayÄ± kontrol edin.',
	'checkM3uDownloadError': 'Oynatma listesi yÃ¼klenemedi. LÃ¼tfen URL\'yi kontrol edin.',
	'checkM3uDownloadSizeError': 'Oynatma listesi Ã§ok fazla kanal iÃ§eriyor. LÃ¼tfen bunlarÄ± maksimum 20.000 kanala dÃ¼ÅŸÃ¼rÃ¼n.',
	'checkM3uTimeoutError': 'Oynatma listeniz yÃ¼klenirken zaman aÅŸÄ±mÄ± oluÅŸtu. LÃ¼tfen tekrar deneyin.',
	'errorNoUsbMounted': 'USB depolama algÄ±lanmadÄ±. LÃ¼tfen Ã¶nce bir USB depolama aygÄ±tÄ± baÄŸlayÄ±n.',
	'errorNoM3uUrl': 'LÃ¼tfen m3u(8) Ã§alma listeniz iÃ§in geÃ§erli bir URL girin.',
	'channelLoadError': 'Bu kanal ÅŸu anda kullanÄ±lamÄ±yor. LÃ¼tfen daha sonra tekrar deneyiniz.',
	'channelLoadConnectionFailed': '(AkÄ±ÅŸa baÄŸlantÄ± baÅŸarÄ±sÄ±z oldu.)',
	'channelNotSupportedFile': 'Bu kanal, uyumsuz bir biÃ§im nedeniyle yÃ¼klenemiyor.',
	'errorNoFavouritesYet': 'HenÃ¼z favori kanalÄ±nÄ±z yok. Bir kanalÄ± favorilere eklemek iÃ§in SARI dÃ¼ÄŸmeye basÄ±n.',
	'errorNoPlaylistHistory': 'HenÃ¼z geÃ§miÅŸte oynatma listesi yok. LÃ¼tfen aÅŸaÄŸÄ±daki alana bir URL girin.',

	// Menu
	'searchPlaceholder': 'AraÅŸtÄ±rma',
	'allChannels': 'TÃ¼m kanallar',
	'favourites': 'â­ Favoriler',
	'groups': 'Gruplar',
	'channels': 'Kanallar',
	'settings_menu': 'Ayarlar',
	'epg_menu': 'EPG',
	'guide_menu': 'KÄ±lavuz',

	'guideControlsHeadline': 'Kontroller',

	// Advanced Settings
	'tabGeneralSettings': 'Genel Ayarlar',
	'tabAdvancedSettings': 'GeliÅŸmiÅŸ Ayarlar',
	'chooseMousewheel': 'Fare tekerleÄŸi',
	'volumeSetting': 'Sesi artÄ±r/azalt',
	'channelSetting': 'Kanal ileri/geri',
	'reloadPlaylistOnStart': 'Her baÅŸlangÄ±Ã§ta Ã§alma listesini indir',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'yÃ¼kleniyor...',
	'audioTrack': 'Ses parÃ§asÄ±',
	'subtitleTrack': 'AltyazÄ± parÃ§asÄ±',
	'channelSettings': 'Kanal ayarlarÄ±',
	'channelSettingSubtitle': 'altyazÄ± / ses',
	'channelSettingAudio': 'ses',
	'channelSettingVideo': 'Video / format',
	'channelSettingFavs': 'kanalÄ± favorilere ekle',
	'channelSettingPlayback': 'oynatma kontrollerini gÃ¶ster',
	'channelSettingAudioDefault': 'varsayÄ±lan parÃ§a',
	'channelSettingSubNoTrack': 'mevcut deÄŸil',
	'channelSettingSubOff': 'devre dÄ±ÅŸÄ± bÄ±rak',
	'channelSettingResolution': 'Ã§Ã¶zÃ¼nÃ¼rlÃ¼k',
	'channelSettingFormat': 'Video formatÄ±',
	'channelSettingFormatOriginal': 'orijinal',
	'channelSettingFormatFill': 'doldur / uzat',
	'channelSettingFormatZoom': 'yakÄ±nlaÅŸtÄ±r',

	// EPG
	'epgSource': 'EPG kaynaÄŸÄ±',
	'epgSourceFromPlaylist': 'EPG URL\'si oynatma listesinden',
	'usePlaylistEpgUrl': 'Bunun yerine oynatma listenizdeki EPG kaynaÄŸÄ± kullanÄ±lsÄ±n mÄ±?',
	'epgTimeShift': 'EPG Zaman KaymasÄ±',
	'epgGrabInterval': 'EPG yakalama aralÄ±ÄŸÄ±',
	'downloadEpgButton': 'EPG\'yi ÅŸimdi indir',
	'noEpgForChannel': 'Bu kanal iÃ§in EPG yok',
	'noEpgUrlGiven': 'EPG URL\'si ayarlanmadÄ±',
	'noEpgUrlInPlaylist': 'Oynatma listesinde mevcut deÄŸil',
	'epgQuotaExceededError': 'EPG verilerini kaydetmek iÃ§in yeterli boÅŸ alan yok. LÃ¼tfen biraz yer aÃ§Ä±n. Ã–rneÄŸin, kullanÄ±lmayan uygulamalarÄ± silerek.',
	'epgNotCompatibleWithPlaylist': 'Ã‡alma listeniz bu EGP-URL ile uyumlu deÄŸil.',
	'epgIsDownloading': 'EPG yÃ¼kleniyor ...',
	'epgChannelsProcessed': 'kanallar: ',
	'epgProgramsProcessed': 'programlar: ',
	'epgNow': 'Åimdi',
	'epgAfter': 'Daha sonra',

},
'pl': {
	'yes': 'tak', 'no': 'nie',

	'm3uSource': 'URL do pliku m3u(8)',
	'chooseLang': 'JÄ™zyk',
	'usbLoadLabel': 'Lista odtwarzania z USB',
	'openUsbButton': 'przeglÄ…daj USB',
	'localLoadLabel': 'Lokalny plik m3u(8)',
	'openExplorerButton': 'otwarty eksplorator',
	'openHistoryButton': 'historia',
	'downloadButton': 'zaÅ‚aduj playlistÄ™',
	'saveButton': 'zapisz i graj',
	'deleteButton': 'usuÅ„ playlistÄ™',
	'generalSettingsButton': 'Ustawienia gÅ‚Ã³wne',
	'advancedSettingsButton': 'zaawansowane',

	'closeAppHint': 'Czy chcesz zamknÄ…Ä‡ tÄ™ aplikacjÄ™?',
	'hideModalHint': 'NaciÅ›nij dowolny przycisk, aby zamknÄ…Ä‡ tÄ™ wiadomoÅ›Ä‡.',
	'playlistDownloaded': 'Playlista zostaÅ‚a pomyÅ›lnie pobrana.<br>Wczytano %i kanaÅ‚Ã³w.',
	'channelsLoaded': 'kanaÅ‚y',
	'filterNoResults': 'Nie znaleziono kanaÅ‚Ã³w dla podanego filtra.',

	'redButtonHint': '<span class="red-button">A</span> Poszukuje',
	'helpHint': 'NaciÅ›nij przycisk <span class="red-button">A</span>, aby wstawiÄ‡ listÄ™ kanaÅ‚Ã³w demonstracyjnych.<br><br>W dowolnym momencie naciÅ›nij przycisk INFO na pilocie, aby wyÅ›wietliÄ‡ instrukcjÄ™ obsÅ‚ugi.',

	'supportContact': 'Aby uzyskaÄ‡ wiÄ™cej informacji, odwiedÅº https://m3u-ip.tv/pl',
	'supportContactLinked': 'Aby uzyskaÄ‡ wiÄ™cej informacji, odwiedÅº <a href="https://m3u-ip.tv/pl/" target="_blank">https://m3u-ip.tv/pl</a>',
	'donate': 'JeÅ›li podoba Ci siÄ™ ta aplikacja, wesprzyj mnie niewielkÄ… darowiznÄ….<br>OdwiedÅº <b class="NOBR">https://m3u-ip.tv</b><br>lub za pomocÄ… kodu QR.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (karta kredytowa)',
	'downloadM3uStatus': 'WczytujÄ™ listÄ™ odtwarzania. ProszÄ™ chwilÄ™ poczekaÄ‡.',
	'usbMountedStatus': 'USB jest zamontowany',

	'connectionLost': 'Utracono poÅ‚Ä…czenie sieciowe. SprawdÅº swojÄ… sieÄ‡.',
	'checkM3uError': 'Nie udaÅ‚o siÄ™ wczytaÄ‡ playlisty. Kod statusu HTTP: ',
	'checkM3uFileError': 'NieprawidÅ‚owa lista odtwarzania m3u(8). ProszÄ™ sprawdziÄ‡ plik.',
	'checkM3uDownloadError': 'Nie udaÅ‚o siÄ™ wczytaÄ‡ playlisty. SprawdÅº adres URL.',
	'checkM3uDownloadSizeError': 'Lista odtwarzania zawiera zbyt wiele kanaÅ‚Ã³w. Zmniejsz je do maks. 20.000 kanaÅ‚Ã³w.',
	'checkM3uTimeoutError': 'Przekroczono limit czasu podczas wczytywania listy odtwarzania. ProszÄ™ sprÃ³buj ponownie.',
	'errorNoUsbMounted': 'Nie wykryto noÅ›nika USB. Najpierw podÅ‚Ä…cz urzÄ…dzenie pamiÄ™ci USB.',
	'errorNoM3uUrl': 'WprowadÅº prawidÅ‚owy adres URL do swojej listy odtwarzania m3u(8).',
	'channelLoadError': 'Ten kanaÅ‚ jest obecnie niedostÄ™pny. SprÃ³buj ponownie pÃ³Åºniej.',
	'channelLoadConnectionFailed': '(Nie udaÅ‚o siÄ™ nawiÄ…zaÄ‡ poÅ‚Ä…czenia ze strumieniem.)',
	'channelNotSupportedFile': 'Nie moÅ¼na zaÅ‚adowaÄ‡ tego kanaÅ‚u z powodu niezgodnego formatu.',
	'errorNoFavouritesYet': 'Nie masz jeszcze Å¼adnych ulubionych kanaÅ‚Ã³w. NaciÅ›nij Å»Ã“ÅTY przycisk, aby dodaÄ‡ kanaÅ‚ do ulubionych.',
	'errorNoPlaylistHistory': 'Brak playlisty w historii. ProszÄ™ wstawiÄ‡ adres URL w polu poniÅ¼ej.',

	// Menu
	'searchPlaceholder': 'Poszukiwanie',
	'allChannels': 'Wszystkie kanaÅ‚y',
	'favourites': 'â­ Ulubione',
	'groups': 'Grupy',
	'channels': 'KanaÅ‚y',
	'settings_menu': 'Ustawienia',
	'epg_menu': 'EPG',
	'guide_menu': 'Przewodnik',

	'guideControlsHeadline': 'Controls',

	// Advanced Settings
	'tabGeneralSettings': 'Ustawienia gÅ‚Ã³wne',
	'tabAdvancedSettings': 'Zaawansowane ustawienia',
	'chooseMousewheel': 'KÃ³Å‚ko w myszce',
	'volumeSetting': 'ZwiÄ™kszanie/zmniejszanie gÅ‚oÅ›noÅ›ci',
	'channelSetting': 'PrzejÅ›cie do przodu/do tyÅ‚u kanaÅ‚u',
	'reloadPlaylistOnStart': 'Pobierz listÄ™ odtwarzania przy kaÅ¼dym starcie',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'Å‚adowanie...',
	'audioTrack': 'ÅšcieÅ¼ka dÅºwiÄ™kowa',
	'subtitleTrack': 'ÅšcieÅ¼ka napisÃ³w',
	'channelSettings': 'Ustawienia kanaÅ‚u',
	'channelSettingSubtitle': 'napisy / dÅºwiÄ™k',
	'channelSettingAudio': 'dÅºwiÄ™k',
	'channelSettingVideo': 'wideo / format',
	'channelSettingFavs': 'dodaj kanaÅ‚ do ulubionych',
	'channelSettingPlayback': 'pokaÅ¼ sterowanie odtwarzaniem',
	'channelSettingAudioDefault': 'Å›cieÅ¼ka domyÅ›lna',
	'channelSettingSubNoTrack': 'niedostÄ™pne',
	'channelSettingSubOff': 'wyÅ‚Ä…cz',
	'channelSettingResolution': 'rozdzielczoÅ›Ä‡',
	'channelSettingFormat': 'Format wideo',
	'channelSettingFormatOriginal': 'oryginalny',
	'channelSettingFormatFill': 'wypeÅ‚nij / rozciÄ…gnij',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'ÅºrÃ³dÅ‚o EPG',
	'epgSourceFromPlaylist': 'URL EPG z playlisty',
	'usePlaylistEpgUrl': 'Zamiast tego uÅ¼yÄ‡ ÅºrÃ³dÅ‚a EPG z listy odtwarzania?',
	'epgTimeShift': 'PrzesuniÄ™cie czasowe EPG',
	'epgGrabInterval': 'InterwaÅ‚ przechwytywania EPG',
	'downloadEpgButton': 'pobierz EPG teraz',
	'noEpgForChannel': 'Brak EPG dla tego kanaÅ‚u',
	'noEpgUrlGiven': 'Nie ustawiono adresu URL EPG',
	'noEpgUrlInPlaylist': 'NiedostÄ™pne w playliÅ›cie',
	'epgQuotaExceededError': 'Za maÅ‚o wolnego miejsca, aby zapisaÄ‡ dane EPG. ProszÄ™ zwolniÄ‡ trochÄ™ miejsca. Na przykÅ‚ad usuwajÄ…c nieuÅ¼ywane aplikacje.',
	'epgNotCompatibleWithPlaylist': 'Twoja lista odtwarzania nie jest zgodna z tym adresem URL EGP.',
	'epgIsDownloading': 'Åadowanie EPG ...',
	'epgChannelsProcessed': 'kanaÅ‚y: ',
	'epgProgramsProcessed': 'programy: ',
	'epgNow': 'Teraz w tv',
	'epgAfter': 'Po tym',

},
'pt': {
	'yes': 'sim', 'no': 'nÃ£o',

	'm3uSource': 'URL para arquivo m3u(8)',
	'chooseLang': 'LÃ­ngua',
	'usbLoadLabel': 'Lista de reproduÃ§Ã£o de USB',
	'openUsbButton': 'navegar no USB',
	'localLoadLabel': 'Arquivo m3u(8) local',
	'openExplorerButton': 'abra o explorador',
	'openHistoryButton': 'histÃ³ria',
	'downloadButton': 'carregar lista de reproduÃ§Ã£o',
	'saveButton': 'salve e jogue',
	'deleteButton': 'excluir lista de reproduÃ§Ã£o',
	'generalSettingsButton': 'ConfiguraÃ§Ãµes Gerais',
	'advancedSettingsButton': 'avanÃ§ado',

	'closeAppHint': 'Deseja fechar este aplicativo?',
	'hideModalHint': 'Pressione qualquer botÃ£o para fechar esta mensagem.',
	'playlistDownloaded': 'Playlist baixada com sucesso.<br>%i canais carregados.',
	'channelsLoaded': 'canais',
	'filterNoResults': 'Nenhum canal encontrado para o filtro fornecido.',

	'redButtonHint': '<span class="red-button">A</span> busca',
	'helpHint': 'Pressione o botÃ£o <span class="red-button">A</span> para inserir a lista de canais de demonstraÃ§Ã£o.<br><br>Pressione INFO no controle remoto a qualquer momento para obter um guia do usuÃ¡rio.',

	'supportContact': 'Para mais informaÃ§Ãµes, visite https://m3u-ip.tv/pt',
	'supportContactLinked': 'Para mais informaÃ§Ãµes, visite <a href="https://m3u-ip.tv/pt/" target="_blank">https://m3u-ip.tv/pt</a>',
	'donate': 'Se vocÃª gosta deste aplicativo, por favor, apoie-me com uma pequena doaÃ§Ã£o.<br>Visite <b class="NOBR">https://m3u-ip.tv</b><br>ou via cÃ³digo QR.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (cartÃ£o de crÃ©dito)',
	'downloadM3uStatus': 'Carregando lista de reproduÃ§Ã£o. Por favor espere um momento.',
	'usbMountedStatus': 'USB montado',

	'connectionLost': 'ConexÃ£o de rede perdida. Verifique sua rede.',
	'checkM3uError': 'NÃ£o foi possÃ­vel carregar a lista de reproduÃ§Ã£o. CÃ³digo de status HTTP: ',
	'checkM3uFileError': 'NÃ£o Ã© uma lista de reproduÃ§Ã£o m3u(8) vÃ¡lida. Verifique o arquivo.',
	'checkM3uDownloadError': 'NÃ£o foi possÃ­vel carregar a lista de reproduÃ§Ã£o. Verifique o URL.',
	'checkM3uDownloadSizeError': 'A lista de reproduÃ§Ã£o contÃ©m muitos canais. Reduza-os para um mÃ¡ximo de 20.000 canais.',
	'checkM3uTimeoutError': 'Ocorreu um tempo limite ao carregar sua lista de reproduÃ§Ã£o. Por favor, tente novamente.',
	'errorNoUsbMounted': 'Nenhum armazenamento USB detectado. Conecte primeiro um dispositivo de armazenamento USB.',
	'errorNoM3uUrl': 'Insira um URL vÃ¡lido para sua lista de reproduÃ§Ã£o m3u(8).',
	'channelLoadError': 'Este canal nÃ£o estÃ¡ disponÃ­vel no momento. Por favor, tente novamente mais tarde.',
	'channelLoadConnectionFailed': '(Falha na conexÃ£o com o stream.)',
	'channelNotSupportedFile': 'Este canal nÃ£o pode ser carregado devido a um formato incompatÃ­vel.',
	'errorNoFavouritesYet': 'VocÃª ainda nÃ£o tem canais favoritos. Pressione o botÃ£o AMARELO para adicionar um canal aos favoritos.',
	'errorNoPlaylistHistory': 'Nenhuma lista de reproduÃ§Ã£o no histÃ³rico ainda. Insira um URL no campo abaixo.',

	// Menu
	'searchPlaceholder': 'Busca',
	'allChannels': 'Todos os canais',
	'favourites': 'â­ Favoritas',
	'groups': 'Grupos',
	'channels': 'Canais',
	'settings_menu': 'ConfiguraÃ§Ãµes',
	'epg_menu': 'EPG',
	'guide_menu': 'Guia',

	'guideControlsHeadline': 'Controles',

	// Advanced Settings
	'tabGeneralSettings': 'ConfiguraÃ§Ãµes Gerais',
	'tabAdvancedSettings': 'ConfiguraÃ§Ãµes avanÃ§adas',
	'chooseMousewheel': 'Roda do mouse',
	'volumeSetting': 'Aumentar/diminuir o volume',
	'channelSetting': 'Canal para frente/para trÃ¡s',
	'reloadPlaylistOnStart': 'Baixar lista de reproduÃ§Ã£o em cada inÃ­cio',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'carregando...',
	'audioTrack': 'Trilha de Ã¡udio',
	'subtitleTrack': 'Trilha de legendas',
	'channelSettings': 'ConfiguraÃ§Ãµes do canal',
	'channelSettingSubtitle': 'legenda / Ã¡udio',
	'channelSettingAudio': 'Ã¡udio',
	'channelSettingVideo': 'vÃ­deo / formato',
	'channelSettingFavs': 'adicionar canal aos favoritos',
	'channelSettingPlayback': 'mostrar controles de reproduÃ§Ã£o',
	'channelSettingAudioDefault': 'trilha padrÃ£o',
	'channelSettingSubNoTrack': 'nÃ£o disponÃ­vel',
	'channelSettingSubOff': 'desativar',
	'channelSettingResolution': 'resoluÃ§Ã£o',
	'channelSettingFormat': 'Formato de vÃ­deo',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'preencher / esticar',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'fonte EPG',
	'epgSourceFromPlaylist': 'URL de EPG da playlist',
	'usePlaylistEpgUrl': 'Em vez disso, usar a fonte EPG da sua lista de reproduÃ§Ã£o?',
	'epgTimeShift': 'Timeshift EPG',
	'epgGrabInterval': 'Intervalo de captura de EPG',
	'downloadEpgButton': 'baixar EPG agora',
	'noEpgForChannel': 'Nenhum EPG para este canal',
	'noEpgUrlGiven': 'Nenhum URL EPG definido',
	'noEpgUrlInPlaylist': 'NÃ£o disponÃ­vel na playlist',
	'epgQuotaExceededError': 'NÃ£o hÃ¡ espaÃ§o livre suficiente para salvar dados EPG. Por favor, libere algum espaÃ§o. Por exemplo, excluindo aplicativos nÃ£o usados.',
	'epgNotCompatibleWithPlaylist': 'Sua lista de reproduÃ§Ã£o nÃ£o Ã© compatÃ­vel com este EGP-URL.',
	'epgIsDownloading': 'Carregando EPG ...',
	'epgChannelsProcessed': 'canais: ',
	'epgProgramsProcessed': 'programas: ',
	'epgNow': 'Agora',
	'epgAfter': 'Depois disso',

},
'cs': {
	'yes': 'Ano', 'no': 'Ne',

	'm3uSource': 'URL k souboru m3u(8).',
	'chooseLang': 'Jazyk',
	'usbLoadLabel': 'Playlist z USB',
	'openUsbButton': 'prochÃ¡zet USB',
	'localLoadLabel': 'MÃ­stnÃ­ soubor m3u(8).',
	'openExplorerButton': 'otevÅ™Ã­t prÅ¯zkumnÃ­ka',
	'openHistoryButton': 'DÄ›jiny',
	'downloadButton': 'naÄÃ­st seznam skladeb',
	'saveButton': 'uloÅ¾it a hrÃ¡t',
	'deleteButton': 'smazat seznam skladeb',
	'generalSettingsButton': 'ObecnÃ© nastavenÃ­',
	'advancedSettingsButton': 'pokroÄilÃ½',

	'closeAppHint': 'Chcete tuto aplikaci zavÅ™Ã­t?',
	'hideModalHint': 'StisknutÃ­m libovolnÃ©ho tlaÄÃ­tka tuto zprÃ¡vu zavÅ™ete.',
	'playlistDownloaded': 'Playlist ÃºspÄ›Å¡nÄ› staÅ¾en.<br>NaÄteno %i kanÃ¡lÅ¯.',
	'channelsLoaded': 'kanÃ¡ly',
	'filterNoResults': 'Pro zadanÃ½ filtr nebyly nalezeny Å¾Ã¡dnÃ© kanÃ¡ly.',

	'redButtonHint': '<span class="red-button">A</span> hledat',
	'helpHint': 'StisknutÃ­m tlaÄÃ­tka <span class="red-button">A</span> vloÅ¾Ã­te seznam ukÃ¡zkovÃ½ch kanÃ¡lÅ¯.<br><br>StisknutÃ­m tlaÄÃ­tka INFO na dÃ¡lkovÃ©m ovladaÄi kdykoli zobrazÃ­te uÅ¾ivatelskou pÅ™Ã­ruÄku.',

	'supportContact': 'Pro vÃ­ce informacÃ­ navÅ¡tivte https://m3u-ip.tv/cs',
	'supportContactLinked': 'Pro vÃ­ce informacÃ­ navÅ¡tivte <a href="https://m3u-ip.tv/cs/" target="_blank">https://m3u-ip.tv/cs</a>',
	'donate': 'Pokud se vÃ¡m tato aplikace lÃ­bÃ­, podpoÅ™te mÄ› malÃ½m darem.<br>NavÅ¡tivte <b class="NOBR">https://m3u-ip.tv</b><br>nebo pomocÃ­ QR kÃ³du.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (kreditnÃ­ karta)',
	'downloadM3uStatus': 'NaÄÃ­tÃ¡nÃ­ seznamu skladeb. ProsÃ­m, poÄkej chvÃ­li.',
	'usbMountedStatus': 'pÅ™ipojeno USB',

	'connectionLost': 'SÃ­Å¥ovÃ© pÅ™ipojenÃ­ bylo ztraceno. Zkontrolujte prosÃ­m svou sÃ­Å¥.',
	'checkM3uError': 'Nelze naÄÃ­st seznam skladeb. StavovÃ½ kÃ³d HTTP: ',
	'checkM3uFileError': 'NeplatnÃ½ m3u(8)-playlist. Zkontrolujte soubor.',
	'checkM3uDownloadError': 'Nelze naÄÃ­st seznam skladeb. Zkontrolujte prosÃ­m adresu URL.',
	'checkM3uDownloadSizeError': 'Seznam stop obsahuje pÅ™Ã­liÅ¡ mnoho kanÃ¡lÅ¯. SniÅ¾te je na max. 20.000 kanÃ¡lÅ¯.',
	'checkM3uTimeoutError': 'PÅ™i naÄÃ­tÃ¡nÃ­ seznamu skladeb vyprÅ¡el ÄasovÃ½ limit. ProsÃ­m zkuste to znovu.',
	'errorNoUsbMounted': 'Nebylo zjiÅ¡tÄ›no Å¾Ã¡dnÃ© ÃºloÅ¾iÅ¡tÄ› USB. Nejprve pÅ™ipojte pamÄ›Å¥ovÃ© zaÅ™Ã­zenÃ­ USB.',
	'errorNoM3uUrl': 'Zadejte prosÃ­m platnou adresu URL svÃ©ho seznamu skladeb m3u(8).',
	'channelLoadError': 'Tento kanÃ¡l nenÃ­ momentÃ¡lnÄ› dostupnÃ½. ProsÃ­m zkuste to znovu pozdÄ›ji.',
	'channelLoadConnectionFailed': '(PÅ™ipojenÃ­ ke streamu se nezdaÅ™ilo.)',
	'channelNotSupportedFile': 'Tento kanÃ¡l nelze naÄÃ­st kvÅ¯li nekompatibilnÃ­mu formÃ¡tu.',
	'errorNoFavouritesYet': 'ZatÃ­m nemÃ¡te Å¾Ã¡dnÃ© oblÃ­benÃ© kanÃ¡ly. Chcete-li kanÃ¡l pÅ™idat mezi oblÃ­benÃ©, stisknÄ›te Å½LUTÃ‰ tlaÄÃ­tko.',
	'errorNoPlaylistHistory': 'V historii zatÃ­m Å¾Ã¡dnÃ½ seznam skladeb. VloÅ¾te prosÃ­m URL do pole nÃ­Å¾e.',

	// Menu
	'searchPlaceholder': 'HledÃ¡nÃ­',
	'allChannels': 'VÅ¡echny kanÃ¡ly',
	'favourites': 'â­ OblÃ­benÃ©',
	'groups': 'Skupiny',
	'channels': 'KanÃ¡ly',
	'settings_menu': 'NastavenÃ­',
	'epg_menu': 'EPG',
	'guide_menu': 'PrÅ¯vodce',

	'guideControlsHeadline': 'OvlÃ¡dÃ¡nÃ­',

	// Advanced Settings
	'tabGeneralSettings': 'ObecnÃ© nastavenÃ­',
	'tabAdvancedSettings': 'PokroÄilÃ© nastavenÃ­',
	'chooseMousewheel': 'KoleÄko myÅ¡i',
	'volumeSetting': 'ZvÃ½Å¡enÃ­/snÃ­Å¾enÃ­ hlasitosti',
	'channelSetting': 'KanÃ¡l dopÅ™edu/dozadu',
	'reloadPlaylistOnStart': 'StÃ¡hnÄ›te si seznam skladeb pÅ™i kaÅ¾dÃ©m spuÅ¡tÄ›nÃ­',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'naÄÃ­tÃ¡nÃ­...',
	'audioTrack': 'ZvukovÃ¡ stopa',
	'subtitleTrack': 'Stopa titulkÅ¯',
	'channelSettings': 'NastavenÃ­ kanÃ¡lu',
	'channelSettingSubtitle': 'titulky / zvuk',
	'channelSettingAudio': 'zvuk',
	'channelSettingVideo': 'video / formÃ¡t',
	'channelSettingFavs': 'pÅ™idat kanÃ¡l do oblÃ­benÃ½ch',
	'channelSettingPlayback': 'zobrazit ovlÃ¡dacÃ­ prvky pÅ™ehrÃ¡vÃ¡nÃ­',
	'channelSettingAudioDefault': 'vÃ½chozÃ­ stopa',
	'channelSettingSubNoTrack': 'nedostupnÃ©',
	'channelSettingSubOff': 'vypnout',
	'channelSettingResolution': 'rozliÅ¡enÃ­',
	'channelSettingFormat': 'FormÃ¡t videa',
	'channelSettingFormatOriginal': 'originÃ¡l',
	'channelSettingFormatFill': 'vyplnit / roztÃ¡hnout',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'zdroj EPG',
	'epgSourceFromPlaylist': 'URL EPG z playlistu',
	'usePlaylistEpgUrl': 'PouÅ¾Ã­t mÃ­sto toho zdroj EPG ze seznamu skladeb?',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'Interval zachycenÃ­ EPG',
	'downloadEpgButton': 'stÃ¡hnÄ›te si EPG nynÃ­',
	'noEpgForChannel': 'Pro tento kanÃ¡l nenÃ­ EPG',
	'noEpgUrlGiven': 'NenÃ­ nastavena Å¾Ã¡dnÃ¡ adresa URL EPG',
	'noEpgUrlInPlaylist': 'NenÃ­ k dispozici v playlistu',
	'epgQuotaExceededError': 'Nedostatek volnÃ©ho mÃ­sta pro uloÅ¾enÃ­ dat EPG. UvolnÄ›te prosÃ­m nÄ›jakÃ© mÃ­sto. NapÅ™Ã­klad smazÃ¡nÃ­m nepouÅ¾Ã­vanÃ½ch aplikacÃ­.',
	'epgNotCompatibleWithPlaylist': 'VÃ¡Å¡ seznam skladeb nenÃ­ kompatibilnÃ­ s touto adresou URL EGP.',
	'epgIsDownloading': 'NaÄÃ­tÃ¡nÃ­ EPG ...',
	'epgChannelsProcessed': 'kanÃ¡ly: ',
	'epgProgramsProcessed': 'programy: ',
	'epgNow': 'NynÃ­',
	'epgAfter': 'Potom',

},
'ar': {
	'yes': 'Ù†Ø¹Ù…', 'no': 'Ù„Ø§',

	'm3uSource': 'URL Ø¥Ù„Ù‰ Ù…Ù„Ù m3u(8)',
	'chooseLang': 'Ù„ØºØ©',
	'usbLoadLabel': 'Ù‚Ø§Ø¦Ù…Ø© ØªØ´ØºÙŠÙ„ Ù…Ù† USB',
	'openUsbButton': 'ØªØµÙØ­ USB',
	'localLoadLabel': 'Ù…Ù„Ù m3u(8) Ø§Ù„Ù…Ø­Ù„ÙŠ',
	'openExplorerButton': 'Ø§Ù„Ù…Ø³ØªÙƒØ´Ù Ø§Ù„Ù…ÙØªÙˆØ­',
	'openHistoryButton': 'Ø§Ù„ØªØ§Ø±ÙŠØ®',
	'downloadButton': 'ØªØ­Ù…ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„',
	'saveButton': 'Ø§Ø­ÙØ¸ Ùˆ Ø§Ù„Ø¹Ø¨',
	'deleteButton': 'Ø­Ø°Ù Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„',
	'generalSettingsButton': 'Ø§Ù„Ø§Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø©',
	'advancedSettingsButton': 'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…ØªÙ‚Ø¯Ù…Ø©',

	'closeAppHint': 'Ù‡Ù„ ØªØ±ÙŠØ¯ Ø¥ØºÙ„Ø§Ù‚ Ù‡Ø°Ø§ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ØŸ',
	'hideModalHint': 'Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø£ÙŠ Ø²Ø± Ù„Ø¥ØºÙ„Ø§Ù‚ Ù‡Ø°Ù‡ Ø§Ù„Ø±Ø³Ø§Ù„Ø©.',
	'playlistDownloaded': 'ØªÙ… ØªÙ†Ø²ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¨Ù†Ø¬Ø§Ø­. ØªÙ… ØªØ­Ù…ÙŠÙ„ <br>Ùª i Ù…Ù† Ø§Ù„Ù‚Ù†ÙˆØ§Øª.',
	'channelsLoaded': 'Ø§Ù„Ù‚Ù†ÙˆØ§Øª',
	'filterNoResults': 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ù‚Ù†ÙˆØ§Øª Ù„Ù„Ù…Ø±Ø´Ø­ Ø§Ù„Ù…Ø¹Ø·Ù‰.',

	'redButtonHint': '<span class="red-button">A</span> Ø§Ù„Ø¨Ø­Ø«',
	'helpHint': 'Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø²Ø± <span class="red-button">A</span> Ù„Ø¥Ø¯Ø±Ø§Ø¬ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù‚Ù†ÙˆØ§Øª Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ©.<br><br>Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ INFO Ø£Ùˆ GUIDE Ø¨Ø¬Ù‡Ø§Ø² Ø§Ù„ØªØ­ÙƒÙ… Ø¹Ù† Ø¨ÙØ¹Ø¯ ÙÙŠ Ø£ÙŠ ÙˆÙ‚Øª Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù….',

	'supportContact': 'Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ØŒ ÙŠØ±Ø¬Ù‰ Ø²ÙŠØ§Ø±Ø© https://m3u-ip.tv/ar',
	'supportContactLinked': 'Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ØŒ ÙŠØ±Ø¬Ù‰ Ø²ÙŠØ§Ø±Ø© <a href="https://m3u-ip.tv/ar/" target="_blank">https://m3u-ip.tv/ar</a>',
	'donate': 'Ø¥Ø°Ø§ ÙƒÙ†Øª ØªØ­Ø¨ Ù‡Ø°Ø§ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ ØŒ ÙØ§Ù„Ø±Ø¬Ø§Ø¡ Ø¯Ø¹Ù…Ù†ÙŠ Ø¨Ù‚Ù„ÙŠÙ„ Ù…Ù† Ø§Ù„ØªØ¨Ø±Ø¹. Ù‚Ù… Ø¨Ø²ÙŠØ§Ø±Ø© <b class="NOBR">https://m3u-ip.tv</b> Ø£Ùˆ Ø¹Ø¨Ø± Ø±Ù…Ø² Ø§Ù„Ø§Ø³ØªØ¬Ø§Ø¨Ø© Ø§Ù„Ø³Ø±ÙŠØ¹Ø©',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (credit card)',
	'downloadM3uStatus': 'ØªØ­Ù…ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„. ÙØ¶Ù„Ø§ Ø§Ù†ØªØ¸Ø± Ù„Ø­Ø¸Ø©.',
	'usbMountedStatus': 'Ø´Ù†Øª USB',

	'connectionLost': 'Ø§Ù†Ù‚Ø·Ø¹ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø´Ø¨ÙƒØ©. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø´Ø¨ÙƒØ©.',
	'checkM3uError': 'ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„. ÙƒÙˆØ¯ Ø­Ø§Ù„Ø© HTTP: ',
	'checkM3uFileError': 'Ù‚Ø§Ø¦Ù…Ø© ØªØ´ØºÙŠÙ„ m3u(8) ØºÙŠØ± ØµØ§Ù„Ø­Ø©. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…Ù„Ù.',
	'checkM3uDownloadError': 'ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† URL.',
	'checkM3uDownloadSizeError': 'ØªØ­ØªÙˆÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¹Ù„Ù‰ Ù‚Ù†ÙˆØ§Øª ÙƒØ«ÙŠØ±Ø© Ø¬Ø¯Ù‹Ø§. ÙŠØ±Ø¬Ù‰ ØªÙ‚Ù„ÙŠÙ„Ù‡Ø§ Ø¥Ù„Ù‰ 20.000 Ù‚Ù†Ø§Ø© ÙƒØ­Ø¯ Ø£Ù‚ØµÙ‰.',
	'checkM3uTimeoutError': 'Ø§Ù†ØªÙ‡Øª Ø§Ù„Ù…Ù‡Ù„Ø© Ø£Ø«Ù†Ø§Ø¡ ØªØ­Ù…ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ. Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø§Ø®Ø±Ù‰.',
	'errorNoUsbMounted': 'Ù„Ù… ÙŠØªÙ… Ø§Ù„ÙƒØ´Ù Ø¹Ù† ÙˆØ­Ø¯Ø© ØªØ®Ø²ÙŠÙ† USB. Ø§Ù„Ø±Ø¬Ø§Ø¡ ØªÙˆØµÙŠÙ„ Ø¬Ù‡Ø§Ø² ØªØ®Ø²ÙŠÙ† USB Ø£ÙˆÙ„Ø§Ù‹.',
	'errorNoM3uUrl': 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø¹Ù†ÙˆØ§Ù† URL ØµØ§Ù„Ø­ Ù„Ù‚Ø§Ø¦Ù…Ø© ØªØ´ØºÙŠÙ„ m3u(8) Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.',
	'channelLoadError': 'Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ù†Ø§Ø© ØºÙŠØ± Ù…ØªÙˆÙØ±Ø© ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„Ø­Ø§Ù„ÙŠ. Ø§Ù„Ø±Ø¬Ø§Ø¡ Ù…Ø¹Ø§ÙˆØ¯Ø© Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© ÙÙŠ ÙˆÙ‚Øª Ù„Ø§Ø­Ù‚.',
	'channelLoadConnectionFailed': '(ÙØ´Ù„ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø¯ÙÙ‚.)',
	'channelNotSupportedFile': 'Ù„Ø§ ÙŠÙ…ÙƒÙ† ØªØ­Ù…ÙŠÙ„ Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ù†Ø§Ø© Ø¨Ø³Ø¨Ø¨ ØªÙ†Ø³ÙŠÙ‚ ØºÙŠØ± Ù…ØªÙˆØ§ÙÙ‚.',
	'errorNoFavouritesYet': 'Ù„ÙŠØ³ Ù„Ø¯ÙŠÙƒ Ø£ÙŠ Ù‚Ù†ÙˆØ§Øª Ù…ÙØ¶Ù„Ø© Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†. Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø²Ø± Ø§Ù„Ø£ØµÙØ± Ù„ØªÙØ¶ÙŠÙ„ Ù‚Ù†Ø§Ø©.',
	'errorNoPlaylistHistory': 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù‚Ø§Ø¦Ù…Ø© ØªØ´ØºÙŠÙ„ ÙÙŠ Ø§Ù„ØªØ§Ø±ÙŠØ® Ø­ØªÙ‰ Ø§Ù„Ø§Ù†. Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø¹Ù†ÙˆØ§Ù† URL ÙÙŠ Ø§Ù„Ø­Ù‚Ù„ Ø£Ø¯Ù†Ø§Ù‡.',

	// Menu
	'searchPlaceholder': 'Ø¨Ø­Ø«',
	'allChannels': 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù‚Ù†ÙˆØ§Øª',
	'favourites': 'â­ Ø§Ù„Ù…ÙØ¶Ù„Ø©',
	'groups': 'Ù…Ø¬Ù…ÙˆØ¹Ø§Øª',
	'channels': 'Ø§Ù„Ù‚Ù†ÙˆØ§Øª',
	'settings_menu': 'Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª',
	'epg_menu': 'Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
	'guide_menu': 'Ù…Ø±Ø´Ø¯',

	'guideControlsHeadline': 'Ø§Ù„Ø¶ÙˆØ§Ø¨Ø·',

	// Advanced Settings
	'tabGeneralSettings': 'Ø§Ù„Ø§Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø©',
	'tabAdvancedSettings': 'Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ù…ØªÙ‚Ø¯Ù…Ø©',
	'chooseMousewheel': 'Ø¹Ø¬Ù„Ø© Ø§Ù„ÙØ£Ø±Ø©',
	'volumeSetting': 'Ø±ÙØ¹ Ø§Ù„ØµÙˆØª / Ø®ÙØ¶Ù‡',
	'channelSetting': 'Ù‚Ù†Ø§Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø£Ù…Ø§Ù… / Ø§Ù„Ø®Ù„Ù',
	'reloadPlaylistOnStart': 'Ù‚Ù… Ø¨ØªÙ†Ø²ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ ÙÙŠ ÙƒÙ„ Ø¨Ø¯Ø§ÙŠØ©',
	'bufferSetting': 'Ø¹Ø§Ø²Ù„Ø© Ø§Ù„ÙÙŠØ¯ÙŠÙˆ',

	// Channel Settings
	'loading': 'Ø¬Ø§Ø± Ø§Ù„ØªØ­Ù…ÙŠÙ„...',
	'audioTrack': 'Ù…Ø³Ø§Ø± Ø§Ù„ØµÙˆØª',
	'subtitleTrack': 'Ù…Ø³Ø§Ø± Ø§Ù„ØªØ±Ø¬Ù…Ø©',
	'channelSettings': 'Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù‚Ù†Ø§Ø©',
	'channelSettingSubtitle': 'ØªØ±Ø¬Ù…Ø© / ØµÙˆØª',
	'channelSettingAudio': 'ØµÙˆØª',
	'channelSettingVideo': 'ÙÙŠØ¯ÙŠÙˆ / ØªÙ†Ø³ÙŠÙ‚',
	'channelSettingFavs': 'Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù‚Ù†Ø§Ø© Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙØ¶Ù„Ø©',
	'channelSettingPlayback': 'Ø¹Ø±Ø¶ Ø¹Ù†Ø§ØµØ± Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„ØªØ´ØºÙŠÙ„',
	'channelSettingAudioDefault': 'Ø§Ù„Ù…Ø³Ø§Ø± Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠ',
	'channelSettingSubNoTrack': 'ØºÙŠØ± Ù…ØªÙˆÙØ±',
	'channelSettingSubOff': 'ØªØ¹Ø·ÙŠÙ„',
	'channelSettingResolution': 'Ø§Ù„Ø¯Ù‚Ø©',
	'channelSettingFormat': 'ØªÙ†Ø³ÙŠÙ‚ Ø§Ù„ÙÙŠØ¯ÙŠÙˆ',
	'channelSettingFormatOriginal': 'Ø£ØµÙ„ÙŠ',
	'channelSettingFormatFill': 'Ù…Ù„Ø¡ / ØªÙ…Ø¯ÙŠØ¯',
	'channelSettingFormatZoom': 'ØªÙƒØ¨ÙŠØ±',

	// EPG
	'epgSource': 'Ù…ØµØ¯Ø± EPG',
	'epgSourceFromPlaylist': 'Ø±Ø§Ø¨Ø· EPG Ù…Ù† Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„',
	'usePlaylistEpgUrl': 'Ø§Ø³ØªØ®Ø¯Ù… Ù…ØµØ¯Ø± EPG Ù…Ù† Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ Ø¨Ø¯Ù„Ø§Ù‹ Ù…Ù† Ø°Ù„ÙƒØŸ',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'Ø§Ù„ÙØ§ØµÙ„ Ø§Ù„Ø²Ù…Ù†ÙŠ Ù„Ø³Ø­Ø¨ EPG',
	'downloadEpgButton': 'Ù‚Ù… Ø¨ØªÙ†Ø²ÙŠÙ„ Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ø§Ù„Ø¢Ù†',
	'noEpgForChannel': 'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ù„Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ù†Ø§Ø©',
	'noEpgUrlGiven': 'Ù„Ù… ÙŠØªÙ… ØªØ¹ÙŠÙŠÙ† Ø¹Ù†ÙˆØ§Ù† URL Ù„Ù€ EPG',
	'noEpgUrlInPlaylist': 'ØºÙŠØ± Ù…ØªØ§Ø­ ÙÙŠ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„',
	'epgQuotaExceededError': 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ø³Ø§Ø­Ø© Ø®Ø§Ù„ÙŠØ© ÙƒØ§ÙÙŠØ© Ù„Ø­ÙØ¸ Ø¨ÙŠØ§Ù†Ø§Øª Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ. Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø®Ù„Ø§Ø¡ Ø¨Ø¹Ø¶ Ø§Ù„Ù…Ø³Ø§Ø­Ø©. Ø¹Ù„Ù‰ Ø³Ø¨ÙŠÙ„ Ø§Ù„Ù…Ø«Ø§Ù„ Ø¹Ù† Ø·Ø±ÙŠÙ‚ Ø­Ø°Ù Ø§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª ØºÙŠØ± Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø©.',
	'epgNotCompatibleWithPlaylist': 'Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ ØºÙŠØ± Ù…ØªÙˆØ§ÙÙ‚Ø© Ù…Ø¹ Ø¹Ù†ÙˆØ§Ù† URL Ù‡Ø°Ø§.',
	'epgIsDownloading': 'ØªØ­Ù…ÙŠÙ„ Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ...',
	'epgChannelsProcessed': 'Ø§Ù„Ù‚Ù†ÙˆØ§Øª: ',
	'epgProgramsProcessed': 'Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬: ',
	'epgNow': 'Ø§Ù„Ø¢Ù†',
	'epgAfter': 'Ø¨Ø¹Ø¯ Ø°Ù„Ùƒ',

},
'fi': {
	'yes': 'joo', 'no': 'ei',

	'm3uSource': 'URL m3u(8)-tiedostoon',
	'chooseLang': 'Kieli',
	'usbLoadLabel': 'Soittolista USB:ltÃ¤',
	'openUsbButton': 'selata USB:tÃ¤',
	'localLoadLabel': 'Paikallinen m3u(8)-tiedosto',
	'openExplorerButton': 'avoin tutkimusmatkailija',
	'openHistoryButton': 'historia',
	'downloadButton': 'lataa soittolista',
	'saveButton': 'tallenna ja pelaa',
	'deleteButton': 'poista soittolista',
	'generalSettingsButton': 'Yleiset asetukset',
	'advancedSettingsButton': 'LisÃ¤asetukset',

	'closeAppHint': 'Haluatko sulkea tÃ¤mÃ¤n sovelluksen?',
	'hideModalHint': 'Sulje tÃ¤mÃ¤ viesti painamalla mitÃ¤ tahansa painiketta.',
	'playlistDownloaded': 'Soittolistan lataus onnistui.<br>%i kanavaa ladattu.',
	'channelsLoaded': 'kanavia',
	'filterNoResults': 'Ei lÃ¶ydetty kanavia annetulle suodattimelle.',

	'redButtonHint': '<span class="red-button">A</span> etsiÃ¤',
	'helpHint': 'LisÃ¤Ã¤ esittelykanavaluettelo painamalla <span class="red-button">A</span>-painiketta.<br><br>Saat kÃ¤yttÃ¶oppaan milloin tahansa painamalla kaukosÃ¤Ã¤timen INFO-painiketta.',

	'supportContact': 'LisÃ¤tietoja on osoitteessa https://m3u-ip.tv/fi',
	'supportContactLinked': 'LisÃ¤tietoja on osoitteessa <a href="https://m3u-ip.tv/fi/" target="_blank">https://m3u-ip.tv/fi</a>',
	'donate': 'Jos pidÃ¤t tÃ¤stÃ¤ sovelluksesta, tue minua pienellÃ¤ lahjoituksella.<br>KÃ¤y osoitteessa <b class="NOBR">https://m3u-ip.tv</b><br>tai QR-koodin kautta.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (luottokortti)',
	'downloadM3uStatus': 'Ladataan soittolistaa. Odota hetki.',
	'usbMountedStatus': 'USB kiinnitetty',

	'connectionLost': 'Verkkoyhteys katkesi. Tarkista verkkosi.',
	'checkM3uError': 'Soittolistaa ei voitu ladata. HTTP-tilakoodi: ',
	'checkM3uFileError': 'Ei kelvollinen m3u(8)-soittolista. Tarkista tiedosto.',
	'checkM3uDownloadError': 'Soittolistaa ei voitu ladata. Tarkista URL-osoite.',
	'checkM3uDownloadSizeError': 'Soittolista sisÃ¤ltÃ¤Ã¤ liian monta kanavaa. VÃ¤hennÃ¤ ne enintÃ¤Ã¤n 20.000 kanavaan.',
	'checkM3uTimeoutError': 'Aikakatkaisu tapahtui soittolistaasi ladattaessa. YritÃ¤ uudelleen.',
	'errorNoUsbMounted': 'USB-tallennustilaa ei havaittu. LiitÃ¤ ensin USB-tallennuslaite.',
	'errorNoM3uUrl': 'Anna kelvollinen URL-osoite m3u(8)-soittolistallesi.',
	'channelLoadError': 'TÃ¤mÃ¤ kanava ei ole tÃ¤llÃ¤ hetkellÃ¤ saatavilla. YritÃ¤ uudelleen myÃ¶hemmin.',
	'channelLoadConnectionFailed': '(Yhteyden muodostaminen streamiin epÃ¤onnistui.)',
	'channelNotSupportedFile': 'TÃ¤tÃ¤ kanavaa ei voi ladata, koska muoto ei ole yhteensopiva.',
	'errorNoFavouritesYet': 'Sinulla ei ole vielÃ¤ suosikkikanavia. Paina KELTAISTA painiketta lisÃ¤tÃ¤ksesi kanavan suosikkeihin.',
	'errorNoPlaylistHistory': 'Ei vielÃ¤ soittolistaa historiassa. LisÃ¤Ã¤ URL-osoite alla olevaan kenttÃ¤Ã¤n.',

	// Menu
	'searchPlaceholder': 'EtsintÃ¤',
	'allChannels': 'Kaikki kanavat',
	'favourites': 'â­ Suosikit',
	'groups': 'RyhmÃ¤t',
	'channels': 'Kanavat',
	'settings_menu': 'Asetukset',
	'epg_menu': 'EPG',
	'guide_menu': 'Opas',

	'guideControlsHeadline': 'SÃ¤Ã¤timet',

	// Advanced Settings
	'tabGeneralSettings': 'Yleiset asetukset',
	'tabAdvancedSettings': 'LisÃ¤asetukset',
	'chooseMousewheel': 'Hiiren rulla',
	'volumeSetting': 'Ã„Ã¤nenvoimakkuus ylÃ¶s/alas',
	'channelSetting': 'Kanava eteen/taakse',
	'reloadPlaylistOnStart': 'Lataa soittolista jokaisen kÃ¤ynnistyksen yhteydessÃ¤',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'ladataan...',
	'audioTrack': 'Ã„Ã¤niraita',
	'subtitleTrack': 'Tekstitysraita',
	'channelSettings': 'Kanavan asetukset',
	'channelSettingSubtitle': 'tekstitys / Ã¤Ã¤ni',
	'channelSettingAudio': 'zvuk',
	'channelSettingVideo': 'video / muoto',
	'channelSettingFavs': 'lisÃ¤Ã¤ kanava suosikkeihin',
	'channelSettingPlayback': 'nÃ¤ytÃ¤ toiston hallintapainikkeet',
	'channelSettingAudioDefault': 'oletusraita',
	'channelSettingSubNoTrack': 'ei saatavilla',
	'channelSettingSubOff': 'poista kÃ¤ytÃ¶stÃ¤',
	'channelSettingResolution': 'resoluutio',
	'channelSettingFormat': 'Videomuoto',
	'channelSettingFormatOriginal': 'alkuperÃ¤inen',
	'channelSettingFormatFill': 'tÃ¤ytÃ¤ / venytÃ¤',
	'channelSettingFormatZoom': 'zoomaus',

	// EPG
	'epgSource': 'EPG lÃ¤hde',
	'epgSourceFromPlaylist': 'EPG URL soittolistasta',
	'usePlaylistEpgUrl': 'KÃ¤ytÃ¤tkÃ¶ sen sijaan EPG-lÃ¤hdettÃ¤ soittolistastasi?',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'EPG-hakuvÃ¤li',
	'downloadEpgButton': 'lataa EPG nyt',
	'noEpgForChannel': 'Ei EPG:tÃ¤ tÃ¤lle kanavalle',
	'noEpgUrlGiven': 'EPG:n URL-osoitetta ei ole asetettu',
	'noEpgUrlInPlaylist': 'Ei saatavilla soittolistassa',
	'epgQuotaExceededError': 'Ei tarpeeksi vapaata tilaa EPG-tietojen tallentamiseen. Vapauta tilaa. Esimerkiksi poistamalla kÃ¤yttÃ¤mÃ¤ttÃ¶mÃ¤t sovellukset.',
	'epgNotCompatibleWithPlaylist': 'Soittolistasi ei ole yhteensopiva tÃ¤mÃ¤n EGP-URL-osoitteen kanssa.',
	'epgIsDownloading': 'Ladataan EPG:tÃ¤ ...',
	'epgChannelsProcessed': 'kanavat: ',
	'epgProgramsProcessed': 'ohjelmat: ',
	'epgNow': 'Nyt',
	'epgAfter': 'Sen jÃ¤lkeen',

},
'ro': {
	'yes': 'da', 'no': 'nu',

	'm3uSource': 'URL la fiÈ™ierul m3u(8).',
	'chooseLang': 'Limba',
	'usbLoadLabel': 'Playlist de pe USB',
	'openUsbButton': 'rÄƒsfoieÈ™te USB',
	'localLoadLabel': 'FiÈ™ier m3u(8) local',
	'openExplorerButton': 'deschide exploratorul',
	'openHistoryButton': 'istorie',
	'downloadButton': 'Ã®ncÄƒrcaÈ›i playlistul',
	'saveButton': 'salvaÈ›i È™i jucaÈ›i',
	'deleteButton': 'È™terge lista de redare',
	'generalSettingsButton': 'SetÄƒri generale',
	'advancedSettingsButton': 'SetÄƒri avansate',

	'closeAppHint': 'DoriÈ›i sÄƒ Ã®nchideÈ›i aceastÄƒ aplicaÈ›ie?',
	'hideModalHint': 'ApÄƒsaÈ›i orice buton pentru a Ã®nchide acest mesaj.',
	'playlistDownloaded': 'Lista de redare a fost descÄƒrcatÄƒ cu succes.<br>%i canale Ã®ncÄƒrcate.',
	'channelsLoaded': 'canale',
	'filterNoResults': 'Nu s-au gÄƒsit canale pentru filtrul dat.',

	'redButtonHint': '<span class="red-button">A</span> cÄƒutare',
	'helpHint': 'ApÄƒsaÈ›i butonul <span class="red-button">A</span> pentru a insera lista de canale demonstrative.<br><br>ApÄƒsaÈ›i Ã®n orice moment INFO sau GHID de pe telecomandÄƒ pentru un ghid al utilizatorului.',

	'supportContact': 'Pentru mai multe informaÈ›ii, vizitaÈ›i https://m3u-ip.tv/ro',
	'supportContactLinked': 'Pentru mai multe informaÈ›ii, vizitaÈ›i <a href="https://m3u-ip.tv/ro/" target="_blank">https://m3u-ip.tv/ro</a>',
	'donate': 'DacÄƒ vÄƒ place aceastÄƒ aplicaÈ›ie, vÄƒ rugÄƒm sÄƒ mÄƒ susÈ›ineÈ›i cu o micÄƒ donaÈ›ie.<br>VizitaÈ›i <b class="NOBR">https://m3u-ip.tv</b><br>sau prin codul QR.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (Card de credit)',
	'downloadM3uStatus': 'Se Ã®ncarcÄƒ lista de redare. Te rog asteapta un moment.',
	'usbMountedStatus': 'Montat pe USB',

	'connectionLost': 'S-a pierdut conexiunea la reÈ›ea. VÄƒ rugÄƒm sÄƒ vÄƒ verificaÈ›i reÈ›eaua.',
	'checkM3uError': 'Lista de redare nu a putut fi Ã®ncÄƒrcatÄƒ. Cod de stare HTTP: ',
	'checkM3uFileError': 'Nu este o listÄƒ de redare m3u(8) validÄƒ. VÄƒ rugÄƒm sÄƒ verificaÈ›i fiÈ™ierul.',
	'checkM3uDownloadError': 'Lista de redare nu a putut fi Ã®ncÄƒrcatÄƒ. VÄƒ rugÄƒm sÄƒ verificaÈ›i adresa URL.',
	'checkM3uDownloadSizeError': 'Lista de redare conÈ›ine prea multe canale. VÄƒ rugÄƒm sÄƒ le reduceÈ›i la maximum 20.000 de canale.',
	'checkM3uTimeoutError': 'Timeout a avut loc la Ã®ncÄƒrcarea listei de redare. VÄƒ rugÄƒm sÄƒ Ã®ncercaÈ›i din nou.',
	'errorNoUsbMounted': 'Nu a fost detectatÄƒ niciun spaÈ›iu de stocare USB. ConectaÈ›i mai Ã®ntÃ¢i un dispozitiv de stocare USB.',
	'errorNoM3uUrl': 'VÄƒ rugÄƒm sÄƒ introduceÈ›i o adresÄƒ URL validÄƒ pentru lista dvs. de redare m3u(8).',
	'channelLoadError': 'Acest canal nu este disponibil momentan. VÄƒ rugÄƒm sÄƒ Ã®ncercaÈ›i din nou mai tÃ¢rziu.',
	'channelLoadConnectionFailed': '(Conexiunea la flux a eÈ™uat.)',
	'channelNotSupportedFile': 'Acest canal nu poate fi Ã®ncÄƒrcat din cauza unui format incompatibil.',
	'errorNoFavouritesYet': 'Nu aveÈ›i Ã®ncÄƒ niciun canal preferat. ApÄƒsaÈ›i butonul GALBEN pentru a favoriza un canal.',
	'errorNoPlaylistHistory': 'ÃncÄƒ nu existÄƒ playlist Ã®n istorie. VÄƒ rugÄƒm sÄƒ introduceÈ›i o adresÄƒ URL Ã®n cÃ¢mpul de mai jos.',

	// Menu
	'searchPlaceholder': 'CÄƒutare',
	'allChannels': 'Toate canalele',
	'favourites': 'â­ Favorite',
	'groups': 'Grupuri',
	'channels': 'Canale',
	'settings_menu': 'SetÄƒri',
	'epg_menu': 'EPG',
	'guide_menu': 'Ghid',

	'guideControlsHeadline': 'Controale',

	// Advanced Settings
	'tabGeneralSettings': 'SetÄƒri generale',
	'tabAdvancedSettings': 'SetÄƒri avansate',
	'chooseMousewheel': 'Roata mouse-ului',
	'volumeSetting': 'Volum sus/jos',
	'channelSetting': 'Canal Ã®nainte/Ã®napoi',
	'reloadPlaylistOnStart': 'DescÄƒrcaÈ›i lista de redare la fiecare pornire',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'se Ã®ncarcÄƒ...',
	'audioTrack': 'PistÄƒ audio',
	'subtitleTrack': 'PistÄƒ subtitrare',
	'channelSettings': 'SetÄƒri canal',
	'channelSettingSubtitle': 'subtitrare / audio',
	'channelSettingAudio': 'audio',
	'channelSettingVideo': 'video / format',
	'channelSettingFavs': 'adaugÄƒ canal la favorite',
	'channelSettingPlayback': 'aratÄƒ controalele de redare',
	'channelSettingAudioDefault': 'pistÄƒ implicitÄƒ',
	'channelSettingSubNoTrack': 'nu este disponibil',
	'channelSettingSubOff': 'dezactiveazÄƒ',
	'channelSettingResolution': 'rezoluÈ›ie',
	'channelSettingFormat': 'Format video',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'umple / Ã®ntinde',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'Sursa EPG',
	'epgSourceFromPlaylist': 'URL EPG din lista de redare',
	'usePlaylistEpgUrl': 'FolosiÈ›i Ã®n schimb sursa EPG din lista dvs. de redare?',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'Interval de preluare EPG',
	'downloadEpgButton': 'descÄƒrcaÈ›i EPG acum',
	'noEpgForChannel': 'Nu existÄƒ EPG pentru acest canal',
	'noEpgUrlGiven': 'Nicio adresÄƒ URL EPG setatÄƒ',
	'noEpgUrlInPlaylist': 'Indisponibil Ã®n lista de redare',
	'epgQuotaExceededError': 'Nu este suficient spaÈ›iu liber pentru a salva datele EPG. VÄƒ rugÄƒm sÄƒ eliberaÈ›i spaÈ›iu. De exemplu, È™tergÃ¢nd aplicaÈ›iile neutilizate.',
	'epgNotCompatibleWithPlaylist': 'Lista dvs. de redare nu este compatibilÄƒ cu aceastÄƒ adresÄƒ URL EGP.',
	'epgIsDownloading': 'Se Ã®ncarcÄƒ EPG ...',
	'epgChannelsProcessed': 'canale: ',
	'epgProgramsProcessed': 'programe: ',
	'epgNow': 'Acum',
	'epgAfter': 'Dupa aceea',

},
'no': {
	'yes': 'ja', 'no': 'nei',

	'm3uSource': 'URL til m3u(8)-fil',
	'chooseLang': 'SprÃ¥k',
	'usbLoadLabel': 'Spilleliste fra USB',
	'openUsbButton': 'bla USB',
	'localLoadLabel': 'Lokal m3u(8)-fil',
	'openExplorerButton': 'Ã¥pne filutforsker',
	'openHistoryButton': 'historie',
	'downloadButton': 'last spilleliste',
	'saveButton': 'lagre og spill',
	'deleteButton': 'slette spilleliste',
	'generalSettingsButton': 'hovedinnstillinger',
	'advancedSettingsButton': 'avansert',

	'closeAppHint': 'Vil du lukke denne appen?',
	'hideModalHint': 'Trykk pÃ¥ en knapp for Ã¥ lukke denne meldingen.',
	'playlistDownloaded': 'Spillelisten er lastet ned.<br>%i kanaler er lastet.',
	'channelsLoaded': 'kanaler',
	'filterNoResults': 'Ingen kanaler funnet for angitt filter.',

	'redButtonHint': '<span class="red-button">A</span> gjennomsÃ¸ke',
	'helpHint': 'Trykk pÃ¥ <span class="red-button">A</span>-knappen for Ã¥ sette inn en demokanalliste.<br><br>Trykk pÃ¥ INFO eller GUIDE pÃ¥ fjernkontrollen nÃ¥r som helst for Ã¥ fÃ¥ en brukerveiledning.',

	'supportContact': 'For mer informasjon, besÃ¸k https://m3u-ip.tv/no',
	'supportContactLinked': 'For mer informasjon, besÃ¸k <a href="https://m3u-ip.tv/no/" target="_blank">https://m3u-ip.tv/no</a>',
	'donate': 'Hvis du liker denne appen, vennligst stÃ¸tte meg med en liten donasjon.<br>BesÃ¸k <b class="NOBR">https://m3u-ip.tv</b><br>eller via QR-kode.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (kredittkort)',
	'downloadM3uStatus': 'Laster spilleliste. Vennligst vent et Ã¸yeblikk.',
	'usbMountedStatus': 'USB-montert',

	'connectionLost': 'Nettverkstilkoblingen ble brutt. Vennligst sjekk nettverket ditt.',
	'checkM3uError': 'Kunne ikke laste inn spillelisten. HTTP-statuskode: ',
	'checkM3uFileError': 'Ikke en gyldig m3u(8)-spilleliste. Vennligst sjekk filen.',
	'checkM3uDownloadError': 'Kunne ikke laste inn spillelisten. Vennligst sjekk URL-en.',
	'checkM3uDownloadSizeError': 'Spillelisten inneholder for mange kanaler. Vennligst reduser dem til maks 20.000 kanaler.',
	'checkM3uTimeoutError': 'Tidsavbrudd oppsto under innlasting av spillelisten. VÃ¦r sÃ¥ snill, prÃ¸v pÃ¥ nytt.',
	'errorNoUsbMounted': 'Ingen USB-lagring oppdaget. Koble til en USB-lagringsenhet fÃ¸rst.',
	'errorNoM3uUrl': 'Vennligst skriv inn en gyldig URL til m3u(8) spillelisten din.',
	'channelLoadError': 'Denne kanalen er ikke tilgjengelig for Ã¸yeblikket. PrÃ¸v igjen senere.',
	'channelLoadConnectionFailed': '(Tilkobling til strÃ¸mmen mislyktes.)',
	'channelNotSupportedFile': 'Denne kanalen kan ikke lastes pÃ¥ grunn av et inkompatibelt format.',
	'errorNoFavouritesYet': 'Du har ingen favorittkanaler ennÃ¥. Trykk pÃ¥ den GULE knappen for Ã¥ favoritt en kanal.',
	'errorNoPlaylistHistory': 'Ingen spilleliste i historien ennÃ¥. Vennligst skriv inn en URL i feltet nedenfor.',

	// Menu
	'searchPlaceholder': 'SÃ¸k',
	'allChannels': 'Alle kanaler',
	'favourites': 'â­ Favoritter',
	'groups': 'Grupper',
	'channels': 'Kanaler',
	'settings_menu': 'Innstillinger',
	'epg_menu': 'EPG',
	'guide_menu': 'Guide',

	'guideControlsHeadline': 'Kontroller',

	// Advanced Settings
	'tabGeneralSettings': 'Generelle innstillinger',
	'tabAdvancedSettings': 'Avanserte innstillinger',
	'chooseMousewheel': 'Mus hjul',
	'volumeSetting': 'Volum opp/ned',
	'channelSetting': 'Kanal fremover/bakover',
	'reloadPlaylistOnStart': 'Last ned spilleliste ved hver start',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'laster...',
	'audioTrack': 'Lydspor',
	'subtitleTrack': 'Tekstingsspor',
	'channelSettings': 'Kanalinnstillinger',
	'channelSettingSubtitle': 'undertekst / lyd',
	'channelSettingAudio': 'lyd',
	'channelSettingVideo': 'video / format',
	'channelSettingFavs': 'legg til kanal i favoritter',
	'channelSettingPlayback': 'vis avspillingskontroller',
	'channelSettingAudioDefault': 'standard spor',
	'channelSettingSubNoTrack': 'ikke tilgjengelig',
	'channelSettingSubOff': 'deaktiver',
	'channelSettingResolution': 'resolution',
	'channelSettingFormat': 'Videoformat',
	'channelSettingFormatOriginal': 'original',
	'channelSettingFormatFill': 'fyll / strekk',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'EPG-kilde',
	'epgSourceFromPlaylist': 'EPG-URL fra spillelisten',
	'usePlaylistEpgUrl': 'Vil du bruke EPG-kilde fra spillelisten din i stedet?',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'EPG-gripeintervall',
	'downloadEpgButton': 'last ned EPG nÃ¥',
	'noEpgForChannel': 'Ingen EPG for denne kanalen',
	'noEpgUrlGiven': 'Ingen EPG URL satt',
	'noEpgUrlInPlaylist': 'Ikke tilgjengelig i spillelisten',
	'epgQuotaExceededError': 'Ikke nok ledig plass til Ã¥ lagre EPG-data. Vennligst frigjÃ¸r litt plass. For eksempel ved Ã¥ slette ikke brukte apper.',
	'epgNotCompatibleWithPlaylist': 'Spillelisten din er ikke kompatibel med denne EGP-URL.',
	'epgIsDownloading': 'Laster inn EPG ...',
	'epgChannelsProcessed': 'kanaler: ',
	'epgProgramsProcessed': 'programmer: ',
	'epgNow': 'NÃ¥',
	'epgAfter': 'Etter det',

},
'el': {
	'yes': 'ÎÎ±Î¯', 'no': 'ÏŒÏ‡Î¹',

	'm3uSource': 'URL ÏƒÏ„Î¿ Î±ÏÏ‡ÎµÎ¯Î¿ m3u(8).',
	'chooseLang': 'Î“Î»ÏÏƒÏƒÎ±',
	'usbLoadLabel': 'Î›Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ Î±Ï€ÏŒ USB',
	'openUsbButton': 'Ï€ÎµÏÎ¹Î®Î³Î·ÏƒÎ· USB',
	'localLoadLabel': 'Î¤Î¿Ï€Î¹ÎºÏŒ Î±ÏÏ‡ÎµÎ¯Î¿ m3u(8).',
	'openExplorerButton': 'Î±Î½Î¿Î¹Ï‡Ï„ÏŒÏ‚ ÎµÎ¾ÎµÏÎµÏ…Î½Î·Ï„Î®Ï‚',
	'openHistoryButton': 'Î¹ÏƒÏ„Î¿ÏÎ¯Î±',
	'downloadButton': 'Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Î»Î¯ÏƒÏ„Î±Ï‚ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚',
	'saveButton': 'Î±Ï€Î¿Î¸Î·ÎºÎµÏÏƒÏ„Îµ ÎºÎ±Î¹ Ï€Î±Î¯Î¾Ï„Îµ',
	'deleteButton': 'Î´Î¹Î±Î³ÏÎ±Ï†Î® playlist',
	'generalSettingsButton': 'Î“ÎµÎ½Î¹ÎºÎ­Ï‚ Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚',
	'advancedSettingsButton': 'Î ÏÎ¿Î·Î³Î¼Î­Î½ÎµÏ‚ Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚',

	'closeAppHint': 'Î˜Î­Î»ÎµÏ„Îµ Î½Î± ÎºÎ»ÎµÎ¯ÏƒÎµÏ„Îµ Î±Ï…Ï„Î®Î½ Ï„Î·Î½ ÎµÏ†Î±ÏÎ¼Î¿Î³Î®;',
	'hideModalHint': 'Î Î±Ï„Î®ÏƒÏ„Îµ Î¿Ï€Î¿Î¹Î¿Î´Î®Ï€Î¿Ï„Îµ ÎºÎ¿Ï…Î¼Ï€Î¯ Î³Î¹Î± Î½Î± ÎºÎ»ÎµÎ¯ÏƒÎµÏ„Îµ Î±Ï…Ï„ÏŒ Ï„Î¿ Î¼Î®Î½Ï…Î¼Î±.',
	'playlistDownloaded': 'Î— Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ Î»Î®Ï†Î¸Î·ÎºÎµ Î¼Îµ ÎµÏ€Î¹Ï„Ï…Ï‡Î¯Î±.<br>Î¦Î¿ÏÏ„ÏÎ¸Î·ÎºÎ±Î½ %i ÎºÎ±Î½Î¬Î»Î¹Î±.',
	'channelsLoaded': 'ÎºÎ±Î½Î¬Î»Î¹Î±',
	'filterNoResults': 'Î”ÎµÎ½ Î²ÏÎ­Î¸Î·ÎºÎ±Î½ ÎºÎ±Î½Î¬Î»Î¹Î± Î³Î¹Î± Ï„Î¿Î½ Î´Î¿ÏƒÎ¼Î­Î½Î¿ Ï†Î¯Î»Ï„ÏÎ¿.',

	'redButtonHint': '<span class="red-button">A</span> ÏˆÎ¬Ï‡Î½Ï‰',
	'helpHint': 'Î Î±Ï„Î®ÏƒÏ„Îµ Ï„Î¿ ÎºÎ¿Ï…Î¼Ï€Î¯ <span class="red-button">A</span>-Î³Î¹Î± Î½Î± ÎµÎ¹ÏƒÎ±Î³Î¬Î³ÎµÏ„Îµ Ï„Î· Î»Î¯ÏƒÏ„Î± ÎºÎ±Î½Î±Î»Î¹ÏÎ½ ÎµÏ€Î¯Î´ÎµÎ¹Î¾Î·Ï‚.<br><br>Î Î±Ï„Î®ÏƒÏ„Îµ INFO Î® GUIDE ÏƒÏ„Î¿ Ï„Î·Î»ÎµÏ‡ÎµÎ¹ÏÎ¹ÏƒÏ„Î®ÏÎ¹Î¿ Î±Î½Î¬ Ï€Î¬ÏƒÎ± ÏƒÏ„Î¹Î³Î¼Î® Î³Î¹Î± Î­Î½Î±Î½ Î¿Î´Î·Î³ÏŒ Ï‡ÏÎ®ÏƒÎ·Ï‚.',

	'supportContact': 'Î“Î¹Î± Ï€ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎµÏ‚ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚, ÎµÏ€Î¹ÏƒÎºÎµÏ†Ï„ÎµÎ¯Ï„Îµ Ï„Î· Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· https://m3u-ip.tv/gr',
	'supportContactLinked': 'Î“Î¹Î± Ï€ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎµÏ‚ Ï€Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚, ÎµÏ€Î¹ÏƒÎºÎµÏ†Ï„ÎµÎ¯Ï„Îµ Ï„Î· Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· <a href="https://m3u-ip.tv/gr/" target="_blank">https://m3u-ip.tv/gr</a>',
	'donate': 'Î‘Î½ ÏƒÎ±Ï‚ Î±ÏÎ­ÏƒÎµÎ¹ Î±Ï…Ï„Î® Î· ÎµÏ†Î±ÏÎ¼Î¿Î³Î®, Ï…Ï€Î¿ÏƒÏ„Î·ÏÎ¯Î¾Ï„Îµ Î¼Îµ Î¼Îµ Î¼Î¹Î± Î¼Î¹ÎºÏÎ® Î´Ï‰ÏÎµÎ¬.<br>Î•Ï€Î¹ÏƒÎºÎµÏ†Ï„ÎµÎ¯Ï„Îµ Ï„Î· <b class="NOBR">https://m3u-ip.tv</b><br>Î® Î¼Î­ÏƒÏ‰ QR-code.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (Ï€Î¹ÏƒÏ„Ï‰Ï„Î¹ÎºÎ® ÎºÎ¬ÏÏ„Î±)',
	'downloadM3uStatus': 'Î¦ÏŒÏÏ„Ï‰ÏƒÎ· Î»Î¯ÏƒÏ„Î±Ï‚ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚. Î Î±ÏÎ±ÎºÎ±Î»Ï Ï€ÎµÏÎ¹Î¼Î­Î½ÎµÏ„Îµ Î¼Î¹Î± ÏƒÏ„Î¹Î³Î¼Î®.',
	'usbMountedStatus': 'Î¤Î¿Ï€Î¿Î¸Î­Ï„Î·ÏƒÎ· USB',

	'connectionLost': 'Î— ÏƒÏÎ½Î´ÎµÏƒÎ· Î´Î¹ÎºÏ„ÏÎ¿Ï… Ï‡Î¬Î¸Î·ÎºÎµ. Î•Î»Î­Î³Î¾Ï„Îµ Ï„Î¿ Î´Î¯ÎºÏ„Ï…ÏŒ ÏƒÎ±Ï‚.',
	'checkM3uError': 'Î”ÎµÎ½ Î®Ï„Î±Î½ Î´Ï…Î½Î±Ï„Î® Î· Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Ï„Î·Ï‚ Î»Î¯ÏƒÏ„Î±Ï‚ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚. ÎšÏ‰Î´Î¹ÎºÏŒÏ‚ ÎºÎ±Ï„Î¬ÏƒÏ„Î±ÏƒÎ·Ï‚ HTTP: ',
	'checkM3uFileError': 'Î”ÎµÎ½ ÎµÎ¯Î½Î±Î¹ Î­Î³ÎºÏ…ÏÎ· Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ m3u(8). Î•Î»Î­Î³Î¾Ï„Îµ Ï„Î¿ Î±ÏÏ‡ÎµÎ¯Î¿.',
	'checkM3uDownloadError': 'Î”ÎµÎ½ Î®Ï„Î±Î½ Î´Ï…Î½Î±Ï„Î® Î· Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Ï„Î·Ï‚ Î»Î¯ÏƒÏ„Î±Ï‚ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚. Î•Î»Î­Î³Î¾Ï„Îµ Ï„Î· Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· URL.',
	'checkM3uDownloadSizeError': 'Î— Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ Ï€ÎµÏÎ¹Î­Ï‡ÎµÎ¹ Ï€Î¬ÏÎ± Ï€Î¿Î»Î»Î¬ ÎºÎ±Î½Î¬Î»Î¹Î±. ÎœÎµÎ¹ÏÏƒÏ„Îµ Ï„Î± ÏƒÎµ 20.000 ÎºÎ±Î½Î¬Î»Î¹Î± Ï„Î¿ Ï€Î¿Î»Ï.',
	'checkM3uTimeoutError': 'Î Î±ÏÎ¿Ï…ÏƒÎ¹Î¬ÏƒÏ„Î·ÎºÎµ Ï‡ÏÎ¿Î½Î¹ÎºÏŒ ÏŒÏÎ¹Î¿ ÎºÎ±Ï„Î¬ Ï„Î· Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Ï„Î·Ï‚ Î»Î¯ÏƒÏ„Î±Ï‚ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ ÏƒÎ±Ï‚. Î Î‘Î¡Î‘ÎšÎ‘Î›Î© Ï€ÏÎ¿ÏƒÏ€Î±Î¸Î·ÏƒÎµ Î¾Î±Î½Î±.',
	'errorNoUsbMounted': 'Î”ÎµÎ½ ÎµÎ½Ï„Î¿Ï€Î¯ÏƒÏ„Î·ÎºÎµ Î±Ï€Î¿Î¸Î®ÎºÎµÏ…ÏƒÎ· USB. Î£Ï…Î½Î´Î­ÏƒÏ„Îµ Ï€ÏÏÏ„Î± Î¼Î¹Î± ÏƒÏ…ÏƒÎºÎµÏ…Î® Î±Ï€Î¿Î¸Î®ÎºÎµÏ…ÏƒÎ·Ï‚ USB.',
	'errorNoM3uUrl': 'Î•Î¹ÏƒÎ±Î³Î¬Î³ÎµÏ„Îµ Î¼Î¹Î± Î­Î³ÎºÏ…ÏÎ· Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· URL ÏƒÏ„Î· Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ m3u(8).',
	'channelLoadError': 'Î‘Ï…Ï„ÏŒ Ï„Î¿ ÎºÎ±Î½Î¬Î»Î¹ Î´ÎµÎ½ ÎµÎ¯Î½Î±Î¹ Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î¿ Î±Ï…Ï„Î®Î½ Ï„Î· ÏƒÏ„Î¹Î³Î¼Î®. Î Î±ÏÎ±ÎºÎ±Î»Ï Î´Î¿ÎºÎ¹Î¼Î¬ÏƒÏ„Îµ Î¾Î±Î½Î¬ Î±ÏÎ³ÏŒÏ„ÎµÏÎ±.',
	'channelLoadConnectionFailed': '(Î— ÏƒÏÎ½Î´ÎµÏƒÎ· Î¼Îµ Ï„Î· ÏÎ¿Î® Î±Ï€Î­Ï„Ï…Ï‡Îµ.)',
	'channelNotSupportedFile': 'Î‘Ï…Ï„ÏŒ Ï„Î¿ ÎºÎ±Î½Î¬Î»Î¹ Î´ÎµÎ½ Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Ï†Î¿ÏÏ„Ï‰Î¸ÎµÎ¯ Î»ÏŒÎ³Ï‰ Î¼Î· ÏƒÏ…Î¼Î²Î±Ï„Î®Ï‚ Î¼Î¿ÏÏ†Î®Ï‚.',
	'errorNoFavouritesYet': 'Î”ÎµÎ½ Î­Ï‡ÎµÏ„Îµ Î±ÎºÏŒÎ¼Î± Î±Î³Î±Ï€Î·Î¼Î­Î½Î± ÎºÎ±Î½Î¬Î»Î¹Î±. Î Î±Ï„Î®ÏƒÏ„Îµ Ï„Î¿ ÎšÎ™Î¤Î¡Î™ÎÎŸ ÎºÎ¿Ï…Î¼Ï€Î¯ Î³Î¹Î± Î½Î± Î±Î³Î±Ï€Î®ÏƒÎµÏ„Îµ Î­Î½Î± ÎºÎ±Î½Î¬Î»Î¹.',
	'errorNoPlaylistHistory': 'Î”ÎµÎ½ Ï…Ï€Î¬ÏÏ‡ÎµÎ¹ Î±ÎºÏŒÎ¼Î± Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ ÏƒÏ„Î¿ Î¹ÏƒÏ„Î¿ÏÎ¹ÎºÏŒ. Î•Î¹ÏƒÎ±Î³Î¬Î³ÎµÏ„Îµ Î¼Î¹Î± Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· URL ÏƒÏ„Î¿ Ï€Î±ÏÎ±ÎºÎ¬Ï„Ï‰ Ï€ÎµÎ´Î¯Î¿.',

	// Menu
	'searchPlaceholder': 'Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ·',
	'allChannels': 'ÎŒÎ»Î± Ï„Î± ÎºÎ±Î½Î¬Î»Î¹Î±',
	'favourites': 'â­ Î‘Î³Î±Ï€Î·Î¼Î­Î½Î±',
	'groups': 'ÎŸÎ¼Î¬Î´ÎµÏ‚',
	'channels': 'ÎšÎ±Î½Î¬Î»Î¹Î±',
	'settings_menu': 'Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚',
	'epg_menu': 'EPG',
	'guide_menu': 'ÎŸÎ´Î·Î³ÏŒÏ‚',

	'guideControlsHeadline': 'ÎˆÎ»ÎµÎ³Ï‡Î¿Î¹',

	// Advanced Settings
	'tabGeneralSettings': 'Î“ÎµÎ½Î¹ÎºÎ­Ï‚ Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚',
	'tabAdvancedSettings': 'Î ÏÎ¿Î·Î³Î¼Î­Î½ÎµÏ‚ Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚',
	'chooseMousewheel': 'Î¤ÏÎ¿Ï‡ÏŒÏ‚ Ï€Î¿Î½Ï„Î¹ÎºÎ¹Î¿Ï',
	'volumeSetting': 'Î‘ÏÎ¾Î·ÏƒÎ·/ÎœÎµÎ¯Ï‰ÏƒÎ· Î­Î½Ï„Î±ÏƒÎ·Ï‚',
	'channelSetting': 'ÎšÎ±Î½Î¬Î»Î¹ Ï€ÏÎ¿Ï‚ Ï„Î± ÎµÎ¼Ï€ÏÏŒÏ‚/Ï€Î¯ÏƒÏ‰',
	'reloadPlaylistOnStart': 'Î›Î®ÏˆÎ· Î»Î¯ÏƒÏ„Î±Ï‚ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ ÏƒÎµ ÎºÎ¬Î¸Îµ Î­Î½Î±ÏÎ¾Î·',
	'bufferSetting': 'Buffer',

	// Channel Settings
	'loading': 'Ï†ÏŒÏÏ„Ï‰ÏƒÎ·...',
	'audioTrack': 'Î—Ï‡Î·Ï„Î¹ÎºÏŒ ÎºÎ¿Î¼Î¼Î¬Ï„Î¹',
	'subtitleTrack': 'ÎšÎ¿Î¼Î¼Î¬Ï„Î¹ Ï…Ï€ÏŒÏ„Î¹Ï„Î»Ï‰Î½',
	'channelSettings': 'Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚ ÎºÎ±Î½Î±Î»Î¹Î¿Ï',
	'channelSettingSubtitle': 'Ï…Ï€ÏŒÏ„Î¹Ï„Î»Î¿Ï‚ / Î®Ï‡Î¿Ï‚',
	'channelSettingAudio': 'Î®Ï‡Î¿Ï‚',
	'channelSettingVideo': 'Î²Î¯Î½Ï„ÎµÎ¿ / Î¼Î¿ÏÏ†Î®',
	'channelSettingFavs': 'Ï€ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÎºÎ±Î½Î±Î»Î¹Î¿Ï ÏƒÏ„Î± Î±Î³Î±Ï€Î·Î¼Î­Î½Î±',
	'channelSettingPlayback': 'ÎµÎ¼Ï†Î¬Î½Î¹ÏƒÎ· ÎµÎ»Î­Î³Ï‡Ï‰Î½ Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚',
	'channelSettingAudioDefault': 'Ï€ÏÎ¿ÎµÏ€Î¹Î»ÎµÎ³Î¼Î­Î½Î¿ ÎºÎ¿Î¼Î¼Î¬Ï„Î¹',
	'channelSettingSubNoTrack': 'Î´ÎµÎ½ ÎµÎ¯Î½Î±Î¹ Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î¿',
	'channelSettingSubOff': 'Î±Ï€ÎµÎ½ÎµÏÎ³Î¿Ï€Î¿Î¯Î·ÏƒÎ·',
	'channelSettingResolution': 'Î±Î½Î¬Î»Ï…ÏƒÎ·',
	'channelSettingFormat': 'ÎœÎ¿ÏÏ†Î® Î²Î¯Î½Ï„ÎµÎ¿',
	'channelSettingFormatOriginal': 'Ï€ÏÏ‰Ï„ÏŒÏ„Ï…Ï€Î¿',
	'channelSettingFormatFill': 'Î³Î­Î¼Î¹ÏƒÎ¼Î± / Ï„Î­Î½Ï„Ï‰Î¼Î±',
	'channelSettingFormatZoom': 'Î¶Î¿Ï…Î¼',

	// EPG
	'epgSource': 'Î Î·Î³Î® EPG',
	'epgSourceFromPlaylist': 'EPG URL Î±Ï€ÏŒ Ï„Î· Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚',
	'usePlaylistEpgUrl': 'Î§ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î®ÏƒÏ„Îµ Ï„Î·Î½ Ï€Î·Î³Î® EPG Î±Ï€ÏŒ Ï„Î· Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ ÏƒÎ±Ï‚;',
	'epgTimeShift': 'EPG Timeshift',
	'epgGrabInterval': 'Î”Î¹Î¬ÏƒÏ„Î·Î¼Î± Î±ÏÏ€Î±Î³Î®Ï‚ EPG',
	'downloadEpgButton': 'ÎºÎ±Ï„ÎµÎ²Î¬ÏƒÏ„Îµ Ï„Î¿ EPG Ï„ÏÏÎ±',
	'noEpgForChannel': 'Î”ÎµÎ½ Ï…Ï€Î¬ÏÏ‡ÎµÎ¹ EPG Î³Î¹Î± Î±Ï…Ï„ÏŒ Ï„Î¿ ÎºÎ±Î½Î¬Î»Î¹',
	'noEpgUrlGiven': 'Î”ÎµÎ½ Î­Ï‡ÎµÎ¹ Î¿ÏÎ¹ÏƒÏ„ÎµÎ¯ Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· URL EPG',
	'noEpgUrlInPlaylist': 'ÎœÎ· Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î¿ ÏƒÏ„Î· Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚',
	'epgQuotaExceededError': 'Î”ÎµÎ½ Ï…Ï€Î¬ÏÏ‡ÎµÎ¹ Î±ÏÎºÎµÏ„ÏŒÏ‚ ÎµÎ»ÎµÏÎ¸ÎµÏÎ¿Ï‚ Ï‡ÏÏÎ¿Ï‚ Î³Î¹Î± Ï„Î·Î½ Î±Ï€Î¿Î¸Î®ÎºÎµÏ…ÏƒÎ· Î´ÎµÎ´Î¿Î¼Î­Î½Ï‰Î½ EPG. Î•Î»ÎµÏ…Î¸ÎµÏÏÏƒÏ„Îµ Î»Î¯Î³Î¿ Ï‡ÏÏÎ¿. Î“Î¹Î± Ï€Î±ÏÎ¬Î´ÎµÎ¹Î³Î¼Î±, Î´Î¹Î±Î³ÏÎ¬Ï†Î¿Î½Ï„Î±Ï‚ Î¼Î· Ï‡ÏÎ·ÏƒÎ¹Î¼Î¿Ï€Î¿Î¹Î·Î¼Î­Î½ÎµÏ‚ ÎµÏ†Î±ÏÎ¼Î¿Î³Î­Ï‚.',
	'epgNotCompatibleWithPlaylist': 'Î— Î»Î¯ÏƒÏ„Î± Î±Î½Î±Ï€Î±ÏÎ±Î³Ï‰Î³Î®Ï‚ ÏƒÎ±Ï‚ Î´ÎµÎ½ ÎµÎ¯Î½Î±Î¹ ÏƒÏ…Î¼Î²Î±Ï„Î® Î¼Îµ Î±Ï…Ï„Î®Î½ Ï„Î· Î´Î¹ÎµÏÎ¸Ï…Î½ÏƒÎ· EGP-URL.',
	'epgIsDownloading': 'Î¦ÏŒÏÏ„Ï‰ÏƒÎ· EPG ...',
	'epgChannelsProcessed': 'ÎºÎ±Î½Î¬Î»Î¹Î±: ',
	'epgProgramsProcessed': 'Ï€ÏÎ¿Î³ÏÎ¬Î¼Î¼Î±Ï„Î±: ',
	'epgNow': 'Î¤ÏÏÎ±',
	'epgAfter': 'ÎšÎ±Ï„ÏŒÏ€Î¹Î½ Î±Ï…Ï„Î¿Ï',

},
'ko': {
	'yes': 'ì˜ˆ', 'no': 'ì•„ë‹ˆìš”',

	'm3uSource': 'm3u(8) íŒŒì¼ì˜ URL',
	'chooseLang': 'ì–¸ì–´',
	'usbLoadLabel': 'USBì—ì„œ í”Œë ˆì´ë¦¬ìŠ¤íŠ¸',
	'openUsbButton': 'USB ì°¾ì•„ë³´ê¸°',
	'localLoadLabel': 'ë¡œì»¬ m3u(8) íŒŒì¼',
	'openExplorerButton': 'íƒìƒ‰ê¸° ì—´ê¸°',
	'openHistoryButton': 'íˆìŠ¤í† ë¦¬',
	'downloadButton': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ ë¡œë“œ',
	'saveButton': 'ì €ì¥í•˜ê³  ì¬ìƒ',
	'deleteButton': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ ì‚­ì œ',
	'generalSettingsButton': 'ì¼ë°˜ ì„¤ì •',
	'advancedSettingsButton': 'ê³ ê¸‰ ì„¤ì •',

	'closeAppHint': 'ì´ ì•±ì„ ë‹«ìœ¼ì‹œê² ìŠµë‹ˆê¹Œ?',
	'hideModalHint': 'ì´ ë©”ì‹œì§€ë¥¼ ë‹«ìœ¼ë ¤ë©´ ì•„ë¬´ ë²„íŠ¼ì´ë‚˜ ëˆ„ë¥´ì„¸ìš”.',
	'playlistDownloaded': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ê°€ ì„±ê³µì ìœ¼ë¡œ ë‹¤ìš´ë¡œë“œë˜ì—ˆìŠµë‹ˆë‹¤.<br>%i ì±„ë„ ë¡œë“œë¨.',
	'channelsLoaded': 'ì±„ë„',
	'filterNoResults': 'ì§€ì •ëœ í•„í„°ì— ëŒ€í•œ ì±„ë„ì´ ì—†ìŠµë‹ˆë‹¤.',

	'redButtonHint': '<span class="red-button">A</span> ê²€ìƒ‰',
	'helpHint': 'ë°ëª¨ ì±„ë„ ëª©ë¡ì„ ì‚½ì…í•˜ë ¤ë©´ ì–¸ì œë“ ì§€ <span class="red-button">A</span> ë²„íŠ¼ì„ ëˆ„ë¥´ì„¸ìš”.<br><br>ì‚¬ìš©ì ê°€ì´ë“œë¥¼ ë³´ë ¤ë©´ ì–¸ì œë“ ì§€ ë¦¬ëª¨ì»¨ì˜ INFO ë²„íŠ¼ì„ ëˆ„ë¥´ì„¸ìš”.',

	'supportContact': 'ë” ë§ì€ ì •ë³´ë¥¼ ì›í•˜ì‹œë©´ https://m3u-ip.tv/ko ë¥¼ ë°©ë¬¸í•˜ì„¸ìš”',
	'supportContactLinked': 'ë” ë§ì€ ì •ë³´ë¥¼ ì›í•˜ì‹œë©´ <a href="https://m3u-ip.tv/ko/" target="_blank">https://m3u-ip.tv/ko</a>ë¥¼ ë°©ë¬¸í•˜ì„¸ìš”',
	'donate': 'ì´ ì•±ì„ ì¢‹ì•„í•˜ì‹ ë‹¤ë©´ ì‘ì€ ê¸°ë¶€ë¡œ ì €ë¥¼ ì§€ì›í•´ì£¼ì„¸ìš”.<br><b class="NOBR">https://m3u-ip.tv</b> ë˜ëŠ” QR ì½”ë“œë¥¼ í†µí•´ ê¸°ë¶€í•˜ì„¸ìš”.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (ì‹ ìš© ì¹´ë“œ)',
	'downloadM3uStatus': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ ë¡œë”© ì¤‘. ì ì‹œ ê¸°ë‹¤ë ¤ì£¼ì„¸ìš”.',
	'usbMountedStatus': 'USB ë§ˆìš´íŠ¸ë¨',

	'connectionLost': 'ë„¤íŠ¸ì›Œí¬ ì—°ê²°ì´ ëŠê²¼ìŠµë‹ˆë‹¤. ë„¤íŠ¸ì›Œí¬ë¥¼ í™•ì¸í•´ì£¼ì„¸ìš”.',
	'checkM3uError': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ë¥¼ ë¡œë“œí•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤. HTTP ìƒíƒœ ì½”ë“œ: ',
	'checkM3uFileError': 'ìœ íš¨í•œ m3u(8) í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ê°€ ì•„ë‹™ë‹ˆë‹¤. íŒŒì¼ì„ í™•ì¸í•´ì£¼ì„¸ìš”.',
	'checkM3uDownloadError': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ë¥¼ ë¡œë“œí•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤. URLì„ í™•ì¸í•´ì£¼ì„¸ìš”.',
	'checkM3uDownloadSizeError': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ì— ë„ˆë¬´ ë§ì€ ì±„ë„ì´ í¬í•¨ë˜ì–´ ìˆìŠµë‹ˆë‹¤. ìµœëŒ€ 20,000 ì±„ë„ë¡œ ì¤„ì—¬ì£¼ì„¸ìš”.',
	'checkM3uTimeoutError': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ ë¡œë”© ì¤‘ì— ì‹œê°„ ì´ˆê³¼ê°€ ë°œìƒí–ˆìŠµë‹ˆë‹¤. ë‹¤ì‹œ ì‹œë„í•´ì£¼ì„¸ìš”.',
	'errorNoUsbMounted': 'ì—°ê²°ëœ USB ì €ì¥ì†Œê°€ ì—†ìŠµë‹ˆë‹¤. ë¨¼ì € USB ì €ì¥ ì¥ì¹˜ë¥¼ ì—°ê²°í•˜ì„¸ìš”.',
	'errorNoM3uUrl': 'ìœ íš¨í•œ m3u(8) í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ URLì„ ì…ë ¥í•˜ì„¸ìš”.',
	'channelLoadError': 'í˜„ì¬ ì´ ì±„ë„ì„ ë¡œë“œí•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤. ë‚˜ì¤‘ì— ë‹¤ì‹œ ì‹œë„í•˜ì„¸ìš”.',
	'channelLoadConnectionFailed': '(ìŠ¤íŠ¸ë¦¼ì— ì—°ê²°í•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤.)',
	'channelNotSupportedFile': 'ì´ ì±„ë„ì€ í˜¸í™˜ë˜ì§€ ì•ŠëŠ” í˜•ì‹ìœ¼ë¡œ ì¸í•´ ë¡œë“œí•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤.',
	'errorNoFavouritesYet': 'ì•„ì§ ì¦ê²¨ì°¾ê¸°í•œ ì±„ë„ì´ ì—†ìŠµë‹ˆë‹¤. ë…¸ë€ ë²„íŠ¼ì„ ëˆŒëŸ¬ ì±„ë„ì„ ì¦ê²¨ì°¾ê¸°ì— ì¶”ê°€í•˜ì„¸ìš”.',
	'errorNoPlaylistHistory': 'ì•„ì§ íˆìŠ¤í† ë¦¬ì— í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ê°€ ì—†ìŠµë‹ˆë‹¤. ì•„ë˜ í•„ë“œì— URLì„ ì…ë ¥í•˜ì„¸ìš”.',

	// Menu
	'searchPlaceholder': 'ê²€ìƒ‰',
	'allChannels': 'ëª¨ë“  ì±„ë„',
	'favourites': 'â­ ì¦ê²¨ì°¾ê¸°',
	'groups': 'ê·¸ë£¹',
	'channels': 'ì±„ë„',
	'settings_menu': 'ì„¤ì •',
	'epg_menu': 'EPG',
	'guide_menu': 'ê°€ì´ë“œ',

	'guideControlsHeadline': 'ì»¨íŠ¸ë¡¤',

	// Advanced Settings
	'tabGeneralSettings': 'ì¼ë°˜ ì„¤ì •',
	'tabAdvancedSettings': 'ê³ ê¸‰ ì„¤ì •',
	'chooseMousewheel': 'ë§ˆìš°ìŠ¤ íœ ',
	'volumeSetting': 'ìŒëŸ‰ ì¡°ì ˆ',
	'channelSetting': 'ì±„ë„ ì´ë™',
	'reloadPlaylistOnStart': 'ì‹œì‘ ì‹œë§ˆë‹¤ í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ ë‹¤ìš´ë¡œë“œ',
	'bufferSetting': 'ë²„í¼',
	'customUserAgentSetting': 'ì‚¬ìš©ì ì—ì´ì „íŠ¸',

	// Channel Settings
	'loading': 'ë¡œë”© ì¤‘...',
	'audioTrack': 'ì˜¤ë””ì˜¤ íŠ¸ë™',
	'subtitleTrack': 'ìë§‰ íŠ¸ë™',
	'channelSettings': 'ì±„ë„ ì„¤ì •',
	'channelSettingSubtitle': 'ìë§‰ / ì˜¤ë””ì˜¤',
	'channelSettingAudio': 'ì˜¤ë””ì˜¤',
	'channelSettingVideo': 'ë¹„ë””ì˜¤ / í˜•ì‹',
	'channelSettingFavs': 'ì±„ë„ì„ ì¦ê²¨ì°¾ê¸°ì— ì¶”ê°€',
	'channelSettingPlayback': 'ì¬ìƒ ì œì–´ í‘œì‹œ',
	'channelSettingAudioDefault': 'ê¸°ë³¸ íŠ¸ë™',
	'channelSettingSubNoTrack': 'ì‚¬ìš© ë¶ˆê°€',
	'channelSettingSubOff': 'ë¹„í™œì„±í™”',
	'channelSettingResolution': 'í•´ìƒë„',
	'channelSettingFormat': 'ë¹„ë””ì˜¤ í˜•ì‹',
	'channelSettingFormatOriginal': 'ì›ë³¸',
	'channelSettingFormatFill': 'ì±„ìš°ê¸° / ëŠ˜ì´ê¸°',
	'channelSettingFormatZoom': 'ì¤Œ',

	// EPG
	'epgSource': 'EPG ì†ŒìŠ¤',
	'epgSourceFromPlaylist': 'ì¬ìƒ ëª©ë¡ì˜ EPG URL',
	'usePlaylistEpgUrl': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ì˜ EPG ì†ŒìŠ¤ ì‚¬ìš©',
	'epgTimeShift': 'EPG íƒ€ì„ ì‹œí”„íŠ¸',
	'epgGrabInterval': 'EPG ìˆ˜ì§‘ ê°„ê²©',
	'downloadEpgButton': 'ì§€ê¸ˆ EPG ë‹¤ìš´ë¡œë“œ',
	'noEpgForChannel': 'ì´ ì±„ë„ì— ëŒ€í•œ EPG ì—†ìŒ',
	'noEpgUrlGiven': 'ì„¤ì •ëœ EPG URL ì—†ìŒ',
	'noEpgUrlInPlaylist': 'ì¬ìƒ ëª©ë¡ì—ì„œ ì‚¬ìš©í•  ìˆ˜ ì—†ìŒ',
	'epgQuotaExceededError': 'EPG ë°ì´í„°ë¥¼ ì €ì¥í•  ì¶©ë¶„í•œ ê³µê°„ì´ ì—†ìŠµë‹ˆë‹¤. ëª‡ëª‡ ê³µê°„ì„ í™•ë³´í•˜ì„¸ìš”. ì˜ˆë¥¼ ë“¤ì–´ ì‚¬ìš©í•˜ì§€ ì•ŠëŠ” ì•±ì„ ì‚­ì œí•˜ì—¬ ê³µê°„ì„ í™•ë³´í•˜ì„¸ìš”.',
	'epgNotCompatibleWithPlaylist': 'í”Œë ˆì´ë¦¬ìŠ¤íŠ¸ê°€ ì´ EPG URLê³¼ í˜¸í™˜ë˜ì§€ ì•ŠìŠµë‹ˆë‹¤.',
	'epgIsDownloading': 'EPG ë¡œë”© ì¤‘...',
	'epgChannelsProcessed': 'ì±„ë„: ',
	'epgProgramsProcessed': 'í”„ë¡œê·¸ë¨: ',
	'epgNow': 'í˜„ì¬',
	'epgAfter': 'ì´í›„',
},
'vi': {
	'yes': 'cÃ³', 'no': 'khÃ´ng',

	'm3uSource': 'URL Ä‘áº¿n tá»‡p m3u(8)',
	'chooseLang': 'NgÃ´n ngá»¯',
	'usbLoadLabel': 'Danh sÃ¡ch tá»« USB',
	'openUsbButton': 'Duyá»‡t USB',
	'localLoadLabel': 'Tá»‡p m3u(8) Ä‘á»‹a phÆ°Æ¡ng',
	'openExplorerButton': 'Má»Ÿ trÃ¬nh duyá»‡t',
	'openHistoryButton': 'Lá»‹ch sá»­',
	'downloadButton': 'Táº£i danh sÃ¡ch',
	'saveButton': 'LÆ°u vÃ  phÃ¡t',
	'deleteButton': 'XÃ³a danh sÃ¡ch',
	'generalSettingsButton': 'CÃ i Ä‘áº·t chung',
	'advancedSettingsButton': 'CÃ i Ä‘áº·t nÃ¢ng cao',

	'closeAppHint': 'Báº¡n cÃ³ muá»‘n Ä‘Ã³ng á»©ng dá»¥ng nÃ y khÃ´ng?',
	'hideModalHint': 'Nháº¥n báº¥t ká»³ nÃºt nÃ o Ä‘á»ƒ Ä‘Ã³ng thÃ´ng bÃ¡o nÃ y.',
	'playlistDownloaded': 'Danh sÃ¡ch táº£i vá» thÃ nh cÃ´ng.<br>%i kÃªnh Ä‘Ã£ Ä‘Æ°á»£c táº£i.',
	'channelsLoaded': 'kÃªnh',
	'filterNoResults': 'KhÃ´ng tÃ¬m tháº¥y kÃªnh cho bá»™ lá»c Ä‘Ã£ cho.',

	'redButtonHint': '<span class="red-button">A</span> TÃ¬m kiáº¿m',
	'helpHint': 'Nháº¥n nÃºt <span class="red-button">A</span> Ä‘á»ƒ chÃ¨n danh sÃ¡ch kÃªnh máº«u.<br><br>Nháº¥n INFO trÃªn Ä‘iá»u khiá»ƒn tá»« xa báº¥t cá»© lÃºc nÃ o Ä‘á»ƒ xem hÆ°á»›ng dáº«n ngÆ°á»i dÃ¹ng.',

	'supportContact': 'Äá»ƒ biáº¿t thÃªm thÃ´ng tin, truy cáº­p https://m3u-ip.tv/vi',
	'supportContactLinked': 'Äá»ƒ biáº¿t thÃªm thÃ´ng tin, truy cáº­p <a href="https://m3u-ip.tv/vi/" target="_blank">https://m3u-ip.tv/vi</a>',
	'donate': 'Náº¿u báº¡n thÃ­ch á»©ng dá»¥ng nÃ y, hÃ£y á»§ng há»™ tÃ´i vá»›i má»™t khoáº£n quyÃªn gÃ³p nhá».<br>Truy cáº­p <b class="NOBR">https://m3u-ip.tv</b><br>hoáº·c qua mÃ£ QR.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (tháº» tÃ­n dá»¥ng)',
	'downloadM3uStatus': 'Äang táº£i danh sÃ¡ch. Vui lÃ²ng Ä‘á»£i má»™t lÃ¡t.',
	'usbMountedStatus': 'USB Ä‘Ã£ Ä‘Æ°á»£c gáº¯n',

	'connectionLost': 'Máº¥t káº¿t ná»‘i máº¡ng. Vui lÃ²ng kiá»ƒm tra máº¡ng cá»§a báº¡n.',
	'checkM3uError': 'KhÃ´ng thá»ƒ táº£i danh sÃ¡ch. MÃ£ tráº¡ng thÃ¡i HTTP: ',
	'checkM3uFileError': 'KhÃ´ng pháº£i lÃ  danh sÃ¡ch m3u(8) há»£p lá»‡. Vui lÃ²ng kiá»ƒm tra tá»‡p.',
	'checkM3uDownloadError': 'KhÃ´ng thá»ƒ táº£i danh sÃ¡ch. Vui lÃ²ng kiá»ƒm tra URL.',
	'checkM3uDownloadSizeError': 'Danh sÃ¡ch chá»©a quÃ¡ nhiá»u kÃªnh. Vui lÃ²ng giáº£m sá»‘ lÆ°á»£ng xuá»‘ng tá»‘i Ä‘a 20.000 kÃªnh.',
	'checkM3uTimeoutError': 'Háº¿t thá»i gian khi táº£i danh sÃ¡ch. Vui lÃ²ng thá»­ láº¡i.',
	'errorNoUsbMounted': 'KhÃ´ng cÃ³ thiáº¿t bá»‹ lÆ°u trá»¯ USB nÃ o Ä‘Æ°á»£c phÃ¡t hiá»‡n. Vui lÃ²ng káº¿t ná»‘i thiáº¿t bá»‹ lÆ°u trá»¯ USB trÆ°á»›c.',
	'errorNoM3uUrl': 'Vui lÃ²ng nháº­p URL há»£p lá»‡ cho danh sÃ¡ch m3u(8) cá»§a báº¡n.',
	'channelLoadError': 'KÃªnh nÃ y khÃ´ng kháº£ dá»¥ng vÃ o lÃºc nÃ y. Vui lÃ²ng thá»­ láº¡i sau.',
	'channelLoadConnectionFailed': '(Káº¿t ná»‘i tá»›i luá»“ng tháº¥t báº¡i.)',
	'channelNotSupportedFile': 'KhÃ´ng thá»ƒ táº£i kÃªnh nÃ y do Ä‘á»‹nh dáº¡ng khÃ´ng tÆ°Æ¡ng thÃ­ch.',
	'errorNoFavouritesYet': 'Báº¡n chÆ°a cÃ³ báº¥t ká»³ kÃªnh yÃªu thÃ­ch nÃ o. Nháº¥n nÃºt VÃ€NG Ä‘á»ƒ thÃªm má»™t kÃªnh vÃ o danh sÃ¡ch yÃªu thÃ­ch.',
	'errorNoPlaylistHistory': 'KhÃ´ng cÃ³ danh sÃ¡ch phÃ¡t trong lá»‹ch sá»­. Vui lÃ²ng nháº­p URL vÃ o Ã´ bÃªn dÆ°á»›i.',

	// Menu
	'searchPlaceholder': 'TÃ¬m kiáº¿m',
	'allChannels': 'Táº¥t cáº£ kÃªnh',
	'favourites': 'â­ YÃªu thÃ­ch',
	'groups': 'NhÃ³m',
	'channels': 'KÃªnh',
	'settings_menu': 'CÃ i Ä‘áº·t',
	'epg_menu': 'EPG',
	'guide_menu': 'HÆ°á»›ng dáº«n',

	'guideControlsHeadline': 'Äiá»u khiá»ƒn',

	// Advanced Settings
	'tabGeneralSettings': 'CÃ i Ä‘áº·t chung',
	'tabAdvancedSettings': 'CÃ i Ä‘áº·t nÃ¢ng cao',
	'chooseMousewheel': 'BÃ¡nh xe chuá»™t',
	'volumeSetting': 'TÄƒng/giáº£m Ã¢m lÆ°á»£ng',
	'channelSetting': 'Chuyá»ƒn kÃªnh',
	'reloadPlaylistOnStart': 'Táº£i danh sÃ¡ch má»—i khi khá»Ÿi Ä‘á»™ng',
	'bufferSetting': 'Bá»™ Ä‘á»‡m',
	'customUserAgentSetting': 'User Agent',

	// Channel Settings
	'loading': 'Ä‘ang táº£i...',
	'audioTrack': 'Báº£n Ã¢m thanh',
	'subtitleTrack': 'Báº£n phá»¥ Ä‘á»',
	'channelSettings': 'CÃ i Ä‘áº·t kÃªnh',
	'channelSettingSubtitle': 'phá»¥ Ä‘á» / Ã¢m thanh',
	'channelSettingAudio': 'Ã¢m thanh',
	'channelSettingVideo': 'video / Ä‘á»‹nh dáº¡ng',
	'channelSettingFavs': 'thÃªm kÃªnh vÃ o yÃªu thÃ­ch',
	'channelSettingPlayback': 'hiá»ƒn thá»‹ Ä‘iá»u khiá»ƒn phÃ¡t láº¡i',
	'channelSettingAudioDefault': 'báº£n máº·c Ä‘á»‹nh',
	'channelSettingSubNoTrack': 'khÃ´ng kháº£ dá»¥ng',
	'channelSettingSubOff': 'táº¯t',
	'channelSettingResolution': 'Ä‘á»™ phÃ¢n giáº£i',
	'channelSettingFormat': 'Äá»‹nh dáº¡ng video',
	'channelSettingFormatOriginal': 'gá»‘c',
	'channelSettingFormatFill': 'Ä‘iá»n / kÃ©o dÃ i',
	'channelSettingFormatZoom': 'thu phÃ³ng',

	// EPG
	'epgSource': 'Nguá»“n EPG',
	'epgSourceFromPlaylist': 'URL EPG tá»« danh sÃ¡ch phÃ¡t',
	'usePlaylistEpgUrl': 'Sá»­ dá»¥ng nguá»“n EPG tá»« danh sÃ¡ch cá»§a báº¡n?',
	'epgTimeShift': 'EPG Time Shift',
	'epgGrabInterval': 'Khoáº£ng thá»i gian láº¥y EPG',
	'downloadEpgButton': 'Táº£i EPG ngay bÃ¢y giá»',
	'noEpgForChannel': 'KhÃ´ng cÃ³ EPG cho kÃªnh nÃ y',
	'noEpgUrlGiven': 'ChÆ°a thiáº¿t láº­p URL EPG',
	'noEpgUrlInPlaylist': 'KhÃ´ng cÃ³ sáºµn trong danh sÃ¡ch phÃ¡t',
	'epgQuotaExceededError': 'KhÃ´ng Ä‘á»§ khÃ´ng gian trá»‘ng Ä‘á»ƒ lÆ°u dá»¯ liá»‡u EPG. Vui lÃ²ng giáº£i phÃ³ng má»™t sá»‘ khÃ´ng gian, vÃ­ dá»¥ báº±ng cÃ¡ch xÃ³a cÃ¡c á»©ng dá»¥ng khÃ´ng sá»­ dá»¥ng.',
	'epgNotCompatibleWithPlaylist': 'Danh sÃ¡ch cá»§a báº¡n khÃ´ng tÆ°Æ¡ng thÃ­ch vá»›i URL EPG nÃ y.',
	'epgIsDownloading': 'Äang táº£i EPG...',
	'epgChannelsProcessed': 'kÃªnh: ',
	'epgProgramsProcessed': 'chÆ°Æ¡ng trÃ¬nh: ',
	'epgNow': 'Hiá»‡n táº¡i',
	'epgAfter': 'Sau',
},
'uk': {
	'yes': 'Ñ‚Ğ°Ğº', 'no': 'Ğ½Ñ–',

	'm3uSource': 'URL Ğ´Ğ¾ Ñ„Ğ°Ğ¹Ğ»Ñƒ m3u(8)',
	'chooseLang': 'ĞœĞ¾Ğ²Ğ°',
	'usbLoadLabel': 'ĞŸĞ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ· USB',
	'openUsbButton': 'ĞŸĞµÑ€ĞµĞ³Ğ»ÑĞ½ÑƒÑ‚Ğ¸ USB',
	'localLoadLabel': 'Ğ›Ğ¾ĞºĞ°Ğ»ÑŒĞ½Ğ¸Ğ¹ Ñ„Ğ°Ğ¹Ğ» m3u(8)',
	'openExplorerButton': 'Ğ’Ñ–Ğ´ĞºÑ€Ğ¸Ñ‚Ğ¸ Ğ¿Ñ€Ğ¾Ğ²Ñ–Ğ´Ğ½Ğ¸Ğº',
	'openHistoryButton': 'Ğ†ÑÑ‚Ğ¾Ñ€Ñ–Ñ',
	'downloadButton': 'Ğ—Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶Ğ¸Ñ‚Ğ¸ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚',
	'saveButton': 'Ğ—Ğ±ĞµÑ€ĞµĞ³Ñ‚Ğ¸ Ñ‚Ğ° Ğ²Ñ–Ğ´Ñ‚Ğ²Ğ¾Ñ€Ğ¸Ñ‚Ğ¸',
	'deleteButton': 'Ğ’Ğ¸Ğ´Ğ°Ğ»Ğ¸Ñ‚Ğ¸ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚',
	'generalSettingsButton': 'Ğ—Ğ°Ğ³Ğ°Ğ»ÑŒĞ½Ñ– Ğ½Ğ°Ğ»Ğ°ÑˆÑ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ',
	'advancedSettingsButton': 'Ğ Ğ¾Ğ·ÑˆĞ¸Ñ€ĞµĞ½Ñ– Ğ½Ğ°Ğ»Ğ°ÑˆÑ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ',

	'closeAppHint': 'Ğ’Ğ¸ Ğ´Ñ–Ğ¹ÑĞ½Ğ¾ Ğ±Ğ°Ğ¶Ğ°Ñ”Ñ‚Ğµ Ğ·Ğ°ĞºÑ€Ğ¸Ñ‚Ğ¸ Ğ´Ğ¾Ğ´Ğ°Ñ‚Ğ¾Ğº?',
	'hideModalHint': 'ĞĞ°Ñ‚Ğ¸ÑĞ½Ñ–Ñ‚ÑŒ Ğ±ÑƒĞ´ÑŒ-ÑĞºÑƒ ĞºĞ½Ğ¾Ğ¿ĞºÑƒ Ğ´Ğ»Ñ Ğ·Ğ°ĞºÑ€Ğ¸Ñ‚Ñ‚Ñ Ñ†ÑŒĞ¾Ğ³Ğ¾ Ğ¿Ğ¾Ğ²Ñ–Ğ´Ğ¾Ğ¼Ğ»ĞµĞ½Ğ½Ñ.',
	'playlistDownloaded': 'ĞŸĞ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ ÑƒÑĞ¿Ñ–ÑˆĞ½Ğ¾ Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ¾.<br>%i ĞºĞ°Ğ½Ğ°Ğ»Ñ–Ğ² Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ¾.',
	'channelsLoaded': 'ĞºĞ°Ğ½Ğ°Ğ»Ñ–Ğ²',
	'filterNoResults': 'Ğ”Ğ»Ñ Ğ²ĞºĞ°Ğ·Ğ°Ğ½Ğ¾Ğ³Ğ¾ Ñ„Ñ–Ğ»ÑŒÑ‚Ñ€Ğ° Ğ½Ğµ Ğ·Ğ½Ğ°Ğ¹Ğ´ĞµĞ½Ğ¾ Ğ¶Ğ¾Ğ´Ğ½Ğ¾Ğ³Ğ¾ ĞºĞ°Ğ½Ğ°Ğ»Ñƒ.',

	'redButtonHint': '<span class="red-button">A</span> Ğ¿Ğ¾ÑˆÑƒĞº',
	'helpHint': 'ĞĞ°Ñ‚Ğ¸ÑĞ½Ñ–Ñ‚ÑŒ <span class="red-button">A</span>-ĞºĞ½Ğ¾Ğ¿ĞºÑƒ, Ñ‰Ğ¾Ğ± Ğ²ÑÑ‚Ğ°Ğ²Ğ¸Ñ‚Ğ¸ Ğ´ĞµĞ¼Ğ¾Ğ½ÑÑ‚Ñ€Ğ°Ñ†Ñ–Ğ¹Ğ½Ğ¸Ğ¹ ÑĞ¿Ğ¸ÑĞ¾Ğº ĞºĞ°Ğ½Ğ°Ğ»Ñ–Ğ².<br><br>ĞĞ°Ñ‚Ğ¸ÑĞºĞ°Ğ¹Ñ‚Ğµ INFO Ğ½Ğ° Ğ¿ÑƒĞ»ÑŒÑ‚Ñ– Ñƒ Ğ±ÑƒĞ´ÑŒ-ÑĞºĞ¸Ğ¹ Ğ¼Ğ¾Ğ¼ĞµĞ½Ñ‚ Ğ´Ğ»Ñ Ğ¾Ñ‚Ñ€Ğ¸Ğ¼Ğ°Ğ½Ğ½Ñ ĞºĞ¾Ñ€Ğ¸ÑÑ‚ÑƒĞ²Ğ°Ñ†ÑŒĞºĞ¾Ğ³Ğ¾ ĞºĞµÑ€Ñ–Ğ²Ğ½Ğ¸Ñ†Ñ‚Ğ²Ğ°.',

	'supportContact': 'Ğ”Ğ»Ñ Ğ¾Ñ‚Ñ€Ğ¸Ğ¼Ğ°Ğ½Ğ½Ñ Ğ´Ğ¾Ğ´Ğ°Ñ‚ĞºĞ¾Ğ²Ğ¾Ñ— Ñ–Ğ½Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ†Ñ–Ñ— Ğ²Ñ–Ğ´Ğ²Ñ–Ğ´Ğ°Ğ¹Ñ‚Ğµ https://m3u-ip.tv/uk',
	'supportContactLinked': 'Ğ”Ğ»Ñ Ğ¾Ñ‚Ñ€Ğ¸Ğ¼Ğ°Ğ½Ğ½Ñ Ğ´Ğ¾Ğ´Ğ°Ñ‚ĞºĞ¾Ğ²Ğ¾Ñ— Ñ–Ğ½Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ†Ñ–Ñ— Ğ²Ñ–Ğ´Ğ²Ñ–Ğ´Ğ°Ğ¹Ñ‚Ğµ <a href="https://m3u-ip.tv/uk/" target="_blank">https://m3u-ip.tv/uk</a>',
	'donate': 'Ğ¯ĞºÑ‰Ğ¾ Ğ²Ğ°Ğ¼ Ğ¿Ğ¾Ğ´Ğ¾Ğ±Ğ°Ñ”Ñ‚ÑŒÑÑ Ñ†ĞµĞ¹ Ğ´Ğ¾Ğ´Ğ°Ñ‚Ğ¾Ğº, Ğ±ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ¿Ñ–Ğ´Ñ‚Ñ€Ğ¸Ğ¼Ğ°Ğ¹Ñ‚Ğµ Ğ¼ĞµĞ½Ğµ Ğ¼Ğ°Ğ»ĞµĞ½ÑŒĞºĞ¸Ğ¼ Ğ¿Ğ¾Ğ¶ĞµÑ€Ñ‚Ğ²ÑƒĞ²Ğ°Ğ½Ğ½ÑĞ¼.<br>Ğ’Ñ–Ğ´Ğ²Ñ–Ğ´Ğ°Ğ¹Ñ‚Ğµ <b class="NOBR">https://m3u-ip.tv</b><br>Ğ°Ğ±Ğ¾ ÑĞºĞ¾Ñ€Ğ¸ÑÑ‚Ğ°Ğ¹Ñ‚ĞµÑÑ QR-ĞºĞ¾Ğ´Ğ¾Ğ¼.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (ĞºÑ€ĞµĞ´Ğ¸Ñ‚Ğ½Ğ° ĞºĞ°Ñ€Ñ‚Ğ°)',
	'downloadM3uStatus': 'Ğ—Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ½Ñ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ°. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ·Ğ°Ñ‡ĞµĞºĞ°Ğ¹Ñ‚Ğµ.',
	'usbMountedStatus': 'USB Ğ¿Ñ–Ğ´ĞºĞ»ÑÑ‡ĞµĞ½Ğ¾',

	'connectionLost': 'Ğ’Ñ‚Ñ€Ğ°Ñ‚Ğ° Ğ¼ĞµÑ€ĞµĞ¶ĞµĞ²Ğ¾Ğ³Ğ¾ Ğ·\'Ñ”Ğ´Ğ½Ğ°Ğ½Ğ½Ñ. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ¿ĞµÑ€ĞµĞ²Ñ–Ñ€Ñ‚Ğµ ÑĞ²Ğ¾Ñ Ğ¼ĞµÑ€ĞµĞ¶Ñƒ.',
	'checkM3uError': 'ĞĞµ Ğ²Ğ´Ğ°Ğ»Ğ¾ÑÑ Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶Ğ¸Ñ‚Ğ¸ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚. HTTP ÑÑ‚Ğ°Ñ‚ÑƒÑ-ĞºĞ¾Ğ´: ',
	'checkM3uFileError': 'ĞĞµĞ¿Ñ€Ğ°Ğ²Ğ¸Ğ»ÑŒĞ½Ğ¸Ğ¹ Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ‚ Ñ„Ğ°Ğ¹Ğ»Ñƒ m3u(8). Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ¿ĞµÑ€ĞµĞ²Ñ–Ñ€Ñ‚Ğµ Ñ„Ğ°Ğ¹Ğ».',
	'checkM3uDownloadError': 'ĞĞµ Ğ²Ğ´Ğ°Ğ»Ğ¾ÑÑ Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶Ğ¸Ñ‚Ğ¸ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ¿ĞµÑ€ĞµĞ²Ñ–Ñ€Ñ‚Ğµ URL.',
	'checkM3uDownloadSizeError': 'ĞŸĞ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ¼Ñ–ÑÑ‚Ğ¸Ñ‚ÑŒ Ğ·Ğ°Ğ±Ğ°Ğ³Ğ°Ñ‚Ğ¾ ĞºĞ°Ğ½Ğ°Ğ»Ñ–Ğ². Ğ—Ğ¼ĞµĞ½ÑˆÑ‚Ğµ Ñ—Ñ… Ğ´Ğ¾ Ğ¼Ğ°ĞºÑĞ¸Ğ¼ÑƒĞ¼Ñƒ - 20 000 ĞºĞ°Ğ½Ğ°Ğ»Ñ–Ğ².',
	'checkM3uTimeoutError': 'Ğ§Ğ°Ñ Ğ¾Ñ‡Ñ–ĞºÑƒĞ²Ğ°Ğ½Ğ½Ñ Ğ²Ğ¸Ğ¹ÑˆĞ¾Ğ² Ğ¿Ñ–Ğ´ Ñ‡Ğ°Ñ Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ½Ñ Ğ²Ğ°ÑˆĞ¾Ğ³Ğ¾ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ°. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, ÑĞ¿Ñ€Ğ¾Ğ±ÑƒĞ¹Ñ‚Ğµ Ñ‰Ğµ Ñ€Ğ°Ğ·.',
	'errorNoUsbMounted': 'ĞĞµ Ğ²Ğ¸ÑĞ²Ğ»ĞµĞ½Ğ¾ USB-ÑÑ…Ğ¾Ğ²Ğ¸Ñ‰Ğµ. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ¿Ñ–Ğ´ĞºĞ»ÑÑ‡Ñ–Ñ‚ÑŒ Ğ¿Ñ€Ğ¸ÑÑ‚Ñ€Ñ–Ğ¹ Ğ·Ğ±ĞµÑ€Ñ–Ğ³Ğ°Ğ½Ğ½Ñ USB ÑĞ¿Ğ¾Ñ‡Ğ°Ñ‚ĞºÑƒ.',
	'errorNoM3uUrl': 'Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ²Ğ²ĞµĞ´Ñ–Ñ‚ÑŒ Ğ´Ñ–Ğ¹ÑĞ½Ğ¸Ğ¹ URL Ğ´Ğ¾ Ğ²Ğ°ÑˆĞ¾Ğ³Ğ¾ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ° m3u(8).',
	'channelLoadError': 'Ğ¦ĞµĞ¹ ĞºĞ°Ğ½Ğ°Ğ» Ğ½Ğ° Ğ´Ğ°Ğ½Ğ¸Ğ¹ Ğ¼Ğ¾Ğ¼ĞµĞ½Ñ‚ Ğ½ĞµĞ´Ğ¾ÑÑ‚ÑƒĞ¿Ğ½Ğ¸Ğ¹. Ğ¡Ğ¿Ñ€Ğ¾Ğ±ÑƒĞ¹Ñ‚Ğµ Ñ‰Ğµ Ñ€Ğ°Ğ· Ğ¿Ñ–Ğ·Ğ½Ñ–ÑˆĞµ.',
	'channelLoadConnectionFailed': '(Ğ—\'Ñ”Ğ´Ğ½Ğ°Ğ½Ğ½Ñ Ğ· Ğ¿Ğ¾Ñ‚Ğ¾ĞºĞ¾Ğ¼ Ğ²Ñ‚Ñ€Ğ°Ñ‡ĞµĞ½Ğ¾.)',
	'channelNotSupportedFile': 'Ğ¦ĞµĞ¹ ĞºĞ°Ğ½Ğ°Ğ» Ğ½Ğµ Ğ¼Ğ¾Ğ¶Ğµ Ğ±ÑƒÑ‚Ğ¸ Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ¸Ğ¹ Ñ‡ĞµÑ€ĞµĞ· Ğ½ĞµÑÑƒĞ¼Ñ–ÑĞ½Ğ¸Ğ¹ Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ‚.',
	'errorNoFavouritesYet': 'Ğ£ Ğ²Ğ°Ñ Ñ‰Ğµ Ğ½ĞµĞ¼Ğ°Ñ” ÑƒĞ»ÑĞ±Ğ»ĞµĞ½Ğ¸Ñ… ĞºĞ°Ğ½Ğ°Ğ»Ñ–Ğ². ĞĞ°Ñ‚Ğ¸ÑĞ½Ñ–Ñ‚ÑŒ ĞºĞ½Ğ¾Ğ¿ĞºÑƒ Ğ–ĞĞ’Ğ¢Ğ£, Ñ‰Ğ¾Ğ± Ğ´Ğ¾Ğ´Ğ°Ñ‚Ğ¸ ĞºĞ°Ğ½Ğ°Ğ» Ğ´Ğ¾ ÑƒĞ»ÑĞ±Ğ»ĞµĞ½Ğ¸Ñ….',
	'errorNoPlaylistHistory': 'Ğ†ÑÑ‚Ğ¾Ñ€Ñ–Ñ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ñ–Ğ² Ğ²Ñ–Ğ´ÑÑƒÑ‚Ğ½Ñ. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ²ÑÑ‚Ğ°Ğ²Ñ‚Ğµ URL Ğ² Ğ¿Ğ¾Ğ»Ğµ Ğ½Ğ¸Ğ¶Ñ‡Ğµ.',

	// Menu
	'searchPlaceholder': 'ĞŸĞ¾ÑˆÑƒĞº',
	'allChannels': 'Ğ’ÑÑ– ĞºĞ°Ğ½Ğ°Ğ»Ğ¸',
	'favourites': 'â­ Ğ£Ğ»ÑĞ±Ğ»ĞµĞ½Ñ–',
	'groups': 'Ğ“Ñ€ÑƒĞ¿Ğ¸',
	'channels': 'ĞšĞ°Ğ½Ğ°Ğ»Ğ¸',
	'settings_menu': 'ĞĞ°Ğ»Ğ°ÑˆÑ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ',
	'epg_menu': 'EPG',
	'guide_menu': 'ĞŸĞ¾ÑÑ–Ğ±Ğ½Ğ¸Ğº',

	'guideControlsHeadline': 'ĞšĞµÑ€ÑƒĞ²Ğ°Ğ½Ğ½Ñ',

	// Advanced Settings
	'tabGeneralSettings': 'Ğ—Ğ°Ğ³Ğ°Ğ»ÑŒĞ½Ñ– Ğ½Ğ°Ğ»Ğ°ÑˆÑ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ',
	'tabAdvancedSettings': 'Ğ Ğ¾Ğ·ÑˆĞ¸Ñ€ĞµĞ½Ñ– Ğ½Ğ°Ğ»Ğ°ÑˆÑ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ',
	'chooseMousewheel': 'ĞšĞ¾Ğ»ĞµÑĞ¾ Ğ¼Ğ¸ÑˆÑ–',
	'volumeSetting': 'Ğ—Ğ±Ñ–Ğ»ÑŒÑˆĞµĞ½Ğ½Ñ/Ğ·Ğ¼ĞµĞ½ÑˆĞµĞ½Ğ½Ñ Ğ³ÑƒÑ‡Ğ½Ğ¾ÑÑ‚Ñ–',
	'channelSetting': 'ĞŸĞµÑ€ĞµĞ¼Ğ¾Ñ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ ĞºĞ°Ğ½Ğ°Ğ»Ñƒ Ğ²Ğ¿ĞµÑ€ĞµĞ´/Ğ½Ğ°Ğ·Ğ°Ğ´',
	'reloadPlaylistOnStart': 'Ğ—Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶Ğ¸Ñ‚Ğ¸ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ¿Ñ€Ğ¸ ĞºĞ¾Ğ¶Ğ½Ğ¾Ğ¼Ñƒ Ğ·Ğ°Ğ¿ÑƒÑĞºÑƒ',
	'bufferSetting': 'Ğ‘ÑƒÑ„ĞµÑ€Ğ¸Ğ·Ğ°Ñ†Ñ–Ñ',
	'customUserAgentSetting': 'Ğ†Ğ´ĞµĞ½Ñ‚Ğ¸Ñ„Ñ–ĞºĞ°Ñ‚Ğ¾Ñ€ ĞºĞ¾Ñ€Ğ¸ÑÑ‚ÑƒĞ²Ğ°Ñ‡Ğ°',

	// Channel Settings
	'loading': 'Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ½Ñ...',
	'audioTrack': 'ĞÑƒĞ´Ñ–Ğ¾Ğ´Ğ¾Ñ€Ñ–Ğ¶ĞºĞ°',
	'subtitleTrack': 'Ğ”Ğ¾Ñ€Ñ–Ğ¶ĞºĞ° ÑÑƒĞ±Ñ‚Ğ¸Ñ‚Ñ€Ñ–Ğ²',
	'channelSettings': 'ĞĞ°Ğ»Ğ°ÑˆÑ‚ÑƒĞ²Ğ°Ğ½Ğ½Ñ ĞºĞ°Ğ½Ğ°Ğ»Ñƒ',
	'channelSettingSubtitle': 'ÑÑƒĞ±Ñ‚Ğ¸Ñ‚Ñ€Ğ¸ / Ğ°ÑƒĞ´Ñ–Ğ¾',
	'channelSettingAudio': 'Ğ°ÑƒĞ´Ñ–Ğ¾',
	'channelSettingVideo': 'Ğ²Ñ–Ğ´ĞµĞ¾ / Ñ„Ğ¾Ñ€Ğ¼Ğ°Ñ‚',
	'channelSettingFavs': 'Ğ´Ğ¾Ğ´Ğ°Ñ‚Ğ¸ ĞºĞ°Ğ½Ğ°Ğ» Ğ² Ğ¾Ğ±Ñ€Ğ°Ğ½Ñ–',
	'channelSettingPlayback': 'Ğ¿Ğ¾ĞºĞ°Ğ·Ğ°Ñ‚Ğ¸ ĞµĞ»ĞµĞ¼ĞµĞ½Ñ‚Ğ¸ ĞºĞµÑ€ÑƒĞ²Ğ°Ğ½Ğ½Ñ Ğ²Ñ–Ğ´Ñ‚Ğ²Ğ¾Ñ€ĞµĞ½Ğ½ÑĞ¼',
	'channelSettingAudioDefault': 'Ğ´Ğ¾Ñ€Ñ–Ğ¶ĞºĞ° Ğ·Ğ° Ğ·Ğ°Ğ¼Ğ¾Ğ²Ñ‡ÑƒĞ²Ğ°Ğ½Ğ½ÑĞ¼',
	'channelSettingSubNoTrack': 'Ğ½Ğµ Ğ´Ğ¾ÑÑ‚ÑƒĞ¿Ğ½Ğ¾',
	'channelSettingSubOff': 'Ğ²Ğ¸Ğ¼ĞºĞ½ÑƒÑ‚Ğ¸',
	'channelSettingResolution': 'Ñ€Ğ¾Ğ·Ğ´Ñ–Ğ»ÑŒĞ½Ğ° Ğ·Ğ´Ğ°Ñ‚Ğ½Ñ–ÑÑ‚ÑŒ',
	'channelSettingFormat': 'Ğ¤Ğ¾Ñ€Ğ¼Ğ°Ñ‚ Ğ²Ñ–Ğ´ĞµĞ¾',
	'channelSettingFormatOriginal': 'Ğ¾Ñ€Ğ¸Ğ³Ñ–Ğ½Ğ°Ğ»ÑŒĞ½Ğ¸Ğ¹',
	'channelSettingFormatFill': 'Ğ·Ğ°Ğ¿Ğ¾Ğ²Ğ½Ğ¸Ñ‚Ğ¸ / Ñ€Ğ¾Ğ·Ñ‚ÑĞ³Ğ½ÑƒÑ‚Ğ¸',
	'channelSettingFormatZoom': 'Ğ·ÑƒĞ¼',

	// EPG
	'epgSource': 'Ğ”Ğ¶ĞµÑ€ĞµĞ»Ğ¾ EPG',
	'epgSourceFromPlaylist': 'URL EPG Ğ· Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ°',
	'usePlaylistEpgUrl': 'Ğ’Ğ¸ĞºĞ¾Ñ€Ğ¸ÑÑ‚Ğ¾Ğ²ÑƒĞ²Ğ°Ñ‚Ğ¸ Ğ´Ğ¶ĞµÑ€ĞµĞ»Ğ¾ EPG Ğ· Ğ²Ğ°ÑˆĞ¾Ğ³Ğ¾ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ğ°?',
	'epgTimeShift': 'Ğ§Ğ°ÑĞ¾Ğ²Ğ¸Ğ¹ Ğ·ÑÑƒĞ² EPG',
	'epgGrabInterval': 'Ğ†Ğ½Ñ‚ĞµÑ€Ğ²Ğ°Ğ» Ğ·Ğ±Ğ¾Ñ€Ñƒ EPG',
	'downloadEpgButton': 'Ğ·Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶Ğ¸Ñ‚Ğ¸ EPG Ğ·Ğ°Ñ€Ğ°Ğ·',
	'noEpgForChannel': 'ĞĞµĞ¼Ğ°Ñ” EPG Ğ´Ğ»Ñ Ñ†ÑŒĞ¾Ğ³Ğ¾ ĞºĞ°Ğ½Ğ°Ğ»Ñƒ',
	'noEpgUrlGiven': 'ĞĞµ Ğ²ĞºĞ°Ğ·Ğ°Ğ½Ğ¾ URL EPG',
	'noEpgUrlInPlaylist': 'ĞĞµĞ´Ğ¾ÑÑ‚ÑƒĞ¿Ğ½Ğ¾ Ğ² Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚Ñ–',
	'epgQuotaExceededError': 'ĞĞµĞ´Ğ¾ÑÑ‚Ğ°Ñ‚Ğ½ÑŒĞ¾ Ğ²Ñ–Ğ»ÑŒĞ½Ğ¾Ğ³Ğ¾ Ğ¼Ñ–ÑÑ†Ñ Ğ´Ğ»Ñ Ğ·Ğ±ĞµÑ€ĞµĞ¶ĞµĞ½Ğ½Ñ Ğ´Ğ°Ğ½Ğ¸Ñ… EPG. Ğ‘ÑƒĞ´ÑŒ Ğ»Ğ°ÑĞºĞ°, Ğ·Ğ²Ñ–Ğ»ÑŒĞ½Ñ–Ñ‚ÑŒ Ğ¿Ñ€Ğ¾ÑÑ‚Ñ–Ñ€. ĞĞ°Ğ¿Ñ€Ğ¸ĞºĞ»Ğ°Ğ´, Ğ²Ğ¸Ğ´Ğ°Ğ»Ñ–Ñ‚ÑŒ Ğ½Ğµ Ğ²Ğ¸ĞºĞ¾Ñ€Ğ¸ÑÑ‚Ğ¾Ğ²ÑƒĞ²Ğ°Ğ½Ñ– Ğ¿Ñ€Ğ¾Ğ³Ñ€Ğ°Ğ¼Ğ¸.',
	'epgNotCompatibleWithPlaylist': 'Ğ’Ğ°Ñˆ Ğ¿Ğ»ĞµĞ¹Ğ»Ğ¸ÑÑ‚ Ğ½ĞµÑÑƒĞ¼Ñ–ÑĞ½Ğ¸Ğ¹ Ğ· Ñ†Ğ¸Ğ¼ URL EGP.',
	'epgIsDownloading': 'Ğ—Ğ°Ğ²Ğ°Ğ½Ñ‚Ğ°Ğ¶ĞµĞ½Ğ½Ñ EPG...',
	'epgChannelsProcessed': 'ĞºĞ°Ğ½Ğ°Ğ»Ğ¸: ',
	'epgProgramsProcessed': 'Ğ¿Ñ€Ğ¾Ğ³Ñ€Ğ°Ğ¼Ğ¸: ',
	'epgNow': 'Ğ—Ğ°Ñ€Ğ°Ğ·',
	'epgAfter': 'ĞŸÑ–ÑĞ»Ñ',
},
'id': {
	'yes': 'ya', 'no': 'tidak',

	'm3uSource': 'URL ke file m3u(8)',
	'chooseLang': 'Bahasa',
	'usbLoadLabel': 'Playlist dari USB',
	'openUsbButton': 'telusuri USB',
	'localLoadLabel': 'File m3u(8) lokal',
	'openExplorerButton': 'buka penjelajah',
	'openHistoryButton': 'riwayat',
	'downloadButton': 'muat playlist',
	'saveButton': 'simpan dan mainkan',
	'deleteButton': 'hapus playlist',
	'generalSettingsButton': 'pengaturan umum',
	'advancedSettingsButton': 'pengaturan lanjutan',

	'closeAppHint': 'Apakah Anda ingin menutup aplikasi ini?',
	'hideModalHint': 'Tekan tombol apa saja untuk menutup pesan ini.',
	'playlistDownloaded': 'Playlist berhasil diunduh.<br>%i channel dimuat.',
	'channelsLoaded': 'channel',
	'filterNoResults': 'Tidak ada channel yang ditemukan untuk filter yang diberikan.',

	'redButtonHint': '<span class="red-button">A</span> pencarian',
	'helpHint': 'Tekan tombol <span class="red-button">A</span> untuk menyisipkan daftar channel demo.<br><br>Tekan INFO pada remote control kapan saja untuk panduan pengguna.',

	'supportContact': 'Untuk informasi lebih lanjut, kunjungi https://m3u-ip.tv/en',
	'supportContactLinked': 'Untuk informasi lebih lanjut, kunjungi <a href="https://m3u-ip.tv/en/" target="_blank">https://m3u-ip.tv/en</a>',
	'donate': 'Jika Anda menyukai aplikasi ini, dukung saya dengan sedikit donasi.<br>Kunjungi <b class="NOBR">https://m3u-ip.tv</b><br>atau melalui kode QR.',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (kartu kredit)',
	'downloadM3uStatus': 'Memuat playlist. Harap tunggu sebentar.',
	'usbMountedStatus': 'USB terpasang',

	'connectionLost': 'Koneksi jaringan terputus. Harap periksa jaringan Anda.',
	'checkM3uError': 'Tidak dapat memuat playlist. Kode status HTTP: ',
	'checkM3uFileError': 'Bukan playlist m3u(8) yang valid. Harap periksa file.',
	'checkM3uDownloadError': 'Tidak dapat memuat playlist. Harap periksa URL.',
	'checkM3uDownloadSizeError': 'Playlist mengandung terlalu banyak channel. Harap kurangi hingga maksimal 20.000 channel.',
	'checkM3uTimeoutError': 'Waktu habis saat memuat playlist Anda. Silakan coba lagi.',
	'errorNoUsbMounted': 'Tidak ada penyimpanan USB yang terdeteksi. Harap hubungkan perangkat penyimpanan USB terlebih dahulu.',
	'errorNoM3uUrl': 'Harap masukkan URL yang valid ke playlist m3u(8) Anda.',
	'channelLoadError': 'Channel ini tidak tersedia saat ini. Silakan coba lagi nanti.',
	'channelLoadConnectionFailed': '(Koneksi ke stream gagal.)',
	'channelNotSupportedFile': 'Channel ini tidak dapat dimuat karena format yang tidak kompatibel.',
	'errorNoFavouritesYet': 'Anda belum memiliki channel favorit. Tekan tombol KUNING untuk menandai sebagai favorit.',
	'errorNoPlaylistHistory': 'Belum ada playlist dalam riwayat. Silakan masukkan URL di bawah ini.',

	// Menu
	'searchPlaceholder': 'Cari',
	'allChannels': 'Semua channel',
	'favourites': 'â­ Favorit',
	'groups': 'Grup',
	'channels': 'Channel',
	'settings_menu': 'Pengaturan',
	'epg_menu': 'EPG',
	'guide_menu': 'Panduan',

	'guideControlsHeadline': 'Kontrol',

	// Advanced Settings
	'tabGeneralSettings': 'Pengaturan Umum',
	'tabAdvancedSettings': 'Pengaturan Lanjutan',
	'chooseMousewheel': 'Roda mouse',
	'volumeSetting': 'Volume naik/turun',
	'channelSetting': 'Channel maju/mundur',
	'reloadPlaylistOnStart': 'Unduh playlist setiap kali mulai',
	'bufferSetting': 'Buffer',
	'customUserAgentSetting': 'User Agent',

	// Channel Settings
	'loading': 'memuat...',
	'audioTrack': 'Jalur Audio',
	'subtitleTrack': 'Jalur Subtitle',
	'channelSettings': 'Pengaturan Saluran',
	'channelSettingSubtitle': 'subtitle / audio',
	'channelSettingAudio': 'audio',
	'channelSettingVideo': 'video / format',
	'channelSettingFavs': 'tambahkan saluran ke favorit',
	'channelSettingPlayback': 'tampilkan kontrol pemutaran',
	'channelSettingAudioDefault': 'jalur default',
	'channelSettingSubNoTrack': 'tidak tersedia',
	'channelSettingSubOff': 'nonaktifkan',
	'channelSettingResolution': 'resolusi',
	'channelSettingFormat': 'Format Video',
	'channelSettingFormatOriginal': 'asli',
	'channelSettingFormatFill': 'isi / rentangkan',
	'channelSettingFormatZoom': 'zoom',

	// EPG
	'epgSource': 'Sumber EPG',
	'epgSourceFromPlaylist': 'URL EPG dari playlist',
	'usePlaylistEpgUrl': 'Gunakan sumber EPG dari playlist Anda?',
	'epgTimeShift': 'Pergeseran Waktu EPG',
	'epgGrabInterval': 'Interval pengambilan EPG',
	'downloadEpgButton': 'unduh EPG sekarang',
	'noEpgForChannel': 'Tidak ada EPG untuk channel ini',
	'noEpgUrlGiven': 'Tidak ada URL EPG yang ditetapkan',
	'noEpgUrlInPlaylist': 'Tidak tersedia di playlist',
	'epgQuotaExceededError': 'Tidak cukup ruang bebas untuk menyimpan data EPG. Harap bebaskan beberapa ruang. Misalnya dengan menghapus aplikasi yang tidak terpakai.',
	'epgNotCompatibleWithPlaylist': 'Playlist Anda tidak kompatibel dengan URL EGP ini.',
	'epgIsDownloading': 'Memuat EPG...',
	'epgChannelsProcessed': 'channel: ',
	'epgProgramsProcessed': 'program: ',
	'epgNow': 'Sekarang',
	'epgAfter': 'Setelah',
},
'ja': {
	'yes': 'ã¯ã„', 'no': 'ã„ã„ãˆ',

	'm3uSource': 'm3u(8)-ãƒ•ã‚¡ã‚¤ãƒ«ã®URL',
	'chooseLang': 'è¨€èª',
	'usbLoadLabel': 'USBã‹ã‚‰ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’èª­ã¿è¾¼ã‚€',
	'openUsbButton': 'USBã‚’é–‹ã',
	'localLoadLabel': 'ãƒ­ãƒ¼ã‚«ãƒ«ã®m3u(8)-ãƒ•ã‚¡ã‚¤ãƒ«',
	'openExplorerButton': 'ã‚¨ã‚¯ã‚¹ãƒ—ãƒ­ãƒ¼ãƒ©ãƒ¼ã‚’é–‹ã',
	'openHistoryButton': 'å±¥æ­´',
	'downloadButton': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’èª­ã¿è¾¼ã‚€',
	'saveButton': 'ä¿å­˜ã—ã¦å†ç”Ÿ',
	'deleteButton': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’å‰Šé™¤',
	'generalSettingsButton': 'ä¸€èˆ¬è¨­å®š',
	'advancedSettingsButton': 'è©³ç´°è¨­å®š',

	'closeAppHint': 'ã“ã®ã‚¢ãƒ—ãƒªã‚’çµ‚äº†ã—ã¾ã™ã‹ï¼Ÿ',
	'hideModalHint': 'ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã‚’é–‰ã˜ã‚‹ã«ã¯ã€ã„ãšã‚Œã‹ã®ãƒœã‚¿ãƒ³ã‚’æŠ¼ã—ã¦ãã ã•ã„ã€‚',
	'playlistDownloaded': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã®ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰ã«æˆåŠŸã—ã¾ã—ãŸã€‚<br>%i ãƒãƒ£ãƒ³ãƒãƒ«ãŒèª­ã¿è¾¼ã¾ã‚Œã¾ã—ãŸã€‚',
	'channelsLoaded': 'ãƒãƒ£ãƒ³ãƒãƒ«',
	'filterNoResults': 'æŒ‡å®šã•ã‚ŒãŸãƒ•ã‚£ãƒ«ã‚¿ãƒ¼ã§ãƒãƒ£ãƒ³ãƒãƒ«ãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã§ã—ãŸã€‚',

	'redButtonHint': '<span class="red-button">A</span> æ¤œç´¢',
	'helpHint': '<span class="red-button">A</span>-ãƒœã‚¿ãƒ³ã‚’æŠ¼ã—ã¦ãƒ‡ãƒ¢ãƒãƒ£ãƒ³ãƒãƒ«ãƒªã‚¹ãƒˆã‚’æŒ¿å…¥ã—ã¾ã™ã€‚<br><br>ãƒªãƒ¢ã‚³ãƒ³ã®INFOãƒœã‚¿ãƒ³ã‚’æŠ¼ã™ã¨ã€ã„ã¤ã§ã‚‚ãƒ¦ãƒ¼ã‚¶ãƒ¼ã‚¬ã‚¤ãƒ‰ã‚’è¡¨ç¤ºã§ãã¾ã™ã€‚',

	'supportContact': 'è©³ç´°ã«ã¤ã„ã¦ã¯ã€https://m3u-ip.tv/ja ã‚’ã”è¦§ãã ã•ã„ã€‚',
	'supportContactLinked': 'è©³ç´°ã«ã¤ã„ã¦ã¯ã€<a href="https://m3u-ip.tv/ja/" target="_blank">https://m3u-ip.tv/ja</a>ã‚’ã”è¦§ãã ã•ã„ã€‚',
	'donate': 'ã“ã®ã‚¢ãƒ—ãƒªãŒæ°—ã«å…¥ã£ãŸå ´åˆã¯ã€å°‘é¡ã®å¯„ä»˜ã§ã‚µãƒãƒ¼ãƒˆã—ã¦ãã ã•ã„ã€‚<br><b class="NOBR">https://m3u-ip.tv</b><br>ã¾ãŸã¯QRã‚³ãƒ¼ãƒ‰ã‹ã‚‰ã‚¢ã‚¯ã‚»ã‚¹ã§ãã¾ã™ã€‚',
	'donatePP': 'PayPal', 'donateKK': 'Stripeï¼ˆã‚¯ãƒ¬ã‚¸ãƒƒãƒˆã‚«ãƒ¼ãƒ‰ï¼‰',
	'downloadM3uStatus': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’èª­ã¿è¾¼ã¿ä¸­ã§ã™ã€‚ã—ã°ã‚‰ããŠå¾…ã¡ãã ã•ã„ã€‚',
	'usbMountedStatus': 'USBãŒãƒã‚¦ãƒ³ãƒˆã•ã‚Œã¾ã—ãŸã€‚',

	'connectionLost': 'ãƒãƒƒãƒˆãƒ¯ãƒ¼ã‚¯æ¥ç¶šãŒå¤±ã‚ã‚Œã¾ã—ãŸã€‚ãƒãƒƒãƒˆãƒ¯ãƒ¼ã‚¯ã‚’ç¢ºèªã—ã¦ãã ã•ã„ã€‚',
	'checkM3uError': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’èª­ã¿è¾¼ã‚ã¾ã›ã‚“ã§ã—ãŸã€‚HTTPã‚¹ãƒ†ãƒ¼ã‚¿ã‚¹ã‚³ãƒ¼ãƒ‰: ',
	'checkM3uFileError': 'æœ‰åŠ¹ãªm3u(8)-ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã§ã¯ã‚ã‚Šã¾ã›ã‚“ã€‚ãƒ•ã‚¡ã‚¤ãƒ«ã‚’ç¢ºèªã—ã¦ãã ã•ã„ã€‚',
	'checkM3uDownloadError': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’èª­ã¿è¾¼ã‚ã¾ã›ã‚“ã§ã—ãŸã€‚URLã‚’ç¢ºèªã—ã¦ãã ã•ã„ã€‚',
	'checkM3uDownloadSizeError': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã«ãƒãƒ£ãƒ³ãƒãƒ«ãŒå¤šã™ãã¾ã™ã€‚æœ€å¤§20,000ãƒãƒ£ãƒ³ãƒãƒ«ã«æ¸›ã‚‰ã—ã¦ãã ã•ã„ã€‚',
	'checkM3uTimeoutError': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã®èª­ã¿è¾¼ã¿ä¸­ã«ã‚¿ã‚¤ãƒ ã‚¢ã‚¦ãƒˆãŒç™ºç”Ÿã—ã¾ã—ãŸã€‚å†è©¦è¡Œã—ã¦ãã ã•ã„ã€‚',
	'errorNoUsbMounted': 'USBã‚¹ãƒˆãƒ¬ãƒ¼ã‚¸ãŒæ¤œå‡ºã•ã‚Œã¾ã›ã‚“ã§ã—ãŸã€‚æœ€åˆã«USBã‚¹ãƒˆãƒ¬ãƒ¼ã‚¸ãƒ‡ãƒã‚¤ã‚¹ã‚’æ¥ç¶šã—ã¦ãã ã•ã„ã€‚',
	'errorNoM3uUrl': 'æœ‰åŠ¹ãªm3u(8)ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã®URLã‚’å…¥åŠ›ã—ã¦ãã ã•ã„ã€‚',
	'channelLoadError': 'ã“ã®ãƒãƒ£ãƒ³ãƒãƒ«ã¯ç¾åœ¨åˆ©ç”¨ã§ãã¾ã›ã‚“ã€‚å¾Œã§ã‚‚ã†ä¸€åº¦ãŠè©¦ã—ãã ã•ã„ã€‚',
	'channelLoadConnectionFailed': 'ï¼ˆã‚¹ãƒˆãƒªãƒ¼ãƒ ã¸ã®æ¥ç¶šã«å¤±æ•—ã—ã¾ã—ãŸã€‚ï¼‰',
	'channelNotSupportedFile': 'ã“ã®ãƒãƒ£ãƒ³ãƒãƒ«ã¯éå¯¾å¿œã®å½¢å¼ã®ãŸã‚èª­ã¿è¾¼ã‚ã¾ã›ã‚“ã€‚',
	'errorNoFavouritesYet': 'ã¾ã ãŠæ°—ã«å…¥ã‚Šã®ãƒãƒ£ãƒ³ãƒãƒ«ãŒã‚ã‚Šã¾ã›ã‚“ã€‚YELLOWãƒœã‚¿ãƒ³ã‚’æŠ¼ã—ã¦ãƒãƒ£ãƒ³ãƒãƒ«ã‚’ãŠæ°—ã«å…¥ã‚Šã«è¿½åŠ ã—ã¦ãã ã•ã„ã€‚',
	'errorNoPlaylistHistory': 'å±¥æ­´ã«ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆãŒã‚ã‚Šã¾ã›ã‚“ã€‚ä»¥ä¸‹ã®ãƒ•ã‚£ãƒ¼ãƒ«ãƒ‰ã«URLã‚’å…¥åŠ›ã—ã¦ãã ã•ã„ã€‚',

	// Menu
	'searchPlaceholder': 'æ¤œç´¢',
	'allChannels': 'ã™ã¹ã¦ã®ãƒãƒ£ãƒ³ãƒãƒ«',
	'favourites': 'â­ ãŠæ°—ã«å…¥ã‚Š',
	'groups': 'ã‚°ãƒ«ãƒ¼ãƒ—',
	'channels': 'ãƒãƒ£ãƒ³ãƒãƒ«',
	'settings_menu': 'è¨­å®š',
	'epg_menu': 'EPG',
	'guide_menu': 'ã‚¬ã‚¤ãƒ‰',

	'guideControlsHeadline': 'æ“ä½œæ–¹æ³•',

	// Advanced Settings
	'tabGeneralSettings': 'ä¸€èˆ¬è¨­å®š',
	'tabAdvancedSettings': 'è©³ç´°è¨­å®š',
	'chooseMousewheel': 'ãƒã‚¦ã‚¹ãƒ›ã‚¤ãƒ¼ãƒ«',
	'volumeSetting': 'éŸ³é‡ã®ä¸Šã’ä¸‹ã’',
	'channelSetting': 'ãƒãƒ£ãƒ³ãƒãƒ«ã®å‰é€²/å¾Œé€€',
	'reloadPlaylistOnStart': 'èµ·å‹•æ™‚ã«ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰',
	'bufferSetting': 'ãƒãƒƒãƒ•ã‚¡è¨­å®š',
	'customUserAgentSetting': 'ãƒ¦ãƒ¼ã‚¶ãƒ¼ã‚¨ãƒ¼ã‚¸ã‚§ãƒ³ãƒˆ',

	// Channel Settings
	'loading': 'èª­ã¿è¾¼ã¿ä¸­...',
	'audioTrack': 'éŸ³å£°ãƒˆãƒ©ãƒƒã‚¯',
	'subtitleTrack': 'å­—å¹•ãƒˆãƒ©ãƒƒã‚¯',
	'channelSettings': 'ãƒãƒ£ãƒ³ãƒãƒ«è¨­å®š',
	'channelSettingSubtitle': 'å­—å¹• / éŸ³å£°',
	'channelSettingVideo': 'ãƒ“ãƒ‡ã‚ª / å½¢å¼',
	'channelSettingFavs': 'ãƒãƒ£ãƒ³ãƒãƒ«ã‚’ãŠæ°—ã«å…¥ã‚Šã«è¿½åŠ ',
	'channelSettingPlayback': 'å†ç”Ÿã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«ã‚’è¡¨ç¤º',
	'channelSettingAudioDefault': 'ãƒ‡ãƒ•ã‚©ãƒ«ãƒˆãƒˆãƒ©ãƒƒã‚¯',
	'channelSettingSubNoTrack': 'åˆ©ç”¨ä¸å¯',
	'channelSettingSubOff': 'ç„¡åŠ¹',
	'channelSettingResolution': 'è§£åƒåº¦',
	'channelSettingFormat': 'ãƒ“ãƒ‡ã‚ªå½¢å¼',
	'channelSettingFormatOriginal': 'ã‚ªãƒªã‚¸ãƒŠãƒ«',
	'channelSettingFormatFill': 'å…¨ç”»é¢ / ã‚¹ãƒˆãƒ¬ãƒƒãƒ',
	'channelSettingFormatZoom': 'ã‚ºãƒ¼ãƒ ',

	// EPG
	'epgSource': 'EPGã‚½ãƒ¼ã‚¹',
	'epgSourceFromPlaylist': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã‹ã‚‰ã®EPG URL',
	'usePlaylistEpgUrl': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã®EPGã‚½ãƒ¼ã‚¹ã‚’ä½¿ç”¨ã—ã¾ã™ã‹ï¼Ÿ',
	'epgTimeShift': 'EPGã‚¿ã‚¤ãƒ ã‚·ãƒ•ãƒˆ',
	'epgGrabInterval': 'EPGå–å¾—é–“éš”',
	'downloadEpgButton': 'ä»Šã™ãEPGã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰',
	'noEpgForChannel': 'ã“ã®ãƒãƒ£ãƒ³ãƒãƒ«ã«ã¯EPGãŒã‚ã‚Šã¾ã›ã‚“',
	'noEpgUrlGiven': 'EPGã®URLãŒè¨­å®šã•ã‚Œã¦ã„ã¾ã›ã‚“',
	'noEpgUrlInPlaylist': 'ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã«ã¯ã‚ã‚Šã¾ã›ã‚“',
	'epgQuotaExceededError': 'EPGãƒ‡ãƒ¼ã‚¿ã‚’ä¿å­˜ã™ã‚‹ãŸã‚ã®ç©ºãå®¹é‡ãŒä¸è¶³ã—ã¦ã„ã¾ã™ã€‚ä¸è¦ãªã‚¢ãƒ—ãƒªã‚’å‰Šé™¤ã™ã‚‹ãªã©ã—ã¦ã€ç©ºãå®¹é‡ã‚’ç¢ºä¿ã—ã¦ãã ã•ã„ã€‚',
	'epgNotCompatibleWithPlaylist': 'ã“ã®EPG-URLã¯ã‚ãªãŸã®ãƒ—ãƒ¬ã‚¤ãƒªã‚¹ãƒˆã¨äº’æ›æ€§ãŒã‚ã‚Šã¾ã›ã‚“ã€‚',
	'epgIsDownloading': 'EPGã‚’èª­ã¿è¾¼ã¿ä¸­...',
	'epgChannelsProcessed': 'ãƒãƒ£ãƒ³ãƒãƒ«: ',
	'epgProgramsProcessed': 'ãƒ—ãƒ­ã‚°ãƒ©ãƒ : ',
	'epgNow': 'ç¾åœ¨',
	'epgAfter': 'æ¬¡ã«',
},
'hi': {
	'yes': 'à¤¹à¤¾à¤', 'no': 'à¤¨à¤¹à¥€à¤‚',

	'm3uSource': 'm3u(8)-à¤«à¤¼à¤¾à¤‡à¤² à¤•à¤¾ URL',
	'chooseLang': 'à¤­à¤¾à¤·à¤¾',
	'usbLoadLabel': 'USB à¤¸à¥‡ à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ',
	'openUsbButton': 'USB à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼ à¤•à¤°à¥‡à¤‚',
	'localLoadLabel': 'à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ m3u(8)-à¤«à¤¼à¤¾à¤‡à¤²',
	'openExplorerButton': 'à¤µà¤¿à¤‚à¤¡à¥‹ à¤à¤•à¥à¤¸à¤ªà¥à¤²à¥‹à¤°à¤° à¤–à¥‹à¤²à¥‡à¤‚',
	'openHistoryButton': 'à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸',
	'downloadButton': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚',
	'saveButton': 'à¤¸à¤¹à¥‡à¤œà¥‡à¤‚ à¤”à¤° à¤šà¤²à¤¾à¤à¤',
	'deleteButton': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤¹à¤Ÿà¤¾à¤à¤‚',
	'generalSettingsButton': 'à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
	'advancedSettingsButton': 'à¤‰à¤¨à¥à¤¨à¤¤ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',

	'closeAppHint': 'à¤•à¥à¤¯à¤¾ à¤†à¤ª à¤‡à¤¸ à¤à¤ª à¤•à¥‹ à¤¬à¤‚à¤¦ à¤•à¤°à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚?',
	'hideModalHint': 'à¤¯à¤¹ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¬à¤‚à¤¦ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥‹à¤ˆ à¤­à¥€ à¤¬à¤Ÿà¤¨ à¤¦à¤¬à¤¾à¤à¤‚à¥¤',
	'playlistDownloaded': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤¹à¥‹ à¤—à¤ˆà¥¤<br>%i à¤šà¥ˆà¤¨à¤² à¤²à¥‹à¤¡ à¤•à¤¿à¤ à¤—à¤à¥¤',
	'channelsLoaded': 'à¤šà¥ˆà¤¨à¤²',
	'filterNoResults': 'à¤¦à¤¿à¤ à¤—à¤ à¤«à¤¼à¤¿à¤²à¥à¤Ÿà¤° à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥‹à¤ˆ à¤šà¥ˆà¤¨à¤² à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤',

	'redButtonHint': '<span class="red-button">A</span> à¤–à¥‹à¤œà¥‡à¤‚',
	'helpHint': '<span class="red-button">A</span> à¤¬à¤Ÿà¤¨ à¤¦à¤¬à¤¾à¤à¤ à¤”à¤° à¤¡à¥‡à¤®à¥‹ à¤šà¥ˆà¤¨à¤² à¤¸à¥‚à¤šà¥€ à¤œà¥‹à¤¡à¤¼à¥‡à¤‚à¥¤<br><br>à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤¸à¤®à¤¯ à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾ à¤—à¤¾à¤‡à¤¡ à¤•à¥‡ à¤²à¤¿à¤ à¤°à¤¿à¤®à¥‹à¤Ÿ à¤ªà¤° INFO à¤¦à¤¬à¤¾à¤à¤à¥¤',

	'supportContact': 'à¤…à¤§à¤¿à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤²à¤¿à¤, https://m3u-ip.tv/hi à¤ªà¤° à¤œà¤¾à¤à¤‚à¥¤',
	'supportContactLinked': 'à¤…à¤§à¤¿à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤²à¤¿à¤, <a href="https://m3u-ip.tv/hi/" target="_blank">https://m3u-ip.tv/hi</a> à¤ªà¤° à¤œà¤¾à¤à¤‚à¥¤',
	'donate': 'à¤…à¤—à¤° à¤†à¤ªà¤•à¥‹ à¤¯à¤¹ à¤à¤ª à¤ªà¤¸à¤‚à¤¦ à¤†à¤¯à¤¾ à¤¹à¥ˆ, à¤¤à¥‹ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¥à¥‹à¤¡à¤¼à¤¾ à¤¦à¤¾à¤¨ à¤•à¤°à¥‡à¤‚à¥¤<br>à¤µà¤¿à¤œà¤¿à¤Ÿ à¤•à¤°à¥‡à¤‚ <b class="NOBR">https://m3u-ip.tv</b><br>à¤¯à¤¾ QR à¤•à¥‹à¤¡ à¤¸à¥‡à¥¤',
	'donatePP': 'PayPal', 'donateKK': 'Stripe (à¤•à¥à¤°à¥‡à¤¡à¤¿à¤Ÿ à¤•à¤¾à¤°à¥à¤¡)',
	'downloadM3uStatus': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¥€ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤•à¥à¤› à¤•à¥à¤·à¤£ à¤ªà¥à¤°à¤¤à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¥‡à¤‚à¥¤',
	'usbMountedStatus': 'USB à¤®à¤¾à¤‰à¤‚à¤Ÿ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾',

	'connectionLost': 'à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤•à¤¨à¥‡à¤•à¥à¤¶à¤¨ à¤–à¥‹ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤ªà¤¨à¥‡ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤•à¥€ à¤œà¤¾à¤à¤š à¤•à¤°à¥‡à¤‚à¥¤',
	'checkM3uError': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤²à¥‹à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹ à¤¸à¤•à¥€à¥¤ HTTP à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤¸-à¤•à¥‹à¤¡: ',
	'checkM3uFileError': 'à¤¯à¤¹ à¤à¤• à¤®à¤¾à¤¨à¥à¤¯ m3u(8) à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤«à¤¼à¤¾à¤‡à¤² à¤•à¥€ à¤œà¤¾à¤à¤š à¤•à¤°à¥‡à¤‚à¥¤',
	'checkM3uDownloadError': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤²à¥‹à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹ à¤¸à¤•à¥€à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ URL à¤•à¥€ à¤œà¤¾à¤à¤š à¤•à¤°à¥‡à¤‚à¥¤',
	'checkM3uDownloadSizeError': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤®à¥‡à¤‚ à¤¬à¤¹à¥à¤¤ à¤…à¤§à¤¿à¤• à¤šà¥ˆà¤¨à¤² à¤¹à¥ˆà¤‚à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤‰à¤¨à¥à¤¹à¥‡à¤‚ à¤…à¤§à¤¿à¤•à¤¤à¤® 20,000 à¤šà¥ˆà¤¨à¤² à¤¤à¤• à¤¸à¥€à¤®à¤¿à¤¤ à¤•à¤°à¥‡à¤‚à¥¤',
	'checkM3uTimeoutError': 'à¤†à¤ªà¤•à¥€ à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤²à¥‹à¤¡ à¤•à¤°à¤¤à¥‡ à¤¸à¤®à¤¯ à¤Ÿà¤¾à¤‡à¤®à¤†à¤‰à¤Ÿ à¤¹à¥‹ à¤—à¤¯à¤¾à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨: à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
	'errorNoUsbMounted': 'à¤•à¥‹à¤ˆ USB à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤œ à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¤¹à¤²à¥‡ à¤à¤• USB à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤œ à¤•à¤¨à¥‡à¤•à¥à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤',
	'errorNoM3uUrl': 'à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤ªà¤¨à¥€ m3u(8) à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤•à¤¾ à¤à¤• à¤µà¥ˆà¤§ URL à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤',
	'channelLoadError': 'à¤¯à¤¹ à¤šà¥ˆà¤¨à¤² à¤…à¤­à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¬à¤¾à¤¦ à¤®à¥‡à¤‚ à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤',
	'channelLoadConnectionFailed': '(à¤¸à¥à¤Ÿà¥à¤°à¥€à¤® à¤¸à¥‡ à¤•à¤¨à¥‡à¤•à¥à¤¶à¤¨ à¤µà¤¿à¤«à¤² à¤°à¤¹à¤¾à¥¤)',
	'channelNotSupportedFile': 'à¤¯à¤¹ à¤šà¥ˆà¤¨à¤² à¤…à¤¸à¤®à¤°à¥à¤¥à¤¿à¤¤ à¤ªà¥à¤°à¤¾à¤°à¥‚à¤ª à¤•à¥‡ à¤•à¤¾à¤°à¤£ à¤²à¥‹à¤¡ à¤¨à¤¹à¥€à¤‚ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾ à¤¸à¤•à¤¤à¤¾à¥¤',
	'errorNoFavouritesYet': 'à¤†à¤ªà¤•à¥‡ à¤ªà¤¾à¤¸ à¤…à¤­à¥€ à¤¤à¤• à¤•à¥‹à¤ˆ à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾ à¤šà¥ˆà¤¨à¤² à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤•à¤¿à¤¸à¥€ à¤šà¥ˆà¤¨à¤² à¤•à¥‹ à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾ à¤®à¥‡à¤‚ à¤œà¥‹à¤¡à¤¼à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ YELLOW à¤¬à¤Ÿà¤¨ à¤¦à¤¬à¤¾à¤à¤‚à¥¤',
	'errorNoPlaylistHistory': 'à¤…à¤­à¥€ à¤¤à¤• à¤•à¥‹à¤ˆ à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¨à¥€à¤šà¥‡ à¤¦à¤¿à¤ à¤—à¤ à¤«à¤¼à¥€à¤²à¥à¤¡ à¤®à¥‡à¤‚ à¤à¤• URL à¤¡à¤¾à¤²à¥‡à¤‚à¥¤',

	// Menu
	'searchPlaceholder': 'à¤–à¥‹à¤œà¥‡à¤‚',
	'allChannels': 'à¤¸à¤­à¥€ à¤šà¥ˆà¤¨à¤²',
	'favourites': 'â­ à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾',
	'groups': 'à¤¸à¤®à¥‚à¤¹',
	'channels': 'à¤šà¥ˆà¤¨à¤²',
	'settings_menu': 'à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
	'epg_menu': 'EPG',
	'guide_menu': 'à¤—à¤¾à¤‡à¤¡',

	'guideControlsHeadline': 'à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£',

	// Advanced Settings
	'tabGeneralSettings': 'à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
	'tabAdvancedSettings': 'à¤‰à¤¨à¥à¤¨à¤¤ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
	'chooseMousewheel': 'à¤®à¤¾à¤‰à¤¸à¤µà¥à¤¹à¥€à¤²',
	'volumeSetting': 'à¤µà¥‰à¤²à¥à¤¯à¥‚à¤® à¤Šà¤ªà¤°/à¤¨à¥€à¤šà¥‡',
	'channelSetting': 'à¤šà¥ˆà¤¨à¤² à¤†à¤—à¥‡/à¤ªà¥€à¤›à¥‡',
	'reloadPlaylistOnStart': 'à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤ªà¥à¤°à¤¾à¤°à¤‚à¤­ à¤ªà¤° à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚',
	'bufferSetting': 'à¤¬à¤«à¤°',
	'customUserAgentSetting': 'à¤¯à¥‚à¤œà¤° à¤à¤œà¥‡à¤‚à¤Ÿ',

	// Channel Settings
	'loading': 'à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ...',
	'audioTrack': 'à¤‘à¤¡à¤¿à¤¯à¥‹ à¤Ÿà¥à¤°à¥ˆà¤•',
	'subtitleTrack': 'à¤¸à¤¬à¤Ÿà¤¾à¤‡à¤Ÿà¤² à¤Ÿà¥à¤°à¥ˆà¤•',
	'channelSettings': 'à¤šà¥ˆà¤¨à¤² à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸',
	'channelSettingSubtitle': 'à¤¸à¤¬à¤Ÿà¤¾à¤‡à¤Ÿà¤² / à¤‘à¤¡à¤¿à¤¯à¥‹',
	'channelSettingVideo': 'à¤µà¥€à¤¡à¤¿à¤¯à¥‹ / à¤ªà¥à¤°à¤¾à¤°à¥‚à¤ª',
	'channelSettingFavs': 'à¤šà¥ˆà¤¨à¤² à¤•à¥‹ à¤ªà¤¸à¤‚à¤¦à¥€à¤¦à¤¾ à¤®à¥‡à¤‚ à¤¡à¤¾à¤²à¥‡à¤‚',
	'channelSettingPlayback': 'à¤ªà¥à¤²à¥‡à¤¬à¥ˆà¤• à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£ à¤¦à¤¿à¤–à¤¾à¤à¤',
	'channelSettingAudioDefault': 'à¤¡à¤¿à¤«à¤¼à¥‰à¤²à¥à¤Ÿ à¤Ÿà¥à¤°à¥ˆà¤•',
	'channelSettingSubNoTrack': 'à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚',
	'channelSettingSubOff': 'à¤…à¤•à¥à¤·à¤® à¤•à¤°à¥‡à¤‚',
	'channelSettingResolution': 'à¤°à¤¿à¤œà¤¼à¥‰à¤²à¥à¤¯à¥‚à¤¶à¤¨',
	'channelSettingFormat': 'à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤ªà¥à¤°à¤¾à¤°à¥‚à¤ª',
	'channelSettingFormatOriginal': 'à¤®à¥‚à¤²',
	'channelSettingFormatFill': 'à¤«à¥à¤² / à¤¸à¥à¤Ÿà¥à¤°à¥‡à¤š',
	'channelSettingFormatZoom': 'à¤œà¤¼à¥‚à¤®',

	// EPG
	'epgSource': 'EPG à¤¸à¥à¤°à¥‹à¤¤',
	'epgSourceFromPlaylist': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤¸à¥‡ EPG URL',
	'usePlaylistEpgUrl': 'à¤‡à¤¸à¤•à¥‡ à¤¬à¤œà¤¾à¤¯ à¤…à¤ªà¤¨à¥€ à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤¸à¥‡ EPG à¤¸à¥à¤°à¥‹à¤¤ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚?',
	'epgTimeShift': 'EPG à¤Ÿà¤¾à¤‡à¤®à¤¶à¤¿à¤«à¥à¤Ÿ',
	'epgGrabInterval': 'EPG à¤—à¥à¤°à¥ˆà¤¬ à¤…à¤‚à¤¤à¤°à¤¾à¤²',
	'downloadEpgButton': 'à¤…à¤­à¥€ EPG à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚',
	'noEpgForChannel': 'à¤‡à¤¸ à¤šà¥ˆà¤¨à¤² à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥‹à¤ˆ EPG à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ',
	'noEpgUrlGiven': 'EPG URL à¤¸à¥‡à¤Ÿ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ',
	'noEpgUrlInPlaylist': 'à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤®à¥‡à¤‚ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ',
	'epgQuotaExceededError': 'EPG à¤¡à¥‡à¤Ÿà¤¾ à¤•à¥‹ à¤¸à¤¹à¥‡à¤œà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¤°à¥à¤¯à¤¾à¤ªà¥à¤¤ à¤®à¥à¤•à¥à¤¤ à¤¸à¥à¤¥à¤¾à¤¨ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤•à¥à¤› à¤¸à¥à¤¥à¤¾à¤¨ à¤–à¤¾à¤²à¥€ à¤•à¤°à¥‡à¤‚à¥¤ à¤‰à¤¦à¤¾à¤¹à¤°à¤£ à¤•à¥‡ à¤²à¤¿à¤, à¤…à¤ªà¥à¤°à¤¯à¥à¤•à¥à¤¤ à¤à¤ªà¥à¤¸ à¤•à¥‹ à¤¹à¤Ÿà¤¾à¤•à¤°à¥¤',
	'epgNotCompatibleWithPlaylist': 'à¤†à¤ªà¤•à¥€ à¤ªà¥à¤²à¥‡à¤²à¤¿à¤¸à¥à¤Ÿ à¤‡à¤¸ EPG-URL à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¤‚à¤—à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤',
	'epgIsDownloading': 'EPG à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ...',
	'epgChannelsProcessed': 'à¤šà¥ˆà¤¨à¤²: ',
	'epgProgramsProcessed': 'à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®: ',
	'epgNow': 'à¤…à¤­à¥€',
	'epgAfter': 'à¤¬à¤¾à¤¦ à¤®à¥‡à¤‚',
},
'zh': {
	'yes': 'æ˜¯', 'no': 'å¦',

	'm3uSource': 'm3u(8)æ–‡ä»¶çš„URL',
	'chooseLang': 'è¯­è¨€',
	'usbLoadLabel': 'æ¥è‡ªUSBçš„æ’­æ”¾åˆ—è¡¨',
	'openUsbButton': 'æµè§ˆUSB',
	'localLoadLabel': 'æœ¬åœ°m3u(8)æ–‡ä»¶',
	'openExplorerButton': 'æ‰“å¼€æ–‡ä»¶èµ„æºç®¡ç†å™¨',
	'openHistoryButton': 'å†å²è®°å½•',
	'downloadButton': 'åŠ è½½æ’­æ”¾åˆ—è¡¨',
	'saveButton': 'ä¿å­˜å¹¶æ’­æ”¾',
	'deleteButton': 'åˆ é™¤æ’­æ”¾åˆ—è¡¨',
	'generalSettingsButton': 'å¸¸è§„è®¾ç½®',
	'advancedSettingsButton': 'é«˜çº§è®¾ç½®',

	'closeAppHint': 'æ‚¨è¦å…³é—­æ­¤åº”ç”¨å—ï¼Ÿ',
	'hideModalHint': 'æŒ‰ä»»æ„æŒ‰é’®å…³é—­æ­¤æ¶ˆæ¯ã€‚',
	'playlistDownloaded': 'æ’­æ”¾åˆ—è¡¨ä¸‹è½½æˆåŠŸã€‚<br>%iä¸ªé¢‘é“å·²åŠ è½½ã€‚',
	'channelsLoaded': 'é¢‘é“',
	'filterNoResults': 'æœªæ‰¾åˆ°åŒ¹é…è¯¥è¿‡æ»¤æ¡ä»¶çš„é¢‘é“ã€‚',

	'redButtonHint': '<span class="red-button">A</span> æœç´¢',
	'helpHint': 'æŒ‰ <span class="red-button">A</span> é”®æ’å…¥æ¼”ç¤ºé¢‘é“åˆ—è¡¨ã€‚<br><br>éšæ—¶æŒ‰é¥æ§å™¨ä¸Šçš„INFOé”®è·å–ç”¨æˆ·æŒ‡å—ã€‚',

	'supportContact': 'æ›´å¤šä¿¡æ¯ï¼Œè¯·è®¿é—® https://m3u-ip.tv/zhã€‚',
	'supportContactLinked': 'æ›´å¤šä¿¡æ¯ï¼Œè¯·è®¿é—® <a href="https://m3u-ip.tv/zh/" target="_blank">https://m3u-ip.tv/zh</a>ã€‚',
	'donate': 'å¦‚æœæ‚¨å–œæ¬¢æ­¤åº”ç”¨ï¼Œè¯·æ”¯æŒæˆ‘å°é¢æèµ ã€‚<br>è®¿é—® <b class="NOBR">https://m3u-ip.tv</b><br>æˆ–é€šè¿‡QRç ã€‚',
	'donatePP': 'PayPal', 'donateKK': 'Stripeï¼ˆä¿¡ç”¨å¡ï¼‰',
	'downloadM3uStatus': 'æ­£åœ¨åŠ è½½æ’­æ”¾åˆ—è¡¨ã€‚è¯·ç¨ç­‰ã€‚',
	'usbMountedStatus': 'USBå·²æŒ‚è½½',

	'connectionLost': 'ç½‘ç»œè¿æ¥ä¸¢å¤±ã€‚è¯·æ£€æŸ¥æ‚¨çš„ç½‘ç»œã€‚',
	'checkM3uError': 'æ— æ³•åŠ è½½æ’­æ”¾åˆ—è¡¨ã€‚HTTPçŠ¶æ€ç ï¼š',
	'checkM3uFileError': 'æ— æ•ˆçš„m3u(8)æ’­æ”¾åˆ—è¡¨ã€‚è¯·æ£€æŸ¥æ–‡ä»¶ã€‚',
	'checkM3uDownloadError': 'æ— æ³•åŠ è½½æ’­æ”¾åˆ—è¡¨ã€‚è¯·æ£€æŸ¥URLã€‚',
	'checkM3uDownloadSizeError': 'æ’­æ”¾åˆ—è¡¨åŒ…å«å¤ªå¤šé¢‘é“ã€‚è¯·å°†é¢‘é“æ•°å‡å°‘åˆ°æœ€å¤š20,000ä¸ªã€‚',
	'checkM3uTimeoutError': 'åŠ è½½æ’­æ”¾åˆ—è¡¨æ—¶å‘ç”Ÿè¶…æ—¶ã€‚è¯·é‡è¯•ã€‚',
	'errorNoUsbMounted': 'æœªæ£€æµ‹åˆ°USBå­˜å‚¨è®¾å¤‡ã€‚è¯·å…ˆè¿æ¥USBå­˜å‚¨è®¾å¤‡ã€‚',
	'errorNoM3uUrl': 'è¯·è¾“å…¥æœ‰æ•ˆçš„m3u(8)æ’­æ”¾åˆ—è¡¨URLã€‚',
	'channelLoadError': 'è¯¥é¢‘é“æš‚æ—¶ä¸å¯ç”¨ã€‚è¯·ç¨åé‡è¯•ã€‚',
	'channelLoadConnectionFailed': 'ï¼ˆè¿æ¥åˆ°æµå¤±è´¥ã€‚ï¼‰',
	'channelNotSupportedFile': 'è¯¥é¢‘é“å› ä¸å…¼å®¹æ ¼å¼æ— æ³•åŠ è½½ã€‚',
	'errorNoFavouritesYet': 'æ‚¨è¿˜æ²¡æœ‰æ”¶è—ä»»ä½•é¢‘é“ã€‚æŒ‰é»„è‰²æŒ‰é’®æ”¶è—é¢‘é“ã€‚',
	'errorNoPlaylistHistory': 'å†å²ä¸­æ²¡æœ‰æ’­æ”¾åˆ—è¡¨ã€‚è¯·åœ¨ä¸‹æ–¹çš„å­—æ®µä¸­æ’å…¥ä¸€ä¸ªURLã€‚',

	// Menu
	'searchPlaceholder': 'æœç´¢',
	'allChannels': 'æ‰€æœ‰é¢‘é“',
	'favourites': 'â­ æ”¶è—',
	'groups': 'ç»„',
	'channels': 'é¢‘é“',
	'settings_menu': 'è®¾ç½®',
	'epg_menu': 'EPG',
	'guide_menu': 'æŒ‡å—',

	'guideControlsHeadline': 'æ§åˆ¶',

	// Advanced Settings
	'tabGeneralSettings': 'å¸¸è§„è®¾ç½®',
	'tabAdvancedSettings': 'é«˜çº§è®¾ç½®',
	'chooseMousewheel': 'æ»šè½®',
	'volumeSetting': 'éŸ³é‡å¢åŠ /å‡å°‘',
	'channelSetting': 'é¢‘é“å‰è¿›/åé€€',
	'reloadPlaylistOnStart': 'æ¯æ¬¡å¯åŠ¨æ—¶ä¸‹è½½æ’­æ”¾åˆ—è¡¨',
	'bufferSetting': 'ç¼“å†²',
	'customUserAgentSetting': 'ç”¨æˆ·ä»£ç†',

	// Channel Settings
	'loading': 'æ­£åœ¨åŠ è½½...',
	'audioTrack': 'éŸ³è½¨',
	'subtitleTrack': 'å­—å¹•è½¨',
	'channelSettings': 'é¢‘é“è®¾ç½®',
	'channelSettingSubtitle': 'å­—å¹• / éŸ³é¢‘',
	'channelSettingVideo': 'è§†é¢‘ / æ ¼å¼',
	'channelSettingFavs': 'å°†é¢‘é“åŠ å…¥æ”¶è—',
	'channelSettingPlayback': 'æ˜¾ç¤ºæ’­æ”¾æ§åˆ¶',
	'channelSettingAudioDefault': 'é»˜è®¤éŸ³è½¨',
	'channelSettingSubNoTrack': 'ä¸å¯ç”¨',
	'channelSettingSubOff': 'ç¦ç”¨',
	'channelSettingResolution': 'åˆ†è¾¨ç‡',
	'channelSettingFormat': 'è§†é¢‘æ ¼å¼',
	'channelSettingFormatOriginal': 'åŸå§‹',
	'channelSettingFormatFill': 'å¡«å…… / æ‹‰ä¼¸',
	'channelSettingFormatZoom': 'ç¼©æ”¾',

	// EPG
	'epgSource': 'EPGæ¥æº',
	'epgSourceFromPlaylist': 'æ’­æ”¾åˆ—è¡¨ä¸­çš„EPG URL',
	'usePlaylistEpgUrl': 'ä½¿ç”¨æ’­æ”¾åˆ—è¡¨ä¸­çš„EPGæ¥æºï¼Ÿ',
	'epgTimeShift': 'EPGæ—¶é—´ç§»ä½',
	'epgGrabInterval': 'EPGæŠ“å–é—´éš”',
	'downloadEpgButton': 'ç°åœ¨ä¸‹è½½EPG',
	'noEpgForChannel': 'è¯¥é¢‘é“æ— EPG',
	'noEpgUrlGiven': 'æœªè®¾ç½®EPG URL',
	'noEpgUrlInPlaylist': 'åœ¨æ’­æ”¾åˆ—è¡¨ä¸­ä¸å¯ç”¨',
	'epgQuotaExceededError': 'æ²¡æœ‰è¶³å¤Ÿçš„ç©ºé—´ä¿å­˜EPGæ•°æ®ã€‚è¯·é‡Šæ”¾ä¸€äº›ç©ºé—´ï¼Œä¾‹å¦‚åˆ é™¤ä¸ä½¿ç”¨çš„åº”ç”¨ç¨‹åºã€‚',
	'epgNotCompatibleWithPlaylist': 'æ‚¨çš„æ’­æ”¾åˆ—è¡¨ä¸æ­¤EPG-URLä¸å…¼å®¹ã€‚',
	'epgIsDownloading': 'æ­£åœ¨åŠ è½½EPG...',
	'epgChannelsProcessed': 'é¢‘é“: ',
	'epgProgramsProcessed': 'èŠ‚ç›®: ',
	'epgNow': 'ç°åœ¨',
	'epgAfter': 'ä¹‹å',
}

};


//i18n.gr = i18n.el; // Fallback

function isLangAllowed( sLangId ) {

	switch( sLangId ) {
		case 'ar':
		case 'cs':
		case 'de':
		case 'el': // greek
		case 'en':
		case 'es':
		case 'fi':
		case 'fr':
		case 'gr': // fallback for greek
		case 'hi':
		case 'id':
		case 'it':
		case 'ja': // japanese
		case 'jp': // fallback for japanese
		case 'ko':
		case 'no':
		case 'pl':
		case 'pt':
		case 'ru':
		case 'ro':
		case 'tr':
		case 'uk':
		case 'vi':
		case 'zh':
			return true;
	}

	return false;

}

function setLangId( sLangId ) {
	if( sLangId && isLangAllowed(sLangId) ) {
		localStorage.setItem('sLangId', sLangId);
		applyLang();
	} else {
		console.log('Unknown language: ' + sLangId);
	}
}

function getLangId() {
	var sStoredLang = localStorage.getItem('sLangId');

	if( !sStoredLang ) {
		sStoredLang = getDeviceLang();
		setLangId(sStoredLang);
	}

	if( !isLangAllowed(sStoredLang) ) {
		sStoredLang = 'en';
	}
	return sStoredLang;
}


function getLang( sKey, sForceLangId ) {

	sForceLangId = sForceLangId || false;

	if( sForceLangId ) {
		var sLangId = sForceLangId;
	} else {
		var sLangId = getLangId();
	}

	if( !isLangAllowed(sLangId) ) {
		sLangId = 'en'; // default lang
	}

	var aLang = i18n[sLangId];
	if( aLang ) {
		if( aLang[sKey] ) {
			return aLang[sKey];
		} else if( sLangId !== 'en' ) {
			console.log('Lang fallback: ' + sLangId + ' --- ' + sKey);
			return getLang(sKey, 'en');
		}
	}

	return '';

}

function applyLang() {

	var sLangId = getLangId();
	document.getElementById('sLangId').value = sLangId;

	var aElements = document.querySelectorAll('.i18nInput');
	aElements.forEach(function(oEl) {
		var sLangKey = oEl.dataset.langid;
		if( sLangKey ) {
			var sLangValue = getLang(sLangKey);
			if( sLangValue ) {
				oEl.value = sLangValue;
			}
		}
	});

	aElements = document.querySelectorAll('.i18nPlaceholder');
	aElements.forEach(function(oEl) {
		var sLangKey = oEl.dataset.langid;
		if( sLangKey ) {
			var sLangValue = getLang(sLangKey);
			if( sLangValue ) {
				oEl.placeholder = sLangValue;
			}
		}
	});

	if( sLangId === 'ar' ) {
		document.body.classList.add('rtl');
	} else {
		document.body.classList.remove('rtl');
	}

	aElements = document.querySelectorAll('.i18n');
	aElements.forEach(function(oEl) {
		var sLangKey = oEl.dataset.langid;
		if( sLangKey ) {
			var sLangValue = getLang(sLangKey);
			if( sLangValue ) {
				oEl.innerHTML = sLangValue;
			}
		}
	});

}


function getDeviceLang() {

	try {
		if( sDeviceFamily === 'LG' && window.PalmSystem && window.PalmSystem.country ) {
			var aDeviceCountry = JSON.parse(window.PalmSystem.country);
			if( aDeviceCountry && aDeviceCountry['country'] ) {
				switch( aDeviceCountry['country'] ) {
					case 'CZE':
						return 'cs';
					case 'DEU':
					case 'AUT':
						return 'de';
					case 'ESP':
					case 'MEX':
						return 'es';
					case 'FRA':
						return 'fr';
					case 'FIN':
						return 'fi';
					case 'GRC':
					case 'GRE':
					case 'ELL':
						return 'el';
					case 'HIN':
						return 'hi';
					case 'ITA':
						return 'it';
					case 'IND':
						return 'id';
					case 'JPN':
						return 'ja';
					case 'PRK':
					case 'KOR':
						return 'ko';
					case 'NOR':
						return 'no';
					case 'POL':
						return 'pl';
					case 'PRT':
						return 'pt';
					case 'RUS':
						return 'ru';
					case 'ROU':
					case 'RUM':
						return 'ro';
					case 'TUR':
						return 'tr';
					case 'UKR':
						return 'uk';
					case 'VNM':
						return 'vi';
					case 'ZHO':
					case 'CHI':
						return 'zh';
					default:
						return 'en';
				}
			}
		} else if( window.navigator.language ) {
			var sDeviceLang = window.navigator.language;
			if( sDeviceLang.length == 5 ) {
				sDeviceLang = sDeviceLang.substr(0, 2);
			}

			if( sDeviceLang && isLangAllowed(sDeviceLang) ) {
				return sDeviceLang;
			}
		}
	} catch( e ) { console.log(e.message) }

	return 'en';

}
