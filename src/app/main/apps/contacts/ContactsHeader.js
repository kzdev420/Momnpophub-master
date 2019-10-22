import React from 'react';
import {Hidden, Icon, IconButton, Input, Paper, Typography, Link} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function ContactsHeader(props)
{

	const status = getUrlParameter('status');
    const dispatch = useDispatch();
    const searchText = useSelector(({contactsApp}) => contactsApp.contacts.searchText);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);
	let statusSwitch = false;
	if(status  == "active") {
		statusSwitch = true;
	}
	
	const handleChange = name => event => {
		if(statusSwitch == true) {
			window.location = '/apps/contacts/all';
		} else {
			window.location = '/apps/contacts/all?status=active';
		}
	};


    return (
        <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

            <div className="flex flex-shrink items-center sm:w-224">
                <Hidden lgUp>
                    <IconButton
                        onClick={(ev) => {
                            props.pageLayout.current.toggleLeftSidebar()
                        }}
                        aria-label="open left sidebar"
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>
				
				    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={statusSwitch}
            onChange={handleChange('statusChange')}
            value="true"
            color="primary"
          />
        }
        label="Status"
      />
    </FormGroup>


                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-12">account_box</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="hidden sm:flex">Customers</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="hidden sm:flex">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-12">redeem</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="hidden sm:flex">
                            <Link href="apps/contacts/all" className="link">
                                Coupons
                            </Link>
                        </Typography>
                    </FuseAnimate>
                </div>
            </div>

            <div className="flex flex-shrink items-center sm:w-224">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <img className="text-32 mr-12" src="assets/images/logos/momnpophub_sm.png" alt="logo"/>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="h6" className="hidden sm:flex">
                        Super Admin
                    </Typography>
                </FuseAnimate>
            </div>
        </div>
    );
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
export default ContactsHeader;
