import React, { useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomButton from "../../components/widgets/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
// import copy from "copy-to-clipboard";  
import FileCopyIcon from '@material-ui/icons/FileCopy';

const EmbedCode = ({data, toolId}) => {
    const [state] = useState(data);
    const [copyText, setCopyText] = useState('');
    const handleCopyText = (e) => {
        setCopyText(e.target.value);
     } 
     const copyToClipboard = () => {
        //copy(copyText);
        alert(`You have copied "${copyText}"`);
     }

    return(
        <div className="embeded-conatiner">
        <TextareaAutosize
         value={copyText}
         onChange={handleCopyText} 
        className="embeded-conatiner__embeded-code-textarea border-radius"
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue= {state.map(item => item.id===toolId ? item.widget_embed_code : null)}
            />
            <div className="embeded-conatiner__buttton-group">
                 <CustomButton  onClick={copyToClipboard}
                    className='secondary-button margin-right-20'>
                    <FileCopyIcon className="margin-right-15"/> Copy to Clipboard
                </CustomButton>
                <CustomButton 
                    className='primary-button'>
                    <GetAppIcon className="margin-right-15"/>   Download
                </CustomButton>
            </div>
        </div>
    )
}

export default EmbedCode;