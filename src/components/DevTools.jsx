import React from "react";
import { connect } from "react-redux";
import { Button, message, Icon, Tag } from "antd";

function DevTools(props) {
  const version = "Version: 1.10.2";
  const { todoList, todoHistory } = props;
  const onSuccess = () => {
    message.config({
      top: "80vh",
    });
    // Display feedback message
    message.success(
      <span>
        Copied to clipboard <Icon type="smile" />
      </span>,
      3
    );
  };
  const onError = () => {
    message.config({
      top: "80vh",
    });
    // Display feedback message
    message.error(
      <span>
        Oh boi, there was an error <Icon type="frown" />
      </span>,
      3
    );
  };
  return (
    <div style={{ maxWidth: "100vw", wordWrap: "break-word", padding: 10 }}>
      <h2>
        Developer Tools - <Tag color="magenta">{version}</Tag>
      </h2>
      <hr />
      <Button
        onClick={() =>
          navigator.clipboard
            .writeText(JSON.stringify(todoList))
            .then(onSuccess, onError)
        }
      >
        Copy template to clipboard
      </Button>
      <Button
        onClick={() =>
          navigator.clipboard
            .writeText(JSON.stringify(todoHistory))
            .then(onSuccess, onError)
        }
      >
        Copy history to clipboard
      </Button>
      <br />
      <br />
      <h3>Print: </h3>
      <h4>Template: </h4>

      <code>{JSON.stringify(todoList)}</code>
      <br />
      <br />
      <h4>History: </h4>
      <code>{JSON.stringify(todoHistory)}</code>
      <br />
      <br />
      <hr />
    </div>
  );
}

const mapStateToProps = (state) => ({
  todoList: state.todoList.todosList,
  todoHistory: state.todoHistoryList.todosHistory,
});

export default connect(mapStateToProps, null)(DevTools);
