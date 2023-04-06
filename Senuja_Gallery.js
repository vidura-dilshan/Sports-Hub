function increaseFontSize() {
    var element = document.getElementById("image-description");
    var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
    var currentFontSize = parseFloat(style);
    element.style.fontSize = (currentFontSize + 1) + 'px';
  }
  
function decreaseFontSize() {
    var element = document.getElementById("image-description");
    var style = window.getComputedStyle(element, null).getPropertyValue('font-size');
    var currentFontSize = parseFloat(style);
    element.style.fontSize = (currentFontSize - 1) + 'px';
  }

function changeColor(fontColor, bgColor) {
		document.body.style.color = fontColor;
		document.body.style.backgroundColor = bgColor;
	}  
  
  function randomColors() {
      var randomColor1 = Math.floor(Math.random()*16777215).toString(16);
			var randomColor2 = Math.floor(Math.random()*16777215).toString(16);
			document.body.style.backgroundColor = "#" + randomColor1;
      document.body.style.color = "#" + randomColor2;
  }

  function thumbnailimage(smallImage) {
    var fullImage = document.getElementById("image-box");
    var imageTitle = document.getElementById("image-title");
    var imageDescription = document.getElementById("image-description");
    
    fullImage.src = smallImage.src;
    imageTitle.innerText = smallImage.alt;
    imageDescription.innerText = smallImage.getAttribute("data-description");
  }