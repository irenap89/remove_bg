
import './Bg.css';
import close from './assets/close.png'
import logo from './assets/logo.png'
import banner from './assets/banner.png'
import { useState } from 'react';
import Download from "./Download"
import close1 from './assets/close1.png'
import Nobg from './Nobg'
import download_folder from './assets/Downloads Folder.png'
function Bg() {

   const [select_tab, setselect_tab] = useState(1);
   const [show_popup_eula, setshow_popup_eula] = useState(false);
   const [download_popup_eula, setdownload_popup_eula] = useState(false);
   
   function open_download_popup(){
      setdownload_popup_eula(true);
   }

  return (
   <>
     <div className='bg_main'>

        <img src={close} className='close_icon'/>
        <div className='header_title'> העלאת תמונה כדי להסיר את הרקע </div> 
        <button className='btn_upload'>העלאת תמונה</button>

        <div className="small_text"> פורמטים נתמכים png, jpg</div>


         <div className="middle_div">
            <div className="left_div">
                  <div className="tabs">
                        <div  className={"tabs_1 " + (select_tab==1 ? 'selected_tab' : '')} onClick={()=>setselect_tab('1')}> הוסר רקע</div>
                        <div  className={"tabs_2 " + (select_tab==2 ? 'selected_tab' : '')}  onClick={()=>setselect_tab('2')}> מקורי </div>
                  </div>

                  <div className="left_div_in">
                     
                    {select_tab==1 ? <Nobg type="1"/>  : <Nobg type="2"/>   }
                  </div>
                  <button className="btn_eula" onClick={()=>setshow_popup_eula(true)}> תקנון החברה </button>

                  <div className="eula_text"> על ידי העלאת תמונה אתה מסכים לתנאים וההגבלות</div>
            </div>

            <div className="right_div">
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


{download_popup_eula?
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
            <input type="checkbox" />
            <div className='not_robot_text'> אני לא רובוט </div>

         </div>
      </div>
   </>
   :<></>}

     </>
  );
}

export default Bg;
