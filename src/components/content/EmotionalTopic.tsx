import { useState } from "react";

import TopicHandler from "../TopicHandler";

export default function EmotionalTopic() {
  const [task, setTask] = useState<string | null>(`Log your emotional wins here
guitar jamming can count here, but you can deepen this by sharing music, chatting with friends/family, or doing something that genuinely sparks joy.

    EXAMPLES:
  - Call or message someone you care about
  - Do something that makes you laugh or relax
  - Practice positive affirmations
  - Help someone without expecting anything back
  `);

  return (
    <div className="topic-content">
      <p className="topic-title">
        Emotional / Social (Relationships & Self-Care)
      </p>
      <TopicHandler
        win_type="emotional"
        setTask={setTask}
        task_done={task ?? ""}
      />
    </div>
  );
}
