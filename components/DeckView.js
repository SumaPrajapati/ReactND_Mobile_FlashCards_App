import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Button from './Button'
import IndividualDeck from './IndividualDeck'
import {white, red, gray, lightGreen} from '../utils/colors'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/index'

class DeckView extends Component{

    navigate = (e) => {
        this.props.navigation.navigate(e, {
          deck: this.props.deck.title
        })
      }

    handleDeletePress = () =>{
        const {deck} = this.props
        const {deleteDeck} = this.props
        
        deleteDeck(deck.title)
        alert('Are you sure to delete this deck')
        this.props.navigation.navigate('DeckList')
    }

    render(){
        const deck= this.props.deck
        // const item2 =this.props.item2
       // const {deck} = this.props 
       if (!deck) {
            return <Text>Item was Deleted</Text>
        }
        return(
            <View style={styles.container}>
                <View>
                    {/* <Text>{deck.title}</Text> */}
                   <IndividualDeck id={deck.title} /> 
                </View>
                <View>
                    <Button text='Add Cards'  func={()=>this.navigate('AddCardView')} />
                </View>
                <View>
                    <Button text='Start Quiz'  func={()=>this.navigate('QuizView')}/> 
                </View>
                <View style={styles.btnDelete}>
                    <TouchableOpacity onPress={this.handleDeletePress}>
                                <Text style={{textAlign: 'center', fontSize: 24}}>Delete Deck</Text>
                     </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 60
    },
    btnDeck:{
        backgroundColor: lightGreen,
        //backgroundColor: 'rgb(225,225,225)',
        alignItems: 'center',
        flexBasis: 120,
        justifyContent: 'center',
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginBottom: 10,
        width: 300,
    },
    btnDelete:{
        backgroundColor: red,
        marginTop: 35,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        height: 50,
        width: 200,
        
    }
})

function mapStateToProps(state, {navigation}){
    const title =navigation.getParam('title');
    //console.log('Testing today', title)
    const deck = state[title]
   // console.log('deck', deck)
    return {
       deck
    }
}
export default connect(mapStateToProps, {deleteDeck})(DeckView)