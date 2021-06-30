import {React,useState} from "react";
import Tools from '../../mock/ToolCards';

const ToolDemo=(props)=> {
    const [istoolUrl,setToolData] = useState(Tools);
    const {isToolData,setTooData}=props;
    
    return (
    <>    
    {
       // console.log(istoolUrl)
        istoolUrl.map((toolData,index)=>{
            <iframe key={index} width="100%" height="650" scrolling="yes" frameborder="no" allow="autoplay" 
            src={toolData.toolLink}></iframe>
        //    console.log(toolData.toolLink)
        })
    }
    {/*  */}
    </>
    )
}

export default ToolDemo;


