import React, { useState } from "react";
import Drawer from "../Drawer";

export default function CakeDrawer({ isOpen, setIsOpen, addDesignItem }) {
  const [selectedTab, setSelectedTab] = useState("Round");
  const [selectedSize, setSelectedSize] = useState("25");

  const Icon = ({ width, height, text }) => {
    let Icon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 695.5 798.5">
        <g id="Layer_2" data-name="Layer 2">
          <g id="COATING">
            <path
              fill="white"
              d="M695.5,173C695.5,59.5,538.37,0,347,0S.5,60.84.5,173.5c0,.58,0,1.15,0,1.73L0,174.5v453c0,134,214,171,348,171s347-38,347-172V183.67C695.33,180.16,695.5,176.61,695.5,173ZM85.9,146.2c9.8-12,26.34-23.7,47.83-33.75C185.43,88.3,261.17,75,347,75c86.44,0,162.68,13.17,214.68,37.08,21.75,10,38.47,21.64,48.36,33.66,7.23,8.79,10.46,17.2,10.46,27.26,0,6.39-1.2,15.21-10.59,26.73-10.15,12.44-27.1,24.56-49,35.06-25.49,12.19-56.52,21.8-92.22,28.56C431.29,270.42,390.52,274,347.5,274,304.92,274,264.37,270.28,227,263,191.55,256,160.62,246.19,135,233.74c-22-10.68-39-22.93-49.23-35.44C76.57,187,75.5,178.75,75.5,173.5,75.5,163.46,78.71,155,85.9,146.2ZM606.18,657.28c-12.71,12.92-33.73,25.11-60.76,35.25-51.73,19.39-125.53,31-197.42,31-72.37,0-146.47-11.43-198.22-30.59-27.17-10-48.27-22.16-61-35C76.63,645.7,75,635.69,75,627.5V286.15C138.59,326,237.1,349,347.5,349c110.05,0,208.61-21.66,272.5-61.09V626.5C620,634.78,618.36,644.92,606.18,657.28Z"
            />
          </g>
        </g>
      </svg>
    );
    switch (selectedTab) {
      case "Round":
        Icon = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 695.5 798.5">
            <g id="Layer_2" data-name="Layer 2">
              <g id="COATING">
                <path
                  fill="white"
                  d="M695.5,173C695.5,59.5,538.37,0,347,0S.5,60.84.5,173.5c0,.58,0,1.15,0,1.73L0,174.5v453c0,134,214,171,348,171s347-38,347-172V183.67C695.33,180.16,695.5,176.61,695.5,173ZM85.9,146.2c9.8-12,26.34-23.7,47.83-33.75C185.43,88.3,261.17,75,347,75c86.44,0,162.68,13.17,214.68,37.08,21.75,10,38.47,21.64,48.36,33.66,7.23,8.79,10.46,17.2,10.46,27.26,0,6.39-1.2,15.21-10.59,26.73-10.15,12.44-27.1,24.56-49,35.06-25.49,12.19-56.52,21.8-92.22,28.56C431.29,270.42,390.52,274,347.5,274,304.92,274,264.37,270.28,227,263,191.55,256,160.62,246.19,135,233.74c-22-10.68-39-22.93-49.23-35.44C76.57,187,75.5,178.75,75.5,173.5,75.5,163.46,78.71,155,85.9,146.2ZM606.18,657.28c-12.71,12.92-33.73,25.11-60.76,35.25-51.73,19.39-125.53,31-197.42,31-72.37,0-146.47-11.43-198.22-30.59-27.17-10-48.27-22.16-61-35C76.63,645.7,75,635.69,75,627.5V286.15C138.59,326,237.1,349,347.5,349c110.05,0,208.61-21.66,272.5-61.09V626.5C620,634.78,618.36,644.92,606.18,657.28Z"
                />
              </g>
            </g>
          </svg>
        );
        break;
      case "Square":
        Icon = (
          <path
            fill="none"
            stroke="#ffffff" // Set stroke color to white
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 10L65 10 65 65 10 65 10 10 35 35L90 35 90 90 35 90 35 35M65 65L90 90M10 65L35 90M65 10L90 35"
          />
        );
    }
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
            width={width / 10}
            height={width / 10}
            fill="none"
            viewBox="0 0 500 500"
          >
            {Icon}
          </svg>
        </div>
        <div className="text-xs font-bold">{text}</div>
      </div>
    );
  };

  const Items = [
    25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400,
    425, 450, 475, 500,
  ].map((item) => {
    return {
      text: `${selectedTab} Cake (${selectedSize}-${item})`,
      width: item * 2,
      height: selectedSize,
    };
  });

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {[
            "Round",
            "Square",
            "Rectangle",
            "Hexagon",
            "Round Slanting",
            // "Combinations",
          ].map((item) => (
            <li
              className="me-2"
              role="presentation"
              onClick={() => setSelectedTab(item)}
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
      <div className="p-2">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {[25, 50, 75, 100, 125, 150, 175, 200].map((item) => (
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
        // style={{ display: selectedTab == "Round" ? "grid" : "none" }}
        className="grid grid-cols-3 gap-2 px-8"
      >
        {Items.map(({ width, height, text }) => (
          <div className="m-4">
            <Icon width={width} height={height} text={text} />
            <button
              onClick={() => {
                addDesignItem(width, height, selectedTab);
              }}
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
      {/* <div style={{ display: selectedTab == "Square" ? "block" : "none" }}>
        Square
      </div> */}
    </Drawer>
  );
}
