import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAchievements } from "../services/achievement/achievement.service";

type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  badge: string;
};

type AchievementContextType = {
  achievements: Achievement[];
  loading: boolean;
  refreshAchievements: () => Promise<void>;
};

const AchievementContext = createContext<AchievementContextType | undefined>(
  undefined
);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAchievements = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error("Failed to refresh achievements:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAchievements();
  }, [refreshAchievements]);

  return (
    <AchievementContext.Provider value={{ achievements, loading, refreshAchievements }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx) throw new Error("useAchievements must be inside provider");
  return ctx;
}
