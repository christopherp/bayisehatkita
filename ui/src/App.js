import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
        tinggi: '',
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
      result: ""
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
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
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
  }
  
  render(){
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    const { classes } = this.props;
    return (
      <Container>
          <h1>Stunting Prediction App</h1>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <h2>Data Antropometri</h2>
              <TextField
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
