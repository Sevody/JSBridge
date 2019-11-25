const compare = {
  eq: (left, right) => !compare.ne(left, right),
  ne: (left, right) => {
    let i;
    let len;
    let result;
    for (i = 0, len = Math.max(left.length, right.length); i < len; i += 1) {
      result = (+left[i] || 0) - (+right[i] || 0);
      if (result !== 0) {
        return true;
      }
    }
    return false;
  },
  gt: (left, right) => {
    let i;
    let len;
    let result;
    for (i = 0, len = Math.max(left.length, right.length); i < len; i += 1) {
      result = (+left[i] || 0) - (+right[i] || 0);
      if (result > 0) {
        return true;
      } else if (result < 0) {
        return false;
      }
    }
    return false;
  },
  lt: (left, right) => compare.gt(right, left),
  gte: (left, right) => !compare.lt(left, right),
  lte: (left, right) => !compare.gt(left, right),
};

const get = () => {
  try {
    // eslint-disable-next-line max-len
    // Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MyBApp/3.1.0
    if (/MyAApp/.test(window.navigator.userAgent)) {
      return navigator.userAgent.match(/(MyAApp)\/(\d*(\.\d*)*)/i)[2];
    }
    if (/MyBApp/.test(window.navigator.userAgent)) {
      return navigator.userAgent.match(/(MyBApp)\/(\d*(\.\d*)*)/i)[2];
    }
    if (/MyCApp/.test(window.navigator.userAgent)) {
      return navigator.userAgent.match(/(MyCApp)\/(\d*(\.\d*)*)/i)[2];
    }
    return '';
  } catch (e) {
    return '';
  }
};
export default {
  compare,
  get,
};
