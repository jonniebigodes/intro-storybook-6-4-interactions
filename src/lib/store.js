import { configureStore, createSlice } from "@reduxjs/toolkit";

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const TasksSlice = createSlice({
  name: "tasks",
  initialState: defaultTasks,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.findIndex((task) => task.id === id);
      if (task >= 0) {
        state[task].state = newTaskState;
      }
    },
    updateTaskTitle: (state, action) => {
      const { id, title } = action.payload;
      if (title) {
        const task = state.findIndex((task) => task.id === id);
        if (task) {
          task.title = title;
        }
      }
    },
  },
});

export const { updateTaskState, updateTaskTitle } = TasksSlice.actions;

const store = configureStore({
  reducer: {
    tasks: TasksSlice.reducer,
  },
});

export default store;
