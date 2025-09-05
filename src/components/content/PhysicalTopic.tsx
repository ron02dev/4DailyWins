import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function PhysicalTopic() {
  const [task, setTask] = useState<string | null>(`Log your physical wins here
Moving your body through activities like walking, running, or the gym.

    EXAMPLES:
  -Do 20 push-ups or a short workout
  - Drink 8 glasses of water
  - Sleep 7–8 hours
  - Eat a healthy, balanced meal 
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Physical (Body / Health)</p>

      <TopicHandler
        setTask={setTask}
        win_type="physical"
        task_done={task ?? ""}
      />
    </div>
  );
}
