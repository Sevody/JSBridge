# JSBridge

基于 Hybrid App 架构的 JSBridge Javscirpt 端实现

框架底层通信原理可以参考[这篇文章](https://sevody.github.io/2019/11/10/jsbridge-mechanisms/)

## Feature
- 支持 Promise
- 支持区分 App Platform & Version
- 极易扩展的 bridge api
- 接口分类参考 [html5+](http://www.html5plus.org/doc/h5p.html) 标准

## Usage

首先需要与 Native 端约定好每个接口支持的 APP 平台、版本号和对应的接口 id，然后在 `bridge/api` 中配置对应的接口定义。

下面是实现接口的一些例子：

| Module | Name | ID | Params | Description | Support |
| --- | --- | --- | --- | --- | --- |
| share | sendWithSystem | 1001 \| 1002 \| 1003 | [{Object msg, Function successCB, Function errorCB}] | 使用系统组件发送分享 | MyAApp \| MyBApp \| MyCApp |
| nativeUI | alert | 2001 | [{String title, String message, Function alertCB}] | 弹出系统提示对话框 | MyAApp |
| event  | listen | 3001 | [{String event, Function onCallback}] | 添加App监听事件 | MyCApp2.0 |
| event | register | - | [String event, Function callback] | 注册供App调用的函数 | MyCApp2.0 |
| storage  | setItem | 4001 | [{String name, String value}] | 修改或添加键值(key-value)对数据到应用数据存储中 | MyCApp |
| storage  | getItem | 4002 | [{String name, String value}] | 通过键(key)检索获取应用存储的值 | MyCApp |
| webview | open | 5001 | [{String url}] | 新建webview打开指定url | -- |
| webview | close | 5002 | - | 关闭当前webview | -- |


share.sendWithSystem(msg, successCB, errorCB);
-------------------------------

弹出系统提示对话框

`params`

    {
      msg: {
        String type;
        String content;
        String[] thumbs;
        String[] pictures;
        String media;
        String href;
        String title;
        JSON extra;
        GEOPosition geo;
        ShareMessageExtra extra;
        WeixinMiniProgramOptions miniProgram;
        String interface;
      }, // 分享消息对象
      successCB: '', // 调用系统分享操作成功时的回调函数，用于返回操作成功信息。 但此回调并不表示分享消息已经发送成功
      errorCB: '', // 分享操作失败回调
    }

Example:

```js
import jsbridge from 'jsbridge';

jsbridge.share.sendWithSystem({
  msg: {
    type: 'frends',
    content:'分享内容',
    href:'http://m.baidu.com/'
  },
  successCB () => {},
  alertCB: () => {}
})
```


nativeUI.alert(options)
-------------------------------

弹出系统提示对话框

`params`

    {
      title: '', // 示对话框上显示的标题
      message: '', // 提示对话框上显示的内容
      alertCB: '', // 提示对话框上关闭后的回调函数
    }

Example:

```js
import jsbridge from 'jsbridge';

jsbridge.nativeUI.alert({
  title: '提示',
  message： '保存成功',
  alertCB: () => {
    // TODO: 确定按钮回调
  }
}).then(() => {
  // 设置UI成功后逻辑处理
})
```

event.listen(options)
-------------------------------

添加App监听事件

`params`

    {
      event: '', // 订阅事件名称
      onCallback: '', // 事件回调
    }

Example:

```js
import jsbridge from 'jsbridge';

jsbridge.event.listen({
  event: 'resume',
  onCallback: () = {
    // 重新激活webview回调
  }
}).then(() => {
  // 订阅成功
})
```

webview.open(options)
-------------------------------

新建webview打开指定url

Example:

```js
import jsbridge from 'jsbridge';

jsbridge.webview.open({url: 'https://m.baidu.com'})
```
webview.close()
-------------------------------

关闭当前webview

Example:

```js
import jsbridge from 'jsbridge';

jsbridge.webview.close()
```