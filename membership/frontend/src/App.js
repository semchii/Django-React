import './App.css';
import Group from "./components/Group";
import Member from "./components/Member";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

function App() {
    return (
      <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Membership App </h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-light btn-outline-primary" to="/group">Groups</NavLink>
                </li>
                <li className="nav-item- m-1">
                    <NavLink className="btn btn-light btn-outline-primary" to="/member">Members</NavLink>
                </li>
            </ul>
        </nav>
        <Switch>
            <Route path='/group' component={Group}/>
            <Route path='/member' component={Member}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
