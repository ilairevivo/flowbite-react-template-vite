import { Card, Pagination, Spinner } from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./stylePages/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../store/userSlice";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";


interface CardType {
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


const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  const nav = useNavigate();
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  

  const filteredCards = () => {
    return cards.filter(
      (card: CardType) =>
        card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchWord.toLowerCase()),
    );
  };
  const likeOrUnlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");

      axios.defaults.headers.common["x-auth-token"] = token;
      await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
      );

      const card = cards.find((card) => card._id === cardId);

      if (card) {
        const isLiked = card.likes.includes(user?._id + "");
        const cardsArr = [...cards];

        if (isLiked) {
          card.likes = card?.likes.filter((like) => like !== user?._id + "");
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = card;
          toast.success("Card unliked successfully");
        } else {
          card.likes = [...card.likes, user?._id + ""];
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = card;
          toast.success("Card liked successfully", {
            position: "top-right",
          });
        }

        setCards(cardsArr);
      }
    } catch (error) {
      console.log("Error liking/unliking card:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl">Loading...</p>
        <Spinner aria-label="Loading" className="ml-4" size="xl" color="info" />
      </div>
    );
  }

  const filtered = filteredCards();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filtered.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filtered.length / cardsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatPhoneForCall = (phone: string) => {
    if (phone.startsWith("0")) {
      return `+972${phone.substring(1)}`;
    }
    return `+972${phone}`;
  };
  

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="containerTitle mx-auto pt-5 pb-3 pl-5">
          <h1 className="title text-black dark:text-white">Cards Page</h1>
          <h4 className="subtitle text-gray-900 dark:text-gray-100">
            here you can find business cards from all categories
          </h4>
          <h4 className=" subtitle   text-gray-900 dark:text-gray-100">
          *To see more details about the ticket, click on it.
          </h4>
        </div>
        <hr id="line" className="border-gray-200 dark:border-gray-700" />

        <div className="card flex flex-wrap justify-center gap-4 p-5 pt-15 shadow-lg transition-shadow duration-300 ease-in-out">
          {currentCards.map((card) => {
            const isLiked = card.likes.includes(user?._id + "");
            
            return (
              <Card
                key={card._id}
                imgAlt={card.image.alt}
                imgSrc={card.image.url}
                className="cardContainer w-96 rounded-t-2xl border border-gray-200 bg-white hover:shadow-neutral-600 dark:bg-gray-800 dark:hover:shadow-lg"
              >
                <div className="justify-between">
                  <Link
                    to={`/card/${card._id}`}
                    key={card._id}
                    onClick={() => nav(`/card/${card._id}`)}
                  >
                    <h2 className="text-lg font-semibold dark:text-white">
                      {card.title}
                    </h2>
                    <p className="w-100 text-gray-600 dark:text-gray-400">
                      {card.subtitle}
                    </p>
                    <hr className="my-4 border-gray-200 dark:border-gray-700"></hr>
                    <h2 className="text-gray-600 dark:text-gray-200">
                      Phone:{" "}
                      <span className="text-gray-600 dark:text-gray-400">
                        {card.phone}{" "}
                      </span>{" "}
                    </h2>
                    <h2 className="text-gray-600 dark:text-gray-200">
                      Email:{" "}
                      <span className="text-gray-600 dark:text-gray-400">
                        {card.email}{" "}
                      </span>
                    </h2>
                    <h2 className="text-gray-600 dark:text-gray-200">
                      Address:{" "}
                      <span className="text-gray-600 dark:text-gray-400">
                        {card.address.city}, {card.address.state},{" "}
                        {card.address.country}{" "}
                      </span>
                    </h2>
                    <br />
                  </Link>

                  <div className="flex items-center justify-between">
                    {user && user.isBusiness && (
                      <a
                        href={`tel:${formatPhoneForCall(card.phone)}`}
                        className="text-gray-600 dark:text-gray-400"
                      >
                        <BsTelephone />
                      </a>
                    )}

                    {user && (
                      <MdOutlineFavorite
                        onClick={() => likeOrUnlikeCard(card._id)}
                        size={23}
                        className={`cursor-pointer ${
                          isLiked ? "text-red-500" : "text-gray-600"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex overflow-x-auto py-6 sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
              
            />
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Home;
