import React, { useState } from "react";
import { Button, Input, Row, Col, message, Icon } from "antd";
import { connect } from "react-redux";
import { addNewTodo } from "../actions/todoActions";

function AddNewTodo(props) {
  const { addNewTodoNow } = props;
  const [newTodo, setNewTodo] = useState("");

  const onAdd = () => {
    message.config({
      top: "80vh",
    });
    if (newTodo === "") {
      message.error(
        <span>
          Please enter something <Icon type="smile" />
        </span>,
        3
      );

      return false;
    }
    // Add todo to Store
    addNewTodoNow(newTodo);

    // Empty the text field
    setNewTodo("");

    // Display feedback message
    message.success(
      <span>
        Item added <Icon type="smile" />
      </span>,
      3
    );
  };

  const handleOnChange = (e) => {
    setNewTodo(e.target.value);
  };
  return (
    <div>
      <Row type="flex" justify="center">
        <Col lg={{ span: 6 }}></Col>
        <Col xs={{ span: 22 }} lg={{ span: 6 }}>
          <Row
            type="flex"
            justify="space-between"
            style={{ marginTop: "20px" }}
          >
            <Col xs={{ span: 18 }} lg={{ span: 20 }}>
              <Input
                placeholder="Enter new todo item here"
                value={newTodo}
                onChange={handleOnChange}
              />
            </Col>
            <Col
              xs={{ span: 6 }}
              lg={{ span: 4 }}
              style={{ textAlign: "right" }}
            >
              <Button type="primary" onClick={onAdd}>
                Add
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={{ span: 6 }}></Col>
      </Row>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewTodoNow: (newTodoItem) => dispatch(addNewTodo(newTodoItem)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewTodo);
