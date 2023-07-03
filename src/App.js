import './styles/App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import MainPage from './MainPage';
import SignupLogin from './Signup-Login';
import UserDashboard from './UserDashboard';
import { signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useState } from 'react';
import { auth,provider } from './firebase-config';
import ExtractAud from './ExtractAud';
import { useHistory } from 'react-router-dom';

function App() {
  const [data,setData] = useState(null);
  const [authorizedUser,setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));
  
  const [sessionToken,setSessionToken] = useState(null);
  const history = useHistory();
  const fetchData = async(token)=>{
    const response = await axios.get('http://localhost:5000/user/dashboard',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    setData(response);
    // console.log(response);
  }

  const signUporLoginWithGoogle = (success,failure) => {
    signInWithPopup(auth,provider)
    .then(
      (result) => { 
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if(user){
          // console.log(user);
          sessionStorage.setItem('user',JSON.stringify(user));
          user.getIdToken().then((tkn)=>{
            // set access token in session storage
            if(tkn) {sessionStorage.setItem("accessToken", tkn);setAuthorizedUser(true);setSessionToken(tkn);}
            fetchData(sessionStorage.getItem("accessToken"));
          })

         
        }
        success();
      }
    )
    .catch(
      (error) => {
        failure();
        console.log(error?.message);
      }
    )
  }

  const signup = async (confSignupPass,signupPass,signupEmail,setisPassNotMatch,setisSignuperr,success) => {
    try{
        if(confSignupPass !== signupPass) {
            setisPassNotMatch(true);
            throw new Error('Passwords do not Match!');
        }

        else {
            const userCred = await createUserWithEmailAndPassword(auth,signupEmail,signupPass);
            const user = userCred.user;
            if(user){
              sessionStorage.setItem('user',JSON.stringify(user));
              user.getIdToken().then((tkn)=>{
                // set access token in session storage
                // console.log(tkn);
                if(tkn) {sessionStorage.setItem("accessToken", tkn);setAuthorizedUser(true);setSessionToken(tkn);}
                fetchData(sessionStorage.getItem("accessToken"));
              })
            }
            success();
        }
    }
    catch (error) {
        setisSignuperr(error.message);
    }
}

const login = async (loginEmail,loginPass,setisLoginerr,success)=>{
  try{
      const userCred = await signInWithEmailAndPassword(auth,loginEmail,loginPass);
      const user = userCred.user;
      // console.log(user);
      if(user){
        sessionStorage.setItem('user',JSON.stringify(user));
        // console.log(user);
        user.getIdToken().then((tkn)=>{
          // set access token in session storage
          // console.log(tkn);
          if(tkn) {sessionStorage.setItem("accessToken", tkn);setAuthorizedUser(true);setSessionToken(tkn);}
          fetchData(sessionStorage.getItem("accessToken"));
        })
      }
      success();
  }
  catch (error) {
      setisLoginerr(error.message);
  }


}

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path='/signuplogin'>
            <SignupLogin signUporLoginWithGoogle={signUporLoginWithGoogle} signup={signup} login={login}/>
          </Route>
          <Route path='/user/dashboard'>
            <UserDashboard data={data} sessionToken={sessionToken}/>
          </Route>
          <Route path='/user/extract'>
            <ExtractAud/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
