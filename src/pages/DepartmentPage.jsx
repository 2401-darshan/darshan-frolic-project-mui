import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Avatar,
  Stack,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rowsPerPage = 10;

const initialDepartments = [
  { id: 1, name: "Computer Science (B.Sc)", institute: "Darshan Institute of Computer Application", head: "Dr. Krunal", students: 50 },
  { id: 2, name: "Mechanical Engineering", institute: "Darshan Institute of Engineering and Technology", head: "Dr. Aniket", students: 100 },
  { id: 3, name: "Civil Engineering", institute: "Darshan Institute of Engineering and Technology", head: "Dr. Rahul", students: 80 },
  { id: 4, name: "Bachelor of Business Administration (BBA)", institute: "Darshan Institute of Management", head: "Dr. Iyer", students: 90 },
  { id: 5, name: "Bachelor of Commerce (B.Com)", institute: "Darshan Institute of Management", head: "Prof. Nair", students: 70 },
  { id: 6, name: "Electrical Engineering", institute: "Darshan Institute of Engineering and Technology", head: "Dr. Mehta", students: 60 },
  { id: 7, name: "Information Technology", institute: "Darshan Institute of Computer Application", head: "Dr. Shah", students: 110 },
  { id: 8, name: "Electronics and Communication Engineering", institute: "Darshan Institute of Engineering and Technology", head: "Dr. Patel", students: 75 },
  { id: 9, name: "Bachelor of Arts (B.A)", institute: "Darshan Institute of Arts", head: "Prof. Desai", students: 85 },
  { id: 10, name: "Chemical Engineering", institute: "Darshan Institute of Engineering and Technology", head: "Dr. Joshi", students: 55 },
  { id: 11, name: "Architecture", institute: "Darshan Institute of Architecture", head: "Dr. Kapoor", students: 40 },
  { id: 12, name: "Pharmacy", institute: "Darshan Institute of Pharmacy", head: "Dr. Verma", students: 65 },
  { id: 13, name: "Bachelor of Science in Hospitality and Tourism Management", institute: "Darshan Institute of Hospitality and Tourism Management", head: "Dr. Singh", students: 45 },
  { id: 14, name: "Bachelor of Science in Agriculture", institute: "Darshan Institute of Agriculture", head: "Dr. Reddy", students: 30 },
  { id: 15, name: "Bachelor of Science in Environmental Science", institute: "Darshan Institute of Environmental Studies", head: "Dr. Bhatt", students: 25 },
  { id: 16, name: "Bachelor of Science in Biotechnology", institute: "Darshan Institute of Biotechnology", head: "Dr. Ghosh", students: 35 },
  { id: 17, name: "Bachelor of Science in Microbiology", institute: "Darshan Institute of Microbiology", head: "Dr. Das", students: 20 },
  { id: 18, name: "Bachelor of Science in Food Technology", institute: "Darshan Institute of Food Technology", head: "Dr. Chatterjee", students: 15 },
  { id: 19, name: "Bachelor of Science in Forensic Science", institute: "Darshan Institute of Forensic Science", head: "Dr. Banerjee", students: 10 },
  { id: 20, name: "Bachelor of Science in Zoology", institute: "Darshan Institute of Zoology", head: "Dr. Mukherjee", students: 5 }
];

export default function DepartmentPage() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Tracking edit mode

  const [form, setForm] = useState({
    name: "",
    institute: "",
    head: "",
    students: ""
  });

  const totalPages = Math.ceil(departments.length / rowsPerPage);
  const paginatedData = departments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ name: "", institute: "", head: "", students: "" });
    setOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setEditId(dept.id);
    setForm({ ...dept });
    setOpen(true);
  };

  const handleSave = () => {
    if (editId) {
      setDepartments(departments.map(d => d.id === editId ? { ...form, id: editId } : d));
    } else {
      const newId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
      setDepartments([...departments, { id: newId, ...form }]);
      setPage(Math.ceil((departments.length + 1) / rowsPerPage));
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      const updated = departments.filter(d => d.id !== id);
      setDepartments(updated);
      if (updated.length <= (page - 1) * rowsPerPage && page > 1) {
        setPage(page - 1);
      }
    }
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={600}>Departments Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage all university departments and heads</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add Department
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Institute</TableCell>
              <TableCell>Head of Dept</TableCell>
              <TableCell align="center">Students</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell><Typography variant="body2">{row.name}</Typography></TableCell>
                <TableCell>{row.institute}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.light' }}>
                      <PersonIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography variant="body2">{row.head}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">{row.students}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <IconButton size="small" color="primary" onClick={() => handleOpenEdit(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" alignItems="center" gap={2} mt={3}>
        <Button variant="outlined" size="small" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <Typography variant="body2">Page {page} of {totalPages || 1}</Typography>
        <Button variant="outlined" size="small" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>Next</Button>
      </Box>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>{editId ? "Edit Department" : "Add New Department"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Department Name" name="name" value={form.name} onChange={handleChange} />
            <TextField fullWidth label="Institute" name="institute" value={form.institute} onChange={handleChange} />
            <TextField fullWidth label="Head of Department" name="head" value={form.head} onChange={handleChange} />
            <TextField fullWidth label="Students" type="number" name="students" value={form.students} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{editId ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}