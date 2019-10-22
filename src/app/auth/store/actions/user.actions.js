import history from '@history';
import {setDefaultSettings, setInitialSettings} from 'app/store/actions/fuse';
import _ from '@lodash';
import store from 'app/store';
import * as Actions from 'app/store/actions';
import firebase from 'firebase/app';
import firebaseService from 'app/services/firebaseService';
import auth0Service from 'app/services/auth0Service';
import jwtService from 'app/services/jwtService';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

/**
 * Set user data from Auth0 token data
 */
export function setUserDataAuth0(tokenData)
{
    const user = {
        role: ['admin'],
        from: 'auth0',
        data: {
            displayName: tokenData.username,
            photoURL   : tokenData.picture,
            email      : tokenData.email,
            settings   : (tokenData.user_metadata && tokenData.user_metadata.settings) ? tokenData.user_metadata.settings : {},
            shortcuts  : (tokenData.user_metadata && tokenData.user_metadata.shortcuts) ? tokenData.user_metadata.shortcuts : []
        }
    };

    return setUserData(user);
}

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user, authUser)
{
    if ( user && user.data &&
        user.data.settings &&
        user.data.settings.theme &&
        user.data.settings.layout &&
        user.data.settings.layout.style )
    {
        // Set user data but do not update
        return setUserData(user);
    }
    else
    {
        // Create missing user settings
        return createUserSettingsFirebase(authUser);
    }
}

/**
 * Create User Settings with Firebase data
 */
export function createUserSettingsFirebase(authUser)
{
    console.log('Entered the createUserSettingsFirebase function.');
    return (dispatch, getState) => {
        const guestUser = getState().auth.user;
        const fuseDefaultSettings = getState().fuse.settings.defaults;
        const currentUser = firebase.auth().currentUser;

        /**
         * Merge with current Settings
         */
        const user = _.merge({}, guestUser,
            {
                uid : authUser.uid,
                from: 'firebase',
                role: ["admin"],
                data: {
                    displayName: authUser.displayName,
                    email      : authUser.email,
                    settings   : {...fuseDefaultSettings}
                }
            }
        );
        
        // Adding infomrmation to Firebase
        
        currentUser.updateProfile(user.data);

        updateUserData(user);
        return dispatch(setUserData(user));
    }
}

/**
 * Set User Data
 */
export function setUserData(user)
{
    //  Template clears out existing data from the customers collection on initial sing in.
    //  
    return (dispatch) => {
        const currentUser = firebase.auth().currentUser;
        firebaseService.getProspectData(currentUser.uid).then(prospectUser => {					
            console.log('Here is the prospect user object: ', prospectUser);
            if (prospectUser) {
                if (!prospectUser.loggedIn) {
                    user = _.merge({}, user,
                        {
                            couponCount: prospectUser.couponCount,
                            disabled: prospectUser.disabled,
                            loggedIn: true,
                            profileCompleted: prospectUser.profileCompleted,
                            status: prospectUser.status,
                            uid: prospectUser.uid,
                            data: {
                                additionalNotes: prospectUser.data.additionalNotes,
                                businessAddress: prospectUser.data.businessAddress,
                                businessName: prospectUser.data.businessName,
                                descOfBusiness: prospectUser.data.descOfBusiness,
                                email: prospectUser.data.email,
                                firstName: prospectUser.data.firstName,
                                lastName: prospectUser.data.lastName,
                                locations: prospectUser.data.locations,
                                phoneNumber: prospectUser.data.phoneNumber,
                                planID: prospectUser.data.planID,
                                website: prospectUser.data.website
                            }
                        });
        
                    currentUser.updateProfile(user.data);
        
                    updateUserData(user);
    
                    firebaseService.changeLoggedInStatus(currentUser.uid);
                }
            }
            
         }, error => {})     

        /*
        Set User Settings
         */
        dispatch(setDefaultSettings(user.data.settings));

        /*
        Set User Data
         */
        dispatch({
            type   : SET_USER_DATA,
            payload: user
        })
    }
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings)
{
    return (dispatch, getState) => {
        const oldUser = getState().auth.user;
        const user = _.merge({}, oldUser, {data: {settings}});

        updateUserData(user);

        return dispatch(setUserData(user));
    }
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts)
{
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts
            }
        };

        updateUserData(newUser);

        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData()
{
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser()
{

    return (dispatch, getState) => {

        const user = getState().auth.user;

        if ( !user.role || user.role.length === 0 )// is guest
        {
            return null;
        }

        history.push({
            pathname: '/'
        });

        switch ( user.from )
        {
            case 'firebase':
            {
                firebaseService.signOut();
                break;
            }
            case 'auth0':
            {
                auth0Service.logout();
                break;
            }
            default:
            {
                jwtService.logout();
            }
        }

        dispatch(setInitialSettings());

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

export function passwordReset(password) {
    return (dispatch) => {

        const user = firebase.auth().currentUser;
        user.updatePassword(password).then(function() {
            // Update successful
            console.log('Successfully changed the password to:', password);            
        }).catch(function(error) {
            console.log('An error occurred resetting the password.');
        });

    }
}

export function emailPasswordReset(email) {
    
    return (dispatch) => {
        
        const auth = firebase.auth();
            
        auth.sendPasswordResetEmail(email).then(function () {
            // Email sent
        }).catch(function(error) {
            // Error Occured
            console.log('Error while sending passwor reset email');
        });
        
        dispatch(setInitialSettings());
    }
    
}

/**
 * Update User Data
 */
function updateUserData(user)
{
    if ( !user.role || user.role.length === 0 )// is guest
    {
        return;
    }

    switch ( user.from )
    {
        case 'firebase':
        {
            firebaseService.updateUserData(user)
                .then(() => {
                    store.dispatch(Actions.showMessage({message: "User data saved to firebase"}));
                })
                .catch(error => {
                    store.dispatch(Actions.showMessage({message: error.message}));
                });
            break;
        }
        case 'auth0':
        {
            auth0Service.updateUserData({
                settings : user.data.settings,
                shortcuts: user.data.shortcuts
            })
                .then(() => {
                    store.dispatch(Actions.showMessage({message: "User data saved to auth0"}));
                })
                .catch(error => {
                    store.dispatch(Actions.showMessage({message: error.message}));
                });
            break;
        }
        default:
        {
            jwtService.updateUserData(user)
                .then(() => {
                    store.dispatch(Actions.showMessage({message: "User data saved with api"}));
                })
                .catch(error => {
                    store.dispatch(Actions.showMessage({message: error.message}));
                });
            break;
        }
    }
}
