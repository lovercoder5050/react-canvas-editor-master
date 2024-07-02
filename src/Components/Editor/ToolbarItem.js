export default function ToolbarItem({ isActive, icon, handleClick }) {
  return (
    <svg
      onClick={handleClick}
      className={
        "w-8 h-8 text-gray-800 rounded-md dark:text-white cursor-pointer float-left border " +
        (isActive
          ? "border-gray-500 bg-blue-300"
          : "bg-gray-100 border-gray-200")
      }
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 24 24"
    >
      {icon}
    </svg>
  );
}
