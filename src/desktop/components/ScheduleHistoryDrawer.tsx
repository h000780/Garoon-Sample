/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/rules-of-hooks */
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Drawer from "antd/es/drawer";
import React, { useState } from "react";
import { ScheduleHistoriesData } from "../type";
// import "antd/dist/antd.css";
import "../../css/desktop.css";
import "antd/es/button/style/css";
import "antd/es/divider/style/css";
import "antd/es/drawer/style/css";
import ScheduleHistoryItemBaseInfo from "./ScheduleHistoryItemBaseInfo";
import ScheduleHistoryAttendees from "./ScheduleHistoryAttendees";

const ScheduleHistoryDrawer = (props: ScheduleHistoriesData) => {
  const [visible, setVisible] = useState(false);

  const { histories } = props;
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const scheduleHistories: any[] = [];
  console.log(histories);
  if (histories && histories.length > 0) {
    for (let index = histories.length - 1; index >= 0; index--) {
      const history = histories[index];
      scheduleHistories.push(
        <li key={index}>
          <ScheduleHistoryItemBaseInfo
            createTime={history.createTime}
            creator={history.creator}
            updateTime={history.updateTime}
            updater={history.updater}
          />
          {history.title ? (
            <div>
              <span className="history_changed_field">Title:</span> from &#34;
              {history.title?.from}&#34; to &#34;{history.title?.to}&#34;
            </div>
          ) : (
            ""
          )}
          {history.changedStartTime ? (
            <div>
              <span className="history_changed_field">Start Time:</span> from{" "}
              &#34;{history.changedStartTime?.from}&#34; to &#34;
              {history.changedStartTime?.to}&#34;
            </div>
          ) : (
            ""
          )}
          {history.changedEndTime ? (
            <div>
              <span className="history_changed_field">EndTime:</span> from &#34;
              {history.changedEndTime?.from}&#34; to &#34;
              {history.changedEndTime?.to}&#34;
            </div>
          ) : (
            ""
          )}
          {history.attendees ? (
            <ScheduleHistoryAttendees attendees={history.attendees} />
          ) : (
            ""
          )}
          <Divider />
        </li>
      );
    }
  }

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Show
      </Button>
      <Drawer
        title="Schedule History"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <ol reversed>{scheduleHistories}</ol>
      </Drawer>
    </div>
  );
};
export default ScheduleHistoryDrawer;
