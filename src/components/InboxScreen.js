import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { updateAppState } from "../lib/store";

import { TaskList } from "./TaskList";

export function PureInboxScreen({ error }) {
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
}

PureInboxScreen.propTypes = {
  /** The error message */
  error: PropTypes.string,
};

PureInboxScreen.defaultProps = {
  error: null,
};

export function InboxScreen() {
  const isError = useSelector((state) => state.isError);
  const dispatch = useDispatch();
  console.log("isError", isError);

  return (
    <div>
      <PureInboxScreen error={isError} />
      <button onClick={() => dispatch(updateAppState("something"))}>
        IsError
      </button>
    </div>
  );
}
