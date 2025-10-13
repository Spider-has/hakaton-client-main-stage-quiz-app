import { Container } from "@mui/material";
import { RegisterForm } from "../../../../features";

export default function AuthPageComponent() {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: `100%`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <RegisterForm />
    </Container>
  );
}
