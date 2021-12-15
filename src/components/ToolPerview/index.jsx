// import { React } from "react";
// //import Scrollbars from "react-custom-scrollbars";

// const ToolDemo = (props) => {
//   const { tool } = props;
//   const writeHTML = (frame) => {
//     let iframe_ref = null;
//     if (!frame) {
//       return;
//     }
//     iframe_ref = frame;
//     let doc = frame.contentDocument;
//     doc.open();
//     doc.write(tool.widget_embed_code);
//     doc.close();
//     frame.style.width = '100%';
//    // frame.style.height =     `${frame.contentWindow.document.body.scrollHeight}px`;
//   };

//   return (
//     <>
//       <div className="curent-tool-name custom-scroll">{tool.name}</div>
//       {/* <Scrollbars> */}
//       {/* <div class="tool-perview-container"> */}
//       <iframe
//         className="tool-perview"
//         id="tool-perview"
//         width="100%"
//         // height="500"
//         // scrolling="yes"
//         // /frameborder="no"
//         // allow="autoplay"
//         src=""
//         ref={writeHTML}
//         frameBorder="0"
//       ></iframe>
//       {/* </div> */}
//       {/* </Scrollbars> */}
//     </>
//   );
// };

// export default ToolDemo;

import React, { useState, useEffect } from "react";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { useDispatch, useSelector } from "react-redux";
import LoaderImg from "../../assets/images/loader_engame.gif";

const ToolDemo = (props) => {
  const dispatch = useDispatch();
  const { tool } = props;
  const [isLoading, setIsLoading] = useState(false);

  const hideSpinner = () => {
    setIsLoading(true);
  };
  // // const handelLoading = () => {
  //   if (isLoading) {
  //     dispatch(loadingStop());
  //   } else {
  //     dispatch(loadingStart());
  //   }
  // };

  useEffect(() => {
    // handelLoading();
  }, [isLoading]);

  return (
    <>
      <div className="curent-tool-name custom-scroll">{tool.name}</div>
      {/* <Scrollbars> */}

      <div class="tool-perview-container">
        {!isLoading && (
          <div className="previewLoader">
            <img src={LoaderImg} aboutlt="loader" />
          </div>
        )}
        <iframe
          className="tool-perview"
          id="tool-perview"
          width="100%"
          // height="500"
          // scrolling="yes"
          // /frameborder="no"
          // allow="autoplay"
          onLoad={hideSpinner}
          src={tool.toolLink}
          frameBorder="0"
        ></iframe>
      </div>
      {/* </Scrollbars> */}
    </>
  );
};

export default ToolDemo;
