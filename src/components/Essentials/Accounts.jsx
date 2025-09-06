import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import AccountsSidebar from "./AccountsSidebar";
import AccountsTabPanel from "./AccountsTabPanel";

const Accounts = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AccountsSidebar value={value} handleChange={handleChange} />
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <AccountsTabPanel value={value} index={0}>
          Welcome to your <strong>Profile</strong> settings.
        </AccountsTabPanel>
        <AccountsTabPanel value={value} index={1}>
          Manage your <strong>Billing</strong> information here.
        </AccountsTabPanel>
        <AccountsTabPanel value={value} index={2}>
          Update your <strong>Security</strong> preferences.
        </AccountsTabPanel>
        <AccountsTabPanel value={value} index={3}>
          Configure <strong>Notifications</strong> and alerts.
        </AccountsTabPanel>
        <AccountsTabPanel value={value} index={4}>
          View and manage <strong>Integrations</strong>.
        </AccountsTabPanel>
        <AccountsTabPanel value={value} index={5}>
          Set your <strong>Preferences</strong>.
        </AccountsTabPanel>
      </Box>
    </Box>
  );
};

export default Accounts;
