
import './Nobg.css';
import warning from './assets/warning.png'
import { useRef } from "react";
import img_1 from './assets/img_1.png'
function Nobg(props) {

    const inputElement = useRef();

    const focusInput = () => {
      inputElement.current.click();
    };

    
  return (
     <div className='Nobg_cont'>

        {props.type==1?
            <>
                <div className='warning_cont'>
                    <img src={warning} className='warning_icon'/>
                    <div> אל תשכח להוריד את הקבצים שלך. הם ימחקו אוטומטית כשתצא מהדף </div>
                </div>

                <button className='color_btn' onClick={focusInput} >צבע רקע  </button>
                <input type="color" ref={inputElement} className='input_color'/>
            </>
        : <></>}


        <img src={img_1} className='img_1'/>
     </div>
  );
}

export default Nobg;
