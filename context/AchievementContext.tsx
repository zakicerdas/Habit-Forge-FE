import React, { createContext, useContext, useEffect, useState } from "react";
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
};

const AchievementContext = createContext<AchievementContextType | undefined>(
  undefined
);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AchievementContext.Provider value={{ achievements, loading }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx) throw new Error("useAchievements must be inside provider");
  return ctx;
}
