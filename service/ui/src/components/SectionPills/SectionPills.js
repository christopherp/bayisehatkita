import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import NavPills from "../NavPills/NavPills.js";

import FormInput from '../FormInput/FormInput'

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
                tabsGrid: { xs: 12, sm: 12, md: 2, lg: 2 },
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
                  tabButton: "Schedule",
                  tabIcon: Schedule,
                  tabContent: (
                    <span>
                      <p>
                        Efficiently unleash cross-media information without
                        cross-media value. Quickly maximize timely
                        deliverables for real-time schemas.
                      </p>
                      <br />
                      <p>
                        Dramatically maintain clicks-and-mortar solutions
                        without functional solutions. Dramatically visualize
                        customer directed convergence without revolutionary
                        ROI. Collaboratively administrate empowered markets
                        via plug-and-play networks. Dynamically procrastinate
                        B2C users after installed base benefits.
                      </p>
                    </span>
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
