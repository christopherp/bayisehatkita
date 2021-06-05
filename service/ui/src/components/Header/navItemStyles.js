const navItemStyles = theme => ({  
      linktext: {
        fontSize: "12px",
        color: "black",
        textDecoration: "none",
      },
      linktextActive: {
        fontSize: "12px",
        color: "white",
        textDecoration: "none",
      },
      navLink: {
        top: "3px",
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        color: "black",
        "&:hover": {
          color: "black",
          background: "rgb(90 90 90 / 18%)",
        },
      },
      activeNavLink: {
        top: "3px",
        position: "relative",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        color: "white",
      },
});

export default navItemStyles;