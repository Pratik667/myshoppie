import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Drawer,
  Button,
  useMediaQuery,
  useTheme,
  AccordionDetails,
  AccordionSummary,
  Accordion
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./FilterPanel.css";

const capitalizeWords = (str) =>
  str.replace(/(^\w|\s\w)/g, (l) => l.toUpperCase());

const FilterPanel = ({
  filters,
  event,
  category,
  brand,
  handleSortChange,
  handleCheckboxChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterContent = (
    <Box className="filter-panel" p={2} width={isMobile ? 300 : "auto"}>
      <Accordion className="accordian-mui">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="sort-content"
          id="sort-header"
        >

          <Typography variant="h6" className="filter-title">
            Sort By Date
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordian-details">
          <FormControl fullWidth size="small">
            <InputLabel>Order</InputLabel>
            <Select
              value={filters.sortOrder}
              label="Order"
              onChange={handleSortChange}
            >
              <MenuItem value="asc">Oldest First</MenuItem>
              <MenuItem value="desc">Newest First</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
     
      <Accordion className="accordian-mui">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="event-content"
          id="event-header"
        >
          <Typography variant="h6" className="filter-title">
            Event
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordian-details">
          <FormGroup>
            {event.map((eventData) => (
              <FormControlLabel
                key={eventData}
                control={
                  <Checkbox
                    checked={filters.event.has(eventData)}
                    onChange={() =>
                      handleCheckboxChange("event", eventData)
                    }
                    color="primary"
                  />
                }
                label={capitalizeWords(eventData)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      
      <Accordion className="accordian-mui">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="category-content"
          id="category-header"
        >
          <Typography variant="h6" className="filter-title">
            Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordian-details">
          <FormGroup>
            {category.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={filters.category.has(cat)}
                    onChange={() =>
                      handleCheckboxChange("category", cat)
                    }
                    color="primary"
                  />
                }
                label={capitalizeWords(cat)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
     
      <Accordion className="accordian-mui">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="event-content"
          id="event-header"
        >
          <Typography variant="h6" className="filter-title">
            Brand
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordian-details">
          <FormGroup>
            {brand.map((brandData) => (
              <FormControlLabel
                key={brandData}
                control={
                  <Checkbox
                    checked={filters.brand.has(brandData)}
                    onChange={() =>
                      handleCheckboxChange("brand", brandData)
                    }
                    color="primary"
                  />
                }
                label={capitalizeWords(brandData)}
              />
            ))}
          </FormGroup>
        </AccordionDetails >
      </Accordion >
    </Box >
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box textAlign="right" mb={2}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                borderColor: "#634c9f",
                color: "#634c9f",
                "&:hover": {
                  backgroundColor: "#f1ecfc",
                  borderColor: "#634c9f",
                },
              }}
            >
              Filters
            </Button>
          </Box>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {filterContent}
          </Drawer>
        </>
      ) : (
        filterContent
      )}
    </>
  );
};

export default FilterPanel;
