export type ContestFieldTypes = {
  contestTitle: string;
  entryFee: number;
  platform: string;
  matchType: string;
  map: string;
  server: string;
  contestDate: Date;
  contestTime: Date;
  notes: string;
  id?: string;
  organizerInformation: {
    userId?: string;
    userName?: string;
  };
};
