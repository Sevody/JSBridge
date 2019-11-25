const event = {
  listen: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '2.0.0'],
        'ANDROID|MyCApp': ['gte', '2.0.0'],
      },
      handler(options) {
        const { event: ev, onCallback, ...params } = options;
        if ((typeof ev === 'string') && (typeof onCallback === 'function')) {
          return this.invoke(3001, {
            ...params,
            event: ev,
          }).then(() => {
            this.register(ev, () => {
              onCallback();
            });
          });
        }
        return this.invoke(3001, options);
      },
    },
  ],
  register: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '2.0.0'],
        'ANDROID|MyCApp': ['gte', '2.0.0'],
      },
      handler(ev, callback) {
        return this.register(ev, callback);
      },
    },
  ],
};

export default event;
