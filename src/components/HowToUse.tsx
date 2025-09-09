import "../css/HowTo.css";
export default function HowToUse() {
  return (
    <div className="howto-content">
      <div className="howto-container">
        <h1>How to Use 4 Daily Wins</h1>
        <ol>
          <li>
            <strong>Log Your Wins:</strong>
            <ul>
              <li>
                On the main page, you will see four categories:{" "}
                <span style={{ color: "#ff7474" }}>Mental</span>,{" "}
                <span style={{ color: "#f18063e5" }}>Physical</span>,{" "}
                <span style={{ color: "#86bff5e5" }}>Spiritual</span>, and{" "}
                <span style={{ color: "#b186f5e5" }}>Emotional</span>.
              </li>
              <li>
                For each category, write your win for the day in the provided
                text area.
              </li>
              <li>
                Check the box to mark a win as completed for that category.
              </li>
            </ul>
          </li>
          <li>
            <strong>View Your Progress:</strong>
            <ul>
              <li>
                Your completed wins will be highlighted on the calendar with a
                green color.
              </li>
              <li>
                click on a highlighted day to see your logged wins for that
                date. (Upcoming feature...)
              </li>
            </ul>
          </li>
          <li>
            <strong>History & Editing:</strong>
            <ul>
              <li>
                You can view your win history by navigating through the
                calendar.
              </li>
              <li>
                Edit or clear a win by updating the text area and saving again.
              </li>
            </ul>
          </li>
          <li>
            <strong>Tips:</strong>
            <ul>
              <li>
                Try to log at least one win in each category every day for a
                balanced approach.
              </li>
            </ul>
          </li>
        </ol>
        <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#555" }}>
          Stay consistent and celebrate your daily progress!
        </p>
      </div>
    </div>
  );
}
