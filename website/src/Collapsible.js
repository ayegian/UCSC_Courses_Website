import React from "react";



function toggleOn(func){
    func(prevVal=>{return(!prevVal)});
}

export default function Collapsible({header, body}){
    const [on, changeOn] = React.useState(false);
    return(
        <div className="collapsibleParent">
            <div className = "collapsibleHeaderDiv">
                <div>
                    {header.always}
                </div>
                <button id="toggleButton" onClick={()=>toggleOn(changeOn)} className = "GEToggleButton">{on ? header.on: header.off}</button>
            </div>
           {/* <label id = "toggleLabel" htmlFor="toggleButton">{header.always}</label>
            <button id="toggleButton" onClick={()=>toggleOn(changeOn)} className = "GEToggleButton">{on ? header.on: header.off}</button>  */}
            <hr/>
            {on ? body: <div></div>}
        </div>
        // <div class="collapsibleParent">
        //     {body}
        // </div>
    )
}

