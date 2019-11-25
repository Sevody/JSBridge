const webview = {
  open: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
        'ANDROID|MyCApp': ['gte', '1.0.0'],
      },
      handler(options) {
        return this.invoke(5001, options);
      },
    },
  ],
  close: [
    {
      pattern: {
        'IOS|MyCApp': ['gte', '1.0.0'],
        'ANDROID|MyCApp': ['gte', '1.0.0'],
      },
      handler() {
        return this.invoke(5002);
      },
    },
  ],
};

export default webview;
