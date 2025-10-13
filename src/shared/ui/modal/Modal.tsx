import React from "react";
import { Modal as MuiModal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => (
  <MuiModal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 500 },
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 3,
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      {children}
    </Box>
  </MuiModal>
);
