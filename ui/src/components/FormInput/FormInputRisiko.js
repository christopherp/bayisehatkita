import React from 'react';
//Material UI Components
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "../CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TimelineIcon from '@material-ui/icons/Timeline';
import { withStyles } from '@material-ui/core/styles';
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
import ToolTip from '../ToolTip/ToolTip';
import Disclaimer from '../Disclaimer/Disclaimer';


const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
      flexGrow: 1,
    },
  },
});


class FormInput extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false,
        formData: {
          usia: '',
          tinggiAnak: '',
          jenisKelamin: '',
          tinggiBapak: '',
          tinggiIbu: '',
          statusBekerjaIbu: '',
          pendidikanIbu: '',
          tempatTinggal: '',
          beratLahir: '',
          sanitasi: '',
          quintileEkonomi: '',
          beratIbu:''
        }, 
        
        error: {
          usia: false,
          tinggiAnak: false,
          jenisKelamin: false,
          tinggiBapak: false,
          tinggiIbu: false,
          statusBekerjaIbu: false,
          pendidikanIbu: false,
          tempatTinggal: false,
          beratLahir: false,
          sanitasi: false,
          quintileEkonomi: false,
          beratIbu: false
        },        
        result: "",
        resultText: "",
        persentase: ""
      };
    }
  
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
        fetch(
          'https://bayisehatkita.herokuapp.com/hitung-risiko',
          // 'http://localhost:5000/hitung-risiko',
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
              resultText: response.text,
              persentase: response.persentase,
              isLoading: false
            });
          });  
      } else{
        this.setState({
          resultText: "Cek Kelengkapan Data"
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
                  <h2>Data Antropometri</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                          error = {this.state.error.usia}
                          helperText = {this.state.error.usia ? "Tidak boleh kosong" : ""}
                          label="Usia"
                          name="usia"
                          type="number"
                          onChange={this.handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Bulan</InputAdornment>,
                          }}
                          variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                          error = {this.state.error.tinggiAnak}
                          helperText = {this.state.error.tinggiAnak ? "Tidak boleh kosong" : ""}
                          label="Tinggi"
                          name="tinggiAnak"
                          type="number"
                          onChange={this.handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                          }}
                          variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
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
                  </Grid>             
                </div>
    
                <div>
                  <h2>Data Faktor Determinan</h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        error = {this.state.error.tinggiBapak}
                        helperText = {this.state.error.tinggiBapak ? "Tidak boleh kosong" : ""}
                        label="Tinggi Bapak"
                        name="tinggiBapak"
                        type="number"
                        onChange={this.handleChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        error = {this.state.error.tinggiIbu}
                        helperText = {this.state.error.tinggiIbu ? "Tidak boleh kosong" : ""}
                        label="Tinggi Ibu"
                        name="tinggiIbu"
                        type="number"
                        onChange={this.handleChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                        variant="outlined"
                      />
                    </Grid>

                    
                    <Grid item xs={12} sm={4} md={4}>
                      <TextField
                        error = {this.state.error.beratIbu}
                        helperText = {this.state.error.beratIbu ? "Tidak boleh kosong" : ""}
                        label="Berat Badan Ibu"
                        name="beratIbu"
                        type="number"
                        onChange={this.handleChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        }}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        error = {this.state.error.pendidikanIbu}
                        helperText = {this.state.error.pendidikanIbu ? "Tidak boleh kosong" : ""}
                        name="pendidikanIbu"
                        select
                        label="Pendidikan Ibu"
                        value={formData.pendidikanIbu}
                        onChange={this.handleChange}
                        variant="outlined"
                        style = {{width: '100%'}}

                      > 
                        {opsiPendidikanIbu.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                      <TextField
                        error = {this.state.error.tempatTinggal}
                        helperText = {this.state.error.tempatTinggal ? "Tidak boleh kosong" : ""}
                        name="tempatTinggal"
                        select
                        label="Tempat Tinggal"
                        value={formData.tempatTinggal}
                        onChange={this.handleChange}
                        variant="outlined"
                      >
                        {opsiTempatTinggal.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                      <TextField
                        error = {this.state.error.sanitasi}
                        helperText = {this.state.error.sanitasi ? "Tidak boleh kosong" : ""}
                        name="sanitasi"
                        select
                        label="Sanitasi"
                        value={formData.sanitasi}
                        onChange={this.handleChange}
                        variant="outlined"
                      >
                        {opsiSanitasi.map((option) => (
                          <MenuItem key={option.label} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                      <TextField
                        error = {this.state.error.beratLahir}
                        helperText = {this.state.error.beratLahir ? "Tidak boleh kosong" : ""}
                        label="Berat Lahir Anak"
                        name="beratLahir"
                        type="number"
                        onChange={this.handleChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        }}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                      <TextField
                        error = {this.state.error.statusBekerjaIbu}
                        helperText = {this.state.error.statusBekerjaIbu ? "Tidak boleh kosong" : ""}
                        name="statusBekerjaIbu"
                        select
                        label="Status Bekerja Ibu"
                        value={formData.statusBekerjaIbu}
                        onChange={this.handleChange}
                        variant="outlined"
                      >
                        {opsiStatusBekerjaIbu.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    
                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        error = {this.state.error.quintileEkonomi}
                        helperText = {this.state.error.quintileEkonomi ? "Tidak boleh kosong" : ""}
                        name="quintileEkonomi"
                        select
                        label="Status Ekonomi"
                        value={formData.quintileEkonomi}
                        onChange={this.handleChange}
                        variant="outlined"
                        helperText="Total pendapatan rumah tangga 12 bulan terakhir"
                      >
                        {opsiQuintileEkonomi.map((option) => (
                          <MenuItem key={option.label} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
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
                    
                  </Grid>
                </div>
              </form>
            
            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Result res={this.state.resultText}></Result>
              </Grid>

              {this.state.result != "" ?       
                (
                  <Grid item sm={12}>
                    <Grid container container spacing={2}>
                      <Grid item>
                        <ToolTip result={this.state.result} persentase={this.state.persentase}></ToolTip>
                      </Grid>
                      <Grid item>
                        <Button
                          type="button"
                          variant="outlined" 
                          size="" 
                          color="primary"
                          round
                          style={{ minWidth : "150px" }}
                          onClick={() => this.props.changeTab(1)}
                          >{ <span>Hitung Prediksi Pertumbuhan Anak <TimelineIcon></TimelineIcon></span> }
                        </Button>
                      </Grid>               
                    </Grid>
                  </Grid>                       
                )                       
              : null}

              <Grid item xs={12} sm={12}>
                <Disclaimer></Disclaimer>
              </Grid>

            </Grid>  
              
          </Container>
        </div>
      );
    }
  }
  

  export default withStyles(useStyles)(FormInput)