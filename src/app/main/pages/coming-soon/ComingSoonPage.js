import React, {useEffect} from 'react';
import {Card, CardContent, Divider, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {makeStyles} from '@material-ui/styles';
import firebaseService from 'app/services/firebaseService';
import {FuseAnimate} from '@fuse';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    }
}));

function ComingSoonPage()
{
    const classes = useStyles();

    useEffect(() => {
        getUserStatus();
    }, []);

    function getUserStatus() {
        firebaseService.onAuthStateChanged(authUser => {
            if ( authUser ) {
                firebaseService.getUserStatus(authUser.uid)
                    .then(status => {
                        if (status) {
                            window.location = '/apps/coupons';
                        }
                        console.log('Here is the status: ', status);
                    })
            }
        });
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className="w-full max-w-384">

                        <CardContent className="flex flex-col items-center justify-center p-32 text-center">

                            <img className="w-128 m-32" src="assets/images/logos/momnpophub_sm.png" alt="logo"/>

                            <Typography variant="subtitle1" className="mb-16">
                                Your Application is Currently Processing.
                            </Typography>

                            <Typography color="textSecondary" className="max-w-288">
                                One of our sales representatives will be contacting you within two business days to expedite your application:
                            </Typography>

                            <Divider />

                            <Typography className="font-bold my-32 w-full">
                                You will receive a confirmation email as soon as you are approved.  If it has been longer than two business days, please submit an email request to <a href='mailto:contact@momnpophub.com'>contact@momnpophub.com</a> and someone will get back with you shortly.
                            </Typography>

                            <Typography variant="subtitle1" className="mb-16">
                            Back to <a href='http://www.momnpophub.com' alt='MomNPopHub'>Momnpophub.com</a>
                            </Typography>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default ComingSoonPage;
