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

const isUserInit = (isUser) => {
  var reUser = {
    info: {
      device: (isUser===null || isUser.info===undefined)?'pc':isUser.info.device
      ,language: (isUser===null || isUser.info===undefined)?'ja':isUser.info.language
      ,uLid: (isUser===null || isUser.info===undefined)?'':isUser.info.uLid
      ,cId: (isUser===null || isUser.info===undefined)?'':isUser.info.cId
      ,gId: (isUser===null || isUser.info===undefined)?'':isUser.info.gId
      ,uId: (isUser===null || isUser.info===undefined)?'':isUser.info.uId
      ,uName: (isUser===null || isUser.info===undefined)?'':isUser.info.uName
      ,viewHeader: (isUser===null || isUser.info===undefined)?false:isUser.info.viewHeader
      ,path: (isUser===null || isUser.info===undefined)?'':isUser.info.path
      ,action: (isUser===null || isUser.info===undefined)?'customer':isUser.info.action
      ,logo: (isUser===null || isUser.info===undefined)?'':isUser.info.logo
    }
    ,options: {
      customize: (isUser===null || isUser.info===undefined)?false:isUser.info.customize
      ,mail: (isUser===null || isUser.info===undefined)?false:isUser.info.mail
      ,chat: (isUser===null || isUser.info===undefined)?false:isUser.info.chat
      ,cti: (isUser===null || isUser.info===undefined)?false:isUser.info.cti
    }
  }
  return reUser;  
}

module.exports.isUserInit = isUserInit;
module.exports.doLogin = doLogin;
module.exports.doLogout = doLogout;