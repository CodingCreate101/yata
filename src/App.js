import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TodoTemplate from "./components/TodoTemplate";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { resetTodoData } from "./actions/todoActions";
import { connect } from "react-redux";

function App(props) {
  const { resetTodoTemplateNow } = props;

  useEffect(() => {
    resetTodoTemplateNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/template" component={TodoTemplate} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetTodoTemplateNow: () => dispatch(resetTodoData()),
  };
};

export default connect(null, mapDispatchToProps)(App);
