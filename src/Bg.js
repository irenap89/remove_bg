
import './Bg.css';
import close from './assets/close.png'
import logo from './assets/logo.png'
import banner from './assets/banner.png'
import { useState ,useRef } from 'react';
import Download from "./Download"
import close1 from './assets/close1.png'
import Nobg from './Nobg'
import download_folder from './assets/Downloads Folder.png'
import not_robot from './assets/not_robot.png'
import axios from 'axios';


function Bg() {

   const [select_tab, setselect_tab] = useState(1);
   const [show_popup_eula, setshow_popup_eula] = useState(false);
   const [download_popup_eula, setdownload_popup_eula] = useState(false);
   const [not_robot_checked, setnot_robot_checked] = useState(false);
   const [err_msg, seterr_msg] = useState('');
   const [show_err, set_show_err] = useState('');

   const [image_name, setimage_name] = useState('');
   const [show_loader, setshow_loader] = useState(false);
   const [fake, setfake] = useState(false);

   const [color, setcolor] = useState('');
   
   function open_download_popup(){
      setdownload_popup_eula(true);
   }

   function start_download(){
     
      if(not_robot_checked){
       
         seterr_msg('');

         fetch('http://localhost:3001/no_bg_'+image_name)
         .then(response => {
             response.blob().then(blob => {
                 let url = window.URL.createObjectURL(blob);
                 let a = document.createElement('a'); // <a> </a>
                 a.href = url; // <a href="url"> </a>
                 a.download = image_name; // <a href="/assests...." download="image_name"> </a>
                 a.click();

                 setdownload_popup_eula(false)
             });
       });

      } else {
         seterr_msg('יש לסמן אני לא רובוט');
      }
   }


   const inputElement = useRef();

   const focusInput = () => {
      inputElement.current.click();
   };


   async function upload_file(file_obj){

      // console.log(color);

      if (file_obj.type=='image/png' || file_obj.type=='image/jpg' || file_obj.type=='image/jpeg') {
      
         setshow_loader(true);
            let formData = new FormData();    //formdata object

            formData.append('file', file_obj);   //append the values with key, value pair
            formData.append('color', color);  

           await axios.post('http://localhost:3001/get_img',formData)
            .then(function (response) {
               debugger;

               setimage_name(response.data);

               setshow_loader(false);
         
            })
            .catch(function (error) {
               // handle error
               console.log(error);
            })

      } else {
         set_show_err('קובץ לא נתמך')
      }

   }


  return (
   <>
     <div className='bg_main'>

        <img src={close} className='close_icon'/>
        <div className='header_title'> העלאת תמונה כדי להסיר את הרקע </div> 
        <button className='btn_upload' onClick={focusInput} >העלאת תמונה</button>
        <input type="file" ref={inputElement} className='input_file' onChange={(e)=>upload_file(e.target.files[0])} />

        <div className="small_text"> פורמטים נתמכים png, jpg</div>
         {show_err? <div className='err_msg_file'> {show_err} </div> : ''}

         <div className="middle_div">
            <div className="left_div">
                  <div className="tabs">
                        <div  className={"tabs_1 " + (select_tab==1 ? 'selected_tab' : '')} onClick={()=>setselect_tab('1')}> הוסר רקע</div>
                        <div  className={"tabs_2 " + (select_tab==2 ? 'selected_tab' : '')}  onClick={()=>setselect_tab('2')}> מקורי </div>
                  </div>

                  <div className="left_div_in">
                     
                    {select_tab==1 ? <Nobg type="1" img={image_name} setcolor={setcolor}/>  : <Nobg type="2" img={image_name} setcolor={setcolor}/>   }
                     {show_loader? <div className='loader'> 
                        <div className='loader_in'> 39% </div>
                     </div> : <></>}

                  </div>
                  <button className="btn_eula" onClick={()=>setshow_popup_eula(true)}> תקנון החברה </button>

                  <div className="eula_text"> על ידי העלאת תמונה אתה מסכים לתנאים וההגבלות</div>
            </div>

            

            <div className="right_div">

               {download_popup_eula && image_name=='' ? <div className='open_download_popup_err'> יש להעלות תמונה</div>: <></> }

               <div className="right_div_in">
                  <Download  open_download_popup={open_download_popup} title="תמונה חינם" sub_title="תצוגה מקדימה של תמונה" btn_text="הורד" small_text="איכות טובה עד 0.25 מגה פיקסל"></Download>
                  <Download title="Pro"  sub_title="תמונה מלאה"  btn_text=" HD הורד"  small_text="האיכות הטובה ביותר עד 25 מגה פיקסל"></Download>
                   </div>
            </div>

         </div>


         <div className="footer"> 
            <img src={logo} className="logo"/>
            <img src={banner} className="banner"/>

         </div>


     </div>
   
     {show_popup_eula?
   <>
      <div className='layout'></div>
      <div className='eula_text_popup'>
         <img src={close1} className='close_eula_text_popup' onClick={()=>setshow_popup_eula(false)}/>
         dfhgdfgh
      </div>
   </>
   :<></>}


{download_popup_eula && image_name?
   <>
      <div className='layout'></div>
      <div className='download_text_popup'>
         <img src={close1} className='close_eula_text_popup' onClick={()=>setdownload_popup_eula(false)}/>
         <div className='download_folder'> 
            <img src={download_folder} className='download_folder_img'/>
         </div>

         <div className='download_text'> אישור להורדת התמונה </div>

         <div className='download_subtext'>  האם להוריד את התמונה? </div>

         <div className='not_robot_cont'> 
            <input type="checkbox"  onClick={()=>{setnot_robot_checked(!not_robot_checked)}}/>
            <div className='not_robot_text'> אני לא רובוט </div>

            <img src={not_robot} className='not_robot'/>

         </div>

         <div className='btn_cont'>

            <button className='cancel_btn' onClick={()=>setdownload_popup_eula(false)}> ביטול </button>
            <button className='approve_btn' onClick={start_download}> אישור </button>

         </div>

         {err_msg? <div className='err_msg'> {err_msg} </div>: ''}

      </div>
   </>
   :<></>}

     </>
  );
}

export default Bg;
