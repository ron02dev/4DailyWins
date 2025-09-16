import EmotionalTopic from "./EmotionalTopic";
import MentalTopic from "./MentalTopic";
import PhysicalTopic from "./PhysicalTopic";
import SpiritualTopic from "./SpiritualTopic";
import "../../css/topic.css";
import { useEffect, useState } from "react";
import { useDailyWinContext } from "../../hooks/useDailyWinContext";


export default function Topics() {
  const { appData } = useDailyWinContext();
  const [isHistoryView, setIsHistoryView] = useState<boolean | null>(false);

  useEffect(() => {
    if (appData.winHistory.selectedWinHistory.length > 0) {
      setIsHistoryView(true);
    } else {
      setIsHistoryView(false);
    }
  }, [appData.winHistory]);
  return (
    <>
      <div className="topic-container">
        {isHistoryView ? (
          <WinHistoryView
            winHistory={appData.winHistory.selectedWinHistory}
            dateHistory={appData.winHistory.selectedDateHistory}
          />
        ) : (
          <>
            <MentalTopic />
            <PhysicalTopic />
            <SpiritualTopic />
            <EmotionalTopic />
          </>
        )}
      </div>
    </>
  );
}

interface winHistoryProps {
  winHistory: Win[];
  dateHistory: string;
}

function WinHistoryView({ winHistory }: winHistoryProps) {
  const [loggedMentalWin, setLoggedMentalWin] = useState<string | null>("");
  const [loggedPhysicalWin, setLoggedPhysicalWin] = useState<string | null>("");
  const [loggedSpiritualWin, setLoggedSpiritualWin] = useState<string | null>(
    ""
  );
  const [loggedEmotionalWin, setLoggedEmotionalWin] = useState<string | null>(
    ""
  );

  useEffect(() => {
    const mentalWin = winHistory.find((win) => {
      return win.win_type == "Mental";
    });

    const physicalWin = winHistory.find((win) => {
      return win.win_type == "Physical";
    });
    const spiritualWin = winHistory.find((win) => {
      return win.win_type == "Spiritual";
    });

    const emotionalWin = winHistory.find((win) => {
      return win.win_type == "Emotional";
    });
    // if array wins has mental wins
    mentalWin && setLoggedMentalWin(mentalWin.task_done);
    physicalWin && setLoggedPhysicalWin(physicalWin.task_done);
    spiritualWin && setLoggedSpiritualWin(spiritualWin.task_done);
    emotionalWin && setLoggedEmotionalWin(emotionalWin.task_done);
  }, [winHistory]);
  return (
    <>
      <div className="topic-content history">
        <p className="topic-title">Mental (Mind / Growth)</p>
        <textarea
        id="mental-textarea"
          maxLength={500}
          className={"textarea history-textarea"}
          disabled={true}
          value={
            loggedMentalWin || "You didn't logged any Mental win for this day"
          }
        />
      </div>

      <div className="topic-content history">
        <p className="topic-title">Physical (Body / Health)</p>
        <textarea
        id="physical-textarea"
          maxLength={500}
          className={"textarea history-textarea"}
          disabled={true}
          value={
            loggedPhysicalWin ||
            "You didn't logged any Physical win for this day"
          }
        />
      </div>
      <div className="topic-content history">
        <p className="topic-title">Spiritual (Purpose / Inner Self)</p>
        <textarea
        id="spiritual-textarea"
          maxLength={500}
          className={"textarea history-textarea"}
          disabled={true}
          value={
            loggedSpiritualWin ||
            "You didn't logged any Spiritual win for this day"
          }
        />
      </div>
      <div className="topic-content history">
        <p className="topic-title">
          Emotional / Social (Relationships & Self-Care)
        </p>
        <textarea
         id="emotional-textarea"
          maxLength={500}
          className={"textarea history-textarea"}
          disabled={true}
          value={
            loggedEmotionalWin ||
            "You didn't logged any Emotional win for this day"
          }
        />
      </div>
    </>
  );
}
