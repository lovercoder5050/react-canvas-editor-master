import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

// Define the custom Cylinder class
fabric.Cylinder = fabric.util.createClass(fabric.Object, {
  type: "cylinder",

  initialize: function (options) {
    options = options || {};
    this.callSuper("initialize", options);
    this.set({
      radius: options.radius || 500,
      height: options.height || 50, // Low height for a CD-like shape
      fillColor: options.fillColor || "blue",
      strokeColor: options.strokeColor || "black",
      strokeWidth: options.strokeWidth || 1,
    });
  },

  _render: function (ctx) {
    const radius = this.radius;
    const height = this.height;
    const strokeWidth = this.strokeWidth;

    // Draw the side rectangle without the bottom edge
    ctx.beginPath();
    ctx.moveTo(-radius, -height / 2);
    ctx.lineTo(-radius, height / 2);
    ctx.lineTo(radius, height / 2);
    ctx.lineTo(radius, -height / 2);
    ctx.closePath();
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.stroke();

    // Draw the top ellipse
    ctx.beginPath();
    ctx.ellipse(0, -height / 2, radius, radius / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    // Draw the bottom ellipse
    ctx.beginPath();
    ctx.ellipse(0, height / 2, radius, radius / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.stroke();
  },

  _createGradient: function (ctx, radius, height) {
    const gradient = ctx.createLinearGradient(
      -radius,
      -height / 2,
      radius,
      height / 2
    );
    gradient.addColorStop(0, this._lightenColor(this.fillColor, 0.5));
    gradient.addColorStop(1, this._darkenColor(this.fillColor, 0.5));
    return gradient;
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
      radius: this.radius,
      height: this.height,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    });
  },
});

fabric.Cylinder.fromObject = function (object, callback) {
  return fabric.Object._fromObject("Cylinder", object, callback);
};
