import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Dashboard = () => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await api.get("/dashboard/get-leagues");
        setLeagues(response.data.leagues);
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const handleViewAwards = (leagueKey) => {
    navigate(`/awards/${leagueKey}`);
  };

  const columns = [
    { field: "name", headerName: "League Name", flex: 1 },
    { field: "season", headerName: "Season", width: 120 },
    {
      field: "teams",
      headerName: "Teams",
      width: 120,
      renderCell: (params) => <div>{params.row.teams?.length || 0}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EmojiEventsIcon />}
          onClick={() => handleViewAwards(params.row.leagueKey)}
        >
          Awards
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* ✅ DataGrid for Leagues */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Leagues
        </Typography>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={leagues}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableSelectionOnClick
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
