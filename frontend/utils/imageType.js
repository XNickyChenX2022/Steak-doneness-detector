function getImageType(uri) {
  // Extract the file extension from the URI
  const fileExtension = uri.split(".").pop().toLowerCase();
  const imageTypeMap = {
    jpg: ["image.jpg", "image/jpg"],
    jpeg: ["image.jpeg", "image/jpeg"],
    png: ["img.png", "image/png"],
  };
  if (imageTypeMap.hasOwnProperty(fileExtension)) {
    return imageTypeMap[fileExtension];
  } else {
    return "Unknown";
  }
}

export default getImageType;
