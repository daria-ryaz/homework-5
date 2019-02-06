var square = document.querySelector('.dragElement');

square.onmousedown = function(e) {

  var coords = getCoords(square);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

// разместить элемент в абсолютных координатах
  square.style.position = 'absolute';
// переместим в body, чтобы квадрат был точно не внутри position:relative
  document.body.appendChild(square);
  moveAt(e);

  square.style.zIndex = 1000; //показывать над другими элементами

// передвинуть квадрат под координаты курсора
// с сохранением точки нажатия курсора на элемент 
  function moveAt(e) {
    square.style.left = e.pageX - shiftX + 'px';
    square.style.top = e.pageY - shiftY + 'px';
  }

// перемещать по экрану
  document.onmousemove = function(e) {
    moveAt(e);
  };
// окончание переноса
  square.onmouseup = function() {
    document.onmousemove = null;
    square.onmouseup = null;
  };

}

// отключение автоматического Drag'n'Drop браузера
square.ondragstart = function() {
  return false;
};

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
