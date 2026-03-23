import React, { useState, useEffect } from "react";
import {
  Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Typography, IconButton, Stack, CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../Api/Axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const instituteTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1f2937",
      paper: "#374151",
    },
    primary: { main: "#1890ff" },
  },
});

const rowsPerPage = 10;

function InstitutePage() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    InstituteName: '',
    InstituteImage: '',
    InstituteDescription: '',
    InstituteCoOrdinatorID: ''
  });

  const totalPages = Math.ceil(institutes.length / rowsPerPage);
  const paginatedData = institutes.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.isAdmin === true || payload.role === "admin" || payload.UserRole === "admin" || payload.role === 1);
      }
    } catch (e) {
      console.error("Token decoding failed", e);
    }
    fetchAllInstitutes();
  }, []);

  const fetchAllInstitutes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/institute");
      const data = res.data.institutes || [];

      setInstitutes(
        data.map((inst) => ({
          id: inst._id,
          name: inst.InstituteName,
          image: inst.InstituteImage,
          description: inst.InstituteDescription,
          coordinatorId: inst.InstituteCoOrdinatorID,
        }))
      );
    } catch (error) {
      console.error("Fetch institutes error:", error);
      alert("Failed to load institutes.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInstituteById = async (id) => {
    try {
      const res = await api.get(`/institute/${id}`);
      const inst = res.data.institute;

      setForm({
        InstituteName: inst.InstituteName || "",
        InstituteImage: inst.InstituteImage || "",
        InstituteDescription: inst.InstituteDescription || "",
        InstituteCoOrdinatorID: inst.InstituteCoOrdinatorID || "",
      });
    } catch (error) {
      console.error("Fetch institute by ID error:", error);
      alert("Failed to load institute details.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({
      InstituteName: "",
      InstituteImage: "",
      InstituteDescription: "",
      InstituteCoOrdinatorID: "",
    });
    setOpen(true);
  };

  const handleOpenEdit = async (institute) => {
    setEditId(institute.id);
    setForm({
      InstituteName: "",
      InstituteImage: "",
      InstituteDescription: "",
      InstituteCoOrdinatorID: "",
    });
    setOpen(true);
    await fetchInstituteById(institute.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this institute?")) {
      try {
        await api.delete(`/institute/${id}`);
        setInstitutes(institutes.filter((inst) => inst.id !== id));
      } catch (error) {
        console.error("Delete institute error:", error);
        alert("Failed to delete institute. Make sure you have Admin permissions.");
      }
    }
  };

  const handleSave = async () => {
    if (editId) {
      try {
        const res = await api.patch(`/institute/${editId}`, form);
        const updated = res.data.updatedInstitute;

        setInstitutes(institutes.map((inst) =>
          inst.id === editId
            ? {
              id: updated._id,
              name: updated.InstituteName,
              image: updated.InstituteImage,
              description: updated.InstituteDescription,
              coordinatorId: updated.InstituteCoOrdinatorID,
            }
            : inst
        ));

        setOpen(false);
      } catch (error) {
        console.error("Update institute error:", error);
        alert("Failed to update institute. Make sure you have Admin permissions.");
      }
    } else {
      try {
        const res = await api.post("/institute", form);
        const newInstitute = res.data.institute;

        setInstitutes([
          ...institutes,
          {
            id: newInstitute._id,
            name: newInstitute.InstituteName,
            image: newInstitute.InstituteImage,
            description: newInstitute.InstituteDescription,
            coordinatorId: newInstitute.InstituteCoOrdinatorID,
          },
        ]);

        setOpen(false);
      } catch (error) {
        console.error("Create institute error:", error);
        alert("Failed to create institute.");
      }
    }
  };

  return (
    <ThemeProvider theme={instituteTheme}>
      <Box p={4} sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight={700}>Institutes Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all institutes of our university here.
          </Typography>
        </Box>
        {isAdmin && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ borderRadius: 2 }}>
            Add Institute
          </Button>
        )}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(0,0,0,0.2)" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Institute Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                {isAdmin && <TableCell align="left" sx={{ fontWeight: 600 }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    No institutes found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow key={row.id} hover>
                    {/* Serial number: continues correctly across pages e.g. page 2 starts at 11 */}
                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    {isAdmin && (
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-start">
                          <IconButton color="primary" size="small" onClick={() => handleOpenEdit(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box display="flex" alignItems="center" gap={2} mt={3}>
        <Button variant="outlined" size="small" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <Typography variant="body2" fontWeight={500}>
          Page {page} of {totalPages || 1}
        </Typography>
        <Button variant="outlined" size="small" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editId ? "Edit Institute Details" : "Add New Institute"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Institute Name" name="InstituteName" value={form.InstituteName} onChange={handleChange} fullWidth required />
            <TextField label="Institute Image URL" name="InstituteImage" value={form.InstituteImage} onChange={handleChange} fullWidth />
            <TextField label="Institute Description" name="InstituteDescription" value={form.InstituteDescription} onChange={handleChange} fullWidth multiline rows={3} />
            <TextField label="Coordinator User ID" name="InstituteCoOrdinatorID" value={form.InstituteCoOrdinatorID} onChange={handleChange} fullWidth required />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit" variant="outlined">Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!form.InstituteName || !form.InstituteCoOrdinatorID}
          >
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default InstitutePage;
