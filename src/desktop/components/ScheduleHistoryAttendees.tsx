import React from "react";
import { DESKTOP } from "../../constant";
import { ScheduleHistoryItem } from "../type";

const ScheduleHistoryAttendees = (props: ScheduleHistoryItem) => {
  const { attendees } = props;
  const currentAttendees: any = [];
  const removedAttendees: any = [];
  if (attendees && attendees.current) {
    attendees?.current.forEach((attendee, index) => {
      const userlink: string = DESKTOP.DOMAIN + "users/" + attendee.code;
      const key = "current_" + index;
      currentAttendees.push(
        <a href={userlink} target="_blank" rel="noreferrer" key={key}>
          {" "}
          {attendee.name}
        </a>
      );
    });
  }
  if (attendees && attendees.removed) {
    attendees?.removed.forEach((attendee, index) => {
      const userlink: string = DESKTOP.DOMAIN + "users/" + attendee.code;
      const key = "removed_" + index;
      removedAttendees.push(
        <a href={userlink} target="_blank" rel="noreferrer" key={key}>
          {" "}
          {attendee.name}
        </a>
      );
    });
  }
  return (
    <div>
      <div>
        <span className="history_changed_field">Attendees:</span>
      </div>
      {attendees?.current && attendees.current.length > 0 ? (
        <div>
          <div>Current:</div>
          {currentAttendees}
        </div>
      ) : (
        ""
      )}
      {attendees?.removed && attendees.removed?.length > 0 ? (
        <div>
          <div>Removed:</div>
          {removedAttendees}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ScheduleHistoryAttendees;
