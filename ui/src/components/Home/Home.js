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
                <h1 className={classes.title}>BayiSehatKita.</h1>
                <h3 className={classes.subtitle}>
                    BayiSehatKita adalah aplikasi untuk membantu orang tua memantau kondisi pertumbuhan anak mereka.
                    Aplikasi ini dapat memprediksi apakah seorang balita akan mengalami stunting beseta angka risikonya
                    berdasarkan faktor-faktor determinan terkait stunting.
                    Aplikasi ini juga dapat memprediksi pertumbuhan berat dan tinggi anak di masa mendatang.
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