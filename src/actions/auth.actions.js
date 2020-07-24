import {auth,firestore} from 'firebase';
import { authConstant } from './constants';

export const signup=(user)=>{
    return async (dispatch)=>{
        const db=firestore();
        dispatch({type:`${authConstant.USER_LOGIN}_REQUEST`});
        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
                 console.log(data)
                const currentuser=auth().currentUser;
                const name=`${user.firstname} ${user.lastname}`;
                currentuser.updateProfile({
                    displayName:name
                })
                .then(()=>{
                    // if here then update success
                    db.collection('users')
                    .doc(data.user.uid)
                    .set({
                        firstname:user.firstname,
                        lastname:user.lastname,
                        uid:data.user.uid,
                        createdAt:new Date(),
                        isOnline:true
                    })
                    .then(()=>{

                        const loggInUser={
                            firstname:user.firstname,
                            lastname:user.lastname,
                            uid:data.user.uid,
                            email:user.email
                        }

                    localStorage.setItem('user',JSON.stringify(loggInUser))
                    console.log('User loggin Successfully');    

                    dispatch({
                        type:`${authConstant.USER_LOGIN}_SUCCESS`,
                        payload:{user:loggInUser }
                    })

                })
                    .catch((error)=>{
                        console.log(error)
                        dispatch({type:`${authConstant.USER_LOGIN}_FAILURE`,payload:{error}})
                    })
                })
        })
        .catch(error=>{console.log(error)})
    }
}

export const signin = (user) =>{
    return async dispatch =>{
        dispatch({type:`${authConstant.USER_LOGIN}_REQUEST`});
        auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then((data)=>{
            console.log(data);

            const db = firestore();
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline:true
            })
            .then(()=>{

                const name=data.user.displayName.split(' ');
                const firstname=name[0];
                const lastname=name[1];

                const loggInUser={
                    firstname,
                    lastname,
                    uid:data.user.uid,
                    email:data.user.email
                }

                localStorage.setItem('user',JSON.stringify(loggInUser));
                dispatch({
                    type:`${authConstant.USER_LOGIN}_SUCCESS`,
                    payload:{user:loggInUser}
                })

            })
            .catch((error)=>{
                console.log(error)
            })
    

        })
        .catch(error=>{
            console.log(error);
            dispatch({
                type:`${authConstant.USER_LOGIN}_FAILURE`,
                payload:{error}
            })
        })
    }
}


export const isLoggedInUser =   () =>{
    return async dispatch =>{
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null;

        if(user){
            dispatch({
                type:`${authConstant.USER_LOGIN}_SUCCESS`,
                payload:{ user}
            })
        }else{
            dispatch({
                type:`${authConstant.USER_LOGIN}_FAILURE`,
                payload:{ error: 'Login again please'}
            })
        }
    }
}

export const logoutAction = (uid)=>{
    return async dispatch => {
        dispatch({type:`${authConstant.USER_LOGOUT}_REQUEST`});
        //Now lets logout

        const db = firestore();
        db.collection('users')
        // .where('uid','==',uid)
        .doc(uid)
        .update({
            isOnline:false
        })
        .then(()=>{
            auth()
            .signOut()
            .then(()=>{
                localStorage.clear();
                dispatch({type:`${authConstant.USER_LOGOUT}_SUCCESS`});
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:`${authConstant.USER_LOGOUT}_FAILURE`,payload:{error}});
            })
        })
        .catch((error)=>{
            console.log(error);
        })


     
    }
}