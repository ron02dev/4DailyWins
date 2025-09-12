import EmotionalTopic from "./EmotionalTopic";
import MentalTopic from "./MentalTopic";
import PhysicalTopic from "./PhysicalTopic";
import SpiritualTopic from "./SpiritualTopic";
import "../../css/topic.css";
import { useEffect, useState } from "react";
import { useDailyWinContext } from "../../App";

export default function Topics() {
  const { appData } = useDailyWinContext();
  const [mentalWinHistory, setMentalWinHistory] = useState<string | null>("");

  useEffect(() => {
    console.log("WIN HISTORY CHANGED", appData.winHistory);

    if (appData.winHistory.length > 0) {
      const mentalWin = appData.winHistory.find((win) => {
        return win.win_type == "mental";
      });
      // if array wins has mental wins
      if (mentalWin) {
        setMentalWinHistory(mentalWin.task_done)
      }
    }else{
      setMentalWinHistory("")
    }
  }, [appData.winHistory]);
  return (
    <>
      <div className="topic-container">
        {appData.winHistory.length > 0 ? (
          <WinHistory
            win={mentalWinHistory ?? ""}
            winTitle={"Mental Win"}
          />
        ) : (
          <MentalTopic />
        )}
        <PhysicalTopic />
        <SpiritualTopic />
        <EmotionalTopic />
      </div>
    </>
  );
}

interface winHistoryProps {
  win: string;
  winTitle: string;
}

function WinHistory({ win, winTitle }: winHistoryProps) {
  return (
    <div className="topic-content">
      <p className="topic-title">{winTitle}</p>
      <p>{win}</p>
    </div>
  );
}
