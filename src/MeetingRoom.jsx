import { useRef, useState } from "react";
import ControlBar from "./ControlBar";
import Avatar from "./Avatar";
import "./App.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";

function MeetingRoom({ meetingId, name }) {
  const videoRef = useRef(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [reaction, setReaction] = useState("");

  const screenStreamRef = useRef(null);
  const micStreamRef = useRef(null);

    const startScreen = async () => {
    screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
    });
    videoRef.current.srcObject = screenStreamRef.current;
    await videoRef.current.play();
    setIsScreenSharing(true);
    };

    const stopScreen = () => {
        screenStreamRef.current?.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
        setIsScreenSharing(false);
    };

    const toggleMic = async () => {
        if (!isMicOn) {
            micStreamRef.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            let combinedStream;
            if (videoRef.current.srcObject) {
                combinedStream = new MediaStream([
                    ...videoRef.current.srcObject.getVideoTracks(),
                    ...micStreamRef.current.getAudioTracks(),
                ]);
            } 
            else {
                combinedStream = micStreamRef.current;
            }
        videoRef.current.srcObject = combinedStream;
        setIsMicOn(true);
        } 
        else {
                micStreamRef.current?.getTracks().forEach(t => t.stop());
                setIsMicOn(false);
            }
        };

    const leaveMeeting = () => {
        screenStreamRef.current?.getTracks().forEach(t => t.stop());
        micStreamRef.current?.getTracks().forEach(t => t.stop());
        window.location.reload();
    };

  return (
    <div className="meeting-wrapper">
        <header>Meeting ID: {meetingId}</header>
        <div className="video-area">
        {!isScreenSharing && <Avatar name={name} />}
        <video ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
            display: isScreenSharing ? "block" : "none",
            width: "70%",
            backgroundColor: "black",
            borderRadius: "10px",
            }} />
        </div>

        <ControlBar isMicOn={isMicOn} toggleMic={toggleMic} isScreenSharing={isScreenSharing} startScreen={startScreen} stopScreen={stopScreen} leaveMeeting={leaveMeeting} setReaction={setReaction} />

        <audio autoPlay ref={(audio) => {
            if (audio && videoRef.current?.srcObject) {
            audio.srcObject = videoRef.current.srcObject;
            }
        }} />

     {reaction === "like" && (
        <div className="reaction" style={{ color: "#FFD700" }}>
            <ThumbUpIcon fontSize="large" />
        </div>
        )}
        {reaction === "clap" && (
        <div className="reaction" style={{ color: "#FFD700" }}>
            <EmojiEmotionsIcon fontSize="large" />
        </div>
        )}
        {reaction === "heart" && (
        <div className="reaction" style={{ color: "#EC407A" }}>
            <FavoriteIcon fontSize="large" />
        </div>
    )}
    </div>
);
}
export default MeetingRoom;
