import { Link, useHistory } from 'react-router-dom';
import './styles/Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { useEffect, useState } from 'react';

const Navbar = (prop) => {
    const [currentUser,setCurrentUser] = useState();
    const history = useHistory();
    const logout = async () => {
        try{
            const signingOut = await signOut(auth);
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('user');
            history.push('/');
        }
        catch (err) {
            console.log('Some Error happened');
            console.log(err?.message);
            console.log(err?.code);
        }
    }
    useEffect(()=>{
        const user = auth.currentUser;
        console.log(user);
        if(user !== null){
            setCurrentUser(user.displayName);
        }
    },[])
    return ( 
        <div className="Navbar">
            <div className="left">
                {prop.displayMenubar && 
                    <div className="menubar">
                        <div className="top"></div>
                        <div className="middle"></div>
                        <div className="bottom"></div>
                    </div> 
                }
                <div className="title">Audify</div>
                <div className="empty"></div>
            </div>
            <div className="right">
                <div className="empty"></div>
                {
                    prop.displayLogin && 
                    <div className="signup-login">
                        <Link to='/signuplogin'><button >Login/Sign Up</button></Link>
                    </div>
                }
                {
                    !prop.displayLogin &&
                    <div className="username">
                        {JSON.parse(sessionStorage.getItem('user')).displayName || JSON.parse(sessionStorage.getItem('user')).email}
                    </div>
                }
                {
                    !prop.displayLogin && 
                    <div className="logout">
                        <button className="logout" onClick={logout}>Logout</button>
                    </div>
                }
            </div>
            
        </div>
     );
}
 
export default Navbar;