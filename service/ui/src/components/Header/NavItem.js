import React, {PropTypes} from 'react';
import { Route, NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button.js";
import styles from "./navItemStyles.js";

const useStyles = makeStyles(styles);

export default function NavItem({children, to, exact}) {
    const classes = useStyles();
    return (
        <Route path={to} exact={exact} children={({match}) => (
            <NavLink to={to} className={match ? classes.linktextActive : classes.linktext}>
                <Button          
                    color={match ? "rose" : "transparent"}
                    target="_blank"
                    className={match ? classes.activeNavLink : classes.navLink}
                    round
                >
                    {children}
                </Button>
            </NavLink>
            
        )}/>
    )
}
