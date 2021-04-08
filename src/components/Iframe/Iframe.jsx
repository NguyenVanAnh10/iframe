import React, { useState } from "react";
import { createPortal } from "react-dom";

const Iframe = ({ children, initContent, title, style, ...rest }) => {
  const [iframeRef, setIframeRef] = useState(null);
  const doc = iframeRef?.contentWindow?.document;

  const mountNode = doc?.body;

  return (
    <iframe
      title={title}
      ref={(node) => setIframeRef(node)}
      style={{ border: 0, width: 110, height: 70, ...style }}
      {...rest}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default Iframe;
