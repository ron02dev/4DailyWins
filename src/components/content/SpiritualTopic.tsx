import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function SpiritualTopic() {
  const [task, setTask] = useState<string | null>(`Log your mental wins here
  -Activities that connect you to your purpose or provide inner peace, like praying, meditating, or journaling. 
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Spiritual Wins</p>
      <TopicHandler
        setTask={setTask}
        win_type="spiritual"
        task_done={task ?? ""}
      />
    </div>
  );
}
