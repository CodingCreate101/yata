import React from "react";
import { Row, Col, List, Icon, Checkbox } from "antd";
import { connect } from "react-redux";
import { toggleTodoStatus, deleteTodoItem } from "../actions/todoActions";

function TodoList(props) {
  const { todoList, updateTodoStatus, deleteTodoItemNow } = props;

  const handleCheck = item => {
    updateTodoStatus(item);
  };

  const deleteItem = item => {
    deleteTodoItemNow(item);
  };

  return (
    <Row type="flex" justify="center" style={{ marginTop: "20px" }}>
      <Col lg={{ span: 6 }}></Col>
      <Col xs={{ span: 22 }} lg={{ span: 6 }}>
        <List
          size="small"
          bordered
          dataSource={todoList}
          renderItem={item => (
            <List.Item>
              <Checkbox
                checked={item.status}
                onChange={() => handleCheck(item)}
              >
                {item.title}
              </Checkbox>
              <Icon
                type="delete"
                theme="twoTone"
                twoToneColor="#ff0000"
                onClick={() => deleteItem(item)}
              />
            </List.Item>
          )}
        />
      </Col>
      <Col lg={{ span: 6 }}></Col>
    </Row>
  );
}

const mapStateToProps = state => ({
  todoList: state.todoList.todosList
});

const mapDispatchToProps = dispatch => {
  return {
    updateTodoStatus: selectedItem => dispatch(toggleTodoStatus(selectedItem)),
    deleteTodoItemNow: selectedItem => dispatch(deleteTodoItem(selectedItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
