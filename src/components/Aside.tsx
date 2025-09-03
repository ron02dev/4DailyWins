import "../css/aside.css";
import "../css/calendar.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDailyWinContext } from "../App";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Aside() {
  return (
    <div className="content-aside">
      <section>
        <h1 className="aside-title">4 Daily Wins</h1>

        <CalendarContainer />
      </section>
    </div>
  );
}

function CalendarContainer() {
  const [value, onChange] = useState<Value>(new Date());
  const [wonDates, setWonDates] = useState<string[] | null>();
  const { appData } = useDailyWinContext();

  useEffect(() => {
    const wonDays: any[] = appData.allWins;
    const days = wonDays.map((data) => data.date_logged);
    setWonDates(days);
  }, [appData]);

  return (
    <div className="calendar-container">
      <Calendar
        value={value}
        onChange={onChange}
        tileClassName={({ date, view }) => {
          if (view === "month" && wonDates) {
            // Format the date to match your wonDates format
            const formatted = date.toLocaleDateString();
            if (wonDates.includes(formatted)) {
              return "highlight";
            }
          }
        }}
      />
      <style>
        {`
          .highlight {
            background: #b4e4ff; !important;   
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
