import React from "react";
import { useRecoilState } from "recoil";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // MUI Close Icon
import { modalState, closedModalState } from "../../recoilStore/modalState/modalState"; // Adjust the import path as needed

const ModalComponent = () => {
    const [modal, setModal] = useRecoilState(modalState);

    const handleClose = () => {
        setModal(closedModalState);
    };

    return (
        <Dialog open={modal.open} onClose={handleClose}>
            <IconButton
                onClick={handleClose}
                style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>{modal.content}</DialogContent>
        </Dialog>
    );
};

export default ModalComponent;
