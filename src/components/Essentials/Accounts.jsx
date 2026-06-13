import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountsSidebar from "./AccountsSidebar";
import AccountsTabPanel from "./AccountsTabPanel";
import "./Accounts.css";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Accounts = () => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    state: "",
    zipcode: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    setUpdateMessage("");
    setError("");
  };

  useEffect(() => {
    if (!profile) return;
    setFormData({
      phone: profile.phone || "",
      address: profile.address || "",
      state: profile.state || "",
      zipcode: profile.zipcode || "",
      email: profile.email || "",
    });
  }, [profile]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdateMessage("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setUpdateMessage("");
    const token = localStorage.getItem("token") || localStorage.getItem("jwt");

    if (!token) {
      setError("Authentication token missing. Please sign in.");
      setIsUpdating(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN_URL}/api/users/update-details`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const updated = response.data.user || response.data;
      setProfile(updated);
      setUpdateMessage("Profile updated successfully.");
    } catch (err) {
      setUpdateMessage(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update profile information.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        localStorage.getItem("token") || localStorage.getItem("jwt");
      if (!token) {
        setError("Authentication token missing. Please sign in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_DOMAIN_URL}/api/users/get-profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        setProfile(response.data.user || response.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load profile information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <Box
      className="accounts-page"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <CssBaseline />
      <AccountsSidebar value={value} handleChange={handleChange} />

      <Box
        component="main"
        className="accounts-main-content"
        sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, pt: { xs: 1, md: 4 } }}
      >
        <AccountsTabPanel value={value} index={0}>
          <Paper className="accounts-card" elevation={0}>
            <Stack
              className="accounts-hero"
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 72, height: 72, bgcolor: "primary.main" }}>
                  {initials}
                </Avatar>
                <Box>
                  <Typography component="h1" variant="h5" fontWeight={700}>
                    {profile?.name || "User Profile"}
                  </Typography>
                  <Typography color="text.secondary">
                    {profile?.email || "No email available"}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                alignItems="center"
              >
                <Chip
                  label={profile?.role ? `${profile.role}` : "Guest"}
                  color="primary"
                  variant="filled"
                />
                {profile?.team && (
                  <Chip label={profile.team} variant="outlined" />
                )}
                <Button
                  size="small"
                  variant={isEditing ? "outlined" : "contained"}
                  onClick={handleToggleEdit}
                >
                  {isEditing ? "Cancel" : "Edit profile"}
                </Button>
              </Stack>
            </Stack>

            {isEditing && (
              <Box
                component="form"
                noValidate
                onSubmit={handleUpdate}
                sx={{ mt: 3 }}
              >
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Update your details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      multiline
                      rows={2}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleFormChange}
                      required
                    />
                  </Grid>
                </Grid>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 3 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saving…" : "Save changes"}
                  </Button>
                  {updateMessage && (
                    <Typography
                      color={
                        updateMessage.includes("success")
                          ? "success.main"
                          : "error"
                      }
                    >
                      {updateMessage}
                    </Typography>
                  )}
                </Stack>
              </Box>
            )}

            {loading ? (
              <Box className="profile-placeholder">
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading profile data…</Typography>
              </Box>
            ) : error ? (
              <Typography className="error-message">{error}</Typography>
            ) : (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Account summary
                </Typography>

                <Grid container spacing={2} className="account-info-grid">
                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">
                        Employee ID
                      </Typography>
                      <Typography className="info-item-value">
                        {profile?.eid ?? "—"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">Phone</Typography>
                      <Typography className="info-item-value">
                        {profile?.phone || "—"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">
                        Address
                      </Typography>
                      <Typography className="info-item-value">
                        {profile?.address || "—"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">State</Typography>
                      <Typography className="info-item-value">
                        {profile?.state || "—"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">
                        Zip Code
                      </Typography>
                      <Typography className="info-item-value">
                        {profile?.zipcode || "—"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">
                        Account created
                      </Typography>
                      <Typography className="info-item-value">
                        {formatDate(profile?.createdAt)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box className="info-item">
                      <Typography className="info-item-label">
                        Last updated
                      </Typography>
                      <Typography className="info-item-value">
                        {formatDate(profile?.updatedAt)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </AccountsTabPanel>

        <AccountsTabPanel value={value} index={1}>
          <Paper className="accounts-card" elevation={0}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Billing overview
            </Typography>
            <Typography color="text.secondary">
              Your billing section will show active subscriptions, invoices, and
              payment methods once available.
            </Typography>
          </Paper>
        </AccountsTabPanel>

        <AccountsTabPanel value={value} index={2}>
          <Paper className="accounts-card" elevation={0}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Security settings
            </Typography>
            <Typography color="text.secondary">
              Manage your password, 2-factor authentication, and sign-in
              activity from here.
            </Typography>
          </Paper>
        </AccountsTabPanel>

        <AccountsTabPanel value={value} index={3}>
          <Paper className="accounts-card" elevation={0}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Notification preferences
            </Typography>
            <Typography color="text.secondary">
              Enable or disable email and push alerts for promotions, account
              updates, and security events.
            </Typography>
          </Paper>
        </AccountsTabPanel>

        <AccountsTabPanel value={value} index={4}>
          <Paper className="accounts-card" elevation={0}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Integrations
            </Typography>
            <Typography color="text.secondary">
              Connect third-party apps and services to extend your account
              features.
            </Typography>
          </Paper>
        </AccountsTabPanel>

        <AccountsTabPanel value={value} index={5}>
          <Paper className="accounts-card" elevation={0}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Preferences
            </Typography>
            <Typography color="text.secondary">
              Set your default currency, language, and display preferences for a
              personalized experience.
            </Typography>
          </Paper>
        </AccountsTabPanel>
      </Box>
    </Box>
  );
};

export default Accounts;
