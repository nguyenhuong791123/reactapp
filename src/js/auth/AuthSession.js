const doLogin = (auth, token) => {
    const response = {
      token: token,
      data: {
        info: {
          device: auth.device
          ,language: auth.language
          ,uLid: auth.uLid
          ,cId: auth.cId
          ,gId: auth.gId
          ,uId: auth.uId
          ,uName: auth.uName
          ,viewHeader: auth.viewHeader
          ,path: auth.path
          ,action: auth.action
          ,logo: auth.logo
        }
        ,options: {
          mail: auth.mail
          ,chat: auth.chat
          ,cti: auth.cti
        }
      }
    };
    return new Promise(resolve => setTimeout(resolve(response), 1000));
};
  
const doLogout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

module.exports.doLogin = doLogin;
module.exports.doLogout = doLogout;