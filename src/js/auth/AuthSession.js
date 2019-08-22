const doLogin = (auth, token) => {
    const response = {
      token: token,
      data: {
        device: auth.device
        ,language: auth.language
        ,uLid: auth.uLid
        ,cId: auth.cId
        ,gId: auth.gId
        ,uId: auth.uId
        ,uName: auth.uName
        ,viewHeader: auth.viewHeader
        ,register: auth.register
        ,chat: auth.chat
        ,astId: auth.astId
        ,astPass: auth.astPass
        ,path: auth.path
        ,logo: auth.logo
      }
    };
    return new Promise(resolve => setTimeout(resolve(response), 1000));
};
  
const doLogout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

module.exports.doLogin = doLogin;
module.exports.doLogout = doLogout;