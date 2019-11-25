import resolve from './resolve';

const Extension = Bridge => ({
  gen: (api, rules) => Object.defineProperty(Bridge.prototype, [api], {
    get() {
      const self = this;
      return Object.keys(rules).reduce((obj, key) => {
        const result = { ...obj };
        result[key] = function invoke(options, callback) {
          return resolve.call(self, rules[key]).then(handler => handler(options, callback));
        };
        return result;
      }, {});
    },
  }),
});

export default Extension;
