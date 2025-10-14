
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import type { Player } from "../../../features";

type LeaderboardProps = {
  players: Player[];
}

export const PlayersLeaderboard = (props: LeaderboardProps) => {
  const {players } = props;
  
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.answered && !b.answered) return -1;
    if (!a.answered && b.answered) return 1;

    return (b.score || 0) - (a.score || 0);
  });

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom align="center">
        Лидеры
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Игрок</TableCell>
              <TableCell align="right">Очки</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player) => (
              <TableRow
                key={player.user_id}
                sx={{
                  ...(player.answered && {
                    backgroundColor: "primary.light",
                    "&:hover": { backgroundColor: "primary.lighter" },
                  }),
                }}
              >
                <TableCell>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={player.answered ? "bold" : "regular"}
                      color={player.answered ? "primary.contrastText" : "text.primary"}
                    >
                      {player.username}
                    </Typography>
                    {player.answered ? (
                      <Typography variant="caption" color="primary.contrastText"> Ответил
                      </Typography>
                    ) : (
                      <Typography variant="caption" color="text.disabled">
                        Ожидание...
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    fontWeight={player.answered ? "bold" : "regular"}
                    color={player.answered ? "primary.contrastText" : "text.primary"}
                  >
                    {player.score || 0}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};