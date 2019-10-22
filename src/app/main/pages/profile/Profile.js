import React, {Component} from 'react';
import {Button, Card, CardContent, Link, MenuItem, Select, TextField, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {useForm} from '@fuse/hooks';
import _ from '@lodash';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FusePageSimple, FuseAnimate} from '@fuse';
import firebaseService from 'app/services/firebaseService';
import * as Actions from 'app/store/actions';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			businessName: '',
			businessAddress: '',
			descOfBusiness: '',
			email: '',
			phoneNumber: '',
			locations: '',
			website: '',
			additionalNotes: '',
			status: true
		}

		this.getUserData = this.getUserData.bind(this);
		this.updateUserData = this.updateUserData.bind(this);
		this.onChange = this.onChange.bind(this);
		
	}

	componentWillMount(){ 
		this.getUserData();
	}	
	
	getUserData() {
			firebaseService.onAuthStateChanged(authUser => {
			if ( authUser )
			{	
				firebaseService.getProfileData(authUser.uid).then(user => {
					console.log(user);
 					this.setState({
						firstName: user.data.firstName,
						lastName: user.data.lastName,
						businessName: user.data.businessName,
						businessAddress: user.data.businessAddress,
						descOfBusiness: user.data.descOfBusiness,
						email: user.data.email,
						phoneNumber: user.data.phoneNumber,
						locations: user.data.locations,
						website: user.data.website,
						additionalNotes: user.data.additionalNotes,
						status: user.status
					});
 				}, error => {})
			}
			});		
	}
	
	updateUserData(e) {
		e.preventDefault();
		firebaseService.onAuthStateChanged(authUser => {
		firebaseService.getUserData(authUser.uid).then(user => {
					
			const userrecord = _.merge({}, user,
			{
				uid : authUser.uid,
				status: this.state.status,
				data: {
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					businessName: this.state.businessName,
					businessAddress: this.state.businessAddress,
					descOfBusiness: this.state.descOfBusiness,
					email: this.state.email,
					phoneNumber: this.state.phoneNumber,
					locations: this.state.locations,
					website: this.state.website,
					additionalNotes: this.state.additionalNotes
				}
			}
			);
			firebaseService.updateUserData(userrecord)
			.then((dispach) => {
				alert("Profile Saved!");
			}).then(() => {
				window.location = '/apps/coupons/';
			})
			.catch(error => {
				console.log(error);
			});					
					
		}, error => {})
		});		
						
	}
	onChange(e){
		this.setState({[e.target.name]:e.target.value});	
		console.log('Here is the new value of e: ', e.target.value);
	}	
	
	
 render()
    {    return (
			<div className="profilePage">
				<h1>Setup Your Profile</h1>
				<p className="subHeading">Please make sure this is a valid and correct information about you and your business, as this will be used to contact you.</p>
				<div className="basicdetails">
				<p className="label">Business Name</p>
				<TextField  id="businessName"  onChange={this.onChange}  name="businessName"  value={this.state.businessName}/>
				<p className="label">Representative First Name</p>
				<TextField  id="firstName" onChange={this.onChange}  name="firstName" value={this.state.firstName}/>
				<p className="label">Representative Last Name</p>
				<TextField  id="lastName" onChange={this.onChange}  name="lastName" value={this.state.lastName}/>
				<p className="label">Business Representative Phone Number</p>
				<TextField  id="phoneNumber"  onChange={this.onChange}  name="phoneNumber"  value={this.state.phoneNumber}/>
				<p className="label">Business Email</p>
				<TextField  id="email"  onChange={this.onChange}  name="email"  value={this.state.email}/>
				<p className="label">Current Password</p>
				<TextField type='password' id="password" disabled name="password"  value='***********'/>
				<Link href='/pages/auth/reset-password'>
        			Reset Password
      			</Link>
				<p className="label">Business Profile Picture</p>
				<br />
				<Avatar alt="Business Logo" src="assets/images/avatars/profile.jpg" />
				<br />
				<Button
  					variant="contained"
  					component="label"
				>
  					Upload New Image
					<input
						type="file"
						style={{ display: "none" }}
					/>
				</Button>
				<p className="label">Description of the Business</p>
				<TextField  id="descOfBusiness" onChange={this.onChange}   name="descOfBusiness"  value={this.state.descOfBusiness} multiline rows="2"/>
				<p className="label">Business Address</p>
				<TextField  id="businessAddress"  onChange={this.onChange}  name="businessAddress"  value={this.state.businessAddress}/>
				<p className="label">Single or Multiple Locations</p>
				<Select 
					value={this.state.locations}
					// eslint-disable-next-line react/jsx-no-duplicate-props
					onChange={this.onChange} name="locations" value={this.state.locations}
				>
					<MenuItem value='single'>Single</MenuItem>
					<MenuItem value='multiple'>Multiple</MenuItem>
				</Select>
				<p className="label">Business Website</p>
				<TextField  id="website"  onChange={this.onChange}  name="website"  value={this.state.website}/>
				<p className="label">Additional Notes on Business</p>
				<TextField  id="additionalNotes" onChange={this.onChange} name="additionalNotes"  value={this.state.additionalNotes} multiline rows="2"/>

				<Button variant="contained" color="primary" onClick={this.updateUserData} >
					Save Profile
				</Button>
			</div>
		</div>
    );
	}
}

export default Profile;