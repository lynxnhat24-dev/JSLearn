let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let downloadButton = document.getElementById("download");
let aspectRatioBtns = document.querySelectorAll(".aspect-ratio-btns");

const rotateRightButton = document.getElementById("rotate-right");
const rotateLeftButton = document.getElementById("rotate-left");
const scaleXButton = document.getElementById("scale-X-button");
const scaleYButton = document.getElementById("scale-Y-button");
const previewButton = document.getElementById("preview");
const previewImage = document.getElementById("preview-image");
const options = document.querySelector(".options-btn");

let cropper = "";
let fileName = "";
let scaleXClick = false;
let scaleYClick = false;
let rotateRightValue = -45, rotateLeftValue = 45;

window.onload = () => {}
    downloadButton.classList.add("hide");
    options.classList.add("hide");
    previewButton.classList.add("hide");
;

fileInput.onchange = () => {
    let reader = new FileReader();

    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);

        if (cropper){
            cropper.destroy();
        }
        cropper = new Cropper(image);
        options.classList.remove("hide");
        previewButton.classList.remove("hide");
    };

    fileName = fileInput.files[0].name.split(".")[0];
};

aspectRatioBtns.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText == "Free"){
            cropper.setAspectRatio(NaN);
        }else{
            cropper.setAspectRatio(eval(element.innerText.replace(":", "/")))
        }
    });
});

rotateRightButton.addEventListener("click", () => {
    cropper.rotate(rotateRightValue);
});

rotateLeftButton.addEventListener("click", () => {
    cropper.rotate(rotateLeftValue);
});

scaleXButton.addEventListener("click", () => {
    if (scaleXClick){
        cropper.scaleX(1);
        scaleXClick = false;
    }else{
        cropper.scaleX(-1);
        scaleXClick = true;
    }
});

scaleYButton.addEventListener("click", () => {
    if (scaleYClick){
        cropper.scaleY(1);
        scaleYClick = false;
    }else{
        cropper.scaleY(-1);
        scaleYClick = true;
    }
});

previewButton.addEventListener("click", () => {
    downloadButton.classList.remove("hide");
    let imgSrc = cropper.getCroppedCanvas().toDataURL();
    previewImage.src = imgSrc;
});

downloadButton.addEventListener("click", (e) => {
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();
    downloadButton.download = `cropped_${fileName}.png`;
    downloadButton.setAttribute("href", imgSrc);
});