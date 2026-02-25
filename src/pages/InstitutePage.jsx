import React, { useState } from "react";
import {
  Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Typography, IconButton, Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rowsPerPage = 10;

const initialInstitutes = [
  { id: 1, name: "ABC Institute of Technology", location: "A-Block", type: "Engineering", established: 1995 },
  { id: 2, name: "XYZ Institute of Science", location: "G-Block", type: "Science", established: 2001 },
  { id: 3, name: "PQR College of Arts", location: "C-Block", type: "Arts", established: 1998 },
  { id: 4, name: "LMN Institute of Commerce", location: "B-Block", type: "Commerce", established: 2005 },
  { id: 5, name: "DEF University", location: "D-Block", type: "University", established: 1980 },
  { id: 6, name: "GHI Technical Institute", location: "E-Block", type: "Technical", established: 2010 },
  { id: 7, name: "JKL Medical College", location: "F-Block", type: "Medical", established: 1992 },
  { id: 8, name: "MNO Law Institute", location: "H-Block", type: "Law", established: 2003 },
  { id: 9, name: "QRS Business School", location: "I-Block", type: "Business", established: 1999 },
  { id: 10, name: "TUV Institute of Design", location: "J-Block", type: "Design", established: 2007 },
  { id: 11, name: "UVW Institute of Agriculture", location: "K-Block", type: "Agriculture", established: 1985 },
  { id: 12, name: "RST Institute of Environmental Studies", location: "L-Block", type: "Environmental Studies", established: 1990 },
  { id: 13, name: "HIJ Institute of Biotechnology", location: "M-Block", type: "Biotechnology", established: 2000 },
  { id: 14, name: "OPQ Institute of Microbiology", location: "N-Block", type: "Microbiology", established: 1997 },
  { id: 15, name: "CDE Institute of Food Technology", location: "O-Block", type: "Food Technology", established: 2004 },
  { id: 16, name: "VWX Institute of Forensic Science", location: "P-Block", type: "Forensic Science", established: 2008 },
  { id: 17, name: "YZA Institute of Zoology", location: "Q-Block", type: "Zoology", established: 1993 },
  { id: 18, name: "BCD Institute of Architecture", location: "R-Block", type: "Architecture", established: 1988 },
  { id: 19, name: "EFG Institute of Pharmacy", location: "S-Block", type: "Pharmacy", established: 1996 },
  { id: 20, name: "HIJ Institute of Hospitality and Tourism Management", location: "T-Block", type: "Hospitality and Tourism Management", established: 2002 }
];

export default function InstitutePage() {
  const [institutes, setInstitutes] = useState(initialInstitutes);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Tracks if we are editing

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "",
    established: ""
  });

  const totalPages = Math.ceil(institutes.length / rowsPerPage);
  const paginatedData = institutes.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ name: "", location: "", type: "", established: "" });
    setOpen(true);
  };

  const handleOpenEdit = (institute) => {
    setEditId(institute.id);
    setForm({ ...institute });
    setOpen(true);
  };

  const handleSave = () => {
    if (editId) {
      setInstitutes(institutes.map(inst => inst.id === editId ? { ...form, id: editId } : inst));
    } else {
      const newId = institutes.length > 0 ? Math.max(...institutes.map(i => i.id)) + 1 : 1;
      setInstitutes([...institutes, { id: newId, ...form }]);
      setPage(Math.ceil((institutes.length + 1) / rowsPerPage));
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this institute?")) {
      const updatedList = institutes.filter(inst => inst.id !== id);
      setInstitutes(updatedList);
      if (updatedList.length <= (page - 1) * rowsPerPage && page > 1) {
        setPage(page - 1);
      }
    }
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Institutes Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create, Update, or Remove university departments
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ borderRadius: 2 }}>
          Add Institute
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f4f6f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Established</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.established}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton color="primary" size="small" onClick={() => handleOpenEdit(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
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

      {/* Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editId ? "Edit Institute Details" : "Add New Institute"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Institute Name" name="name" value={form.name} onChange={handleChange} variant="outlined" />
            <TextField fullWidth label="Location (Block)" name="location" value={form.location} onChange={handleChange} />
            <TextField fullWidth label="Type" name="type" value={form.type} onChange={handleChange} />
            <TextField fullWidth label="Established Year" type="number" name="established" value={form.established} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ px: 4 }}>
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}