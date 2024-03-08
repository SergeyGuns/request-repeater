import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import RequestRepeaterPage from './containers/RequestRepeaterPage';

export default (
  <Switch>
    <Route exact path="/" component={RequestRepeaterPage} />
    {/* <Route exact path="/loggedin" component={LoggedInPage} /> */}
  </Switch>
);
