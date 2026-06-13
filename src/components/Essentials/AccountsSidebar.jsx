import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AccountsSidebar = ({ value, handleChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 240 },
        mt: { xs: 0, md: 8 },
        borderRight: { xs: 0, md: 1 },
        borderBottom: { xs: 1, md: 0 },
        borderColor: "divider",
      }}
    >
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={value}
        onChange={handleChange}
        aria-label="Sidebar Tabs"
        centered={isMobile}
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Billing" {...a11yProps(1)} />
        <Tab label="Security" {...a11yProps(2)} />
        <Tab label="Notifications" {...a11yProps(3)} />
        <Tab label="Integrations" {...a11yProps(4)} />
        <Tab label="Preferences" {...a11yProps(5)} />
      </Tabs>
    </Box>
  );
};

AccountsSidebar.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AccountsSidebar;
