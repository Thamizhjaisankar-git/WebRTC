import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";

function ControlBar({
  isMicOn,
  toggleMic,
  isScreenSharing,
  startScreen,
  stopScreen,
  leaveMeeting,
  setReaction
}) {

 const showReaction = (type) => {
  setReaction(type);
  setTimeout(() => setReaction(null), 1000);
};

const CircleButton = ({ onClick, children, bgColor = "#333", hoverColor = "#555", color="white" }) => (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor: bgColor,
        "&:hover": { backgroundColor: hoverColor },
        color: color,
        width: 50,
        height: 50,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0.5
      }} >
      {children}
    </IconButton>
  );

  return (
    <div className="control-bar">
      <CircleButton  onClick={toggleMic}>
        {isMicOn ? <MicIcon /> : <MicOffIcon />}
      </CircleButton >
      <CircleButton  onClick={isScreenSharing ? stopScreen : startScreen}>
        {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
      </CircleButton >
      <CircleButton onClick={() => showReaction("like")} > 
        <ThumbUpIcon sx={{ color: "#e1cc59ff" }} />
      </CircleButton >
      <CircleButton  onClick={() => showReaction("clap")}>
        <EmojiEmotionsIcon sx={{ color: "#e1cc59ff" }} />
      </CircleButton >
      <CircleButton  onClick={() => showReaction("heart")}>
        <FavoriteIcon sx={{ color: "#EC407A" }} />
      </CircleButton >
      <CircleButton  onClick={leaveMeeting} className="leave" bgColor="#ff2f2fff">
        <CallEndIcon />
      </CircleButton >
    </div>
  );
}
export default ControlBar;
