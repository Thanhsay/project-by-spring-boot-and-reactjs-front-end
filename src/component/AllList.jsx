import React, { Component } from 'react';
import ProjectService from '../service/ProjectService';
import $, { event } from 'jquery';
import ReactToExcel from 'react-html-table-to-excel'; 

class AllList extends Component {

    constructor(props){
        super(props);
        this.state={
            projects: [],
            employees: [],
        }
    }

    value = {
        valueVariables: []
    }

    componentDidMount(){
        ProjectService.getProject().then(res=>{
            this.setState({
                projects: res.data
            });
        });
    }

    creatValue = (id) =>{
        this.value.valueVariables.push({id: id, value: true})
    }

    showState = (id) =>{
        if(id == 1){
            return "Finished";
        }else{
            return "Processing";
        }
    }

    showEmp = async(id) =>{
        for(let j = 0; j< this.value.valueVariables.length; j++){
            if(this.value.valueVariables[j].id == id){
                if(this.value.valueVariables[j].value){
                    let emp = [];
                    const res = await ProjectService.getDetailsEmployee(id);
                    emp = res.data;
                    for(let i = 0; i<emp.length; i++){
                        if(emp[i].position == '1'){
                            emp[i].position = "Leader";
                        }else{
                            if(emp[i].position == '0'){
                                emp[i].position = "Developer";
                            }else{
                                if(emp[i].position == '2'){
                                    emp[i].position = "Tester";
                                }else{
                                    emp[i].position = "Business Analyst";
                                }
                            }
                        };
                        if(emp[i].state == '1'){
                            emp[i].state = "Offical";
                        }else{
                            emp[i].state = "Trainee";
                        }
                    }
                    for(let i = 0; i<emp.length; i++){
                        $("#emp"+id).append("<tr class='removeEmp"+id+"'><td colspan = '5'></td><td>"+emp[i].employeeName+
                        "</td><td>"+emp[i].position+
                        "</td><td>"+emp[i].state+"</td></tr>");
                    }
                }else{
                    $(".removeEmp"+id).remove();
                }
                this.value.valueVariables[j].value= !this.value.valueVariables[j].value;
            }
        }
    }


    render() {

        return (
            <div style={{display:"block"}}>
                <h3 style={{textAlign: "center"}}>List Details</h3>
                <br/>
                <table className="table table-bordered" id="table-to-xls">
                    <tr style={{textAlign: "center"}}>
                        <th colSpan="5">PROJECT</th>
                        <th colSpan="3">EMPLOYEE</th>
                    </tr>
                    <tr style={{textAlign: "center"}}>
                        <th>PROJECT</th>
                        <th>LEADER</th>
                        <th>DAY START</th>
                        <th>DAY END</th>
                        <th>STATE</th>
                        <th>NAME</th>
                        <th>POSITION</th>
                        <th>STATE</th>
                    </tr>
                    {
                        this.state.projects.map(
                            project => 
                                <tbody key={project.project_id} id={"emp"+project.project_id}>
                                    <tr onClick={() => this.showEmp(project.project_id)}>
                                        <td>{project.projectName}</td>
                                        <td>{project.leadName}</td>
                                        <td>{project.projectStart}</td>
                                        <td>{project.projectEnd}</td>
                                        <td>{this.showState(project.projectState)}</td>
                                        <td colSpan="3"></td>
                                    </tr>
                                    {
                                        this.creatValue(project.project_id)
                                    }
                                    
                                </tbody>
                        )
                    }
                </table>
                <ReactToExcel 
                    className="btn export btn-secondary"
                    table="table-to-xls"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText="EXPORT FILE TO EXCEL"
                />
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default AllList;