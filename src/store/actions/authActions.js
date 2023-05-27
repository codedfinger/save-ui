import firebase from "firebase/app";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const updatePassword = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .currentUser.updatePassword(credentials.password)
      .then(() => {
        dispatch({ type: "CHANGE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CHANGE_ERROR", err });
      });
  };
};

export const updateEmail = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();

    const creds = firebase.auth.EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );

    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(creds)
      .then(() => {
        firebase
          .auth()
          .currentUser.verifyBeforeUpdateEmail(credentials.newEmail)
          .then(() => {
            return firestore.collection("users").doc(credentials.uid).update({
              email: credentials.newEmail,
            });
          })
          .then(() => {
            dispatch({ type: "CHANGE_EMAIL_SUCCESS" });
          })
          .catch((err) => {
           dispatch({ type: "CHANGE_EMAIL_ERROR", err });
          });
      });
  };
};

export const updateProfile = (users) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("users")
      .doc(users.uid)
      .set({ ...users.profile }, { merge: true })
      .then(() => {
        dispatch({ type: "CHANGE_PROFILE_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "CHANGE_PROFILE_ERROR", err });
      });
  };
};

//sets isSeller in "users" and the profile in "marketplace"
export const becomeSeller = (seller) => {
  return (dispatch, getState, { getFirebase }) => {
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "farm_admin":
        uid = authUID;
        break;
      case "farm_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    const firestore = getFirebase().firestore();

    firestore
      .collection("users")
      .doc(uid)
      .set({ ...seller.profile }, { merge: true })
      .then(() => {
        return firestore
          .collection("marketplace")
          .doc(uid)
          .set({ ...seller.info }, { merge: true });
      })
      .then(() => {
        dispatch({ type: "SELLER_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "SELLER_ERROR", err });
      });
  };
};

//sets isConsumer in "users" and the profile in "marketplace"
export const becomeConsumer = (consumer) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("users")
      .doc(consumer.uid)
      .set({ ...consumer.profile }, { merge: true })
      .then(() => {
        return firestore
          .collection("marketplace")
          .doc(consumer.uid)
          .set({ ...consumer.upload }, { merge: true });
      })
      .then(() => {
        dispatch({ type: "CONSUMER_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "CONSUMER_ERROR", err });
      });
  };
};

//not currently working
export const resetPassword = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(credentials.email)
      .then(() => {
        dispatch({ type: "RESET_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "RESET_ERROR", err });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    //Determine account type
    var type;
    switch (newUser.function) {
      case "Hospitals":
      case "Hotels":
      case "Offices":
      case "Shop/Supermarket":
      case "Recreational Centers":
      case "Business":
        type = "business_admin";
        break;
      case "Restaurants":
        type = "restaurant_admin";
        break
      case "Machinery/Supply":
        type = "supply_admin";
        break
      case "Admin":
        type = "admin_admin";
        break
      case "Schools":
        type = "academic_admin";
        break;
      case "Farm":
        type = "farm_admin";
        break;
      case "Households":
      case "Personal":
        type = "household_admin";
        break;
      default:
        type = "user";
        break;
    }

    const firestore = getFirebase().firestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            // ...newUser,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            mobile: newUser.mobile,
            initials: newUser.firstName[0] + newUser.lastName[0],
            email: newUser.email,
            buildingFunction: newUser.function,
            city: newUser.city,
            country: newUser.country,
            region: newUser.region,
            uid: resp.user.uid,
            //restaurant-specific user data:
            restaurantName: newUser.restaurantName,
            companyName: newUser.companyName,
            companyDescription: newUser.companyDescription,
            regulatoryBody: newUser.regulatoryBody,
            regulatoryBodyID: newUser.regulatoryBodyID,
            IDUrl: newUser.IDUrl,
            IDNumber: newUser.IDNumber,
            IDType: newUser.IDType,
            cuisine: newUser.cuisine,
            restaurantDescription: newUser.restaurantDescription,
            type: type,
          });

        //Setup Admin account in relevent users collection
        var adminCollection;
        if (type === "business_admin") {
          adminCollection = "business_users";
        } else if (type === "academic_admin") {
          adminCollection = "academic_users";
        } else if (type === "farm_admin") {
          adminCollection = "farm_users";
        } else if (type === "household_admin") {
          adminCollection = "household_users";
        } else if (type === "supply_admin") {
          adminCollection = "supply_users";
        } else {
          adminCollection = "user";
        }

        if (adminCollection !== "user") {
          firestore
            .collection(adminCollection)
            .doc(resp.user.uid)
            .set({
              name: newUser.firstName + " " + newUser.lastName,
              email: newUser.email,
            });
        }
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const getUserData = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    getFirebase()
      .firestore()
      .collection(data.collection)
      .doc(data.uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_DATA", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_DATA_ERROR", err });
      });
  };
};

//Admin and Sub Account Auth Actions
export const createSubAccount = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    /* 
    Initialize a secondary firebase app instance
    in order to create a new user account without
    automatically signing in as the new user.

    Then complete all actions to add data to
    firebase collections before deleting the secondary
    firebase app instance.

    This solution was found @:
    https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551
    */
    var config = {
      apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
      authDomain: "itracker-development.firebaseapp.com",
      projectId: "itracker-development",
      storageBucket: "itracker-development.appspot.com",
      messagingSenderId: "57163396396",
      appId: "1:57163396396:web:dd800621173f5733a4a889",
    };

    let secondaryApp = firebase.initializeApp(config, "second");

    var subUid;

    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        subUid = resp.user.uid;
        //Create user document inside Admin's 'sub_accounts' collection
        getFirebase()
          .firestore()
          .collection(data.masterCollection)
          .doc(data.uid)
          .collection("sub_accounts")
          .doc(subUid)
          .set({
            email: data.email,
            name: data.firstName + " " + data.lastName,
            role: data.role,
          });
      })
      .then(() => {
        //Create user document inside 'users' base collection
        getFirebase()
          .firestore()
          .collection("users")
          .doc(subUid)
          .set({
            firstName: data.firstName,
            lastName: data.lastName,
            initials: data.firstName[0] + data.lastName[0],
            email: data.email,
            buildingFunction: data.function,
            city: data.city,
            country: data.country,
            region: data.region,
            admin: data.uid,
            type: data.type,
            restaurantName: data.restaurantName,
          });
      })
      .then(() => {
        secondaryApp.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        secondaryApp.auth().signOut();
      })
      .then(() => {
        secondaryApp.delete();
      })
      .then(() => {
        dispatch({ type: "CREATE_SUBACCOUNT" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SUBACCOUNT_ERROR", err });
      });
  };
};

export const deleteSubAccount = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    /* 
    Initialize a secondary firebase app instance
    in order to delete a sub account without
    automatically signing in as the sub account
    before deletion.

    Then complete all actions to remove data from
    firebase collections before deleting the account 
    and then deleting the secondary firebase app 
    instance.

    This solution was found @:
    https://stackoverflow.com/questions/38800414/delete-a-specific-user-from-firebase
    */

    var config = {
      apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
      authDomain: "itracker-development.firebaseapp.com",
      projectId: "itracker-development",
      storageBucket: "itracker-development.appspot.com",
      messagingSenderId: "57163396396",
      appId: "1:57163396396:web:dd800621173f5733a4a889",
    };

    let secondaryApp = firebase.initializeApp(config, "second");

    var subUid;

    secondaryApp
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        subUid = secondaryApp.auth().currentUser.uid;

        //Delete user document inside Admin's 'sub_accounts' collection
        getFirebase()
          .firestore()
          .collection(data.masterCollection)
          .doc(data.uid)
          .collection("sub_accounts")
          .doc(subUid)
          .delete();

        //Delete sub accounts user document
        getFirebase().firestore().collection("users").doc(subUid).delete();
      })
      .then(() => {
        secondaryApp.auth().currentUser.delete();
      })
      .then(() => {
        secondaryApp.auth().signOut();
      })
      .then(() => {
        secondaryApp.delete();
      })
      .then(() => {
        dispatch({ type: "DELETE_SUBACCOUNT" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_SUBACCOUNT_ERROR", err });
      });
  };
};

export const changeConsumerPostcode = (consumer) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

      firestore
      .collection("marketplace")
      .doc(consumer.uid)
      .set({ ...consumer.upload }, { merge: true })
      .then(() => {
        dispatch({ type: "CONSUMER_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "CONSUMER_ERROR", err });
      });
  };
};

export const getConsumerPostcode = (uid) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

      firestore
      .collection("marketplace")
      .doc(uid)
      .get()
      .then((snapshot) => {
        dispatch({ type: "GET_DATA", payload: snapshot.data() });
      })
      .catch((err) => {
        dispatch({ type: "GET_DATA_ERROR", err });
      });
  };
};
