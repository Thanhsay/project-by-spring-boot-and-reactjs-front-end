import React, { Component } from 'react';
import $, { event } from 'jquery';
import ProjectService from '../service/ProjectService';

class AddNewProject extends Component {
    constructor(props){
        super(props)

        this.state = {
            project_id: '',
            projectName: '',
            projectStart: '',
            projectEnd: '',
            leadName: '',
            projectState: 1
        }
        this.myChangeHandle = this.myChangeHandle.bind(this);
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
    this.setState({ projectName: '',
                    projectStart: '',
                    projectEnd: '',
                    leadName: '',
                    projectState: ''});
    }

    addNew = (e) =>{
        e.preventDefault();
        let project = {projectName: this.state.projectName, projectStart: this.state.projectStart,
                        projectEnd: this.state.projectEnd, leadName: this.state.leadName, 
                        projectState: this.state.projectState};
        //console.log('employee =>' +JSON.stringify(project)); --- print file JSON
        ProjectService.createProject(project).then(res =>{
            let pro = res.data;
            this.setState({
                project_id: pro.project_id
            });
            let id = this.state.project_id;
           this.props.history.push(`/addemp/${id}`);
        })

    }

    // addEmp(){
    //     this.props.history.push('/addemp');
    // }

    render() {
        return (
            <div>
                <h3>Add a new Project</h3>
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
                        <label>State</label>
                        {/* <input  type="number" class="form-control" 
                            onChange={this.myChangeHandle}
                             name="projectState"
                            value={this.state.projectState}
                            placeholder="Enter 1 if successfully, or 0 if processing..." required/> */}
                        <select className="form-control"  onChange={this.selectState} id="selectState">
                            <option value="1">Finished</option>
                            <option value="0">Processing</option>
                            <option value="2">Upcoming</option>
                        </select>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    {/* <button class="btn btn-primary" onClick={this.addEmp}>Add Employees</button> */}
                    <button type="submit" class="btn btn-primary" onClick={this.addNew}>Add</button>
                    <button type="reset" 
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

export default AddNewProject;