import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Forms from './pages/Forms'
import EditForms from './pages/EditForms'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="Contents-wrapper">
          <Switch>
            <Route exact path="/" component={Forms} />
            <Route path="/EditForms" component={EditForms} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
