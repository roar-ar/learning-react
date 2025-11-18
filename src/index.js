import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";

import PokeDex from "./pokeDex/PokeDex";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <PokeDex />
  </StrictMode>
);