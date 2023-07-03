import React, { useState } from 'react'
import './styles/Sidebar.css';
import { useHistory } from 'react-router-dom';

function Sidebar(prop) {

    const [focus,setFocus] = useState(prop.focus);

    const history = useHistory();



  return (
    <div className='Sidebar'>
        <div className="wrapper">
            <div className="dashboard" onClick={()=>{history.push('/user/dashboard')}} >
                Dashboard
            </div>
            {/* <div className="av" onClick={()=>{history.push('/user/av')}}>
                All Videos and Audios
            </div> */}
            <div className="extractAud" onClick={()=>{history.push('/user/extract')}}>
                Extract Audio
            </div>
            <div className="empty">

            </div>
        </div>
    </div>
  )
}

export default Sidebar