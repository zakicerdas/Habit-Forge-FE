import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { Habit } from "../types/habit";
import { CategoryName } from "../types/category";
import { Frequency } from "../types/frequency";

export type CreateHabitInput = {
  title: string;
  description?: string;
  categoryName: CategoryName;
  frequency: Frequency;
  startDate: string;
};

export type HabitContextType = {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  createHabit: (habit: CreateHabitInput) => Promise<void>;
  fetchHabits: (date?: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  resetHabits: () => void;
};

export const HabitContext = createContext<HabitContextType | null>(null);

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = async (date?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/habit", {
        params: date ? { date } : undefined,
      });

      const data: Habit[] = response.data.data || [];
      setHabits(data);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || "Gagal mengambil habits";
      setError(errorMsg);
      console.log("fetchHabits error:", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const createHabit = async (habitData: CreateHabitInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/habit", habitData);
      const newHabit: Habit = response.data.data;

      setHabits((prev) => [...prev, newHabit]);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || "Gagal membuat habit";
      setError(errorMsg);
      console.log("createHabit error:", errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHabit = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/habit/${id}`);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || "Gagal menghapus habit";
      setError(errorMsg);
      console.log("deleteHabit error:", errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetHabits = () => {
    setHabits([]);
    setError(null);
    setIsLoading(false);
  }


  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <HabitContext.Provider
      value={{
        habits,
        isLoading,
        error,
        createHabit,
        fetchHabits,
        deleteHabit,
        resetHabits,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
