import React, { useState } from "react";
import HistoryListView from "./HistoryListView";
import { Icon, Row, Col, Tag } from "antd";
import { connect } from "react-redux";
import { formatWithDetails } from "../Utils/Duration";

function HistoryPage({ todoHistory, history }) {
  const dateStyles = {
    fontWeight: 500,
    fontSize: "20px",
    width: "auto",
    textAlign: "center",
    boxSizing: "border-box",
    lineHeight: 0.8,
    height: "25px",
  };

  const [selectedDay, setSelectedDay] = useState(
    todoHistory.length ? todoHistory[todoHistory.length - 1] : []
  );

  const [selectedDayIndex, setSelectedDayIndex] = useState(
    todoHistory.length ? todoHistory.length - 1 : undefined
  );

  const [dayDifference, setDayDifference] = useState(
    todoHistory.length && todoHistory[todoHistory.length - 1].length
      ? "Today"
      : false
  );

  const navigateThroughHistory = (direction) => {
    if (selectedDayIndex === undefined) {
      return false;
    }
    let updatedDay = false;
    switch (direction) {
      case "backward":
        if (selectedDayIndex - 1 >= 0) {
          setSelectedDay(todoHistory[selectedDayIndex - 1]);
          setSelectedDayIndex(selectedDayIndex - 1);
          updatedDay = todoHistory[selectedDayIndex - 1];
        } else {
          console.error(`Reached ${direction} Limit of`, selectedDayIndex - 1);
        }
        break;

      case "forward":
        if (selectedDayIndex + 1 < todoHistory.length) {
          setSelectedDay(todoHistory[selectedDayIndex + 1]);
          setSelectedDayIndex(selectedDayIndex + 1);
          updatedDay = todoHistory[selectedDayIndex + 1];
        } else {
          console.error(`Reached ${direction} Limit of`, selectedDayIndex + 1);
        }
        break;

      default:
        break;
    }

    if (updatedDay) {
      const diff = formatWithDetails(
        new Date() - new Date(updatedDay[0].createdAt)
      );
      setDayDifference(diff);
    }
  };
  return (
    <Row type="flex" justify="center" style={{ marginTop: "20px" }}>
      <Col lg={{ span: 6 }}></Col>
      <Col xs={{ span: 22 }} lg={{ span: 6 }} style={{ paddingBottom: 40 }}>
        <span
          style={{
            display: "grid",
            gridAutoFlow: "column",
            fontSize: 22,
            padding: " 10px 0",
          }}
        >
          <Icon
            style={{ textAlign: "left" }}
            type="arrow-left"
            onClick={() => navigateThroughHistory("backward")}
          />
          <span style={dateStyles}>
            {selectedDay.length ? (
              <>
                {new Date(selectedDay[0].createdAt).toLocaleDateString(
                  "delhi",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
                <br />
                <Tag
                  color="magenta"
                  style={{ fontSize: 10, lineHeight: "12px" }}
                >
                  {dayDifference}
                </Tag>
              </>
            ) : (
              "No Data"
            )}
          </span>

          {dayDifference === "Today" ? (
            <Icon
              type="home"
              style={{ textAlign: "right" }}
              onClick={() => history.push("/")}
            />
          ) : (
            <Icon
              style={{ textAlign: "right" }}
              type="arrow-right"
              onClick={() => navigateThroughHistory("forward")}
            />
          )}
        </span>
        <HistoryListView todoHistoryList={selectedDay} />
      </Col>
      <Col lg={{ span: 6 }}></Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  todoHistory: state.todoHistoryList.todosHistory,
});

export default connect(mapStateToProps, null)(HistoryPage);
