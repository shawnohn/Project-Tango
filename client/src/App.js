import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Forms from './pages/Forms'
import EditForms from './pages/EditForms'
import Preview from './pages/Preview'
import Submit from './pages/Submit'

// function NotFound({ match }) {
//   return (
//     <>
//       <h2>NotFound</h2>
//     </>
//   )
// }
function App() {
  return (
    <div className="App">
      <Router>
        <div className="Contents-wrapper">
          <Switch>
            <Route exact path="/" component={Forms} />
            <Route path="/editForms" component={EditForms} />
            <Route path="/preview" component={Preview} />
            {/* <Route path="/submit" component={Submit} /> */}
            <Route component={Submit} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
