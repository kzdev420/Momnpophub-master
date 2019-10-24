import React, { useEffect, useState, useRef } from "react";
import { Fab, Icon, IconButton } from "@material-ui/core";
import { FuseAnimate, FusePageSimple } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import CouponList from "./CouponList";
import CouponEdit from "./CouponEdit";
import CouponAdd from "./CouponAdd";
import CouponPlans from "./CouponPlans";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MainSidebarHeader from "./MainSidebarHeader";
import MainSidebarContent from "./MainSidebarContent";
import Breadcrumb from "./Breadcrumb";
import { Link } from "@material-ui/core";

function CouponApp() {
  const dispatch = useDispatch();
  const files = useSelector(({ CouponApp }) => CouponApp.files);
  const selectedItem = useSelector(
    ({ CouponApp }) => files[CouponApp.selectedItemId]
  );

  const pageLayout = useRef(null);

  const [state, setState] = useState({
    checkedA: true
  });

  useEffect(() => {
    dispatch(Actions.getFiles());
  }, [dispatch]);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  let path = window.location.pathname;
  if (path.search("coupons/add") > 0) {
    return (
      <div className="p-16 sm:p-24">
        <CouponAdd />
      </div>
    );
  } else if (path.search("coupons/edit") > 0) {
    return (
      <div className="p-16 sm:p-24">
        <CouponEdit />
      </div>
    );
  } else if (path.search("coupons/plans") > 0) {
    return (
      <div className="p-16 sm:p-24">
        <CouponPlans />
      </div>
    );
  } else {
    return (
      <FusePageSimple
        classes={{
          root: "bg-red",
          header: "h-96 min-h-96 sm:h-160 sm:min-h-160",
          sidebarHeader: "h-96 min-h-96 sm:h-160 sm:min-h-160",
          rightSidebar: "w-320"
        }}
        header={
          <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
            <div className="flex items-center justify-between">
              <FormControlLabel
                control={
                  <Switch
                    checked={state.checkedA}
                    onChange={handleChange("checkedA")}
                    value="checkedA"
                    color="secondary"
                  />
                }
                label="Show Active Only"
              />
            </div>
            <div className="flex flex-1 items-end">
              <FuseAnimate animation="transition.expandIn" delay={600}>
                <Fab
                  color="secondary"
                  aria-label="add"
                  className="absolute bottom-0 left-0 ml-16 -mb-28 z-999"
                >
                  <Link href="/apps/coupons/add/">
                    <IconButton aria-label="Add New Coupon">
                      <Icon title="Add New Coupon">add</Icon>
                    </IconButton>
                  </Link>
                </Fab>
              </FuseAnimate>
              <FuseAnimate delay={200}>
                <div>
                  {selectedItem && (
                    <Breadcrumb
                      selected={selectedItem}
                      className="flex flex-1 pl-72 pb-12 text-16 sm:text-24"
                    />
                  )}
                </div>
              </FuseAnimate>
            </div>
          </div>
        }
        content={
          <CouponList pageLayout={pageLayout} checkedA={state.checkedA} />
        }
        leftSidebarVariant="temporary"
        leftSidebarHeader={<MainSidebarHeader />}
        leftSidebarContent={<MainSidebarContent />}
        ref={pageLayout}
        innerScroll
      />
    );
  }
}

export default withReducer("CouponApp", reducer)(CouponApp);
