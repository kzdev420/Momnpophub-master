import config from "./firebaseServiceConfig";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

class firebaseService {
  init(success) {
    if (firebase.apps.length) {
      return;
    }
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.fdb = firebase.firestore();
    this.auth = firebase.auth();
    success(true);
  }

  getUserData = userId => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.db
        .ref(`users/${userId}`)
        .once("value")
        .then(snapshot => {
          const user = snapshot.val();
          resolve(user);
        });
    });
  };

  getProfileData = userId => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("customers")
        .doc(`${userId}`)
        .get()
        .then(doc => {
          const data = doc.data();
          resolve(data);
        });
    });
  };

  getProspectData = userId => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("prospects")
        .doc(`${userId}`)
        .get()
        .then(doc => {
          const data = doc.data();
          resolve(data);
        });
    });
  };

  getUserStatus = userId => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("customers")
        .doc(`${userId}`)
        .get()
        .then(doc => {
          const data = doc.data();
          const status = doc.status;
          resolve(status);
        });
    });
  };

  adminGetAllCustomers = () => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("customers")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          resolve(data);
        });
    });
  };

  updateCustomer = customer => {
    if (!firebase.apps.length) {
      return;
    }
    return this.fdb
      .collection("customers")
      .doc(`${customer.uid}`)
      .update(customer)
      .then(() => {
        console.log("Updated!");
      });
  };

  addCustomer = customer => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      console.log(createdAt);
      this.fdb
        .collection("customers")
        .doc(`${customer.uid}`)
        .set({ ...customer, createdAt })
        .then(() => {
          resolve();
        });
    });
  };

  getspecificCustomer = customerID => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("customers")
        .doc(`${customerID}`)
        .get()
        .then(doc => {
          const data = doc.data();
          resolve(data);
        });
    });
  };

  getspecificCouponData = couponcode => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("coupons")
        .doc(`${couponcode}`)
        .get()
        .then(doc => {
          const data = doc.data();
          resolve(data);
        });
    });
  };

  addCoupon = coupon => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("coupons")
        .doc(`${coupon.couponID}`)
        .set(coupon)
        .then(() => {
          this.fdb
            .collection("customers")
            .doc(`${coupon.userID}`)
            .update({
              couponCount: firebase.firestore.FieldValue.increment(1)
            });
        })
        .then(() => {
          resolve();
        });
    });
  };

  delCouponData = (coupon, userID) => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("coupons")
        .doc(coupon)
        .delete()
        .then(() => {
          console.log("Is it getting this far??? Here is the userID: ", userID);
          this.fdb
            .collection("customers")
            .doc(`${userID}`)
            .update({
              couponCount: firebase.firestore.FieldValue.increment(-1)
            });
          console.log("Coupon count should be decremented: ");
        })
        .then(() => {
          resolve();
        });
    });
  };

  getCouponData = uid => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("coupons")
        .where("userID", "==", uid)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          resolve(data);
        });
    });
  };

  getPlanData = () => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.fdb
        .collection("plans")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          resolve(data);
        });
    });
  };

  updateUserData = user => {
    if (!firebase.apps.length) {
      return;
    }

    this.fdb
      .collection("customers")
      .doc(`${user.uid}`)
      .update(user)
      .then(() => {
        console.log("Added!");
      });

    return this.db.ref(`users/${user.uid}`).set(user);
  };

  updateCouponData = coupon => {
    if (!firebase.apps.length) {
      return;
    }

    return this.fdb
      .collection("coupons")
      .doc(`${coupon.couponID}`)
      .set(coupon)
      .then(() => {
        console.log("Updated!");
      });
  };

  changeLoggedInStatus = userID => {
    if (!firebase.apps.length) {
      return;
    }

    return this.fdb
      .collection("prospects")
      .doc(`${userID}`)
      .update({
        loggedIn: true
      })
      .then(() => {
        console.log("Logged in status updated to true.");
      });
  };

  onAuthStateChanged = callback => {
    if (!this.auth) {
      return;
    }
    this.auth.onAuthStateChanged(callback);
  };

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut();
  };
}

const instance = new firebaseService();

export default instance;
