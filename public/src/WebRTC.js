var sTransferNumber;
var oRingTone, oRingbackTone;
var oSipStack, oSipSessionRegister, oSipSessionCall, oSipSessionTransferCall;
var videoRemote, videoLocal, audioRemote;
var bFullScreen = false;
var oNotifICall;
var bDisableVideo = false;
var vMode = true;
var sRegistered = false;
var viewVideoLocal, viewVideoRemote, viewLocalScreencast; // <video> (webrtc) or <div> (webrtc4all)
var oConfigCall;
var oReadyStateTimer;
C = { divKeyPadWidth: 220 };
window.onload = function () {
    window.console && window.console.info && window.console.info("location=" + window.location);

    videoLocal = document.getElementById("video_local");
    videoRemote = document.getElementById("video_remote");
    audioRemote = document.getElementById("audio_remote");

    document.onkeyup = onKeyUp;
    document.body.onkeyup = onKeyUp;
    divCallCtrl.onmousemove = onDivCallCtrlMouseMove;

    // set debug level
    SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('smart.ippbx.disable_debug') == "true") ? "error" : "info");

    loadCredentials();
    // loadCallMode();
    // loadDivKeyPad();
    loadCallOptions();
    setDailerBoxWidthHeight();

    // Initialize call button
    uiBtnCallSetText("Call");

    var getPVal = function (PName) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === PName) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }

    var preInit = function () {
        // set default webrtc type (before initialization)
        var s_webrtc_type = getPVal("wt");
        var s_fps = getPVal("fps");
        var s_mvs = getPVal("mvs"); // maxVideoSize
        var s_mbwu = getPVal("mbwu"); // maxBandwidthUp (kbps)
        var s_mbwd = getPVal("mbwd"); // maxBandwidthUp (kbps)
        var s_za = getPVal("za"); // ZeroArtifacts
        var s_ndb = getPVal("ndb"); // NativeDebug

        if (s_webrtc_type) SIPml.setWebRtcType(s_webrtc_type);

        // initialize SIPML5
        SIPml.init(postInit);

        // set other options after initialization
        if (s_fps) SIPml.setFps(parseFloat(s_fps));
        if (s_mvs) SIPml.setMaxVideoSize(s_mvs);
        if (s_mbwu) SIPml.setMaxBandwidthUp(parseFloat(s_mbwu));
        if (s_mbwd) SIPml.setMaxBandwidthDown(parseFloat(s_mbwd));
        if (s_za) SIPml.setZeroArtifacts(s_za === "true");
        if (s_ndb == "true") SIPml.startNativeDebug();

        //var rinningApps = SIPml.getRunningApps();
        //var _rinningApps = Base64.decode(rinningApps);
        //tsk_utils_log_info(_rinningApps);
    }

    oReadyStateTimer = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(oReadyStateTimer);
            // initialize SIPML5
            preInit();
        }
    },
    500);

    /*if (document.readyState === "complete") {
        preInit();
    }
    else {
        document.onreadystatechange = function () {
             if (document.readyState === "complete") {
                preInit();
            }
        }
   }*/
};

function postInit() {
    // check for WebRTC support
    if (!SIPml.isWebRtcSupported()) {
        // is it chrome?
        if (SIPml.getNavigatorFriendlyName() == 'chrome') {
            if (confirm("You're using an old Chrome version or WebRTC is not enabled.\nDo you want to see how to enable WebRTC?")) {
                window.location = 'http://www.webrtc.org/running-the-demos';
            } else {
                window.location = "index.html";
            }
            return;
        } else {
            if (confirm("webrtc-everywhere extension is not installed. Do you want to install it?\nIMPORTANT: You must restart your browser after the installation.")) {
                window.location = 'https://github.com/sarandogou/webrtc-everywhere';
            }
            else {
                // Must do nothing: give the user the chance to accept the extension
                // window.location = "index.html";
            }
        }
    }

    // checks for WebSocket support
    if (!SIPml.isWebSocketSupported()) {
        if (confirm('Your browser don\'t support WebSockets.\nDo you want to download a WebSocket-capable browser?')) {
            window.location = 'https://www.google.com/intl/en/chrome/browser/';
        }
        else {
            window.location = "index.html";
        }
        return;
    }

    // FIXME: displays must be per session
    viewVideoLocal = videoLocal;
    viewVideoRemote = videoRemote;

    if (!SIPml.isWebRtcSupported()) {
        if (confirm('Your browser don\'t support WebRTC.\naudio/video calls will be disabled.\nDo you want to download a WebRTC-capable browser?')) {
            window.location = 'https://www.google.com/intl/en/chrome/browser/';
        }
    }

    btnRegister.disabled = false;
    document.body.style.cursor = 'default';
    oConfigCall = {
        audio_remote: audioRemote,
        video_local: viewVideoLocal,
        video_remote: viewVideoRemote,
        screencast_window_id: 0x00000000, // entire desktop
        bandwidth: { audio: undefined, video: undefined },
        video_size: { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined },
        events_listener: { events: '*', listener: onSipEventSession },
        sip_caps: [
                        { name: '+g.oma.sip-im' },
                        { name: 'language', value: '\"en,fr\"' }
        ]
    };
}

// function loadCallMode() {
//   if (window.localStorage) {
//     loadCallOptions();
    // window.localStorage.setItem('smart.ippbx.disable_video', chkCallMode.checked);
//   }
  // chkCallMode.onclick = function() {
  //   if(chkCallMode.checked) {
  //     divCallVideo.style.display = 'none';
  //     divCallAudio.style.display = 'block';
  //     buttonCallVideo.disabled = true;
  //     buttondivCallAudio.disabled = false;
  //   } else {
  //     divCallVideo.style.display = 'block';
  //     divCallAudio.style.display = 'none';
  //     buttonCallVideo.disabled = false;
  //     buttondivCallAudio.disabled = true;
  //   }
  //   // chkCallModeText.innerHTML = (!chkCallMode.checked ? 'Video' : 'Audio');
  //   window.localStorage.setItem('smart.ippbx.disable_video', chkCallMode.checked ? "true" : "false");
  //   loadCallOptions();
  // }
// }

function loadModeCall() {
  // chkCallMode.checked = mode;
  const mode = window.localStorage.getItem('smart.ippbx.disable_video');
  bDisableVideo = (mode !== "true")?true:false;
  trDivVideo.style.display = (bDisableVideo)?'none':'grid';
  txtCallStatus.innerHTML = 'Video '.concat(bDisableVideo?'Off':'On');
  window.localStorage.setItem('smart.ippbx.disable_video', bDisableVideo ? "true" : "false");
  setDailerBoxWidthHeight();
//   if(!mode) {
//     divCallVideo.style.display = 'inline-flex';
//     // divCallAudio.style.display = 'none';
//     buttonCallVideo.disabled = false;
//     // buttonCallAudio.disabled = true;
//     txtCallStatus.innerHTML = 'Video Mode';
//   } else {
//     divCallVideo.style.display = 'none';
//     // divCallAudio.style.display = 'inline-flex';
//     buttonCallVideo.disabled = true;
//     // buttonCallAudio.disabled = false;
//     txtCallStatus.innerHTML = 'Audio Mode';
//   }

  setTimeout(function () { txtCallStatus.innerHTML = '';  }, 2500);
}

function loadCallOptions() {
    if (window.localStorage) {
        var s_value;
        if ((s_value = window.localStorage.getItem('smart.ippbx.phone_number'))) txtPhoneNumber.value = s_value;
        bDisableVideo = (window.localStorage.getItem('smart.ippbx.disable_video') == "true");
        // loadModeCall(bDisableVideo);

        setVolumeMode(window.localStorage.getItem('smart.ippbx.volume_mode') == 'true');
        // chkCallMode.checked = bDisableVideo;
        // txtCallStatus.innerHTML = '<i>Video ' + (bDisableVideo ? 'disabled' : 'enabled') + '</i>';
        if(sRegistered) trDivVideo.style.display = (bDisableVideo)?'none':'grid';
    }
}

function setVolumeMode(volumeMode) {
  vMode = volumeMode;
  window.localStorage.setItem('smart.ippbx.volume_mode', volumeMode ? "true" : "false")
  btnVolumeOff.disabled = !volumeMode;
  divVolumeOff.style.display = !volumeMode?'none':'-webkit-inline-box';
  btnVolumeUp.disabled = volumeMode;
  divVolumeUp.style.display = volumeMode?'none':'-webkit-inline-box';
  txtCallStatus.innerHTML = 'Sound '.concat(!volumeMode?'On':'Off');

  setTimeout(function () { txtCallStatus.innerHTML = '';  }, 2500);
}

// function loadDivKeyPad() {
//   var div = document.getElementById("divKeyPad");
//   div.onmouseout = function() {
//     div.style.display = 'none';
//   };
//   div.onmouseover = function() {
//     div.style.display = 'block';
//   };
//
//   var input = document.getElementById("txtPhoneNumber");
//   // var hr = document.getElementById("hrPhoneNumber");
//   input.onfocus = function() {
//     div.style.display = 'block';
//     // hr.style.borderBottom = '2px solid rgb(0, 188, 212)';
//   };
//   input.onmouseover = function() {
//     div.style.display = 'block';
//   };
//   // input.onmouseout = function() {
//   //   hr.style.borderBottom = 'none rgb(224, 224, 224);';
//   // };
// }

// function loadCallOptions() {
//     if (window.localStorage) {
//         var s_value;
//         if ((s_value = window.localStorage.getItem('smart.ippbx.call.phone_number'))) txtPhoneNumber.value = s_value;
//         bDisableVideo = (window.localStorage.getItem('smart.ippbx.disable_video') == "true");
//         // chkCallMode.value = !bDisableVideo;
//         // chkCallMode.checked = !bDisableVideo;
//         // chkCallModeText.innerHTML = (bDisableVideo ? 'Video' : 'Audio');
//         txtCallStatus.innerHTML = '<i>Video ' + (bDisableVideo ? 'disabled' : 'enabled') + '</i>';
//     }
// }

function saveCallOptions() {
    if (window.localStorage) {
        window.localStorage.setItem('smart.ippbx.phone_number', txtPhoneNumber.value);
        window.localStorage.setItem('smart.ippbx.disable_video', bDisableVideo ? "true" : "false");
    }
}

function loadCredentials() {
  if (window.localStorage) {
    // IE retuns 'null' if not defined
    var s_value;
    // if ((s_value = window.localStorage.getItem('smart.ippbx.display_name'))) txtDisplayName.value = s_value;
    if ((s_value = window.localStorage.getItem('smart.ippbx.impi'))) txtPrivateIdentity.value = s_value;
    if ((s_value = window.localStorage.getItem('smart.ippbx.impu'))) txtPublicIdentity.value = s_value;
    if ((s_value = window.localStorage.getItem('smart.ippbx.password'))) txtPassword.value = s_value;
    if ((s_value = window.localStorage.getItem('smart.ippbx.realm'))) txtRealm.value = s_value;
    if ((s_value = window.localStorage.getItem('smart.ippbx.websocket_server_url'))) txtWs.value = s_value;
    if ((s_value = window.localStorage.getItem('smart.ippbx.sip_outboundproxy_url'))) txtUdpProxy.value = s_value;
  } else {
    txtCallStatus.innerHTML = 'Not Setting Info !!!';
    setTimeout(function () { if (!oSipSessionCall) txtCallStatus.innerHTML = ''; }, 2500);
      //txtDisplayName.value = "005";
      //txtPrivateIdentity.value = "005";
      //txtPublicIdentity.value = "sip:005@sip2sip.info";
      //txtPassword.value = "005";
      //txtRealm.value = "sip2sip.info";
      //txtPhoneNumber.value = "701020";
  }
};

function saveCredentials() {
  if (window.localStorage) {
    // window.localStorage.setItem('smart.ippbx.display_name', txtDisplayName.value);
    window.localStorage.setItem('smart.ippbx.impi', txtPrivateIdentity.value);
    window.localStorage.setItem('smart.ippbx.impu', txtPublicIdentity.value);
    window.localStorage.setItem('smart.ippbx.password', txtPassword.value);
    window.localStorage.setItem('smart.ippbx.realm', txtRealm.value);
    window.localStorage.setItem('smart.ippbx.websocket_server_url', txtWs.value);
    window.localStorage.setItem('smart.ippbx.sip_outboundproxy_url', txtUdpProxy.value);

    txtCallStatus.innerHTML = 'Setting Info Saved';
    setTimeout(function () { if (!oSipSessionCall) txtCallStatus.innerHTML = ''; }, 2500);
  }
};

// function closeDailerBox() {
//     const a = document.getElementById('a_dailer_box');
//     if(a !== undefined) a.click();
// }

function sipSetting() {
    divSettingInfo.style.display = 'grid';
    divDailerBox.style.display = 'none';
    trDivVideo.style.display = 'none';
    setDailerBoxWidthHeight();
}

function sipCloseSetting() {
    divSettingInfo.style.display = 'none';
    divDailerBox.style.display = 'grid';
    trDivVideo.style.display = (bDisableVideo)?'none':'grid';
    setDailerBoxWidthHeight();
}

function sipSaveInfo() {
    sipCloseSetting();
    saveCredentials();
    setDailerBoxWidthHeight();
}

function setDailerBoxWidthHeight() {
    const divDailer = document.getElementById('object_div_dailer_box');
    if(divDailer == undefined) return;
    const divParent = parent.document.getElementById('div_dailer_box');
    if(divParent == undefined || divParent.childNodes[0] == undefined) return;
    divParent.childNodes[0].style.width = (divDailer.offsetWidth + 6) + 'px';
    divParent.childNodes[0].style.height = (divDailer.offsetHeight + 6) + 'px';
}

// sends SIP REGISTER request to login
function sipRegister() {
    // catch exception for IE (DOM not ready)
    try {
        btnRegister.disabled = true;
        if (!txtRealm.value || !txtPrivateIdentity.value || !txtPublicIdentity.value) {
            // txtRegStatus.innerHTML = '<b>Please fill madatory fields (*)</b>';
            txtCallStatus.innerHTML = '<b>Please fill madatory fields (*)</b>';
            btnRegister.disabled = sRegistered = false;
            btnRegister.style.display = 'block';
            setTimeout(function () { if (!oSipSessionCall) txtCallStatus.innerHTML = ''; }, 3000);
            return;
        }
        var o_impu = tsip_uri.prototype.Parse(txtPublicIdentity.value);
        if (!o_impu || !o_impu.s_user_name || !o_impu.s_host) {
            // txtRegStatus.innerHTML = "<b>[" + txtPublicIdentity.value + "] is not a valid Public identity</b>";
            txtCallStatus.innerHTML = "<b>[" + txtPublicIdentity.value + "] is not a valid Public identity</b>";
            btnRegister.disabled = sRegistered = false;
            btnRegister.style.display = 'block';
            setTimeout(function () { if (!oSipSessionCall) txtCallStatus.innerHTML = ''; }, 3000);
            return;
        }

        // enable notifications if not already done
        if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
            window.webkitNotifications.requestPermission();
        }

        // save credentials
        saveCredentials();

        // update debug level to be sure new values will be used if the user haven't updated the page
        SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('smart.ippbx.disable_debug') == "true") ? "error" : "info");

        // create SIP stack
        oSipStack = new SIPml.Stack({
            realm: txtRealm.value,
            impi: txtPrivateIdentity.value,
            impu: txtPublicIdentity.value,
            password: txtPassword.value,
            // display_name: txtDisplayName.value,
            websocket_proxy_url: txtWs.value,
            outbound_proxy_url: txtUdpProxy.value,
            ice_servers: txtIce.value,
            enable_rtcweb_breaker: (window.localStorage ? window.localStorage.getItem('smart.ippbx.enable_rtcweb_breaker') == "true" : false),
            events_listener: { events: '*', listener: onSipEventStack },
            enable_early_ims: (window.localStorage ? window.localStorage.getItem('smart.ippbx.disable_early_ims') != "true" : true), // Must be true unless you're using a real IMS network
            enable_media_stream_cache: (window.localStorage ? window.localStorage.getItem('smart.ippbx.enable_media_caching') == "true" : false),
            bandwidth: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('smart.ippbx.bandwidth')) : null), // could be redefined a session-level
            video_size: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('smart.ippbx.video_size')) : null), // could be redefined a session-level
            sip_headers: [
                    { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04' },
                    { name: 'Organization', value: 'Doubango Telecom' }
            ]
        });

        if (oSipStack.start() != 0) {
          // txtRegStatus.innerHTML = '<b>Failed to start the SIP stack</b>';
          sRegistered = false;
          txtCallStatus.innerHTML = '<b>Failed to start the SIP stack</b>';
        } else {
          if(txtPhoneNumber.value != '') {
            sRegistered = true;
            var newClass = btnCall.className.replace(' button_disabled', '') + ' button_dailer_green';
            btnCall.className = newClass;
          }
          return;
        }
    } catch (e) {
        // txtRegStatus.innerHTML = "<b>2:" + e + "</b>";
        sRegistered = false;
        txtCallStatus.innerHTML = "<b>2:" + e + "</b>";
    }
    // btnRegister.disabled = false;
    // btnRegister.style.display = 'block';
}

// sends SIP REGISTER (expires=0) to logout
function sipUnRegister() {
    if (oSipStack) {
      sRegistered = false;
      oSipStack.stop(); // shutdown all sessions
      allDisabled();
    }
}

function allDisabled() {
  loadCallButtonMode();
  loadDisableButtonMode();
  // var newClass = btnCall.className.replace(' button_dailer_green', '').replace(' button_disabled', '') + ' button_disabled';
  // btnCall.className = newClass;
}

// makes a call (SIP INVITE)
function sipCall(s_type) {
    if (oSipStack && !oSipSessionCall && !tsk_string_is_null_or_empty(txtPhoneNumber.value)) {
        if (s_type == 'call-screenshare') {
            if (!SIPml.isScreenShareSupported()) {
                alert('Screen sharing not supported. Are you using chrome 26+?');
                return;
            }
            if (!location.protocol.match('https')) {
                if (confirm("Screen sharing requires https://. Do you want to be redirected?")) {
                    sipUnRegister();
                    window.location = 'https://ns313841.ovh.net/call.htm';
                }
                return;
            }
        }
        btnCall.disabled = true;
        // var newClass = btnCall.className.replace(' button_dailer_green', '').replace(' button_disabled', '') + ' button_disabled';
        // btnCall.className = newClass;
        btnHangUp.disabled = false;
        // newClass = btnHangUp.className.replace(' button_dailer_red', '').replace(' button_disabled', '') + ' button_dailer_red';
        // btnHangUp.className = newClass;

        if (window.localStorage) {
            oConfigCall.bandwidth = tsk_string_to_object(window.localStorage.getItem('smart.ippbx.bandwidth')); // already defined at stack-level but redifined to use latest values
            oConfigCall.video_size = tsk_string_to_object(window.localStorage.getItem('smart.ippbx.video_size')); // already defined at stack-level but redifined to use latest values
        }

        // create call session
        oSipSessionCall = oSipStack.newSession(s_type, oConfigCall);
        // make call
        if (oSipSessionCall.call(txtPhoneNumber.value) != 0) {
            oSipSessionCall = null;
            txtCallStatus.value = 'Failed to make call';
            btnCall.disabled = false;
            btnHangUp.disabled = true;
            return;
        }

        saveCallOptions();
        } else if (oSipSessionCall) {
        // newClass = btnTransfer.className.replace(' button_dailer_green_ligth', '').replace(' button_disabled', '') + ' button_dailer_green_ligth';
        // btnTransfer.className = newClass;
        txtCallStatus.innerHTML = '<i>Connecting...</i>';
        oSipSessionCall.accept(oConfigCall);
    }
}

// Share entire desktop aor application using BFCP or WebRTC native implementation
function sipShareScreen() {
    if (SIPml.getWebRtcType() === 'w4a') {
        // Sharing using BFCP -> requires an active session
        if (!oSipSessionCall) {
            txtCallStatus.innerHTML = '<i>No active session</i>';
            return;
        }
        if (oSipSessionCall.bfcpSharing) {
            if (oSipSessionCall.stopBfcpShare(oConfigCall) != 0) {
                txtCallStatus.value = 'Failed to stop BFCP share';
            } else {
                oSipSessionCall.bfcpSharing = false;
            }
        } else {
            oConfigCall.screencast_window_id = 0x00000000;
            if (oSipSessionCall.startBfcpShare(oConfigCall) != 0) {
                txtCallStatus.value = 'Failed to start BFCP share';
            } else {
                oSipSessionCall.bfcpSharing = true;
            }
        }
    }
    else {
        sipCall('call-screenshare');
    }
}

// transfers the call
function sipTransfer() {
    if (oSipSessionCall) {
        // var s_destination = prompt('Enter destination number', '');
        var s_destination = txtPhoneNumber.value;
        if(s_destination == undefined || s_destination == '') {
          txtCallStatus.innerHTML = '<i>Please input extension</i>';
          return;
        }
        if (!tsk_string_is_null_or_empty(s_destination)) {
            btnTransfer.disabled = true;
            if (oSipSessionCall.transfer(s_destination) != 0) {
                txtCallStatus.innerHTML = '<i>Call transfer failed</i>';
                btnTransfer.disabled = false;
                return;
            }
            txtCallStatus.innerHTML = '<i>Transfering the call...</i>';
        }
    }
}

// holds or resumes the call
function sipToggleHoldResume() {
    if (oSipSessionCall) {
        var i_ret;
        btnHoldResume.disabled = true;
        txtCallStatus.innerHTML = oSipSessionCall.bHeld ? '<i>Resuming the call...</i>' : '<i>Holding the call...</i>';
        i_ret = oSipSessionCall.bHeld ? oSipSessionCall.resume() : oSipSessionCall.hold();
        if (i_ret != 0) {
            txtCallStatus.innerHTML = '<i>Hold / Resume failed</i>';
            btnHoldResume.disabled = false;
            return;
        }
    }
}

// Mute or Unmute the call
function sipToggleMute() {
    if (oSipSessionCall) {
        var i_ret;
        var bMute = !oSipSessionCall.bMute;
        txtCallStatus.innerHTML = bMute ? '<i>Mute the call...</i>' : '<i>Unmute the call...</i>';
        i_ret = oSipSessionCall.mute('audio'/*could be 'video'*/, bMute);
        if (i_ret != 0) {
            txtCallStatus.innerHTML = '<i>Mute / Unmute failed</i>';
            return;
        }
        oSipSessionCall.bMute = bMute;
        btnMute.value = bMute ? "Unmute" : "Mute";
    }
}

// terminates the call (SIP BYE or CANCEL)
function sipHangUp() {
    if (oSipSessionCall) {
      var newClass = btnCall.className.replace(' button_income', '');
      btnCall.className = newClass;
      allDisabled();
      txtCallStatus.innerHTML = '<i>Terminating the call...</i>';
      oSipSessionCall.hangup({ events_listener: { events: '*', listener: onSipEventSession } });
    }
}

function sipSendDTMF(c) {
  if(c) {
    try { if(!vMode) { dtmfTone.play(); } } catch (e) { }
    if(c == 'AC') {
      // txtPhoneNumber.value = '';
      return;
    } else if(c == 'CL') {
      txtPhoneNumber.value = '';
      return;
    } else if(c != 'AC' && c != '#') {
      var val = txtPhoneNumber.value;
      if(c == '-1') {
        if(val != '' && val.length > 0) {
          val = val.substring(0, val.length-1);
        }
        txtPhoneNumber.value = val;
      } else {
        txtPhoneNumber.value = val + c;
      }
    }
    loadCallButtonMode();

    if (oSipSessionCall && c) {
      if (oSipSessionCall.dtmf(c) == 0) {
        // try { dtmfTone.play(); } catch (e) { }
      }
    }
  }
    // if (oSipSessionCall && c) {
    //     if (oSipSessionCall.dtmf(c) == 0) {
    //         try { dtmfTone.play(); } catch (e) { }
    //     }
    // }
}

function loadCallButtonMode() {
  if(txtPhoneNumber.value != '' && oSipStack && sRegistered) {
    var newClass = btnCall.className.replace(' button_dailer_green', '').replace(' button_disabled', '') + ' button_dailer_green';
    btnCall.className = newClass;
  } else if(txtPhoneNumber.value == '') {
    var newClass = btnCall.className.replace(' button_dailer_green', '').replace(' button_disabled', '') + ' button_disabled';
    btnCall.className = newClass;
  }
}

function loadDisableButtonMode() {
  btnHangUp.disabled = true;
  newClass = btnHangUp.className.replace(' button_dailer_red', '').replace(' button_disabled', '') + ' button_disabled';
  btnHangUp.className = newClass;
  btnTransfer.disabled = true;
  newClass = btnTransfer.className.replace(' button_dailer_green_ligth', '').replace(' button_disabled', '') + ' button_disabled';
  btnTransfer.className = newClass;
}

function startRingTone() {
    try { ringtone.play(); }
    catch (e) { }
}

function stopRingTone() {
    try { ringtone.pause(); }
    catch (e) { }
}

function startRingbackTone() {
    try { ringbacktone.play(); }
    catch (e) { }
}

function stopRingbackTone() {
    try { ringbacktone.pause(); }
    catch (e) { }
}

function toggleFullScreen() {
    if (videoRemote.webkitSupportsFullscreen) {
        fullScreen(!videoRemote.webkitDisplayingFullscreen);
    }
    else {
        fullScreen(!bFullScreen);
    }
}

function openKeyPad() {
    divKeyPad.style.visibility = 'visible';
    // divKeyPad.style.left = ((document.body.clientWidth - C.divKeyPadWidth) >> 1) + 'px';
    // divKeyPad.style.top = '70px';
    divGlassPanel.style.visibility = 'visible';
}

function closeKeyPad() {
    // divKeyPad.style.left = '0px';
    // divKeyPad.style.top = '0px';
    divKeyPad.style.visibility = 'hidden';
    divGlassPanel.style.visibility = 'hidden';
}

function fullScreen(b_fs) {
    bFullScreen = b_fs;
    if (tsk_utils_have_webrtc4native() && bFullScreen && videoRemote.webkitSupportsFullscreen) {
        if (bFullScreen) {
            videoRemote.webkitEnterFullScreen();
        }
        else {
            videoRemote.webkitExitFullscreen();
        }
    }
    else {
        if (tsk_utils_have_webrtc4npapi()) {
            try { if (window.__o_display_remote) window.__o_display_remote.setFullScreen(b_fs); }
            catch (e) {
              //divVideo.setAttribute("class", b_fs ? "full-screen" : "normal-screen");
            }
        }
        else {
            //divVideo.setAttribute("class", b_fs ? "full-screen" : "normal-screen");
        }
    }
}

function showNotifICall(s_number) {
    // permission already asked when we registered
    if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
        if (oNotifICall) {
            oNotifICall.cancel();
        }
        oNotifICall = window.webkitNotifications.createNotification('images/png/sipml-34x39.png', 'Incaming call', 'Incoming call from ' + s_number);
        oNotifICall.onclose = function () { oNotifICall = null; };
        oNotifICall.show();
    }
}

function onKeyUp(evt) {
  evt = (evt || window.event);
  if (evt.keyCode == 27) {
    fullScreen(false);
  } else if (evt.ctrlKey && evt.shiftKey) { // CTRL + SHIFT
    if (evt.keyCode == 65 || evt.keyCode == 86) { // A (65) or V (86)
      bDisableVideo = (evt.keyCode == 65);
      txtCallStatus.innerHTML = '<i>Video ' + (bDisableVideo ? 'disabled' : 'enabled') + '</i>';
      window.localStorage.setItem('smart.ippbx.disable_video', bDisableVideo);
    }
  }
}

function onDivCallCtrlMouseMove(evt) {
  try {
    if (tsk_utils_have_stream()) {
      btnCall.disabled = (!tsk_utils_have_stream() || !oSipSessionRegister || !oSipSessionRegister.is_connected());
      document.getElementById("divCallCtrl").onmousemove = null; // unsubscribe
    }
  }
  catch (e) { }
}

function uiOnConnectionEvent(b_connected, b_connecting) { // should be enum: connecting, connected, terminating, terminated
  btnRegister.disabled = b_connected || b_connecting;
  divRegister.style.display = (b_connected || b_connecting)?'none':'inline-flex';
  btnUnRegister.disabled = !b_connected && !b_connecting;
  divUnRegister.style.display = (!b_connected && !b_connecting)?'none':'inline-flex';
  btnCall.disabled = !(b_connected && tsk_utils_have_webrtc() && tsk_utils_have_stream());
  btnHangUp.disabled = !oSipSessionCall;
  sRegistered = (b_connected || b_connecting);
  allDisabled();
}

function uiVideoDisplayEvent(b_local, b_added) {
  var o_elt_video = b_local ? videoLocal : videoRemote;
  if (b_added) {
    o_elt_video.style.opacity = 1;
    uiVideoDisplayShowHide(true);
  } else {
    o_elt_video.style.opacity = 0;
    fullScreen(false);
  }
}

function uiVideoDisplayShowHide(b_show) {
  if (b_show) {
    divVideo.style.height = navigator.appName == 'Microsoft Internet Explorer' ? '100%' : '29.5em';
    divVideo.style.width = navigator.appName == 'Microsoft Internet Explorer' ? '100%' : '21em';
    divVideo.style.display = 'grid';
  } else {
    divVideo.style.height = divVideo.style.width = '0px';
    divVideo.style.display = 'none';
  }
  btnFullScreen.disabled = !b_show;
}

function uiDisableCallOptions() {
  if (window.localStorage) {
    window.localStorage.setItem('smart.ippbx.disable_callbtn_options', 'true');
    uiBtnCallSetText('Call');
    alert('Use expert view to enable the options again (/!\\requires re-loading the page)');
  }
}

function uiBtnCallSetText(s_text) {
  switch (s_text) {
    case "Call":
    {
      btnCall.onclick = function () { sipCall(bDisableVideo ? 'call-audio' : 'call-audiovideo'); };
      break;
    }
    default:
    {
      btnCall.onclick = function () { sipCall(bDisableVideo ? 'call-audio' : 'call-audiovideo'); };
      break;
    }
  }
}

function uiCallTerminated(s_description) {
  uiBtnCallSetText("Call");
  btnHangUp.value = 'HangUp';
  btnHoldResume.value = 'hold';
  btnMute.value = "Mute";
  btnCall.disabled = false;
  btnHangUp.disabled = true;
  if (window.btnBFCP) window.btnBFCP.disabled = true;

  oSipSessionCall = null;
  stopRingbackTone();
  stopRingTone();

  txtCallStatus.innerHTML = "<i>" + s_description + "</i>";
  uiVideoDisplayShowHide(false);
  divCallOptions.style.opacity = 0;
  divCallOptions.style.position = 'absolute';

  if (oNotifICall) {
    oNotifICall.cancel();
    oNotifICall = null;
  }

  uiVideoDisplayEvent(false, false);
  uiVideoDisplayEvent(true, false);

  if (!oSipSessionCall) {
    sRegistered = oSipSessionCall;
    allDisabled();
  }

  setTimeout(function () { if (!oSipSessionCall) txtCallStatus.innerHTML = ''; }, 2500);
}

// Callback function for SIP Stacks
function onSipEventStack(e /*SIPml.Stack.Event*/) {
    tsk_utils_log_info('==stack event = ' + e.type);
    switch (e.type) {
        case 'started':
            {
                // catch exception for IE (DOM not ready)
                try {
                    // LogIn (REGISTER) as soon as the stack finish starting
                    oSipSessionRegister = this.newSession('register', {
                        expires: 200,
                        events_listener: { events: '*', listener: onSipEventSession },
                        sip_caps: [
                                    { name: '+g.oma.sip-im', value: null },
                                    //{ name: '+sip.ice' }, // rfc5768: FIXME doesn't work with Polycom TelePresence
                                    { name: '+audio', value: null },
                                    { name: 'language', value: '\"en,fr\"' }
                        ]
                    });
                    oSipSessionRegister.register();
                }
                catch (e) {
                    // txtRegStatus.value = txtRegStatus.innerHTML = "<b>1:" + e + "</b>";
                    txtCallStatus.innerHTML = "<b>1:" + e + "</b>";
                    btnRegister.disabled = false;
                }
                break;
            }
        case 'stopping': case 'stopped': case 'failed_to_start': case 'failed_to_stop':
            {
                var bFailure = (e.type == 'failed_to_start') || (e.type == 'failed_to_stop');
                oSipStack = null;
                oSipSessionRegister = null;
                oSipSessionCall = null;

                uiOnConnectionEvent(false, false);

                stopRingbackTone();
                stopRingTone();

                uiVideoDisplayShowHide(false);
                divCallOptions.style.opacity = 0;
                divCallOptions.style.position = 'absolute';

                // txtCallStatus.innerHTML = '';
                // txtRegStatus.innerHTML = bFailure ? "<i>Disconnected: <b>" + e.description + "</b></i>" : "<i>Disconnected</i>";
                // txtCallStatus.innerHTML = bFailure ? "<i>" + e.description + "</i>" : "<i>Disconnected</i>";
                break;
            }

        case 'i_new_call':
            {
                if (oSipSessionCall) {
                    // do not accept the incoming call if we're already 'in call'
                    e.newSession.hangup(); // comment this line for multi-line support
                } else {
                    oSipSessionCall = e.newSession;
                    // start listening for events
                    oSipSessionCall.setConfiguration(oConfigCall);

                    uiBtnCallSetText('Answer');
                    // btnHangUp.value = 'Reject';
                    btnCall.disabled = false;
                    var newClass = btnCall.className + ' button_income';
                    btnCall.className = newClass;
                    btnHangUp.disabled = false;
                    newClass = btnHangUp.className.replace(' button_dailer_red', '').replace(' button_disabled', '') + ' button_dailer_red';
                    btnHangUp.className = newClass;
                    // SyncRecognizeGCS(videoLocal.src, 'LINEAR16', 16000);

                    startRingTone();

                    var sRemoteNumber = (oSipSessionCall.getRemoteFriendlyName() || 'unknown');
                    txtCallStatus.innerHTML = "<i>Incoming call from [<b>" + sRemoteNumber + "</b>]</i>";
                    showNotifICall(sRemoteNumber);
                }
                break;
            }

        case 'm_permission_requested':
            {
                divGlassPanel.style.visibility = 'visible';
                break;
            }
        case 'm_permission_accepted':
        case 'm_permission_refused':
            {
                divGlassPanel.style.visibility = 'hidden';
                if (e.type == 'm_permission_refused') {
                    uiCallTerminated('Media stream permission denied');
                }
                break;
            }

        case 'starting': default: break;
    }

    setTimeout(function () { txtCallStatus.innerHTML = '';  }, 2500);
};

// Callback function for SIP sessions (INVITE, REGISTER, MESSAGE...)
function onSipEventSession(e /* SIPml.Session.Event */) {
    tsk_utils_log_info('==session event = ' + e.type);

    switch (e.type) {
        case 'connecting': case 'connected':
            {
                var bConnected = (e.type == 'connected');
                if (e.session == oSipSessionRegister) {
                    uiOnConnectionEvent(bConnected, !bConnected);
                    // txtRegStatus.innerHTML = "<i>" + e.description + "</i>";
                    txtCallStatus.innerHTML = "<i>" + e.description + "</i>";
                } else if (e.session == oSipSessionCall) {
                    btnHangUp.value = 'HangUp';

                    btnCall.disabled = true;
                    var newClass = btnCall.className.replace(' button_income', '');
                    btnCall.className = newClass;
                    btnHangUp.disabled = false;
                    newClass = btnHangUp.className.replace(' button_dailer_red', '').replace(' button_disabled', '') + ' button_dailer_red';
                    btnHangUp.className = newClass;
                    btnTransfer.disabled = false;
                    newClass = btnTransfer.className.replace(' button_dailer_green_ligth', '').replace(' button_disabled', '') + ' button_dailer_green_ligth';
                    btnTransfer.className = newClass;

                    if (window.btnBFCP) window.btnBFCP.disabled = false;
                    if (bConnected) {
                        stopRingbackTone();
                        stopRingTone();

                        if (oNotifICall) {
                            oNotifICall.cancel();
                            oNotifICall = null;
                        }
                    }

                    txtCallStatus.innerHTML = "<i>" + e.description + "</i>";
                    divCallOptions.style.opacity = bConnected ? 1 : 0;
                    divCallOptions.style.position = bConnected ? 'inherit' : 'absolute';

                    if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback
                        uiVideoDisplayEvent(false, true);
                        uiVideoDisplayEvent(true, true);
                    }
                }
                break;
            } // 'connecting' | 'connected'
        case 'terminating': case 'terminated':
            {
                if (e.session == oSipSessionRegister) {
                    uiOnConnectionEvent(false, false);

                    oSipSessionCall = null;
                    oSipSessionRegister = null;

                    // txtRegStatus.innerHTML = "<i>" + e.description + "</i>";
                    txtCallStatus.innerHTML = "<i>" + e.description + "</i>";
                }
                else if (e.session == oSipSessionCall) {
                    uiCallTerminated(e.description);
                }
                break;
            } // 'terminating' | 'terminated'

        case 'm_stream_video_local_added':
            {
                if (e.session == oSipSessionCall) {
                    uiVideoDisplayEvent(true, true);
                }
                break;
            }
        case 'm_stream_video_local_removed':
            {
                if (e.session == oSipSessionCall) {
                    uiVideoDisplayEvent(true, false);
                }
                break;
            }
        case 'm_stream_video_remote_added':
            {
                if (e.session == oSipSessionCall) {
                    uiVideoDisplayEvent(false, true);
                }
                break;
            }
        case 'm_stream_video_remote_removed':
            {
                if (e.session == oSipSessionCall) {
                    uiVideoDisplayEvent(false, false);
                }
                break;
            }

        case 'm_stream_audio_local_added':
        case 'm_stream_audio_local_removed':
        case 'm_stream_audio_remote_added':
        case 'm_stream_audio_remote_removed':
            {
                break;
            }

        case 'i_ect_new_call':
            {
                oSipSessionTransferCall = e.session;
                break;
            }

        case 'i_ao_request':
            {
                if (e.session == oSipSessionCall) {
                    var iSipResponseCode = e.getSipResponseCode();
                    if (iSipResponseCode == 180 || iSipResponseCode == 183) {
                        startRingbackTone();
                        txtCallStatus.innerHTML = '<i>Remote ringing...</i>';
                    }
                }
                break;
            }

        case 'm_early_media':
            {
                if (e.session == oSipSessionCall) {
                    stopRingbackTone();
                    stopRingTone();
                    txtCallStatus.innerHTML = '<i>Early media started</i>';
                }
                break;
            }

        case 'm_local_hold_ok':
            {
                if (e.session == oSipSessionCall) {
                    if (oSipSessionCall.bTransfering) {
                        oSipSessionCall.bTransfering = false;
                        // this.AVSession.TransferCall(this.transferUri);
                    }
                    btnHoldResume.value = 'Resume';
                    btnHoldResume.disabled = false;
                    txtCallStatus.innerHTML = '<i>Call placed on hold</i>';
                    oSipSessionCall.bHeld = true;
                }
                break;
            }
        case 'm_local_hold_nok':
            {
                if (e.session == oSipSessionCall) {
                    oSipSessionCall.bTransfering = false;
                    btnHoldResume.value = 'Hold';
                    btnHoldResume.disabled = false;
                    txtCallStatus.innerHTML = '<i>Failed to place remote party on hold</i>';
                }
                break;
            }
        case 'm_local_resume_ok':
            {
                if (e.session == oSipSessionCall) {
                    oSipSessionCall.bTransfering = false;
                    btnHoldResume.value = 'Hold';
                    btnHoldResume.disabled = false;
                    txtCallStatus.innerHTML = '<i>Call taken off hold</i>';
                    oSipSessionCall.bHeld = false;

                    if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback yet
                        uiVideoDisplayEvent(false, true);
                        uiVideoDisplayEvent(true, true);
                    }
                }
                break;
            }
        case 'm_local_resume_nok':
            {
                if (e.session == oSipSessionCall) {
                    oSipSessionCall.bTransfering = false;
                    btnHoldResume.disabled = false;
                    txtCallStatus.innerHTML = '<i>Failed to unhold call</i>';
                }
                break;
            }
        case 'm_remote_hold':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = '<i>Placed on hold by remote party</i>';
                }
                break;
            }
        case 'm_remote_resume':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = '<i>Taken off hold by remote party</i>';
                }
                break;
            }
        case 'm_bfcp_info':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = 'BFCP Info: <i>' + e.description + '</i>';
                }
                break;
            }

        case 'o_ect_trying':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = '<i>Call transfer in progress...</i>';
                }
                break;
            }
        case 'o_ect_accepted':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = '<i>Call transfer accepted</i>';
                }
                break;
            }
        case 'o_ect_completed':
        case 'i_ect_completed':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = '<i>Call transfer completed</i>';
                    btnTransfer.disabled = false;
                    if (oSipSessionTransferCall) {
                        oSipSessionCall = oSipSessionTransferCall;
                    }
                    oSipSessionTransferCall = null;
                }
                break;
            }
        case 'o_ect_failed':
        case 'i_ect_failed':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = '<i>Call transfer failed</i>';
                    btnTransfer.disabled = false;
                }
                break;
            }
        case 'o_ect_notify':
        case 'i_ect_notify':
            {
                if (e.session == oSipSessionCall) {
                    txtCallStatus.innerHTML = "<i>Call Transfer: <b>" + e.getSipResponseCode() + " " + e.description + "</b></i>";
                    if (e.getSipResponseCode() >= 300) {
                        if (oSipSessionCall.bHeld) {
                            oSipSessionCall.resume();
                        }
                        btnTransfer.disabled = false;
                    }
                }
                break;
            }
        case 'i_ect_requested':
            {
                if (e.session == oSipSessionCall) {
                    var s_message = "Do you accept call transfer to [" + e.getTransferDestinationFriendlyName() + "]?";//FIXME
                    if (confirm(s_message)) {
                        txtCallStatus.innerHTML = "<i>Call transfer in progress...</i>";
                        oSipSessionCall.acceptTransfer();
                        break;
                    }
                    oSipSessionCall.rejectTransfer();
                }
                break;
            }
    }

    setTimeout(function () { txtCallStatus.innerHTML = '';  }, 2500);
}
