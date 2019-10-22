import React, {Component,useState, Fragment} from 'react';
import {Button, Card, Select, MenuItem, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {useForm} from '@fuse/hooks';
import _ from '@lodash';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FusePageSimple, FuseAnimate} from '@fuse';
import firebaseService from 'app/services/firebaseService';
import * as Actions from 'app/store/actions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';

class CouponEdit extends Component {
	
	constructor(props) {
		
		super(props);
		this.state = {
			couponID: '',
			couponAvailable: '',
			endDate: '',
			modifiedDate: '',
			name: '',
			startDate: '',
			status: '',
			codeType: '',
			qrCode: '',
			orgQRCode: '',
			serviceOrProduct: '',
		}

		this.getCouponData = this.getCouponData.bind(this);
		this.updateCouponData = this.updateCouponData.bind(this);
		this.onChange = this.onChange.bind(this);
		this.statusUpdate = this.statusUpdate.bind(this);
		this.offerUpdate = this.offerUpdate.bind(this);
		this.availableUpdate = this.availableUpdate.bind(this);
		this.codeTypeUpdate = this.codeTypeUpdate.bind(this);
		this.gererateModifiedDate = this.gererateModifiedDate.bind(this);
				
	}

	componentWillMount(){ 
		var couponcode = window.location.pathname.split("/").pop();
		this.getCouponData(couponcode);
	}	
	
	getCouponData(couponcode) {
			firebaseService.onAuthStateChanged(authUser => {
			if ( authUser )
			{	
				firebaseService.getspecificCouponData(couponcode).then(coupon => {
					console.log(coupon);
  					this.setState({
						couponID: coupon.couponID,
						couponAvailable: coupon.couponAvailable,
						endDate: coupon.endDate,
						modifiedDate: coupon.modifiedDate,
						name: coupon.name,
						startDate: coupon.startDate,
						status: coupon.status,
						codeType: coupon.codeType,
						qrCode: coupon.qrCode,
						orgQRCode: coupon.qrCode,
						serviceOrProduct: coupon.serviceOrProduct,
					});
 				}, error => {})
			}
			});		
	}
	
	updateCouponData(e) {
		const formattedDate = this.gererateModifiedDate();
		e.preventDefault();
		firebaseService.onAuthStateChanged(authUser => {
		firebaseService.getUserData(authUser.uid).then(user => {
			const couponrecord =  
			{
				couponID: this.state.couponID,
				couponAvailable: this.state.couponAvailable,
				endDate: this.state.endDate,
				modifiedDate: formattedDate,
				name: this.state.name,
				startDate: this.state.startDate,
				status: this.state.status,
				codeType: this.state.codeType,
				qrCode: this.state.qrCode,
				serviceOrProduct: this.state.serviceOrProduct,
			}
			
			firebaseService.updateCouponData(couponrecord)
			.then(() => {
				alert("Coupon Saved!");
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
	}	

	statusUpdate(e) {
		this.setState({
			status: e.target.value
		});
	}

	offerUpdate(e) {
		this.setState({
			serviceOrProduct: e.target.value
		});
	}

	availableUpdate(e) {
		this.setState({
			couponAvailable: e.target.value
		});
	}

	codeTypeUpdate(e) {
		this.setState({
			codeType: e.target.value
		});
		
		if (e.target.value !== 'QRCode') {
			this.setState({
				codeType: e.target.value,
				qrCode: ''
			});
		} else {
			this.setState({
				codeType: e.target.value,
				qrCode: this.state.orgQRCode
			});
		}
	}

	gererateModifiedDate() {
		// Create a record timestamp in the format: YYYY-MM-DD
		const date = new Date();
		const formattedDate = moment(date).format('YYYY-MM-DD');

		return formattedDate;

	}

 render()
    {    
		return (
			<div className="profilePage">
				<h1>Coupon Edit</h1>
				<p className="subHeading"></p>
				<div className="basicdetails">
				<p className="label">Service Or Product</p>
				<Select
					id='offer'
					value={this.state.serviceOrProduct}
					onChange={this.offerUpdate}
					name='offer'
				>
					<MenuItem value='Product'>Product</MenuItem>
					<MenuItem value='Service'>Service</MenuItem>
				</Select>
				<p className="label">Coupon / Deal Name</p>
				<TextField  id="name" onChange={this.onChange}  name="name" value={this.state.name}/>
				<p className="label">Coupon Available In-Store / Online / Both</p>
				<Select
					id='couponAvailable'
					value={this.state.couponAvailable}
					onChange={this.availableUpdate}
					name='couponAvailable'
				>
					<MenuItem value='Both'>Both</MenuItem>
					<MenuItem value='InStore'>In Store</MenuItem>
					<MenuItem value='Online'>Online</MenuItem>
				</Select>
				<p className="label">Start Date</p>
				<TextField  
					id="startDate"  
					type="date" 
					onChange={this.onChange}   
					name="startDate"
					value={this.state.startDate}
				/>
				<p className="label">End Date</p>
				<TextField  
					id="endDate" 
					type="date" 
					onChange={this.onChange}  
					name="endDate" 
					value={this.state.endDate}
				/>
				<p className="label">Modified Date</p>
				<TextField id="modifiedDate" type="date" disabled name="modifiedDate" value={this.state.modifiedDate}/>
				<p className="label">Status</p>
				<Select
					id='status'
					value={this.state.status}
					onChange={this.statusUpdate}
					name='status'
				>
					<MenuItem value='Active'>Active</MenuItem>
					<MenuItem value='Inactive'>Inactive</MenuItem>
				</Select>

				<p className="label">Coupon Type</p>
				<Select
					id='codeType'
					value={this.state.codeType}
					onChange={this.codeTypeUpdate}
					name='codeType'
				>
					<MenuItem value='QRCode'>QR Code - Scan Via Mobile App</MenuItem>
					<MenuItem value='Generic'>Generic Coupon - No Scan Via Mobile App Required</MenuItem>
					<MenuItem value='Personal'>Personal Coupon - Personal Coupon for Each Customer</MenuItem>
				</Select>
				<br />
				<p className="label">Coupon Code</p>
				<TextField  id="qrCode" onChange={this.onChange}  name="qrCode" value={this.state.qrCode}/>
				<br /><br />
				<Button variant="contained" color="primary" onClick={this.updateCouponData} >
					Save Coupon
				</Button>
			</div>
		</div>
    );
	}
}

export default CouponEdit;