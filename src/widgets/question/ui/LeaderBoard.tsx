import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Player } from "../../../features";

interface LeaderboardProps {
  players: Player[];
}

export const PlayersLeaderboard = ({ players }: LeaderboardProps) => {
  const sortedPlayers = [...players].sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  );

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
              <TableRow key={player.user_id}>
                <TableCell>{player.username}</TableCell>
                <TableCell align="right">{player.score || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
