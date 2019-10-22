import {MaterialUIComponentsNavigation} from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import {authRoles} from 'app/auth';

let navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'      : 'dashboards',
                'title'   : 'Dashboards',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [
                    {
                        'id'   : 'analytics-dashboard',
                        'title': 'Analytics',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'project-dashboard',
                        'title': 'Manage Coupons',
                        'type' : 'item',
                        'url'  : '/apps/coupons'
                    }
                ]
            }]
    }];

    
export default navigationConfig;
