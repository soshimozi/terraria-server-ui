import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);

  return (
    <ErrorBoundary>
    
      <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          rowSpacing={"10px"}
          justifyContent="center"
          sx={{ minHeight: "50vh" }}
        >
          <Grid item>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "6.5rem", md: "8.5rem" },
                letterSpacing: "1rem",
              }}
            >
              404
            </Typography>
          </Grid>
          <Grid item>
            <Typography textAlign="center" variant="body1">
              The page you are looking for was not found!
            </Typography>
          </Grid>
          <Grid item>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button variant="contained">Return Home</Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

export default PageNotFound;
