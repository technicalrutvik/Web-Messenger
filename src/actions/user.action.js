import { userConstants } from "./constants"
import {firestore} from 'firebase';
export const getRealTImeUser = (uid) => {
    return async (dispatch) => {
        dispatch({type:`${userConstants.GET_REALTIME_USERS}_REQUEST`})
        const db=firestore();
        const unsubscirbe= db.collection("users")
        .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach(function(doc) {
            if(doc.data().uid != uid){
                users.push(doc.data());
            }
        });
         console.log(users);
        dispatch({type:`${userConstants.GET_REALTIME_USERS}_SUCCESS`,payload:{users}})
    });
    return unsubscirbe;
    }
}
 export const updateMessage = (msgObj) => {
     return async dispatch => {
         const db =firestore();
         db.collection('conversations')
         .add({
            ...msgObj,
            isView:false,
            createdAt: new Date()
         })
         .then((data)=>{
                console.log(data)
                // dispatch({ 
                //     type: userConstants.GET_REALTIME_MESSAGES,
                // })
         })
         .catch((error)=>{
             console.log(error);
         })
     }
 }


 export const getRealTimeConversations = (user) => {
     return async dispatch => {
         const db =firestore();
         db.collection('conversations')
         .where('user_uid_1','in',[user.uid_1,user.uid_2])
         .orderBy('createdAt','asc')
         .onSnapshot((querySnapshot) => {
             const conversations = [];
             querySnapshot.forEach(doc => {

                if(
                    (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                    ||
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)

                 ) 
                 {
                    conversations.push(doc.data())
                 }

             })

             if(conversations.length > 0){
                 dispatch({ 
                     type: userConstants.GET_REALTIME_MESSAGES,
                     payload:{conversations}
                 })
             }else{
                 dispatch({
                     type:`${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
                     payload: {conversations}
                 })
             }

             console.log(conversations)
         })
         //user_uid_1 == 'myid' and user_uid_2 == 'yourId' OR  user_uid_1 == 'yourId' and user_uid_2 == 'myId'
     }
 }