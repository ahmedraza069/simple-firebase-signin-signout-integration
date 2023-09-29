import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import app from "../../firebase/firebase.init";
import { useState } from "react";

const LogIn = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();

  const githubAuthProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
const handleGithubSignIn = () => {
  signInWithPopup(auth, githubAuthProvider)

  .then(result => {
    console.log(result);
    setUser(result)
  })
  .catch(error =>{
    console.log(error);
  })
}

  console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
    { user ? <button onClick={handleSignOut} type="button">
        Sign Out
      </button>
      :
   <>
       <button
        style={{ backgroundColor: "aqua" }}
        onClick={handleGoogleSignIn}
        type="button"
      >
        Log In
      </button>
      <button onClick={handleGithubSignIn} type="button">Github Sign In</button>
   </>
}
      <div>
        {user && (
          <div>
            <h3>User : {user?.displayName}</h3>
            <p>Email : {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
