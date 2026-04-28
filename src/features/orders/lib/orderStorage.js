import { ORDER_STORAGE_KEY } from "../config/orderConfig.js";

export function getOrders() {
  const orders = localStorage.getItem(ORDER_STORAGE_KEY);

  if (!orders) {
    return [];
  }

  try {
    const parsedOrders = JSON.parse(orders);
    return Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch {
    return [];
  }
}

export function getOrderById(orderId) {
  const orders = getOrders();

  if (orders.length === 0) {
    return null;
  }

  return orders.find((order) => order.orderId === orderId);
}

export function saveOrders(orders) {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  return getOrders();
}
export function appendOrder(order) {
  const savedOrders = getOrders();
  const newOrders = [...savedOrders, order];

  return saveOrders(newOrders);
}
