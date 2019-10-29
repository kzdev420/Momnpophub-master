import React, { Component } from 'react';
import {Link, Typography} from '@material-ui/core';
import _ from '@lodash';
import firebaseService from 'app/services/firebaseService';

class Breadcrumb extends Component {
 
    constructor(props) {
        super(props);

        this.state = {
            customerPlanName: '',
			customerPlanDescription: '',
			upgradeTag: '',
			planData: []
        }

		this.getCustomerPlanID = this.getCustomerPlanID.bind(this);

    }

    componentWillMount(){ 
		this.getCustomerPlanID();
	}	
	
	getCustomerPlanID() {
			
			let currentUserPlan = '';
			let filteredPlan = [];
			let upgradePath = '';
						
			firebaseService.onAuthStateChanged(authUser => {
			if ( authUser )
			{	
				// Find out which plan the customer is currently using
				firebaseService.getProfileData(authUser.uid).then(user => {					
					if (!authUser.status) {
						// User is not yet approved
						window.location = 'pages/coming-soon';
					}
					
					currentUserPlan = user.data.planID;

				 }, error => {})

				 // Retrieve the list of all plans and match up the one used by the customer
				 firebaseService.getPlanData().then(planData => {
					
					filteredPlan = _.filter(planData, (v) => _.includes(currentUserPlan, v.name));
					
					if (currentUserPlan.trim() !== 'Plan 3') {
						upgradePath = "Upgrade Current Plan";
					}

					this.setState({ 
						planData: planData,
						customerPlanName: filteredPlan[0].name,
						customerPlanDescription: filteredPlan[0].description,
						upgradeTag: upgradePath
					});

				}, error => {})

			}
			});	

	}
	   
    render() {
        return(
            <Typography className={this.props.className}>
                <span>{ this.state.customerPlanName } - { this.state.customerPlanDescription } &nbsp;&nbsp;</span>
                <span><Link href="apps/coupons/plans">{ this.state.upgradeTag }</Link></span>
            </Typography>
        );
    }
}

export default Breadcrumb
