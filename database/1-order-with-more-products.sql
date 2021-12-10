SELECT
    Orders.*,
    SUM(Orders_Products.quantity) AS product_quantity
FROM
    Orders
    RIGHT JOIN Orders_Products ON Orders_Products.order_id = Orders.id
GROUP BY
    Orders.id
ORDER BY
    SUM(Orders_Products.quantity) DESC
LIMIT
    1;
