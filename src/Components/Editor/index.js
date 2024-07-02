import React, { useState, useEffect, useRef, useMemo } from "react";
import { fabric } from "fabric";
import { TwitterPicker } from "react-color";
import template from "../../temp.json";
import { loadImageFromURL } from "../../Utils/Objects/image-loader";
import Navbar from "../Navbar";
import "./index.css";
import { connect, connectAdvanced } from "react-redux";
import { setCanvas } from "../../Actions/editor";
import ToolbarItem from "./ToolbarItem";
import Toolbarbutton from "./Toolbarbutton";
import BoardDrawer from "../Editor/Drawer/BoardDrawer";
import Cylinder from "./Material types/Cylinder";
import SquarePillar from "./Material types/Square";
import Hexagon from "./Material types/Hexagon";
import RoundSlanting from "./Material types/RoundSlanting";
import CakeDrawer from "./Drawer/CakeDrawer";
import AddDecoration from "./Drawer/AddDecoration";

const Editor = ({ setCanvas, editorState }) => {
  const colorPickerRef = useRef(null);
  const [canvas, setCanvasState] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FDEFEF");
  const [fontSize, setFontSize] = useState(24);
  const [href, setHref] = useState("");
  const [color, setColor] = useState("#000000");
  const [canvasScale, setCanvasScale] = useState(1);
  const [backgroundImage, setBackgroundImage] = useState("");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [resizeEventFlag, setResizeEventFlag] = useState(true);
  const [deleteFlag, setDeleteFlag] = useState(true);
  const [activeObject, setActiveObject] = useState(null);
  const [isOpenBoardDrawer, setIsOpenBoardDrawer] = useState(false);
  const [isOpenCakeDrawer, setIsOpenCakeDrawer] = useState(false);
  const [isOpenAddDecoration, setIsOpenAddDecoration] = useState(false);

  let newCanvas;

  useEffect(() => {
    const containerElement = canvasRef.current;
    const { clientHeight, clientWidth } = containerElement;

    newCanvas = new fabric.Canvas("canvas", {
      backgroundColor: "#FDEFEF",
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true,
    });

    setCanvas({ canvas: newCanvas });
    setCanvasState(newCanvas);

    const handleKeyDown = (event) => {
      if (event.which === 46) {
        setDeleteFlag((flag) => !flag);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    newCanvas.on("selection:created", handleObjectSelected);
    newCanvas.on("selection:updated", handleObjectSelected);
    newCanvas.on("selection:cleared", handleObjectCleared);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      newCanvas.off("selection:created", handleObjectSelected);
      newCanvas.off("selection:updated", handleObjectSelected);
      newCanvas.off("selection:cleared", handleObjectCleared);
    };
  }, [setCanvas]);

  useEffect(() => {
    const containerElement = containerRef.current;
    const { clientHeight, clientWidth } = containerElement;
    setSize(clientWidth, clientHeight);
  }, [resizeEventFlag]);

  useEffect(() => deleteActiveObject(), [deleteFlag]);

  const handleObjectSelected = (event) => {
    if (event.selected.length) setActiveObject(event.selected[0]);
    else setActiveObject(null);
  };

  const handleObjectCleared = () => {
    setActiveObject(null);
  };

  const handleResize = () => {
    setResizeEventFlag((flag) => !flag);
  };

  const setSize = (width, height) => {
    if (!canvas) return;
    canvas.setHeight(height);
    canvas.setWidth(width);
    canvas.renderAll();
  };

  const deleteActiveObject = () => {
    if (!canvas) return;
    canvas.getActiveObjects().forEach((object) => {
      canvas.remove(object);
    });
  };

  const addText = () => {
    canvas.add(
      new fabric.IText("Tap and Type", {
        fontFamily: "arial",
        fill: color,
        fontSize: 29,
        padding: 5,
        left: 0,
        right: 0,
      })
    );
  };
  const addCylinder = ({ width, height }) => {
    canvas.add(
      new fabric.Cylinder({
        radius: width / 5, // Wide radius for CD-like shape
        height: height / 2, // Low height for CD-like shape
        width: width / 5, // Low height for CD-like shape
        fillColor: "grey",
        strokeColor: "black",
        strokeWidth: 1,
        left: 250,
        top: 150,
        angle: 180,
      })
    );
  };

  const addDesignItem = (width, height, type) => {
    switch (type) {
      case "Round":
        canvas.add(
          new fabric.Cylinder({
            radius: width / 5, // Wide radius for CD-like shape
            height: height / 2, // Low height for CD-like shape
            width: width / 5, // Low height for CD-like shape
            fillColor: "grey",
            strokeColor: "black",
            strokeWidth: 1,
            left: 250,
            top: 150,
            angle: 180,
          })
        );
        break;
      case "Square":
        canvas.add(
          new fabric.SquarePillar({
            width: width / 5,
            height: height / 2,
            depth: width / 30,
            fillColor: "grey",
            strokeColor: "black",
            strokeWidth: 1,
            left: 250,
            top: 150,
          })
        );
        break;
      case "Rectangle":
        canvas.add(
          new fabric.SquarePillar({
            width: width / 5,
            height: height / 2,
            depth: width / 20,
            fillColor: "grey",
            strokeColor: "black",
            strokeWidth: 1,
            left: 250,
            top: 150,
          })
        );
        break;
      case "Hexagon":
        canvas.add(
          new fabric.Hexagon({
            width: width / 5,
            height: height / 2,
            depth: width / 20,
            fillColor: "grey",
            strokeColor: "black",
            strokeWidth: 1,
            left: 250,
            top: 150,
          })
        );
        break;
      case "Round Slanting":
        canvas.add(
          new fabric.RoundSlanting({
            width: width / 5,
            height: height / 2,
            fillColor: "grey",
            strokeColor: "black",
            strokeWidth: 1,
            left: 250,
            top: 150,
          })
        );
        break;
    }
  };

  const addBackground = (url) => {
    removeBackground();
    fabric.Image.fromURL(
      url,
      (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
      },
      { crossOrigin: "anonymous" }
    );
    setBackgroundImage(url);
  };

  const removeBackground = () => {
    setBackgroundImage("");
    if (canvas.backgroundImage) {
      canvas.setBackgroundImage(null);
      canvas.renderAll();
    }
  };

  const onColorChange = (color) => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fill", color.hex);
      canvas.getActiveObject().set("fillColor", color.hex);
      canvas.renderAll();
    } else {
      removeBackground();
      canvas.backgroundColor = color.hex;
      canvas.renderAll();
    }
  };

  const textColorChange = (e) => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fill", e.target.value);
      canvas.renderAll();
    }
    setColor(e.target.value);
  };

  const textBgColorChange = (e) => {
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("backgroundColor", e.target.value);
      canvas.renderAll();
    }
  };

  const onBold = (e) => {
    if (canvas.getActiveObject()) {
      canvas
        .getActiveObject()
        .set(
          "fontWeight",
          canvas.getActiveObject().get("fontWeight") === "bold" ? "" : "bold"
        );
      console.log(canvas.getActiveObject());
      let activeObj = canvas.getActiveObject();
      setActiveObject({ ...activeObj });
      canvas.renderAll();
    }
  };

  const onItalic = (e) => {
    if (canvas.getActiveObject()) {
      canvas
        .getActiveObject()
        .set(
          "fontStyle",
          canvas.getActiveObject().get("fontStyle") === "italic" ? "" : "italic"
        );
      canvas.renderAll();
      let activeObj = canvas.getActiveObject();
      setActiveObject({ ...activeObj });
    }
  };

  const onUnderline = (e) => {
    if (canvas.getActiveObject()) {
      canvas
        .getActiveObject()
        .set(
          "underline",
          canvas.getActiveObject().get("underline") === "true" ? "" : "true"
        );
      canvas.renderAll();
      let activeObj = canvas.getActiveObject();
      setActiveObject({ ...activeObj });
    }
  };

  const onLinethrough = (e) => {
    if (canvas.getActiveObject()) {
      canvas
        .getActiveObject()
        .set(
          "linethrough",
          canvas.getActiveObject().get("linethrough") === "true" ? "" : "true"
        );
      canvas.renderAll();
      let activeObj = canvas.getActiveObject();
      setActiveObject({ ...activeObj });
    }
  };

  const onOverline = (e) => {
    if (canvas.getActiveObject()) {
      canvas
        .getActiveObject()
        .set(
          "overline",
          canvas.getActiveObject().get("overline") === "true" ? "" : "true"
        );
      canvas.renderAll();
      let activeObj = canvas.getActiveObject();
      setActiveObject({ ...activeObj });
    }
  };

  useEffect(() => {
    if (canvas && canvas.getActiveObject()) {
      canvas.getActiveObject().set("fontSize", fontSize);
      canvas.renderAll();
    }
  }, [fontSize]);

  const onImageChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    fabric.Image.fromURL(
      url,
      (img) => {
        canvas.add(img);
        canvas.renderAll();
      },
      { scaleX: 0.15, scaleY: 0.15 }
    );
  };

  const onImageAdd = (url) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      // Create a fabric group from the loaded SVG elements
      const svgGroup = fabric.util.groupSVGElements(objects, options);
      // Set the size of the SVG group
      svgGroup.scaleToWidth(300); // Scale the width to 300 pixels
      svgGroup.scaleToHeight(200); // Scale the height to 200 pixels
      // Optional: Set position
      svgGroup.set({
        left: 50,
        top: 50,
      });
      // Add the SVG group to the canvas
      canvas.add(svgGroup);
      canvas.renderAll();
    });
  };

  const download = () => {
    const image = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    setHref(image);
  };

  const addTemplate = async () => {
    canvas.clear();
    canvas.backgroundColor = template.background.value;
    canvas.renderAll();

    for (let object of template.objects) {
      const element = await importTemplate(object);
      if (element) {
        canvas.add(element);
        canvas.renderAll();
      } else {
        console.log("UNABLE TO LOAD OBJECT: ", object.type);
      }
    }
  };
  const importTemplate = async (item) => {
    let object;
    switch (item.type) {
      case "StaticText":
        object = await staticText(item);
        break;
      case "StaticImage":
        object = await staticImage(item);
        break;
    }
    return object;
  };

  const staticText = (item) => {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = getBaseOptions(item, "text");
        const metadata = item.metadata;
        const oldCanvasWidth = item.canvas.width;
        const newCanvasWidth = canvas.width;
        const {
          textAlign,
          fontFamily,
          fontSize,
          fontWeight,
          charSpacing,
          lineheight,
          text,
          padding,
        } = metadata;
        const textOptions = {
          ...baseOptions,
          text: text ? text : "Default Text",
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && {
            fontSize: (fontSize * newCanvasWidth) / oldCanvasWidth,
          }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
          ...(padding && { padding }),
        };
        const element = new fabric.StaticText(textOptions);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  };

  const staticImage = (item) => {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = getBaseOptions(item, "img");
        const src = item.metadata.src;
        const image = await loadImageFromURL(src);
        const { width, height } = baseOptions;
        if (!width || !height) {
          baseOptions.width = image.width;
          baseOptions.height = image.height;
        }
        const element = new fabric.StaticImage(image, baseOptions);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  };

  const getBaseOptions = (item, type) => {
    const { left, top, width, height, scaleX, scaleY } = item;
    const metadata = item.metadata || {};
    const { fill, angle, originX, originY } = metadata;
    const oldCanvasWidth = item.canvas.width;
    const oldCanvasHeight = item.canvas.height;
    const newCanvasWidth = canvas.width;
    const newCanvasHeight = canvas.height;

    return {
      angle: angle || 0,
      top: top ? (top * newCanvasWidth) / oldCanvasWidth : 0,
      left: left ? (left * newCanvasWidth) / oldCanvasWidth : 0,
      width: type === "img" ? width : (width * newCanvasWidth) / oldCanvasWidth,
      height:
        type === "img" ? height : (height * newCanvasHeight) / oldCanvasHeight,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: (scaleX * newCanvasWidth) / oldCanvasWidth || 1,
      scaleY: (scaleY * newCanvasWidth) / oldCanvasWidth || 1,
      fill: fill || "#000000",
      metadata: metadata,
    };
  };

  const zoomToPercent = (event) => {
    const percentage = Number(event.target.value) / 100;
    setCanvasSize(percentage);
  };

  const zoomIn = () => {
    if (canvasScale < 4) {
      const percentage = canvasScale + 0.25;
      setCanvasSize(percentage);
    }
  };

  const zoomOut = () => {
    if (canvasScale > 0.25) {
      const percentage = canvasScale - 0.25;
      setCanvasSize(percentage);
    }
  };

  const setCanvasSize = (percentage) => {
    canvas.setHeight(canvas.getHeight() * (percentage / canvasScale));
    canvas.setWidth(canvas.getWidth() * (percentage / canvasScale));
    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      obj.scaleX *= percentage / canvasScale;
      obj.scaleY *= percentage / canvasScale;
      obj.left *= percentage / canvasScale;
      obj.top *= percentage / canvasScale;
      obj.setCoords();
    });
    addBackground(backgroundImage);
    setCanvasScale(percentage);
    canvas.renderAll();
  };

  const options = [];
  for (let i = 1; i < 17; i++) {
    options.push(
      <option key={i} value={i * 25}>
        {i * 25}%
      </option>
    );
  }

  const TOOLBARS = useMemo(() => {
    return [
      {
        type: "bold",
        icon: (
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
          />
        ),
        isActive: activeObject ? activeObject.fontWeight === "bold" : false,
        handleClick: () => onBold(),
      },
      {
        type: "italic",
        icon: (
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
          />
        ),
        isActive: activeObject ? activeObject.fontStyle === "italic" : false,
        handleClick: () => onItalic(),
      },
      {
        type: "underline",
        icon: (
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"
          />
        ),
        isActive: activeObject ? activeObject.underline === "true" : false,
        handleClick: () => onUnderline(),
      },
      {
        type: "lineThrough",
        icon: (
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"
          />
        ),
        isActive: activeObject ? activeObject.linethrough === "true" : false,
        handleClick: () => onLinethrough(),
      },
      {
        type: "overline",
        icon: (
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5,5H19V3H5V5M9.62,16L12,9.67L14.37,16M11,7L5.5,21H7.75L8.87,18H15.12L16.25,21H18.5L13,7H11Z"
          />
        ),
        isActive: activeObject ? activeObject.overline === "true" : false,
        handleClick: () => onOverline(),
      },
    ];
  }, [activeObject]);
  const TOOLBUTTON = [
    {
      type: "Add Board",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 839.76 421.69">
          <g id="Layer_2" data-name="Layer 2">
            <g id="BOARD">
              <path
                fill="white"
                d="M418.67,75c106.65,0,201.09,16.42,265.92,46.23,28.41,13.06,50.53,28.6,64,44.94,11.05,13.43,16.2,27.05,16.2,42.86,0,15.12-5.19,28.51-16.32,42.17-13.7,16.81-36,32.91-64.59,46.58-32,15.32-70.8,27.36-115.27,35.77-46.11,8.72-96.35,13.14-149.31,13.14-52.45,0-102.45-4.59-148.63-13.64-44.13-8.64-82.79-20.95-114.91-36.57-28.54-13.89-50.93-30.13-64.73-47-6.87-8.38-16-21.62-16-39.87,0-15.76,5.11-29.37,16.07-42.85,13.32-16.36,35.2-31.94,63.3-45.07C218.87,91.59,312.73,75,418.67,75m0-75C187.44,0,0,73.51,0,209.64,0,338.32,188.05,421.69,419.27,421.69S839.76,342.55,839.76,209C839.76,71.89,649.9,0,418.67,0Z"
              />
            </g>
          </g>
        </svg>
      ),
      handleClick: () => setIsOpenBoardDrawer(true),
    },
    {
      type: "Add Cake",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 695.5 798.5">
          <g id="Layer_2" data-name="Layer 2">
            <g id="COATING">
              <path
                fill="white"
                d="M695.5,173C695.5,59.5,538.37,0,347,0S.5,60.84.5,173.5c0,.58,0,1.15,0,1.73L0,174.5v453c0,134,214,171,348,171s347-38,347-172V183.67C695.33,180.16,695.5,176.61,695.5,173ZM85.9,146.2c9.8-12,26.34-23.7,47.83-33.75C185.43,88.3,261.17,75,347,75c86.44,0,162.68,13.17,214.68,37.08,21.75,10,38.47,21.64,48.36,33.66,7.23,8.79,10.46,17.2,10.46,27.26,0,6.39-1.2,15.21-10.59,26.73-10.15,12.44-27.1,24.56-49,35.06-25.49,12.19-56.52,21.8-92.22,28.56C431.29,270.42,390.52,274,347.5,274,304.92,274,264.37,270.28,227,263,191.55,256,160.62,246.19,135,233.74c-22-10.68-39-22.93-49.23-35.44C76.57,187,75.5,178.75,75.5,173.5,75.5,163.46,78.71,155,85.9,146.2ZM606.18,657.28c-12.71,12.92-33.73,25.11-60.76,35.25-51.73,19.39-125.53,31-197.42,31-72.37,0-146.47-11.43-198.22-30.59-27.17-10-48.27-22.16-61-35C76.63,645.7,75,635.69,75,627.5V286.15C138.59,326,237.1,349,347.5,349c110.05,0,208.61-21.66,272.5-61.09V626.5C620,634.78,618.36,644.92,606.18,657.28Z"
              />
            </g>
          </g>
        </svg>
      ),
      handleClick: () => setIsOpenCakeDrawer(true),
    },
    {
      type: "Add Decoration",
      icon: (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="leaf"
          class="svg-inline--fa fa-leaf fa-w-18 library-button-icon-fa"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="white"
            d="M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z"
          ></path>
        </svg>
      ),
      handleClick: () => setIsOpenAddDecoration(true),
    },
    {
      type: "Add Construction",
      icon: (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="tools"
          class="svg-inline--fa fa-tools fa-w-16 library-button-icon-fa"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="white"
            d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"
          ></path>
        </svg>
      ),
    },
    {
      type: "Add Image",
      icon: (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="images"
          class="svg-inline--fa fa-images fa-w-18 library-button-icon-fa"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="white"
            d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z"
          ></path>
        </svg>
      ),
    },
    {
      type: "Add Template",
      icon: (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="coins"
          class="svg-inline--fa fa-coins fa-w-16 library-button-icon-fa"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="white"
            d="M320 0C214 0 128 35.8 128 80v52.6C53.5 143.6 0 173.2 0 208v224c0 44.2 86 80 192 80s192-35.8 192-80v-52.7c74.5-11 128-40.5 128-75.3V80c0-44.2-86-80-192-80zm16 428.3C326 440 275.6 464 192 464S58 440 48 428.3v-39.5c35.2 16.6 86.6 27.2 144 27.2s108.8-10.6 144-27.2v39.5zm0-96C326 344 275.6 368 192 368S58 344 48 332.3v-44.9c35.2 20 86.6 32.6 144 32.6s108.8-12.7 144-32.6v44.9zM192 272c-79.5 0-144-21.5-144-48s64.5-48 144-48 144 21.5 144 48-64.5 48-144 48zm272 28.3c-7.1 8.3-34.9 22.6-80 30.4V283c31-4.6 58.7-12.1 80-22.2v39.5zm0-96c-7.1 8.3-34.9 22.6-80 30.4V208c0-7.2-2.5-14.2-6.8-20.9 33.8-5.3 64-14.8 86.8-27.8v45zM320 144c-5 0-9.8-.3-14.7-.5-26-7.9-56.8-13.2-90.4-14.9C191 120 176 108.6 176 96c0-26.5 64.5-48 144-48s144 21.5 144 48-64.5 48-144 48z"
          ></path>
        </svg>
      ),
    },
  ];
  return (
    <div id="Canvas">
      <Navbar>
        <a
          download={"image.png"}
          className="download"
          href={href}
          onClick={download}
        >
          Download
        </a>
      </Navbar>
      <div style={{ display: "flex" }}>
        <div className="w-[400px]">
          <div className="grid grid-row-2 grid-cols-3 gap-2 p-6">
            {TOOLBUTTON.map((toolbar) => (
              <Toolbarbutton {...toolbar} />
            ))}
          </div>
          <div className="flex mt-3 justify-center gap-1">
            <svg
              onClick={addText}
              className={
                "w-8 h-8 text-gray-800 rounded-md dark:text-white cursor-pointer float-left border " +
                (false
                  ? "border-gray-500 bg-blue-300"
                  : "bg-gray-100 border-gray-200")
              }
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3"
              />
            </svg>
            {TOOLBARS.map((toolbar) => (
              <ToolbarItem {...toolbar} />
            ))}
            <svg
              className={
                "w-8 h-8 text-gray-800 rounded-md dark:text-white cursor-pointer float-left border " +
                (false
                  ? "border-gray-500 bg-blue-300"
                  : "bg-gray-100 border-gray-200")
              }
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 18h14v3H5zm7.5-14h-1c-.401 0-.764.24-.921.609L5.745 16h2.173l1.273-3h5.604l1.268 3h2.171L13.421 4.61A1 1 0 0 0 12.5 4zm-2.46 7 1.959-4.616L13.95 11h-3.91z" />
            </svg>
            <svg
              className={
                "w-8 h-8 text-gray-800 rounded-md dark:text-white cursor-pointer border " +
                (false
                  ? "border-gray-500 bg-blue-300"
                  : "bg-gray-100 border-gray-200")
              }
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="0 0 32 32"
              id="icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="26" width="24" height="4" />
              <path d="M26,14.54a1,1,0,0,0-.25-.69L17.17,4.33A1.09,1.09,0,0,0,17,4.2V2H15V5L4.32,14.74a1,1,0,0,0-.06,1.41l8.57,9.52a1,1,0,0,0,.69.33h.05a1,1,0,0,0,.68-.26L24,16.8V21a1,1,0,0,0,2,0V14.57S26,14.55,26,14.54Zm-12.35,9-7.23-8L15,7.67V12h2V7.13l6.59,7.33Z" />
            </svg>
          </div>
          <div className="flex justify-center">
            <TwitterPicker
              className="z-10 m-3"
              color={backgroundColor}
              onChange={onColorChange}
            />
          </div>
          <div className="flex items-center mt-3">
            <button
              type="button"
              id="decrement-button"
              onClick={() => {
                setFontSize((fontSize) => fontSize - 1);
              }}
              data-input-counter-decrement="counter-input"
              class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                class="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2rem] text-center"
              placeholder=""
              value={fontSize}
              defaultValuevalue="12"
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              onClick={() => {
                setFontSize((fontSize) => fontSize + 1);
              }}
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                class="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div>
            <label>Font Color </label>
            <button onClick={() => colorPickerRef.current.click()}>aaa</button>
            <input
              ref={colorPickerRef}
              type="color"
              value={color}
              size="10"
              onChange={textColorChange}
              style={{ display: "none" }}
            />
            <label>Font Fill:</label>
            <input type="color" size="10" onChange={textBgColorChange} />
          </div>

          <div>
            <button onClick={addTemplate}>Add Template</button>
          </div>
          <div>
            <label>Zoom </label>
            <button onClick={zoomOut}>-</button>
            <select
              className="zoom"
              onChange={zoomToPercent}
              value={canvasScale * 100}
            >
              {options}
              <option value="100">FIT</option>
              <option value="200">FILL</option>
            </select>
            <button onClick={zoomIn}>+</button>
          </div>
          <div>
            <label htmlFor="img">Upload image</label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
        </div>
        <div className="w-[calc(100vw-400px)]" ref={containerRef}>
          <canvas
            id="canvas"
            style={{
              width: "100%",
              height: "calc(100vh - 50px)",
              border: "2px solid black",
              margin: "auto",
            }}
            ref={canvasRef}
          ></canvas>
        </div>
        <BoardDrawer
          isOpen={isOpenBoardDrawer}
          setIsOpen={setIsOpenBoardDrawer}
          addCylinder={addCylinder}
        />
        <CakeDrawer
          isOpen={isOpenCakeDrawer}
          setIsOpen={setIsOpenCakeDrawer}
          addDesignItem={addDesignItem}
        />
        <AddDecoration
          isOpen={isOpenAddDecoration}
          setIsOpen={setIsOpenAddDecoration}
          onImageAdd={onImageAdd}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  editorState: state.editor,
});

const mapDispatchToProps = (dispatch) => ({
  setCanvas: (data) => dispatch(setCanvas(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
