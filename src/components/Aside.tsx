import "../css/aside.css";
import "../css/calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import { useDailyWinContext } from "../App";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Aside() {
  const { appData } = useDailyWinContext();
  return (
    <div className="content-aside">
      <section>
        <h1 className="aside-title">4 Daily Wins</h1>

        <CalendarContainer />
      </section>
      <p className={`server-message ${appData.messageType}`}>
        {appData.serverMessage.toUpperCase()}
      </p>
    </div>
  );
}

type TileClassNameProps = {
  date: Date;
  view: string;
};

function CalendarContainer() {
  const [value, onChange] = useState<Value>(new Date());
  const { appData } = useDailyWinContext();

  function tileClassName({
    date,
    view,
  }: TileClassNameProps): string | undefined {
    if (
      view === "month" &&
      appData.activeDates.includes(date.toLocaleDateString())
    ) {
      return "highlight"
    }
    return undefined;
  }

  return (
    <div className="calendar-container">
      <Calendar
        value={value}
        onChange={onChange}
        tileClassName={tileClassName}
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
