import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";

import Form from "./Form";
import Counter from "./Counter";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Form />
    <Counter />
  </StrictMode>
);