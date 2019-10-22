import config from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

class firebaseService {

    init(success)
    {
        if ( firebase.apps.length )
        {
            return;
        }
        firebase.initializeApp(config);
        this.db = firebase.database();
		this.fdb = firebase.firestore();
        this.auth = firebase.auth();
        success(true);
    }

    getUserData = (userId) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
				this.db.ref(`users/${userId}`)
                .once('value')
                .then((snapshot) => {
                    const user = snapshot.val();
                    resolve(user);
                });
        });
    };
	
    getProfileData = (userId) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
			this.fdb.collection("customers")
			.doc(`${userId}`)
			.get()
			.then(doc => {
				const data = doc.data();
				resolve(data);
			});
        });
    };
	
    adminGetAllCustomers = () => {
        if ( !firebase.apps.length ) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.fdb.collection('customers')
            .get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => doc.data());
				resolve(data);
			});
        });
    };
	
	updateCustomer = (customer) => {
        
		if ( !firebase.apps.length )
        {
            return;
        }
		console.log(customer.uid);
		return this.fdb.collection("customers")
		.doc(`${customer.uid}`)
		.update(customer)
		.then(() => {
			console.log("Updated!");
		});
	};	
	
	addCustomer = (customer) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
			
			this.fdb.collection("customers")
			.doc(`${customer.uid}`)
			.set(customer)
			.then(() => {
				resolve();
			});
        });
    };	

	getspecificCouponData = (couponcode) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
			
			this.fdb.collection("coupons")
			.doc(`${couponcode}`)
			.get()
			.then(doc => {
				const data = doc.data();
				resolve(data);
			});
        });
    };	


	addCoupon = (coupon) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
			
			this.fdb.collection("coupons")
			.doc(`${coupon.couponID}`)
			.set(coupon)
			.then(() => {
				resolve();
			});
        });
    };	
	
	delCouponData = (coupon) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
			this.fdb.collection("coupons")
			.doc(coupon)
			.delete()
			.then(() => {
				resolve();
            });
        });
    };	

	getCouponData = () => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
			this.fdb.collection("coupons")
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => doc.data());
				resolve(data);
			});
        });
    };

    getPlanData = () => {
        if ( !firebase.apps.length ) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.fdb.collection("plans")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                resolve(data);
            });
        });
    }

    updateUserData = (user) => {
        if ( !firebase.apps.length )
        {
            return;
        }
		
		this.fdb.collection("customers")
		.doc(`${user.uid}`)
		.set(user)
		.then(() => {
			console.log("Added!");
		});
		
        return this.db.ref(`users/${user.uid}`)
            .set(user);
    };

	updateCouponData = (coupon) => {
        
		if ( !firebase.apps.length )
        {
            return;
        }
		
		return this.fdb.collection("coupons")
		.doc(`${coupon.couponID}`)
		.set(coupon)
		.then(() => {
			console.log("Updated!");
		});
	};	

    onAuthStateChanged = (callback) => {
        if ( !this.auth )
        {
            return;
        }
        this.auth.onAuthStateChanged(callback);
    };

    signOut = () => {
        if ( !this.auth )
        {
            return;
        }
        this.auth.signOut();
    }
}

const instance = new firebaseService();

export default instance;
