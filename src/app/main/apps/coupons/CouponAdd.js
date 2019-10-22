import React, {Component,useState} from 'react';
import {Button, TextField, Select, MenuItem} from '@material-ui/core';
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
import BoardListHeader from './../scrumboard/board/BoardListHeader';

const uuidv1 = require('uuid/v1');

class CouponAdd extends Component {
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			couponID: '',
			couponAvailable: 'Both',
			endDate: '',
			modifiedDate: '',
			name: '',
			startDate: '',
			status: 'Active',
			codeType: 'QRCode',
			qrCode: uuidv1(),
			serviceOrProduct: 'Product',
		}

		this.updateCouponData = this.updateCouponData.bind(this);
		this.onChange = this.onChange.bind(this);
		this.resetFields = this.resetFields.bind(this);
		this.gererateModifiedDate = this.gererateModifiedDate.bind(this);
		this.statusUpdate = this.statusUpdate.bind(this);
		this.offerUpdate = this.offerUpdate.bind(this);
		this.availableUpdate = this.availableUpdate.bind(this);
		this.codeTypeUpdate = this.codeTypeUpdate.bind(this);

	}

	componentWillMount(){
		
	}	

	resetFields() {
		this.setState = {
			couponID: '',
			couponAvailable: 'Both',
			endDate: '',
			modifiedDate: '',
			name: '',
			startDate: '',
			status: 'Active',
			codeType: 'QRCode',
			qrCode: uuidv1(),
			serviceOrProduct: 'Product',
		}
	}
	updateCouponData(e) {
		const formattedDate = this.gererateModifiedDate();
		e.preventDefault();
		firebaseService.onAuthStateChanged(authUser => {
		firebaseService.getUserData(authUser.uid).then(user => {
			console.log('Here is the authUserID: ', authUser.uid);
			const couponrecord =  
			{
				couponID: new Date().getTime(),
				couponAvailable: this.state.couponAvailable,
				endDate: this.state.endDate,
				modifiedDate: formattedDate,
				name: this.state.name,
				startDate: this.state.startDate,
				status: this.state.status,
				codeType: this.state.codeType,
				qrCode: this.state.qrCode,
				serviceOrProduct: this.state.serviceOrProduct,
				userID: authUser.uid
			}
			firebaseService.addCoupon(couponrecord)
			.then(() => {
				alert("Coupon Added!");
				this.resetFields();
			}).then(() => {
				window.location = '/apps/coupons/';
			})
			.catch(error => {
				console.log(error);
			});					
					
		}, error => {})
		});		
						
	}

	onChange(e) {
		this.setState({[e.target.name]:e.target.value});	
	}	

	gererateModifiedDate() {
		// Create a record timestamp in the format: YYYY-MM-DD
		const date = new Date();
		const formattedDate = moment(date).format('YYYY-MM-DD');

		return formattedDate;

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
				qrCode: uuidv1()
			});
		}
	}
	
 render()
    {    return (
			<div className="profilePage">
				<h1>Coupon Add</h1>
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
				<TextField  id="name" onChange={this.onChange}  name="name" />
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
					value={this.state.startDate}  
					name="startDate"
				/>
				<p className="label">End Date</p>
				<TextField  
					id="emdDate"  
					type="date" 
					onChange={this.onChange} 
					value={this.state.endDate}  
					name="endDate"
				/>				
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
				<TextField  id="qrCode" value={this.state.qrCode} onChange={this.onChange}  name="qrCode" />
				<br /><br />
				<Button variant="contained" color="primary" onClick={this.updateCouponData} >
					Add Coupon
				</Button>				
			</div>
		</div>
    );
	}
}

export default CouponAdd;