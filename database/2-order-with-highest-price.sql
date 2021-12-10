SELECT
    Orders.*
FROM
    Orders
    RIGHT JOIN Orders_Products ON Orders_Products.order_id = Orders.id
    LEFT JOIN Products ON Products.id = Orders_Products.product_id
GROUP BY
    Orders.id
ORDER BY
    SUM(Orders_Products.quantity * Products.price) DESC
LIMIT
    1;
