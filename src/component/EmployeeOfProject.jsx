import React, { Component } from 'react';
import ProjectService from '../service/ProjectService';

class EmployeeOfProject extends Component {

    constructor(props){
        super(props);
        this.state = {
            project_id: this.props.match.params.id,
            projectName: '',
            employeeProject: [],
            employee: []
        }
    }

    componentDidMount(){
        ProjectService.updateProject(this.state.project_id).then(res =>{
            let project = res.data;
            this.setState({
                projectName: project.projectName,
            });
        });

        ProjectService.getDetailsEmployee(this.state.project_id).then(res =>{
            this.setState({
                employeeProject: res.data
            });
        });

        ProjectService.getAllEmployee(this.state.project_id).then(res =>{
            this.setState({
                employee: res.data
            })
        })
    }

    updateEmployee(id, name){
        let details = {
                        detailProjectId: this.state.project_id,
                        detailEmployeeId: id
        }
        ProjectService.createEmployeeInProject(details).then(res => {
            this.componentDidMount();
        });
        alert("Added employee: "+name);
    }

    showPosition = (id) =>{
        if(id == "0"){
            return "Developer";
        }else{
            if(id == "1"){
                return "Leader";
            }else{
                if(id == "2"){
                    return "Tester";
                }else{
                    return "Business Analyst";
                }
            }
        }
    }

    deleteState(project_id, employee_id, name){
        let sta = window.confirm("Do you want to delete employee: "+name);
        if(sta === true){
            this.deleteEmployee(project_id, employee_id);
        }
    }

    deleteEmployee(project_id, employee_id){
        ProjectService.deleteDetails(project_id, employee_id).then(res =>{
            if(res.data === 'success'){
                alert("Deleted");
            }else{
                alert("Delete failed");
            }
            this.componentDidMount();
        });
    }

    render() {
        return (
            <div>
                <h3 style={{marginBottom: "15px"}}>Project: {this.state.projectName}</h3>
                <table className="table table-bordered">
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>Delete from the project</th>
                    </tr>
                    {
                        this.state.employeeProject.map(
                            employeeProject => 
                            <tr key={employeeProject.employee_id}>
                                <td>{employeeProject.employeeName}</td>
                                <td>{this.showPosition(employeeProject.position)}</td>
                                <th>
                                    <button className="btn btn-danger" 
                                    onClick={() => this.deleteState(this.state.project_id, employeeProject.employee_id, employeeProject.employeeName)}>Delete</button>
                                </th>
                            </tr>
                        )
                    }
                </table>
                <h4>Add employees in this project: </h4>
                <table className="table table-bordered">
                    <tr>
                       <th>Name</th>
                       <th>State</th>
                       <th>Add in project</th>
                    </tr>
                    {
                        this.state.employee.map(
                            employee => 
                                <tr key={employee.employee_id}>
                                    <td>{employee.employeeName}</td>
                                    <td>{this.showPosition(employee.position)}</td>
                                    <th>
                                        <button className="btn btn-primary" 
                                        onClick={() => this.updateEmployee(employee.employee_id, employee.employeeName)}>Add</button>
                                    </th>
                                </tr>
                        )
                    }
                </table>    
            </div>
        );
    }
}

export default EmployeeOfProject;