/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

/**
 * Accepted color keywords by android.graphics.Color.parseColor
 *
 * @see https://developer.android.com/reference/android/graphics/Color#parseColor(java.lang.String)
 */
export const acceptedColorKeywordsAndroid = [
  "red",
  "blue",
  "green",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "yellow",
  "lightgray",
  "darkgray",
  "grey",
  "lightgrey",
  "darkgrey",
  "aqua",
  "fuchsia",
  "lime",
  "maroon",
  "navy",
  "olive",
  "purple",
  "silver",
  "teal"
];

export function getValidColorAndroid(color: string): string {
  // #RRGGBB, #AARRGGBB or accepted keyword.
  if (acceptedColorKeywordsAndroid.includes(color)) {
    return color;
  }

  try {
    return sanitizeHexColor(color);
  } catch (unusedError) {
    throw "Given color is invalid or not accepted by android.graphics.Color.\n" +
      "See https://developer.android.com/reference/android/graphics/Color#parseColor(java.lang.String) " +
      "for more information.";
  }
}

export function sanitizeHexColor(hex: string): string {
  if (RegExp(/^#[0-9a-f]{6,8}$/i).test(hex)) {
    return hex;
  }

  // Short hex color syntax #RGB, #ARGB.
  if (RegExp(/^#[0-9a-f]{3,4}$/i).test(hex)) {
    let fullHexColor = "#";
    for (const char of hex.slice(1)) {
      fullHexColor += char + char;
    }

    return fullHexColor;
  }

  throw "Given Hex color string is invalid.";
}
