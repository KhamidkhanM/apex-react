// TypeScript shapes for order-related data, used across controllers/services for type safety.
import { OrderStatus } from "../enums/order.enum"; // PAUSE / PROCESS / FINISH / DELETE
import { Product } from "./product"; // used for the joined product data in aggregations

// one line inside an order (a product + how many of it), as stored in "orderItems"
export interface OrderItem {
    _id: string; // Mongo document id
    itemQuantity: number; // how many of this product
    itemPrice: number; // price of one unit at order time
    orderId: string; // which order this line belongs to
    productId: string; // which product was ordered
    createdAt: Date; // auto-set by Mongoose timestamps
    updatedAt: Date; // auto-set by Mongoose timestamps
}

// what the frontend sends per basket item when creating an order
export interface OrderItemInput {
    itemQuantity: number; // how many
    itemPrice: number; // unit price
    productId: string; // which product
    orderId?: string; // filled in by the server after the order is created
}

// a full order document as stored/returned from MongoDB
export interface Order {
    _id: string; // Mongo document id
    orderTotal: number; // items total + delivery fee
    orderDelivery: number; // delivery fee (0 if the order is big enough)
    orderStatus: OrderStatus; // current state of the order
    memberId: string; // who placed the order
    createdAt: Date; // auto-set by Mongoose timestamps
    updatedAt: Date; // auto-set by Mongoose timestamps
    /** from aggregations **/
    orderItems: OrderItem[]; // joined in by $lookup: this order's item lines
    productData: Product[]; // joined in by $lookup: the products those lines point at
}


// query params for listing a member's orders (pagination + status filter)
export interface OrderInquiry {
    page: number; // which page of results
    limit: number; // how many orders per page
    orderStatus: OrderStatus; // only orders in this state (e.g. PAUSE = current basket)
}

// what the frontend sends to change an order's status (e.g. PAUSE -> PROCESS on payment)
export interface OrderUpdateInput {
    orderId: string; // which order to update
    orderStatus: OrderStatus; // the new status
}
