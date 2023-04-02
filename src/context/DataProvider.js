import { createContext, useState } from "react";
import { Phase } from "../util/quizPhase";

const DataContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [phaze, setPhaze] = useState(Phase.BEFORE_START);

  return (
    <DataContext.Provider value={{ phaze, setPhaze }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
