import React from "react";
import { Redirect } from "react-router-dom";
import { authRoles } from "app/auth";

export const ContactsAppConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        }
      }
    }
  },
  auth: authRoles.admin, //['admin']
  routes: [
    {
      path: "/apps/contacts/:id",
      component: React.lazy(() => import("./ContactsApp"))
    },
    {
      path: "/apps/contacts",
      component: () => <Redirect to="/apps/contacts/all" />
    }
  ]
};
