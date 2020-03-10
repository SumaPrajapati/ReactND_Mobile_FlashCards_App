import {AsyncStorage} from 'react-native'

const STORAGE_KEY ='Mobile_Flashcards: decks';
const dummyDeckData={
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        },
      ]
    },
    Redux: {
        title: 'Redux',
        questions: [
        {
            question: 'What is Redux?',
            answer: 'Its make state management much easier in react'
        },
        ]
    },
  }

  export function getDecks(){
      return AsyncStorage.getItem(STORAGE_KEY).then(result =>{
           if(result !== null){
              return JSON.parse(result)
          }else{ 
              AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyDeckData))
              return dummyDeckData
          }
      });
  }

  export function getDeck(title){
       return getDeck().then((decks) => decks[title])
  }

  export function saveDeckTitle(title){
      const saveDeck = {title, questions: []}
      return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [title]: saveDeck}))
  }

  export function addCardToDeck(title, card){
      return getDecks().then((decks) =>{
          decks[title].questions.push(card)
          AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
        })
  }

export function removeDeck(title) {
  return AsyncStorage.getItem(STORAGE_KEY).then(decksData => {
    const decks = JSON.parse(decksData);
    delete decks[title];
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });

}