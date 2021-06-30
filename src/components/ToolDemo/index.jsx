import {React,useState} from "react";
import Tools from '../../mock/ToolCards';

const ToolDemo=(props)=> {
    const [istoolUrl,setToolData] = useState(Tools);
  
    return (
    <>    
    {/* {
        istoolUrl.map((toolData,index)=>{
           return(
            <iframe key={index} width="100%" height="650" scrolling="yes" frameborder="no" allow="autoplay" 
            src={toolData.toolLink}></iframe>
           );
        })
    } */}
    <iframe  width="100%" height="650" scrolling="yes" frameborder="no" allow="autoplay" 
            src=""></iframe>
    </>
    )
}

export default ToolDemo;


