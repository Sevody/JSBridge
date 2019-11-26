const share = {
  sendWithSystem: [
    {
      pattern: {
        'IOS|MyAApp': ['gte', '1.0.0'],
        'ANDROID|MyAApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(1001, options);
      },
    },
    {
      pattern: {
        'IOS|MyBApp': ['gte', '1.0.0'],
        'ANDROID|MyBApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(1002, options);
      },
    },
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
        'ANDROID|MyCApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(1003, options);
      },
    },
  ],
};

export default share;
