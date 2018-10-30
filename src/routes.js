import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Input from './components/Input/Input'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Projects from './components/Projects/Projects'

export default(
    <Switch>
        <Route component={Home} exact path='/' />
        <Route component={Input} path='/input' />
        <Route component={Login} path='/Login' />
        <Route component={Register} path='/Register' />
        <Route component={Projects} path='/Projects' />
    </Switch>
)