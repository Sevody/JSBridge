import CONSTANT from '../constant';

let inited = false;

// init only once
// WebViewJavascriptBridge 4.0的初始化
const init = () => {
  if (!inited && window[CONSTANT.BRIDGE_NAME]) {
    try {
      if (window[CONSTANT.BRIDGE_NAME].init) {
        window[CONSTANT.BRIDGE_NAME].init();
      }
      inited = true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
};

// 初始化桥
const setup = () => new Promise((resolve) => {
  if (window[CONSTANT.BRIDGE_CALLBACKS]) {
    return window[CONSTANT.BRIDGE_CALLBACKS].push(resolve);
  }
  window[CONSTANT.BRIDGE_CALLBACKS] = [resolve];

  // WebViewJavascriptBridge version 6.0初始化
  // 6.0会自动执行WVJBCallbacks 没有WebViewJavascriptBridgeReady事件
  const frame = document.createElement('iframe');
  frame.style.display = 'none';
  frame.src = CONSTANT.BRIDGE_LOADED_ADDRESS;
  document.documentElement.appendChild(frame);
  setTimeout(() => {
    document.documentElement.removeChild(frame);
  }, 0);

  // 兼容WebViewJavascriptBridge version 4.0
  document.addEventListener(CONSTANT.BRIDGE_READY_EVENT, () => {
    init();
    for (let i = 0; i < window[CONSTANT.BRIDGE_CALLBACKS].length; i += 1) {
      const callbackFn = window[CONSTANT.BRIDGE_CALLBACKS][i];
      if (typeof callbackFn === 'function') {
        callbackFn(window[CONSTANT.BRIDGE_NAME]);
      }
    }
  }, false);

  return false;
});

const connect = () => {
  init();
  return new Promise((resolve, reject) => {
    const bridge = window[CONSTANT.BRIDGE_NAME];
    if (bridge) {
      return resolve(bridge);
    }
    if (!/My/i.test(window.navigator.userAgent)) {
      return reject();
    }
    return setup().then(bri => resolve(bri));
  });
};

export default connect;
