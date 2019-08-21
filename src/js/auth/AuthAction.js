/** UTILSリスト */
import Utils from '../utils/Utils';
import { sessionService } from 'redux-react-session';
/** SESSION */
import * as AuthSession from './AuthSession';

var authObjectLogin = function(auth, path) {
  var reAuth = auth;
  reAuth['viewHeader'] = 'block';
  // reAuth['astId'] = '2003';
  // reAuth['astPass'] = 'pass2003';
  if(!Utils.isEmpty(path)) {
    reAuth['path'] = path;
  } else {
    reAuth['path'] = '/customer';
  }
  return reAuth;
}

var authObjectLogout = function(auth) {
  auth['loginId'] = '';
  auth['viewHeader'] = 'none';
  auth['register'] = false;
  auth['chat'] = false;
  auth['path'] = '/';
  return auth;
}

var clearAuthSession = function() {
  AuthSession.doLogout().then(() => {
    sessionService.deleteSession();
    sessionService.deleteUser();
  }).catch(err => { throw (err); });
}

var doLogin = function(auth) {
  AuthSession.doLogin(auth).then(response => {
      const { token } = response;
      sessionService.saveSession({ token }).then(() => {
        sessionService.saveUser(auth).then(() => {
          // callBack(auth);
      });
    });
  });
};

var doLogout = function() {
  AuthSession.doLogout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
    }).catch(err => { throw (err); });
};

var loadAuthCookies = function(callBack) {
  const objAuth = sessionService.loadUser('COOKIES');
  console.log(objAuth);
  if(!Utils.isEmpty(objAuth)) {
    objAuth.then(function(value) {
      callBack(value);
    }).catch(function(error) {
      callBack(authObjectLogout({}));
    });
  } else {
    console.log(objAuth);
  }
}

var changeAuthPathCookies = function(callBack, path) {
  const objAuth = sessionService.loadUser('COOKIES');
  if(!Utils.isEmpty(objAuth)) {
    objAuth.then(function(value) {
      value['path'] = '/' + path;
      callBack(value);
    }).catch(function(error) {
      callBack(authObjectLogout({}));
    });
  } else {
    console.log(objAuth);
  }
}

var changeAuthRegisterCookies = function(callBack, register) {
  const objAuth = sessionService.loadUser('COOKIES');
  if(!Utils.isEmpty(objAuth)) {
    objAuth.then(function(value) {
      value['register'] = register;
      callBack(value);
    }).catch(function(error) {
      callBack(authObjectLogout({}));
    });
  } else {
    console.log(objAuth);
  }
}

var changeAuthChatCookies = function(callBack, chat) {
  const objAuth = sessionService.loadUser('COOKIES');
  if(!Utils.isEmpty(objAuth)) {
    objAuth.then(function(value) {
      value['chat'] = chat;
      callBack(value);
    }).catch(function(error) {
      callBack(authObjectLogout({}));
    });
  } else {
    console.log(objAuth);
  }
}

// var isLoginAuthCookies = function() {
//   const objAuth = sessionService.loadUser('COOKIES');
//   if(!Utils.isEmpty(objAuth)) {
//     objAuth.then(function(value) {
//       return value;
//     }).catch(function(error) {
//       return null;
//     });
//   } else {
//     console.log(objAuth);
//     return null;
//   }
// }

module.exports.authObjectLogin = authObjectLogin
module.exports.authObjectLogout = authObjectLogout
module.exports.clearAuthSession = clearAuthSession
module.exports.doLogin = doLogin;
module.exports.doLogout = doLogout;
module.exports.loadAuthCookies = loadAuthCookies;
module.exports.changeAuthPathCookies = changeAuthPathCookies;
module.exports.changeAuthRegisterCookies = changeAuthRegisterCookies;
module.exports.changeAuthChatCookies = changeAuthChatCookies;
// module.exports.isLoginAuthCookies = isLoginAuthCookies;
