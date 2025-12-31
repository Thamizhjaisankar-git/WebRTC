import "./App.css";

function MeetingJoin({ setMeetingId, setName, onJoin }) {
  return (
    <div className="join-container">
      <h1>Join a Meeting</h1>
      <input placeholder="Enter Meeting ID" onChange={(e) => setMeetingId(e.target.value)} />
      <input placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
      <button onClick={onJoin}>Join Meeting</button>
    </div>
  );
}
export default MeetingJoin;
