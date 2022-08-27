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
        if (v.data.message === "ok") {
          dispatch(updateSubs({ subs: v.data.subs }));
        }
        return v.data;
      })
      .catch(() => {
        return { message: "error" };
      });
  }

  function getFriends() {
    // Async call to remote friends
    const fun = httpsCallable(functions, "manageUser-getFriendsData");
    return fun()
      .then((v) => {
        if (v.data.message === "ok") {
          dispatch(
            updateFriends({
              friends: v.data.friends,
              pendingFriendsRecv: v.data.pendingFriendsRecv,
              pendingFriendsSent: v.data.pendingFriendsSent,
            })
          );
        }
        return v.data;
      })
      .catch(() => {
        return { message: "error" };
      });
  }

  function getProfile() {
    const fun = httpsCallable(functions, "manageUser-getCurrentUserInfo");
    return fun([], true)
      .then((v) => {
        if (v.data.message === "ok") {
          dispatch(
            updateProfile({
              name:
                v.data.users[0].name && v.data.users[0].name.length > 0
                  ? v.data.users[0].name
                  : null,
              email: v.data.users[0].email,
            })
          );
        }
        return v.data;
      })
      .catch(() => {
        return { message: "errorGetProfile" };
      });
  }

  return {
    profile: profile && getProfile(),
    subs: subs && getSubs(),
    friends: friends && getFriends(),
  };
}
