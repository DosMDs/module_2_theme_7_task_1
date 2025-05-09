import { useContext } from "react";
import { TodoContext } from "../context";

export const useTodos = () => useContext(TodoContext);
