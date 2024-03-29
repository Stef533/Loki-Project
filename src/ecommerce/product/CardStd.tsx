"use client";

import { Card, Rating } from "flowbite-react";
import { SpecialButton } from "../../shared/SpecialButton";
import useReviewbyId from "../../dashboard/Product/useReviewbyId";
import { useContext } from "react";
import { userContext } from "../../loginESubscription/AuthContext";
import { Link, redirect } from "react-router-dom";
import ToastCart from "../../shared/ToastCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Card = {
  id: number;
  name: string;
  rating: number;
  img: string;
  price: number;
};

const cardTheme: any = {
  root: {
    base: "flex rounded-lg  bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full max-h-64 flex-col justify-center gap-9 p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg max-h-64 object-fill",
      on: "w-full  rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};

export default function CardStd(props: Card) {
  const href = `/ecommerce/product/${props.id}`;

  const { reviewData, setReviewData, loadingRev, errorRev, onFetchData } =
    useReviewbyId(props.id);

  const contesto = useContext(userContext);

  async function addToCart() {
    const product = {
      productId: props.id,
      userId: contesto,
      quantity: 1,
    };

    const response = await fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    notify();
    return response.json();
  }
  const notify = () => toast("Prodotto aggiunto al Cart!");

  const calcReview = () => {
    let tot = 0;
    reviewData.forEach((el) => {
      tot += el.rating;
    });

    return Math.round(tot / reviewData.length);
  };
  const review = calcReview();

  return (
    <div>
      {" "}
      <Card
        className="max-w-s dark:bg-our-black/75"
        imgAlt="Img"
        imgSrc={`/src/Images/${props.id}.jpg`}
        theme={cardTheme}
      >
        <div>
          <Link to={href}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {props.name}
            </h5>
          </Link>
          <div className=" mt-1.5 flex items-center">
            <Rating>
              <Rating.Star filled={review >= 1 ? true : false} />
              <Rating.Star filled={review >= 2 ? true : false} />
              <Rating.Star filled={review >= 3 ? true : false} />
              <Rating.Star filled={review >= 4 ? true : false} />
              <Rating.Star filled={review >= 5 ? true : false} />
            </Rating>
            <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-oro-chiaro dark:text-our-black">
              {review}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${props.price}
          </span>
        </div>
        <SpecialButton
          content="Add to cart"
          function={
            contesto === 0
              ? () => (window.location.href = "/log-in")
              : addToCart
          }
        />
      </Card>
    </div>
  );
}
