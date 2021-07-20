import { container } from "../custom-container";

const homeStyles = theme => ({  
    container,
    footer: {
      marginTop: "auto",
      marginBottom : "5%",
      color:"#555",
      border:"0",
      boxShadow:"0 -4px 18px 0px rgb(0 0 0 / 12%), 0 -7px 10px -5px rgb(0 0 0 / 15%)",
      marginBottom:"20px",
      backgroundColor:"#fff !important",
      padding: "5% 0"
    },
    mainContainer: {
    },
    innerContainer: {
      marginBottom : "40px"
    },
    title: {
      fontSize: "2.2rem",
      maxWidth: "800px",
      fontWeight: "400",
      display: "inline-block",
      position: "relative"
    },
    subtitle: {
      fontSize: "1.2rem",
      maxWidth: "900px",
      margin: "5px 0 0",
      fontWeight: "300",
      lineHeight: "1.6",
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