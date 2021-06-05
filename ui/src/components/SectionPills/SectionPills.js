import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import TimelineIcon from '@material-ui/icons/Timeline';

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import NavPills from "../NavPills/NavPills.js";

import FormInput from '../FormInput/FormInput'
import FormInputPahmi from '../FormInput/FormInputPahmi'

import styles from "./pillsStyle";

const useStyles = makeStyles(styles);

export default function SectionPills() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <NavPills
              color="rose"
              horizontal={{
                tabsGrid: { xs: 10, sm: 10, md: 2, lg: 2 },
                contentGrid: { xs: 12, sm: 12, md: 10, lg: 10}
              }}
              tabs={[
                {
                  tabButton: "Probabilitas Risiko",
                  tabIcon: Dashboard,
                  tabContent: (
                    <FormInput/>
                  )
                },
                {
                  tabButton: "Prediksi Pertumbuhan",
                  tabIcon: TimelineIcon,
                  tabContent: (
                    <FormInputPahmi/>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
