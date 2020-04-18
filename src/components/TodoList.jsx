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
import {
  toggleTodoStatus,
  deleteTodoItem,
  reorderTemplateItems,
} from "../actions/todoActions";
import { withRouter } from "react-router";
import { trimStringTo } from "../Utils/StringMan";

function TodoList(props) {
  const {
    todoList,
    updateTodoStatus,
    deleteTodoItemNow,
    match,
    history,
    reorderItem,
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
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox
                checked={item.status}
                onChange={() => handleCheck(item)}
              >
                {isTemplatePage ? trimStringTo(22, item.title) : item.title}
              </Checkbox>
              {/* Don't show this if we are from root path */}
              <span style={{ boxSizing: "border-box" }}>
                {isTemplatePage ? (
                  <>
                    <Icon
                      type="up-square"
                      theme="twoTone"
                      style={{ paddingRight: " 10px", fontSize: 18 }}
                      onClick={() => reorderItem("up", index)}
                    />
                    <Icon
                      type="down-square"
                      theme="twoTone"
                      style={{ paddingRight: " 15px", fontSize: 18 }}
                      onClick={() => reorderItem("down", index)}
                    />
                    <Popconfirm
                      placement="bottomRight"
                      title={"Are you sure to delete this item?"}
                      onConfirm={() => deleteItem(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon
                        type="delete"
                        theme="twoTone"
                        twoToneColor="#ff0000"
                      />
                    </Popconfirm>
                  </>
                ) : null}
              </span>
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
    reorderItem: (orderDirection, index) =>
      dispatch(reorderTemplateItems(orderDirection, index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TodoList));
