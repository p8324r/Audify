import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './styles/UserDashboard.css';
import { storage } from './firebase-config';
import { ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
function UserDashboard(prop) {

  const [Data,setData] = useState([{}]);
  const [vidList,setVidList] = useState([]);
  const uemail = JSON.parse(sessionStorage.getItem('user')).email;
  const userVideoFolderRef = ref(storage,`${uemail}/videos/`);
  /**
   * Code Below: 
   * But the code is fetching two times...
   * Reason : useEffect() needs to be cleaned up.
   */
  /** 
  // useEffect(()=>{
  //   listAll(userVideoFolderRef).then(response=>{
  //     console.log(response.items);
  //     response.items.forEach((item)=>{
  //         getDownloadURL(item).then((url)=>{
  //           setVidList((prev)=>[...prev,url]);
  //         });
  //     });
  //   });
  // },[])
   */
  useEffect(() => {
    let isMounted = true; // Add a flag to track component mount state
    listAll(userVideoFolderRef)
      .then(response => {
        const fetchPromises = response.items.map(item =>
          getDownloadURL(item).then(url => url)
        );
        Promise.all(fetchPromises)
          .then(urls => {
            if (isMounted) {
              setVidList(prev => [...prev, ...urls]);
            }
          })
          .catch(error => {
            // Handle any error that occurs during fetching
            console.log('Error fetching video URLs:', error);
          });
      })
      .catch(error => {
        // Handle any error that occurs during listing items
        console.log('Error listing video items:', error);
      });
    return () => {
      isMounted = false; // Update the mount state when the component unmounts
    };
  }, []);

  const fetchData = async(token)=>{
    const response = await axios.get('http://localhost:5000/user/dashboard',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    setData(response);
    console.log(response);
  }

  // const _ObjKeys = (Obj)=>{
  //     return Object.keys(Obj)
  // }

  useEffect(
    ()=>{
      fetchData(sessionStorage.getItem('accessToken'));
    },[]
  )
  
  const [selectedFile,setSelectedFile] = useState(null);
  const onFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  }



  const onFileSubmit =  ()=>{
    // const formData = new FormData();
    // console.log(selectedFile);
    // formData.append('Key',selectedFile);
    // // formData.append(`VideoOf{JSON.parse(sessionStorage.getItem('user')).email}`,selectedFile);
    // for(var value in formData.entries()){
    //   console.log(value[0],value[1]);
    // }
    // // const resp = await axios.post("http://localhost:5000/user/upload",formData);
    // // console.log(resp);

    // console.log('!@#!@#!@#!@#!@#!@#');

    // const storageref = ref(storage,'trial/new/v.txt');
    // const msg = 'Some Test String';
    // uploadString(storageref,msg).then((snapshot)=>{
    //   console.log('Uploaded');
    //   console.log(snapshot);
    // });

    if(selectedFile == null) return;
    
    console.log(uemail);
    const videoRef = ref(storage,`${uemail}/videos/${selectedFile.name}`);
    uploadBytes(videoRef,selectedFile).then(()=>{
      console.log('Uploaded!');
    });
    console.log('Worked so far...');
  }

  return (
    <div className='UserDashboard'>
        {(prop.statusText==='OK' || sessionStorage.getItem('accessToken')) && 
          <div className="wrap">
              <Navbar displayMenubar={false} displayLogin={false}  />
              <div className="maincont">
                  <Sidebar focus={1} />
                  <div className="inwrap">
                    <div className="pagedesc">Dashboard</div>
                    <div className="renderwrap">
                      <div className="datarender">
                        {vidList.map((url)=>{
                            return <iframe src={url} width='400px' height='300px' allowFullScreen></iframe>
                        })}
                      </div>
                    </div>
                    
                    <div className="lower">
                          <input className='inp' type="file" onChange={(e)=>{onFileChange(e)}}/>
                          <br />
                          <button className='addVid' type="submit" onClick={onFileSubmit}>
                              + Upload Video
                          </button>
                    </div>
                  </div>
                  
              </div>
              
          </div>
          
        }
    </div>
  )
}

export default UserDashboard;