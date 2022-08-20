import React from "react";
import { DESKTOP } from "../../constant";
import { ScheduleHistoryItem } from "../type";

const ScheduleHistoryItemBaseInfo = (props: ScheduleHistoryItem) => {
  const { createTime, updateTime, creator, updater } = props;
  const userlink: string =
    DESKTOP.DOMAIN + "users/" + (creator?.code || updater?.code);

  return (
    <div>
      {updater ? (
        <span className="history_grn_user">
          Updater:
          <a href={userlink} target="_blank" rel="noreferrer">
            {" "}
            {updater.name}
          </a>
        </span>
      ) : (
        ""
      )}
      {creator ? (
        <span className="history_grn_user">
          Creator:
          <a href={userlink} target="_blank" rel="noreferrer">
            {" "}
            {creator.name}
          </a>
        </span>
      ) : (
        ""
      )}
      {createTime ? <div>CreateAt: {createTime}</div> : ""}
      {updateTime ? <div>UpdateAt: {updateTime}</div> : ""}
    </div>
  );
};
export default ScheduleHistoryItemBaseInfo;
