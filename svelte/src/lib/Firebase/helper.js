export async function login(firebase) {
  try {
    let auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    let anonymousUser = firebase.auth().currentUser;
    if (anonymousUser) {
      anonymousUser.linkWithPopup(provider).then(function (result) {
        firebase.auth().signInWithCredential(result.credential).catch((error) => {
          console.error("could not login");
        });
      }).catch(function (error) {
        if (error.code === "auth/credential-already-in-use") {
          firebase.auth().signInWithCredential(error.credential).catch((error) => {
            console.error("could not login");
          });
        }
      }
      );
    }
    else {
      auth.signInWithPopup(provider).then(function (result) {
        console.log("Ready with sign in!");
        if (anonymousUser) {
          let googleAuthCredential = result.credential;
          anonymousUser.delete().then(function () {


          }).then(function () {
            console.log("Link succeeded");
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
}
