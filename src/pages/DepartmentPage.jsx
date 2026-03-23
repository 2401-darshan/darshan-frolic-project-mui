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

const departmentTheme = createTheme({
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

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    DepartmentName: "",
    DepartmentImage: "",
    DepartmentDescription: "",
    InstituteID: "",
    DepartmentCoOrdinatorID: ""
  });

  const totalPages = Math.ceil(departments.length / rowsPerPage);
  const paginatedData = departments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      const data = res.data.departments || [];

      setDepartments(
        data.map((dept) => ({
          id: dept._id,
          name: dept.DepartmentName,
          image: dept.DepartmentImage,
          description: dept.DepartmentDescription,
          instituteId: dept.InstituteID,
          coordinatorId: dept.DepartmentCoOrdinatorID
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 2. GET BY ID
  const fetchDepartmentById = async (id) => {
    try {
      const res = await api.get(`/departments/${id}`);
      const d = res.data.department;

      setForm({
        DepartmentName: d.DepartmentName || "",
        DepartmentImage: d.DepartmentImage || "",
        DepartmentDescription: d.DepartmentDescription || "",
        InstituteID: d.InstituteID || "",
        DepartmentCoOrdinatorID: d.DepartmentCoOrdinatorID || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 ADD
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({
      DepartmentName: "",
      DepartmentImage: "",
      DepartmentDescription: "",
      InstituteID: "",
      DepartmentCoOrdinatorID: ""
    });
    setOpen(true);
  };

  // 🔹 EDIT
  const handleOpenEdit = async (row) => {
    setEditId(row.id);
    // Immediately populate the form from locally available row data
    setForm({
      DepartmentName: row.name || "",
      DepartmentImage: row.image || "",
      DepartmentDescription: row.description || "",
      InstituteID: row.instituteId || "",
      DepartmentCoOrdinatorID: row.coordinatorId || ""
    });
    setOpen(true);
    // Also fetch fresh data from backend to ensure fields are up-to-date
    await fetchDepartmentById(row.id);
  };

  // 🔹 DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete this department?")) {
      try {
        await api.delete(`/departments/${id}`);
        setDepartments(departments.filter(d => d.id !== id));
      } catch (err) {
        console.error(err);
        alert("Delete failed (Admin only)");
      }
    }
  };

  const handleSave = async () => {
    if (!form.DepartmentName || !form.InstituteID || !form.DepartmentCoOrdinatorID) {
      alert("Please fill required fields");
      return;
    }

    if (editId) {
      // UPDATE
      try {
        const res = await api.patch(`/departments/${editId}`, form);
        const updated = res.data.updatedDepartment;

        setDepartments(departments.map(d =>
          d.id === editId
            ? {
              id: updated._id,
              name: updated.DepartmentName,
              image: updated.DepartmentImage,
              description: updated.DepartmentDescription,
              instituteId: updated.InstituteID,
              coordinatorId: updated.DepartmentCoOrdinatorID
            }
            : d
        ));

        setOpen(false);
      } catch (err) {
        console.error(err);
        alert("Update failed");
      }
    } else {
      try {
        const res = await api.post("/departments", form);
        const newDept = res.data.department;

        setDepartments([
          ...departments,
          {
            id: newDept._id,
            name: newDept.DepartmentName,
            image: newDept.DepartmentImage,
            description: newDept.DepartmentDescription,
            instituteId: newDept.InstituteID,
            coordinatorId: newDept.DepartmentCoOrdinatorID
          }
        ]);

        setOpen(false);
      } catch (err) {
        console.error(err);
        alert("Create failed");
      }
    }
  };

  return (
    <ThemeProvider theme={departmentTheme}>
      <Box p={4} sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h5" fontWeight={700}> Departments Management</Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all departments of our university here.
            </Typography>
          </Box>
          {isAdmin && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ borderRadius: 2 }}>
              Add Department
            </Button>
          )}
        </Box>

        {/* Table */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }} >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.2)" }} >
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  {isAdmin && <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        <IconButton onClick={() => handleOpenEdit(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <Box mt={2}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
          <span> Page {page} of {totalPages || 1} </span>
          <Button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Next</Button>
        </Box>

        {/* Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth PaperProps={{ sx: { bgcolor: '#0f172a', backgroundImage: 'none' } }}>
          <DialogTitle>{editId ? "Edit Department" : "Add Department"}</DialogTitle>

          <DialogContent>
            <Stack spacing={2} mt={2}>
              <TextField label="Department Name" name="DepartmentName" value={form.DepartmentName} onChange={handleChange} required />
              <TextField label="Image URL" name="DepartmentImage" value={form.DepartmentImage} onChange={handleChange} />
              <TextField label="Description" name="DepartmentDescription" value={form.DepartmentDescription} onChange={handleChange} multiline />
              <TextField label="Institute ID" name="InstituteID" value={form.InstituteID} onChange={handleChange} required />
              <TextField label="Coordinator ID" name="DepartmentCoOrdinatorID" value={form.DepartmentCoOrdinatorID} onChange={handleChange} required />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="outlined">Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}           