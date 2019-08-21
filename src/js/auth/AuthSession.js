export const doLogin = (auth) => {
    const response = {
      token: 'SmartCRM v0.1',
      data: {
        device: auth.device
        ,locale: auth.locale
        ,loginId: auth.loginId
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
  
export const doLogout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};
  