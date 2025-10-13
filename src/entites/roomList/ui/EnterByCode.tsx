import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

type EnterByCodeProps = {
  joinRoomByCode: (code: string) => void;
};

export const EnterByCode = (props: EnterByCodeProps) => {
  const { joinRoomByCode } = props;
  const [roomCode, setRoomCode] = useState("");

  const handleJoinByCode = () => {
    if (roomCode.trim()) {
      joinRoomByCode(roomCode.trim());
      setRoomCode("");
    }
  };
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Или войдите по коду
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Код комнаты"
          variant="outlined"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          fullWidth
          size="small"
        />
        <Button variant="contained" onClick={handleJoinByCode}>
          Войти
        </Button>
      </Box>
    </Box>
  );
};
