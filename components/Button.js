import React from 'react'
import {green, white, blue} from '../utils/colors'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'

const Button = (props) => (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.func}>
        <Text style={styles.btnText}>{props.text}</Text>
    </TouchableOpacity>
 )

 const styles= StyleSheet.create({
     buttonStyle:{
        borderColor:'#999',
        backgroundColor: green,
        marginTop: 35,
        marginBottom: 10,
        padding: 10,
       
        borderRadius: 5,
        height: 50,
        width: 200, 
       
       /*  backgroundColor: 'red', 
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        width: 200,
        height: 50, */
     },
     btnText:{ 
        fontSize: 24,
        textAlign:'center'
     }
 })
export default Button

