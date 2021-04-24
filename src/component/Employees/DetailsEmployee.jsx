import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectService from '../../service/ProjectService';

class DeleteEmployee extends Component {

    constructor(props){
        super(props);
        this.state = this.initUpdateValue;
    }

    initUpdateValue = {
        id: '',
        empName: '',
        gender: '',
        age: '',
        position: '',
        state: '',
        project: []
    }

    componentDidMount(){
        ProjectService.getemployeeById(this.props.empl.id).then(res =>{
            let employee = res.data;
            this.setState({
                id: employee.employee_id,
                empName: employee.employeeName,
                gender: employee.gender,
                age: employee.age,
                position: employee.position,
                state: employee.state
            });
        });
        ProjectService.findProjectByEmployeeId(this.props.empl.id).then(res =>{
            let projects = res.data;
            this.setState({
                project: projects
            }) 
        })
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

    showState =(id) =>{
        if(id == "0"){
            return "Processing";
        }else{
            if((id == 1)){
                return "Finished";
            }else{
                return "Upcoming";
            }
        }
    }

    render() {
        return (
            <div>
                <h3>Detail employee: {this.state.empName}</h3>
                <br/>
                <table className="table table-bordered">
                    <tr>
                        <th>Name</th>
                        <td>{this.state.empName}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{this.state.gender === 1 ? 'Male' : 'Female'}</td>
                    </tr>
                    <tr>
                        <th>Age</th>
                        <td>{this.state.age}</td>
                    </tr>
                    <tr>
                        <th>Position</th>
                        <td>{this.showPosition(this.state.position)}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{this.showState(this.state.state)}</td>
                    </tr>
                </table>   
                <br/>
                <h3>Project that {this.state.empName} has joined: </h3> 
                <br/>
                <table className="table table-bordered">
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                    </tr>
                    {
                        this.state.project.map(
                            project =>
                            <tr key={project.project_id}>
                                <td>{project.projectName}</td>
                                <td>{project.projectState=== 1 ? 'Finished' : 'Processing'}</td>
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

const mapStateToProps = state =>{
    return{
        empl: state.empl
    };
}

export default connect(mapStateToProps)(DeleteEmployee);