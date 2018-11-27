import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: 'AIzaSyD3568Uh4KVxHm9N7ibZohQ1bp9ChVttXQ',
  authDomain: 'notepad-d8d76.firebaseapp.com',
  databaseURL: 'https://notepad-d8d76.firebaseio.com',
  projectId: 'notepad-d8d76',
  storageBucket: 'notepad-d8d76.appspot.com',
  messagingSenderId: '1018760532537',
};

const devConfig = {
  apiKey: 'AIzaSyD3568Uh4KVxHm9N7ibZohQ1bp9ChVttXQ',
  authDomain: 'notepad-d8d76.firebaseapp.com',
  databaseURL: 'https://notepad-d8d76.firebaseio.com',
  projectId: 'notepad-d8d76',
  storageBucket: 'notepad-d8d76.appspot.com',
  messagingSenderId: '1018760532537',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then((snapshot) => {
          const dbUser = snapshot.val();

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  messages = () => this.db.ref('messages');
}

export default Firebase;
