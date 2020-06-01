import { useContext } from "react";
import Context from '../context';
import { ContextType } from "../context/types";

export default (): ContextType => {
  return useContext(Context);
}
