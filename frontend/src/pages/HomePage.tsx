import { ArrowForward } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Stack spacing={4} p={4} alignItems="center" height="100%">
      <Typography variant="h2" component="h2" sx={{ flexGrow: 1 }}>
        This is my solution for the Full Stack Interview challenge.
      </Typography>
      <Button
        component={Link}
        variant="contained"
        size="large"
        endIcon={<ArrowForward />}
        to="/products"
      >
        Go to Products
      </Button>
    </Stack>
  );
}
