export default function ToolbarButton({ type, icon, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      <div className="flex justify-center">
        <svg
          className="w-16 h-16 text-gray-800 rounded-md dark:text-white cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      {type}
    </button>
  );
}
