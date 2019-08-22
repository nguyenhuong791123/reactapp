/** UTILSリスト */
// import Utils from '../utils/Utils';
import { sessionService } from 'redux-react-session';
/** SESSION */
// import * as AuthSession from './AuthSession';

// const authObjectLogin = (auth, path) => {
//   var reAuth = auth;
//   reAuth['viewHeader'] = 'block';
//   // reAuth['astId'] = '2003';
//   // reAuth['astPass'] = 'pass2003';
//   if(!Utils.isEmpty(path)) {
//     reAuth['path'] = path;
//   } else {
//     reAuth['path'] = '/customer';
//   }
//   return reAuth;
// }

// const authObjectLogout = (auth) => {
//   auth['loginId'] = '';
//   auth['viewHeader'] = 'none';
//   auth['register'] = false;
//   auth['chat'] = false;
//   auth['path'] = '/';
//   return auth;
// }

// const clearAuthSession = () => {
//   AuthSession.doLogout().then(() => {
//     sessionService.deleteSession();
//     sessionService.deleteUser();
//   }).catch(err => { throw (err); });
// }

// const doLogin = (auth) => {
//   AuthSession.doLogin(auth).then(response => {
//       const { token } = response;
//       sessionService.saveSession({ token }).then(() => {
//         sessionService.saveUser(auth).then(() => {
//           // callBack(auth);
//       });
//     });
//   });
// };

// const doLogout = () => {
//   AuthSession.doLogout().then(() => {
//       sessionService.deleteSession();
//       sessionService.deleteUser();
//     }).catch(err => { throw (err); });
// };

const loadAuthCookies = (callBack) => {
  const objAuth = sessionService.loadUser('COOKIES');
  console.log(objAuth);
  if(objAuth !== undefined) {
    objAuth.then(function(value) {
      callBack(value);
    }).catch(function(error) {
      callBack(authObjectLogout({}));
    });
  } else {
    console.log(objAuth);
  }
}

// const changeAuthPathCookies = (callBack, path) => {
//   const objAuth = sessionService.loadUser('COOKIES');
//   if(!Utils.isEmpty(objAuth)) {
//     objAuth.then(function(value) {
//       value['path'] = '/' + path;
//       callBack(value);
//     }).catch(function(error) {
//       callBack(authObjectLogout({}));
//     });
//   } else {
//     console.log(objAuth);
//   }
// }

// const changeAuthRegisterCookies = (callBack, register) => {
//   const objAuth = sessionService.loadUser('COOKIES');
//   if(!Utils.isEmpty(objAuth)) {
//     objAuth.then(function(value) {
//       value['register'] = register;
//       callBack(value);
//     }).catch(function(error) {
//       callBack(authObjectLogout({}));
//     });
//   } else {
//     console.log(objAuth);
//   }
// }

// const changeAuthChatCookies = (callBack, chat) => {
//   const objAuth = sessionService.loadUser('COOKIES');
//   if(!Utils.isEmpty(objAuth)) {
//     objAuth.then(function(value) {
//       value['chat'] = chat;
//       callBack(value);
//     }).catch(function(error) {
//       callBack(authObjectLogout({}));
//     });
//   } else {
//     console.log(objAuth);
//   }
// }

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

// module.exports.authObjectLogin = authObjectLogin
// module.exports.authObjectLogout = authObjectLogout
// module.exports.clearAuthSession = clearAuthSession
// module.exports.doLogin = doLogin;
// module.exports.doLogout = doLogout;
module.exports.loadAuthCookies = loadAuthCookies;
// module.exports.changeAuthPathCookies = changeAuthPathCookies;
// module.exports.changeAuthRegisterCookies = changeAuthRegisterCookies;
// module.exports.changeAuthChatCookies = changeAuthChatCookies;
// module.exports.isLoginAuthCookies = isLoginAuthCookies;