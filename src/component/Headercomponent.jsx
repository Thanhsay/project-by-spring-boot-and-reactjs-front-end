import React, { Component } from 'react';
import '../index.css';
// import {solveSearch} from './searchUtil/SearchAction'
import {logOut} from './Utils/UltiAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import reducer from './Utils/UtilReducer';

class Headercomponent extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
        //this.homeToProject = this.homeToProject.bind(this);
        // this.searchEmpAndPro = this.searchEmpAndPro.bind(this);
    }

    // homeToProject = () => {
    //     this.props.history.push('/project');
    // }


    // logSearch = (e) =>{
    //     let con = e.target.name;
    //     let num = e.target.value;

    //     this.setState({
    //         [con]: [num]
    //     });
    // }

    // searchEmpAndPro(){
    //     this.props.solveSearch(this.state.log);

    //     setTimeout(()=>{
    //         this.props.history.push("/resultSearch");
    //     }, 500);
    // }

    logOut = () =>{
        this.props.logOut();
    }

    render() {

        const adminLink = (
            <>
                <Link className="head-link" to="/welcome">Home</Link>
                <Link className="head-link" to="/project">Project</Link>
                <Link className="head-link" to="/emp">Employee</Link>
                <Link className="head-link" to="/resultSearch">Search</Link>
                <Link className="head-link" to="/login" onClick={this.logOut}>Logout</Link>


            </>
        )

        const guestLink = (
            <>
                <Link className="head-link" to="/login">Login</Link>
            </>
        )

        return (
            <div className="header p-4 my-3 bg-dark text-white">
                <div className="row">
                    <div className="col-sm-4">
                        <h3 className="project-name">PROJECTS MANAGEMENT</h3>
                    </div>
                    <div className="col-sm-8 menu-bar">
                        {this.props.auth.isLoggedIn ? adminLink : guestLink}
                        {/* {adminLink} */}
                        <div className="search-container">
                            <form className>
                                <Link to=""></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        auth: state.auth
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        logOut : () => dispatch(logOut())
    }
}

// const mapDispatchToProps = dispatch =>{
//     return {
//         solveSearch: (log) => dispatch(solveSearch(log))
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Headercomponent);