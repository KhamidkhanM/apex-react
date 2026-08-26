/**
 * APEX MOTO — design for src/app/screens/ordersPage/FinishedOrders.tsx
 * "Delivered" tab — read-only history, no action buttons.
 */
import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";

/** REDUX SLICE & SELECTOR **/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        alt={product.productName}
                      />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img src={"/icons/close.svg"} alt="x" />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} alt="=" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Items</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} alt="+" />
                  <p>Delivery</p>
                  <p>${order.orderDelivery}</p>
                  <img src={"/icons/pause.svg"} style={{ marginLeft: "20px" }} alt="=" />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className={"data-compl"}>
                  {moment(order.updatedAt).format("YY-MM-DD HH:mm")}
                </p>
                {/* static badge instead of an action button */}
                <span className={"pay-chip"}>Delivered</span>
              </Box>
            </Box>
          );
        })}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 260, height: 260, opacity: 0.5 }}
              alt="No orders"
            />
            <span className={"no-data"}>No delivered orders yet</span>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
