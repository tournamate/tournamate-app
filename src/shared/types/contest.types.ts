export type CreateContestsProps = {
  contestTitle: string;
  entryFee: string;
  platform: string;
  matchType: string;
  map: string;
  server: string;
  contestDate: Date | undefined;
  contestTime: Date | undefined;
  notes: string;
};
