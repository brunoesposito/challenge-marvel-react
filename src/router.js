import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

//Pages
import Home from './structure/pages/Home';
import Details from './structure/pages/Details';
import NotFound from './structure/pages/NotFound';

export default function Routes() {
    const setRoutes = [
      {
        path: '/',
        component: Home
      },
      {
        path: '/detail/:heroeId',
        component: Details
      },
      {
        path: '*',
        component: NotFound
      }
    ];

    return (
      <Router>
        <Switch>
          {setRoutes.map((route, i) => 
            <Route exact path={route.path} key={i}>
                <route.component />
            </Route>
          )}
        </Switch>
      </Router>
    );
};