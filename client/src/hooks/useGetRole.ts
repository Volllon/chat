import { useContext } from "react";
import RoleContext from '../context/RoleContext';
import { Role } from "../types";

export default (): Role | null => {
  return useContext(RoleContext);
}
