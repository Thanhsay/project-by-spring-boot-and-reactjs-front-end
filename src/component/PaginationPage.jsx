import React, { Component } from 'react';
import ProjectService from '../service/ProjectService';
import $, { event } from 'jquery';
import '../index.css';
import {connect} from 'react-redux'


class PaginationPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            project: [],
            totalPage: '',
            activePage: 1,
            stateDelete: ''
        }
        this.doUpdate = this.doUpdate.bind(this);
        this.projectAdd = this.projectAdd.bind(this);
        this.projectList = this.projectList.bind(this);
        this.doDetail = this.doDetail.bind(this);
        this.allList = this.allList.bind(this);
    }
componentDidMount(){
    ProjectService.paginationPut(this.state.activePage).then( res =>{
        let list = res.data;
        this.setState({
            project: list.projects,
            totalPage: list.totalPage
            //activePage: list.activePage
        });
    });
}

doUpdate(id){
    this.props.history.push(`/update/${id}`);
}

doDetail(id){
    this.props.history.push(`/detail/${id}`)
}

// solvePage = (i) =>{
//     ProjectService.pagination(i).then( res =>{
//         let list = res.data;
//         this.setState({
//             project: list.projects,
//             totalPage: list.totalPage,
//             activePage: list.activePage
//         });
//     });
//     this.props.history.push("/pagination");
// } 

// numberOfPage = () =>{
//     let num = this.state.totalPage;
//     for(let i=0; i<num; i++){
//         return <a className="" onClick={this.solvePage(i)}>{this.i}</a>
//     }
// }

getPage(page){
    ProjectService.paginationPut(page).then(res => {
        let list = res.data;
        this.setState({activePage: page});
    })
    this.componentDidMount();
}

projectList(){
    this.props.history.push('/project');
}

projectAdd(){
    this.props.history.push('/add');
}

allList(){
    this.props.history.push('/allList');
}

deleteState(name,id){
    const con = window.confirm("Do you want to delete project: "+name+ "?");
        if(con === true){
            this.deleteProject(id);
        }else{

        }
}


deleteProject(id){
    ProjectService.deleteProject(id).then(res =>{
        let st = res.data;
        this.setState({stateDelete: st})
        if(this.state.stateDelete === 'success'){
            alert('Deleted!');
            this.componentDidMount();
        }else{
            alert('Delete Failed!');
        }
    });
    // this.setState({project: this.state.project.filter(project => project.project_id !== id)});
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
                <div className="menu-button">
                    <button className="btn btn-secondary" onClick={this.projectList}>List</button>
                    <button className="btn btn-secondary" onClick={this.projectAdd}>Add</button>
                    <button className="btn btn-secondary" onClick={this.allList}>Show All List</button>
                </div>
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
                                    <td>{project.projectName}</td>
                                    <td>{project.projectStart}</td>
                                    <td>{project.projectEnd}</td>
                                    <td>{project.leadName}</td>
                                    <td>{project.projectState===1 ? 'Finished' : 'Processing'}</td>
                                    {/* {this.getState()} */}
                                    <th>
                                        <button className="btn btn-secondary" 
                                        onClick={() => this.doDetail(project.project_id)}>Detail</button>
                                        <button
                                        className="btn btn-secondary" 
                                        onClick={() => {this.doUpdate(project.project_id)}}>Update</button>
                                        <button className="btn btn-danger"
                                        onClick={() => this.deleteState(project.projectName, project.project_id)}>Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-sm-1">
                        <strong>Page:</strong>    
                    </div>
                    <div className="col-sm-11">
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

// const mapStateToProps = state =>{
//     return {
//         auth: state.auth
//     };
// }

export default PaginationPage;
