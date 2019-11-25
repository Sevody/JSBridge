import version from './version';

export const initVersion = () => Object.entries(version.compare).reduce((ov, f) => {
  const result = { ...ov };
  result[f[0]] = right => f[1](version.get(), right);
  return result;
}, {});


export const generateKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxLen = chars.length;
  let ret = 'FUN_';
  for (let i = 0; i < maxLen; i += 1) {
    ret += chars.charAt(Math.floor(Math.random() * maxLen));
  }
  return ret;
};
