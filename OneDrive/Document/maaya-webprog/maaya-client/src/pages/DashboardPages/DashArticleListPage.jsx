import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import { fetchArticles } from "../../services/ArticleService";

const makeSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const enrichArticle = (article, index) => ({
  ...article,
  id: article.id || index + 1,
  slug: article.slug || makeSlug(article.title),
  paragraphs: article.paragraphs || index + 2,
  status: article.status || (index % 3 === 0 ? "draft" : "active"),
  preview: article.preview || article.desc,
});

const statusColor = {
  active: "success",
  draft: "warning",
  disabled: "default",
};

const blankArticle = {
  title: "",
  slug: "",
  desc: "",
  preview: "",
  paragraphs: "3",
  status: "active",
  image: "/article1.jpg",
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankArticle);

  useEffect(() => {
    let mounted = true;

    fetchArticles().then((data) => {
      if (mounted) {
        setArticles(data.map(enrichArticle));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        !search ||
        [article.title, article.slug, article.desc, article.preview]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesStatus = status === "all" || article.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [articles, query, status]);

  const activeCount = articles.filter((article) => article.status === "active").length;
  const draftCount = articles.filter((article) => article.status === "draft").length;

  const handleOpenModal = (article) => {
    setForm(article ? { ...article } : { ...blankArticle });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm(blankArticle);
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: name === "title" && !prev.slug ? value : value,
      slug: name === "title" && !prev.slug ? makeSlug(value) : prev.slug,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextArticle = enrichArticle({
      ...form,
      id: form.id || Date.now(),
      slug: form.slug || makeSlug(form.title),
      preview: form.preview || form.desc,
      paragraphs: Number(form.paragraphs) || 1,
    });

    setArticles((prev) =>
      form.id
        ? prev.map((article) => (article.id === form.id ? nextArticle : article))
        : [nextArticle, ...prev]
    );

    handleCloseModal();
  };

  const toggleStatus = (id) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? {
              ...article,
              status: article.status === "disabled" ? "active" : "disabled",
            }
          : article
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "slug", headerName: "Slug", minWidth: 190, flex: 0.8 },
    { field: "title", headerName: "Title", minWidth: 230, flex: 1 },
    { field: "paragraphs", headerName: "Paragraphs", width: 120 },
    {
      field: "preview",
      headerName: "Preview",
      minWidth: 280,
      flex: 1.2,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.status}
          color={statusColor[row.status]}
          sx={{ textTransform: "capitalize", fontWeight: 800 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 250,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleOpenModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.status === "disabled" ? "success" : "warning"}
            startIcon={<ToggleOnIcon />}
            onClick={() => toggleStatus(row.id)}
          >
            {row.status === "disabled" ? "Enable" : "Disable"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 2,
          border: "1px solid #e4e4e7",
          bgcolor: "white",
          boxShadow: "0 16px 45px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          spacing={2}
        >
          <Box>
            <Chip icon={<ArticleIcon />} label="Content manager" sx={{ mb: 1.5 }} />
            <Typography variant="h4" fontWeight={900}>
              Articles
            </Typography>
            <Typography color="text.secondary">
              Manage public article entries, visibility, previews, and dashboard content.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
            sx={{ minHeight: 44 }}
          >
            Add Article
          </Button>
        </Stack>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {[
          ["Total Articles", articles.length, "#2563eb"],
          ["Active Posts", activeCount, "#16a34a"],
          ["Draft Queue", draftCount, "#d97706"],
        ].map(([label, value, color]) => (
          <Card
            key={label}
            sx={{
              flex: 1,
              borderRadius: 2,
              border: "1px solid #e4e4e7",
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            }}
          >
            <CardContent>
              <Typography color="text.secondary">{label}</Typography>
              <Typography variant="h4" fontWeight={900} sx={{ color }}>
                {value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid #e4e4e7",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Articles"
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
            label="Status Filter"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            sx={{ minWidth: { xs: "100%", md: 180 } }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: 2,
          minWidth: 0,
          overflow: "hidden",
          borderRadius: 2,
          border: "1px solid #e4e4e7",
        }}
      >
        {filteredArticles.length ? (
          <Box sx={{ height: 430, width: "100%" }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                border: 0,
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#f8fafc",
                  fontWeight: 900,
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">No articles match the current filters.</Alert>
        )}
      </Paper>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        {filteredArticles.slice(0, 3).map((article) => (
          <Card
            key={article.id}
            sx={{
              flex: 1,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #e4e4e7",
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
            }}
          >
            <CardMedia component="img" image={article.image} alt={article.title} height="150" />
            <CardContent>
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Chip
                  size="small"
                  label={article.status}
                  color={statusColor[article.status]}
                  sx={{ textTransform: "capitalize" }}
                />
                <Chip size="small" icon={<VisibilityIcon />} label={`${article.paragraphs} parts`} />
              </Stack>
              <Typography variant="h6" fontWeight={900} sx={{ mt: 2 }}>
                {article.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {article.preview}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{form.id ? "Edit Article" : "Add Article"}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                name="title"
                label="Title"
                value={form.title}
                onChange={handleFormChange}
                required
                fullWidth
              />
              <TextField
                name="slug"
                label="Slug"
                value={form.slug}
                onChange={handleFormChange}
                required
                fullWidth
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  name="paragraphs"
                  label="Paragraphs"
                  type="number"
                  value={form.paragraphs}
                  onChange={handleFormChange}
                  required
                  fullWidth
                />
                <TextField
                  select
                  name="status"
                  label="Status"
                  value={form.status}
                  onChange={handleFormChange}
                  fullWidth
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="disabled">Disabled</MenuItem>
                </TextField>
              </Stack>
              <TextField
                name="image"
                label="Image Path"
                value={form.image}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                name="desc"
                label="Description"
                value={form.desc}
                onChange={handleFormChange}
                multiline
                rows={2}
                required
                fullWidth
              />
              <TextField
                name="preview"
                label="Preview"
                value={form.preview}
                onChange={handleFormChange}
                multiline
                rows={3}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Article
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default DashArticleListPage;
