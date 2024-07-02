import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

// Define the custom Hexagon class
fabric.Hexagon = fabric.util.createClass(fabric.Object, {
  type: "Hexagon",

  initialize: function (options) {
    options = options || {};
    this.callSuper("initialize", options);
    this.set({
      width: options.width || 1500,
      height: options.height || 1500,
      depth: options.depth || 50,
      fillColor: options.fillColor || "grey",
      strokeColor: options.strokeColor || "black",
      strokeWidth: options.strokeWidth || 1,
    });
  },

  _render: function (ctx) {
    const { width, height, depth, strokeWidth, fillColor, strokeColor } = this;
    const x = width / 2;
    const y = height / 2;
    // Coordinates for the front face
    const frontTopLeft = { x: -x, y: -y };
    const frontTopRight = { x: x, y: -y };
    const frontBottomLeft = { x: -x, y: y };
    const frontBottomRight = { x: x, y: y };

    // Coordinates for the top face
    const leftTopLeft = {
      x: -x * ((1.7 * 0.7) / 2 + 1),
      y: -y - (0.7 / 2) * x,
    };
    const topTopLeft = { x: -x, y: -y - 0.7 * x };
    const topTopRight = { x: x, y: -y - 0.7 * x };
    const rightTopRight = {
      x: x * ((1.7 * 0.7) / 2 + 1),
      y: -y - (0.7 / 2) * x,
    };
    const rightBottomRight = {
      x: x * ((1.7 * 0.7) / 2 + 1),
      y: y - (0.7 / 2) * x,
    };
    const leftBottomLeft = {
      x: -x * ((1.7 * 0.7) / 2 + 1),
      y: y - (0.7 / 2) * x,
    };

    // Draw the top face
    ctx.beginPath();
    ctx.moveTo(leftTopLeft.x, leftTopLeft.y);
    ctx.lineTo(topTopLeft.x, topTopLeft.y);
    ctx.lineTo(topTopRight.x, topTopRight.y);
    ctx.lineTo(rightTopRight.x, rightTopRight.y);
    ctx.lineTo(rightTopRight.x, rightTopRight.y);
    ctx.lineTo(frontTopRight.x, frontTopRight.y);
    ctx.lineTo(frontTopLeft.x, frontTopLeft.y);
    ctx.closePath();
    ctx.fillStyle = this._lightenColor(fillColor, 0.2);
    ctx.fill();
    ctx.stroke();

    // // Draw the front face
    ctx.beginPath();
    ctx.moveTo(leftTopLeft.x, leftTopLeft.y);
    ctx.lineTo(frontTopLeft.x, frontTopLeft.y);
    ctx.lineTo(frontTopRight.x, frontTopRight.y);
    ctx.lineTo(rightTopRight.x, rightTopRight.y);
    ctx.lineTo(rightBottomRight.x, rightBottomRight.y);
    ctx.lineTo(frontBottomRight.x, frontBottomRight.y);
    ctx.lineTo(frontBottomLeft.x, frontBottomLeft.y);
    ctx.lineTo(leftBottomLeft.x, leftBottomLeft.y);
    ctx.closePath();
    ctx.fillStyle = this._darkenColor(fillColor, 0.2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(frontTopLeft.x, frontTopLeft.y);
    ctx.lineTo(frontBottomLeft.x, frontBottomLeft.y);
    ctx.lineTo(frontBottomRight.x, frontBottomRight.y);
    ctx.lineTo(frontTopRight.x, frontTopRight.y);
    ctx.closePath();
    ctx.fillStyle = this._darkenColor(fillColor, 0.1);
    ctx.fill();
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

fabric.Hexagon.fromObject = function (object, callback) {
  return fabric.Object._fromObject("Hexagon", object, callback);
};
