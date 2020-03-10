import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import IndividualDeck from './IndividualDeck'
import {connect} from 'react-redux'
//import decks from '../reducers'
import {handleInitialData} from '../actions/index'

class DeckList extends Component{
    componentDidMount(){
        this.props.handleInitialData()
    } 
   
    render(){
        return(
            <ScrollView style={styles.container}> 
                <Text style={{textAlign: 'center', marginBottom: 30, fontSize: 40, color: 'orange'}}>Mobile Flashcards</Text> 
                      {Object.values(this.props.decks).map(deck =>(
                         <TouchableOpacity key={deck.title} onPress={() =>{this.props.navigation.navigate('DeckView', {title: deck.title} )}}>
                                <IndividualDeck id={deck.title} /> 
                        </TouchableOpacity> 
                        )
                    )} 
            </ScrollView> 
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        decks: state
    }
}
export default connect(mapStateToProps, {handleInitialData})(DeckList) 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 30,
        padding: 10,
        // alignItems: 'center',
    },

});
//export default DeckList