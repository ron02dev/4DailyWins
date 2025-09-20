import "../css/HowTo.css";
export default function HowToUse() {
  return (
    <div className="howto-container">
      <div className="howto-content">
        <h2 className="title">How To Use 4 Daily Wins</h2>
        <ul className="info">
          <li>
            <h3 className="title">Log Your Wins:</h3>
            <ul>
              {" "}
              <li>
                On the main page, you will see four categories: Mental,
                Physical, Spiritual, and Emotional.
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
            <h3 className="title">View Your Progress:</h3>
            <ul>
              {" "}
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
            <h3 className="title">History & Editing:</h3>
            <ul>
              {" "}
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
            <h3 className="title">Tips:</h3>
            <ul>
              {" "}
              <li>
                Try to log at least one win in each category every day for a
                balanced approach.
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com/reel/DNZ8PYwNu_a/"
                >
                  Source of Idea
                </a>
              </li>
            </ul>
          </li>
          <li>
            <h3 className="title">Win Types & Examples</h3>
            <ul className="win-types">
              <li>
                <h5 className="win-title">Mental Win</h5>
                <p className="win-desc">
                  Engaging in activities that stimulate your mind, such as
                  reading, learning something new, or creating something.
                </p>
              </li>
              <li>
                <h5 className="win-title">Physical Win</h5>
                <p className="win-desc">
                  Moving your body through activities like walking, running, or the gym.
                </p>
              </li>
                <li>
                <h5 className="win-title">Spiritual Win</h5>
                <p className="win-desc">
                  Activities that connect you to your purpose or provide inner peace, like praying, meditating, or journaling.
                </p>
              </li>
               <li>
                <h5 className="win-title">Emotional Win</h5>
                <p className="win-desc">
                  Guitar jamming can count here, but you can deepen this by sharing music, chatting with friends/family, or doing something that genuinely sparks joy.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
