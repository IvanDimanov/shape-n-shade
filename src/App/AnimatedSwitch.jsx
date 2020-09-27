import React from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import HomePage from '../pages/HomePage'
import CubePage from '../pages/CubePage'
import SpherePage from '../pages/SpherePage'
import CylinderPage from '../pages/CylinderPage'
import ConePage from '../pages/ConePage'
import InvertedConePage from '../pages/InvertedConePage'
import PageNotFound from '../pages/PageNotFound'


const AnimatedSwitch = withRouter(({location}) => (
  <TransitionGroup className="relative overflow-hidden flex-grow">
    <CSSTransition
      key={location.key}
      classNames="slide"
      timeout={500}
    >
      <Switch location={location}>
        <Route path="/" component={HomePage} exact />
        <Route path="/cube" component={CubePage} />
        <Route path="/sphere" component={SpherePage} />
        <Route path="/cylinder" component={CylinderPage} />
        <Route path="/cone" component={ConePage} />
        <Route path="/inverted-cone" component={InvertedConePage} />
        <Route component={PageNotFound} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
))

export default AnimatedSwitch
