import { React } from "react";

const ToolDemo = (props) => {
  const { tool} = props;
  return (
    <>
 {tool.name}
      <iframe
        width="100%"
        height="650"
        scrolling="yes"
        frameborder="no"
        allow="autoplay"
        src={tool.toolLink}
      ></iframe>
    </>
  );
};

export default ToolDemo;
