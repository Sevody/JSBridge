const share = {
  sendWithSystem: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(1001, options);
      },
    },
  ],
};

export default share;
