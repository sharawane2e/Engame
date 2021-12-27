import { React } from "react";

const ToolDemo = (props) => {
  const { tool } = props;

  return (
    <>
      <div className="curent-tool-name custom-scroll">{tool.name}</div>
      <iframe
        className="tool-perview"
        width="100%"
        height="500"
        scrolling="yes"
        // /frameborder="no"
        allow="autoplay"
        src={tool.toolLink}
        frameBorder="0"
      ></iframe>
    </>
  );
};

export default ToolDemo;
