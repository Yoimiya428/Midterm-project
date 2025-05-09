/* SELECT
    users.id AS user_id,
    users.name AS customer_name,
    menu_item.name AS food_name,
    order_item.quantity AS quantity,
    SUM(order_item.quantity * menu_item.price) AS total_order_price
FROM
    orders
JOIN
    users ON order.user_id = users.id
JOIN
    order_item ON order_item = order_item.order_id
JOIN
    menu_item  ON order_item.menu_item_id = menu_item.id
WHERE
    order.id IN (
      SELECT order_id
      FROM order_item
      GROUP BY order_id
      HAVING COUNT(order_id) = 2)
GROUP BY
    users.id, users.name, menu_item.name, order_item.quantity;
 */
