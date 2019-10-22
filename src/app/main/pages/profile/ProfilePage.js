import React, {useState} from 'react';
import {Avatar, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height                        : 150,
        minHeight                     : 150,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    }
}));

function ProfilePage()
{
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }

    return (
        <FusePageSimple
            classes={{
                header : classes.layoutHeader,
                toolbar: "px-16 sm:px-24"
            }}
            content={
                <div className="p-16 sm:p-24">
                    {selectedTab === 0 &&
                    (
                        <Profile/>
                    )}
                </div>
            }
        />
    )
}

export default ProfilePage;
