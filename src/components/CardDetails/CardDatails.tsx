import axios from "axios";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type CardType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  bizNumber: number;
  likes: string[];
  user_id: string;
}
const CardDetails = () => {
  const [card, setCard] = useState<CardType>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        );

        setCard(response.data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  if (!card) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-indigo-900 dark:text-white">
          Loading...
        </h1>
      </div>
    );
  }
  const dasription = card.description.slice(0, 20) + "...";
  if (card.description.length > 20) {
    card.description = dasription;
  }
  const imageUrl = card.image.url.slice(0, 20) + "...";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <h1 className="bg-gradient-to-l pt-6 pb-6 from-indigo-900 via-purple-600 to-pink-300 bg-clip-text text-center text-5xl font-bold text-transparent dark:text-white">
        Card Details
      </h1>
      
      {card && (
        <div className="flex w-[80%] flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700 mb-[70px]">
          <h1 className="text-center text-3xl  font-bold text-indigo-900 dark:text-white">
            {card.title}
          </h1>
          <div className="flex items-center justify-center flex-wrap  ml-[20%]   ">
          <div className="flex flex-col items-start justify-start w-[380px]">
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Subtitle :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.subtitle}{" "}
            </span>
          </p>
        { card.description && <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Description :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.description}{" "}
            </span>
          
          </p>}
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Phone :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.phone}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Email :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.email}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Web :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.web}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Image URL :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {imageUrl}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Alt:{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.image.alt}{" "}
            </span>
          </p>
          </div>
          <div className="flex flex-col text-center items-start justify-start w-[380px] ">
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Street :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.address.street}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            House Number :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.address.houseNumber}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            City :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.address.city}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            State :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.address.state}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Country :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.address.country}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Zip :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.address.zip}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Business Number :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.bizNumber}{" "}
            </span>
          </p>
          <p className="text-lg text-indigo-900 dark:text-white">
            {" "}
            Likes :{" "}
            <span className="text-lg text-gray-400 dark:text-gray-400">
              {" "}
              {card.likes.length}{" "}
            </span>
          </p>
          </div>
          </div>
          <img  className="w-[500px] h-[440px] pt-[20px] pb-[20px] rounded-4xl " src={card.image.url} alt={card.image.alt} />
        </div>
      )}
    </div>
  );
};

export default CardDetails;