import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewBikes() {
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className="section-head">
            <span className="section-eyebrow">Fresh from the factory</span>
            <span className="category-title">
              New <span>arrivals</span>
            </span>
          </Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Card key={product._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        {/* bikes show displacement, everything else its size */}
                        <div className="product-sale">
                          {product.productCollection === ProductCollection.BIKE
                            ? `${product.productVolume} cc`
                            : product.productSize}
                        </div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={product.productName} />
                        </AspectRatio>
                      </CardOverflow>

                      <div className="product-detail">
                        <p className={"title"}>{product.productName}</p>
                        <div className={"meta"}>
                          <span className={"price"}>
                            ${product.productPrice.toLocaleString()}
                          </span>
                          <span className={"views"}>
                            {product.productViews}
                            <VisibilityIcon sx={{ fontSize: 18 }} />
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New arrivals are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
