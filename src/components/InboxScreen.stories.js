import React from "react";
import { Provider } from "react-redux";
import { action } from "@storybook/addon-actions";

import * as TaskListStories from "./TaskList.stories";

import { PureInboxScreen } from "./InboxScreen";
import { fireEvent, within } from "@storybook/testing-library";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const Mockstore = configureStore({
  reducer: {
    tasks: createSlice({
      name: "tasks",
      initialState: TaskListStories.Default.args.tasks,
      reducers: {
        updateTaskState: (state, action) => {
          const { id, newTaskState } = action.payload;
          console.log("taskSlice state", JSON.stringify(state, null, 2));
          const task = state.findIndex((task) => task.id === id);
          if (task >= 0) {
            state[task].state = newTaskState;
          }
        },
      },
    }).reducer,
  },
});
/* const Mockstore = {
  getState: () => {
    return {
      tasks: TaskListStories.Default.args.tasks,
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch"),
}; */

export default {
  component: PureInboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={Mockstore}>{story()}</Provider>],
};

const Template = (args) => <PureInboxScreen {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: "Something",
};

export const UsingInteractions = Template.bind({});
UsingInteractions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // simulates pinning the first task
  await fireEvent.click(canvas.getByLabelText("pinTask-5"));

  // simulates archiving the third task
  await fireEvent.click(canvas.getByLabelText("pinTask-3"));
};
