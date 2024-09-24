
import './Download.css';

import { useState } from 'react';
import check from "./assets/check.png"
import new_icon from "./assets/new.png"
function Download(props) {
    return (
       <div className={'Download_cont ' + (props.title!='Pro'?"border_line":'') }>
        
            <div className={'Download_title ' + (props.title=='Pro'? "margin_text" : '')}>  {props.title}</div> 
            
            {props.title=='Pro'?<img src={new_icon} className='new_icon' />:<></>}

            <div className='sub_title'> {props.sub_title} </div>
       
            <button className='Download_btn'> {props.btn_text} </button>
       
            <div className='Download_small_text'> {props.small_text} </div> <img src={check} className='check'/>
       </div>
    );
  }
  
  export default Download;
  