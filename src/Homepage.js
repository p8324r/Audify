import './styles/Homepage.css';
import { useHistory } from 'react-router-dom';

const Homepage = () => {
    const history = useHistory();
    return (  
        <div className="homepage">
            <div className="toprow">
                <div className="welcomewrap">
                    <div className="empty"></div>
                    <div className="welcome">
                        Welcome to <span>Audify</span>
                    </div>
                    <div className="empty"></div>
                </div>
                <div className="feature">
                    <div className="empty"></div>
                    Extract audio from any video and much more...
                    <div className="empty"></div>
                </div>
                <div className="featurelist">
                    {/* 
                            // @todo : Add Python scripts in backend for extraction of captions also. 
                    
                    */}
                    <div className="empty"></div>
                    <div className="list-item list-item1" style={{display:'none'}}>Automatically generate captions with AI tools at the core</div>
                    <div className="list-item list-item2" style={{display:'none'}}>Add manual captions</div>
                    <div className="list-item list-item3" style={{display:'none'}}>Add Comments at time-stamps</div>
                    <div className="empty"></div>
                </div>
            </div>
            <div className="bottomrow">
                <div className="empty"></div>
                <div className="signup">
                    <div className="signupmessage">
                        All of the above just a click away. Sign Up Now 
                    </div>
                    <div className="link">
                        <button type="button" onClick={()=>{history.push('/signuplogin')}} className='btn' id='btn1'>Sign Up</button>
                    </div>
                </div>
                <div className="empty"></div>
            </div>
            
        </div>
    );
}
 
export default Homepage;
