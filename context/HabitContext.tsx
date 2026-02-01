import React, {
    createContext,
    useState,
    useCallback,
} from "react";
import api from "../services/api";
import type { TodayHabit } from "../types/habit";
import type { Category } from "../types/category";
import type { Frequency } from "../types/frequency";

export type CreateHabitInput = {
    title: string;
    description?: string;
    category: Category;
    frequency: Frequency;
    startDate: string;
};

export type HabitContextType = {
    habits: TodayHabit[];
    isLoading: boolean;
    error: string | null;
    createHabit: (habit: CreateHabitInput) => Promise<void>;
    fetchHabits: (date?: string) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    updateHabit: (id: string, data: Partial<CreateHabitInput>) => Promise<void>;
    handleCheckIn: (habitId: string) => Promise<void>;
    resetHabits: () => void;
};

export const HabitContext =
    createContext<HabitContextType | null>(null);

export const HabitProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [habits, setHabits] = useState<TodayHabit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fetchHabits = useCallback(async () => {
        try {
            const res = await api.get("/habit/today-status");
            setHabits(res.data.data);
            console.log("Fetched habits:", res.data.data);
        } catch (err: any) {
            setError(
                err?.response?.data?.message || "Gagal mengambil habit"
            );
        }
    }, []);


    const createHabit = async (habitData: CreateHabitInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await api.post("/habit", habitData);
            setHabits((prev) => [...prev, res.data.data]);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                "Gagal membuat habit";
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };


    const deleteHabit = async (id: string) => {
        setError(null);

        try {
            await api.delete(`/habit/${id}`);
            setHabits((prev) =>
                prev.filter((h) => h.id !== id),
            );
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                "Gagal menghapus habit";
            setError(msg);
            throw new Error(msg);
        }
    };

    const updateHabit = async (
        id: string,
        data: Partial<CreateHabitInput>
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await api.put(`/habit/${id}`, data);
            const updatedHabit: TodayHabit = res.data.data;

            setHabits((prev) =>
                prev.map((h) => (h.id === id ? updatedHabit : h)),
            );
        } catch (err: any) {
            const msg =
                err?.response?.data?.message || "Gagal update habit";
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };



    const handleCheckIn = async (habitId: string) => {
        setError(null);

        try {
            await api.post("/checkIn", { habitId,});
            await fetchHabits();
        } catch (err: any) {
            const msg =
                err?.response?.data?.message || "Check-in gagal";
            setError(msg);
            throw new Error(msg);
        }
    };


    const resetHabits = () => {
        setHabits([]);
        setError(null);
        setIsLoading(false);
    };

    return (
        <HabitContext.Provider
            value={{
                habits,
                isLoading,
                error,
                createHabit,
                fetchHabits,
                deleteHabit,
                handleCheckIn,
                updateHabit,
                resetHabits,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
};
