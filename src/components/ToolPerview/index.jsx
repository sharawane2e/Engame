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
