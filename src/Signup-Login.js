import { useState } from "react";
import './styles/Signup-Login.css'
import { useHistory } from "react-router-dom";


const SignupLogin = (prop) => {

    const [isLoginFocus,setisLoginFocus] = useState(true);
    const [signupEmail,setSignupEmail] = useState('');
    const [signupPass,setSignupPass] = useState('');
    const [loginEmail,setLoginEmail] = useState('');
    const [loginPass,setLoginPass] = useState('');
    const [confSignupPass,setconfSignupPass] = useState('');
    const [isPassNotMatch,setisPassNotMatch] = useState(false);
    const [isSignuperr,setisSignuperr] = useState(null);
    const [isLoginerr,setisLoginerr] = useState(null);

    const history = useHistory();    
    return (  
        <div className="SignupLogin">
            <div className="Empty"></div>
            <div className="compwrap">
                <div className="topempty"> Audify </div>
                <div className="selwrap">
                    <div className="signup" onClick={()=> setisLoginFocus(false)}>
                        Sign Up
                    </div>
                    <div className="login" onClick={()=> setisLoginFocus(true)}>
                        Login
                    </div>
                </div>
                <div className="inputwrap">
                    <label htmlFor="Email" className="email">Email</label>
                    <input type="email" className="email" id="Email" required onChange={
                        (event)=>{
                            if(isLoginFocus) setLoginEmail(event.target.value);
                            else setSignupEmail(event.target.value);
                        }
                    }/>
                    <label htmlFor="Password" className="pass">Password</label>
                    <input type="password" className="pass" id="Password" required onChange={
                        (event)=>{
                            if(isLoginFocus) setLoginPass(event.target.value);
                            else setSignupPass(event.target.value);
                        }
                    }/>
                    { !isLoginFocus && 
                        <>
                            <label htmlFor="Confirmpass" className="confirmpass">Confirm Password</label>
                            <input type="password" className="confirmpass" id="Confirmpass" required
                            onChange={
                                (event)=>{
                                    setconfSignupPass(event.target.value);
                                }
                            }/>
                            {
                                isPassNotMatch && 
                                <div className="notmatch">
                                    Passwords didn't match,Please enter same password in both.
                                </div>
                            }
                            {
                                isSignuperr && 
                                <div className="signuperr">
                                    Some Error occured while Signing up! Please try again.
                                </div>
                            }
                        </>
                    }
                    {
                        isLoginFocus && isLoginerr && 
                        <>
                            <div className="loginerr">Some Error occured while Logging in!</div> <div>Error: {isLoginerr}</div>
                        </>
                    }
                    {
                        isLoginFocus && 
                        <>
                            <button type="submit" className="Login" onClick={()=>{prop.login(loginEmail,loginPass,setisLoginerr,()=>{
                                history.push('/user/dashboard');
                            })}}>Login</button>
                        </>
            
                    }
                    {
                        !isLoginFocus &&
                        <>
                            <button type="submit" className="Signup" onClick={()=>{prop.signup(confSignupPass,signupPass,signupEmail,setisPassNotMatch,setisSignuperr,()=>{history.push('/user/dashboard')})}}>Sign Up</button>
                        </>
                    }
                </div>
                <br />
                <div className="orwrap">
                    <div></div>
                    <p>Or</p>
                    <div></div>
                </div>
                
                <div className="signinusingGoogle"><button type="button" className="login-with-google-btn" onClick={()=>{prop.signUporLoginWithGoogle(
                    ()=>{
                        history.push('/user/dashboard');
                    },()=>{
                        history.push('/signuplogin');
                        alert('Something went wrong')
                    }
                )}}>Sign Up/Login Using Google</button></div>
                <div className="bottomempty"></div>

            </div>
            <div className="Empty"></div>
        </div>
    );
}
 
export default SignupLogin;