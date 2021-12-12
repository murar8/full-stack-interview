import {
  Grid,
  LinearProgress,
  Paper,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getProducts, Product } from "../api";

export function ProductCard({ code, description, imageURI, price }: Product) {
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="stretch">
          {imageURI && (
            <img
              src={imageURI}
              alt={description}
              style={{ width: 96, height: 96, objectFit: "contain" }}
            />
          )}
          <Stack spacing={1} sx={{ flexGrow: 1 }} alignItems="center">
            <Typography variant="h5">{description}</Typography>
            <Typography variant="body1">{price.toFixed(2)}€</Typography>
            <Typography variant="body2" color="text.secondary">
              Code: {code}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default function ProductList() {
  let [searchParams, setSearchParams] = useSearchParams();

  let page = useMemo(
    () => parseInt(searchParams.get("page") || "") || 1,
    [searchParams]
  );

  let count = useMemo(
    () => parseInt(searchParams.get("count") || "") || 10,
    [searchParams]
  );

  const { isError, error, data, isFetching } = useQuery(
    ["products", page, count],
    () => getProducts((page - 1) * count, count),
    {
      keepPreviousData: true,
    }
  );

  if (isError) {
    return (
      <Typography variant="h5" component="h2" m={4}>
        An error occured: {error}
      </Typography>
    );
  }

  const onPageChange = (_: unknown, next: number) =>
    setSearchParams({ count: count.toString(), page: (next + 1).toString() });

  const onRowsPerPageChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setSearchParams({
      page: (((page - 1) * count) / parseInt(e.target.value) + 1).toFixed(0),
      count: e.target.value,
    });

  return (
    <Stack p={2}>
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        paddingBottom={2}
      >
        All Products
      </Typography>
      <Grid
        container
        spacing={2}
        pb={2}
        direction="row-reverse"
        justifyContent="start"
        alignItems="center"
      >
        {data?.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
      {isFetching ? (
        <LinearProgress sx={{ m: 3 }} />
      ) : (
        <TablePagination
          component="div"
          count={data!.totalCount}
          page={page - 1}
          rowsPerPage={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Rows"
        />
      )}
    </Stack>
  );
}
