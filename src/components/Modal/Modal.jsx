import Iframe from "components/Iframe";

const Modal = ({ children, open, onClose, title }) => {
  if (!open) return null;
  return (
    <Iframe style={styleIframe}>
      <div
        style={{
          backgroundColor: "#fff",
          width: "50%",
          maxWidth: 500,
          margin: "10% auto",
          padding: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            paddingBottom: 10,
            borderBottom: "1px solid gray",
          }}
        >
          <h1 style={{ margin: 0 }}>{title}</h1>
          <button onClick={onClose}>x</button>
        </div>
        <div>{children}</div>
      </div>
    </Iframe>
  );
};

const styleIframe = {
  height: "100vh",
  width: "100vw",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 999,
  overflow: "hidden",
  border: "none",
  backgroundColor: " rgba(0, 0, 0, 0.5)",
};

export default Modal;
