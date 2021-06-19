import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Register from './pages/Register'
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
