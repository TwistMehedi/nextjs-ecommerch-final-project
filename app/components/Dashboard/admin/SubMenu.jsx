import React from "react";
import Link from "next/link";

const SubMenu = ({ texts }) => {
  return (
    <>
      {texts.map((text, index) => {
        return (
          <Link
            key={index}
            href={text?.url}
            className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {text?.title}
          </Link>
        );
      })}
    </>
  );
};

export default SubMenu;
