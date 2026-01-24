export enum Frequency {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

export const frequencyValues = Object.values(Frequency);

export const frequencyDisplayNames: Record<Frequency, string> = {
    [Frequency.DAILY]: "Harian",
    [Frequency.WEEKLY]: "Mingguan",
    [Frequency.MONTHLY]: "Bulanan",
    [Frequency.YEARLY]: "Tahunan",
};
