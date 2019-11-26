import { generateKey } from '../../util/function';

const nativeUI = {
  setHeaderRight: [
    {
      pattern: {
        'IOS|MyAApp': ['gte', '1.0.0'],
        'ANDROID|MyAApp': ['gte', '1.0.0'],
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
