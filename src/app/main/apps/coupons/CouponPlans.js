import React, { useEffect, useState } from 'react';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import clsx from 'clsx';
import _ from '@lodash';
import firebaseService from 'app/services/firebaseService';

const useStyles = makeStyles(theme => ({
    header: {
        height    : 600,
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText
    },
    badge : {
        backgroundColor: theme.palette.error.main,
        color          : theme.palette.getContrastText(theme.palette.error.main)
    },
    price : {
        backgroundColor: theme.palette.primary[600],
        color          : theme.palette.getContrastText(theme.palette.primary[600])
    }
}));

function CouponPlans()
{
    const [currentPlan, setCurrentPlan] = useState('');
    const [newPlan, setNewPlan] = useState('');
    const [plan1Button, setPlan1Button] = useState('');
    const [plan2Button, setPlan2Button] = useState('');
    const [plan3Button, setPlan3Button] = useState('');
    
    useEffect(() => {
        getCustomerPlanID();
    }, []);

    const classes = useStyles();

    function getCustomerPlanID() {
			
        let currentUserPlan = '';
                     
        firebaseService.onAuthStateChanged(authUser => {
            if ( authUser ) {	
                
                // Find out which plan the customer is currently using
                firebaseService.getProfileData(authUser.uid).then(user => {					
                    
                    currentUserPlan = user.data.planID;
                    currentUserPlan = currentUserPlan.trim();
                    
                    switch (currentUserPlan) {
                    
                        case 'Plan 1':
                            console.log('current user plan inside 1 switch statement: ', currentUserPlan.trim());
                            setPlan1Button(<Button variant='contained' color='secondary' disabled className='w-full'>CURRENT PLAN</Button>);
                            setPlan2Button(<Button variant='contained' color='secondary' disabled className='w-full' onClick={() => upgradePlan('Plan 2')}>UPGRADE TO PLAN 2</Button>);
                            setPlan3Button(<Button variant='contained' color='secondary' disabled className='w-full' onClick={() => upgradePlan('Plan 3')}>UPGRADE TO PLAN 3</Button>);
                            setCurrentPlan(currentUserPlan);
                            break;
                        case 'Plan 2':
                            setPlan1Button(<Button variant='contained' color='secondary' disabled className='w-full'>PLAN 1</Button>);
                            setPlan2Button(<Button variant='contained' color='secondary' disabled className='w-full'>CURRENT PLAN</Button>);
                            setPlan3Button(<Button variant='contained' color='secondary' disabled className='w-full' onClick={() => upgradePlan('Plan 3')}>UPGRADE TO PLAN 3</Button>);
                            setCurrentPlan(currentUserPlan);
                            console.log('current user plan inside 2 switch statement: ', currentUserPlan.trim());
                            break;
                        case 'Plan 3': // Should not fall into this case (Only 2 Upgrades)
                            setPlan1Button(<Button variant='contained' color='secondary' disabled className='w-full'>PLAN 1</Button>);
                            setPlan2Button(<Button variant='contained' color='secondary' disabled className='w-full'>PLAN 2</Button>);
                            setPlan3Button(<Button variant='contained' color='secondary' disabled className='w-full'>CURRENT PLAN</Button>);
                            setCurrentPlan(currentUserPlan);
                            console.log('current user plan inside 3 switch statement: ', currentUserPlan.trim());
                            break;
                        default:
                            console.log('Fell into the default: ', currentUserPlan.trim());   
                            setPlan1Button(<Button variant='contained' color='secondary' disabled className='w-full'>CURRENT PLAN</Button>);
                            setPlan2Button(<Button variant='contained' color='secondary' className='w-full'>UPGRADE TO PLAN 2</Button>);
                            setPlan3Button(<Button variant='contained' color='secondary' className='w-full'>UPGRADE TO PLAN 3</Button>);
                    }
                    
                }, error => {})
                
            }

        });	

    }

    function upgradePlan(plan) {
        plan = plan.trim();
        setNewPlan(plan);
               
        firebaseService.onAuthStateChanged(authUser => {
        firebaseService.getUserData(authUser.uid).then(user => {
                    
            const userrecord = _.merge({}, user,
            {
                uid : authUser.uid,
                data: {
                    planID: plan
                }
            }
            );
            firebaseService.updateUserData(userrecord)
            .then((dispach) => {
                alert("Congratulations, you are now at: " + plan);
            }).then(() => {
                window.location = '/apps/coupons/';
            })
            .catch(error => {
                console.log(error);
            });					
                    
            }, error => {})
            
        });		
                            
    }

    return (
        <div>

            <div className={clsx(classes.header, "flex")}>

                <div className="p-24 w-full max-w-2xl mx-auto">

                    <div className="text-center my-128 mx-24">

                        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                            <Typography variant="h2" color="inherit" className="font-light">
                                Upgrade Your Plan!
                            </Typography>
                        </FuseAnimate>

                        <FuseAnimate duration={400} delay={600}>
                            <Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
                                We're excited to see you grow.  Increase the visibility of your business by offering more coupons to your customers.
                                To upgrade your plan, please contact momnpophub.com at: <a href='mailto:contact@momnpophub.com'>contact@momnpophub.com</a>
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>
            </div>

            <div className="-mt-192">

                <div className="w-full max-w-2xl mx-auto">

                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex items-center justify-center flex-wrap"
                    >
                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative">

                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Plan 1
                                    </Typography>
                                    <Typography color="textSecondary" className="text-16 font-medium">
                                        Great for just starting out
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">

                                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                                        <div className="flex justify-center">
                                            <Typography color="inherit" className="font-medium">$</Typography>
                                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">40</Typography>
                                        </div>
                                        <Typography color="inherit">
                                            / Month
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
                                            5 Coupons per Month
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            Coupon Analytics
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            Products and Services
                                        </Typography>
                                        <Typography color="textSecondary">
                                            24 / 7 Email Support
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    {plan1Button}
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">

                            <Card className="relative" raised>
								
								<div className="absolute top-0 inset-x-0 flex justify-center">
                                    <div className={clsx(classes.badge, "py-4 px-8")}>
                                        <Typography variant="caption" color="inherit">BEST VALUE</Typography>
                                    </div>
                                </div>
                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Plan 2
                                    </Typography>
                                    <Typography color="textSecondary" className="text-16 font-medium">
                                        Pay as You Go
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">

                                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                                        <div className="flex justify-center">
                                            <Typography color="inherit" className="font-medium">$</Typography>
                                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">4</Typography>
                                        </div>
                                        <Typography color="inherit">
                                            / Coupon Used by Customer
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
											10 Coupons per Month
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            Enhanced Coupon Analytics
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            Products and Services
                                        </Typography>
                                        <Typography color="textSecondary">
                                            24 / 7 Email support
                                        </Typography>
										<br />
                                        <Typography color="textSecondary">
                                            Advanced reporting
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    {plan2Button}
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative">

                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Plan 3
                                    </Typography>
                                    <Typography color="textSecondary" className="text-16 font-medium">
                                        Business Partner Level
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">

                                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                                        <div className="flex justify-center">
                                            <Typography color="inherit" className="font-medium">$</Typography>
                                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">99</Typography>
                                        </div>
                                        <Typography color="inherit">
                                            / Month
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
                                            Unlimited Coupons
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
											Enhanced Coupon Analytics
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
											Products and Services
                                        </Typography>
                                        <Typography color="textSecondary">
											24 / 7 Live Support
                                        </Typography>
										<br />
										<Typography color="textSecondary">
                                            Advanced reporting
                                        </Typography>
										<br />
										<Typography color="textSecondary">
                                            1 on 1 Monthly Strategy Meeting
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    {plan3Button}
                                </div>
                            </Card>
                        </div>
                    </FuseAnimateGroup>
                </div>
            </div>
        </div>
    );
}

export default CouponPlans;