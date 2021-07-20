import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import styles from "./infoStyles.js";
import TabelProbabilitas from './tabelProbabilitas';

const useStyles = makeStyles(styles);
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function Info(){
    const classes = useStyles();
    
    return(
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <h2 className={classes.title}>Apa itu Stunting.</h2>
                    <p className={classes.subtitle}>
                    Gizi buruk merupakan masalah kesehatan yang masih banyak terjadi pada anak bawah lima tahun (balita) 
                    di dunia. Salah satu akibat dari gizi buruk pada balita adalah stunting. 
                    Stunting (kerdil) adalah kondisi di mana balita memiliki panjang atau tinggi badan yang kurang 
                    jika dibandingkan dengan umur. Stunting diasosiasikan dengan meningkatnya morbiditas dan mortalitas 
                    serta hilangnya potensi pertumbuhan fisik.  
                    Stunting juga memiliki efek jangka panjang kepada perkembangan kognitif, prestasi sekolah, produktivitas 
                    ekonomi saat dewasa, meningkatnya risiko penyakit kronis dan kesehatan reproduksi ibu. 
                    Oleh karenanya stunting merupakan masalah yang masih menjadi perhatian di berbagai negara.
                    </p>    
                </div>
                <div className={classes.innerContainer}>
                    <h2 className={classes.title}>Tentang Kalkulator Probabilitas Risiko Stunting.</h2>
                    <div className={classes.subtitle}>
                        <p className={classes.subtitle}>
                        Aplikasi untuk memprediksi risiko seorang anak balita akan mengalami stunting berdasarkan
                        faktor-faktor determinan stunting.
                        Aplikasi ini dibuat menggunakan model pembelajaran probabilitas dengan algoritma Naive Bayes
                        berdasarkan data 3705 anak dan orang tua dataset Indonesian Family Life Survey 2014.                        
                        </p>
                        <p>
                        Faktor-faktor determinan yang digunakan untuk memprediksi probabilitas risiko stunting didapatkan
                        dari beberapa sumber penelitian yang menganalisis faktor yang mempengerahui stunting pada anak di Indonesia.
                        Beberapa penelitian tersebut yaitu:
                        </p>
                        <ul>
                            <li>
                            C. Dewanti, V. Ratnasari dan A. T. Rumiati, “Pemodelan Faktor-faktor yang Memengaruhi Status Balita Stunting di Provinsi Jawa Timur Menggunakan Regresi Probit Biner,” JURNAL SAINS DAN SENI ITS, vol. 8, no. 2, pp. 2337-3520, 2019. 
                            </li>
                            <li>
                            D. Indrastuty dan Pujiyanto, “Determinan Sosial Ekonomi Rumah Tangga dari Balita Stunting di Indonesia: Analisis Data Indonesia Family Life Survey (IFLS) 2014,” Jurnal Ekonomi Kesehatan Indonesia, vol. 3, no. 2, pp. 68-75, 2018.     
                            </li>
                            <li>
                            L. Hanifah, R. Wulansari, R. Meiandayati dan E. L. Achadi, “Stunting trends and associated factors among Indonesian children aged 0-23 months: Evidence from Indonesian Family Life Surveys (IFLS) 2000, 2007 and 2014,” Malaysian Journal of Nutrition , vol. 24, no. 3, pp. 315-322, 2018. 
                            </li>
                        </ul>
                        <p>
                        Kemudian faktor yang didapatkan dari penelitian diatas diuji kembali menggunakan data IFLS 2014 untuk mengetahui
                        signifikansi hubungan masing-masing faktor terhadap kejadian stunting. Uji korelasi dilakukan dengan metode Chi Square
                        dengan batas p-value &lt; 0.05. Faktor yang tidak menunjukkan korelasi signifikan tidak diikut sertakan dalam pembuatan model prediksi aplikasi ini.
                        </p>
                    </div>    
                </div>
                <div className={classes.innerContainer} id="probabilitas">
                    <h2 className={classes.title}>Tentang Probabilitas Faktor Determinan Risiko Stunting</h2>
                    <p className={classes.subtitle}>
                    Probabilitas pengaruh dari setiap faktor determinan terhadap kejadian stunting ditampilkan pada tabel dibawah ini.
                    Probabilitas tersebut merupakan probabilitas posterior yaitu probabilitas anak tergolong stunting apabila diketahui faktor determinannya.
                    Probabilitas posterior setiap atribut yang ditampilkan di bawah ini didapatkan dari hasil perhitungan menggunakan rumus teorema Bayes
                    pada data IFLS 2014.
                    </p>
                    <TabelProbabilitas></TabelProbabilitas>
                    <p className={classes.subtitle}>
                    Melalui tabel tersebut dapat diketahui faktor determinan manakah yang memiliki pengaruh terhadap nilai probabilitas risiko
                    anak diprediksi stunting. Misal pada kategori faktor determinan tinggi ibu, diketahui bahwa ibu dengan tinggi kategori 'rendah' memiliki
                    kemungkinan anak stunting lebih tinggi dibanding ibu dengan tinggi kategori 'sedang' atau 'tinggi' (50.08 % &gt; 32.86 % &gt; 19.08 %).
                    </p>                  
                </div>    
            </div>                    
        </div>
    );
}