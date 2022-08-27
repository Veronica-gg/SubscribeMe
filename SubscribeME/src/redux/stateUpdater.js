import { useSelector, useDispatch } from "react-redux";
import { updateSubs, updateFriends, updateProfile } from "./reducer";
import { functions } from "../utils/firebase";
import { httpsCallable } from "firebase/functions";

export function updateState(
  dispatch,
  subs = true,
  friends = true,
  profile = true
) {
  function getSubs() {
    // Async call to remote subscriptions
    const fun = httpsCallable(
      functions,
      "manageSubscription-getUserSubscription"
    );
    return fun()
      .then((v) => {
        dispatch(updateSubs({ subs: v.data.subs }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFriends() {
    // Async call to remote friends
    const fun = httpsCallable(functions, "manageUser-getFriendsData");
    return fun()
      .then((v) => {
        dispatch(
          updateFriends({
            friends: v.data.friends,
            pendingFriendsRecv: v.data.pendingFriendsRecv,
            pendingFriendsSent: v.data.pendingFriendsSent,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getProfile() {
    const fun = httpsCallable(functions, "manageUser-getCurrentUserInfo");
    return fun([], true)
      .then((v) => {
        console.log(v);
        dispatch(
          updateProfile({
            name: v.data.users[0].name,
            email: v.data.users[0].email,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  profile || getProfile();
  subs || getSubs();
  friends || getFriends();
}
