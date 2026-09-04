/**
 * APEX MOTO — design for src/app/screens/productsPage/ChosenProduct.tsx
 *
 * Single bike / gear detail page. All redux + service calls are the
 * original ones; the layout becomes a dark "spec sheet": gallery on the
 * left, name + price + spec rows + add-to-basket on the right.
 */
import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom"; // @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setRestaurant, setChosenProduct } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ProductsProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getStore()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>
        Spec <span>sheet</span>
      </Box>
      <Container className={"product-container"}>
        {/* ---------------- gallery ---------------- */}
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img
                    className="slider-image"
                    src={imagePath}
                    alt={chosenProduct.productName}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        {/* ---------------- info ---------------- */}
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            {/* category reads straight off the backend enum value */}
            <span className={"product-tag"}>
              {chosenProduct?.productCollection}
            </span>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>
              {restaurant?.memberPhone ?? "010-2469-4424"}
            </span>

            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>

            <p className={"product-desc"}>
              {chosenProduct?.productDesc || "No description available."}
            </p>

            {/* spec rows — reuse the fields the backend already stores */}
            <Box className={"spec-rows"}>
              <div className={"spec-row"}>
                <span>Category</span>
                <b>{chosenProduct?.productCollection}</b>
              </div>
              <div className={"spec-row"}>
                <span>Size / displacement</span>
                <b>
                  {chosenProduct?.productVolume
                    ? `${chosenProduct.productVolume} cc`
                    : chosenProduct?.productSize}
                </b>
              </div>
              <div className={"spec-row"}>
                <span>In stock</span>
                <b>{chosenProduct?.productLeftCount} units</b>
              </div>
            </Box>

            <Divider height="1" width="100%" bg="rgba(255,255,255,0.08)" />

            <div className={"product-price"}>
              <span>Price</span>
              <span>${chosenProduct?.productPrice?.toLocaleString()}</span>
            </div>

            {/* trust strip */}
            <Box className={"trust-row"}>
              <span>
                <LocalShippingIcon sx={{ fontSize: 18, mr: "8px" }} />
                Free delivery over $150
              </span>
              <span>
                <VerifiedIcon sx={{ fontSize: 18, mr: "8px" }} />
                2 yr factory warranty
              </span>
            </Box>

            <div className={"button-box"}>
              <Button
                variant="contained"
                className={"add-basket-btn"}
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add to basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
