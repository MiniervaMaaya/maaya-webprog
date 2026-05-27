import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const cardSx = {
  borderRadius: 2,
  border: "1px solid #e4e4e7",
  boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)",
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "department", headerName: "Department", flex: 1, minWidth: 150 },
  { field: "generated", headerName: "Generated", width: 130 },
  { field: "completed", headerName: "Completed", width: 130 },
  { field: "rate", headerName: "Rate", width: 110 },
];

const rows = [
  { id: 1, department: "Sales", generated: 18, completed: 12, rate: "67%" },
  { id: 2, department: "Users", generated: 24, completed: 19, rate: "79%" },
  { id: 3, department: "Inventory", generated: 20, completed: 17, rate: "85%" },
  { id: 4, department: "Finance", generated: 27, completed: 23, rate: "85%" },
  { id: 5, department: "Wellness", generated: 31, completed: 28, rate: "90%" },
];

const reportStats = [
  {
    label: "Reports Generated",
    value: "120",
    helper: "+18 this week",
    icon: <AutoGraphIcon />,
    color: "#2563eb",
  },
  {
    label: "Completion Rate",
    value: "78%",
    helper: "On target",
    icon: <TaskAltIcon />,
    color: "#16a34a",
  },
  {
    label: "Avg. Turnaround",
    value: "2.4d",
    helper: "Faster by 12%",
    icon: <ScheduleIcon />,
    color: "#9333ea",
  },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']")
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }
            .report-shell { padding: 28px; }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }
            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }
            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }
            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiCardContent-root { padding: 20px; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{
          mb: 4,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          border: "1px solid #1f2937",
          bgcolor: "#111827",
          color: "white",
          boxShadow: "0 20px 50px rgba(17, 24, 39, 0.18)",
        }}
      >
        <Box>
          <Chip
            icon={<AutoGraphIcon />}
            label="Printable analytics"
            sx={{
              mb: 2,
              bgcolor: "rgba(255,255,255,0.12)",
              color: "white",
              fontWeight: 800,
              "& .MuiChip-icon": { color: "white" },
            }}
          />
          <Typography variant="h4" fontWeight={900} gutterBottom>
            Reports Mission Control
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 680, color: "#d1d5db" }}>
            Report analytics overview showing generated reports, category
            breakdown, and current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained" color="success" startIcon={<DownloadIcon />}>
            Generate
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ color: "white", borderColor: "rgba(255,255,255,0.45)" }}
          >
            Export
          </Button>
          <Button sx={{ color: "white", borderColor: "rgba(255,255,255,0.45)" }} variant="outlined">
            Filter
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {reportStats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, md: 4 }}>
            <Card sx={cardSx}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" fontWeight={900} sx={{ mt: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Chip
                      size="small"
                      icon={<TrendingUpIcon />}
                      label={stat.helper}
                      sx={{ mt: 1.5, bgcolor: "#f8fafc" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${stat.color}18`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack ref={printRef} spacing={3}>
        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" fontWeight={900} gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This chart compares how many reports were generated and how many
              were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: "Generated" },
                { data: [12, 19, 17, 23], label: "Completed" },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["January", "February", "March", "April"],
                  scaleType: "band",
                  label: "Months",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card sx={{ ...cardSx, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={900} gutterBottom>
                  Report Category Share
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  This chart shows the distribution of report requests by
                  category for the current reporting period.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 14, label: "Sales" },
                          { id: 1, value: 10, label: "Users" },
                          { id: 2, value: 8, label: "Inventory" },
                          { id: 3, value: 6, label: "Finance" },
                        ],
                      },
                    ]}
                    width={320}
                    height={240}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Card sx={{ ...cardSx, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={900} gutterBottom>
                  Completion Rate
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  The gauge highlights the current percentage of reports
                  completed on time based on the latest reporting cycle.
                </Typography>
                <Box
                  sx={{
                    minHeight: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gauge width={190} height={190} value={78} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={cardSx}>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h6" fontWeight={900} gutterBottom>
                  Report Department Table
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Department output is sorted for quick scanning before export.
                </Typography>
              </Box>
              <Chip label="Ready for PDF" color="success" variant="outlined" />
            </Stack>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{ minHeight: 380, border: 0 }}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
