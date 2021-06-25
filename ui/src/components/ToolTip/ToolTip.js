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
            <Button color="danger" simple className={classes.text}
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
                    <h4 className={classes.modalTitle}>Apa Maksud Hasil Tersebut ?</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <p className={classes.modalContent}>
                      Angka persentase risiko tersebut memiliki arti bahwa sebanyak x % dari kelompok
                      anak yang memiliki faktor-faktor tersebut  mengalami stunting. Hasil survey
                      tersebut didasarkan dari data 3707 anak pada Indonesian Family Life Survey 2014.
                    </p>
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