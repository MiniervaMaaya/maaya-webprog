import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
  { field: "role", headerName: "Role", width: 140 },
  { field: "status", headerName: "Status", width: 140 },
];

const rows = [
  { id: 1, name: "Minierva Maaya", email: "minierva@email.com", role: "Admin", status: "Active" },
  { id: 2, name: "Ana Santos", email: "ana@email.com", role: "Editor", status: "Active" },
  { id: 3, name: "Marco Reyes", email: "marco@email.com", role: "Member", status: "Pending" },
  { id: 4, name: "Lia Cruz", email: "lia@email.com", role: "Member", status: "Active" },
  { id: 5, name: "Noah Garcia", email: "noah@email.com", role: "Viewer", status: "Inactive" },
  { id: 6, name: "Sofia Lee", email: "sofia@email.com", role: "Editor", status: "Active" },
];

const UsersPage = () => {
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
        <Chip label="Users" sx={{ mb: 2, fontWeight: 800 }} />
        <Typography variant="h4" fontWeight={900}>
          User List
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          A MUI Data Grid table showing sample user details for the dashboard.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 2, border: "1px solid #e4e4e7", boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)" }}>
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              minHeight: 430,
              border: 0,
              "& .MuiDataGrid-columnHeaders": { bgcolor: "#f8fafc" },
            }}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UsersPage;
