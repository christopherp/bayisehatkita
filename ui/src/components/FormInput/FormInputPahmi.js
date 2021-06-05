import React, { useState } from 'react';
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
//Opsi Input
import {
  opsiSanitasi, 
  opsiJenisKelamin, 
  opsiStatusBekerjaIbu, 
  opsiPendidikanIbu, 
  opsiTempatTinggal,
  opsiQuintileEkonomi}
  from '../../opsi'

import './FormInput.css';
import Result from '../Result/Result.component';
import FormBulan from './FormBulan';

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
});

const opsiRentangUmur = [
  {
    value: '024',
    label: '0-24 Bulan',
  },
  {
    value: '2560',
    label: '25-60 Bulan',
  },
];

class FormInput extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        isLoading: false,
        formData: {     
          nama: '',
          jenisKelamin: '1',          
          tanggalLahir: new Date(),
          rentangUmur: '024'
        }, 
        
        error: {
          nama: false,
          jenisKelamin: false,          
          tanggalLahir: false,
          rentangUmur: false
        },
        
        result: ""
      };
    }
    handleDateChange= (date) => {
      this.setState(prevState => ({
        formData:{
          ...prevState.formData,
          tanggalLahir: date
        }
      }));
    };

    handleChange = (event) => {
      const value = event.target.value;    
      const name = event.target.name;
      var formData = this.state.formData;
      var error = this.state.error;
      formData[name] = value;
      if(value == ""){
        error[name] = true;
      } else{
        error[name] = false;
      }
      this.setState({
        formData,
        error
      });
      console.log(formData);
    }

    validate = (data) =>{          
      var error = this.state.error;
      for (const key of Object.keys(data)) {
        if(data[key] == ""){
          error[key] = true;
        }
      }
      this.setState({      
        error
      });
      for(var key in data) {
        if(data[key] === "") {                     
          return false;
        }
      }        
      return true;
    }
  
    handlePredictClick = (event) => {
      const formData = this.state.formData;    
      this.setState({ isLoading: false });
      console.log(this.state.error);
      
      if(this.validate(formData)){
        fetch('http://127.0.0.1:5000/prediksi-pertumbuhan/', 
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(response => {
            this.setState({
              result: response.result,
              isLoading: false
            });
          });  
      } else{
        this.setState({
          result: "Cek Kelengkapan Data"
        });
      }
    }
    
    render(){
      const isLoading = this.state.isLoading;
      const formData = this.state.formData;
      const result = this.state.result;
      const { classes } = this.props;
      return (
        <div className="container">
          <Container maxWidth="md">
              <form className={classes.root} noValidate autoComplete="off">
                <div>
                  <h2>Pengukuran Stunting</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                          error = {this.state.error.nama}
                          helperText = {this.state.error.nama ? "Tidak boleh kosong" : ""}
                          label="Nama"
                          name="nama"
                          onChange={this.handleChange}                    
                          variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                          error = {this.state.error.jenisKelamin}
                          helperText = {this.state.error.jenisKelamin ? "Tidak boleh kosong" : ""}
                          name="jenisKelamin"
                          select
                          label="Jenis Kelamin"
                          value={formData.jenisKelamin}
                          onChange={this.handleChange}
                          variant="outlined"
                      >
                          {opsiJenisKelamin.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                             <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Tanggal Lahir"
                                format="MM/dd/yyyy"
                                value={this.state.formData.tanggalLahir}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                          </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    
                    <Grid item xs={6} sm={6}>
                        <TextField
                          error = {this.state.error.jenisKelamin}
                          helperText = {this.state.error.jenisKelamin ? "Tidak boleh kosong" : ""}
                          name="rentangUmur"
                          select
                          label="Rentang Umur"
                          value={formData.rentangUmur}
                          onChange={this.handleChange}
                          variant="outlined"
                        >
                          {opsiRentangUmur.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                    </Grid>     
                  
                    <FormBulan rentangUmur = {this.state.formData.rentangUmur}></FormBulan>
                             
                    <Grid item xs={12} sm={12} md={6}>    
                    <p>Masukkan Umur Yang akan Diprediksikan</p>                   
                      <TextField
                          label="Umur"
                          name="UmurTarget"
                          type="number"
                          InputLabelProps={{
                              shrink: true,                          
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end">bulan</InputAdornment>,
                          }}
                          variant="outlined"
                      />
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
                          disabled={isLoading}
                          onClick={!isLoading ? this.handlePredictClick : null}
                          >{ isLoading ? 'Making prediction' : 'Predict' }
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>                   
                </div>
              </form>
              
            <Result res={this.state.result}></Result>
          </Container>
        </div>
      );
    }
  }
  

  export default withStyles(useStyles)(FormInput)