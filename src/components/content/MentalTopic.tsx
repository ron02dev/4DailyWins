import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function MentalTopic() {
  const [task, setTask] = useState<string | null>(`Log your mental wins here
  -programming/studying (great brain workout).
  -Engaging in activities that stimulate your mind, such as reading, learning something new, or creating something. This builds self-trust and momentum. 
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Mental Wins</p>
      <TopicHandler
        setTask={setTask}
        win_type="mental"
        task_done={task ?? ""}
      />
    </div>
  );
}
