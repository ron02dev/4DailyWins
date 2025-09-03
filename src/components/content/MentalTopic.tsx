import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function MentalTopic() {
  const [mentalTask, setMentalTask] = useState<string | null>("");

  function handleChange(e: any) {
    setMentalTask(e.target.value);
  }
  return (
    <div className="topic-content">
      <p className="topic-title">Mental Wins</p>
      <TopicHandler
        win_type="mental"
        onHandleChange={handleChange}
        task_done={mentalTask ?? ""}
      />
    </div>
  );
}
