import React, { useRef,useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomButton from "../../components/widgets/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import copy from "copy-to-clipboard";  
import FileCopyIcon from '@material-ui/icons/FileCopy';

const EmbedCode = ({data, toolId}) => {
    const [state] = useState(data);
    // const [copyText, setCopyText] = useState('');
    // const handleCopyText = (e) => {
    //     console.log(e)
    //     setCopyText(e.target.value);
    //  } 
    //  const copyToClipboard = () => {
    //    //console.log("click i n button")
    //    copy(copyText);
    //     //alert(`You have copied "${copyText}"`);
    //  }


    const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };


    return(
        <div className="embeded-conatiner">
        <TextareaAutosize
        // value={copyText}
        ref={textAreaRef}
        //  onChange={handleCopyText} 
        className="embeded-conatiner__embeded-code-textarea border-radius"
            aria-label="maximum height"
            // placeholder="Maximum 4 rows"
            value= {state.map(item => item.id===toolId ? item.widget_embed_code : null)}
            />
            
            <div className="embeded-conatiner__buttton-group">
                 <CustomButton  onClick={copyToClipboard}
                    className='secondary-button margin-right-20'>
                    <FileCopyIcon className="margin-right-15"/> Copy to Clipboard {copySuccess}
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