import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import {gray, white, lightGreen} from '../utils/colors'
import { connect } from 'react-redux'

class IndividualDeck extends Component{

    render(){
        const {deck} = this.props
        //const totalQuestion = dec;
        //console.log('Checking Ios applicatiion', deck)

        return(
            <View style={styles.decksContainer}>
                <View>
                    <Text style={{fontSize: 24, textAlign: 'center', color: 'green'}}>{deck.title}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 20, textAlign: 'center', color: 'green'}}>{deck.questions ? deck.questions.length : "error"} cards</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    decksContainer: {
        backgroundColor: lightGreen,
        //backgroundColor: 'rgb(225,225,225)',
        alignItems: 'center',
        flexBasis: 120,
        justifyContent: 'center',
        minHeight: 180,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginLeft: 20,
        marginBottom: 10,
        width: 350,
    },
});

  const mapStateToProps = (state, {id}) =>{
    const deck = state[id]
    return{
        deck
    }
}
export default connect(mapStateToProps)(IndividualDeck) 
