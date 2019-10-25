import React, { useState, useEffect, useRef } from "react";
import {
  Toolbar,
  Button,
  TextField,
  Dialog,
  Typography,
  DialogActions,
  DialogContent,
  AppBar,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import firebaseService from "app/services/firebaseService";

export default function ContactEdit({ customerID, customerData, handlerCloseDialog }) {
  const [uid, setUid] = useState("");
  const [fields, setFields] = useState({
    firstName: customerData.firstName || "",
    lastName: customerData.lastName || "",
    businessName: customerData.businessName || "",
    phoneNumber: customerData.phoneNumber || "",
    email: customerData.email || "",
    plan: customerData.plan
  });

  const planLabel = useRef(null);
  const [planLabelWidth, setPlanLabelWidth] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (planLabel.current) setPlanLabelWidth(planLabel.current.offsetWidth);
  });

  useEffect(() => {
    firebaseService.getspecificCustomer(customerID).then(customer => {
      const {
        uid,
        data: { firstName, lastName, businessName, phoneNumber, email, plan }
      } = customer;
      setUid(uid);
      setFields({ firstName, lastName, businessName, phoneNumber, email, plan });
    });
  }, [customerID]);

  const onChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = () =>
    firebaseService
      .updateCustomer({ uid, data: fields })
      .then(() => alert("Customer Record Has Been Updated!"))
      .then(() => document.location.reload(true))
      .catch(error => console.log(error));

  return (
    <Dialog open={true} classes={{ paper: "m-24" }} fullWidth onClose={handlerCloseDialog} maxWidth="xs">
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Edit Contact
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Typography variant="h6" color="inherit" className="pt-8">
            {fields.firstName} {fields.lastName}
          </Typography>
        </div>
      </AppBar>

      <DialogContent classes={{ root: "p-24" }}>
        <TextField
          className="mb-24"
          label="First Name"
          autoFocus
          id="firstName"
          name="firstName"
          value={fields.firstName}
          onChange={onChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-24"
          label="Last Name"
          autoFocus
          id="lastName"
          name="lastName"
          value={fields.lastName}
          onChange={onChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-24"
          label="Company"
          autoFocus
          id="businessName"
          name="businessName"
          value={fields.businessName}
          onChange={onChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-24"
          label="Phone"
          autoFocus
          id="phoneNumber"
          name="phoneNumber"
          value={fields.phoneNumber}
          onChange={onChange}
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          className="mb-24"
          label="Email"
          autoFocus
          id="email"
          name="email"
          disabled
          value={fields.email}
          onChange={onChange}
          variant="outlined"
          required
          fullWidth
        />
        <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: 20 }}>
          <InputLabel ref={planLabel} htmlFor="plan-select">
            Plan
          </InputLabel>
          <Select
            value={fields.plan}
            onChange={onChange}
            labelWidth={planLabelWidth}
            variant="outlined"
            inputProps={{
              name: "plan",
              id: "plan-select"
            }}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"starter"}>Starter</MenuItem>
            <MenuItem value={"growth"}>Growth</MenuItem>
            <MenuItem value={"unlimited"}>Unlimited</MenuItem>
          </Select>
        </FormControl>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
