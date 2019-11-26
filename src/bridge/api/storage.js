const storage = {
  setItem: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
        'ANDROID|MyCApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(4001, options);
      },
    },
  ],
  getItem: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
        'ANDROID|MyCApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(4002, options);
      },
    },
  ],
};

export default storage;
