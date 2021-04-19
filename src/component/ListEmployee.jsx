import React, { Component } from 'react';
//import { connect } from 'react-redux';
import ProjectService from '../service/ProjectService'
import $, { event } from 'jquery';
import { confirmAlert } from 'react-confirm-alert';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import '../index.css';

class ListEmployee extends Component {
    constructor(props){
        super(props);
        this.state = {
            project : [],
            stateDelete: ''
        }
        this.addProject = this.addProject.bind(this);
        this.homeList = this.homeList.bind(this);
        this.editProject = this.editProject.bind(this);
        // this.deleteToList = this.deleteBut.bind(this); 
        this.deleteDo = this.deleteDo.bind(this);
    }

    editProject(id){
        this.props.history.push(`/update/${id}`);
    }

    componentDidMount(){
        ProjectService.getProject().then((respronse) => {
            this.setState({ project: respronse.data });
        });
    }
    // componentDidUpdate(){
    //     let statenumber = $('#projectState');
    //     // $('#projectState').forEach(element => {
            
    //     // });
    //     if(statenumber == 1){
    //         $('#state').html("finished");
    //     }else{
    //         $('#state').html(statenumber);
    //     }
    // }
    addProject(){
        this.props.history.push('/add');
    }
    
    homeList(){
        this.props.history.push('/project')
    }

    deleteBut = (name, id) => {
        const con = window.confirm("Do you want to delete project: "+name+ "?");
        if(con === true){
            this.deleteDo(id);
        }else{

        }
    }

    deleteDo = (id) => {
        ProjectService.deleteProject(id).then(res => {
            let st = res.data;
            this.setState({stateDelete: st});
            if(this.state.stateDelete === 'success'){
                alert("Deleted!");
            }else{
                alert("Couldn't delete! ");
            }
        });
        //------------ Load again
        this.setState({project: this.state.project.filter(project => project.project_id !== id)});
    }

    // deleteToList(){
    //     this.props.history.push('/project');
    // }

    render() {
        return (
            <div>
                <div className="menu-content">
                    <button type="button" className="btn btn-secondary" onClick={this.homeList}>List</button>
                    <button type="button" className="btn btn-secondary content-add" onClick={this.addProject}>Add</button>
                </div>
                <h3 className="content-title">Project List</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Day Start</th>
                            <th>Day End</th>
                            <th>Leader Name</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="bodyList">
                        {
                            this.state.project.map(
                                project =>
                                <tr key={project.project_id}>
                                    <th>{project.projectName}</th>
                                    <th>{project.projectStart}</th>
                                    <th>{project.projectEnd}</th>
                                    <th>{project.leadName}</th>
                                    <th>{project.projectState == 1? "Finished" : "Processing"}</th>
                                    {/* {this.getState()} */}
                                    <th>
                                        <button onClick={ () =>  this.editProject(project.project_id)} 
                                        className="btn btn-secondary">Update</button>
                                        <button className="btn btn-secondary">Detail</button>
                                        <button className="btn btn-danger" onClick={ () => this.deleteBut(project.projectName, project.project_id)} >Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListEmployee
//style={{marginLeft: '10px'}}