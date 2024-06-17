import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Q6_01 from "./questions/Q6_01";
import Q6_02 from "./questions/Q6_02";
import Q6_03 from "./questions/Q6_03";
import Q6_04 from "./questions/Q6_04";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Q6_01 />
    <Q6_02 />
    <Q6_03 />
    <Q6_04 />
  </StrictMode>
);
