import { configureStore, createSlice } from "@reduxjs/toolkit";

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const AppState = createSlice({
  name: "appState",
  initialState: "",
  reducers: {
    updateAppState: (state, action) => {
      /*  console.log("updateAppState", JSON.stringify(state, null, 2));
      console.log("AppState Action", action.payload); */
      return {
        ...state,
        isError: action.payload,
      };
    },
  },
});

const TasksSlice = createSlice({
  name: "tasks",
  initialState: defaultTasks,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      console.log("taskSlice state", JSON.stringify(state, null, 2));
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

export const { updateAppState } = AppState.actions;

const store = configureStore(
  {
    reducer: {
      tasks: TasksSlice.reducer,
      isError: AppState.reducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
