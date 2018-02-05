---
title: 实习生培训--Dva框架数据调用
subTitle: 公司用Dva框架进行前端开发，Dva是基于redux,redux-saga和react-router的框架，简单容易上手。
date: "2017-12-16"
path: "/peixun-dva/"
cover: dva2.png
---
## dva框架之数据调用

### route
route负责页面渲染和数据展示
```js
//基础模板
// routes/admin/index.js
import React from 'react';
import { connect } from 'dva';

class Index extends React.Component {
  render() {
    return (
      <div> hello world !</div>
    )
  }
}

export default connect()(Index);
```
router.js负责全部路由的管理
```js
//引入
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Index from './routes/admin/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/admin" component={Index} />
      </Switch>
    </Router>
  );
}
export default RouterConfig;
```
antd是一款ui框架，想象成bootstrap,它将常用的东西封装成组件提供使用
```js
//布局
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
```

路由嵌套

react-route v4 规定路由不允许嵌套
```js
// V2 or V3 路由组件嵌套
import { Router, Route, hashHistory } from 'react-router';

<Router history={hashHistory}>
  <Route path='/' component={App}>
    <Route path='foo' component={Foo} />
    <Route path='bar' component={Bar} />
  </Route>
</Router>
// V4 Router 的路由组件嵌套
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

<Router>
 <Route path="/" component={(props) => (
    <App {...props}>
      <Switch>
        <Route path='/foo' component={Foo} />
        <Route path='/bar' component={Bar} />
      </Switch>
    </App>
  )}/>
</Router>
```
hashHistory
```js
// 以前
import {hashHistory} from 'react-router';
const history = hashHistory;

// now
import createHashHistory from 'history/createBrowserHistory'
const history = createHashHistory()
//dva中修改history
import browserHistory from 'history/createBrowserHistory';
// 1. Initialize
const app = dva({
  history: browserHistory(),
});
```

### service
service负责的是数据的请求

request函数是一个封装的fetch函数
```js
export async function getrandom(param) {
  return request('/article/random?dev=1');
}

export async function getoneday(param) {
  return request(`/article/day?dev=1&date=${param.date}`);
}
```

### model
model层负责的是数据的处理

call是请求接口，put是进行数据存取
```js
*getRandom({ payload }, { call, put }) {
   try {
     const { data } = yield call(example.getrandom, payload);
     if (data) {
       yield put({ type: 'save', payload: { random: data } });
     } else {
       message.error('random error');
     }
   } catch (error) {
     message.error(error);
   }
 },
```
### proxy配置
进行代理请求
https://interface.meiriyiwen.com/article/day?dev=1
```js
"proxy": {
      "/article": {
        "target": "https://interface.meiriyiwen.com",
        "changeOrigin": true
      }
},
```
### 可能遇到的问题
- 嵌套路由刷新不生效
```js
// public/index.html
<script src="index.js"></script>
// 改成
<script src="/index.js"></script>
```
- JSON格式出错，尽量不要复制，手打一遍
- 数据获取不到（多看请求）
```js
// 对象析构，因为这里获取的数据是{data:{..,..,..}},所以才是const { data }将其析构出来，不要被误导全都是用{ data }析构 
const { data } = yield call(example.getArticle, payload)
```