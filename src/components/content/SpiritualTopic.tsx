import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function SpiritualTopic() {
  const [task, setTask] = useState<string | null>(`Log your Spiritual wins here
Activities that connect you to your purpose or provide inner peace, like praying, meditating, or journaling.

    EXAMPLES:
  - Meditate or pray for 10 minutes
  - Write down 3 things you’re grateful for
  - Spend time in nature mindfully
  - Do one act of kindness 
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Spiritual (Purpose / Inner Self)</p>
      <TopicHandler
        setTask={setTask}
        win_type="spiritual"
        task_done={task ?? ""}
      />
    </div>
  );
}
