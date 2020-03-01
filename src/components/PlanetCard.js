import React, {Component} from 'react';
import {View,Text, StyleSheet,Dimensions} from 'react-native';
import {DataTable} from 'react-native-paper';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const PlanetCard=(props)=>{
    const {details}=props;
    
    var tableData=[
        ["Rotation Period",details.rotation_period],
        ["Orbital Period",details.orbital_period],
        ["Diameter",details.diameter],
        ["Climate",details.climate],
        ["Gravity",details.gravity],
        ["Terrain",details.terrain],
        ["Surface Water",details.surface_water],
        ["Population",details.population],
        ["Created",details.created],
        ["Edited",details.edited]
    ]
    return(

        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#fff'}}>
                <Row data={[details.name]} style={styles.head} textStyle={styles.text,{fontSize:18,alignSelf:'center',color:'white'}}/>
                <Rows data={tableData} textStyle={styles.text}/>
            </Table>
        </View>
    )
}

const styles=StyleSheet.create({
    cardStyle:{
        backgroundColor:'#d73352',
        //  height:300,
        borderRadius:20,
        position:'absolute',
        top:120,
        width: 330,
        margin:15,
        flex:1,
        alignItems:'center' 
    },
    textWrapStyle:{
        padding:2,
        alignSelf:'flex-start',
        flexDirection:'row',
        backgroundColor:'red',
        width:300
    },
    textStyle:{
        color:'white',
        fontSize:15
    },
    rowStyle:{
        height:25
    },
    container: { backgroundColor: '#d73352',top:70,position:'absolute',width: Dimensions.get('window').width - 30,margin:15,flex:1,},
    head: { height: 40, backgroundColor: '#d73352',alignSelf:'center' },
    text: { margin: 5,color:'white' }

})

export default PlanetCard;