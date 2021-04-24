import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectService from '../../service/ProjectService';
import {UPDATE, DELETE} from './EmpUtil/EmpType';
import {solveId, solveDetail} from './EmpUtil/EmpAction';

class ListEmployees extends Component {

    constructor(props){
        super(props);
        this.state={
            employeesList: [], 
            totalPage: '',
            activePage: 1,
            stateDelete: ''
        }
        this.addNewEmployee = this.addNewEmployee.bind(this);
    }

    componentDidMount(){
        ProjectService.getPaginationEmployees(this.state.activePage).then(res =>{
            let list = res.data;
            this.setState({
                employeesList: list.employees,
                totalPage: list.totalPage
            })
        }) 
    }

    getPage(index){
        ProjectService.putPaginationEmployee(index).then(res =>{
            let list = res.data;
            this.setState({
                employeesList: list.employees,
                activePage: list.activePage
            });
            this.componentDidMount();
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

    getIdUpdate = (id) =>{
        this.props.solveId(id);

        setTimeout(() =>{
            return this.props.history.push('/updateEmp');  
        }, 500);
    }

    addNewEmployee(e){
        e.preventDefault();
        setTimeout(()=>{
            return this.props.history.push("/addEmp");
        })
    }

    deleteState(id){
        ProjectService.deleteEmployee(id).then(res =>{
            let state = res.data;
            if(state === "success"){
                alert("Deleted!");
                this.componentDidMount();
            }else{
                alert("Delete failure");
            }
        });
    }

    deleteEmp(id, name){
        let con = window.confirm("Do you want to delete employee: "+name+"?")
        if(con){
            this.deleteState(id);
        }
    }

    detailEmp(id){
        this.props.solveDetail(id);

        setTimeout(() =>{
            return this.props.history.push('/detailEmp');  
        }, 500);
        
    }


    render() {

        var rows = [];
            for (let i = 1; i <= this.state.totalPage; i++) {
            rows.push(
                <div className="pageFoot">
                    <button className="pageLink btn-info" 
                    onClick={() =>this.getPage(i)} key={i}>{i}</button>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <button className="btn btn-secondary">List</button>
                    <button style={{marginLeft: "15px"}} className="btn btn-secondary"
                     onClick={this.addNewEmployee} type="button">Add</button>
                </div>
                <br/>
                <table className="table table-hover">
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                    <tbody className="bodyList-emp">
                        {
                            this.state.employeesList.map(
                                employees =>
                                <tr key={employees.employee_id}>
                                    <td>{employees.employeeName}</td>
                                    <td>{employees.gender === 1 ? 'Male' : 'Female'}</td>
                                    <td>{employees.age}</td>
                                    <td>{this.showPosition(employees.position)}</td>
                                    <td>{employees.state === 1 ? 'Offical' : 'Trainee'}</td>
                                    <th>
                                        <button className="btn btn-secondary" type="button"
                                         onClick={() => this.detailEmp(employees.employee_id)}
                                        >Detail</button>
                                        <button
                                        className="btn btn-secondary" type="button"
                                        onClick={() => this.getIdUpdate(employees.employee_id)}
                                        >Update</button>
                                        <button className="btn btn-danger"
                                        onClick={() =>this.deleteEmp(employees.employee_id,employees.employeeName)}
                                        >Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <br/>
                <div className="row">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-1">
                        <strong>Page:</strong>    
                    </div>
                    <div className="col-sm-5">
                        {
                            rows
                        }
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        empl: state.empl
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        solveId: (id) => dispatch(solveId(id)),
        solveDetail : (id) => dispatch(solveDetail(id))
    };
}

export default connect(mapStateToProps ,mapDispatchToProps)(ListEmployees);