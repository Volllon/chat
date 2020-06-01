import { createContext } from "react";
import { ContextType } from "./types";

const context: ContextType = {
  userName: null,
  role: null
}

export default createContext<ContextType>(context);
