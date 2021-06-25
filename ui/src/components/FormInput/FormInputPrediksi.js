import React, { useEffect, useState, } from "react";
//Material UI Components
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "../CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';

import './FormInput.css';
import Result from '../Result/Result.component';
import FormBulan from './FormBulan';

import { Card, Row, Col, Form, Spinner } from 'react-bootstrap';
import FormInputComponents from './FormInputComponents';
import ResultComponent  from './ResultComponent';
import swal from 'sweetalert';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './bootstrap.min.css';

const useStyles = theme => ({
  palette: {
    primary: "lime",
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
      flexGrow: 1,
    },
  },
  result: {
    marginTop: "40px"
  }
});

class FormInput extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      formData: {
        jenisKelamin: 'laki-laki',
        rangeBulan: 24,
        umur: ''
      }, 
      images: ""
    };
  }

  

  handleChange = (event) => {
    const value = event.target.value;    
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
    console.log(formData);
  }

  handleSubmit = () => {
    const formData = this.state.formData;    
    this.setState({ loading: false });
    this.setState({ images: null });

    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null,
    };

    // Check Range Months
    let listMonth = Object.keys(formData)
      .filter(name =>
        name.includes("-"))
      .map(name => 
        parseInt(name.split("-")[1])
    )
    let maxMonth = Math.max(...listMonth)
    if (this.state.formData.umur == '' && !(this.state.formData.umur > maxMonth && this.state.formData.umur < this.state.formData.rangeBulan)) {
      return swal(
        {
          icon: "warning",
          text:`Range umur harus > ${maxMonth} & < ${this.state.formData.rangeBulan} bulan`,
      });
    }

    // Send data api to backend server
    requestOptions['body'] = JSON.stringify(formData)
    fetch(
      `https://bayisehatkita.herokuapp.com/api/data`,
      // `http://localhost:5000/api/data`,
      requestOptions
    ).then(res => res.json())
    .then(result => 
      this.setState({
        images: result.data
      })
    ).catch(err => 
      console.log(err)
    );
    this.setState({ loading: false });
  }


  render(){
    const formData = this.state.formData;
    const { classes } = this.props;
    return (
    <div className="container">
      <Container maxWidth="md">
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <h2>Pengukuran Stunting</h2>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      name="jenisKelamin"
                      select
                      label="Jenis Kelamin"
                      value={formData.jenisKelamin}
                      onChange={this.handleChange}
                      variant="outlined"
                  >
                    <MenuItem key="laki-laki" value="laki-laki">
                      Laki-laki
                    </MenuItem>
                    <MenuItem key="perempuan" value="perempuan">
                    Perempuan
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="rangeBulan"
                    select
                    label="Rentang Umur"
                    value={formData.rangeBulan}
                    onChange={this.handleChange}
                    variant="outlined"                    
                  >
                    <MenuItem key={'24'} value={'24'}>
                      0-24 Bulan
                    </MenuItem>
                    <MenuItem key={'60'} value={'60'}>
                      24-60 Bulan
                    </MenuItem>
                  </TextField>
                </Grid>

                <h3>Tinggi Badan</h3>        
                <FormBulan rangeAge = {this.state.formData.rangeBulan} tipe = {'tinggi'} onChange={this.handleChange}></FormBulan>

                <h3>Berat Badan</h3>        
                <FormBulan rangeAge = {this.state.formData.rangeBulan} tipe = {'berat'} onChange={this.handleChange}></FormBulan>     

                

                <Grid item xs={12} sm={6}>
                <h3>Masukan Umur yang akan diprediksi</h3>
                  <TextField
                    name="umur"
                    label="Umur"
                    value={formData.umur}
                    onChange={this.handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">Bulan</InputAdornment>,
                    }}
                  >
                    
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Box marginLeft="20px">
                    <Button
                      type="button"
                      variant="outlined" 
                      size="lg" 
                      color="rose"
                      round
                      style={{ minWidth : "150px" }}
                      disabled={this.state.loading}
                      onClick={!this.state.loading ? this.handleSubmit : null}
                      >{ this.state.loading ? 'Melakukan Prediksi' : 'Lihat Hasil' }
                    </Button>
                  </Box>
                </Grid>
              </Grid>           
            </div>
        </form>
        <div className={classes.result}>
          <ResultComponent props={this.state.images}/>                               
        </div>                        
      </Container>
    </div>
    );
  }
}


export default withStyles(useStyles)(FormInput)