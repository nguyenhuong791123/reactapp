/** MESSENGERS */
const SysMsg = require('../../msg/system');
/** UTILS */
import Utils from '../Utils';

var getApiUrl = function() {
  const host = SysMsg['sys']['api_host'];
  const post = SysMsg['sys']['api_port'];
  if(Utils.isEmpty(host) || Utils.isEmpty(post)) {
    return null;
  }
  return 'http://' + host + ':' + post;
}

var getFetch = function(content, ) {
  var url = getApiUrl();
  if(Utils.isEmpty(content) || Utils.isEmpty(url)) {
    alert('Content Or SysMsg[sys][api_url] URL Not Set !!!');
  } else {
    url = getApiUrl() + content;
    return fetch(
      url, { mode: "cors", method: "GET" }
    ).then(function(res) {
      return res.json();
    }).then(function(data) {
      return data;
    }).catch(function(error) {
      alert(error);
      console.log('Request failed At '+ url, error);
    });
  }
}

var postFetch = function(content, inData, basicAuth) {
  var url = getApiUrl();
  if(Utils.isEmpty(content) || Utils.isEmpty(url)) {
    alert('Content Or SysMsg[sys][api_url] URL Not Set !!!');
  } else {
    url = getApiUrl() + content;
    let dataBasic = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(inData),
      headers: {
        'Authorization': `Basic ` + basicAuth
        ,'Accept': 'application/json, application/xml, text/play, text/html, *.*'
        ,'Content-Type': 'application/json; charset=utf-8'
      }
    }
    let dataNotBasic = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(inData),
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*'
        ,'Content-Type': 'application/json; charset=utf-8'
      }
    }
    let data = (basicAuth)?dataBasic:dataNotBasic;
    return fetch(url, data
      ).then(function(res) {
        return res.json();
      }).then(function(data) {
        return data;
      }).catch(function(error) {
        alert(error);
        console.log('Request failed At '+ url, error);
      });
  }
}

module.exports.getApiUrl = getApiUrl;
module.exports.getFetch = getFetch;
module.exports.postFetch = postFetch;


// function postData(url, options, token) {
//     const headers = {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }

//     if (token !== undefined && token !== null) {
//         headers['Authorization'] = 'Bearer ' + token
//     }

//     // 既定のオプションには * が付いています
//     return fetch(url, {
//         method: "POST"
//         ,mode: "cors"
//         ,cache: "no-cache"
//         ,credentials: "same-origin"
//         ,headers: headers
//         ,redirect: "follow"
//         ,referrer: "no-referrer"
//         ,body: JSON.stringify(options)
//     }).then(status
//     ).then(res => {
//         if (res.ok) {
//           return res.json(); 
//         }
//     }).then(json => {
//         return json;
//     });
// }

// var status = function status(response) {
//     // raises an error in case response status is not a success
//     if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
//         return response
//     } else {
//         var error = new Error(response.statusText)
//         error.response = response
//         throw error
//     }
// }

// module.exports.postData = postData;
// module.exports.status = status;