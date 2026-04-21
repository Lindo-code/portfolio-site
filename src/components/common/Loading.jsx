import { Box } from "@mui/material";

const Loading = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    marginTop="-100px"
    minHeight="100vh"
  >
    <Box className="dot-flashing" />
    <style>
      {`
        .dot-flashing {
          position: relative;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: green;
          color: red;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% { background-color: red; }
          50% { background-color: green; }
          100% { background-color: red; }
        }
      `}
    </style>
    <p style={{ color: "black", fontWeight: "600" }}>Loading...</p>
  </Box>
);

export default Loading;
