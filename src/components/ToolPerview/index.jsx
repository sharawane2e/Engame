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

import { React } from "react";
//import Scrollbars from "react-custom-scrollbars";

const ToolDemo = (props) => {
  const { tool } = props;

  return (
    <>
      <div className="curent-tool-name custom-scroll">{tool.name}</div>
      {/* <Scrollbars> */}
      {/* <div class="tool-perview-container"> */}
      <iframe
        className="tool-perview"
        id="tool-perview"
        width="100%"
        // height="500"
        // scrolling="yes"
        // /frameborder="no"
        // allow="autoplay"
        src={tool.toolLink}
        frameBorder="0"
      ></iframe>
      {/* </div> */}
      {/* </Scrollbars> */}
    </>
  );
};

export default ToolDemo;
