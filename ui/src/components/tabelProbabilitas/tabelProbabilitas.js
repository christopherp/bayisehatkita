import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import styles from "./tabelProbabilitasStyles";

const useStyles = makeStyles(styles);
export default function TabelProbabilitas(props){
    const classes = useStyles();
    const faktorDeterminan =  props.faktorDeterminan ? props.faktorDeterminan : [-1,-1,-1,-1,-1,-1,-1,-1];
    return(
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%" className={classes.tableHeadFont}>Tinggi Ibu</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[1]==2 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Tinggi  (&gt; 157.046 cm)</TableCell>
                            <TableCell width="30%">18.94 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[1]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Sedang  (146.175 — 157.046 cm)</TableCell>
                            <TableCell width="30%">32.86 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[1]==0 ? classes.activeRed : ""}>
                            <TableCell width="70%">Rendah (&lt; 146.175 cm)</TableCell>
                            <TableCell width="30%">50.08 %</TableCell>
                        </TableRow>                                                
                    </TableBody>
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Tinggi Ayah</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[0]==2 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Tinggi  (&gt; 169.475 cm)</TableCell>
                            <TableCell width="30%">19.08 %</TableCell>
                        </TableRow>                        
                        <TableRow className={faktorDeterminan[0]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Sedang  (157.310 — 169.475 cm)</TableCell>
                            <TableCell width="30%">34.24 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[0]==0 ? classes.activeRed : ""}>
                            <TableCell width="70%">Rendah (&lt; 157.310 cm)</TableCell>
                            <TableCell width="30%">46.08 %</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Status Bekerja Ibu</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[2]==0 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Bekerja</TableCell>
                            <TableCell width="30%">31.36 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[2]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Tidak Bekerja</TableCell>
                            <TableCell width="30%">35.45 %</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Pendidikan Ibu *</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[3]==2 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Tinggi</TableCell>
                            <TableCell width="30%">27.27 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[3]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Menengah</TableCell>
                            <TableCell width="30%">29.62 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[3]==0 ? classes.activeRed : ""}>
                            <TableCell width="70%">Dasar</TableCell>
                            <TableCell width="30%">38.86 %</TableCell>
                        </TableRow>                                                
                    </TableBody>
                </Table>
            </TableContainer>    
            </Grid>
            <Grid item xs={12} sm={6}>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Tempat Tinggal</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[4]==0 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Urban</TableCell>
                            <TableCell width="30%">29.46 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[4]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Rural</TableCell>
                            <TableCell width="30%">39.08 %</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Berat Lahir</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[5]==1 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Normal (&gt;= 2.5 kg)</TableCell>
                            <TableCell width="30%">34.24 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[5]==0 ? classes.activeRed : ""}>
                            <TableCell width="70%">BBLR  (&lt; 2.5 kg)</TableCell>
                            <TableCell width="30%">46.08 %</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Sanitasi</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[6]==0 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Baik</TableCell>
                            <TableCell width="30%">32.18 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[6]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Buruk</TableCell>
                            <TableCell width="30%">49.46 %</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                    <TableRow>
                        <TableCell width="70%"  className={classes.tableHeadFont}>Status Ekonomi</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={faktorDeterminan[7]==4 ? classes.activeGreen : ""}>
                            <TableCell width="70%">Kuintil 5</TableCell>
                            <TableCell width="30%">23.43 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[7]==3 ? classes.activeRed : ""}> 
                            <TableCell width="70%">Kuintil 4</TableCell>
                            <TableCell width="30%">29.01 %</TableCell>
                        </TableRow>                                                
                        <TableRow className={faktorDeterminan[7]==2 ? classes.activeRed : ""}>
                            <TableCell width="70%">Kuintil 3</TableCell>
                            <TableCell width="30%">35.85 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[7]==1 ? classes.activeRed : ""}>
                            <TableCell width="70%">Kuintil 2</TableCell>
                            <TableCell width="30%">40.05 %</TableCell>
                        </TableRow>
                        <TableRow className={faktorDeterminan[7]==0 ? classes.activeRed : ""}> 
                            <TableCell width="70%">Kuintil 1</TableCell>
                            <TableCell width="30%">41.28 %</TableCell>
                        </TableRow>                                                
                    </TableBody>
                </Table>
            </TableContainer>    
            </Grid>
            <Grid item xs={12} sm={12}>
            <div className={classes.innerContainer}>
                <p className={classes.keterangan}>Keterangan: </p>        
                <p className={classes.keterangan}>*) Pengelompokkan kategori pendidikan didasarkan pada Undang-Undang Nomor 20 Tahun 2003</p>
                
                {faktorDeterminan[0] == -1 ? "" : 
                    <p className={classes.keterangan}>
                        **) Highlight merah mengindikasikan faktor determinan yang anda masukkan memiliki pengaruh terhadap meningkatnya risiko kejadian stunting pada anak.                     
                    </p>
                }
                
            </div>            
            </Grid>
        </Grid>
        
    </div>);
}                                                            