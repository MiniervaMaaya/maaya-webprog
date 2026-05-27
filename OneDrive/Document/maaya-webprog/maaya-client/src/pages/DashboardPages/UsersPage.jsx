import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../assets/users.json?raw";
import { createUser, fetchUsers, updateUser } from "../../services/UserService";
import { getCurrentUser, isEditor } from "../../utils/auth";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(String(user.gender ?? "").trim().toLowerCase())
          ? String(user.gender ?? "").trim().toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "").trim().toLowerCase(),
        role: roles.includes(String(user.role ?? "").trim().toLowerCase())
          ? String(user.role ?? "").trim().toLowerCase()
          : "editor",
        username: String(user.username ?? "").trim().toLowerCase(),
        password: String(user.password ?? ""),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return {
      users: [],
      error: "Unable to read users from src/assets/users.json.",
    };
  }
};

const seed = loadUsers();

const metricCardSx = {
  borderRadius: 2,
  border: "1px solid #e4e4e7",
  boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)",
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    gender: "all",
    status: "all",
  });
  const currentUser = getCurrentUser();

  useEffect(() => {
    let mounted = true;

    fetchUsers().then((data) => {
      if (mounted) {
        setUsers(data);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();
    const age = form.age.trim();
    const contactNumber = form.contactNumber.trim();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "Username"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
      nextErrors.email = "Email address already exists.";
    }

    if (!nextErrors.username && /\s/.test(username)) {
      nextErrors.username = "Username must not contain spaces.";
    }

    if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
      nextErrors.username = "Username already exists.";
    }

    if (!nextErrors.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = "Contact number must be 11 digits.";
    }

    if (!nextErrors.age && !/^\d+$/.test(age)) {
      nextErrors.age = "Age must be a number only.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    const savedUser = modal.id
      ? await updateUser(modal.id, nextUser)
      : await createUser(nextUser);

    setUsers((prev) =>
      modal.id
        ? prev.map((user) =>
            user.id === modal.id ? { ...user, ...savedUser } : user
          )
        : [...prev, savedUser]
    );

    closeModal();
  };

  const toggleStatus = async (id) => {
    const targetUser = users.find((user) => user.id === id);
    if (!targetUser) return;

    const updatedUser = await updateUser(id, {
      ...targetUser,
      isActive: !targetUser.isActive,
    });

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        [user.firstName, user.lastName, user.email, user.username]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesRole = filters.role === "all" || user.role === filters.role;
      const matchesGender = filters.gender === "all" || user.gender === filters.gender;
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "active" ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [filters, query, users]);

  const activeUsers = users.filter((user) => user.isActive).length;
  const activeFilterCount = [
    query.trim(),
    filters.role !== "all",
    filters.gender !== "all",
    filters.status !== "all",
  ].filter(Boolean).length;

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 180,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: "username", headerName: "Username", minWidth: 150 },
    { field: "age", headerName: "Age", width: 90 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: "contactNumber", headerName: "Contact Number", minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1.1, minWidth: 220 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(row.id)}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  if (isEditor()) {
    return (
      <Alert severity="warning">
        Editors cannot access the Users page. You are signed in as{" "}
        {currentUser.firstName || "an editor"}.
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Chip label="User directory" sx={{ mb: 1.5, fontWeight: 800 }} />
          <Typography variant="h4" fontWeight={900}>
            People Operations
          </Typography>
          <Typography color="text.secondary">
            Search, filter, create, edit, and activate dashboard users.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddAltIcon />}
          onClick={() => openModal()}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add User
        </Button>
      </Box>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ ...metricCardSx, flex: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary">Total Users</Typography>
                <Typography variant="h4" fontWeight={900}>{users.length}</Typography>
              </Box>
              <GroupsIcon sx={{ color: "#2563eb" }} />
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ ...metricCardSx, flex: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary">Active Accounts</Typography>
                <Typography variant="h4" fontWeight={900}>{activeUsers}</Typography>
              </Box>
              <VerifiedUserIcon sx={{ color: "#16a34a" }} />
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ ...metricCardSx, flex: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary">Filtered Results</Typography>
                <Typography variant="h4" fontWeight={900}>{filteredUsers.length}</Typography>
              </Box>
              <ManageSearchIcon sx={{ color: "#9333ea" }} />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Paper
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 2,
          borderRadius: 2,
          border: "1px solid #e4e4e7",
          boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)",
        }}
      >
        <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
          <TextField
            label="Search users"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, or username"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            name="role"
            label="Role"
            value={filters.role}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TuneIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">All roles</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {labelize(role)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            name="gender"
            label="Gender"
            value={filters.gender}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All genders</MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {labelize(gender)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            name="status"
            label="Status"
            value={filters.status}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
          <Chip
            label={`${activeFilterCount} active filter${activeFilterCount === 1 ? "" : "s"}`}
            color={activeFilterCount ? "primary" : "default"}
            variant={activeFilterCount ? "filled" : "outlined"}
          />
          {query.trim() && <Chip label={`Search: ${query.trim()}`} variant="outlined" />}
          {filters.role !== "all" && <Chip label={`Role: ${labelize(filters.role)}`} variant="outlined" />}
          {filters.gender !== "all" && <Chip label={`Gender: ${labelize(filters.gender)}`} variant="outlined" />}
          {filters.status !== "all" && <Chip label={`Status: ${labelize(filters.status)}`} variant="outlined" />}
        </Stack>
      </Paper>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {filteredUsers.length ? (
          <Box sx={{ height: { xs: 520, sm: 560 }, width: "100%", minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                border: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
                "& .MuiDataGrid-columnHeaders": { bgcolor: "#f8fafc" },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Adjust your search or filter settings.
          </Alert>
        )}
      </Paper>

      <Card
        sx={{
          mt: 3,
          borderRadius: 2,
          border: "1px solid #e4e4e7",
          boxShadow: "0 14px 40px rgba(24, 24, 27, 0.06)",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={900} gutterBottom>
            Validation Rules
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1} flexWrap="wrap" useFlexGap>
            {[
              "Password must be at least 8 characters",
              "Contact number must be 11 digits",
              "Age must be a number only",
              "Username must not contain spaces",
            ].map((rule) => (
              <Chip key={rule} label={rule} variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("age", "Age")} />
                <TextField {...fieldProps("gender", "Gender", { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("contactNumber", "Contact Number")} />
                <TextField {...fieldProps("email", "Email Address", { type: "email" })} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("role", "Role", { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps("username", "Username")} />
              </Stack>
              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField {...fieldProps("address", "Address", { multiline: true, rows: 3 })} />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={form.isActive ? "User status: Active" : "User status: Inactive"}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
