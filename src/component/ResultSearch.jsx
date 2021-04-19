import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectService from '../service/ProjectService';
import $, { event } from 'jquery';
import {solveDetail} from './Employees/EmpUtil/EmpAction';


class ResultSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            log: '',
            project: [],
            employee: []
        }
    }

    handleLog = (e) =>{
        let con = e.target.value;
        this.setState({
            log: con
        });
    }

    solveSearch = (e) =>{
        e.preventDefault();
        ProjectService.searchProject(this.state.log).then(res=>{
            let pro = res.data;
            this.setState({
                project : pro
            });
        });
        ProjectService.searchEmployee(this.state.log).then(res=>{
            let emp = res.data;
            this.setState({
                employee: emp
            });
        });
    }

    detailPro =(id) =>{
        this.props.history.push(`/detail/${id}`);
    }

    detailEmp = (id) =>{
        this.props.solveDetail(id);
        this.props.history.push('/detailEmp');
    }

    render() {

        var pro = this.state.project;
        if(this.state.project.length === 0||pro[0].type === "tr"){
            pro.push(
              <tr>
                  <td></td>
                  <td></td>
                  <td style={{color: "red"}}>No results</td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>

            )
        }else{
            pro = this.state.project.map(
                project =>
                    <tr key={project.project_id}>
                        <td>{project.projectName}</td>
                        <td>{project.projectStart}</td>
                        <td>{project.projectEnd}</td>
                        <td>{project.leadName}</td>
                        <td>{project.projectState===1 ? 'Finished' : 'Processing'}</td>
                        <td>
                            <button type="button"
                             onClick={()=>this.detailPro(project.project_id)}
                             className="btn btn-secondary"
                             >Detail</button>
                        </td>
                    </tr>
            )
        }

        var emp = this.state.employee;
        if(emp.length===0||emp[0].type === "tr"){
            emp.push(
                <tr>
                    <td></td>
                    <td></td>
                    <td style={{color: "red"}}>No results</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }else{
            emp = this.state.employee.map(
                employee =>
                    <tr key={employee.employee_id}>
                        <td>{employee.employeeName}</td>
                        <td>{employee.gender === 1 ? 'Male' : 'Female'}</td>
                        <td>{employee.age}</td>
                        <td>{employee.position === 1 ? 'Leader' : 'Staff'}</td>
                        <td>{employee.state === 1 ? 'Offical' : 'Trainee'}</td>
                        <td>
                            <button type="button" className="btn btn-secondary"
                            onClick = {()=> this.detailEmp(employee.employee_id)}
                            >Detail</button>
                        </td>
                </tr>
            )
        }

        return (
            <div>
                <br/>
                <div className="row">
                    <div className="col sm-3"></div>
                    <div className="col sm-4">
                        <form className="form-group">
                            <input className="form-control" type="text" style={{width: "100%"}}
                             placeholder="Enter contents searching ... " value={this.state.log}
                             onChange={this.handleLog}
                            />
                            <br/>
                            <button className="btn btn-secondary" style={{marginLeft:"40%"}}
                             onClick={this.solveSearch}
                            >Search</button>
                        </form>
                    </div>
                    <div className="col sm-3"></div>
                </div>
                <div>
                    <br/>
                    <h4>Results projects for key: "{this.state.log}" </h4>
                    <div>
                        <table className="table table-hover">
                            <tr>
                                <th>Project Name</th>
                                <th>Day Start</th>
                                <th>Day End</th>
                                <th>Leader Name</th>
                                <th>State</th>
                                <th>Action</th>
                            </tr>
                            {pro}
                        </table>
                    </div>
                    <br/>
                    <h4>Results employees for key: "{this.state.log}"</h4>
                    <table className="table table-hover">
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Position</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                        {emp}
                    </table>
                </div>
                <br/>
                <div className="footer">
                    <p>Enjoy the little thing!</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
       empl: state.empl 
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        solveDetail : (id) => dispatch(solveDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearch);