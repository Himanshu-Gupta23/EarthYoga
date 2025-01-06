// src/components/TabsSection.js
import React from "react";
import { Tabs, Tab } from "@mui/material";

// TabsSection component for tab navigation
const TabsSection = ({ value, handleTabChange }) => {
  return (
    <Tabs
      value={value}
      onChange={handleTabChange}
      centered
      sx={{
        marginBottom: "30px",
        "& .MuiTab-root": { fontSize: "1.1rem", fontWeight: 600 },
      }}
    >
      <Tab label="All Sessions" />
      <Tab label="Enrolled Sessions" />
    </Tabs>
  );
};

export default TabsSection;
