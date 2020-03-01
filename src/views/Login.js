import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground, 
  TouchableOpacity,
  Button,
  ActivityIndicator
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {authAction,logoutAction} from '../actions';
import {connect} from 'react-redux';

class Login extends Component{
    static navigationOptions = {
        headerShown: false
    }
    constructor(props){
        super(props);
        this.state={
            // unm:'Luke Skywalker',
            // pwd:'19BBY'
            unm:'',
            pwd:''
        }
    }
    performLogin=()=>{
        this.props.authenticateUser({
            username:this.state.unm,
            password:this.state.pwd,
        })
    }
    render(){
        return(
        <ImageBackground  
            source={require('../../images/SW.jpg')} 
            style={styles.background}
            resizeMode='cover'
            >
            <View style={styles.container}>
                 <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image
                            source={require('../../images/person.png')}
                            style={styles.iconStyle}
                            resizeMode='contain'
                        />
                    </View>
                    <TextInput 
                        placeholder='Username'
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        value={this.state.unm}
                        onChangeText={(text)=>{
                            this.setState({unm:text})
                        }}
                        >                        
                    </TextInput>
                 </View>
                 <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image
                            source={require('../../images/lock.png')}
                            style={styles.iconStyle}
                            resizeMode='contain'
                        />
                    </View>
                    <TextInput 
                        placeholder='Password'
                        secureTextEntry
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                        value={this.state.pwd}
                        onChangeText={(text)=>{
                            this.setState({pwd:text})
                        }}
                        >                        
                    </TextInput>
                 </View>
                    {this.props.loggedIn==true && this.props.error =='' && this.props.loading==false ? this.props.navigation.navigate('Dashboard') :<Text style={{color:'white'}}>{this.props.error}</Text>}
                 <TouchableOpacity activeOpacity={.5} onPress={this.performLogin}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                 </TouchableOpacity>
                 <Spinner
                    visible={this.props.loading}
                    textContent={'Signing-in...'}
                    textStyle={{color:'white'}}
                />
             </View>
            </ImageBackground >
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:15
    },
    background:{
        width:null,
        height:null,
        flex:1
    },  
    inputView:{
        flexDirection:'row'
    },
    inputWrap:{
        flexDirection:'row',
        marginVertical:10,
        height:40,
        backgroundColor:'transparent',
    },
    inputStyle:{
        flex:1,
        paddingHorizontal: 10,
        backgroundColor:'black',
        borderWidth: 1,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        borderLeftWidth:0,
        color:'white'
    },
    iconWrap:{
       paddingHorizontal:7,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'#d73352',
       borderWidth: 1,
       borderTopLeftRadius:10,
       borderBottomLeftRadius:10,
       borderRightWidth:0 
    },
    iconStyle:{
        width:20,
        height:20
    },
    buttonStyle:{
        backgroundColor:'#d73352',
        paddingVertical:10,
        marginVertical:20,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 1,
        borderRadius:10,
    },
    buttonText:{
        color:'#fff',
        fontSize:15

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

const mapStateToProps = (state) => {
    return {        
        error: state.authReducer.error,
        loading:state.authReducer.loading,
        loggedIn:state.authReducer.loggedIn,
        user:state.authReducer.user
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        authenticateUser:(credentials)=>{
            dispatch(authAction(credentials))
        },
        logout:()=>{
            dispatch(logoutAction())
          }
    }
}

export default loginContainer=connect(mapStateToProps,mapDispatchToProps)(Login);

