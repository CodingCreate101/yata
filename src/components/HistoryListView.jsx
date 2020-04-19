import React from "react";
import { List, Checkbox, message, Button } from "antd";
import { withRouter } from "react-router";

function HistoryListView({ todoHistoryList, history }) {
  let hideMessage;
  const goBackToHomeScreen = () => {
    setTimeout(hideMessage, 5);
    history.push("/");
  };
  const displayError = () => {
    message.config({
      top: "80vh",
    });
    hideMessage = message.error(
      <span>
        You can not update TODO values in history page. <br />
        <Button type="primary" onClick={goBackToHomeScreen}>
          Go To Home Screen
        </Button>
      </span>,
      5
    );
  };
  return (
    <List
      size="small"
      bordered
      dataSource={todoHistoryList}
      renderItem={(item) => (
        <List.Item>
          <Checkbox checked={item.status} onChange={() => displayError()}>
            {item.title}
          </Checkbox>
        </List.Item>
      )}
    />
  );
}

export default withRouter(HistoryListView);
