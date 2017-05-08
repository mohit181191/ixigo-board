import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Workspace from './containers/workspace/Workspace';
export default (
  <Route path="/" component={Workspace}>
    <IndexRoute component={Workspace}/>
  </Route>
);
