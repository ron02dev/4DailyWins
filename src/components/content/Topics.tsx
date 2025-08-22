import EmotionalTopic from "./EmotionalTopic";
import MentalTopic from "./MentalTopic";
import PhysicalTopic from "./PhysicalTopic";
import SpiritualTopic from "./SpiritualTopic";
import "../../css/topic.css";
export default function Topics() {
  return (
    <>
      <div className="topic-container">
        <MentalTopic />
        <PhysicalTopic />
        <SpiritualTopic />
        <EmotionalTopic />
      </div>
    </>
  );
}
