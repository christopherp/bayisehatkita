import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    color: "#00acc1"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  line: {
    width: "100%",
    background: "#00acc1",
    height: "5px",
    margin: "20px 0px"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Disclaimer() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <CardContent className={classes.root}>
        <Typography variant="h4" component="h2">
          Medical Disclaimer
        </Typography>
        <div className={classes.line}></div>
        <Typography variant="body2" component="p">
        DISCLAIMER: Aplikasi Ini Tidak Memberikan Diagnosis Medis
        <br></br>
        Semua informasi yang diberikan oleh aplikasi ini semata-mata ditujukan untuk keperluan edukasi dan informasional saja.
        Hasil prediksi yang dihasilkan oleh aplikasi ini bukanlah diagnosis medis melainkan hanya informasi edukasi saja.
        Selalu berkonsultasilah dengan dokter atau penyedia layanan medis professional untuk pemeriksaan, diagnosis, dan saran perawatan yang lebih tepat.
        </Typography>
      </CardContent>
  );
}