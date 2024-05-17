"use client";
import { PropsWithChildren, useState } from "react";

export function List() {
  const list = [
    {
      id: 1,
      name: "Fish Can",
    },
    { id: 2, name: "Go fast Can" },
    { id: 3, name: "We do a lil coding can" },
    { id: 4, name: "Can.. we do a lil coding?" },
    { id: 5, name: "Dropdown for the can" },
  ];

  return (
    <>
      {list.map((p) => (
        <li className="hover:underline hover:cursor-pointer " key={p.id}>
          {p.name}
        </li>
      ))}
    </>
  );
}

export default function Dropdown(props: PropsWithChildren) {
  const [seen, setSeen] = useState<boolean>(true);

  return (
    <div className="hover:cursor-pointer">
      <span
        onMouseOver={() => setSeen(!seen)}
        onMouseLeave={() => setSeen(seen)}
      >
        Categories ⬇️
      </span>
      {seen && (
        <ul
          onMouseLeave={() => setSeen(!seen)}
          className="absolute bg-white flex flex-col gap-1"
        >
          {props.children}
        </ul>
      )}
    </div>
  );
}
