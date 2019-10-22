import React from 'react';

export const couponsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/coupons',
            component: React.lazy(() => import('./couponsApp'))
        },
		{
            path     : '/apps/coupons/add/',
            component: React.lazy(() => import('./couponsApp'))
        },
		{
            path     : '/apps/coupons/edit/:couponcode',
            component: React.lazy(() => import('./couponsApp'))
        },
        {
            path    :'/apps/coupons/plans/',
            component: React.lazy(() => import('./couponsApp'))
        }
    ]
};
