import React from "react";
import Button from "../CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import styles from "./ToolTipStyle";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  
Transition.displayName = "Transition";

export default function ToolTip(props){
    const classes = useStyles();
    const [classicModal, setClassicModal] = React.useState(false);
    return(
        <div>
            <Button color="info" 
                variant="outlined" 
                round
                  onClick={() => setClassicModal(true)}
            >                                  
                  Pelajari lebih lanjut hasil diatas.
                  <HelpOutlineIcon></HelpOutlineIcon>  
            </Button>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={classicModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setClassicModal(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => setClassicModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h3 className={classes.modalTitle}>Apa Maksud Hasil Tersebut ?</h3>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    {props.result == "stunting" ? 
                      <p className={classes.modalContent}>
                        Anak anda saat ini termasuk kategori stunting yaitu kondisi dimana tinggi anak
                        anda dibawah standar pertumbuhan normal. Angka persentase risiko tersebut memiliki arti bahwa berdasarkan semua faktor yang telah dimasukan,
                        terdapat {props.persentase} % probabilitas anak termasuk balita stunting. Hasil tersebut didapatkan
                        dari model NaiveBayes yang dibuat berdasarkan data 3707 anak pada Indonesian Family Life Survey 2014.
                      </p>
                    : 
                      <p className={classes.modalContent}>
                        Anak anda saat ini diprediksi tidak mengalami stunting di masa mendatang.
                      </p>
                    }
                    
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      onClick={() => setClassicModal(false)}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
        </div>
    );
}