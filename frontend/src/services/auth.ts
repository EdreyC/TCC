// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { signOut } from "firebase/auth";


// // async function singInWithEmailAndPassword(){

// //     const auth = getAuth();
// //     signInWithEmailAndPassword(auth, email, password)
// //     .then((userCredential) => {
// //         // Signed in
// //         const user = userCredential.user;
// //         // ...
// //     })
// //     .catch((error) => {
// //         const errorCode = error.code;
// //         const errorMessage = error.message;
// //     });
// // }


//  async function signInWithGoogle () {
//     const provider = new GoogleAuthProvider();
//     const auth = getAuth();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         /** // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // ...*/
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
// }

// async function singOut() {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       // Sign-out successful.
//     }).catch((error) => {
//       // An error happened.
//     });
// }

// export {signInWithGoogle, singOut}