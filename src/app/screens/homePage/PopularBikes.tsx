import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularBikes() {
  const { popularDishes } = useSelector(popularDishesRetriever);

  return (
    <div className="popular-bikes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="section-head">
            <span className="section-eyebrow">Most wanted</span>
            <span className="category-title">
              Popular <span>bikes</span>
            </span>
          </Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                      <CardCover>
                        <img src={imagePath} alt={product.productName} />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <div className={"bike-tag"}>
                        {product.productCollection}
                      </div>
                      <CardContent className={"card-bottom"}>
                        <div>
                          <p className={"bike-name"}>{product.productName}</p>
                          <p className={"bike-price"}>
                            ${product.productPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className={"bike-views"}>
                          {product.productViews}
                          <VisibilityIcon sx={{ fontSize: 20 }} />
                        </div>
                      </CardContent>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular bikes are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
