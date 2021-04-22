import React, { Component } from 'react';
import ProjectService from '../service/ProjectService';
// import { connect } from 'react-redux';

class DetailProject extends Component {

    constructor(props){
        super(props);
        this.state = {
            project_id: this.props.match.params.id,
            projectName: '',
            projectStart: '',
            projectEnd: '',
            leadName: '',
            projectState: '',
            employee: []
        }
    }

    componentDidMount(){
        ProjectService.updateProject(this.state.project_id).then(res => {
            let project = res.data;
            this.setState({
                projectName: project.projectName,
                projectStart: project.projectStart,
                projectEnd: project.projectEnd,
                leadName: project.leadName,
                projectState: project.projectState
            });
        });
        ProjectService.getDetailsEmployee(this.state.project_id).then(res =>{
            this.setState({
                employee: res.data
            });
        });
    }


    render() {
        return (
            <div>
                <h3 style={{marginBottom: "25px"}}>Project: {this.state.projectName}</h3>
                <table className="table table-bordered">
                    <tr>
                        <td>Project Name:</td>
                        <td>{this.state.projectName}</td>
                    </tr>
                    <tr>
                        <td>Leader Name:</td>
                        <td>{this.state.leadName}</td>
                    </tr>
                    <tr>
                        <td>Day Start:</td>
                        <td>{this.state.projectStart}</td>
                    </tr>
                    <tr>
                        <td>Day End:</td>
                        <td>{this.state.projectEnd}</td>
                    </tr>
                    <tr>
                        <td>State:</td>
                        <td>{this.state.projectState===1 ? 'Finished' : 'Processing'}</td>
                    </tr>
                </table>
                <br/>
                <h3 style={{marginBottom: "25px"}}>Employees joined:</h3>
                <table className="table table-bordered">
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                    </tr>
                    {
                        this.state.employee.map(
                            employee => 
                            <tr key={employee.employee_id}>
                                <td>{employee.employeeName}</td>
                                <td>{employee.position===1? 'Leader' : 'Employee'}</td>
                            </tr>
                        )
                    }
                </table>
                <br/>
                {/* <div className="footer">
                    <p>Enjoy the little thing!</p>
                </div> */}
            </div>
        );
    }
}

export default DetailProject;