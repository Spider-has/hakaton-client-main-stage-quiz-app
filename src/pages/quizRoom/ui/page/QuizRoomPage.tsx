import { Container } from "@mui/material";
import { useParams } from "react-router";
import { QuizRoomContext, useQuizRoomConnection } from "../../../../features";

export default function QuizRoomPageComponent() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  if (!id) {
    return <div>Invalid room ID</div>;
  }

  const actions = useQuizRoomConnection(id);

  return (
    <QuizRoomContext.Provider value={actions}>
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
      ></Container>
    </QuizRoomContext.Provider>
  );
}
