const firebaseConfig = {
  apiKey: "AIzaSyDTFszUk1Dvja7XXl4Y2qiJdWTlVj3P0ac",
  authDomain: "gk-website-958dc.firebaseapp.com",
  projectId: "gk-website-958dc",
  storageBucket: "gk-website-958dc.firebasestorage.app",
  messagingSenderId: "78721518447",
  appId: "1:78721518447:web:5dedc8881222b92a86f69a",
  measurementId: "G-RZ5512SBP3"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
  auth.signInWithPopup(provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

function checkLogin() {
  auth.onAuthStateChanged(user => {
    if (!user) window.location.href = "index.html";
  });
}
