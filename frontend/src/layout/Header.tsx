import "@fontsource/fira-code";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

function HeaderLink(props: Pick<LinkProps, "to" | "children">) {
  return (
    <Button
      component={Link}
      {...props}
      sx={{ textTransform: "none", textAlign: "center" }}
    />
  );
}

export default function Header() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h6"
          component="h1"
          fontFamily="Fira Code"
          sx={{ flexGrow: 1 }}
        >
          {isSmall ? "FSI" : "Full Stack Interview"}
        </Typography>
        <HeaderLink to="/products">All Products</HeaderLink>
        <HeaderLink to="/orders">Orders</HeaderLink>
      </Toolbar>
    </AppBar>
  );
}
