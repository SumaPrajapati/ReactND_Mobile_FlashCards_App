import React, {Component} from 'react'
import {StyleSheet,View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import {addNewDeck} from '../actions/index'
import {saveDeckTitle} from '../utils/api'
import { orange } from '../utils/colors'


class NewDeck extends Component{
    constructor(){
        super()
        this.state={
            title : '',
        }
        this.handleChangeText = this.handleChangeText.bind(this)
    }

handleChangeText = (newtitle)=> {
    this.setState({
        title: newtitle

    })
}

handleButton = () =>{
    const {title} = this.state
    const {decks, addNewDeck} = this.props
    const {navigate} = this.props.navigation
    
    if(title === ''){
         alert('Please enter the title')
         return;
    }  
    addNewDeck(this.state.title)
    navigate('DeckView', {title: title})
}
    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.headerText}>Add New Deck</Text>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                    <View style={styles.titleInput}>
                        <TextInput 
                            style={{fontSize: 24, textAlign: 'center'}}
                            placeholder='Enter the deck title'
                            value={this.state.title}
                            onChangeText={this.handleChangeText}/>
                    </View>
                    <View > 
                        <Button text='Create Deck' func={this.handleButton}>Create Deck</Button>
                    </View>
            </KeyboardAvoidingView> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 100
    },
    headerText:{
     textAlign:'center',
     fontSize: 30,
     color: orange,
     paddingBottom: 30
    },
    text:{
        textAlign: 'center',
        fontSize: 24,
    },
    titleInput:{
        backgroundColor: 'blue',
        marginTop: 25,
        marginBottom: 0,
        padding: 10,
        borderRadius: 5,
        height: 50,
        width: 300,
    },
    buttonWapper:{
        backgroundColor: 'green',
        textAlign: "center",
        padding: 10,
        borderRadius: 5,
    },
  });

const mapStateToProps = decks =>{
    return{
       decks
    }
}   
export default connect(mapStateToProps, {addNewDeck})(NewDeck)
