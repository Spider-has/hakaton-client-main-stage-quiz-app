import { Container } from "@mui/material";
import { CreateQuizForm } from "../../../../features/createQuizRoom";

export default function CreateRoomPageComponent() {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: `100%`,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        flexDirection: "column",
        paddingTop: 2,
        flexGrow: 1,
      }}
    >
      <CreateQuizForm />
    </Container>
  );
}
