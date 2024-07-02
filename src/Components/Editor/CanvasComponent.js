import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "./Material types/Cylinder"; // Ensure this path is correct based on your directory structure

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const cylinder = new fabric.Cylinder({
      left: 100,
      top: 100,
      radius: 50,
      height: 100,
      fill: "blue",
    });

    canvas.add(cylinder);

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width="800" height="600" />;
};

export default CanvasComponent;
