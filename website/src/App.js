import './App.css';
import Axios from 'axios';
import React from 'react';
import UCSC_Logo from "./ucsc_logo2.png";
import Collapsible from './Collapsible';
import logo from './logo.svg';
import instructionsGif from './instructionsGif.gif'
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCqFI6_JSCPVvzIhDOI7a677GKkKjHATm4",

  authDomain: "ucsc-ge-checker.firebaseapp.com",

  databaseURL: "https://ucsc-ge-checker-default-rtdb.firebaseio.com",

  projectId: "ucsc-ge-checker",

  storageBucket: "ucsc-ge-checker.appspot.com",

  messagingSenderId: "113436054681",

  appId: "1:113436054681:web:60540f7de2be9fcbd59408",

  measurementId: "G-6EKR9YK0Q9"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
// import listReactFiles from 'list-react-files'

// import {saveAs} from 'FileSaver';
// import FileSaver from "file-saver";
// import {moveFile} from "move-file";
// import ps5 from "ps5"


var courseMap = {};



function courseInfo(course, onChangeFunc, updateFunc){
  return(
    <label htmlFor={`courseCheck ${course.ID}`} id = {course.ID} key = {course.ID} className = "courseLabel">
      <div key = {`courseDiv ${course.ID}`} className="courseDiv">
        <input type = "checkbox" className='courseCheck' id = {`courseCheck ${course.ID}`} key = {`courseCheck ${course.ID}`} name = {`${course.GE}:${course.Credits}`} onChange={event => onChangeFunc(event, updateFunc)}/>
        <div className='courseLabelDiv'>
          {/* <br/> */}
          {course.shortenedName}
          <br/>
          GE: {course.GE}
          <br/>
          Credits: {course.Credits}
          <br/>
        </div>
      </div>
    </label>


  )
}

function courseInfoBreaks(GE, courses, begInd, endInd, inbetween){
  return(
    <div key = {`GE_Div: ${GE}`}>
      <div className='coursesBlock'>
      </div>
      <Collapsible header={{on:`-`, off:"+", always:
                <span>
                <h2>
                  GE: {GE}
                </h2>
                </span>
      }} 
      body={
        <div className='GE_Headers' key = { `GE_Header: ${GE}`}>
          <div className='coursesBlock' key = {`GE_Courses: ${GE}`}>
            {inbetween.slice(begInd, endInd)}
          </div>
        </div>
      }/>
    </div>
  )
}


function filterCourses(filter, courses, compFunc, courseFunc, onChangeFunc, updateCreditsFunc){
  const filteredCourses = [];
  for(let i = 0; i<courses.length; ++i){
    if(filter[courses[i].GE] && (courses[i].shortenedName.toLowerCase()).includes(filter.name.toLowerCase())){
      filteredCourses.push(courses[i]);
    }
  }

  var inbetween = filteredCourses.map(course => courseInfo(course, onChangeFunc, updateCreditsFunc));


  const courseComponents = [];
    var begInd = 0;
    var endInd = 0;

    for(let i = 1; i<filteredCourses.length; ++i){
      endInd = i;
      if(filteredCourses[i].GE != filteredCourses[i-1].GE){
        //INSERT BREAK
        const component = courseInfoBreaks(filteredCourses[i-1].GE, filteredCourses, begInd, endInd, inbetween);
        courseComponents.push(component);
        begInd = i;
      }
    }
    if(filteredCourses.length > 0){
      const component = courseInfoBreaks(filteredCourses[filteredCourses.length-1].GE, filteredCourses, begInd, endInd+1, inbetween);
      courseComponents.push(component);
    }

    compFunc(inbetween);
    courseFunc(courseComponents);
}

function parsePDF(pdfText, creditFunc){
  //console.log("GET COURSES STARTED");
  var listText = pdfText.split('\n');
  //console.log("MAP: ",courseMap);
  //console.log("MAP TEST: ",courseMap["WRIT 2"]);
  listText.forEach(element => {
    var courseText = element.split(' ');
    courseText = courseText.filter(Boolean);
    var possCourse = courseText[0]+" "+courseText[1];
    if(courseMap[possCourse]){
      var x = 0;
      var attempted = false;
      for(let i = 0; i<courseText.length; ++i){
        x = i;
        var temp = courseText[i].split(".");
        if(temp.length == 2 && !isNaN(parseFloat(temp[0])) && !isNaN(parseFloat(temp[1]))){
          if (attempted){
            break;
          }
          attempted = true
        }
      }
      if(courseMap[possCourse].GE == "SI"){
        //console.log("SI COURSE: ", possCourse," CREDITS: ", courseText[x]);
        //console.log("COURSE TEXT: ", courseText);
      }
      creditFunc(prevCredits =>{
        //console.log("PREV CREDITS2: ", prevCredits);
        return({
            ...prevCredits,
            [courseMap[possCourse].GE]: prevCredits[courseMap[possCourse].GE] + parseFloat(courseText[x])
          });
        });
    }
  });
}

async function testParsePDF(pdfText, creditFunc, fileName){
  var FN = fileName;
  FN = fileName.split(".");
  FN = FN[0];
  //console.log("FN: ",FN);
  var GEStr = "";
  //console.log("GET COURSES STARTED");
  var listText = pdfText.split('\n');
  //console.log("MAP: ",courseMap);
  //console.log("MAP TEST: ",courseMap["WRIT 2"]);
  listText.forEach(element => {
   var courseText = element.split(' ');
    courseText = courseText.filter(Boolean);
    var possCourse = courseText[0]+" "+courseText[1];
    if(courseMap[possCourse]){
      var x = 0;
      var attempted = false;
      for(let i = 0; i<courseText.length; ++i){
        x = i;
        var temp = courseText[i].split(".");
        if(temp.length == 2 && !isNaN(parseFloat(temp[0])) && !isNaN(parseFloat(temp[1]))){
          if (attempted){
            break;
          }
          attempted = true
        }
      }
      if(courseMap[possCourse].GE == "SI"){
        //console.log("SI COURSE: ", possCourse," CREDITS: ", courseText[x]);
        //console.log("COURSE TEXT: ", courseText);
      }
      GEStr += courseMap[possCourse].GE +",";
      //console.log("GESTR: ",GEStr);
      creditFunc(prevCredits =>{
        ////console.log("PREV CREDITS2: ", prevCredits);
        return({
            ...prevCredits,
            [courseMap[possCourse].GE]: prevCredits[courseMap[possCourse].GE] + parseFloat(courseText[x])
          });
        });
    }
  });
  console.log("GESTR: ", GEStr);
  await Axios.post("http://localhost:8080/api/save-test", [GEStr, FN]).then(()=>console.log("Posted test"));
  // saveAs(file, "D:/python/ucsc_courses_website/test/tests.txt");
  // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  // FileSaver.saveAs(blob, "hello world.txt");
  // ps5.save(GEStr, "D:/python/ucsc_courses_website/test/jstxts/"+FN+".txt");
  // saveAs(new File([GEStr], "D:/python/ucsc_courses_website/test/jstxts/"+FN+".txt", {type: "text/plain;charset=utf-8"}));
}



// function parsePDF(pdfText, creditFunc){
//   //console.log("GET COURSES STARTED");
//   var listText = pdfText.split('\n');
//   //console.log("MAP: ",courseMap);
//   //console.log("MAP TEST: ",courseMap["WRIT 2"]);
//   listText.forEach(element => {
//     var courseText = element.split(' ');
//     courseText = courseText.filter(Boolean);
//     var possCourse = courseText[0]+" "+courseText[1];
//     if(courseMap[possCourse]){
//       var x = 0;
//       for(let i = 0; i<courseText.length-2; ++i){
//         x = i;
//         var temp = courseText[courseText.length-2-i].split(".");
//         if(temp.length == 2 && !isNaN(parseFloat(temp[0])) && !isNaN(parseFloat(temp[1]))){
//           break;
//         }
//       }
//       if(courseMap[possCourse].GE == "SI"){
//         //console.log("SI COURSE: ", possCourse," CREDITS: ", courseText[courseText.length-2-x]);
//         //console.log("COURSE TEXT: ", courseText);
//       }
//       creditFunc(prevCredits =>{
//         //console.log("PREV CREDITS2: ", prevCredits);
//         return({
//             ...prevCredits,
//             [courseMap[possCourse].GE]: prevCredits[courseMap[possCourse].GE] + parseFloat(courseText[courseText.length-2-x])
//           });
//         });
//     }
//   });
// }



function App() {
  const [allCourses, updateCourses] = React.useState('');
  const [courseList, courseFunc] = React.useState("");
  const [courseComps, compFunc] = React.useState("");
  const [creditsTaken, updateCreditsFunc] = React.useState({C: 0, CC: 0, ER: 0, IM: 0, MF: 0, ['PE-E']: 0, ['PE-H']: 0, ['PE-T']: 0, ['PR-C']: 0, ['PR-E']: 0, ['PR-S']: 0, SI: 0, SR: 0, TA: 0})
  const [file, changeFile] = React.useState();
  const [creditsTakenComp, updateCreditsComp] = React.useState("");
  const GE_Array = ["C", "CC", "ER", "IM", "MF", 'PE-E', 'PE-H', 'PE-T', 'PR-C', 'PR-E', 'PR-S', "SI", "SR", "TA"];
  const [filter, filterUpdate] = React.useState({C: true, CC: true, ER: true, IM: true, MF: true, ['PE-E']: true, ['PE-H']: true, ['PE-T']: true, ['PR-C']: true, ['PR-E']: true, ['PR-S']: true, SI: true, SR: true, TA: true, name: ""})
  const [filePath, updatePath] = React.useState("No file chosen");
  const [fileUploaded, updateUploaded] = React.useState(0);
  async function getCourses(){
    var courses = await Axios.get("http://localhost:8080/api/get-courses");
    courses = courses.data;
    courses.forEach(element => {
      element.GE = element.GE.substr(1, element.GE.length-2);
    });
    var inbetween = courses.map(course => courseInfo(course, updateCredits, updateCreditsFunc));
    const courseComponents = [];
    var begInd = 0;
    var endInd = 0;
    for(let i = 1; i<courses.length; ++i){
      endInd = i;
      if(courses[i].GE != courses[i-1].GE){
        const component = courseInfoBreaks(courses[i-1].GE, courses, begInd, endInd, inbetween);
        courseComponents.push(component);
        begInd = i;
      }
    }
    const component = courseInfoBreaks(courses[courses.length-1].GE, courses, begInd, endInd+1, inbetween);
    courseComponents.push(component);
    updateCourses(courses);
    compFunc(inbetween);
    courseFunc(courseComponents);
    courses.forEach(element => {
      courseMap[element.shortenedName] = element;
    });
    //console.log(courses[0].shortenedName);
    //console.log(courseMap[courses[0].shortenedName]);
  }

  function handleChange(event){
    const {name, value, checked, type} = event.target;
    filterUpdate(prevFilter =>{
      return({
        ...prevFilter,
        [name]: type=="checkbox" ? checked: value
      })
    });
  }

  async function giveFiles(){
    console.log("START GIVE");
    var resData;
    var courses = await Axios.get("http://localhost:8080/api/test-get-files").then(response =>{
      resData = response.data;
    });
    for(let x = 0; x<resData.length; ++x){
      await testParsePDF(resData[x][0], updateCreditsFunc, resData[x][1]);
    }
    // //console.log("ALL FILES");
    // listReactFiles("D:/python/ucsc_courses_website/test/pdfs").then(files => //console.log(files));
  }

  React.useEffect(()=>{getCourses()},[]);

  React.useEffect(()=>{filterCourses(filter, allCourses, compFunc, courseFunc, updateCredits, updateCreditsFunc)},[filter]);

  // React.useEffect(()=>{giveFiles()},[]);

  const GE_Checkboxes = GE_Array.map(GE=><GE_Checkbox key = {GE} GE={GE} changeFunc={handleChange} f={filter}/>)

  function setFile(event){
    const path = event.target.files[0].name;
    //console.log("File Name: ", path);
    updatePath(path);
    changeFile(event.target.files[0]);
  }

  async function postFile(){
    updateUploaded(1);
    //console.log("ALL COURSES: ", allCourses);
    //console.log("POSTING FILE: ", file.name);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    //console.log("BEFORE MAP: ", courseMap);
    //var courses = await Axios.post("http://localhost:8080/api/post-transcript", formData, config).then(response=>{ parsePDF(response.data, updateCreditsFunc);});
    var courses = await Axios.post("http://localhost:8080/api/post-transcript", formData, config).then(response=>{ parsePDF(response.data, updateCreditsFunc);});
    //console.log("COURSES: ", courses)
    updateUploaded(2);
  }

  async function testPostFile(){
    updateUploaded(1);
    //console.log("ALL COURSES: ", allCourses);
    //console.log("POSTING FILE: ", file.name);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    //console.log("BEFORE MAP: ", courseMap);
    //var courses = await Axios.post("http://localhost:8080/api/post-transcript", formData, config).then(response=>{ parsePDF(response.data, updateCreditsFunc);});
    var courses = await Axios.post("http://localhost:8080/api/post-transcript", formData, config).then(response=>{ testParsePDF(response.data, updateCreditsFunc,file.name);});
    //console.log("COURSES: ", courses)
    updateUploaded(2);
  }

  return (
    <div className="App">
      <header>
        <img id = "headerLogo" src={UCSC_Logo}/>
      </header>
      <div className = "titleAndInstructions">
        <br/>
        <h1>
          General Education Requirement Checker UCSC
        </h1>
        <h2>Instructions</h2>
        <div class="instructions">
          Upload your unoffical transcript PDF, then press the Check GEs button. See below for how to get unoffical transcript from MyUCSC.
        </div>
        <img id = "instGif" src = {instructionsGif}/>
        <br/>
      </div>
      <br/>
      <div id = "postDiv">
        <div>
          <label id="postLabel" htmlFor="postInput">Upload File</label>
          <br/>
          <div id="postFileName">{filePath}</div>
          <input id="postInput" type="file" onChange={setFile}/>
        </div>
        <button id = "postButton" onClick={postFile}>Confirm</button> 
        {/* <button id = "postButton" onClick={testPostFile}>Confirm2</button> */}

        <div id="fileUploaded">{fileUploaded==0 ? "": fileUploaded==1 ? "File Uploading": "Filed Uploaded"}</div>
      </div>
      <div class="instructions">
        Alternately, you can manually select what classes you have taken by selecting them below.
      </div>

      <div id = "filterSettings">
        <div>
          <h2>Search For Class:</h2>
          <input id = "filterSettingsSearchbar" type="text" name="name" value ={filter.name} placeholder="Search..." onChange={handleChange}/>
        </div>

        <h2>Display These GEs:</h2>
        <div id="filterSettingsCheckboxes">
          {GE_Checkboxes}
        </div>

      </div>
      {creditsTakenComp}
      <br/>
      <button onClick={()=>GEs_Needed(creditsTaken, updateCreditsComp)} id="submissionButton">Check GEs</button>
      {courseList}
      <br/>
    <footer>
      <div>By Alexander Yegian</div>

      <a id="footerLink" href='https://www.linkedin.com/in/alexander-yegian-53856a207/'>Alex's Linkedin</a>
    </footer>
    </div>
  );
}

function changeFile(event){

}

function GEs_Needed(credits, creditsCompFunc){
  //console.log("GES NEEDED CREDITS: ", credits);
  var creditsArr = [];
  if(credits.C < 5){
    creditsArr.push({GE:"C", credits:5-credits.C});
  }
  if(credits.CC < 5){
    creditsArr.push({GE:"CC", credits:5-credits.CC});
  }
  if(credits.ER <5){
    creditsArr.push({GE:"ER", credits:5-credits.ER});
  }
  if(credits.IM<5){
    creditsArr.push({GE:"IM", credits:5-credits.IM});
  }
  if(credits.MF<5){
    creditsArr.push({GE:"MF", credits:5-credits.MF});
  }
  if(credits['PE-E']+credits["PE-H"]+credits["PE-T"] < 5){
    creditsArr.push({GE:"PE", credits:5-(credits['PE-E']+credits["PE-H"]+credits["PE-T"])});
  }
  if(credits['PR-C']+credits['PR-E']+credits['PR-S'] < 2){
    creditsArr.push({GE:"PR", credits:2-(credits['PR-C']+credits['PR-E']+credits['PR-S'])});
  }
  if(credits.SI<5){
    creditsArr.push({GE:"SI", credits:5-credits.SI});
  }
  if(credits.SR<5){
    creditsArr.push({GE:"SR", credits:5-credits.SR});
  }
  if(credits.TA<5){
    creditsArr.push({GE:"TA", credits:5-credits.TA});
  }
  creditsArr = creditsArr.map(creditsNeededComp);
  creditsCompFunc(   
    <div>
      {creditsArr.length == 0 ? <h4 className='creditsCompletedStatement'>You have completed all GE requirements</h4>:
      <ul className='creditsNeededList'>
        {creditsArr}
      </ul>}
    </div> 
  );
}

function creditsNeededComp(prop){
  return(
    <li className='creditsNeededLI' key = {`creditsNeeded${prop.GE}`}>{prop.credits} credits needed for {prop.GE} GE</li>
  )
}

function GE_Checkbox({GE, changeFunc, f}){
  return(
    <label className='GE_Setting_Check_Comp' key={`${GE}_Setting_Check_Comp`} htmlFor={`${GE}_Check`}>
      <input className='GE_Setting_Check' key={`${GE}_Setting_Check`} type="checkbox" name={GE} onChange={changeFunc} defaultChecked = {true} value={f[GE]} id={`${GE}_Check`}/>
      {GE}
    </label>

  )
}


function updateCredits(event, updateFunc){
  const {name, value, checked, type} = event.target;
  //console.log("UPDATE CREDITS CHECKED: ", checked, " VALUE: ", value, " NAME: ", name);
  var name_split = name.split(":");
  const GE = name_split[0];
  const credits = name_split[1];
  updateFunc(prevCredits =>{
    //console.log("PREV CREDITS: ", prevCredits);
    return({
        ...prevCredits,
        [GE]: checked ? prevCredits[GE] + parseInt(credits): prevCredits[GE] - parseInt(credits)
      })
  });
}

export default App;
