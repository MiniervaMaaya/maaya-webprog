import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Gauge } from "@mui/x-charts/Gauge";
import { Typography, Card, CardContent, Chip } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 110, editable: true },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 180,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Maaya", firstName: "Minierva", age: 20 },
  { id: 2, lastName: "Santos", firstName: "Ana", age: 22 },
  { id: 3, lastName: "Reyes", firstName: "Marco", age: 24 },
  { id: 4, lastName: "Cruz", firstName: "Lia", age: 21 },
  { id: 5, lastName: "Garcia", firstName: "Noah", age: 23 },
  { id: 6, lastName: "Lee", firstName: "Sofia", age: 25 },
  { id: 7, lastName: "Rivera", firstName: "Mika", age: 19 },
  { id: 8, lastName: "Torres", firstName: "Elijah", age: 26 },
  { id: 9, lastName: "Dela Cruz", firstName: "Isabel", age: 22 },
];

const cardSx = {
  height: "100%",
  borderRadius: 2,
  border: "1px solid #e4e4e7",
  boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)",
};

function DashboardPage() {
  const location = useLocation();
  const averageAge = (
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length
  ).toFixed(1);

  const stats = [
    { label: "Total Users", value: rows.length, icon: <PeopleIcon />, color: "#2563eb" },
    { label: "Average Age", value: averageAge, icon: <TrendingUpIcon />, color: "#16a34a" },
    { label: "Wellness Score", value: "70%", icon: <FavoriteIcon />, color: "#dc2626" },
    { label: "Campus Pin", value: "NU", icon: <LocationOnIcon />, color: "#9333ea" },
  ];

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid #e4e4e7",
          bgcolor: "#18181b",
          color: "white",
          p: { xs: 3, md: 4 },
          overflow: "hidden",
        }}
      >
        <Chip
          label={`Current route: ${location.pathname}`}
          sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "white", mb: 2 }}
        />
        <Typography variant="h3" fontWeight={900}>
          Dashboard Overview
        </Typography>
        <Typography sx={{ mt: 1, maxWidth: 720, color: "#d4d4d8" }}>
          A MUI-powered admin view for tracking users, sample analytics, chart
          output, and location details for Smiley Haven.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={cardSx}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  <Chip size="small" label="Live" variant="outlined" />
                </Box>
                <Typography variant="h4" fontWeight={900} sx={{ mt: 2 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={900}>
                Progress Gauges
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Gauge width={150} height={150} value={70} />
                <Gauge width={150} height={150} value={50} valueMin={10} valueMax={60} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={900} gutterBottom>
                Quarterly Sales
              </Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: "Series 1" },
                  { data: [51, 6, 49, 30], label: "Series 2" },
                ]}
                height={300}
                xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band", label: "Quarters" }]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={900} gutterBottom>
                Users Overview
              </Typography>
              <Box sx={{ height: 430, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  sx={{
                    border: 0,
                    "& .MuiDataGrid-columnHeaders": { bgcolor: "#f8fafc" },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={900} gutterBottom>
                Category Split
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "Series A" },
                      { id: 1, value: 15, label: "Series B" },
                      { id: 2, value: 20, label: "Series C" },
                    ],
                  },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={cardSx}>
        <CardContent>
          <Typography variant="h6" fontWeight={900} gutterBottom>
            Location Map
          </Typography>
          <Box
            sx={{
              height: 460,
              width: "100%",
              overflow: "hidden",
              borderRadius: 2,
              border: "1px solid #e4e4e7",
            }}
          >
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default DashboardPage;
