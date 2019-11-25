/* eslint-disable class-methods-use-this */
import connect from './bridge/connect';
import Extension from './bridge/extension';
import api from './bridge/api';
import platform from './util/platform';
import { initVersion } from './util/function';

class Bridge {
  constructor() {
    this.version = initVersion();
    this.platform = platform();
    this.invoke = this.invoke.bind(this);
    this.register = this.register.bind(this);
  }
  test() {
    // eslint-disable-next-line no-console
    console.log('test');
  }
  async invoke(type, data = {}) {
    const params = { ...data };
    const dataJson = JSON.stringify({
      type,
      params,
    });
    try {
      const bridge = await connect();
      return await new Promise(resolve => bridge.callHandler('jsInvokeNative', dataJson, result => resolve(result)));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return new Promise((resolve, reject) => { reject(e); });
    }
  }
  // 注册 native invoke js 函数
  async register(ev, func) {
    const bridge = await connect();
    return bridge.registerHandler(ev, (data, responseCallback) => {
      func(data, responseCallback);
    });
  }
}

const init = () => {
  const ext = Extension(Bridge);
  ext.gen('event', api.event);
  ext.gen('nativeUI', api.nativeUI);
  ext.gen('share', api.share);
  ext.gen('storage', api.storage);
  ext.gen('webview', api.webview);
};

init();

const bridge = new Bridge();

export default bridge;

