import React from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  Typography,
  Button,
  createTheme,
  Chip,
  Avatar,
} from "@mui/material";
import HourglassFullTwoToneIcon from "@mui/icons-material/HourglassFullTwoTone";

// Define your styled components using the styled API
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgb(255, 255, 255)",
  maxWidth: "360px",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px !important",
}));

const CardHeader = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

const JobTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ButtonsContainer = styled(CardContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 10,
}));

const ViewJobButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(73, 67, 218)",
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EasyApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(85, 239, 196)",
  color: theme.palette.success.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

// Define your JobCard component
const JobCard = ({ job }) => {
  return (
    <StyledCard>
      {/* Card header */}
      <CardHeader>
        <Chip
          icon={<HourglassFullTwoToneIcon fontSize="small" />}
          label={`Posted days ago`}
          variant="outlined"
          sx={{ maxWidth: "150px", mb: 2, height: 25 }}
        />
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Avatar src={job?.logoUrl} variant="square" />

          <div
            style={{
              gap: 0,
            }}
          >
            <JobTitle variant="h6" component="h3">
              {job.companyName}
            </JobTitle>
            <CompanyName variant="body2" component="p">
              {job.jobRole}
            </CompanyName>
            <Typography variant="caption" component="p">
              {job.location}
            </Typography>
          </div>
        </div>
      </CardHeader>

      {/* Job description */}

      <CardContent>
        <Typography>
          Estimated salary:{job?.salaryCurrencyCode}&nbsp;
          {job?.minJdSalary} - {job?.maxJdSalary} LPA
        </Typography>
        <Typography variant="body1" component="p">
          {job.jobDetailsFromCompany}
        </Typography>
        <Typography>Minimum Experience:</Typography>
        <Typography>{job?.minExp}</Typography>
      </CardContent>

      {/* Buttons */}
      <ButtonsContainer>
        <EasyApplyButton fullWidth variant="contained">
          Easy Apply
        </EasyApplyButton>
        <ViewJobButton fullWidth variant="contained">
          View Job
        </ViewJobButton>
      </ButtonsContainer>
    </StyledCard>
  );
};

export default JobCard;
