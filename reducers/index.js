import {RECEIVE_DECKS, ADD_NEW_DECK, ADD_NEW_CARD, DELETE_DECK} from '../actions/index'
import { ObjectUnsubscribedError } from 'rxjs'

export default function decks( state = {}, action){
    switch (action.type){
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_NEW_DECK :
            const {title} = action
            return {
                ...state,
                [title]:{ title,
                questions: []
               }
            }  
         case ADD_NEW_CARD :
             console.log("action.deck=-=-=-=-=-=-=-=-=-=-")
             console.log(action.deck, action.card)
             return {
                 ...state,
                    [action.deck]: {
                        ...state[action.deck],
                        questions: [...state[action.deck].questions, action.card]
                    }
                 }

        case DELETE_DECK:
            const newState = {}
            Object.keys(state).forEach(title => {
                if (title != action.title) {
                    newState[title] = state[title]
                }
            })
            return newState

  /*           return Object.keys(state).reduce((decks, title) => {                
                if (title !== action.title) {
                    decks[title] = state[title];
                }
                return decks;
                }, {});   */                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
         default:
            return state 
    }
}