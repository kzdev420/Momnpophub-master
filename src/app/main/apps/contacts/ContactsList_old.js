import React, {Component, useState} from 'react';
import {Link, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import _ from '@lodash';
import firebaseService from 'app/services/firebaseService';
import ReactTable from "react-table";

class ContactsList extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			customerArray: [],
			setActive: false,
			customerListStatus: false, // false means all inactive customers to be displayed 
        };
		this.getCustomerList = this.getCustomerList.bind(this);
		this.deleteCustomer = this.deleteCustomer.bind(this);
		this.changeStatusCustomer = this.changeStatusCustomer.bind(this);
		this.disEnabCustomer = this.disEnabCustomer.bind(this);
	}

	componentWillMount(){ 
		let statusChange = this.getUrlParameter('status');
		if(statusChange == "active") {
			this.setState({ customerListStatus: true });
		}
	
        this.getCustomerList();
	}	
	
	deleteCustomer(id) {
		
		const customerRecord =  
		{
				uid: id,
				disable: true,
		}
		firebaseService.updateCustomer(customerRecord)
		.then(() => {
			alert("Customer Disabled!");
		}).then(() => {
			if(this.state.statusChange) {
				window.location = '/apps/contacts/all?status=active';
			} else {
				window.location = '/apps/contacts/all';
			}
		})
		.catch(error => {
				console.log(error);
		});	
	
	}
	changeStatusCustomer(id,stus) {
		const customerRecord =  
		{
				uid: id,
				status: stus,
		}
		firebaseService.updateCustomer(customerRecord)
		.then(() => {
			alert("Customer Status Changed!");
		}).then(() => {
			if(this.state.statusChange) {
				window.location = '/apps/contacts/all?status=active';
			} else {
				window.location = '/apps/contacts/all';
			}
		})
		.catch(error => {
				console.log(error);
		});
	}
	
	getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(window.location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
	
	disEnabCustomer(id,stus) {
		const customerRecord =  
		{
				uid: id,
				disable: stus,
		}
		firebaseService.updateCustomer(customerRecord)
		.then(() => {
			alert("Customer Disabled Status Changed!");
		}).then(() => {
			if(this.state.statusChange) {
				window.location = '/apps/contacts/all?status=active';
			} else {
				window.location = '/apps/contacts/all';
			}
		})
		.catch(error => {
				console.log(error);
		});	
	}
	
	getCustomerList() {
        let activeRecords = [];
        firebaseService.onAuthStateChanged(authUser => {
        if ( authUser )
        {	
			firebaseService.adminGetAllCustomers()
            .then(customerdata => {
				this.setState({ customer: customerdata,setActive:true });
            });
        }
        });		
    }
    
	
	render() {
		
	const data = [{
			name: 'Tanner Linsley',
			age: 26,
			friend: {name: 'Jason Maurer',age: 23,}
		}]

	const columns = [
		{
            Header    : "First Name",
            accessor  : "firstName",
            filterable: true,
			className : "font-bold"
		}, 
		{
            Header    : "Last Name",
            accessor  : "lastName",
            filterable: true,
			className : "font-bold"
		}, 
		{
            Header    : "Business Name",
            accessor  : "company",
            filterable: true,
		}, 
		{
            Header    : "Address",
            accessor  : "address",
            filterable: true,
		},
		{
			Header    : "Email",
			accessor  : "email",
            filterable: true,
		},
		{
            Header    : "Coupons",
			accessor  : "coupons",
			width : 100,
            filterable: true,
		},
                    {
                        Header: "",
                        width : 150,
                        Cell  : row => (
							
								
                            <div className="flex items-center">
								{
									row.original.status ?  
									<IconButton onClick={(ev) => {ev.stopPropagation();this.changeStatusCustomer(row.original.id,false);}}><Icon>toggle_on</Icon></IconButton> : 
									<IconButton onClick={(ev) => {ev.stopPropagation();this.changeStatusCustomer(row.original.id,true);}}><Icon>toggle_off</Icon></IconButton>
								}
								{
									row.original.disable ?  
									<IconButton onClick={(ev) => {ev.stopPropagation();this.disEnabCustomer(row.original.id,false);}}><Icon>lock_close</Icon></IconButton> : 
									<IconButton onClick={(ev) => {ev.stopPropagation();this.disEnabCustomer(row.original.id,true);}}><Icon>lock_open</Icon></IconButton>
								}
								<IconButton onClick={(ev) => {ev.stopPropagation();this.deleteCustomer(row.original.id);}}><Icon>delete</Icon></IconButton>
                            </div>
                        )
                    }
		]	
		
		if(!this.state.setActive) {
			return (
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
					<div></div>
                </FuseAnimate>			
			);
		} else {

			const customerArray = [];
			{
				this.state.customer.map(customerdata => {
					
					//all active customers only 
					if(this.state.customerListStatus) {
						if(customerdata.status) {
							customerArray.push({
								id: customerdata.uid,
								address: customerdata.data.businessAddress,
								avatar: 'assets/images/avatars/Abbott.jpg',
								birthday: 'undefined',
								company: customerdata.data.businessName,
								email: customerdata.data.email,
								jobTitle: customerdata.data.designation,
								lastName: customerdata.data.lastName,
								firstName: customerdata.data.firstName,
								nickname: customerdata.data.businessName,
								notes: customerdata.data.additionalNotes,
								phone: customerdata.data.phoneNumber,
								disable: customerdata.disable,
								status: customerdata.status,
								coupons: 0
							});
						} 
					} else {
						if(!customerdata.status) {
							customerArray.push({
								id: customerdata.uid,
								address: customerdata.data.businessAddress,
								avatar: 'assets/images/avatars/Abbott.jpg',
								birthday: 'undefined',
								company: customerdata.data.businessName,
								email: customerdata.data.email,
								jobTitle: customerdata.data.designation,
								lastName: customerdata.data.lastName,
								firstName: customerdata.data.firstName,
								nickname: customerdata.data.businessName,
								notes: customerdata.data.additionalNotes,
								phone: customerdata.data.phoneNumber,
								disable: customerdata.disable,
								status: customerdata.status,
								coupons: 0
							});
						} 
					}

					
				});
				
				console.log(customerArray);
			
			}

			return (<ReactTable data={customerArray}  columns={columns}/>);
		}
	}
}

export default ContactsList;