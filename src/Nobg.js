
import './Nobg.css';
import warning from './assets/warning.png'
import { useRef ,useState } from "react";
//import img_1 from './assets/img_1.png'
function Nobg(props) {

  const [choose_color, setchoose_color] = useState('');

    const inputElement = useRef();

    const focusInput = () => {
      inputElement.current.click();
    };

    function save_color(color){
      setchoose_color(color);
      props.setcolor(color);
    }

    
  return (
     <div className='Nobg_cont'>

        {props.type==1?
            <>
                <div className='warning_cont'>
                    <img src={warning} className='warning_icon'/>
                    <div> אל תשכח להוריד את הקבצים שלך. הם ימחקו אוטומטית כשתצא מהדף </div>
                </div>

                <button className='color_btn' onClick={focusInput} >צבע רקע <span className="span_color" style={{backgroundColor: choose_color }}></span> </button>
                <input type="color" ref={inputElement} className='input_color' onChange={(e)=>save_color(e.target.value) }/>
            </>
        : <></>}


        {props.img? <img src={'http://localhost:3001/'+(props.type==1?'no_bg_'+props.img : props.img)} className='img_1'/>: <></>}
     </div>
  );
}

export default Nobg;
