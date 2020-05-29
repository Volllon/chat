import { createContext } from "react";
import { Role } from "../types";

export default createContext<Role | null>(null);
