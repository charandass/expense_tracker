import { useReducer, createContext, useEffect } from "react";

import AppReducer from "./AppReducer";

// initia State

function getInitialState() {
  const transactions = localStorage.getItem("transactions");
  return {
    transactions: transactions ? JSON.parse(transactions) : [],
  };
}

// Create Context
export const GlobalContext = createContext(null);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  // Actions
  function deleteTransaction(id) {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }
  function addTransaction(transaction) {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
