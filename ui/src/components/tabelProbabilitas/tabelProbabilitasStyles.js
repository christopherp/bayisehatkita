import { container } from "../custom-container";

const tabelProbabilitasStyles = theme => ({  
    tableHeadFont: {
      fontWeight: "800",
    },
    keterangan: {
        fontSize: "16px",
        margin: "15px 0 0",
        fontWeight: "300",
        color: "#676767",
        maxWidth: "900px",        
    },
    innerContainer: {
        maxWidth: "fit-content",
        marginBottom : "40px"
      },
    activeGreen:{
        background: "palegreen"
    },
    activeRed: {
        background: "lightpink"
    }
});

export default tabelProbabilitasStyles;