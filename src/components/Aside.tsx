import "../css/aside.css";
import "../css/calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import { useDailyWinContext } from "../hooks/useDailyWinContext";
import useDB from "../hooks/useDB";
import "animate.css";
import useDate from "../hooks/useDate";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  handleHowToUse(): void;
}

export default function Aside({ handleHowToUse }: Props) {
 
  return (
    <div className="content-aside">
      <section className="calendar-section">
        <h1 className="aside-title">4 Daily Wins</h1>

        <CalendarContainer />
      </section>
     
      <button className="link-btn" onClick={handleHowToUse}>
        How To Use?
      </button>
    </div>
  );
}

type TileClassNameProps = {
  date: Date;
  view: string;
};

function CalendarContainer() {
  const [value, onChange] = useState<Value>(new Date());
  const { appData, dispatch } = useDailyWinContext();
  const { findDailyWin } = useDB();
  const { getDMY } = useDate();
  function tileClassName({
    date,
    view,
  }: TileClassNameProps): string | undefined {
    if (
      view === "month" &&
      appData.activeDates.includes(date.toLocaleDateString())
    ) {
      return "highlight";
    }
    return undefined;
  }

  //  dispatch({ type: "LOAD_WIN_HISTORY", payload: lastSavedWins });
  //       dispatch({
  //         type: "SET_SERVER_MESSAGE",
  //         payload: {
  //           serverMessage: `Viewing ${id} Wins`,
  //           messageType: "success",
  //         },
  //       });
  async function handleDayClick(date: any) {
    const id = date.toLocaleDateString();
    const currentDay = getDMY();
    try {
      const fetchWinHistory = (await findDailyWin(id)) as DailyWinRecord | null;

      if (fetchWinHistory && id != currentDay) {
        console.log("WIN HISTORY HAS VALUE", fetchWinHistory);
        const winsHistoryArray = fetchWinHistory.dailyWin.wins;
        const winHistory: winHistoryType = {
          selectedWinHistory: winsHistoryArray,
          selectedDateHistory: id,
        };
        dispatch({ type: "LOAD_WIN_HISTORY", payload: winHistory });
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: {
            serverMessage: `Viewing logged wins on ${id}`,
            messageType: "success",
          },
        });
      } else if (id == currentDay) {
        dispatch({ type: "CLEAR_WIN_HISTORY" });
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: {
            serverMessage: `Viewing current day`,
            messageType: "success",
          },
        });
      } else {
        dispatch({ type: "CLEAR_WIN_HISTORY" });
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: {
            serverMessage: `No logged wins on ${id}`,
            messageType: "error",
          },
        });
      }
    } catch (fetchErrorFromDB) {
      console.log(fetchErrorFromDB);
    }
  }

  return (
    <div className="calendar-container">
      <Calendar
        value={value}
        onChange={onChange}
        tileClassName={tileClassName}
        onClickDay={handleDayClick}
      />
      <style>
        {`
.highlight {
  background: #87ff368f; !important;
}
  `}
      </style>
    </div>
  );
}

// react-calendar__tile react-calendar__tile--active
// react-calendar__tile--range react-calendar__tile--rangeStart
// react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds
// react-calendar__month-view__days__day
