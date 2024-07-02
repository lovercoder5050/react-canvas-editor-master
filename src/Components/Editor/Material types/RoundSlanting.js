import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

// Define the custom RoundSlanting class
fabric.RoundSlanting = fabric.util.createClass(fabric.Object, {
  type: "roundslanting",

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
    const { width, height, depth, strokeWidth, fillColor, strokeColor } = this;
    const radius =
      width / 2 - height / 8 < 0 ? width / 2 - 5 : width / 2 - height / 8;
    // // Draw the side rectangle without the bottom edge
    ctx.beginPath();
    ctx.moveTo(
      -(width / 2 + height / 8) * Math.cos(Math.PI / 16),
      -height - (width / 2 + height / 8) * Math.sin(Math.PI / 16)
    );
    ctx.lineTo(
      (width / 2 + height / 8) * Math.cos(Math.PI / 16),
      -height + (width / 2 + height / 8) * Math.sin(Math.PI / 16)
    );
    ctx.ellipse(0, height, radius, width / 16, 0, 0, Math.PI);

    ctx.closePath();
    ctx.fillStyle = this._createGradient(ctx, width, height);
    ctx.fill();
    ctx.stroke();

    // Draw the top ellipse
    ctx.beginPath();
    ctx.ellipse(
      0,
      -height,
      width / 2 + height / 8,
      width / 16,
      Math.PI / 16,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this._lightenColor(fillColor, 0.2);
    ctx.fill();
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = strokeWidth;
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

fabric.RoundSlanting.fromObject = function (object, callback) {
  return fabric.Object._fromObject("RoundSlanting", object, callback);
};
