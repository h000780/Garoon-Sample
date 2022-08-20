import React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  getScheduleHistoryDataStore,
  updateScheduleHistoryDataStore,
} from "../api";
import { DESKTOP } from "../constant";
import ScheduleHistoryDrawer from "./components/ScheduleHistoryDrawer";
import { ScheduleHistoriesData, ScheduleHistoryItem } from "./type";
import {
  generateChangedData,
  generateFirstScheduleHistoryData,
  generateScheduleData,
} from "./utils";

((_PLUGIN_ID) => {
  "use strict";
  garoon.events.on("schedule.event.edit.submit.success", async (event: any) => {
    console.log(event.event);
    const scheduleHistoriesData =
      (await getScheduleHistoryDataStore()) as ScheduleHistoriesData;
    const currentScheduleData = generateScheduleData(event);
    console.log(scheduleHistoriesData);
    if (
      scheduleHistoriesData.lastUpdatedData.updateTime !==
      currentScheduleData.updateTime
    ) {
      const scheduleHistory: ScheduleHistoryItem = generateChangedData(
        scheduleHistoriesData.lastUpdatedData,
        currentScheduleData
      );
      if (Object.keys(scheduleHistory).length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        scheduleHistoriesData.histories!.push(scheduleHistory);
        scheduleHistoriesData.lastUpdatedData = currentScheduleData;
        await updateScheduleHistoryDataStore(
          scheduleHistoriesData,
          event.event.id
        );
      }
    }
    return event;
  });
  garoon.events.on(
    "schedule.event.create.submit.success",
    async (event: any) => {
      console.log(event);
      const firstScheduleHistoryData = generateFirstScheduleHistoryData(event);
      await updateScheduleHistoryDataStore(
        firstScheduleHistoryData,
        event.event.id
      );
      return event;
    }
  );
  garoon.events.on("schedule.event.detail.show", (event: any) => {
    console.log(event);
    const historiesData = garoon.schedule.event.datastore.get(
      DESKTOP.SCHEDULE_DATASTORE_KEY
    );
    if (!historiesData) {
      return event;
    }
    const rootElId = "history_record_root";
    garoon.schedule.event.insertTableRow(
      "Histories",
      `<div id='${rootElId}'></div>`,
      "NOTES"
    );
    const container = document.getElementById(rootElId);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(container!);
    console.log(root);
    root.render(
      <ScheduleHistoryDrawer histories={historiesData.value.histories} />
    );
    return event;
  });
})($PLUGIN_ID);
