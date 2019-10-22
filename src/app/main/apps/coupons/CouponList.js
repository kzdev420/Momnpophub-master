import React, {Component, useState} from 'react';
import {Link, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import _ from '@lodash';
import firebaseService from 'app/services/firebaseService';

const useStyles = makeStyles({
	
    typeIcon: {
        '&.folder:before'     : {
            content: "'folder'",
            color  : '#FFB300'
        },
        '&.document:before'   : {
            content: "'insert_drive_file'",
            color  : '#1565C0'
        },
        '&.spreadsheet:before': {
            content: "'insert_chart'",
            color  : '#4CAF50'
        }
    }
});

class CouponList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
            coupons:        [],
            activeCoupons:  []
        };
		this.getCouponData = this.getCouponData.bind(this);
	}

	componentWillMount(){ 
        this.getCouponData();
	}	
	
	getCouponData() {
        let activeRecords = [];
        firebaseService.onAuthStateChanged(authUser => {
        if ( authUser )
        {	
            firebaseService.getCouponData(authUser.uid).then(coupondata => {
                console.log('Here is the coupon object: ', coupondata);
                this.setState({ coupons: coupondata });
                activeRecords = _.filter(coupondata, { status: 'Active' });
                this.setState({ activeCoupons: activeRecords });
            }, error => {})
        }
        });		
    }
    
    showAllCoupons() {
        this.setState(prevState => ({
            activeFlag: !prevState.activeFlag
          }));
    }
	
	render() {
        if ( this.props.checkedA ) {
            return (
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
                                <TableCell>Coupon Name</TableCell>
                                <TableCell className="hidden sm:table-cell">Start Date</TableCell>
                                <TableCell className="hidden sm:table-cell">End Date</TableCell>
                                <TableCell className="text-center hidden sm:table-cell">Status</TableCell>
                                <TableCell className="hidden sm:table-cell">Last Modified</TableCell>
                                <TableCell className="hidden sm:table-cell">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.activeCoupons.map(coupondata => <Coupon coupon={coupondata} />)}
                        </TableBody>       
                    </Table>
                </FuseAnimate>
            );
        } else {
            return (
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
                                <TableCell>Coupon Name</TableCell>
                                <TableCell className="hidden sm:table-cell">Start Date</TableCell>
                                <TableCell className="hidden sm:table-cell">End Date</TableCell>
                                <TableCell className="text-center hidden sm:table-cell">Status</TableCell>
                                <TableCell className="hidden sm:table-cell">Modified</TableCell>
                                <TableCell className="hidden sm:table-cell">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.coupons.map(coupondata => <Coupon coupon={coupondata} />)}
                        </TableBody>       
                    </Table>
                </FuseAnimate>
            );
        }
	}
}

class Coupon extends Component {
	
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
		this.deleteCoupon = this.deleteCoupon.bind(this);
    }
	
	deleteCoupon(couponcode) {
		var answer = window.confirm("Press OK to confirm the Deletion of Record!")
		if (answer) {
			
			firebaseService.onAuthStateChanged(authUser => {
			if ( authUser )
			{	
				firebaseService.delCouponData(couponcode, authUser.uid).then(() => {
					var row = document.getElementById("c"+couponcode);
					row.parentNode.removeChild(row);
 				}, error => {})
			}
			});		
			
			
		}
		else {
			//some code
		}
	}
	
    render(){
        if(this.props.coupon){
            const coupon = this.props.coupon;
            return (
				 <TableRow key={coupon.couponID} id={"c"+coupon.couponID} hover className="cursor-pointer">
                        <TableCell className="max-w-64 w-64 p-0 text-center">
                            <IconButton aria-label="Product">
                                <Icon title="Product">attach_money</Icon>
                            </IconButton>
                         </TableCell>
                         <TableCell>{coupon.name}</TableCell>
                         <TableCell className="hidden sm:table-cell">{coupon.startDate}</TableCell>
                         <TableCell className="hidden sm:table-cell">{coupon.endDate}</TableCell>
                         <TableCell className="text-center hidden sm:table-cell">{coupon.status}</TableCell>
                         <TableCell className="hidden sm:table-cell">{coupon.modifiedDate}</TableCell>
                         <TableCell className="hidden sm:table-cell">
							<Link href={`/apps/coupons/edit/${coupon.couponID}`}><Icon title="Edit">edit</Icon></Link>
							<Link href="javascript:void(0);"  onClick={() => { this.deleteCoupon(`${coupon.couponID}`);} }><Icon title="Delete">delete</Icon></Link>
						 </TableCell>
                    </TableRow>
            );
        }
		else return null;
    }
}

export default CouponList;