const resolve = function resolveHandler(rules) {
  const self = this;
  const current = [this.platform.os.value(), this.platform.app.value()].join('|');
  let match;
  return new Promise((resolve2) => {
    if (!rules) {
      throw new Error('method not found');
    }
    match = rules.find((rule) => {
      const pattern = rule.pattern;
      if (!pattern) return true;
      return Object.entries(pattern).find((item) => {
        const platform = item[0];
        const version = item[1];
        return platform === current && self.version[version[0]](version[1]);
      });
    });
    if (!match) {
      throw new Error('app version too low');
    }
    resolve2(match.handler.bind(self));
  });
};

export default resolve;
