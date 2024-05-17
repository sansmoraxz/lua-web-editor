import { useState } from "react";

const texts = [
  "Free to use, no sign up required.",
  <a href="https://github.com/sansmoraxz/lua-web-editor" target="_blank" rel="noreferrer">View Source</a>,
];

export default function Footer() {
  const [state, setState] = useState(0);
  return (
    <div
      className="text-center mt-4"
      onMouseEnter={() => setState(1)}
      onMouseLeave={() => setState(0)}
      //   href=""
    >
      {texts[state]}
    </div>
  );
}
