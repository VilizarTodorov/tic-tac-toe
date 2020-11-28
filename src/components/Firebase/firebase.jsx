import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.roomsCollection = "rooms";
    this.usersCollection = "users";
  }

  //user account functions
  signInWithEmailAddress = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  createUserWithEmail = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
  updatePassword = (password) => this.auth.currentUser.updatePassword(password);
  signOutUser = () => this.auth.signOut();

  //rooms functions
  createRoomEntry = () => this.firestore.collection(this.roomsCollection).doc();
  getRoomEntry = (id) => this.firestore.collection(this.roomsCollection).doc(id);
  getRoom = (id) => this.firestore.collection(this.roomsCollection).doc(id).get();
  updateRoomEntry = (id, room) =>
    this.firestore
      .collection(this.roomsCollection)
      .doc(id)
      .update({ ...room });
  getAllRooms = () => this.firestore.collection(this.roomsCollection).get();
  deleteRoom = (id) => this.firestore.collection(this.roomsCollection).doc(id).delete();

  //user entry functions
  getTop10Users = () => this.firestore.collection(this.usersCollection).orderBy("points", "desc").limit(10).get();
  createUserEntry = (uid, user) => this.firestore.collection(this.usersCollection).doc(uid).set(user);
  getUserEntry = (uid) => this.firestore.collection(this.usersCollection).doc(uid).get();
  updateUserEntry = (uid, user) =>
    this.firestore
      .collection(this.usersCollection)
      .doc(uid)
      .update({ ...user });

  createTransaction = (updateFunction, docRef, symbol) =>
    this.firestore.runTransaction((transaction) => updateFunction(transaction, docRef, symbol));
}

export default Firebase;
