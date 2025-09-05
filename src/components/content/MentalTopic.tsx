import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function MentalTopic() {
  const [task, setTask] = useState<string | null>(`Log your mental wins here
Engaging in activities that stimulate your mind, such as reading, learning something new, or creating something.

    EXAMPLES:
  - programming/studying
  - Read 10 pages of a book
  - Learn a new skill online
  - Solve a puzzle or do brain games
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Mental (Mind / Growth)</p>
      <TopicHandler
        setTask={setTask}
        win_type="mental"
        task_done={task ?? ""}
      />
    </div>
  );
}
