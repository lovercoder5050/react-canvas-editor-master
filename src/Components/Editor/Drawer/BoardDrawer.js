import React, { useState } from "react";
import Drawer from "../Drawer";

export default function BoardDrawer({ isOpen, setIsOpen, addCylinder }) {
  const [selectedTab, setSelectedTab] = useState("round");
  const [selectedSize, setSelectedSize] = useState("1");

  const Icon = ({ width, height, text }) => {
    return (
      <div className="w-full h-full align-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        <div
          className="flex justify-center flex-col items-center"
          style={{ height: "110px" }}
        >
          <svg
            className="text-gray-800 rounded-md dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={width / 5}
            height={width / 5}
            fill="none"
            viewBox="0 0 500 500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 839.76 421.69">
              <g id="Layer_2" data-name="Layer 2">
                <g id="BOARD">
                  <path
                    fill="white"
                    d="M418.67,75c106.65,0,201.09,16.42,265.92,46.23,28.41,13.06,50.53,28.6,64,44.94,11.05,13.43,16.2,27.05,16.2,42.86,0,15.12-5.19,28.51-16.32,42.17-13.7,16.81-36,32.91-64.59,46.58-32,15.32-70.8,27.36-115.27,35.77-46.11,8.72-96.35,13.14-149.31,13.14-52.45,0-102.45-4.59-148.63-13.64-44.13-8.64-82.79-20.95-114.91-36.57-28.54-13.89-50.93-30.13-64.73-47-6.87-8.38-16-21.62-16-39.87,0-15.76,5.11-29.37,16.07-42.85,13.32-16.36,35.2-31.94,63.3-45.07C218.87,91.59,312.73,75,418.67,75m0-75C187.44,0,0,73.51,0,209.64,0,338.32,188.05,421.69,419.27,421.69S839.76,342.55,839.76,209C839.76,71.89,649.9,0,418.67,0Z"
                  />
                </g>
              </g>
            </svg>
          </svg>
        </div>
        <div className="text-xs font-bold">{text}</div>
      </div>
    );
  };

  const Items = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300].map(
    (item) => {
      return {
        text: `Round Board (${selectedSize}-${item})`,
        width: item * 2,
        height: selectedSize,
      };
    }
  );
  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li
            className="me-2"
            role="presentation"
            onClick={() => setSelectedTab("round")}
          >
            <button
              className={
                "inline-block p-4 rounded-t-lg" +
                (selectedTab === "round" ? " border-b-4 border-gray-500" : "")
              }
              id="profile-tab"
            >
              Round
            </button>
          </li>
          <li
            class="me-2"
            role="presentation"
            onClick={() => setSelectedTab("square")}
          >
            <button
              className={
                "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" +
                (selectedTab === "square" ? " border-b-4 border-gray-500" : "")
              }
              id="dashboard-tab"
            >
              Square
            </button>
          </li>
        </ul>
      </div>
      <div className="p-2">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {[1, 3, 6, 9].map((item) => (
            <li
              className="me-2"
              role="presentation"
              onClick={() => setSelectedSize(item)}
            >
              <button
                className={
                  "w-8 h-8 text-gray-800 rounded-md dark:text-white cursor-pointer float-left border " +
                  (selectedSize == item
                    ? "border-gray-300 bg-gray-300"
                    : "bg-gray-100 border-gray-200")
                }
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{ display: selectedTab == "round" ? "grid" : "none" }}
        className="grid grid-cols-3 gap-2 px-8"
      >
        {Items.map(({ width, height, text }) => (
          <div className="m-4">
            <Icon width={width} height={height} text={text} />
            <button
              onClick={() => addCylinder({ width, height })}
              type="button"
              className="w-full h-8 p-1 flex justify-center text-white bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-lg text-center"
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
        ))}
      </div>
      <div style={{ display: selectedTab == "square" ? "block" : "none" }}>
        Square
      </div>
    </Drawer>
  );
}
