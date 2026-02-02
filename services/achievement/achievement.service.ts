import api from "../api";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  badge: string;
};

export async function getAchievements(): Promise<Achievement[]> {
  const monthlyRes = await api.get("/stat/monthly");

  const monthly = monthlyRes.data.data;

  const totalHabits = monthly?.habits || 0;

  const totalCheckIns = monthly?.checkIns || 0;

  const maxStreak =
    monthly?.topHabits?.length > 0
      ? Math.max(...monthly.topHabits.map((h: any) => h.streak))
      : 0;

  return [
    {
      id: "STREAK_3",
      title: "Rookie Streaker",
      description: "Streak 3 hari berturut-turut",
      progress: Math.min(maxStreak, 3),
      target: 3,
      badge: "🥉",
    },
    {
      id: "STREAK_7",
      title: "Weekly Warrior",
      description: "Streak 7 hari berturut-turut",
      progress: Math.min(maxStreak, 7),
      target: 7,
      badge: "🥈",
    },
    {
      id: "STREAK_30",
      title: "Monthly Master",
      description: "Streak 30 hari berturut-turut",
      progress: Math.min(maxStreak, 30),
      target: 30,
      badge: "🥇",
    },
    {
      id: "CHECKIN_10",
      title: "Rajin Banget",
      description: "Total 10 kali check-in",
      progress: Math.min(totalCheckIns, 10),
      target: 10,
      badge: "🔥",
    },
    {
      id: "CHECKIN_50",
      title: "Mesin Konsistensi",
      description: "Total 50 check-in",
      progress: Math.min(totalCheckIns, 50),
      target: 50,
      badge: "⚡",
    },
    {
      id: "HABIT_3",
      title: "Multitasker",
      description: "Memiliki 5 habit aktif",
      progress: Math.min(totalHabits, 5),
      target: 5,
      badge: "📌",
    },
  ];
}
