import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const AccountsTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body1">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

AccountsTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default AccountsTabPanel;
