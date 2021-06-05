import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home'
import Info from './Info/Info'
import SectionPills from './SectionPills/SectionPills'


const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/risk-pred' component={SectionPills}/>
        <Route path='/info' component={Info}/>
      </Switch>
    </main>
  )
  
  export default Main;