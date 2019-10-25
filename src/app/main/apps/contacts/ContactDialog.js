import React, { useEffect, useCallback, useRef, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import FuseUtils from "@fuse/FuseUtils";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import firebaseService from "app/services/firebaseService";

const defaultFormState = {
  id: "",
  name: "",
  lastName: "",
  avatar: "assets/images/avatars/profile.jpg",
  nickname: "",
  company: "",
  businessName: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  businessAddress: "",
  plan: ""
};

function ContactDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const planLabel = useRef(null);
  const [planLabelWidth, setPlanLabelWidth] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (planLabel.current) setPlanLabelWidth(planLabel.current.offsetWidth);
  });

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === "edit" && contactDialog.data) {
      setForm({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === "new") {
      setForm({
        ...defaultFormState,
        ...contactDialog.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [contactDialog.data, contactDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  function closeComposeDialog() {
    contactDialog.type === "edit"
      ? dispatch(Actions.closeEditContactDialog())
      : dispatch(Actions.closeNewContactDialog());
  }

  function canBeSubmitted() {
    return form.name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (contactDialog.type === "new") {
      const customerRecord = {
        uid: new Date().getTime(),
        data: {
          firstName: form.name,
          lastName: form.lastName,
          email: form.email,
          businessName: form.businessName,
          businessAddress: form.businessAddress,
          plan: form.plan
        },
        status: false,
        disabled: false
      };
      firebaseService
        .addCustomer(customerRecord)
        .then(() => {
          alert("Customer Added!");
        })
        .then(() => {
          document.location.reload(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
    //  closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeContact(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === "new" ? "New Contact" : "Edit Contact"}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} />
          {contactDialog.type === "edit" && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {form.name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: "p-24" }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Name"
              autoFocus
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20"></div>
            <TextField
              className="mb-24"
              label="Last name"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20"></div>
            <TextField
              className="mb-24"
              label="Business Name"
              id="businessName"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20"></div>
            <TextField
              className="mb-24"
              label="Business Address"
              id="businessAddress"
              name="businessAddress"
              value={form.businessAddress}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20"></div>
            <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: 20 }}>
              <InputLabel ref={planLabel} htmlFor="plan-select">
                Plan
              </InputLabel>
              <Select
                value={form.plan}
                onChange={handleChange}
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
          </div>
        </DialogContent>

        {contactDialog.type === "new" ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              disabled={!canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ContactDialog;
