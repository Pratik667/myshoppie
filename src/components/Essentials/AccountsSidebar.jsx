import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AccountsSidebar = ({ value, handleChange }) => {
  return (
    <Box
      sx={{
        width: 240,
        mt: 8,
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Sidebar Tabs"
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
