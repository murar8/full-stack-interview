# Database



Per ogni punto della lista, scrivere la query corrispondente nel rispettivo file all'interno della cartella `database/`

1. **`1-order-with-more-products.sql`** Scrivere una query che mostri l’ordine con il maggior numero di prodotti acquistati tenendo conto della quantità;
2. **`2-order-with-highest-price.sql`** Scrivere una query che estragga l’ordine con il prezzo totale più alto;
3. **`3-products-never-bought.sql`** Scrivere una query che ritorni i prodotti che non sono mai stati acquistati;



## Struttura dei dati



Di seguito è definito lo schema dei dati delle tabelle che bisognerà interrogare



### Products

First Header  | Second Header | Nullable
------------- | ------------- | -------------
id            | int           | FALSE
code          | text          | FALSE
description   | text          | FALSE
image_uri     | text          | TRUE
price         | float         | FALSE



### Orders

First Header  | Second Header | Nullable
------------- | ------------- | -------------
id            | int           | FALSE
notes         | text          | TRUE
created_at    | datetime      | FALSE



### Orders_Products

Name          | Type          | Nullable
------------- | ------------- | -------------
order_id      | int           | FALSE
product_id    | int           | FALSE
quantity      | int           | FALSE



---



# Backend



Implementare all'interno del web server fornito in `backend/src/app.ts` le seguenti API:
1. Ritornare la lista dei prodotti con paginazione;
    > Usare `offset` e `count` come parametri per la paginazione
2. Ritornare la lista di ordini effettuati con i relativi prodotti;



---



# Frontend

Realizzare una web app utilizzando la tecnologia che più si preferisce tra **React**, **Vue** e **Angular** implementando l'API precedentemente scritta per mostrare i prodotti nel database.

> Il codice della web app dovrà essere incluso all'interno del repository.