let getImageBtn =document.getElementById("getImageBtn");
let cropImageBtn =document.getElementById("cropImageBtn");
let getImage =document.getElementById("getImage");
let inputImg =document.getElementById("inputImg");
let outputImg =document.getElementById("outputImg");
let downloadBtn=document.getElementById("downloadBtn");
let aspectRatio = document.querySelectorAll(".aspect-ratio-button");
const options = document.querySelector(".options");
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");
let container =document.getElementsByClassName("container");
let imgbox =document.getElementsByClassName("imgbox");
let cropper='';
let fileName='';
getImage.onchange=()=>{
        let reader =new FileReader()
        reader.readAsDataURL(getImage.files[0])
        cropImageBtn.src='';
        reader.onload=()=>{
        if(cropper){
            cropper.destroy();
        }
        inputImg.src=reader.result;
        cropper =new Cropper(inputImg);
        options.classList.remove("hide");
        cropImageBtn.classList.remove("hide");
        container[0].style.gap= "30px";
    }
    fileName=getImage.files[0].name.split(".")[0]
}
cropImageBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let croppedimage=cropper.getCroppedCanvas({}).toDataURL();
    container[0].style.paddingTop= "8%";
    outputImg.src=croppedimage;
    downloadBtn.classList.remove("hide");
})

downloadBtn.addEventListener('click',()=>{
    if(outputImg.src!="http://127.0.0.1:5500/cropper.html"){
        let atag=document.createElement("a"); 
        atag.href=outputImg.src;
        atag.download=`cropped_${fileName}`;
        document.body.appendChild(atag);
        atag.click();
        atag.remove();
        URL.revokeObjectURL(outputImg.src)
    }
    else{
        alert("Crop image First..")
    }
})

aspectRatio.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.innerText == "Free") {
        cropper.setAspectRatio(NaN);
      } else {
        cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
      }
    });
  });

heightInput.addEventListener("input", () => {
    const { height } = cropper.getImageData();
    if (parseInt(heightInput.value) > Math.round(height)) {
      heightInput.value = Math.round(height);
    }
    let newHeight = parseInt(heightInput.value);
    cropper.setCropBoxData({ height: newHeight });
  });
  widthInput.addEventListener("input", () => {
    const { width } = cropper.getImageData();
    if (parseInt(widthInput.value) > Math.round(width)) {
      widthInput.value = Math.round(width);
    }
    let newWidth = parseInt(widthInput.value);
    cropper.setCropBoxData({ width: newWidth });
  });
  window.onload = () => {
    downloadBtn.classList.add("hide");
    options.classList.add("hide");
    cropImageBtn.classList.add("hide");
  };
