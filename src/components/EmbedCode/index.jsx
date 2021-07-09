import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const EmbedCode = () => {
    return(
        <>
        <TextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue=""
    />
            EmbedCode Here  
        </>
    )
}


export default EmbedCode;