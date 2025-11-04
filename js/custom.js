const uploadBox = document.querySelector(".upload-img-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".btn-stlye");

let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0]; // Getting the first selected file
  if(!file) return; // return if user hasn't selected any file
  previewImg.src = URL.createObjectURL(file); // Passing selected file url to preview Image Src
  previewImg.addEventListener("load" , () => {
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".upload-wraper").classList.add("active-upload");
  });
  console.log(file);  
}

widthInput.addEventListener("keyup" , () => {
  // Getting height according to the ratio checkbox status
  const height = ratioInput.checked ? widthInput.value * ogImageRatio : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
  widthInput.value = Math.floor(width);
})

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctn = canvas.getContext("2d");

  // If Quality pass the image ratio 0.7 imageQuality else pass 1.0
  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  // Setting Canvas width And Height accroding to the input value
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  // Drawing user selected image onto the canvas
  ctn.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  document.body.appendChild(canvas);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click(); // Clicking <a> element so the file download
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);

uploadBox.addEventListener("click", () => fileInput.click());