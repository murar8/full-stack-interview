import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getAllOrders, getProduct, Order } from "../api";

export type ProductDetailsProps = {
  id: number;
  quantity: number;
};

export function ProductDetails({ id, quantity }: ProductDetailsProps) {
  const { isLoading, isError, data, error } = useQuery(["product", id], () =>
    getProduct(id)
  );

  return (
    <TableRow>
      {isLoading ? (
        <TableCell colSpan={4} sx={{ px: 0 }}>
          <LinearProgress />
        </TableCell>
      ) : isError ? (
        <TableCell colSpan={4}>
          <Typography variant="body1">An error occured: {error}</Typography>
        </TableCell>
      ) : (
        <>
          <TableCell>{data!.code}</TableCell>
          <TableCell>{data!.description}</TableCell>
          <TableCell>{data!.price.toFixed(2)}€</TableCell>
          <TableCell>{quantity}</TableCell>
        </>
      )}
    </TableRow>
  );
}

type OrderRowProps = { order: Order };

function OrderRow({ order }: OrderRowProps) {
  const createdAt = useMemo(
    () =>
      new Date(order.createdAt * 1000).toLocaleString(undefined, {
        dateStyle: "short",
        timeStyle: "short",
      }),
    [order.createdAt]
  );

  const totalProducts = useMemo(
    () => order.products.map((p) => p.quantity).reduce((sum, q) => sum + q),
    [order.products]
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > td": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell>{totalProducts}</TableCell>
        <TableCell>{order.price.toFixed(2)}€</TableCell>
        <TableCell>{order.notes || "-"}</TableCell>
      </TableRow>
      <TableRow sx={{ borderTop: 0 }}>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open}>
            <Table aria-label="products">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ "& > :last-child > *": { borderBottom: "unset" } }}
              >
                {order.products.map(({ id, quantity }) => (
                  <ProductDetails key={id} id={id} quantity={quantity} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function OrderList() {
  const { isLoading, isError, data, error } = useQuery("orders", getAllOrders);

  if (isLoading) {
    return <LinearProgress sx={{ m: 4 }} />;
  }

  if (isError) {
    return (
      <Typography variant="h5" component="h2" m={4}>
        An error occured: {error}
      </Typography>
    );
  }

  return (
    <Stack spacing={1} p={2}>
      <Typography variant="h4" component="h2" textAlign="center">
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="orders">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
