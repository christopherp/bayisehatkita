/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import NavItem from "./NavItem";

import styles from "./headerLinksStyle.js";

class HeaderLinks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activePage: false,
    };
  }

  
  render(){
    const { classes } = this.props;
    
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavItem to='/' exact={true} >Home</NavItem>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavItem to='/risk-pred' exact={true}>Kalkulator Stunting</NavItem>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavItem to='/info' exact={true}>Info</NavItem>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(HeaderLinks);
