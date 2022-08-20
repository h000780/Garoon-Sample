export declare type ScheduleHistoryItem = {
  createTime?: string;
  creator?: User;
  changedStartTime?: changString;
  changedEndTime?: changString;
  title?: changString;
  updater?: User;
  updateTime?: string;
  attendees?: { current?: User[]; removed?: User[] };
};
export declare type User = {
  id?: string;
  name?: string;
  code?: string;
};
export declare type changString = {
  from?: string;
  to?: string;
};

export declare type ScheduleHistoriesData = {
  histories?: ScheduleHistoryItem[];
  lastUpdatedData?: any;
};
