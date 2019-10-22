import React, {useEffect, useRef} from 'react';
import {Fab, Icon, IconButton} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import FileList from './FileList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MainSidebarHeader from './MainSidebarHeader';
import MainSidebarContent from './MainSidebarContent';
import Breadcrumb from './Breadcrumb';

function FileManagerApp()
{
    const dispatch = useDispatch();
    const files = useSelector(({fileManagerApp}) => fileManagerApp.files);
    const selectedItem = useSelector(({fileManagerApp}) => files[fileManagerApp.selectedItemId]);

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getFiles());
    }, [dispatch]);

    return (
        <FusePageSimple
            classes={{
                root         : "bg-red",
                header       : "h-96 min-h-96 sm:h-160 sm:min-h-160",
                sidebarHeader: "h-96 min-h-96 sm:h-160 sm:min-h-160",
                rightSidebar : "w-320"
            }}
            header={
                <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                    <div className="flex items-center justify-between">
                        <FormControlLabel
                            control={
                            <Switch
                                checked="true"
                                onChange=""
                                value="checkedB"
                                color="secondary"/>}
                                label="Show Active"
                            />
                        <FuseAnimate animation="transition.expandIn" delay={200}>
                            <IconButton aria-label="search">
                                <Icon>search</Icon>
                            </IconButton>
                        </FuseAnimate>
                    </div>
                    <div className="flex flex-1 items-end">
                        <FuseAnimate animation="transition.expandIn" delay={600}>
                            <Fab color="secondary" aria-label="add" className="absolute bottom-0 left-0 ml-16 -mb-28 z-999">
                            <IconButton aria-label="Add New Coupon">
                                <Icon title="Add New Coupon">add</Icon>
                            </IconButton>
                            </Fab>
                        </FuseAnimate>
                        <FuseAnimate delay={200}>
                            <div>
                                {selectedItem && (
                                    <Breadcrumb selected={selectedItem} className="flex flex-1 pl-72 pb-12 text-16 sm:text-24"/>
                                )}
                            </div>
                        </FuseAnimate>
                    </div>
                </div>
            }
            content={
                <FileList pageLayout={pageLayout}/>
            }
            leftSidebarVariant="temporary"
            leftSidebarHeader={
                <MainSidebarHeader/>
            }
            leftSidebarContent={
                <MainSidebarContent/>
            }
            ref={pageLayout}
            innerScroll
        />
    )
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);
