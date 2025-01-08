import { createContext } from "react";
import { TreeTableStore } from "../store";

const TreeTableContext = createContext<TreeTableStore | null>(null);

export default TreeTableContext;
