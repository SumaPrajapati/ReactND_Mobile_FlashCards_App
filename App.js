import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {purple, green, white} from './utils/colors'
import { createAppContainer } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import NewDeck from './components/NewDeck'
import IndividualDeck from './components/IndividualDeck'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import AddCardView from './components/AddCardView'
import QuizView from './components/QuizView'
import { setQuizNotification } from './utils/helper'
import Constants from 'expo-constants'


const tabObject = {
 DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NewDeck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
};

const options = { 
  navigationOptions: {
    headerShown: false,
  //header: null
},
tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? green : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : green,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset:{
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const MainNavigator = createAppContainer(
    createStackNavigator({
        Home: {
          screen:  
                Platform.OS === 'ios' ?
                createBottomTabNavigator(tabObject, options)
                :
                createMaterialTopTabNavigator(tabObject, options)
              },
        DeckView: {
          screen : DeckView,
            navigationOptions:{
            headerTintColor: white,
            headerStyle:{
              backgroundColor: green,
            },
            title:'Deck View',
          }
        },
        AddCardView: {
          screen : AddCardView,
            navigationOptions:{
            headerTintColor: white,
            headerStyle:{
              backgroundColor: green,
            },
            title:'Add Card',
          }
        },
       QuizView: {
          screen : QuizView,
            navigationOptions:{
            headerTintColor: white,
            headerStyle:{
              backgroundColor: green,
            },
            title:'Quiz',
          }
        }
    })
  )  
const store= createStore(reducer,{}, applyMiddleware(thunk))

export default class App extends React.Component {
 componentDidMount()
  {
     setQuizNotification();
  }  
    
  render(){
    return (
      <Provider store={store}>
          <View style={{ flex: 1 }}>
            <View style={styles.statusBar}/>
            <View style={{flex:1}}>
              <StatusBar  barStyle = "light-content" translucent = {true}></StatusBar>
              <MainNavigator />
            </View>
        </View>
      </Provider>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   /*  alignItems: 'center',
    justifyContent: 'center', */
  },
  statusBar:{
    backgroundColor: green,
    height: 50,
    // height: Constants.statusBarHeight,
  },
});
