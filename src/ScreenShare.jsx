import { useRef, useState } from "react";
import "./App.css"

function ScreenShare() {
  const videoRef = useRef(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicSharing, setIsMicSharing] = useState(false);
  let screenStream = null;
  let micStream = null;

  const startScreen = async () => {
    try {
      screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      videoRef.current.srcObject = screenStream;
      setIsScreenSharing(true);
      screenStream.getTracks()[0].onended = () => {
        stopScreen();
      };
    } 
    catch (err) {
      console.error("Screen Share Error:", err);
    }
  };
  
  function stopScreen() {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    videoRef.current.srcObject = null;
    setIsScreenSharing(false);
  };

  async function startMic(){
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (videoRef.current.srcObject) {
            const combined = new MediaStream([ ...videoRef.current.srcObject.getTracks(), ...micStream.getAudioTracks() ]);
            videoRef.current.srcObject = combined;
        } 
        else {
            videoRef.current.srcObject = micStream;
        }
        setIsMicSharing(true);
      } 
      catch (err) {
        console.error("Mic Error:", err);
      }
  };
 
  function stopMic(){
    if (!videoRef.current.srcObject) 
        return;
    const tracks = videoRef.current.srcObject.getAudioTracks();
    tracks.forEach(track => track.stop());
    setIsMicSharing(false);
  };

  return (
    <div className="wrapper">
    <div className="container" style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>WebRTC Screen with Mic and Speaker Sharing</h1>
      <div style={{display: "flex", justifyContent: "center", rowGap:"5px", flexWrap:"wrap", marginTop:"20px", marginBottom: "30px"}}>
        {!isScreenSharing ? ( <button className="btn start" onClick={startScreen}>Start Screen Share</button>) : 
        ( <button className="btn stop" onClick={stopScreen}>Stop Screen Share</button> )}
      
        <div style={{ marginLeft: "15px" }}>
          {!isMicSharing ? ( <button className="btn start" onClick={startMic}>Turn ON Mic</button> ) : 
          ( <button className="btn stop" onClick={stopMic}>Turn OFF Mic</button> )}
        </div>
      </div>  
      <video ref={videoRef} autoPlay playsInline style={{ width: "60%", marginTop: "20px", border: "2px solid black", borderRadius: "8px" , backgroundColor: "black" }} />
    </div>
    </div>
  );
}

export default ScreenShare;

