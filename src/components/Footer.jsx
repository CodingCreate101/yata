import React, { useState, useEffect } from "react";
import { Affix, Button, Menu, Dropdown, Avatar, Icon, message } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addToHistory } from "../actions/todoHistoryActions";

function Footer(props) {
  const { location, history, addNewTodoHistory, todoList } = props;
  const [buttonProperties, setButtonProperties] = useState({
    locationPath: "",
    locationName: "",
  });

  useEffect(() => {
    switch (location.pathname) {
      case "/template":
        setButtonProperties({
          locationPath: "/",
          locationName: "< Home",
        });
        break;

      case "/":
        setButtonProperties({
          locationPath: "/template",
          locationName: "Edit Template >",
        });
        break;

      default:
        return undefined;
    }
  }, [location.pathname]);

  const goToSelectedLocation = () => {
    history.push(buttonProperties.locationPath);
  };

  const saveCurrentProgress = () => {
    addNewTodoHistory();

    message.config({
      top: "80vh",
    });
    // Display feedback message
    message.success(
      <span>
        Saved successfully <Icon type="smile" />
      </span>,
      3
    );
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={goToSelectedLocation} type="link">
          {buttonProperties.locationName}
        </Button>
      </Menu.Item>
      {todoList.length ? (
        <Menu.Item>
          <Button onClick={saveCurrentProgress} type="link">
            Save today's progress
          </Button>
        </Menu.Item>
      ) : null}
    </Menu>
  );

  return (
    <div>
      <Affix offsetBottom={20} style={{ position: "absolute", right: 20 }}>
        <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
          <Avatar
            size={50}
            style={{
              backgroundColor: "#1890ff50",
            }}
            icon={<Icon type="appstore" theme="twoTone" />}
          />
        </Dropdown>
      </Affix>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todoList: state.todoList.todosList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addNewTodoHistory: () => dispatch(addToHistory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));
