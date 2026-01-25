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
    optimisticChecked: string[];
    setOptimisticChecked: React.Dispatch<React.SetStateAction<string[]>>;
    createHabit: (habit: CreateHabitInput) => Promise<void>;
    fetchHabits: () => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
};

export const HabitContext = createContext<HabitContextType | null>(null);

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [optimisticChecked, setOptimisticChecked] = useState<string[]>([]);

    const fetchHabits = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get("/habit");
            const data: Habit[] = response.data.data || [];
            setHabits(data);

            const checkedTodayIds = data
                .filter((h) => h.isHabitChecked)
                .map((h) => h.id);
            setOptimisticChecked(checkedTodayIds);
        } catch (err: any) {
            const errorMsg =
                err?.response?.data?.message || "Gagal mengambil habits";
            setError(errorMsg);
            console.log("fetching error:", errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const createHabit = async (habitData: CreateHabitInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/habit", habitData);
            const newHabit = response.data.data;
            setHabits((prev) => [...prev, newHabit]);
            console.log("create habit succesfully:", newHabit);
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || "Gagal membuat habit";
            setError(errorMsg);
            console.log("create habit error:", errorMsg);
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
            setOptimisticChecked((prev) => prev.filter((hid) => hid !== id));
            console.log(" delete habit successfully:", id);
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || "Gagal menghapus habit";
            setError(errorMsg);
            console.log("delete habit error:", errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <HabitContext.Provider
            value={{
                habits,
                isLoading,
                error,
                optimisticChecked,
                setOptimisticChecked,
                createHabit,
                fetchHabits,
                deleteHabit,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
};
