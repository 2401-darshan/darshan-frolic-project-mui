import React, { useState, useEffect } from "react";
import {
  Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Typography, IconButton, Stack, CircularProgress,
  MenuItem, Select, InputLabel, FormControl, Chip, Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { api } from "../Api/Axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const eventTheme = createTheme({
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

const rankColors = {
  1: { bg: "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)", color: "#5D4037", label: "🥇 1st Place" },
  2: { bg: "linear-gradient(135deg, #C0C0C0 0%, #9E9E9E 100%)", color: "#37474F", label: "🥈 2nd Place" },
  3: { bg: "linear-gradient(135deg, #CD7F32 0%, #A1887F 100%)", color: "#3E2723", label: "🥉 3rd Place" },
};

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // ── Group states 
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [groupEventId, setGroupEventId] = useState("");
  const [groupName, setGroupName] = useState("");

  // ── Show Groups states 
  const [showGroupsOpen, setShowGroupsOpen] = useState(false);
  const [showGroupsEventId, setShowGroupsEventId] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");

  // ── View Winners states 
  const [viewWinnersOpen, setViewWinnersOpen] = useState(false);
  const [viewWinnersEventId, setViewWinnersEventId] = useState("");
  const [viewWinnersList, setViewWinnersList] = useState([]);
  const [viewWinnersLoading, setViewWinnersLoading] = useState(false);

  // ── Declare Winner states 
  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false);
  const [winnerEventId, setWinnerEventId] = useState("");
  const [winnerEventName, setWinnerEventName] = useState("");
  const [winnerGroups, setWinnerGroups] = useState([]);
  const [winnerGroupId, setWinnerGroupId] = useState("");
  const [winnerSequence, setWinnerSequence] = useState("");
  const [existingWinners, setExistingWinners] = useState([]);
  const [winnersLoading, setWinnersLoading] = useState(false);

  // ── Edit/Delete Winner states 
  const [editWinnerDialogOpen, setEditWinnerDialogOpen] = useState(false);
  const [editingWinner, setEditingWinner] = useState(null);
  const [newWinnerSequence, setNewWinnerSequence] = useState("");

  // ── Participants states 
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);

  // ── Add/Edit Participant states 
  const [participantFormOpen, setParticipantFormOpen] = useState(false);
  const [editingParticipantId, setEditingParticipantId] = useState(null);
  const [participantForm, setParticipantForm] = useState({
    ParticipantName: "",
    ParticipantEnrollmentNumber: "",
    ParticipantInstituteName: "",
    ParticipantCity: "",
    ParticipantMobile: "",
    ParticipantEmail: "",
    IsGroupLeader: false
  });

  const [form, setForm] = useState({
    EventName: "",
    GroupMinParticipants: 0,
    GroupMaxParticipants: 0,
    EventFees: 0,
    EventFirstPrice: "",
    EventSecondPrice: "",
    EventThirdPrice: "",
    DepartmentID: "",
    EventCoOrdinatorID: "",
    EventLocation: "",
    MaxGroupsAllowed: 0
  });

  const totalPages = Math.ceil(events.length / rowsPerPage);
  const paginatedData = events.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const [isAdmin, setIsAdmin] = useState(false);

  // ── 1. Fetch all events on mount 
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
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/events");
      const data = res.data.events || [];

      setEvents(
        data.map((evt) => ({
          id: evt._id,
          name: evt.EventName,
          coordinatorName: evt.EventCoOrdinatorID?.UserName,
          coordinatorId: evt.EventCoOrdinatorID?._id || evt.EventCoOrdinatorID,
          fees: evt.EventFees,
          departmentId: evt.DepartmentID,
          location: evt.EventLocation,
          maxGroups: evt.MaxGroupsAllowed,
          groupMin: evt.GroupMinParticipants,
          groupMax: evt.GroupMaxParticipants,
          firstPrice: evt.EventFirstPrice,
          secondPrice: evt.EventSecondPrice,
          thirdPrice: evt.EventThirdPrice
        }))
      );
    } catch (err) {
      console.error("Fetch events error:", err);
      alert("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  // ── 2. Fetch single event by ID 
  const fetchEventById = async (id) => {
    try {
      const res = await api.get(`/events/${id}`);
      const evt = res.data.event;

      setForm({
        EventName: evt.EventName || "",
        EventTagline: evt.EventTagline || "",
        EventImage: evt.EventImage || "",
        EventDescription: evt.EventDescription || "",
        GroupMinParticipants: evt.GroupMinParticipants ?? "",
        GroupMaxParticipants: evt.GroupMaxParticipants ?? "",
        EventFees: evt.EventFees ?? 0,
        EventFirstPrice: evt.EventFirstPrice ?? "",
        EventSecondPrice: evt.EventSecondPrice ?? "",
        EventThirdPrice: evt.EventThirdPrice ?? "",
        DepartmentID: evt.DepartmentID || "",
        EventCoOrdinatorID: evt.EventCoOrdinatorID || "",
        EventMainStudentCoOrdinatorName: evt.EventMainStudentCoOrdinatorName || "",
        EventMainStudentCoOrdinatorPhone: evt.EventMainStudentCoOrdinatorPhone || "",
        EventMainStudentCoOrdinatorEmail: evt.EventMainStudentCoOrdinatorEmail || "",
        EventLocation: evt.EventLocation || "",
        MaxGroupsAllowed: evt.MaxGroupsAllowed ?? 0
      });
    } catch (err) {
      console.error("Fetch event by ID error:", err);
      alert("Failed to load event details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "GroupMinParticipants", "GroupMaxParticipants", "EventFees",
      "EventFirstPrice", "EventSecondPrice", "EventThirdPrice", "MaxGroupsAllowed"
    ];
    setForm({
      ...form,
      [name]: numericFields.includes(name) ? (value === "" ? "" : Number(value)) : value
    });
  };

  const emptyForm = {
    EventName: "",
    GroupMinParticipants: 0,
    GroupMaxParticipants: 0,
    EventFees: 0,
    EventFirstPrice: "",
    EventSecondPrice: "",
    EventThirdPrice: "",
    DepartmentID: "",
    EventCoOrdinatorID: "",
    EventLocation: "",
    MaxGroupsAllowed: 0
  };

  // ── ADD 
  const handleOpenAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  // ── EDIT 
  const handleOpenEdit = async (row) => {
    setEditId(row.id);
    setForm(emptyForm);
    setOpen(true);
    await fetchEventById(row.id);
  };

  // ── DELETE 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter((evt) => evt.id !== id));
      } catch (err) {
        console.error("Delete event error:", err);
        alert("Failed to delete event. Make sure you have Admin permissions.");
      }
    }
  };

  // ── SAVE — Create or Update based on editId 
  const handleSave = async () => {
    if (!form.EventName || !form.DepartmentID || !form.EventCoOrdinatorID) {
      alert("EventName, DepartmentID and EventCoOrdinatorID are required");
      return;
    }

    if (editId) {
      try {
        const res = await api.patch(`/events/${editId}`, form);
        const updated = res.data.updatedEvent;

        setEvents(events.map((evt) =>
          evt.id === editId
            ? {
              id: updated._id,
              name: updated.EventName,
              tagline: updated.EventTagline,
              image: updated.EventImage,
              description: updated.EventDescription,
              groupMin: updated.GroupMinParticipants,
              groupMax: updated.GroupMaxParticipants,
              fees: updated.EventFees,
              firstPrice: updated.EventFirstPrice,
              secondPrice: updated.EventSecondPrice,
              thirdPrice: updated.EventThirdPrice,
              departmentId: updated.DepartmentID,
              coordinatorId: updated.EventCoOrdinatorID,
              studentCoordinatorName: updated.EventMainStudentCoOrdinatorName,
              studentCoordinatorPhone: updated.EventMainStudentCoOrdinatorPhone,
              studentCoordinatorEmail: updated.EventMainStudentCoOrdinatorEmail,
              location: updated.EventLocation,
              maxGroups: updated.MaxGroupsAllowed
            }
            : evt
        ));
        setOpen(false);
      } catch (err) {
        console.error("Update event error:", err);
        alert("Failed to update event.");
      }
    } else {
      try {
        const res = await api.post("/events", form);
        const newEvt = res.data.event;

        setEvents([
          ...events,
          {
            id: newEvt._id,
            name: newEvt.EventName,
            tagline: newEvt.EventTagline,
            image: newEvt.EventImage,
            description: newEvt.EventDescription,
            groupMin: newEvt.GroupMinParticipants,
            groupMax: newEvt.GroupMaxParticipants,
            fees: newEvt.EventFees,
            firstPrice: newEvt.EventFirstPrice,
            secondPrice: newEvt.EventSecondPrice,
            thirdPrice: newEvt.EventThirdPrice,
            departmentId: newEvt.DepartmentID,
            coordinatorId: newEvt.EventCoOrdinatorID,
            studentCoordinatorName: newEvt.EventMainStudentCoOrdinatorName,
            studentCoordinatorPhone: newEvt.EventMainStudentCoOrdinatorPhone,
            studentCoordinatorEmail: newEvt.EventMainStudentCoOrdinatorEmail,
            location: newEvt.EventLocation,
            maxGroups: newEvt.MaxGroupsAllowed
          }
        ]);
        setOpen(false);
      } catch (err) {
        console.error("Create event error:", err);
        alert("Failed to create event.");
      }
    }
  };

  // ── GROUP FUNCTIONS 

  const handleOpenGroupDialog = () => {
    setGroupEventId("");
    setGroupName("");
    setGroupDialogOpen(true);
  };

  const handleCreateGroup = async () => {
    if (!groupEventId || !groupName.trim()) {
      alert("Please select an event and enter a group name.");
      return;
    }
    try {
      await api.post(`/events/${groupEventId}/groups`, { GroupName: groupName.trim() });
      alert("Group created successfully!");
      setGroupDialogOpen(false);
      setGroupName("");
      setGroupEventId("");
    } catch (err) {
      console.error("Create group error:", err);
      const msg = err.response?.data?.message || "Failed to create group.";
      alert(msg);
    }
  };

  // ── SHOW GROUPS FUNCTIONS 

  const handleOpenShowGroups = () => {
    setShowGroupsEventId("");
    setGroups([]);
    setSelectedEventName("");
    setShowGroupsOpen(true);
  };

  const handleFetchGroups = async (eventId) => {
    if (!eventId) return;
    setGroupsLoading(true);
    try {
      const res = await api.get(`/events/${eventId}/groups`);
      setGroups(res.data.groups || []);
    } catch (err) {
      console.error("Fetch groups error:", err);
      const msg = err.response?.data?.message || "Failed to load groups.";
      alert(msg);
      setGroups([]);
    } finally {
      setGroupsLoading(false);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await api.delete(`/groups/${groupId}`);
      setGroups(groups.filter((g) => g._id !== groupId));
      alert("Group deleted successfully!");
    } catch (err) {
      console.error("Delete group error:", err);
      const msg = err.response?.data?.message || "Failed to delete group.";
      alert(msg);
    }
  };

  // ── VIEW WINNERS FUNCTIONS 

  const handleOpenViewWinners = () => {
    setViewWinnersEventId("");
    setViewWinnersList([]);
    setSelectedEventName("");
    setViewWinnersOpen(true);
  };

  const handleFetchWinners = async (eventId) => {
    if (!eventId) return;
    setViewWinnersLoading(true);
    try {
      const res = await api.get(`/events/${eventId}/winners`);
      setViewWinnersList(res.data.winners || []);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Fetch winners error:", err);
      }
      setViewWinnersList([]);
    } finally {
      setViewWinnersLoading(false);
    }
  };

  // ── DECLARE WINNER FUNCTIONS

  const handleOpenWinnerDialog = async (row) => {
    setWinnerEventId(row.id);
    setWinnerEventName(row.name);
    setWinnerGroupId("");
    setWinnerSequence("");
    setExistingWinners([]);
    setWinnerGroups([]);
    setWinnerDialogOpen(true);
    setWinnersLoading(true);

    try {
      const groupsRes = await api.get(`/events/${row.id}/groups`);
      setWinnerGroups(groupsRes.data.groups || []);
    } catch (err) {
      console.error("Fetch groups for winner error:", err);
      setWinnerGroups([]);
    }

    try {
      const winnersRes = await api.get(`/events/${row.id}/winners`);
      setExistingWinners(winnersRes.data.winners || []);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Fetch winners error:", err);
      }
      setExistingWinners([]);
    } finally {
      setWinnersLoading(false);
    }
  };

  const handleDeclareWinner = async () => {
    if (!winnerGroupId || !winnerSequence) {
      alert("Please select a group and a rank.");
      return;
    }
    try {
      await api.post(`/events/${winnerEventId}/winners`, {
        GroupID: winnerGroupId,
        sequence: Number(winnerSequence)
      });
      alert("Winner declared successfully!");
      try {
        const winnersRes = await api.get(`/events/${winnerEventId}/winners`);
        setExistingWinners(winnersRes.data.winners || []);
      } catch {
        setExistingWinners([]);
      }
      setWinnerGroupId("");
      setWinnerSequence("");
    } catch (err) {
      console.error("Declare winner error:", err);
      const msg = err.response?.data?.message || "Failed to declare winner.";
      alert(msg);
    }
  };

  const handleOpenEditWinner = (winner) => {
    setEditingWinner(winner);
    setNewWinnerSequence(winner.sequence);
    setEditWinnerDialogOpen(true);
  };

  const handleUpdateWinner = async () => {
    try {
      await api.patch(`/winners/${editingWinner._id}`, { sequence: Number(newWinnerSequence) });
      alert("Winner updated successfully!");
      setEditWinnerDialogOpen(false);
      if (viewWinnersEventId) {
        handleFetchWinners(viewWinnersEventId);
      }
    } catch (err) {
      console.error("Update winner error:", err);
      alert(err.response?.data?.message || "Failed to update winner");
    }
  };

  const handleDeleteWinner = async (winnerId) => {
    if (!window.confirm("Are you sure you want to delete this winner?")) return;
    try {
      await api.delete(`/winners/${winnerId}`);
      alert("Winner deleted successfully!");
      if (viewWinnersEventId) {
        handleFetchWinners(viewWinnersEventId);
      }
    } catch (err) {
      console.error("Delete winner error:", err);
      alert(err.response?.data?.message || "Failed to delete winner.");
    }
  };

  // ── PARTICIPANTS FUNCTIONS

  const handleOpenParticipants = (groupId, groupName) => {
    setSelectedGroupId(groupId);
    setSelectedGroupName(groupName);
    setParticipants([]);
    setParticipantsOpen(true);
    handleFetchParticipants(groupId);
  };

  const handleFetchParticipants = async (groupId) => {
    if (!groupId) return;
    setParticipantsLoading(true);
    try {
      const res = await api.get(`/groups/${groupId}/participants`);
      setParticipants(res.data.participants || []);
    } catch (err) {
      console.error("Fetch participants error:", err);
      if (err.response?.status !== 404) {
        setParticipants([]);
      }
    } finally {
      setParticipantsLoading(false);
    }
  };

  const handleOpenAddParticipant = () => {
    setEditingParticipantId(null);
    setParticipantForm({
      ParticipantName: "",
      ParticipantEnrollmentNumber: "",
      ParticipantInstituteName: "",
      ParticipantCity: "",
      ParticipantMobile: "",
      ParticipantEmail: "",
      IsGroupLeader: false
    });
    setParticipantFormOpen(true);
  };

  const handleOpenEditParticipant = (participant) => {
    setEditingParticipantId(participant._id);
    setParticipantForm({
      ParticipantName: participant.ParticipantName || "",
      ParticipantEnrollmentNumber: participant.ParticipantEnrollmentNumber || "",
      ParticipantInstituteName: participant.ParticipantInstituteName || "",
      ParticipantCity: participant.ParticipantCity || "",
      ParticipantMobile: participant.ParticipantMobile || "",
      ParticipantEmail: participant.ParticipantEmail || "",
      IsGroupLeader: participant.IsGroupLeader || false
    });
    setParticipantFormOpen(true);
  };

  const handleParticipantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParticipantForm({
      ...participantForm,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSaveParticipant = async () => {
    if (!participantForm.ParticipantName || (!participantForm.ParticipantEnrollmentNumber && !editingParticipantId)) {
      alert("Participant Name and Enrollment Number are required.");
      return;
    }

    try {
      if (editingParticipantId) {
        await api.patch(`/participants/${editingParticipantId}`, participantForm);
        alert("Participant updated successfully!");
      } else {
        await api.post(`/groups/${selectedGroupId}/participants`, {
          ...participantForm,
          GroupID: selectedGroupId
        });
        alert("Participant added successfully!");
      }
      setParticipantFormOpen(false);
      handleFetchParticipants(selectedGroupId);
    } catch (err) {
      console.error("Save participant error:", err);
      const msg = err.response?.data?.message || "Failed to save participant.";
      alert(msg);
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    if (!window.confirm("Are you sure you want to delete this participant?")) return;
    try {
      await api.delete(`/participants/${participantId}`);
      alert("Participant deleted successfully!");
      handleFetchParticipants(selectedGroupId);
    } catch (err) {
      console.error("Delete participant error:", err);
      const msg = err.response?.data?.message || "Failed to delete participant.";
      alert(msg);
    }
  };

  const takenPositions = existingWinners.map((w) => w.sequence);
  const takenGroupIds = existingWinners.map((w) => w.GroupID?._id || w.GroupID);

  return (
    <ThemeProvider theme={eventTheme}>
      <Box p={4} sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={700}>Events Management</Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all events here.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            {isAdmin && (
              <Button
                variant="outlined"
                startIcon={<GroupAddIcon />}
                onClick={handleOpenGroupDialog}
                sx={{ borderRadius: 2 }}
              >
                Add Group
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<GroupsIcon />}
              onClick={handleOpenShowGroups}
              sx={{ borderRadius: 2 }}
            >
              Show Groups
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmojiEventsIcon />}
              onClick={handleOpenViewWinners}
              sx={{ borderRadius: 2 }}
            >
              View Winners
            </Button>
            {isAdmin && (
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ borderRadius: 2 }}>
                Add Event
              </Button>
            )}
          </Stack>
        </Box>

        {/* Table */}
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
                  <TableCell sx={{ fontWeight: 600 }}>Event Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Max Groups</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Fees</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                  {isAdmin && <TableCell align="left" sx={{ fontWeight: 600 }}>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: "text.secondary" }}>
                      No events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                      <TableCell>{row.maxGroups}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      {isAdmin && (
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-start">
                            <Tooltip title="Edit Event">
                              <IconButton color="primary" size="small" onClick={() => handleOpenEdit(row)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Event">
                              <IconButton color="error" size="small" onClick={() => handleDelete(row.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Declare Winner">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenWinnerDialog(row)}
                                sx={{ color: "#FFA000" }}
                              >
                                <EmojiEventsIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
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

        {/* ── Add / Edit Event Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editId ? "Edit Event Details" : "Add New Event"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="Event Name" name="EventName" value={form.EventName} onChange={handleChange} fullWidth required />
              <TextField label="Department ID" name="DepartmentID" value={form.DepartmentID} onChange={handleChange} fullWidth required />
              <TextField label="Coordinator ID" name="EventCoOrdinatorID" value={form.EventCoOrdinatorID} onChange={handleChange} fullWidth required />
              <TextField label="Min Participants per Group" name="GroupMinParticipants" type="number" value={form.GroupMinParticipants} onChange={handleChange} fullWidth />
              <TextField label="Max Participants per Group" name="GroupMaxParticipants" type="number" value={form.GroupMaxParticipants} onChange={handleChange} fullWidth />
              <TextField label="Max Groups Allowed" name="MaxGroupsAllowed" type="number" value={form.MaxGroupsAllowed} onChange={handleChange} fullWidth />
              <TextField label="Event Fees" name="EventFees" type="number" value={form.EventFees} onChange={handleChange} fullWidth />
              <TextField label="1st Prize Amount" name="EventFirstPrice" type="number" value={form.EventFirstPrice} onChange={handleChange} fullWidth />
              <TextField label="2nd Prize Amount" name="EventSecondPrice" type="number" value={form.EventSecondPrice} onChange={handleChange} fullWidth />
              <TextField label="3rd Prize Amount" name="EventThirdPrice" type="number" value={form.EventThirdPrice} onChange={handleChange} fullWidth />
              <TextField label="Event Location" name="EventLocation" value={form.EventLocation} onChange={handleChange} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit" variant="outlined">Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!form.EventName || !form.DepartmentID || !form.EventCoOrdinatorID}
            >
              {editId ? "Update" : "Create Event"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ── Add Group Dialog  */}
        <Dialog open={groupDialogOpen} onClose={() => setGroupDialogOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
            <GroupAddIcon color="primary" /> Add Group to Event
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} mt={1}>
              <FormControl fullWidth required>
                <InputLabel>Select Event</InputLabel>
                <Select
                  value={groupEventId}
                  label="Select Event"
                  onChange={(e) => setGroupEventId(e.target.value)}
                >
                  {events.map((evt) => (
                    <MenuItem key={evt.id} value={evt.id}>
                      {evt.name} {evt.maxGroups ? `(Max: ${evt.maxGroups})` : ""}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                fullWidth
                required
                placeholder="e.g. Team Alpha"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setGroupDialogOpen(false)} color="inherit" variant="outlined">Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreateGroup}
              disabled={!groupEventId || !groupName.trim()}
              startIcon={<GroupAddIcon />}
            >
              Create Group
            </Button>
          </DialogActions>
        </Dialog>

        {/* ── Show Groups Dialog  */}
        <Dialog open={showGroupsOpen} onClose={() => setShowGroupsOpen(false)} fullWidth maxWidth="md" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
            <GroupsIcon color="primary" /> Event Groups
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <FormControl fullWidth required>
                <InputLabel>Select Event</InputLabel>
                <Select
                  value={showGroupsEventId}
                  label="Select Event"
                  size="small"
                  onChange={(e) => {
                    const evtId = e.target.value;
                    setShowGroupsEventId(evtId);
                    const evt = events.find((ev) => ev.id === evtId);
                    setSelectedEventName(evt?.name || "");
                    handleFetchGroups(evtId);
                  }}
                >
                  {events.map((evt) => (
                    <MenuItem key={evt.id} value={evt.id}>
                      {evt.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedEventName && (
                <Typography variant="subtitle1" fontWeight={600} color="primary">
                  Groups for: {selectedEventName}
                </Typography>
              )}

              {groupsLoading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : groups.length === 0 && showGroupsEventId ? (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                  No groups found for this event.
                </Typography>
              ) : groups.length > 0 ? (
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "rgba(10,0,0,0.5)" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Group Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Present</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groups.map((grp, idx) => (
                        <TableRow key={grp._id} hover>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{grp.GroupName}</TableCell>
                          <TableCell>
                            <Chip
                              label={grp.IsPaymentDone ? "Paid" : "Pending"}
                              size="small"
                              color={grp.IsPaymentDone ? "success" : "warning"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={grp.IsPresent ? "Yes" : "No"}
                              size="small"
                              color={grp.IsPresent ? "info" : "default"}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <Tooltip title="Participants">
                                <IconButton color="info" size="small" onClick={() => handleOpenParticipants(grp._id, grp.GroupName)}>
                                  <PeopleIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              {isAdmin && (
                                <Tooltip title="Delete Group">
                                  <IconButton color="error" size="small" onClick={() => handleDeleteGroup(grp._id)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowGroupsOpen(false)} color="inherit" variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* ── View Winners Dialog ──────────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Dialog open={viewWinnersOpen} onClose={() => setViewWinnersOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
            <EmojiEventsIcon sx={{ color: "#FFA000" }} /> Event Winners
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <FormControl fullWidth required>
                <InputLabel>Select Event</InputLabel>
                <Select
                  value={viewWinnersEventId}
                  label="Select Event"
                  onChange={(e) => {
                    const evtId = e.target.value;
                    setViewWinnersEventId(evtId);
                    const evt = events.find((ev) => ev.id === evtId);
                    setSelectedEventName(evt?.name || "");
                    handleFetchWinners(evtId);
                  }}
                >
                  {events.map((evt) => (
                    <MenuItem key={evt.id} value={evt.id}>
                      {evt.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedEventName && (
                <Typography variant="subtitle1" fontWeight={600} color="primary">
                  Winners for: {selectedEventName}
                </Typography>
              )}

              {viewWinnersLoading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : viewWinnersList.length === 0 && viewWinnersEventId ? (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                  No winners found or declared for this event yet.
                </Typography>
              ) : viewWinnersList.length > 0 ? (
                <Stack spacing={1}>
                  {viewWinnersList.map((w) => {
                    const rank = rankColors[w.sequence] || {};
                    return (
                      <Box
                        key={w._id}
                        sx={{
                          background: rank.bg || "#f5f5f5",
                          color: rank.color || "#333",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }}
                      >
                        <Box>
                          <Typography fontWeight={700} fontSize="0.95rem">
                            {rank.label || `Position ${w.sequence}`}
                          </Typography>
                          <Typography fontWeight={500} fontSize="0.95rem">
                            {w.GroupID?.GroupName || "Unknown Group"}
                          </Typography>
                        </Box>
                        {isAdmin && (
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Edit Rank">
                              <IconButton size="small" onClick={() => handleOpenEditWinner(w)} sx={{ color: "text.primary", bgcolor: "rgba(255,255,255,0.3)" }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Winner">
                              <IconButton size="small" onClick={() => handleDeleteWinner(w._id)} sx={{ color: "error.main", bgcolor: "rgba(255,255,255,0.3)" }}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        )}
                      </Box>
                    );
                  })}
                </Stack>
              ) : null}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setViewWinnersOpen(false)} color="inherit" variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* ── Declare Winner Dialog ────────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Dialog open={winnerDialogOpen} onClose={() => setWinnerDialogOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
            <EmojiEventsIcon sx={{ color: "#FFA000" }} /> Declare Winner — {winnerEventName}
          </DialogTitle>
          <DialogContent>
            {winnersLoading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : (
              <Stack spacing={3} mt={1}>
                {/* Existing Winners */}
                {existingWinners.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={1.5} color="text.secondary">
                      Current Winners
                    </Typography>
                    <Stack spacing={1}>
                      {existingWinners.map((w) => {
                        const rank = rankColors[w.sequence] || {};
                        return (
                          <Box
                            key={w._id}
                            sx={{
                              background: rank.bg || "#f5f5f5",
                              color: rank.color || "#333",
                              borderRadius: 2,
                              px: 2.5,
                              py: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            }}
                          >
                            <Typography fontWeight={700} fontSize="0.95rem">
                              {rank.label || `Position ${w.sequence}`}
                            </Typography>
                            <Typography fontWeight={500} fontSize="0.95rem">
                              {w.GroupID?.GroupName || "Unknown Group"}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                )}

                {/* Declare new winner */}
                {takenPositions.length < 3 && (
                  <>
                    <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                      Declare New Winner
                    </Typography>
                    <FormControl fullWidth required>
                      <InputLabel>Select Group</InputLabel>
                      <Select
                        value={winnerGroupId}
                        label="Select Group"
                        onChange={(e) => setWinnerGroupId(e.target.value)}
                      >
                        {winnerGroups
                          .filter((g) => !takenGroupIds.includes(g._id))
                          .map((grp) => (
                            <MenuItem key={grp._id} value={grp._id}>
                              {grp.GroupName}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                      <InputLabel>Select Rank</InputLabel>
                      <Select
                        value={winnerSequence}
                        label="Select Rank"
                        onChange={(e) => setWinnerSequence(e.target.value)}
                      >
                        {[1, 2, 3]
                          .filter((seq) => !takenPositions.includes(seq))
                          .map((seq) => (
                            <MenuItem key={seq} value={seq}>
                              {rankColors[seq].label}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </>
                )}

                {takenPositions.length >= 3 && (
                  <Typography
                    variant="body2"
                    textAlign="center"
                    color="success.main"
                    fontWeight={600}
                    py={2}
                  >
                    ✅ All winner positions have been declared for this event!
                  </Typography>
                )}

                {winnerGroups.length === 0 && !winnersLoading && (
                  <Typography variant="body2" color="error" textAlign="center" py={2}>
                    No groups found for this event. Create groups first before declaring winners.
                  </Typography>
                )}
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setWinnerDialogOpen(false)} color="inherit" variant="outlined">Close</Button>
            {takenPositions.length < 3 && winnerGroups.length > 0 && (
              <Button
                variant="contained"
                onClick={handleDeclareWinner}
                disabled={!winnerGroupId || !winnerSequence}
                startIcon={<EmojiEventsIcon />}
                sx={{
                  background: "linear-gradient(135deg, #FFA000 0%, #FF6F00 100%)",
                  "&:hover": { background: "linear-gradient(135deg, #FF8F00 0%, #E65100 100%)" }
                }}
              >
                Declare Winner
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* ── Manage Participants Dialog ────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Dialog open={participantsOpen} onClose={() => setParticipantsOpen(false)} fullWidth maxWidth="md" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <PeopleIcon color="primary" /> Participants — {selectedGroupName}
            </Box>
            {isAdmin && (
              <Button
                variant="contained"
                size="small"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddParticipant}
                sx={{ borderRadius: 2 }}
              >
                Add Participant
              </Button>
            )}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              {participantsLoading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              ) : participants.length === 0 ? (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                  No participants found for this group.
                </Typography>
              ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "rgba(0,0,0,0.2)" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Enrollment</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                        {isAdmin && <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {participants.map((p) => (
                        <TableRow key={p._id} hover>
                          <TableCell sx={{ fontWeight: 500 }}>{p.ParticipantName}</TableCell>
                          <TableCell>{p.ParticipantEnrollmentNumber}</TableCell>
                          <TableCell>{p.ParticipantMobile}</TableCell>
                          <TableCell>
                            {p.IsGroupLeader ? (
                              <Chip label="Leader" size="small" color="primary" />
                            ) : (
                              <Chip label="Member" size="small" variant="outlined" />
                            )}
                          </TableCell>
                          {isAdmin && (
                            <TableCell align="right">
                              <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Tooltip title="Edit Participant">
                                  <IconButton color="primary" size="small" onClick={() => handleOpenEditParticipant(p)}>
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Participant">
                                  <IconButton color="error" size="small" onClick={() => handleDeleteParticipant(p._id)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setParticipantsOpen(false)} color="inherit" variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* ── Add/Edit Participant Form Dialog ──────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Dialog open={participantFormOpen} onClose={() => setParticipantFormOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editingParticipantId ? "Edit Participant" : "Add Participant"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} mt={1}>
              <TextField
                label="Participant Name"
                name="ParticipantName"
                value={participantForm.ParticipantName}
                onChange={handleParticipantChange}
                fullWidth
                required
              />
              <TextField
                label="Enrollment Number"
                name="ParticipantEnrollmentNumber"
                value={participantForm.ParticipantEnrollmentNumber}
                onChange={handleParticipantChange}
                fullWidth
                required={!editingParticipantId}
                disabled={!!editingParticipantId}
              />
              <TextField
                label="Institute Name"
                name="ParticipantInstituteName"
                value={participantForm.ParticipantInstituteName}
                onChange={handleParticipantChange}
                fullWidth
              />
              <TextField
                label="City"
                name="ParticipantCity"
                value={participantForm.ParticipantCity}
                onChange={handleParticipantChange}
                fullWidth
              />
              <TextField
                label="Mobile"
                name="ParticipantMobile"
                value={participantForm.ParticipantMobile}
                onChange={handleParticipantChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="ParticipantEmail"
                type="email"
                value={participantForm.ParticipantEmail}
                onChange={handleParticipantChange}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={participantForm.IsGroupLeader}
                    onChange={handleParticipantChange}
                    name="IsGroupLeader"
                    color="primary"
                  />
                }
                label="Is Group Leader"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setParticipantFormOpen(false)} color="inherit" variant="outlined">Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveParticipant}
              disabled={!participantForm.ParticipantName || (!participantForm.ParticipantEnrollmentNumber && !editingParticipantId)}
            >
              {editingParticipantId ? "Update" : "Add"} Participant
            </Button>
          </DialogActions>
        </Dialog>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* ── Edit Winner Rank Dialog ──────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Dialog open={editWinnerDialogOpen} onClose={() => setEditWinnerDialogOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { bgcolor: '#111827', backgroundImage: 'none' } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            Edit Winner Rank
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <FormControl fullWidth required>
                <InputLabel>Select Rank</InputLabel>
                <Select
                  value={newWinnerSequence}
                  label="Select Rank"
                  onChange={(e) => setNewWinnerSequence(e.target.value)}
                >
                  {[1, 2, 3].map((seq) => (
                    <MenuItem key={seq} value={seq}>
                      {rankColors[seq].label} (Sequence {seq})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setEditWinnerDialogOpen(false)} color="inherit" variant="outlined">Cancel</Button>
            <Button
              variant="contained"
              onClick={handleUpdateWinner}
              disabled={!newWinnerSequence || newWinnerSequence === editingWinner?.sequence}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}