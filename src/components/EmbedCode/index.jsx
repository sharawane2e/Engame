import React, { useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomButton from "../../components/widgets/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EmbededCodes from '../../mock/EmbedCode';

const EmbedCode = ({data, toolId}) => {
    const [state] = useState(data)
    return(
        <div className="embeded-conatiner">
        <TextareaAutosize
        className="embeded-conatiner__embeded-code-textarea border-radius"
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue= {state.map(item => item.id===toolId ? item.widget_embed_code : null)}
            />
            <div className="embeded-conatiner__buttton-group">
                <CustomButton 
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