import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import styles from "./homeStyles.js";
import Button from "../CustomButtons/Button.js";
import { Route, Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function Home(){
    const classes = useStyles();
    return(
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <h1 className={classes.title}>Aplikasi Prediksi Risiko Stunting.</h1>
                <h3 className={classes.subtitle}>
                    Aplikasi untuk memprediksi risiko seorang anak balita akan mengalami stunting berdasarkan
                    faktor-faktor determinan stunting.
                    Aplikasi ini juga dapat mendeteksi apakah seorang anak sudah termasuk stunting berdasarkan
                    standar yang ditetapkan oleh Kemenkes.
                    Aplikasi ini dibuat menggunakan model pembelajaran probabilitas dengan algoritma Naive Bayes
                    berdasarkan data 3707 anak dari Indonesian Family Life Survey 2014.
                    </h3>
                <div className={classes.buttonWrapper}>
                    <Link to='/risk-pred' className={classes.linktext}>
                        <Button 
                            type="button" 
                            color="rose" 
                            className={classes.button}
                            size="lg"
                        >
                            Mulai Menghitung
                        </Button>
                    </Link>    
                </div>                
            </div>            
        </div>
    );
}