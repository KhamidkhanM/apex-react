import exp from "constants";
import { Member } from "./member";
import { Product } from "./product";
import { Order } from "./order";

/** REACT APP STATE  **/
export interface AppRootState {
    productsPage: ProductsPageState;
    homePage: HomePageState;
    ordersPage: OrdersPageState;
}

/** HOMEPAGE **/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}

/** ORDERS PAGE **/