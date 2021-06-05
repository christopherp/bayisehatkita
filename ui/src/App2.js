import React from 'react';
import { AppBar, Container, Toolbar,  TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {opsiSanitasi, opsiJenisKelamin, opsiStatusBekerjaIbu, opsiPendidikanIbu, opsiTempatTinggal, opsiQuintileEkonomi} from './opsi'


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
        quintileEkonomi: ''
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
        quintileEkonomi: false
      },
      result: ""
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
      fetch('http://127.0.0.1:5000/prediction/', 
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
        result: "Data tidak lengkap"
      });
    }
  }
  
  render(){
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    const { classes } = this.props;
    return (      
      <Container>
        <AppBar position="static"  style={{ background: '#2E3B55' }}>
          <Toolbar>            
            <h1>Stunting Prediction App</h1>
          </Toolbar>
        </AppBar>          
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <h2>Data Antropometri</h2>
              
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
            </div>

            <div>
            <h2>Data Faktor Determinan</h2>
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
            </div>

            <div>
            <TextField            
                error = {this.state.error.pendidikanIbu}
                helperText = {this.state.error.pendidikanIbu ? "Tidak boleh kosong" : ""} 
                name="pendidikanIbu"
                select
                label="Pendidikan Ibu"
                value={formData.pendidikanIbu}
                onChange={this.handleChange}
                variant="outlined"
              >
                {opsiPendidikanIbu.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
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
            </div>
            <div>
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

            <TextField
              error = {this.state.error.quintileEkonomi}
              helperText = {this.state.error.quintileEkonomi ? "Tidak boleh kosong" : "Total pendapatan rumah tangga 12 bulan terakhir"} 
              name="quintileEkonomi"
              select
              label="Status Ekonomi"
              value={formData.quintileEkonomi}
              onChange={this.handleChange}
              variant="outlined"              
            >
              {opsiQuintileEkonomi.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            </div>
            <div>
            <Button 
              variant="outlined" 
              size="large" 
              color="primary"
              disabled={isLoading}
              onClick={!isLoading ? this.handlePredictClick : null}
              >{ isLoading ? 'Making prediction' : 'Predict' }
            </Button>
            </div>
          </form>

          {result === "" ? null :
            (<h5 id="result">{result}</h5>)
          }
      </Container>
    );
  }
}

export default withStyles(useStyles)(App)
