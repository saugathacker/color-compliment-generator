import React from "react";

const Header = (props) => {
  return (
    <div class='rounded-2xl shadow-lg mt-8 p-5 md:p-10 bg-gray-300 bg-opacity-20 flex flex-row justify-center items-center text-center'>
      <h1 class='text-xl md:text-4xl text-white '>{props.children}</h1>
    </div>
  );
};

export default Header;
