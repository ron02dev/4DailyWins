import { useEffect, useState } from "react";

import TopicHandler from "../TopicHandler";
import { useDailyWinContext } from "../../hooks/useDailyWinContext";

export default function SpiritualTopic() {
  const win_type = "Spiritual";
  const defaultText = `Log your Spiritual wins here
Activities that connect you to your purpose or provide inner peace, like praying, meditating, or journaling.

    EXAMPLES:
  - Meditate or pray for 10 minutes
  - Write down 3 things you’re grateful for
  - Spend time in nature mindfully
  - Do one act of kindness 
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
      <p className="topic-title">Spiritual (Purpose / Inner Self)</p>
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
