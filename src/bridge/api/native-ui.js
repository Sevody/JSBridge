import { generateKey } from '../../util/function';

const nativeUI = {
  setHeaderRight: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
        'ANDROID|MyCApp': ['gte', '1.0.0'],
      },
      handler(options) {
        const { onClick, ...params } = options;
        if (typeof onClick === 'function') {
          const ev = generateKey();
          return this.invoke(2001, {
            ...params,
            event: ev,
          }).then(() => {
            this.register(ev, () => {
              onClick();
            });
          });
        }
        return this.invoke(2001, params);
      },
    },
  ],
};

export default nativeUI;
