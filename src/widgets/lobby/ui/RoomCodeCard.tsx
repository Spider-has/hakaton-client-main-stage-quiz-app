import { Button, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { PaperBlock } from "./Paper";

interface RoomCodeCardProps {
  roomCode: string;
}

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

export const RoomCodeCard = (props: RoomCodeCardProps) => {
  const { roomCode } = props;
  const handleCopy = () => {
    copyToClipboard(roomCode);
    // Можно добавить нотификацию через snackbar, если нужно
  };

  return (
    <PaperBlock sx={{ minWidth: 200, width: { xs: `100%`, md: `auto` } }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Код комнаты
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h5" fontWeight="bold">
          {roomCode}
        </Typography>
        <Button
          size="small"
          onClick={handleCopy}
          startIcon={<ContentCopyIcon />}
          sx={{ ml: "auto", minWidth: "auto", px: 1 }}
        >
          Копировать
        </Button>
      </Stack>
    </PaperBlock>
  );
};
