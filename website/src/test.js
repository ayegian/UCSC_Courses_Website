import './App.css';
import Axios from 'axios';
import React from 'react';
import UCSC_Logo from "./ucsc_logo2.png"
import Collapsible from './Collapsible';
import logo from './logo.svg'



function postFile(){
    updateUploaded(1);
    console.log("ALL COURSES: ", allCourses);
    console.log("POSTING FILE: ", file.name);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    console.log("BEFORE MAP: ", courseMap);
    var courses = await Axios.post("http://localhost:8080/api/post-transcript", formData, config).then(response=>{ parsePDF(response.data, updateCreditsFunc);});
    console.log("COURSES: ", courses)
    updateUploaded(2);
  }

  function setFile(event){
    const path = event.target.files[0].name;
    console.log("File Name: ", path);
    updatePath(path);
    changeFile(event.target.files[0]);
  }


function makeStuff(){
    return(
        <div id = "postDiv">
        <div>
          <label id="postLabel" htmlFor="postInput">Upload File</label>
          <br/>
          <div id="postFileName">{filePath}</div>
          <input id="postInput" type="file" onChange={setFile}/>
        </div>
        <button id = "postButton" onClick={postFile}>Confirm</button>
        <div id="fileUploaded">{fileUploaded==0 ? "": fileUploaded==1 ? "File Uploading": "Filed Uploaded"}</div>
      </div>

    )
}

makeStuff()