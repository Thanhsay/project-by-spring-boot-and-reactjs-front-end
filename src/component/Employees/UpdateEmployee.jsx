import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectService from '../../service/ProjectService';
import $, { event } from 'jquery';

class UpdateEmployee extends Component {

    constructor(props){
        super(props);
        this.state = this.initUpdateValue;

        this.doUpdateEmp = this.doUpdateEmp.bind(this);
    }

     initUpdateValue = {
        id: '',
        empName: '',
        gender: '',
        age: '',
        position: '',
        state: ''
    }

    componentDidMount(){
        ProjectService.getemployeeById(this.props.empl.id).then(res =>{
            let emp = res.data;
            this.setState({
                id: emp.employee_id,
                empName: emp.employeeName,
                gender: emp.gender,
                age: emp.age,
                position: emp.position,
                state: emp.state
            })
        })
    }

    myChangeHandle= (event) => {
        let na = event.target.name;
        let val = event.target.value;
        
        this.setState({[na] : val});
    }

    solveReset = (e) =>{
        e.preventDefault();
        this.setState(this.initUpdateValue);
    }

    selectState = () =>{
        let sta = $("#genderSelectState").val();
        let sta1 = $("#positionSelectState").val();
        let sta2 = $("#stateSelectState").val();
        this.setState({
           gender : sta,
           position: sta1,
           state: sta2
        });
    }

    doUpdateEmp =(e) =>{
        e.preventDefault();
        let employee = {
            employeeName: this.state.empName, 
            gender: this.state.gender,
            position: this.state.position,
            state: this.state.state,
            age: this.state.age
        };
        ProjectService.updateEmployee(this.state.id, employee).then(res=>{
            this.props.history.push("/emp");
        });
    }

    render() {
        return (
            <div>
                <h2>Update employee: {this.state.empName}</h2>
                <form className="was-validated addNewProjectForm">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" 
                            onChange={this.myChangeHandle}
                            name="empName" value={this.state.empName}
                            placeholder="Enter Employee Name ..." required/>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control" onChange={this.selectState}
                                id="genderSelectState" value={this.state.gender}>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" class="form-control" 
                            onChange={this.myChangeHandle}
                            name="age" value={this.state.age}
                            placeholder="Enter Employee Age ..." required/>
                            <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    <div className="form-group">
                        <label>Position</label>
                        <select className="form-control" value={this.state.position}
                         id="positionSelectState" onChange={this.selectState}>
                            <option value="0">Staff</option>
                            <option value="1">Leader</option>
                        </select>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <select className="form-control" name="state"
                        value={this.state.state} id="stateSelectState"
                         onChange={this.selectState}>
                            <option value="1">Offical</option>
                            <option value="0">Trainee</option>
                        </select>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out State!</div>
                    </div>
                    <div>
                    <button className="btn btn-primary" type="button" 
                    onClick={this.doUpdateEmp}>Update Employee</button>
                    <button className="btn btn-primary" type="button" 
                     onClick={this.solveReset}>Reset</button>
                    </div>
                </form>
                <div className="footer">
                    <p>Enjoy the little thing!</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        empl: state.empl
    };
}

export default connect(mapStateToProps)(UpdateEmployee);