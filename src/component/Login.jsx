import React, { Component } from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from './index';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = this.initialValue;

        // this.validateLogin = this.validateLogin.bind(this);
    }


    initialValue = {
        username: '', password: '', error: ''
    }

    resetLogin = () =>{
        // e.preventDefault();
        this.setState(() => this.initialValue);
    }

    solveLogin = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    validateLogin =() =>{
        this.props.authenticateUser(this.state.username, this.state.password);
        
        // setTimeout(() =>{
        //     if(this.props.auth.isLoggedIn){
        //         return this.props.history.push("/project");
        //     }else{
        //         this.resetLogin();
        //     }
        // });

        

        setTimeout(()=>{
            if(this.props.auth.isLoggedIn){
                return this.props.history.push('/welcome');
             }else{
                 this.resetLogin();
                 this.setState({
                     error: "Username or password wrong!"
                 })
             }
        }, 500)
    }



    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        
                    </div>
                    <div className="col-sm-4">
                        <br/>
                        <br/>
                        <div>

                        </div>
                        <form method="POST">
                            <div className= "form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Enter your Username"
                                    value={this.state.username} name="username"
                                    onChange={this.solveLogin}
                                />
                            </div>
                            <div className= "form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" 
                                 placeholder="Enter your Password"
                                 value={this.state.password} name="password"
                                 onChange={this.solveLogin}
                                 />
                            </div>
                            <div>
                                <label style={{color: "red"}}>{this.state.error}</label>
                            </div>
                            <button className="btn btn-primary"
                               disabled={this.state.username.length ===0 || this.state.password.length === 0}
                               onClick={this.validateLogin}
                               type="button"
                            >Login</button>
                            <button style={{marginLeft: "15px"}} className="btn btn-primary"
                            onClick={this.resetLogin} type="button"
                            >Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth : state.auth
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        authenticateUser: (username, password) => dispatch(authenticateUser(username,password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);