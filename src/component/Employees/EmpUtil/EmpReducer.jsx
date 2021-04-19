import React, { Component } from 'react';
import { connect } from 'react-redux';
import {UPDATE, DELETE, DETAIL} from './EmpType';

const initEmpValue ={
    id: ''
}

const reducerEmp =(state = initEmpValue, action) =>{
    switch(action.type){
        case UPDATE : 
            return{
                id : action.payload
        };
        case DETAIL :
            return{
                id: action.payload
            }
        default: 
            return state;
    }
}

export default reducerEmp;

