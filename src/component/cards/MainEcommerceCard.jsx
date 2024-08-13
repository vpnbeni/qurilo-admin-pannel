import React, { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiShoppingTag } from "react-icons/ci";
import { API_URL } from "@/api/commonApi";

const EcommerceCard = ({ card, setSuccessfullyEdited,successfullyEdited }) => {
  const [cardEdit, setCardEdit] = useState(false);
  const [point, setPoint] = useState(card?.point || []);
  const [newCard, setNewCard] = useState({ ...card });

  const handleAddItem = () => {
    setPoint([...point, ""]);
  };

  const handleDeleteItem = (index) => {
    setPoint(point.filter((_, i) => i !== index));
  };
  const handleDeleteCard = async (cardId) => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/eco-solutions/${cardId}`, {
        method: 'DELETE',
      });
      setSuccessfullyEdited(!successfullyEdited)
      console.log(successfullyEdited,"successfullyEdited")
      if (response.ok) {
      } else {
        console.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const handleDeleteClick = (idd) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      handleDeleteCard(idd);
    }
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}auth/v1/home-page/qurilo/eco-solutions/cards/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      if (response.ok) {
        setCardEdit(false);
        setSuccessfullyEdited(!successfullyEdited)

        // Optionally refresh card data or notify parent component
      } else {
        console.error("Failed to update card");
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div>
      {cardEdit ? (
        <div className="relative flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
          <input
            type="text"
            className="p-2 m-2 w-full border border-gray-500 rounded-lg"
            value={newCard.cardTitle}
            onChange={(e) => setNewCard({ ...newCard, cardTitle: e.target.value })}
          />
          <textarea
            className="p-2 m-2 w-full border border-gray-500 rounded-lg"
            value={point.join("\n")}
            onChange={(e) => setPoint(e.target.value.split("\n"))}
          />
          <div className="flex flex-col gap-2">
            {point.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="p-2 m-2 w-full border border-gray-500 rounded-lg"
                  value={item}
                  onChange={(e) =>
                    setPoint(
                      point.map((item, i) =>
                        i === index ? e.target.value : item
                      )
                    )
                  }
                />
                <RxCross2
                  className="text-xl text-red-500 cursor-pointer"
                  onClick={() => handleDeleteItem(index)}
                />
              </div>
            ))}
            <div
              className="mx-4 my-2 cursor-pointer"
              onClick={handleAddItem}
            >
              <IoMdAdd className="text-2xl text-gray-800" />
            </div>
          </div>
          <div className="text-black mx-2 flex gap-2">
            <div
              className="cursor-pointer bg-red-600 py-1 px-4 rounded-lg"
              onClick={() => setCardEdit(false)}
            >
              Cancel
            </div>
            <div
              className="cursor-pointer bg-green-600 py-1 px-4 rounded-lg"
              onClick={handleSave}
            >
              Save
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative group w-full h-[25rem] overflow-hidden rounded-[1rem] flex items-end justify-start text-white cursor-pointer transition-transform duration-300 ease-in-out py-4 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(106,106,106,0) 50%, rgba(255,248,248,0) 100%) ,url(${card?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <span className="w-12 h-12 group-hover:w-11 group-hover:h-11 bg-gray-800 group-hover:bg-white/0 flex items-center p-1 justify-center text-white rounded-xl absolute top-2 right-2 z-20 transition-all ease-in-out duration-300">
              <HiOutlineExternalLink size={25} />
            </span>
          </div>
          <div className="flex flex-col translate-y-[64%] gap-[20px] px-6 pb-4 group-hover:bg-gradient-to-t from-black to-white/0 w-full group-hover:rounded-b-[1rem] group-hover:translate-y-0 transition-all ease-in-out duration-300">
            <h3 className="text-2xl tracking-wide font-semibold">
              {card?.cardTitle}
            </h3>
            <ul>
              {card?.point?.map((item, i) => (
                <li className="text-base flex items-center gap-2" key={i}>
                  <CiShoppingTag className="text-white" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`absolute bottom-5 z-30 right-5 text-white group-hover:block hidden cursor-pointer`}
            onClick={() => setCardEdit(!cardEdit)}
          >
            <MdEdit className="cursor-pointer text-white" size={26} />
          </div>
          <div
            className={`absolute bottom-5 z-30 right-14 text-white group-hover:block hidden cursor-pointer`}
            onClick={() => handleDeleteClick(card?._id)} 
          >
            <MdDelete className="cursor-pointer text-red-500" size={26} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceCard;
