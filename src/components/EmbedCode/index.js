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

    return(
        <div className="embeded-conatiner">
        <TextareaAutosize
        ref={textAreaRef}
        className="embeded-conatiner__embeded-code-textarea border-radius"
            aria-label="maximum height"
            value= {state.map(item => item.id===toolId ? item.widget_embed_code : null)}
            />
            
            <div className="embeded-conatiner__buttton-group">
                 <CustomButton  onClick={copyToClipboard}
                    className='secondary-button margin-right-20'>
                    <FileCopyIcon className="margin-right-15"/> Copy to Clipboard {copySuccess}
                </CustomButton>
                <CustomButton download
                    className='primary-button'>
                    <GetAppIcon className="margin-right-15"/>   Download
                </CustomButton>
            </div>
        </div>
    )
}

export default EmbedCode;