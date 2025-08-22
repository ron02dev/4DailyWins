import "../css/aside.css";
import "../css/calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";

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
  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        calendarType="hebrew"
        locale="en-US"
      />
    </div>
  );
}

// react-calendar__tile react-calendar__tile--active
// react-calendar__tile--range react-calendar__tile--rangeStart
// react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds
// react-calendar__month-view__days__day
