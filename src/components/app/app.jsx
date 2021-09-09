import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../pages/main/main';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
