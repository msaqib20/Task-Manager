import { uuid } from "./idSource";

export default {
  name: "task-board",
  columns: [
    {
      name: "Pending",
      tasks: [
        {
          description: "Sample Description Here",
          name: "first task",
          labels: "",
          id: uuid(),
          attachment: "",
        },
        {
          description: "",
          name: "second task",
          labels: "",
          id: uuid(),
          attachment: "",
        },
        {
          description: "",
          name: "third task",
          labels: "",
          id: uuid(),
          attachment: "",
        },
      ],
    },
    {
      name: "In-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          labels: "",
          id: uuid(),
          attachment: "",
        },
      ],
    },
    {
      name: "Done",
      tasks: [
        {
          description: "",
          name: "first task",
          labels: "",
          id: uuid(),
          attachment: "",
        },
      ],
    },
  ],
};
