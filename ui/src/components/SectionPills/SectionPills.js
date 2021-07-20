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

import FormInputRisiko from '../FormInput/FormInputRisiko'
import FormInputPrediksi from '../FormInput/FormInputPrediksi'

import styles from "./pillsStyle";

import { withStyles } from '@material-ui/core/styles';

class SectionPills extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  handleChange = (event, active) => {
    this.setState({ active: active });
  };
  handleChangeIndex = (index) => {
    this.setState({ active: index });
  };

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div id="navigation-pills">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <NavPills
                color="rose"
                active= {this.state.active}
                onChange = {() => this.handleChange}
                onChangeIndex = {() => this.handleChangeIndex}
                horizontal={{
                  tabsGrid: { xs: 10, sm: 10, md: 2, lg: 2 },
                  contentGrid: { xs: 12, sm: 12, md: 10, lg: 10}
                }}
                tabs={[
                  {
                    tabButton: "Status dan Probabilitas Risiko",
                    tabIcon: Dashboard,
                    tabContent: (
                      <FormInputRisiko/>
                    )
                  },
                  {
                    tabButton: "Prediksi Pertumbuhan",
                    tabIcon: TimelineIcon,
                    tabContent: (
                      <FormInputPrediksi/>
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
  
}

export default withStyles(styles)(SectionPills)