import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from './firebase-config';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './styles/ExtractAud.css';
import axios from 'axios';

function ExtractAud() {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const uemail = user.email;
    const [vidURL_List,setVidURL_List] = useState([]);
    const [audURL_List,setAudURL_List] = useState([]);
    const currentUserVidStorageRef = ref(storage,`${uemail}/videos`);
    const currentUserAudStorageRef = ref(storage,`${uemail}/audios`);
    // useEffect(()=>{
    //     listAll(currentUserVidStorageRef).then((response)=>{response.items.forEach(
    //       (item)=>{
    //           getDownloadURL(item).then(
    //             (url)=>{
    //                 setVidURL_List(
    //                   prev=>[...prev,url]
    //                 )
    //             }
    //           )
    //       }
    //     )})

    //     listAll(currentUserAudStorageRef).then((response)=>{
    //       response.items.forEach(
    //         (item)=>{
    //             getDownloadURL(item).then(
    //               (url)=>{
    //                 setAudURL_List(
    //                   prev=>[...prev,url]
    //                 )
    //               }
    //             )
    //         }
    //       )

    //     })
    // },[]);

    useEffect(() => {
      let isMounted = true; 
      listAll(currentUserVidStorageRef)
        .then(response => {
          const fetchPromises = response.items.map(item =>
            getDownloadURL(item).then(url => url)
          );
          Promise.all(fetchPromises)
            .then(urls => {
              if (isMounted) {
                setVidURL_List(prev => [...prev, ...urls]);
              }
            })
            .catch(error => {
              console.log('Error fetching video URLs:', error);
            });
        })
        .catch(error => {
          console.log('Error listing video items:', error);
        });

        listAll(currentUserAudStorageRef)
        .then(response => {
          const fetchPromises = response.items.map(item =>
            getDownloadURL(item).then(url => url)
          );
          Promise.all(fetchPromises)
            .then(urls => {
              if (isMounted) {
                setAudURL_List(prev => [...prev, ...urls]);
              }
            })
            .catch(error => {
              
              console.log('Error fetching video URLs:', error);
            });
        })
        .catch(error => {
          
          console.log('Error listing video items:', error);
        });
        

      return () => {
        isMounted = false; 
      };
    }, []);




    const sendForExtr = (url)=>{
        const id = `extensionsList${url}`
        const extn = document.getElementById(id);
        const selectedextn = extn.options[extn.selectedIndex].value;
        // console.log(extn);
        // console.log(selectedextn);
        const CustomJSONObj = {'url':`${url}`,'extn':`${selectedextn}`} 
        axios.post('http://localhost:5000/user/extract',JSON.stringify(CustomJSONObj),{
          headers: {
            'Content-Type':'application/json'
          }
        }).then((res)=>{console.log(res)})
        .catch((e)=>{console.log(e)});
        
    }

    
  return (
    <div className='extractaud'>
        <Navbar displayMenubar={false} displayLogin={false}  />
        <div className="maincont">
            <Sidebar focus={0} />
            <div className="wrap">
                <div className="vidwrap">
                      {
                        !vidURL_List.length &&
                        <div className="loading">
                            No Videos Found...
                            Loading!
                        </div>
                      }
                      {
                        vidURL_List.length &&
                        vidURL_List.map((url)=>{
                          const title = url.split('/').at(-1).split('%2F').at(2).split('?').at(0).replaceAll('%20',' ').replaceAll('_',' ');
                          return <div className="vidframe">
                            <iframe src={url} width='400px' height='300px' allowFullScreen>Sorry, video could not be displayed due to unsupported extension</iframe>
                            <div className="title">
                            {title}
                              </div>
                              
                                <div className="selectextn">
                                  <label htmlFor="extensions">Please select an extension: </label>
                                  <select name="extensions" id= {`extensionsList${url}`} >
                                     <option value="mp3">.mp3</option>
                                     <option value="wav">.wav</option>
                                  </select>
                                </div>
                              
                              <div className="btn">
                                  <button className='extbtn' type="button" onClick={()=>{sendForExtr(url)}}>Extract Audio</button>
                              </div>
                              
                          </div>
                        })
                      }
                </div>
                <div className="audwrap">
                      {
                        !audURL_List.length &&
                        <div className="loading">
                            No Audios Found...
                            Loading!
                        </div>
                      }
                      {
                        audURL_List.length &&
                        audURL_List.map((url)=>{
                          const title = url.split('/').at(-1).split('%2F').at(-1).split('?').at(0).replaceAll('%20',' ').replaceAll('_',' ').replaceAll('%2520',' ');
                          return <div className="audframe">
                                  <audio controls src={url}></audio>
                                  <div className="title">{title}</div>
                          </div>
                        })
                      }
                      <div className="empty">   
                      </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ExtractAud