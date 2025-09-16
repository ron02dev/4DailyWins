import { useContext } from "react";
import { DailyWinContext } from "../App"; // or wherever your context is defined

export function useDailyWinContext() {
  const context = useContext(DailyWinContext);
  if (!context) {
    throw new Error("useDailyWinContext must be used inside TodoProvider");
  }
  return context;
}