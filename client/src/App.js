import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Forms from './pages/Forms'
import EditForms from './pages/EditForms'
import Preview from './pages/Preview'
import Submit from './pages/Submit'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="Contents-wrapper">
          <Switch>
            <Route exact path="/" component={Forms} />
            <Route path="/editForms" component={EditForms} />
            <Route path="/preview" component={Preview} />
            <Route path="/submit" component={Submit} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
