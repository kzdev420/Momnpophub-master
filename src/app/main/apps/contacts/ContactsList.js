import React, {Component, useState} from 'react';
import {Link, Toolbar, Button,Icon, TextField,Dialog, Typography,Avatar,DialogActions, DialogContent, IconButton, Table, TableBody, TableCell, TableHead,AppBar, TableRow} from '@material-ui/core';
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
			setEdit:false,
			setEditID: null,
			customerListStatus: false, // false means all inactive customers to be displayed 
        };
		this.getCustomerList = this.getCustomerList.bind(this);
		this.editCustomer = this.editCustomer.bind(this);
		this.deleteCustomer = this.deleteCustomer.bind(this);
		this.changeStatusCustomer = this.changeStatusCustomer.bind(this);
		this.disEnabCustomer = this.disEnabCustomer.bind(this);
		this.handlerCloseDialog = this.handlerCloseDialog.bind(this);
	}

	componentWillMount(){ 
		let statusChange = this.getUrlParameter('status');
		if(statusChange == "active") {
			this.setState({ customerListStatus: true });
		}
        this.getCustomerList();
	}	
	
	editCustomer(id) {
		this.setState({setEdit: true,setEditID:id});
	}
	
	handlerCloseDialog() {
		this.setState({setEdit: false });
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
            Header    : "Phone Number",
            accessor  : "phone",
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
                        width : 200,
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
								<IconButton onClick={(ev) => {ev.stopPropagation();this.editCustomer(row.original.id);}}><Icon>edit</Icon></IconButton>
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
								coupons: customerdata.couponCount || 0
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
								coupons: customerdata.couponCount || 0
							});
						} 
					}

					
				});
							
			}

			return (
				<div>
					<ReactTable data={customerArray}  columns={columns}/>
					
					{this.state.setEdit ? (
						<ContactEdit customerID ={this.state.setEditID} handlerCloseDialog={this.handlerCloseDialog}/>
					) : (
						null 
					)
				  }
				</div>
				
			);
			
			
		}
	}
}

class ContactEdit extends Component {

    constructor(props){
        super(props);
		this.state = {
			uid: '',
			firstName: '',
			lastName: '',
			company: '',
			phone: '',
			email: '',
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
    }
	componentWillMount(){ 
		let activeRecords = [];
        firebaseService.onAuthStateChanged(authUser => {
        if ( authUser )
        {	
			firebaseService.getspecificCustomer(this.props.customerID)
            .then(customerdata => {
				console.log(customerdata);
				this.setState({
					uid: customerdata.uid,
					firstName: customerdata.data.firstName,
					lastName: customerdata.data.lastName,
					company: customerdata.data.businessName,
					phone: customerdata.data.phoneNumber,
					email: customerdata.data.email,
				});
            });
        }
        });	
	}	
	
	onChange(e){
		this.setState({[e.target.name]:e.target.value});	
	}	
	
	handleSubmit() {
		const customerRecord =  
		{
			uid: this.state.uid,
			data: {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				businessName: this.state.company,
				phoneNumber: this.state.phone,
				email: this.state.email,
			},
		}
		firebaseService.updateCustomer(customerRecord)
		.then(() => {
			alert("Customer Record Has Been Updated!");
		}).then(() => {
			document.location.reload(true);
		})
		.catch(error => {
				console.log(error);
		});
	}

	render(){
		return(
		
        <Dialog open={true} classes={{ paper: "m-24" }} fullWidth onClose={this.props.handlerCloseDialog} maxWidth="xs">

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        Edit Contact
                    </Typography>
                </Toolbar>
                <div className="flex flex-col items-center justify-center pb-24">
                        <Typography variant="h6" color="inherit" className="pt-8">
                            {this.state.firstName} {this.state.lastName}
                        </Typography>
                </div>
            </AppBar>
			
                <DialogContent classes={{root: "p-24"}}>
                        <TextField
                            className="mb-24"
                            label="First Name"
                            autoFocus
                            id="firstName"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-24"
                            label="Last Name"
                            autoFocus
                            id="lastName"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-24"
                            label="Company"
                            autoFocus
                            id="company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-24"
                            label="Phone"
                            autoFocus
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                        <TextField
                            className="mb-24"
                            label="Email"
                            autoFocus
                            id="email"
							name="email"
							disabled
                            value={this.state.email}
                            onChange={this.onChange}
                            variant="outlined"
                            required
                            fullWidth
                        />

                    <DialogActions className="justify-between pl-16">
                        <Button variant="contained"  color="primary" type="submit" onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
        </Dialog>
		)
    }	

}

export default ContactsList;