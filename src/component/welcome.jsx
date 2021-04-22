import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom' 

class welcome extends Component {
    constructor(props){
        super(props);
        this.state = ({

        });
        // this.solveLogin = this.solveLogin.bind(this);
    }

    // solveLogin = () =>{
    //   this.props.history.push("/login")
    // }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="main-content">
                    <h2>Welcome to projects management</h2>
                    <p>We are all in the gutter, but some of us are looking at the stars. ― Oscar Wilde</p>
                    {/* <button className="btn btn-primary" onClick={this.solveLogin}>Login</button> */}
                    {/* <Link to="/login">Login</Link> */}
                </div>
                {/* <div className="header main-footer main-footer p-4 my-3 bg-dark text-white">
                    <p>Enjoy the liite thing</p>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps)(welcome);