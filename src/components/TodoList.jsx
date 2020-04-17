import React from "react";
import {
  Row,
  Col,
  List,
  Icon,
  Checkbox,
  message,
  Button,
  Popconfirm,
} from "antd";
import { connect } from "react-redux";
import { toggleTodoStatus, deleteTodoItem } from "../actions/todoActions";
import { withRouter } from "react-router";

function TodoList(props) {
  const {
    todoList,
    updateTodoStatus,
    deleteTodoItemNow,
    match,
    history,
  } = props;

  let hideMessage;

  const isTemplatePage = match.path === "/template";

  const goBackToHomeScreen = () => {
    setTimeout(hideMessage, 5);
    history.push("/");
  };

  const handleCheck = (item) => {
    if (isTemplatePage) {
      message.config({
        top: "80vh",
      });
      hideMessage = message.error(
        <span>
          You can not update TODO values while editing template. <br />
          <Button type="primary" onClick={goBackToHomeScreen}>
            Go To Home Screen
          </Button>
        </span>,
        5
      );

      return;
    }
    updateTodoStatus(item);
  };

  const deleteItem = (item) => {
    deleteTodoItemNow(item);
  };

  return (
    <Row type="flex" justify="center" style={{ marginTop: "20px" }}>
      <Col lg={{ span: 6 }}></Col>
      <Col xs={{ span: 22 }} lg={{ span: 6 }} style={{ paddingBottom: 40 }}>
        {isTemplatePage ? (
          <h3>Template</h3>
        ) : (
          <h3>
            {new Date().toLocaleDateString("delhi", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        )}
        <List
          size="small"
          bordered
          dataSource={todoList}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                checked={item.status}
                onChange={() => handleCheck(item)}
              >
                {item.title}
              </Checkbox>
              {/* Don't show this if we are from root path */}
              {isTemplatePage ? (
                <Popconfirm
                  placement="bottomRight"
                  title={"Are you sure to delete this item?"}
                  onConfirm={() => deleteItem(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Icon type="delete" theme="twoTone" twoToneColor="#ff0000" />
                </Popconfirm>
              ) : null}
            </List.Item>
          )}
        />
      </Col>
      <Col lg={{ span: 6 }}></Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  todoList: state.todoList.todosList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodoStatus: (selectedItem) =>
      dispatch(toggleTodoStatus(selectedItem)),
    deleteTodoItemNow: (selectedItem) => dispatch(deleteTodoItem(selectedItem)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TodoList));
