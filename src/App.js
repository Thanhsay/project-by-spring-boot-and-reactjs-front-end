import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListEmployee from './component/ListEmployee';
import Headercomponent from './component/Headercomponent';
import Footer from './component/Footer';
import AddNewProject from './component/AddNewProject';
import UpdateProject from './component/UpdateProject';
import PaginationPage from './component/PaginationPage';
import DetailProject from './component/DetailProject';
import EmployeeOfProject from './component/EmployeeOfProject';
import AddEmployeeInProject from './component/AddEmployeeInProject';
import Login from './component/Login';
import welcome from './component/welcome';
import {connect} from 'react-redux';
import ListEmployees from './component/Employees/ListEmployees';
import UpdateEmployee from './component/Employees/UpdateEmployee';
import AddNewEmployee from './component/Employees/AddNewEmployee';
import DetailsEmployee from './component/Employees/DetailsEmployee';
import ResultSearch from './component/ResultSearch';

function App() {

  // const heading = "Welcome to Projects management!"
  // const quote = "Enjoy the liite thing!"

  return (
    <div>
      <Router>
        <div className="container"> 
          <Headercomponent/> 
          <div> 
            <Switch>
              <Route path="/welcome" component={welcome}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/pro" component= {ListEmployee}></Route>
              <Route path="/add" component= {AddNewProject}></Route>
              <Route path="/update/:id" component={UpdateProject}></Route>
              <Route path="/project" component={PaginationPage}></Route>
              <Route path="/detail/:id" component={DetailProject}></Route>
              <Route path="/updateemp/:id" component={EmployeeOfProject}></Route>
              <Route path="/addemp/:id" component={AddEmployeeInProject}></Route>
              <Route path="/emp" component={ListEmployees}></Route>
              <Route path="/updateEmp" component={UpdateEmployee}></Route>
              <Route path="/addEmp" component={AddNewEmployee}></Route>
              <Route path="/detailEmp" component={DetailsEmployee}></Route>
              <Route path="/resultSearch" component={ResultSearch}></Route>
            </Switch>
          </div> 
          {/* <Footer/> */}
        </div> 
      </Router>
    </div>
  );
}


export default App;
