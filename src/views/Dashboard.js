import React, {Component} from 'react';
import {View,Text,Button,TextInput,StyleSheet,ImageBackground,FlatList,Alert,BackHandler,Dimensions  } from 'react-native';
import {searchAction,logoutAction,resetCounter} from '../actions';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlanetCard from '../components/PlanetCard';



class Dashboard extends Component{

  constructor(props) {
    super(props);
    //setting default state
    this.state = {  searchText: '',itemClicked:false,planetDetails:{} };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.props.searchText('')
  }

  handleBackButtonClick() {
    Alert.alert(  
      'Logout',  
      'Do you want to logout?',  
      [  
          {  
              text: 'Cancel',  
              onPress: () => {return},  
              style: 'cancel',  
          },  
          {text: 'OK', 
            onPress: () => {
              this.props.resetCount();
              this.props.logout();
              this.props.navigation.goBack();
            }
          },  
      ]  
    )
    return true;  
  }

  static navigationOptions = (props) =>{
    return {
    title: 'Planet Details',
    headerLeft: ()=>null,
    headerTitleAlign: 'center',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#d73352',
      height:45,
    },
    headerRight: () => (
      <Button
        onPress={() => Alert.alert(  
          'Logout',  
          'Do you want to logout?',  
          [  
              {  
                  text: 'Cancel',  
                  // onPress: () => console.log('Cancel Pressed'),  
                  style: 'cancel',  
              },  
              {text: 'OK', 
                onPress: () => {
                  props.navigation.state.params.resetIt();
                  props.navigation.state.params.logoutIt();
                  props.navigation.goBack()
                }
              },  
          ]  
      )}
        title="Logout"
        color="#b83343"
        style={{fontSize:16}}
      />
    ),
    headerTitleStyle: {
      fontSize: 16, 
    },
    }
    };

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.props.navigation.setParams({
        resetIt: this.props.resetCount,
        logoutIt:this.props.logout
      });
      this._interval = setInterval(() => {
        this.props.resetCount();
      }, 20000);
  }
  
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      clearInterval(this._interval);
  }

    renderSeparator = () => {  
      return (  
          <View  
              style={{  
                  height: 1,  
                  width: "100%",  
                  backgroundColor: "#000",  
              }}  
          />  
      );  
  };

  getListViewItem = (planet) => {
    this.setState({
      itemClicked:true,
      planetDetails:planet
    })  
  }
    renderPlanet=(planet)=>{
      const {population}=planet;
      var planetFlex=10;
      if(population=="unknown"){
        planetFlex=10;
      }else{
        var digits=population.toString().length;
        digits>10?planetFlex=10:planetFlex=digits;
      }
      return(
        <TouchableOpacity onPress={this.getListViewItem.bind(this, planet)}>
        <View style={{flexDirection:'row'}}>
          <View style={{padding: 7,height: 34,backgroundColor:'#d73352',flex:planetFlex,borderBottomWidth:0.7}}>
            <Text style={styles.itemTextStyle}>{planet.name}</Text>
          </View>
          <View style={{height:34,flex:10-planetFlex}}>
          </View>
        </View>
        </TouchableOpacity>
      )
    }

    SearchFilterFunction=(text)=>{
      this.setState({
        searchText: text,
        itemClicked:false,
        planetDetails:{}
      })

      if(this.props.user.name =='Luke Skywalker' && this.props.searchCount>15){
        alert('Search limit exceeded!!');
      }
      else{
        this.props.searchText(text)
      }
    }
    render(){
        return(
          <ImageBackground  
            source={require('../../images/swt.jpg')} 
            style={styles.background}
            resizeMode='cover'
            >
            <View style={styles.viewStyle}>
                <TextInput
                style={styles.textInputStyle}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.searchText}
                underlineColorAndroid="transparent"
                placeholder="Search Planets"
                />
                {this.props.searchError !='' && <Text style={styles.textStyle}>{this.props.searchError}</Text>}
                {this.state.itemClicked?<PlanetCard details={this.state.planetDetails}/>:
                 <FlatList style={{marginTop: 45,flexGrow: 1}}
                    data={this.props.searchResult}  
                    renderItem={({item}) =>  this.renderPlanet(item)}  
                    keyExtractor={(item, index) => index.toString()}  
                />}
                {/* <View>
                  <Text style={{color:'white'}}>
                    Search Count is :{this.props.searchCount}
                  </Text>
                </View> */}
            </View>
          </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    viewStyle: {
      justifyContent: 'center',
      flex: 1,
      padding: 20,
    },
    textStyle: {
      padding: 10,
      color:'white',
      flex:20,
      marginTop:50
    },
    textInputStyle: {
      height: 40,
      borderWidth: 2.5,
      paddingLeft: 20,
      borderColor: '#d73352',
      borderRadius:20,
      backgroundColor: '#FFFFFF',
      position:'absolute',
      top:10,
      margin:15,
      width: Dimensions.get('window').width - 30
    },
    background:{
      width:null,
      height:null,
      flex:1
    },
    itemStyle: {  
      padding: 10,  
      height: 44,
      backgroundColor:'#d73352',
    },
    itemTextStyle:{
      fontSize: 15,  
      color:'white'  
    }  
  });


const mapStateToProps = (state) => {
  return {        
    searchError: state.searchReducer.searchError,
    searchResult:state.searchReducer.searchResult,
    searchCount:state.searchReducer.mySearchCount,
    user:state.authReducer.user
  }
};

const mapDispatchToProps=(dispatch)=>{
    return{
      searchText:(text)=>{
            dispatch(searchAction(text))
        },
      logout:()=>{
        dispatch(logoutAction())
      },
      resetCount:()=>{
        console.log("dispatching reset action")
        dispatch(resetCounter())
      }
    }
}

export default dashboardContainer=connect(mapStateToProps,mapDispatchToProps)(Dashboard);