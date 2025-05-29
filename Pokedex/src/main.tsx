import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Card from "./components/card.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div
      className="
        flex flex-col container
        mx-auto
        gap-[20px] justify-center items-center
      "
    >
      <div
        className="
          flex flex-row
          w-full
          gap-[20px] items-center
        "
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div
        className="
          flex flex-row
          w-full
          gap-[20px] items-center
        "
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </StrictMode>,
);
