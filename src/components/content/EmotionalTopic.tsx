import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function EmotionalTopic() {
  const [task, setTask] = useState<string | null>(`Log your emotional wins here
  -guitar jamming can count here, but you can deepen this by sharing music, chatting with friends/family, or doing something that genuinely sparks joy.
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">Emotional Wins</p>
      <TopicHandler
        win_type="emotional"
        setTask={setTask}
        task_done={task ?? ""}
      />
    </div>
  );
}
