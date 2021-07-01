import { container } from "../custom-container";

const homeStyles = theme => ({  
    container,
    mainContainer: {
      padding: "10% 0",
    },
    title: {
      fontSize: "3.2rem",
      maxWidth: "800px",
      fontWeight: "600",
      display: "inline-block",
      position: "relative",
      "@media (min-width: 576px)": {
        fontSize: "4.2rem",
      },
    },
    subtitle: {
      fontSize: "1.2rem",
      maxWidth: "900px",
      margin: "5px 0 0",
      fontWeight: 300,
      color: "#676767"
    },
    buttonWrapper: {
      marginTop: "30px",
    },
    linktext: {      
      color: "white",
      textDecoration: "none",
    },
    button:{
      fontSize: "20px",
      textTransform: "none",
      padding: "20px",
      minWidth: "300px",
      fontWeight: "bold",
    }
});

export default homeStyles;