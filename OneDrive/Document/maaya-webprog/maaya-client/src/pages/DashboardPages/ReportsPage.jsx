import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const ReportsPage = () => {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid #e4e4e7",
          bgcolor: "white",
          p: { xs: 3, md: 4 },
          boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)",
        }}
      >
        <Chip label="Reports" sx={{ mb: 2, fontWeight: 800 }} />
        <Typography variant="h4" fontWeight={900} gutterBottom>
          Charts and Data Visualization
        </Typography>
        <Typography color="text.secondary">
          Sample MUI X chart outputs for monitoring engagement, categories, and wellness trends.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 2, border: "1px solid #e4e4e7", boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Monthly Engagement
              </Typography>
              <BarChart
                height={320}
                xAxis={[{ data: months, scaleType: "band" }]}
                series={[
                  { data: [42, 58, 64, 73, 88, 96], label: "Visits" },
                  { data: [24, 31, 37, 48, 52, 61], label: "Signups" },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 2, border: "1px solid #e4e4e7", boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Content Categories
              </Typography>
              <PieChart
                height={320}
                series={[
                  {
                    data: [
                      { id: 0, value: 35, label: "Wellness" },
                      { id: 1, value: 30, label: "Community" },
                      { id: 2, value: 20, label: "Mindfulness" },
                      { id: 3, value: 15, label: "Routines" },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 2, border: "1px solid #e4e4e7", boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Wellness Trend
              </Typography>
              <LineChart
                height={300}
                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                series={[
                  {
                    data: [68, 72, 76, 78, 84, 91],
                    label: "Average wellness score",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ReportsPage;
