const doLogin = (isUser, token) => {
    const response = {
      token: token,
      data: isUserInit(isUser)
    };
    return new Promise(resolve => setTimeout(resolve(response), 1000));
};
  
const doLogout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

const getJsonValue = function(json, obj, key, defVal) {
  if(json === undefined || json === null
    || key === undefined || key === null || key === '') return defVal;
    if(json[obj] === undefined || json[obj] === null) return defVal;
    if(key in json) return json[key];
    return defVal;
}

const isUserInit = (isUser) => {
  var reUser = {
    info: {
      device: getJsonValue(isUser, 'info', 'device', 'pc')
      ,language: getJsonValue(isUser, 'info', 'language', 'ja')
      ,menu: getJsonValue(isUser, 'info', 'menu', 0)
      ,uLid: getJsonValue(isUser, 'info', 'uLid', '')
      ,cId:  getJsonValue(isUser, 'info', 'cId', '')
      ,gId:  getJsonValue(isUser, 'info', 'gId', '')
      ,uId:  getJsonValue(isUser, 'info', 'uId', '')
      ,uName:  getJsonValue(isUser, 'info', 'uName', '')
      ,viewHeader: getJsonValue(isUser, 'info', 'viewHeader', false)
      ,path: getJsonValue(isUser, 'info', 'path', '/')
      ,action: getJsonValue(isUser, 'info', 'action', 'customer')
      ,logo: getJsonValue(isUser, 'info', 'logo', '')
      // ,language: (isUser===null || isUser, 'info'===undefined)?'ja':isUser, 'info'.language
      // ,uLid: (isUser===null || isUser, 'info'===undefined)?'':isUser, 'info'.uLid
      // ,cId: (isUser===null || isUser, 'info'===undefined)?'':isUser, 'info'.cId
      // ,gId: (isUser===null || isUser, 'info'===undefined)?'':isUser, 'info'.gId
      // ,uId: (isUser===null || isUser, 'info'===undefined)?'':isUser, 'info'.uId
      // ,uName: (isUser===null || isUser, 'info'===undefined)?'':isUser, 'info'.uName
      // ,viewHeader: (isUser===null || isUser, 'info'===undefined)?false:isUser, 'info'.viewHeader
      // ,path: (isUser===null || isUser, 'info'===undefined)?'/':isUser, 'info'.path
      // ,action: (isUser===null || isUser, 'info'===undefined)?'customer':isUser, 'info'.action
      // ,logo: (isUser===null || isUser, 'info'===undefined)?'':isUser, 'info'.logo
    }
    ,options: {
      customize: getJsonValue(isUser, 'options', 'customize', false)
      ,mail: getJsonValue(isUser, 'options', 'mail', false)
      ,chat: getJsonValue(isUser, 'options', 'chat', false)
      ,dailer: getJsonValue(isUser, 'options', 'cti', true)
    }
  }
  return reUser;  
}

module.exports.getJsonValue = getJsonValue;
module.exports.isUserInit = isUserInit;
module.exports.doLogin = doLogin;
module.exports.doLogout = doLogout;