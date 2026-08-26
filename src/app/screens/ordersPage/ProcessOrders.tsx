/**
 * APEX MOTO — design for src/app/screens/ordersPage/ProcessOrders.tsx
 * "On the way" tab. Original handler logic kept intact.
 */
import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

/** REDUX SLICE & SELECTOR **/
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrderProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrderProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  const finishedOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
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
                {/* shipped-at timestamp */}
                <p className={"data-compl"}>
                  {moment(order.updatedAt).format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"verify-button"}
                  onClick={finishedOrderHandler}
                >
                  Confirm delivery
                </Button>
              </Box>
            </Box>
          );
        })}

        {(!processOrders || processOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 260, height: 260, opacity: 0.5 }}
              alt="No orders"
            />
            <span className={"no-data"}>Nothing on the way right now</span>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
