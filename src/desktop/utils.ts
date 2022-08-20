import { DateTime } from "luxon";
import { ScheduleHistoryItem } from "./type";

export const generateChangedData = (previousData: any, submitData: any) => {
  const changedHistory: any = {};
  if (previousData.title !== submitData.title) {
    changedHistory.title = { from: previousData.title, to: submitData.title };
  }
  if (previousData.startTime !== submitData.startTime) {
    changedHistory.changedStartTime = {
      from: DateTime.fromISO(previousData.startTime).toFormat("MM/dd HH:mm"),
      to: DateTime.fromISO(submitData.startTime).toFormat("MM/dd HH:mm"),
    };
  }
  if (previousData.endTime !== submitData.endTime) {
    changedHistory.changedEndTime = {
      from: DateTime.fromISO(previousData.endTime).toFormat("MM/dd HH:mm"),
      to: DateTime.fromISO(submitData.endTime).toFormat("MM/dd HH:mm"),
    };
  }
  const removedAttendees = getRemovedAttendees(
    previousData.attendees,
    submitData.attendees
  );
  if (removedAttendees.length > 0) {
    changedHistory.attendees = {
      current: submitData.attendees,
      removed: removedAttendees,
    };
  } else if (submitData.attendees.length !== previousData.attendees.length) {
    changedHistory.attendees = {
      current: submitData.attendees,
      removed: [],
    };
  }
  if (Object.keys(changedHistory).length === 0) return changedHistory;
  changedHistory.updater = submitData.updater;
  changedHistory.updateTime = DateTime.fromISO(submitData.updateTime).toFormat(
    "MM/dd HH:mm"
  );
  return changedHistory;
};

export const generateFirstScheduleHistoryData = (event: any) => {
  const scheduleHistoryData = {
    histories: [
      {
        createTime: DateTime.fromISO(event.event.createdAt).toFormat(
          "MM/dd HH:mm"
        ),
        creator: event.event.creator,
      },
    ],
    lastUpdatedData: generateScheduleData(event),
  };
  return scheduleHistoryData;
};

export const generateScheduleData = (event: any) => {
  return {
    title: event.event.subject,
    startTime: event.event.start.dateTime,
    endTime: event.event.end.dateTime,
    attendees: event.event.attendees,
    updater: event.event.updater,
    updateTime: event.event.updatedAt,
  };
};

const getRemovedAttendees = (
  previousAttendees: User[],
  currentAttendees: User[]
) => {
  const removedAttendees: User[] = [];
  previousAttendees.forEach((previousAttendee) => {
    let hasSameAttendee = false;
    currentAttendees.forEach((currentAttendee) => {
      if (previousAttendee.id === currentAttendee.id) {
        hasSameAttendee = true;
        return true;
      }
    });
    if (!hasSameAttendee) {
      removedAttendees.push(previousAttendee);
    }
  });
  return removedAttendees;
};
