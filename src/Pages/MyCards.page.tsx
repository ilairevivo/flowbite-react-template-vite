import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { TRootState } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Card, Pagination, Spinner } from "flowbite-react";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Edit } from "lucide-react";
import { EditCard } from "../components/EditCard";

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

const MyCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const openEditModal = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCardId("");
  };
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

  const deleteCard = async (cardId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this card? This action cannot be undone.",
      )
    ) {
      window.event?.stopPropagation();
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authorization - please log in again");
        nav("/login");
        return;
      }

      axios.defaults.headers.common["x-auth-token"] = token;

      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
      );

      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));

      toast.success("Card deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting card:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("No authorization - please log in again");
          localStorage.removeItem("token");
          nav("/login");
        } else if (error.response?.status === 404) {
          toast.error("Card not found");
        } else if (error.response?.status === 403) {
          toast.error("You don't have permission to delete this card");
        } else {
          toast.error("Error deleting card");
        }
      } else {
        toast.error("Error deleting card");
      }
    }
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

        const userCards = response.data.filter(
          (card: CardType) => card.user_id === user?._id,
        );

        setCards(userCards);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [user?._id]);

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
          <h1 className="title text-black dark:text-white">My Cards</h1>
          <h4 className="subtitle text-gray-900 dark:text-gray-100">
            you have {cards.length} cards
          </h4>
        </div>
        <hr id="line" className="border-gray-200 dark:border-gray-700" />

        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
              You don't have any cards yet
            </p>
            <Link
              to="/createCard"
              className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Create your first card
            </Link>
          </div>
        ) : (
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
                      <div className="flex items-center gap-2">
                        {user && user.isBusiness && (
                          <a
                            href={`tel:${formatPhoneForCall(card.phone)}`}
                            className="text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                            title="Call"
                          >
                            <BsTelephone size={20} />
                          </a>
                        )}

                        {user && (
                          <MdOutlineFavorite
                            onClick={() => likeOrUnlikeCard(card._id)}
                            size={23}
                            className={`cursor-pointer transition-colors ${
                              isLiked
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-600 hover:text-red-400"
                            }`}
                            title={isLiked ? "Unlike" : "Like"}
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(card._id)}
                          className="p-1 text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                          title="Edit card"
                        >
                          <Edit className="cursor-pointer text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400" />
                        </button>

                        <button
                          onClick={() => deleteCard(card._id)}
                          className="p-1 text-gray-600 transition-colors hover:text-red-500 dark:text-gray-400"
                          title="Delete card"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

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
      <EditCard
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        cardId={selectedCardId}
      />
    </>
  );
};

export default MyCards;
