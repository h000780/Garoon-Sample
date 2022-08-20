import axios from "axios";
import { DESKTOP } from "./constant";
import { ScheduleHistoryItem, ScheduleHistoriesData } from "./desktop/type";

export const getUserInformation = async (_userCode?: string) => {
  const loginUser = garoon.base.user.getLoginUser();
  const userInformation = {
    code: loginUser.code,
    name: loginUser.name,
    localName: "",
    localNameLocale: "",
  };
  try {
    const url = `/v1/users.json?codes[0]=` + loginUser.code;
    const userInformationResp: any = await axios({
      method: "GET",
      url: url,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    const user = userInformationResp.data.users;
    if (user.length > 0) {
      userInformation.name = user[0].name;
      userInformation.localName = user[0].localName;
      userInformation.localNameLocale = user[0].localNameLocale;
    }
    return userInformation;
  } catch (error) {
    return userInformation;
  }
};

export const getScheduleHistoryDataStore = async (): Promise<
  ScheduleHistoriesData | undefined
> => {
  try {
    const eventId = garoon.schedule.event.get().id;
    const url =
      `/api/v1/schedule/events/${eventId}/datastore/${DESKTOP.SCHEDULE_DATASTORE_KEY}` as `/api/v1/schedule/events/${number}/datastore/${string}`;
    const dataStore = await garoon.api(url, "GET", {});
    const scheduleData = dataStore.data.value as ScheduleHistoriesData;

    return scheduleData;
  } catch (error) {
    return undefined;
  }
};

export const updateScheduleHistoryDataStore = (
  scheduleData: ScheduleHistoriesData,
  eventId?: string
) => {
  const id = eventId ? eventId : garoon.schedule.event.get().id;
  const method =
    garoon.schedule.event.datastore.get(DESKTOP.SCHEDULE_DATASTORE_KEY) ===
    undefined
      ? "POST"
      : "PUT";
  const url =
    `/api/v1/schedule/events/${id}/datastore/${DESKTOP.SCHEDULE_DATASTORE_KEY}` as `/api/v1/schedule/events/${number}/datastore/${string}`;
  const body = {
    value: scheduleData,
  };
  return garoon.api(url, method, body);
};

export const deleteDataStore = async (eventId?: string) => {
  const id = eventId ? eventId : garoon.schedule.event.get().id;
  const url =
    `/api/v1/schedule/events/${id}/datastore/${DESKTOP.SCHEDULE_DATASTORE_KEY}` as `/api/v1/schedule/events/${number}/datastore/${string}`;
  await garoon.api(url, "DELETE", {});
};
