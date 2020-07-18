export type CreateContestsProps = {
  contestTitle: string;
  entryFee: number;
  platform: string;
  matchType: string;
  map: string;
  server: string;
  contestDate: Date | undefined;
  contestTime: Date | undefined;
  notes: string;
};
