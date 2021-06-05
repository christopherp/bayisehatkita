import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import styles from "./infoStyles.js";
import Button from "../CustomButtons/Button.js";
import { Route, Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function Home(){
    const classes = useStyles();
    return(
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <h2 className={classes.title}>Apa itu Stunting.</h2>
                    <h3 className={classes.subtitle}>
                    Gizi buruk merupakan masalah kesehatan yang masih banyak terjadi pada anak bawah lima tahun (balita) 
                    di dunia. Salah satu akibat dari gizi buruk pada balita adalah stunting. 
                    Stunting (kerdil) adalah kondisi di mana balita memiliki panjang atau tinggi badan yang kurang 
                    jika dibandingkan dengan umur. Stunting diasosiasikan dengan meningkatnya morbiditas dan mortalitas 
                    serta hilangnya potensi pertumbuhan fisik.  
                    Stunting juga memiliki efek jangka panjang kepada perkembangan kognitif, prestasi sekolah, produktivitas 
                    ekonomi saat dewasa, meningkatnya risiko penyakit kronis dan kesehatan reproduksi ibu. 
                    Oleh karenanya stunting merupakan masalah yang masih menjadi perhatian di berbagai negara.
                    </h3>    
                </div>
                <div className={classes.innerContainer}>
                    <h2 className={classes.title}>Tentang Aplikasi Prediksi Risiko Stunting.</h2>
                    <h3 className={classes.subtitle}>
                        Aplikasi untuk memprediksi risiko seorang anak balita akan mengalami stunting berdasarkan
                        faktor-faktor determinan stunting.
                        Aplikasi ini juga dapat mendeteksi apakah seorang anak sudah termasuk stunting berdasarkan
                        standar yang ditetapkan oleh Kemenkes.
                        Aplikasi ini dibuat menggunakan model pembelajaran probabilitas dengan algoritma Naive Bayes
                        berdasarkan data 3707 anak dan orang tua dataset Indonesian Family Life Survey 2014.
                    </h3>    
                </div>    
            </div>                    
        </div>
    );
}