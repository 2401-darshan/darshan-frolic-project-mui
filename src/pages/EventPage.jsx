import React, { useState } from "react";
import {
  Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, TextField, Typography, IconButton, Stack
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rowsPerPage = 10;

const initialEvents = [
  { id: 1, name: "Tech Fest", date: "2026-02-10", location: "Mumbai", type: "Conference" },
  { id: 2, name: "Hackathon", date: "2026-03-05", location: "Pune", type: "Competition" },
  { id: 3, name: "Workshop", date: "2026-04-15", location: "Delhi", type: "Workshop" },
  { id: 4, name: "Code-A-Thon", date: "2026-04-15", location: "Rajkot", type: "Competition" },
  { id: 5, name: "Book Talk", date: "2026-04-15", location: "Rajkot", type: "Conference" },
  { id: 6, name: "Art Expo", date: "2026-05-20", location: "Chennai", type: "Exhibition" },
  { id: 7, name: "Music Fest", date: "2026-06-25", location: "Bangalore", type: "Festival" },
  { id: 8, name: "Dance Competition", date: "2026-07-30", location: "Kolkata", type: "Competition" },
  { id: 9, name: "Science Fair", date: "2026-08-15", location: "Hyderabad", type: "Exhibition" },
  { id: 10, name: "Drama Workshop", date: "2026-09-10", location: "Ahmedabad", type: "Workshop" },
  { id: 11, name: "Photography Contest", date: "2026-10-05", location: "Surat", type: "Competition" },
  { id: 12, name: "Film Festival", date: "2026-11-20", location: "Jaipur", type: "Festival" },
  { id: 13, name: "Literature Symposium", date: "2026-12-15", location: "Lucknow", type: "Conference" },
  { id: 14, name: "Cultural Fest", date: "2027-01-10", location: "Indore", type: "Festival" },
  { id: 15, name: "Entrepreneurship Summit", date: "2027-02-20", location: "Nagpur", type: "Conference" },
  { id: 16, name: "Robotics Workshop", date: "2027-03-25", location: "Visakhapatnam", type: "Workshop" },
  { id: 17, name: "Environmental Awareness Campaign", date: "2027-04-30", location: "Bhopal", type: "Campaign" },
  { id: 18, name: "Health and Wellness Fair", date: "2027-05-15", location: "Patna", type: "Exhibition" },
  { id: 19, name: "Sports Meet", date: "2027-06-10", location: "Coimbatore", type: "Competition" },
  { id: 20, name: "Food Festival", date: "2027-07-20", location: "Mysore", type: "Festival" }
];

export default function EventPage() {
  const [events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Tracks if we are editing

  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    type: ""
  });

  const totalPages = Math.ceil(events.length / rowsPerPage);
  const paginatedData = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open dialog for NEW event
  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ name: "", date: "", location: "", type: "" });
    setOpen(true);
  };

  // Open dialog for EDITING event
  const handleOpenEdit = (event) => {
    setEditId(event.id);
    setForm({ ...event });
    setOpen(true);
  };

  const handleSave = () => {
    if (editId) {
      // Update existing
      setEvents(events.map(ev => ev.id === editId ? { ...form, id: editId } : ev));
    } else {
      // Add new
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      setEvents([...events, { id: newId, ...form }]);
      setPage(totalPages);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const filtered = events.filter(ev => ev.id !== id);
      setEvents(filtered);
      // Adjust page if last item on page is deleted
      if (filtered.length <= (page - 1) * rowsPerPage && page > 1) {
        setPage(page - 1);
      }
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={600}>Events Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage all university events and details</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add Event
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell fontWeight={500}>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
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

      {/* Dialog for Add/Update */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Update Event" : "Add New Event"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Event Name" name="name" value={form.name} onChange={handleChange} />
            <TextField fullWidth type="date" name="date" label="Date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Location" name="location" value={form.location} onChange={handleChange} />
            <TextField fullWidth label="Type" name="type" value={form.type} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editId ? "Update Changes" : "Save Event"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}