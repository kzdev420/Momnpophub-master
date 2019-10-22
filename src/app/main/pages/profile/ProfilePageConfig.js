import React from 'react';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/profile',
            component: React.lazy(() => import('./ProfilePage'))
        },
        {
            path     : '/apps/coupons',
            component: React.lazy(() => import ('../../apps/coupons/couponsApp'))
        }
    ]
};
