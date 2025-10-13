import { privateEndpoints, publicFetch } from "../../../shared";

type CreateQuizDTO = {
  category_ids: string[];
  count_questions: number;
};

export const createQuizRoom = async (data: CreateQuizDTO) => {
  const res = await publicFetch(privateEndpoints.quiz.createRoom, {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error("Failed to create room");
  const { room_code } = await res.json();
  return room_code;
};
