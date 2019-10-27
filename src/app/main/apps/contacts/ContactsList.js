import React, { useState, useEffect } from "react";
import { Icon, IconButton } from "@material-ui/core";
import firebaseService from "app/services/firebaseService";
import ReactTable from "react-table";
import ContactEdit from "./ContactEdit";

function ContactsList() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [onlyShowActive, setOnlyShowActive] = useState(false);

  let statusUrlParam = getUrlParameter("status");

  useEffect(() => {
    if (statusUrlParam === "active") setOnlyShowActive(true);
  }, [statusUrlParam]);

  useEffect(() => {
    firebaseService.adminGetAllCustomers().then(customers => setCustomers(customers));
  }, []);

  const editCustomer = id => {
    setEditId(id);
    setEditing(true);
  };

  const handlerCloseDialog = () => setEditing(false);

  const changeCustomerStatus = (uid, status) =>
    firebaseService
      .updateCustomer({ uid, status })
      .then(() => alert("Customer Status Changed!"))
      .then(() => (window.location = statusUrlParam ? "/apps/contacts/all?status=active" : "/apps/contacts/all"))
      .catch(error => console.log(error));

  const changeDisabledState = (uid, disabled) =>
    firebaseService
      .updateCustomer({ uid, disabled })
      .then(() => alert("Customer Disabled Status Changed! to: " + disabled))
      .then(() => (window.location = statusUrlParam ? "/apps/contacts/all?status=active" : "/apps/contacts/all"))
      .catch(error => console.log(error));

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
      filterable: true,
      className: "font-bold"
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      filterable: true,
      className: "font-bold"
    },
    {
      Header: "Business Name",
      accessor: "businessName",
      filterable: true
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
      filterable: true
    },
    {
      Header: "Email",
      accessor: "email",
      filterable: true
    },
    {
      Header: "Plan",
      accessor: "plan",
      filterable: true
    },
    {
      Header: "Coupons",
      accessor: "coupons",
      width: 100,
      filterable: true
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      filterable: true
    },
    {
      Header: "",
      width: 200,
      Cell: row => (
        <div className="flex items-center">
          {row.original.status ? (
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                changeCustomerStatus(row.original.id, false);
              }}
            >
              <Icon>toggle_on</Icon>
            </IconButton>
          ) : (
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                changeCustomerStatus(row.original.id, true);
              }}
            >
              <Icon>toggle_off</Icon>
            </IconButton>
          )}
          {row.original.disabled ? (
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                changeDisabledState(row.original.id, false);
              }}
            >
              <Icon>lock_close</Icon>
            </IconButton>
          ) : (
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                changeDisabledState(row.original.id, true);
              }}
            >
              <Icon>lock_open</Icon>
            </IconButton>
          )}
          <IconButton
            onClick={ev => {
              ev.stopPropagation();
              editCustomer(row.original.id);
            }}
          >
            <Icon>edit</Icon>
          </IconButton>
          <IconButton
            onClick={ev => {
              ev.stopPropagation();
              changeDisabledState(row.original.id, true);
            }}
          >
            <Icon>delete</Icon>
          </IconButton>
        </div>
      )
    }
  ];

  let customerArray;
  //all active customers only
  if (onlyShowActive) {
    customerArray = customers.filter(c => c.status).map(normalizeCustomer);
  } else {
    customerArray = customers.filter(c => !c.status).map(normalizeCustomer);
  }

  return (
    <div>
      <ReactTable data={customerArray} columns={columns} />

      {editing ? (
        <ContactEdit
          customerID={editId}
          customerData={customers.filter(c => c.uid === editId)[0].data}
          handlerCloseDialog={handlerCloseDialog}
        />
      ) : null}
    </div>
  );
}

function normalizeCustomer(customer) {
  return {
    id: customer.uid,
    address: customer.data.businessAddress,
    // avatar: "assets/images/avatars/Abbott.jpg",
    businessName: customer.data.businessName,
    email: customer.data.email,
    jobTitle: customer.data.designation,
    lastName: customer.data.lastName,
    firstName: customer.data.firstName,
    phoneNumber: customer.data.phoneNumber,
    disabled: customer.disabled,
    status: customer.status,
    plan: customer.data.plan || "N/A",
    coupons: customer.couponCount || 0,
    createdAt: customer.createdAt ? new Date(customer.createdAt.toDate()).toLocaleString("en-US") : "N/A"
  };
}

function getUrlParameter(name) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export default ContactsList;
