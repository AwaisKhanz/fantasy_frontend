import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Awards = () => {
  const { leagueKey } = useParams();
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await api.post(`/awards/calculate/${leagueKey}`);
        setAwards(response.data.awards);
      } catch (error) {
        console.error("Failed to fetch awards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, [leagueKey]);

  const data = {
    labels: awards.map((a) => a.recipient || "No Data"),
    datasets: [
      {
        label: "Award Points",
        data: awards.map((a) => a.points || 0), // ✅ Now using actual points
        backgroundColor: [
          "rgba(75,192,192,0.6)",
          "rgba(153,102,255,0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(54,162,235,0.6)",
        ],
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <p>Loading awards...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>League Awards 🏆</h1>

      <Bar data={data} height={500} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {awards.map((award, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{award.awardName}</h3>
            <p>
              <strong>Winner:</strong> {award.recipient}
            </p>
            <p>{award.description}</p>
            <p>
              <strong>Points:</strong> {award.points}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
