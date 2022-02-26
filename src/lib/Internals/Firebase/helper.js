import { loginUser } from "$lib/Internals/User/helper.js";
import { t } from "svelte-intl-precompile";

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
          console.error($t("could-not-login"));

        });
      }).catch(function (error) {
        console.log(error);
        if (error.code === "auth/credential-already-in-use") {
          auth.signInWithCredential(error.credential).catch((error) => {
            console.error($t("could-not-login"));
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
            console.error($t("something-went-wrong"), error);
          });
        }
      }).catch(function (error) {
        console.error($t("google-sign-in-failed"), error);
      })
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}
