import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

// Define the custom SquarePillar class
fabric.SquarePillar = fabric.util.createClass(fabric.Object, {
  type: "squarePillar",

  initialize: function (options) {
    options = options || {};
    this.callSuper("initialize", options);
    this.set({
      width: options.width || 1500,
      height: options.height || 1500,
      depth: options.depth || 50,
      fillColor: options.fillColor || "blue",
      strokeColor: options.strokeColor || "black",
      strokeWidth: options.strokeWidth || 1,
    });
  },

  _render: function (ctx) {
    const { width, height, depth, strokeWidth, fillColor, strokeColor } = this;

    // Coordinates for the front face
    const frontTopLeft = { x: -width / 2, y: -height / 2 };
    const frontTopRight = { x: width / 2, y: -height / 2 };
    const frontBottomLeft = { x: -width / 2, y: height / 2 };
    const frontBottomRight = { x: width / 2, y: height / 2 };

    // Coordinates for the top face
    const topTopLeft = { x: -width / 2 + depth, y: -height / 2 - depth };
    const topTopRight = { x: width / 2 - depth, y: -height / 2 - depth };

    // Coordinates for the right face
    const rightTopRight = { x: width / 2 + depth, y: height / 2 - depth };

    // Draw the top face
    ctx.beginPath();
    ctx.moveTo(frontTopLeft.x, frontTopLeft.y);
    ctx.lineTo(topTopLeft.x, topTopLeft.y);
    ctx.lineTo(topTopRight.x, topTopRight.y);
    ctx.lineTo(frontTopRight.x, frontTopRight.y);
    ctx.closePath();
    ctx.fillStyle = this._lightenColor(fillColor, 0.2);
    ctx.fill();
    ctx.stroke();

    // Draw the front face
    ctx.beginPath();
    ctx.moveTo(frontTopLeft.x, frontTopLeft.y);
    ctx.lineTo(frontTopRight.x, frontTopRight.y);
    ctx.lineTo(frontBottomRight.x, frontBottomRight.y);
    ctx.lineTo(frontBottomLeft.x, frontBottomLeft.y);
    ctx.closePath();
    ctx.fillStyle = this._darkenColor(fillColor, 0.2);
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  },

  _darkenColor: function (color, factor) {
    let r, g, b;
    if (color.startsWith("#")) {
      const bigint = parseInt(color.slice(1), 16);
      r = (bigint >> 16) & 255;
      g = (bigint >> 8) & 255;
      b = bigint & 255;
    } else if (color.startsWith("rgb")) {
      const result = color.match(/\d+/g);
      r = parseInt(result[0]);
      g = parseInt(result[1]);
      b = parseInt(result[2]);
    } else {
      return color; // Unsupported format
    }

    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));

    return `rgb(${r},${g},${b})`;
  },

  _lightenColor: function (color, factor) {
    let r, g, b;
    if (color.startsWith("#")) {
      const bigint = parseInt(color.slice(1), 16);
      r = (bigint >> 16) & 255;
      g = (bigint >> 8) & 255;
      b = bigint & 255;
    } else if (color.startsWith("rgb")) {
      const result = color.match(/\d+/g);
      r = parseInt(result[0]);
      g = parseInt(result[1]);
      b = parseInt(result[2]);
    } else {
      return color; // Unsupported format
    }

    r = Math.floor(r + (255 - r) * factor);
    g = Math.floor(g + (255 - g) * factor);
    b = Math.floor(b + (255 - b) * factor);

    return `rgb(${r},${g},${b})`;
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      width: this.width,
      height: this.height,
      depth: this.depth,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    });
  },
});

fabric.SquarePillar.fromObject = function (object, callback) {
  return fabric.Object._fromObject("SquarePillar", object, callback);
};
