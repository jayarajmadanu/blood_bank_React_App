import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard/Dashboard';
import AvailableBlood from './components/BloodBank/AvailableBlood';
import AvailableBank from './components/BloodBank/AvailableBank';
import Profile from './components/Dashboard/Profile';
import EditBloodBank from './components/Dashboard/EditBloodBank';
import UpdateBloodBank from './components/Dashboard/UpdateBloodBank';
import ManageUser from './components/Dashboard/ManageUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path = '/' component = {Login} />
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/dashboard' component = {Dashboard} />
          <Route exact path = '/dashboard/availableBlood' component = {AvailableBlood} />
          <Route exact path = '/dashboard/BloodBanks' component = {AvailableBank} />
          <Route exact path = '/dashboard/Profile' component = {Profile} />
          <Route exact path = '/dashboard/EditBloodBank' component = {EditBloodBank} />
          <Route exact path = '/bankUpdate' component = {UpdateBloodBank} />
          <Route exact path = '/dashboard/ManageUser' component = {ManageUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
