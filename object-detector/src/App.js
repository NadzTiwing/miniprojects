import "./App.css";
import { useState, useEffect } from "react";

const objects = [
  {
    object: "juice",
    x: 1,
    y: 1,
    w: 230,
    h: 250,
  },
  {
    object: "oranges",
    x: 200,
    y: 230,
    w: 320,
    h: 230,
  },
  {
    object: "bread",
    x: 600,
    y: 280,
    w: 250,
    h: 250,
  },
];

function ImageDetector() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [objWidth, setObjWidth] = useState(0);
  const [objHeight, setObjHeight] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const image = document.querySelector("#image");
    if (image) {
      let linkSrc = image.src;
      const imageCopy = document.createElement("img");
      imageCopy.src = linkSrc;
      setWidth(imageCopy.width);
      setHeight(imageCopy.height);
    }
  }, [width, height]);

  const handleClick = (object) => {
    objects.map((item) => {
      if (item.object === object) {
        setXPosition(item.x);
        setYPosition(item.y);
        setObjWidth(item.w);
        setObjHeight(item.h);
        setSelectedItem(object.toUpperCase());
      }
    });
  };

  return (
    <div className="App">
      <div className="row container">
        <p className="text-center">
          <strong>Simple Image Labeling</strong>
        </p>
        <div className="row mt-2 mb-3">
          <div className="col-4">
            {objects.map((item) => (
              <button
                className="btn btn-secondary col-12 my-2"
                key={item.object}
                onClick={() => handleClick(item.object)}
              >
                {item.object}
              </button>
            ))}
          </div>
          <div className="col-8">
            <div style={{ position: "relative" }}>
              <img
                id="image"
                src={`/img/foods.jpg`}
                alt="food-image"
                className="w-100"
              />
              <svg
                preserveAspectRatio="none"
                className="image-map"
                viewBox={`0 0 ${width} ${height}`}
              >
                <rect
                  className="selected-object"
                  x={xPosition}
                  y={yPosition}
                  width={objWidth}
                  height={objHeight}
                ></rect>
                <rect
                  className="wrap-text"
                  x={xPosition}
                  y={yPosition}
                  width={objWidth}
                  height="20"
                ></rect>
                <text className="object-name" x={xPosition} y={yPosition + 15}>
                  {selectedItem}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .image-map {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
          }

          .selected-object {
            position: absolute;
            top: 0;
            left: 0;
            fill: transparent;
            stroke: #ff9e0d;
            stroke-width: 5px;
          }

          .wrap-text {
            fill: #ff9e0d;
          }

          .object-name {
            z-index: 999;
          }
        `}
      </style>
    </div>
  );
}

export default ImageDetector;
