import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const QUIZ_NOTIFICATION_KEY = 'MobileFlashcards : Notifications'

function createNotification(){
    return {
        title: 'Mobile Flashcard quiz',
        body: 'Do not forget start mobile quiz today!',
        ios: {
            sound : true
        },
        andriod : {
            sound : true,
            priority : 'high',
            sticky : false
        }
    };
}

export function setQuizNotification(){
    AsyncStorage.getItem(QUIZ_NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) =>{
          if(data === null){
              Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) =>{
                  if(status === 'granted'){
                      Notifications.cancelAllScheduledNotificationsAsync()

                      let tomorrow = new Date()
                      tomorrow.setDate(tomorrow.getDate() + 1)
                      tomorrow.setHours(20)

                      Notifications.scheduleLocalNotificationAsync(
                          createNotification(), { time: tomorrow, repeat: 'day'}
                      )
                      AsyncStorage.setItem(QUIZ_NOTIFICATION_KEY, JSON.stringify(true))
                  }
              })
          }
      })
}

export function clearQuizNotification(){
    return AsyncStorage.removeItem(QUIZ_NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}