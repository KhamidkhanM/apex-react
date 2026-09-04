import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularBikes from "./PopularBikes";
import NewBikes from "./NewBikes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";


import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewBikes as setNewBikes, setPopularBikes as setPopularBikes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularBikes: (data: Product[]) => dispatch(setPopularBikes(data)),
  setNewBikes: (data: Product[]) => dispatch(setNewBikes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularBikes, setNewBikes, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.BIKE,
      })
      .then((data) => setPopularBikes(data))
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => setNewBikes(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularBikes />
      <NewBikes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
