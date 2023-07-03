const express = require('express');
const cors = require('cors');
const {admin,bucket} = require('./firebase-config');
// const firebase = require('firebase');
// const ffmpeg = require('fluent-ffmpeg');
const extractAudio = require('ffmpeg-extract-audio');


const app = express();


var server = app.listen(5000,()=>{
    console.log(`Listening on port ${server.address().port}`)
});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

// function ffmpegSync(videoLink,vidName){
//     return new Promise((resolve,reject)=>{
//         ffmpeg(`${videoLink}`).output(`${vidName}.mp3`).noVideo().format('mp3').outputOptions(['-ab','192k']).run().on("close",()=>{
//             resolve()
//         }).on('error',()=>{reject()})
//     })
// }

// async function extrAud(videoLink,vidName){
    
// }

app.use('/user/dashboard',async (req, res, next) =>{
    if(typeof req.headers.authorization !== 'undefined'  ){
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                // console.log(decodeValue);
                console.log('success');
                return next();
            } 
            return res.json({ message: 'Unauthorized' });
        } catch (e) {
            return res.json({ message: 'Internal Error' });
        }
    }
});

app.get('/user/dashboard', (req,res)=>{
    // console.log(req);
    res.write('OK');
    res.end();
})

app.post('/user/extract',async (req,res)=>{
    const videoLink = req.body.url;
    //console.log(videoLink)
    const extn = req.body.extn;
    // console.log(extn);
    const vidName = videoLink.split('/').at(-1).split('%2F').at(2).split('?').at(0).split('.').at(0).replaceAll('%20',' ');
    const email = videoLink.split('/').at(-1).split('%2F').at(0).replace('%40','@');
    
    //console.log(vidName)
    // console.log(email)
    // ffmpeg(`${videoLink}`).output(`${vidName}.mp3`).noVideo().format('mp3').outputOptions(['-ab','192k']).run()
    // bucket.upload(`${vidName}.mp3`,{ destination: `/${email}/audios/${vidName}`});
    
    await extractAudio({
        input: `${videoLink}`,
        output: `${vidName}.${extn}`
    })
    bucket.upload(`${vidName}.${extn}`,{
        destination: `${email}/audios/${vidName}.${extn}`
    });

    res.write('DONE');
    res.end();
})

