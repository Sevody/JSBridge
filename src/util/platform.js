const VALUE = {
  MyAApp: 'MyAApp',
  MyBApp: 'MyBApp',
  MyCApp: 'MyCApp',
  WEB: 'WEB',
  ANDROID: 'ANDROID',
  IOS: 'IOS',
};

const platform = (ua) => {
  const getUa = () => ua || window.navigator.userAgent;
  const app = {
    isMyAApp: () => /MyAApp/.test(getUa()),
    isMyBApp: () => /MyBApp/.test(getUa()),
    isMyCApp: () => /MyCApp/.test(getUa()),
    isWeb: () => app.value === VALUE.WEB,
    value: () => {
      if (app.isMyAApp()) return VALUE.MyAApp;
      if (app.isMyBApp()) return VALUE.MyBApp;
      if (app.isMyCApp()) return VALUE.MyCApp;
      return VALUE.WEB;
    },
  };

  const os = {
    isAndroid: () => /Android/i.test(getUa()),
    isIOS: () => /iPhone|iPad|iPad/i.test(getUa()),
    isOther: () => !os.isAndroid() && !os.isIOS(),
    value: () => {
      if (os.isIOS()) return VALUE.IOS;
      if (os.isAndroid()) return VALUE.ANDROID;
      return VALUE.OTHER;
    },
  };

  return {
    app,
    os,
  };
};

export default platform;
