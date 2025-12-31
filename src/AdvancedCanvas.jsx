import { useRef, useState, useEffect } from "react";

function AdvancedCanvas() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawShapes(shapes, selectedTextIndex);
  }, []);


  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    if (tool === "text-select") {
      let found = -1;
      shapes.forEach((s, i) => {
        if (s.tool === "text") {
          const width = s.text.length * (s.lineWidth * 3);
          const height = s.lineWidth * 6;
          if (x >= s.startX && x <= s.startX + width && y <= s.startY && y >= s.startY - height) {
            found = i;
          }
        }
      });
      setSelectedTextIndex(found);
      drawShapes(shapes, found);
      return;
    }

    if (tool === "pan" || tool === "lock") 
      return;
    const startX = x;
    const startY = y;
      if (tool === "text") {
        const text = prompt("Enter text:");
      if (text) {
        const shape = { tool, startX, startY, text, color, lineWidth };
        setShapes([...shapes, shape]);
      }
      return;
    }

    if (tool === "pencil" || tool === "eraser") {
      setCurrentShape({
        tool,
        color: tool === "eraser" ? "#ffffff" : color,
        lineWidth,
        points: [{ x: startX, y: startY }],
      });
    } else {
      setCurrentShape({
        tool,
        startX,
        startY,
        endX: startX,
        endY: startY,
        color,
        lineWidth,
      });
    }
    setIsDrawing(true);
  };

 
  const handleMouseMove = (e) => {
    if (!isDrawing || tool === "text") 
        return;
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (tool === "pencil" || tool === "eraser") {
      setCurrentShape((prev) => ({ ...prev,
        points: [...prev.points, { x: offsetX, y: offsetY }],
      }));
      drawShapes( [...shapes, { ...currentShape, 
        points: [...currentShape?.points || [], { x: offsetX, y: offsetY }] }],
        selectedTextIndex
      );
    } else {
      setCurrentShape((prev) => ({ ...prev, endX: offsetX, endY: offsetY }));
      drawShapes(
        [...shapes, { ...currentShape, endX: offsetX, endY: offsetY }],
        selectedTextIndex
      );
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setShapes([...shapes, currentShape]);
    setCurrentShape(null);
    setIsDrawing(false);
  };
 
  const drawShapes = (allShapes, highlightIndex = null) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    allShapes.forEach((s, i) => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.lineWidth;
      ctx.fillStyle = s.color;

      switch (s.tool) {
        case "pencil":
        case "eraser":
          ctx.beginPath();
          s.points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
          break;

        case "line":
          ctx.beginPath();
          ctx.moveTo(s.startX, s.startY);
          ctx.lineTo(s.endX, s.endY);
          ctx.stroke();
          break;

        case "rect":
          ctx.strokeRect(s.startX, s.startY, s.endX - s.startX, s.endY - s.startY);
          break;

        case "ellipse":
          ctx.beginPath();
          ctx.ellipse((s.startX + s.endX) / 2, (s.startY + s.endY) / 2, Math.abs(s.endX - s.startX) / 2, Math.abs(s.endY - s.startY) / 2, 0, 0, 2 * Math.PI );
          ctx.stroke();
          break;

        case "text":
          ctx.font = `${s.lineWidth * 5}px Arial`;
          ctx.fillText(s.text, s.startX, s.startY);
          
          if (highlightIndex === i) {
            const width = s.text.length * (s.lineWidth * 3);
            const height = s.lineWidth * 6;
            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.strokeRect(s.startX - 2, s.startY - height, width + 4, height + 4);
          }
          break;

        default:
          break;
      }
    });
  };

  useEffect(() => {
    drawShapes(shapes, selectedTextIndex);
  }, [shapes, selectedTextIndex]);
 
  const handleUndo = () => {
    const newShapes = shapes.slice(0, -1);
    setShapes(newShapes);
  };
 
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedTextIndex === null) 
        return;
      
      if (e.key === "Delete" || e.key === "Backspace") {
        const updated = shapes.filter((_, i) => i !== selectedTextIndex);
        setShapes(updated);
        setSelectedTextIndex(null);
      }
     
      if (e.key.toLowerCase() === "e") {
        const newText = prompt("Edit text:", shapes[selectedTextIndex].text);
        if (newText !== null) {
          const updated = [...shapes];
          updated[selectedTextIndex].text = newText;
          setShapes(updated);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedTextIndex, shapes]);

  return (
    <div className="full-container">
      <div style={{ textAlign: "center", marginTop: "20px"}}>
        <h2>Advanced Canvas</h2>

        <div className="tools" style={{ marginBottom: "40px" }}>
          <button onClick={() => setTool("pencil")}>✏ Pencil</button>
          <button onClick={() => setTool("eraser")}>🩹 Eraser</button>
          <button onClick={() => setTool("line")}>↔ Line</button>
          <button onClick={() => setTool("rect")}>▭ Rectangle</button>
          <button onClick={() => setTool("ellipse")}>⬭ Ellipse</button>
          <button onClick={() => setTool("text")}>A Text</button>
          <button onClick={() => setTool("text-select")}>🔍 Select Text</button>

          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <input type="number" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} />

          <button onClick={() => setShapes([])}>Clear</button>
          <button onClick={handleUndo}>↩ Undo</button>
        </div>

        <canvas
          ref={canvasRef}
          style={{ width: "800px", height:"400px" , border: "2px solid black", borderRadius: "8px", cursor: tool === "text-select" ? "pointer" : "crosshair", }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp} />
      </div>
    </div>
  );
}

export default AdvancedCanvas;


