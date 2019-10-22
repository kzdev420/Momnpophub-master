import React, {Component} from 'react';
import {FuseSplashScreen} from '@fuse';
import {connect} from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/store/actions';
import firebaseService from 'app/services/firebaseService';

class Auth extends Component {

    state = {
        waitAuthCheck: true
    }

    componentDidMount()
    {
        return Promise.all([
            this.firebaseCheck(),
        ]).then(() => {
            this.setState({waitAuthCheck: false})
        })
    }

    firebaseCheck = () => new Promise(resolve => {

        firebaseService.init(
            success => {
                if ( !success )
                {
                    resolve();
                }
            }
        );

        firebaseService.onAuthStateChanged(authUser => {
            if ( authUser )
            {

                this.props.showMessage({message: 'Logging in with Firebase'});

                /**
                 * Retrieve user data from Firebase
                 */
				 
                firebaseService.getUserData(authUser.uid).then(user => {
					
					localStorage.setItem('user_token', authUser.uid);
					localStorage.setItem('user_email', authUser.email);
					
                    this.props.setUserDataFirebase(user, authUser);
                    resolve();
                    this.props.showMessage({message: 'Logged in with Firebase'});
					
                }, error => {

                    resolve();
                })
            }
            else
            {
                resolve();
            }
        });

        return Promise.resolve();
    })

    render()
    {
        return this.state.waitAuthCheck ? <FuseSplashScreen/> : <React.Fragment children={this.props.children}/>;
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            logout             : userActions.logoutUser,
            setUserData        : userActions.setUserData,
            setUserDataAuth0   : userActions.setUserDataAuth0,
            setUserDataFirebase: userActions.setUserDataFirebase,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
