function hexToRGB(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
}

const closestColor = (targetColor, colorArray) => {
  let closestDistance = Infinity;
  let closestColor1 = null;

  console.log("target: " + targetColor);
  console.log("colorArray: " + colorArray);

  const { r: r1, g: g1, b: b1 } = hexToRGB(targetColor);

  colorArray.forEach((color) => {
    const { r: r2, g: g2, b: b2 } = hexToRGB(color);

    const distance = Math.sqrt(
      (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
    );
    console.log(color + ": " + distance);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor1 = color;
    }
  });

  return closestColor1;
};

export default closestColor;
