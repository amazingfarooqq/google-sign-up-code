import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {

        const {displayName, email} = result
        setUserData({ displayName, email })

        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

    })

    return () => unsubscribe();
  },[])
  
  const SignUpUsingGoogle = () => {

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email } = result.user;
        setUserData({ displayName, email })

        setIsLoggedIn(true)
      }).catch((error) => {

        console.log({ error });

      });
  }

  const Logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUserData({})
      setIsLoggedIn(false)
    }).catch((error) => {
      // An error happened.
      console.log({ error });
    });
  }

  return (
    <div className="App">

      {!isLoggedIn &&
        <button onClick={SignUpUsingGoogle} type="button" className="login-with-google-btn" >
          Sign in with Google
        </button>
      }

      {isLoggedIn &&
        <div className="wrapper">
          <div className="profile-card js-profile-card">

            <div className="profile-card__img">
              <img src="https://pbs.twimg.com/profile_images/1680659910860869632/0YdmM9FN_400x400.jpg" alt="profile card" />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{userData.displayName}</div>
              <div className="profile-card__txt">{userData.email}</div>
              <div className="profile-card-loc">
              </div>
              <div className="profile-card-ctr">
                <button className="profile-card__button button--orange" onClick={Logout}>Log out</button>
              </div>
            </div>

          </div>
        </div>
      }



    </div>
  );
}

export default App;
