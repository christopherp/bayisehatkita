import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import HeaderLinks from "./components/Header/HeaderLinks.js";
import Main from  './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
// activewindow
    };
  }
  
  render(){
    return (
      <Router>
        <div style={{minHeight:"100vh",display: "flex", flexDirection: "column"}}>    
          <Header
              brand="BayiSehatKita"
              rightLinks={<HeaderLinks />}
              fixed
              color="white"
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
          />

          <div style={{height:"100px"}}></div>

          <Main />
          <Footer />
          </div>
      </Router>
    );
  }
}

export default withStyles(useStyles)(App)
