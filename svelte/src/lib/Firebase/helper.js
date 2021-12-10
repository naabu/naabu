import { loginUser } from "$lib/User/helper.js";


export async function login(firebase) {
  try {
    let auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    let anonymousUser = firebase.auth().currentUser;
    if (anonymousUser) {
      return anonymousUser.linkWithPopup(provider).then(function (linkResult) {
        return auth.signInWithCredential(linkResult.credential).then(async function (loginResult) {
          let userLoginResult = await loginUser(firebase, loginResult.user);
          return userLoginResult;
        }).catch((error) => {
          console.error("could not login");

        });
      }).catch(function (error) {
        console.log(error);
        if (error.code === "auth/credential-already-in-use") {
          auth.signInWithCredential(error.credential).catch((error) => {
            console.error("could not login");
          });
        }
      }
      );
    }
    else {
      auth.signInWithPopup(provider).then(function (result) {
        if (anonymousUser) {
          let googleAuthCredential = result.credential;
          anonymousUser.delete().then(function () {
          }).then(function () {
          }).catch(function (error) {
            console.error("Something went wrong", error);
          });

          // 
          // anonymousUser.linkWithCredential(authCredential)
          // .then((usercred) => {
          //   var user = usercred.user;
          //   console.log("Anonymous account successfully upgraded", user);
          // }).catch((error) => {
          //   console.log("Error upgrading anonymous account", error);
          // });
        }
      }).catch(function (error) {
        console.error("Google sign in failed", error);
      })
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}
