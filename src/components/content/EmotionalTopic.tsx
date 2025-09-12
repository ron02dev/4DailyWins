import { useState, useEffect } from "react";

import TopicHandler from "../TopicHandler";
import { useDailyWinContext } from "../../App";

export default function EmotionalTopic() {
  const win_type = "emotional";
  const defaultText = `Log your emotional wins here
guitar jamming can count here, but you can deepen this by sharing music, chatting with friends/family, or doing something that genuinely sparks joy.

    EXAMPLES:
  - Call or message someone you care about
  - Do something that makes you laugh or relax
  - Practice positive affirmations
  - Help someone without expecting anything back
  `;
  const [task, setTask] = useState<string | null>(defaultText);
  const { appData } = useDailyWinContext();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    // if wins array has value
    if (appData.wins.length > 0) {
      const currentWin = appData.wins.find((win) => {
        return win.win_type == win_type;
      });
      // if array wins has mental wins
      if (currentWin) {
        const task = currentWin.task_done || defaultText;
      
        setIsChecked(true);
        setTask(task);
      }
    }
  }, [appData.wins]);
  
  return (
    <div className="topic-content">
      <p className="topic-title">
        Emotional / Social (Relationships & Self-Care)
      </p>
      <TopicHandler
        setTask={setTask}
        win_type={win_type}
        task_done={task ?? ""}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  );
}
