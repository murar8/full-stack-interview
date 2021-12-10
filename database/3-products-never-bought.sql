SELECT
    Products.*
FROM
    Products
    LEFT JOIN Orders_Products ON Products.id = Orders_Products.product_id
WHERE
    Orders_Products.order_id IS NULL;
