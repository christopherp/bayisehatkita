import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from "./footerStyles.js";
const useStyles = makeStyles(styles);

export default function Home(){
    const classes = useStyles();
    return(
        <footer className={classes.footer}>
            <Container className={classes.mainContainer}>
                <p>Aplikasi ini dibuat oleh Tim Laboratorium Rekayasa Data dan Intelegensi Bisnis (RDIB) Sistem Informasi ITS</p>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                        <h3>Creator: </h3>
                        <p>Abraham Christopher Pujiantoro</p>
                        <p>A Pahmi</p>
                        <p>Bima Triadi Ruslan</p>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <h3>Supervisor: </h3>
                        <p>Retno Aulia Vinarti, S.Kom, M.Kom</p>
                        <p>Faisal Mahananto, S.Kom, M.Eng, Ph.D</p>
                        <p>Prof. Ir. Arif Djunaidy, M.Sc, Ph.D</p>
                        <p>Ahmad Muklason, S.Kom., M.Sc., Ph.D.</p>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <h3>Human Expert: </h3>
                        <p>dr. Deanty Ayu Putri A., Sp.A</p>
                        <p>Rizki Amalia., SST., MPH</p>
                    </Grid>
                </Grid>
            </Container>
        </footer>        
    );
}