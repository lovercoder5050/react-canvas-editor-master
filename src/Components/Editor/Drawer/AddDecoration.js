import React, { useState, useEffect } from "react";
import Drawer from "../Drawer";
import DECORATIONS from "../../../DB/decorations";

export default function AddDecoration({ isOpen, setIsOpen, onImageAdd }) {
  const [selectedTab, setSelectedTab] = useState("Animals and Creatures");
  const [selectedTabItems, setSelectedTabItems] = useState([]);
  useEffect(() => {
    DECORATIONS.map((item) => {
      if (item.type == selectedTab) {
        setSelectedTabItems(item.data);
      }
    });
  }, [selectedTab]);

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex">
        <div className="border-r border-gray-200 dark:border-gray-700">
          <ul
            class="flex flex-col flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            {[
              "Animals and Creatures",
              "Bows and Sashes",
              "Branches and Sticks",
              "Buildings and Structures",
              "Cake Stands",
              "Drapes",
              "Floral Fillers",
              "Flowers",
              "Furniture & Household Items",
              "Geodes & Crystals",
              "Human Figurines & Parts",
              "Leaves",
              "Letters and Numbers",
              "Mobile & Accessories",
              "Natural Elements",
              "Pillars",
              "Rice Paper Sails",
              "Shapes and Symbols",
              "Side Decor",
              "Small Additions",
              "Trees and Plants",
              "Vintage & Lace",
            ].map((item) => (
              <li
                className="me-2"
                role="presentation"
                onClick={() => setSelectedTab(item)}
                key={item}
              >
                <button
                  className={
                    "inline-block p-4 rounded-t-lg" +
                    (selectedTab == item ? " border-b-4 border-gray-500" : "")
                  }
                  id="profile-tab"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2 px-8">
          {selectedTabItems.map((item) => {
            return (
              <div className="m-2">
                <div className="align-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <div
                    className="flex justify-center flex-col items-center"
                    style={{ height: "180px" }}
                  >
                    <img
                      src={item.src}
                      className="w-full h-full"
                      alt={item.name}
                    />
                  </div>
                  <div className="text-xs font-bold">{item.name}</div>
                </div>
                <button
                  type="button"
                  className="w-full h-8 p-1 flex justify-center text-white bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-lg text-center"
                  onClick={() => onImageAdd(item.src)}
                >
                  <svg
                    class="w-6 h-6 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
}
