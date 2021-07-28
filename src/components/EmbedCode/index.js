import React, { useRef,useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomButton from "../../components/widgets/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const EmbedCode = ({data, toolId}) => {
    const [state] = useState(data);
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const copyToClipboard=(e)=>{
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    }
    const downloadfile=(e)=>{
          var link = document.createElement("a");
         link.href = window.URL.createObjectURL(
            new Blob([document.getElementById('text-area').value], { type: "application/octet-stream" })
          );
          link.download = "embeded.text";
          document.body.appendChild(link);
          link.click();
          setTimeout(function () {
            window.URL.revokeObjectURL(link);
          }, 200);        
    }

    return(
        <div className="embeded-conatiner">
        <TextareaAutosize
        ref={textAreaRef}
        className="embeded-conatiner__embeded-code-textarea border-radius"
            aria-label="maximum height"
            id="text-area"
            value= {state.map(item => item.id===toolId ? item.widget_embed_code : null)}
            />
            
            <div className="embeded-conatiner__buttton-group">
                 <CustomButton  onClick={copyToClipboard}
                    className='secondary-button margin-right-20'>
                    <FileCopyIcon className="margin-right-15"/> {copySuccess ? copySuccess : "Copy to Clipboard"} 
                </CustomButton>
                <CustomButton onClick={downloadfile}
                    className='primary-button'>
                    <GetAppIcon className="margin-right-15"/>   Download
                </CustomButton>
            </div>
        </div>
    )
}

export default EmbedCode;