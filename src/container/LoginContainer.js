import Login from '../views/Login';
import {authAction} from '../actions';
import {connect} from 'react-redux';

const mapStateToProps=(state)=>{
    return{
        
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        authenticateUser:(credentials)=>{
            dispatch(authAction(credentials))
        }
    }
}

const loginContainer= connect(mapStateToProps,mapDispatchToProps)(Login);
export default loginContainer;