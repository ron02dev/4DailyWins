import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function SpiritualTopic() {
  const [task, setTask] = useState<string | null>("");

  function handleChange(e: any) {
    setTask(e.target.value);
  }
  return (
    <div className="topic-content">
      <p className="topic-title">Mental Wins</p>
      <TopicHandler
        win_type="spiritual"
        onHandleChange={handleChange}
        task_done={task ?? ""}
      />
    </div>
  );
}
