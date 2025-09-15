import { AuthContext } from "../contexts";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext);
}
