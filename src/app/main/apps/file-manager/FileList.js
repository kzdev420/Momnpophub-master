import React from 'react';
import {Link, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import * as Actions from './store/actions';

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

function FileList(props)
{
    const dispatch = useDispatch();
    const files = useSelector(({fileManagerApp}) => fileManagerApp.files);
    const selectedItemId = useSelector(({fileManagerApp}) => fileManagerApp.selectedItemId);

    const classes = useStyles();

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
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow hover className="cursor-pointer">
                        <TableCell className="max-w-64 w-64 p-0 text-center">
                            <IconButton aria-label="Product">
                                <Icon title="Product">attach_money</Icon>
                            </IconButton>
                         </TableCell>
                         <TableCell><Link href="/apps/file-manager">50% Off Science Diet 15 lbs</Link></TableCell>
                         <TableCell className="hidden sm:table-cell">7/26/2019</TableCell>
                         <TableCell className="hidden sm:table-cell">8/2/2019</TableCell>
                         <TableCell className="text-center hidden sm:table-cell">Active</TableCell>
                         <TableCell className="hidden sm:table-cell">7/26/2019</TableCell>
                    </TableRow>
                    <TableRow hover className="cursor-pointer">
                        <TableCell className="max-w-64 w-64 p-0 text-center">
                            <IconButton aria-label="Service">
                                <Icon title="Service">directions_run</Icon>
                            </IconButton>
                         </TableCell>
                         <TableCell><Link href="/apps/file-manager">20% Off Grooming for Dogs Under 20 lbs</Link></TableCell>
                         <TableCell className="hidden sm:table-cell">8/1/2019</TableCell>
                         <TableCell className="hidden sm:table-cell">8/31/2019</TableCell>
                         <TableCell className="text-center hidden sm:table-cell">Active</TableCell>
                         <TableCell className="hidden sm:table-cell">7/26/2019</TableCell>
                    </TableRow>
                    <TableRow hover className="cursor-pointer">
                        <TableCell className="max-w-64 w-64 p-0 text-center">
                            <IconButton aria-label="Product">
                                <Icon title="Product">attach_money</Icon>
                            </IconButton>
                         </TableCell>
                         <TableCell><Link href="/apps/file-manager">10% Off All Bark-Box Toys</Link></TableCell>
                         <TableCell className="hidden sm:table-cell">8/1/2019</TableCell>
                         <TableCell className="hidden sm:table-cell">8/31/2019</TableCell>
                         <TableCell className="text-center hidden sm:table-cell">Active</TableCell>
                         <TableCell className="hidden sm:table-cell">7/26/2019</TableCell>
                    </TableRow>
                    <TableRow hover className="cursor-pointer">
                        <TableCell className="max-w-64 w-64 p-0 text-center">
                            <IconButton aria-label="Service">
                            <Icon title="Service">directions_run</Icon>
                            </IconButton>
                         </TableCell>
                         <TableCell><Link href="/apps/file-manager">25% Off Training for Puppies ( 8- 15 Weeks) </Link></TableCell>
                         <TableCell className="hidden sm:table-cell">8/1/2019</TableCell>
                         <TableCell className="hidden sm:table-cell">8/31/2019</TableCell>
                         <TableCell className="text-center hidden sm:table-cell">Active</TableCell>
                         <TableCell className="hidden sm:table-cell">7/26/2019</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </FuseAnimate>
    );
}

export default FileList;
