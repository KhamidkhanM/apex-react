/**
 * APEX MOTO — design for src/app/components/headers/Basket.tsx
 *
 * The cart drawer that hangs off the navbar cart icon. All logic
 * (useBasket handlers, OrderService.createOrder, the authMember guard) is
 * the original; only the MUI Menu paper is restyled dark and the class
 * names line up with the .basket-* rules already in css/navbar.css.
 *
 * NOTE: HomeNavBar.tsx / OtherNavBar.tsx in this kit render <Basket />
 * without props for preview purposes. In your project keep passing the
 * real props down, exactly as the original App.tsx does.
 */
import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  // free delivery over $150 — matches the promise in the hero + order page
  const shippingCost: number = itemsPrice === 0 || itemsPrice >= 150 ? 0 : 5;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);
      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={"/icons/shopping-cart.svg"} alt="Basket" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            /* dark glass panel instead of MUI's white paper */
            overflow: "visible",
            mt: 1.5,
            backgroundColor: "rgba(16, 20, 27, 0.96)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            color: "#f4f6f8",
            filter: "drop-shadow(0px 14px 34px rgba(0,0,0,0.55))",
            "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
            /* the little arrow pointing at the cart icon */
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "rgba(16, 20, 27, 0.96)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Your basket is empty</div>
            ) : (
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div>In your basket</div>
                <DeleteForeverIcon
                  sx={{ ml: "8px", cursor: "pointer" }}
                  color={"primary"}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        color={"primary"}
                        onClick={() => onDelete(item)}
                      />
                    </div>
                    <img src={imagePath} className={"product-img"} alt={item.name} />
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>{" "}
                        <button onClick={() => onAdd(item)} className="add">
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {cartItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <span className={"price"}>
                Total ${totalPrice} ({itemsPrice} + {shippingCost} delivery)
              </span>
              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
              >
                Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
