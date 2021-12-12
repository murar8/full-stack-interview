import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Stack sx={{ height: "100vh" }}>
          <Header />
          <Container maxWidth="md" disableGutters sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/orders" element={<OrderList />} />
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </Container>
          <Footer />
        </Stack>
      </BrowserRouter>
    </ThemeProvider>
  );
}
