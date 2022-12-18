import React from "react";
import { getDistance, getPreciseDistance } from "geolib";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import "./calDis.css";

const CalculateDistance = () => {
  const dis = getDistance(
    { latitude: 10.8167, longitude: 106.6333 },
    { latitude: 21.0245, longitude: 105.8412 }
  );
  const pdis = getPreciseDistance(
    { latitude: 20.0504188, longitude: 64.4139099 },
    { latitude: 51.528308, longitude: -0.3817765 }
  );
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="container">
        <div className="row">
          <p className="title">
            Example to Calculate Distance Between Two Locations
          </p>
          <p className="sub-title">
            Distance between
            {"\n"}
            India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
          </p>
          <button
            className="btn-dis"
            onClick={() => alert(`Distance ${dis} Meter OR ${dis / 1000} KM`)}
          >
            Get Distance
          </button>
          <p className="sub-title">
            Precise Distance between
            {"\n"}
            India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
          </p>
          <button
            className="btn-dis"
            onClick={() => alert(`Distance ${pdis} Meter OR ${pdis / 1000} KM`)}
          >
            Get Precise Distance
          </button>
          {/* test */}
          <Button
            disabled={open}
            onClick={() => {
              setOpen(true);
            }}
          >
            Test
          </Button>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Distance {pdis} Meter OR {pdis / 1000} KM
            </Alert>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default CalculateDistance;
