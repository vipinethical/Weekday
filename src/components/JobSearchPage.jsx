import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from "./JobCard";

function JobSearchPage() {
  const [tabValue, setTabValue] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Filter state
  const [minExperience, setMinExperience] = useState("");
  const [location, setLocation] = useState("");
  const [remoteOnsite, setRemoteOnsite] = useState("");
  const [techStack, setTechStack] = useState("");
  const [role, setRole] = useState("");
  const [minBasePay, setMinBasePay] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [filteredJobs, setFilteredJobs] = useState([]);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle filter changes
  const handleMinExperienceChange = (event) => {
    setMinExperience(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleRemoteOnsiteChange = (event) => {
    setRemoteOnsite(event.target.value);
  };

  const handleTechStackChange = (event) => {
    setTechStack(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleMinBasePayChange = (event) => {
    setMinBasePay(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  // Fetch more jobs for infinite scroll
  const fetchMoreJobs = async () => {
    const limit = 10; // Adjust this number as needed
    const offset = jobs.length;

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit,
            offset,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();

      if (data.jdList && data.totalCount !== undefined) {
        setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
        setHasMore(jobs.length + data.jdList.length < data.totalCount);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setHasMore(false);
    }
  };

  // Apply filters to the jobs list
  const applyFilters = () => {
    let filteredJobs = jobs;

    // Filter by minimum experience
    if (minExperience) {
      filteredJobs = filteredJobs.filter((job) => job.minExp >= minExperience);
    }

    // Filter by location
    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location === location);
    }

    // Filter by remote/onsite
    if (remoteOnsite) {
      filteredJobs = filteredJobs.filter(
        (job) => job.location === remoteOnsite
      );
    }

    // Filter by tech stack
    if (techStack) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobDetailsFromCompany.includes(techStack)
      );
    }

    // Filter by role
    if (role) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobRole.toLowerCase().includes(role.toLowerCase())
      );
    }

    // Filter by minimum base pay
    if (minBasePay) {
      filteredJobs = filteredJobs.filter(
        (job) => job.minJdSalary >= parseInt(minBasePay)
      );
    }

    // Filter by company name
    if (companyName) {
      filteredJobs = filteredJobs.filter((job) =>
        job.companyName.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    return filteredJobs;
  };

  // Update the filtered jobs when the jobs list or filters change
  useEffect(() => {
    setFilteredJobs(applyFilters());
  }, [
    jobs,
    minExperience,
    location,
    remoteOnsite,
    techStack,
    role,
    minBasePay,
    companyName,
  ]);

  useEffect(() => {
    fetchMoreJobs();
  }, []);

  return (
    <Box>
      {/* Top Bar */}
      <AppBar position="static">
        <Toolbar sx={{ background: "white" }}>
          <Typography sx={{ color: "black" }} variant="h6">
            Weekday
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Tabs */}
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Chip
          label={`We, at Weekday, are creating a go-to hub for uncovering the real issues candidates should be aware of before joining a company. Access 150+ company reviews here`}
          variant="outlined"
          sx={{ background: "rgb(217, 254, 211)" }}
        />
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Applied Jobs" />
          <Tab label="Search Jobs" />
        </Tabs>
      </Box>

      {/* Search Jobs */}
      {tabValue === 1 && (
        <Box sx={{ mx: { xs: 1, sm: 3 } }}>
          {/* Filters */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              mt: 3,
              mb: 10,
            }}
          >
            {/* Min Experience */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>Min Experience</InputLabel>
              <Select
                value={minExperience}
                onChange={handleMinExperienceChange}
                label="Min Experience"
              >
                <MenuItem value="">Select experience</MenuItem>
                <MenuItem value="1">1 year</MenuItem>
                <MenuItem value="2">2 years</MenuItem>
                <MenuItem value="3">3 years</MenuItem>
                {/* Add more experience options */}
              </Select>
            </FormControl>

            {/* Location */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                onChange={handleLocationChange}
                label="Location"
              >
                <MenuItem value="">Select location</MenuItem>
                <MenuItem value="delhi ncr">Delhi NCR</MenuItem>
                <MenuItem value="mumbai">Mumbai</MenuItem>
                <MenuItem value="chennai">Chennai</MenuItem>
                <MenuItem value="bangalore">Banglore</MenuItem>
                {/* Add more location options */}
              </Select>
            </FormControl>

            {/* Remote/On-site */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>Remote/On-site</InputLabel>
              <Select
                value={remoteOnsite}
                onChange={handleRemoteOnsiteChange}
                label="Remote/On-site"
              >
                <MenuItem value="">Select option</MenuItem>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="onsite">On-site</MenuItem>
              </Select>
            </FormControl>

            {/* Tech Stack */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>Tech Stack</InputLabel>
              <Select
                value={techStack}
                onChange={handleTechStackChange}
                label="Tech Stack"
              >
                <MenuItem value="">Select tech stack</MenuItem>
                <MenuItem value="react">React</MenuItem>
                <MenuItem value="node">Node.js</MenuItem>
                {/* Add more tech stack options */}
              </Select>
            </FormControl>

            {/* Role */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={handleRoleChange} label="Role">
                <MenuItem value="">Select role</MenuItem>
                <MenuItem value="frontend"> Frontend Developer</MenuItem>
                <MenuItem value="ios">IOS Developer</MenuItem>
                <MenuItem value="android">Android Developer</MenuItem>
                {/* Add more role options */}
              </Select>
            </FormControl>

            {/* Min Base Pay */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <InputLabel>Min Base Pay</InputLabel>
              <Select
                value={minBasePay}
                onChange={handleMinBasePayChange}
                label="Min Base Pay"
              >
                <MenuItem value="">Select min base pay</MenuItem>
                <MenuItem value="50">$50,000</MenuItem>
                <MenuItem value="60">$75,000</MenuItem>
                {/* Add more pay options */}
              </Select>
            </FormControl>

            {/* Company Name */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              <TextField
                value={companyName}
                onChange={handleCompanyNameChange}
                label="Company Name"
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Box>

          {/* Infinite Scroll Job List */}
          <InfiniteScroll
            dataLength={filteredJobs?.length}
            next={fetchMoreJobs}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more jobs to load</p>}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {filteredJobs?.map((job) => (
                <Grid item xs={4} sm={4} md={4} key={job.id}>
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Box>
      )}
    </Box>
  );
}

export default JobSearchPage;
