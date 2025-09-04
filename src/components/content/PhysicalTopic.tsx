import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function PhysicalTopic() {
  const [task, setTask] = useState<string | null>(`Log your physical wins here
  -Moving your body through activities like walking, running, or the gym. This releases endorphins and boosts your mood. 
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Physical Wins</p>
      <TopicHandler
        setTask={setTask}
        win_type="physical"
        task_done={task ?? ""}
      />
    </div>
  );
}
