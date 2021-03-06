import React, { Component } from 'react';
import ProjectService from '../service/ProjectService';
import $, { event } from 'jquery';

class AddEmployeeInProject extends Component {

    constructor(props){
        super(props);
        this.state={
            employee: [],
            employee_id: '',
            project_id: this.props.match.params.id,
            
        }
    }

    addEmployee= (id, name) => {
        // id.preventDefault();
        let details = {detailProjectId: this.state.project_id,
                        detailEmployeeId: id};
        ProjectService.createEmployeeInProject(details).then(res =>{});
        alert('Added employee: '+name);
        $("#employee"+id).remove();
    }

    componentDidMount(){
        ProjectService.getAllEmp().then(res => {
            this.setState({
                employee : res.data
            });
        });
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


    render() {

        return (
            <div>
                <h3 style={{marginBottom: "15px"}}>Add Employee in this project</h3>
                <table className="table table-bordered">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Add in project</th>
                    </tr>
                    {
                        this.state.employee.map(
                            employee =>
                                <tr key={employee.employee_id} id={'employee'+employee.employee_id}>
                                    <td>{employee.employeeName}</td>
                                    <td>{this.showPosition(employee.position)}</td>
                                    <th>
                                        <button className="btn btn-primary"
                                         onClick={() => this.addEmployee(employee.employee_id, employee.employeeName)}>Add</button>
                                    </th>
                                </tr>
                        )
                    }
                </table>
            </div>
        );
    }
}

export default AddEmployeeInProject;