import { useState } from "react";
import MeetingJoin from "./MeetingJoin";
import MeetingRoom from "./MeetingRoom";

function App() {
  const [meetingId, setMeetingId] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  return joined ? (
    <MeetingRoom meetingId={meetingId} name={name} />
  ) : (
    <MeetingJoin setMeetingId={setMeetingId} setName={setName} onJoin={() => setJoined(true)} />
  );
}

export default App;
