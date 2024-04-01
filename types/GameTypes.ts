export type Gamemode = {
  name: string;
  slug: string;
  desc: string;
  dif: string;
  badgeColor: string;
};

export type Leaderboard = {
  name: string;
  score: number;
  mode: "Multiple" | "Manual";
  variant: "Normal" | "Timed";
  date: string;
  uuid: string;
};
