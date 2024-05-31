import { createContext, useContext, useState } from "react";

const DrugIdContext = createContext();

export const useDrugIdContext = () => useContext(DrugIdContext);

export const DrugIdProvider = ({ children }) => {
  const [drugId, setDrugId] = useState("");

  return (
    <DrugIdContext.Provider value={{ drugId, setDrugId }}>
      {children}
    </DrugIdContext.Provider>
  );
};
