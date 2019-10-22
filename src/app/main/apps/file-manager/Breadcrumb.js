import React from 'react';
import {Link, Typography} from '@material-ui/core';

function Breadcrumb({className, selected})
{
    const arr = selected.location.split('>');

    return (
        <Typography className={className}>
            <span>Plan 1 - Fixed Monthly Plan Up to 5 Coupons per Month - &nbsp;</span>
            <span><Link href="/apps/file-manager"> Upgrade Plan</Link></span>
        </Typography>
    )
}

export default Breadcrumb;
