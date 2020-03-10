import { getDecks, saveDeckTitle, addCardToDeck, removeDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_NEW_CARD = 'ADD_NEW_CARD'
export const DELETE_DECK = 'DELETE_DECK'


export function handleInitialData(){
    return(dispatch) =>{
        getDecks().then((decks)=>{
             dispatch({
                 type: RECEIVE_DECKS,
                 decks
             })
        })
    }
}


export function addNewDeck(title){
    return(dispatch) =>{
        dispatch({
            type: ADD_NEW_DECK,
            title
        })
        saveDeckTitle(title)
    }
}

export function addNewCard(deck, card ){
    return(dispatch) =>{
        dispatch({
            type : ADD_NEW_CARD,
            deck,
            card  
        })
        addCardToDeck(deck, card)
    }
} 

/* export function deleteDeck(title){
    return(dispatch) => {
          dispatch({
            type: DELETE_DECK,
            title
          })
          removeDeck(title) 
    }
} */

export function deleteDeck(title){
    return(dispatch) => {
        removeDeck(title).then(()=>{
          dispatch({
            type: DELETE_DECK,
            title
          })
        })  
    }
}



