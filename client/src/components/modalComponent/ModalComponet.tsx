import React from "react";
import { useRecoilState } from "recoil";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { modalState } from "../../recoilStore/modalState"; // Adjust the import path as needed

const ModalComponet = () => {
    const [modal, setModal] = useRecoilState(modalState);

    const handleClose = () => {
        setModal({ open: false, content: null });
    };

    return (
        <Dialog open={modal.open} onClose={handleClose}>
            <DialogContent>{modal.content}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalComponet;
