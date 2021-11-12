import React from "react";
import { Provider } from "react-redux";
import { action } from "@storybook/addon-actions";

import * as TaskListStories from "./TaskList.stories";

import { PureInboxScreen } from "./InboxScreen";
import { fireEvent, within } from "@storybook/testing-library";

const Mockstore = {
  getState: () => {
    return {
      tasks: TaskListStories.Default.args.tasks,
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch"),
};

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
  await fireEvent.click(canvas.getByLabelText("archiveTask-3"));
};
