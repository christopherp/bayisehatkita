import { container, title } from "../material-kit-react.js";

import modalStyle from "./modalStyle";


const javascriptStyles = {
  section: {
    padding: "70px 0 0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  icon: {
    width: "17px",
    height: "17px",
    marginRight: "4px"
  },
  ...modalStyle,
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0",
    letterSpacing: "normal"
  },
  text: {
    color: "#464646",
    fontSize: "15px",
    textTransform : "none",
    paddingTop: 0
  },
  modalContent: {
    fontSize: "1.2rem",
    margin: "5px 0 0",
    fontWeight: "300",
    lineHeight: "1.6",
    color: "#676767"
  }
};

export default javascriptStyles;
