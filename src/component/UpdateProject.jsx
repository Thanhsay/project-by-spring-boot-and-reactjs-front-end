import React, { Component } from 'react';
import ProjectService from '../service/ProjectService';
import $, { event } from 'jquery';
import '../index.css';
class UpdateProject extends Component {
    constructor(props){
        super(props)

        this.state = {
            project_Id: this.props.match.params.id,
            projectName: '',
            projectStart: '',
            projectEnd: '',
            leadName: '',
            projectState: '',
            employee: []
        }
        this.myChangeHandle = this.myChangeHandle.bind(this);
        this.doUpdate = this.doUpdate.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    myChangeHandle= (event) => {
        let na = event.target.name;
        let val = event.target.value;
        
        this.setState({[na] : val});
    }

    selectState = () =>{
        let sta = $("#selectState").val();
        this.setState({
            projectState: sta
        });
    }

    myChangeReset = () => {
    this.setState({
                    projectName: '',
                    projectStart: '',
                    projectEnd: '',
                    leadName: '',
                    projectState: '',
                });
    }

    doUpdate = (e) =>{
        e.preventDefault();
        let project = {projectName: this.state.projectName, projectStart: this.state.projectStart,
                        projectEnd: this.state.projectEnd, leadName: this.state.leadName, 
                        projectState: this.state.projectState};
        //  console.log('employee =>' +JSON.stringify(project));   --- print file JSON
        ProjectService.editProject(project, this.state.project_Id).then(res =>{
            this.props.history.push("/project");
        });

    }

    componentDidMount(){
        ProjectService.updateProject(this.state.project_Id).then( (res) => {
            let project = res.data;
            this.setState({
                projectName: project.projectName,
                projectStart: project.projectStart,
                projectEnd: project.projectEnd,
                leadName: project.leadName,
                projectState: project.projectState
            });
        });
        ProjectService.getDetailsEmployee(this.state.project_Id).then(res =>{
            this.setState({
                employee: res.data,
            });
        });
    }

    updateEmployee(){
        let id = this.state.project_Id;
        this.props.history.push(`/updateemp/${id}`)
    }

    // doDeleteEmployee(id){
    //     $("#employee"+id).remove();
    // }

    // doAddEmployee(){
    //    return <div className="form-group">
    //             <select>
    //                 <option>1</option>
    //             </select>
    //         </div>
    // }

    render() {
        return (
            <div>
                <h3>Update Project: {this.state.projectName}</h3>
                <form class="was-validated addNewProjectForm">
                    <div className="form-group">
                        <label>Project Name</label>
                        <input  type="text" class="form-control" 
                            onChange={this.myChangeHandle}
                            name="projectName"
                            value={this.state.projectName}
                            placeholder="Enter Project Name ..." required/>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="form-group">
                        <label>Day Start</label>
                        <input  type="date" 
                            onChange={this.myChangeHandle}
                             name="projectStart"
                            value={this.state.projectStart}
                            class="form-control" required/>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out Day Start!</div>
                    </div>
                    <div className="form-group">
                        <label>Day End</label>
                        <input  type="date"
                            onChange={this.myChangeHandle}
                            name="projectEnd"
                            value={this.state.projectEnd}
                            class="form-control" required/>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out Day End</div>
                    </div>
                    <div className="form-group">
                        <label>Leader Name</label>
                        <input  type="text" class="form-control" 
                            onChange={this.myChangeHandle}
                            name="leadName"
                            value={this.state.leadName}
                            placeholder="Enter Leader Name ..." required/>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out Leader Name</div>
                    </div>
                    <div className="form-group">
                        <label>State (Enter 1 if this project was successfully or 0 if it is being proccessed)</label>
                        <select className="form-control"  onChange={this.selectState} 
                                id="selectState" value={this.state.projectState}>
                            <option value="1">Finished</option>
                            <option value="0">Processing</option>
                        </select>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    {/* <div id="solve-employee">
                        <h4>Employee joined: </h4>
                        {
                            this.state.employee.map(
                                employee => 
                                   <div key={employee.employee_id} className="form-group" id={"employee"+employee.employee_id}>
                                       <label>Employee Name: </label>
                                       <input type="text" className="form-control"
                                       value={employee.employeeName}
                                       />
                                       <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out State!</div>
                                        <button className="btn btn-danger" onClick={() => this.doDeleteEmployee(employee.employee_id)}>Delete</button>
                                   </div> 
                            )
                        }
                    </div>
                    <div>
                        <div id="do-add-emp">
                            {this.doAddEmployee}
                        </div>
                        <input style={{marginBottom: "25px"}}
                        className="btn btn-secondary add-emp" type="button" value="Add new employee"
                        onClick={this.doAddEmployee}
                        />
                    </div> */}
                    <button className="btn btn-primary" onClick={this.updateEmployee}>Update Employee</button>
                    <button class="btn btn-primary" onClick={this.doUpdate} type="button">Update</button>
                    <button 
                        onClick={this.myChangeReset}
                        id="buttonReset"
                        class="btn btn-secondary">Reset</button>
                </form>
                {/* <div className="footer">
                    <p>Enjoy the little thing!</p>
                </div> */}
                <br/>
                <br/>
            </div>
        );
    }
}

export default UpdateProject;