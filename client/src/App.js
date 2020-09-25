import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Forms from './pages/Forms'
import EditForm from './pages/EditForm'
import Preview from './pages/Preview'
import Submit from './pages/Submit'
import Submissions from './pages/Submissions'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="Contents-wrapper">
          <Switch>
            <Route exact path="/" component={Forms} />
            <Route path="/editform" component={EditForm} />
            <Route path="/preview" component={Preview} />
            <Route path="/submissions" component={Submissions} />
            <Route component={Submit} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
