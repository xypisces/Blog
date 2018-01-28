import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import List from './routes/home/List';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/index" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
