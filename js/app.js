(() => {
  //-------------Images Drag--------
  const navButtons = document.querySelectorAll("#buttonHolder img"),
        instruments = document.querySelectorAll('.instrument img'),
        dropAreas = document.querySelectorAll('.drop-area'),
        puzzleBoard = document.querySelector('.puzzle-board'),
  //-------------Images Drag--------
  //---------------Audio------------
        playButtons = document.querySelectorAll('.playButton'),
        pauseButtons = document.querySelectorAll('.pauseButton'),
        rwButtons = document.querySelectorAll('.rwButton'),
        audioElement = document.querySelector('audio');
  //---------------Audio------------

//-------------Images Drag--------
   pieces = ["left", "middleLeft", "middleRight", "right"];
//-------------Images Drag--------

//---------------Audio------------
  let globalPaused = false;
//---------------Audio------------

//-------------Images Drag--------
  function changeImageSet() {
    pieces.forEach((piece, index) => {
    instruments[index].src=`images/${piece + this.dataset.puzzleindex}.jpg`;
    instruments[index].id=`${piece + this.dataset.puzzleindex}`;
  });

    puzzleBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleindex}.jpg)`;
  }

  function dragStart(event) {
    console.log('started a drag');

    event.dataTransfer.setData("text/plain", this.id);
  }

  function allowDrag(event) {
    event.preventDefault();
    console.log('you dragged the image');
  }

  function allowDrop(event){
    console.log('you dropped the image');

    if (this.children.length > 0) { return false;}

  let currentPiece = event.dataTransfer.getData("text/plain");

  event.target.appendChild(document.querySelector(`#${currentPiece}`));
}
//-------------Images Drag--------

//---------------Audio------------

 function playTrack() {
    if (globalPaused) {
      console.log('paused');
      if (audioElement.getAttribute('src').includes(this.dataset.trackref)) {
       resumeTrack();
        return;
      }
    }

    let audioSource = this.dataset.trackref;

    audioElement.src = `audio/${audioSource}.mp3`;

    audioElement.load();
    audioElement.play();
  }

  function resumeTrack() {
    globalPaused = false;
    audioElement.play();
  }

  function pauseTrack() {
    audioElement.pause();
    globalPaused = true;
  }

function rwTrack() {
   audioElement.currentTime = 0;
 }
//---------------Audio------------

//-------------Images Drag--------
  navButtons.forEach(button => button.addEventListener('click', changeImageSet));
  instruments.forEach(piece => piece.addEventListener('dragstart', dragStart));
  dropAreas.forEach(zone => zone.addEventListener('dragover', allowDrag));
  dropAreas.forEach(zone => zone.addEventListener('drop', allowDrop));
  changeImageSet.call(navButtons[0])
//-------------Images Drag--------
//---------------Audio------------
  playButtons.forEach(button => button.addEventListener("click", playTrack));
  pauseButtons.forEach(button => button.addEventListener("click", pauseTrack));
  rwButtons.forEach(button => button.addEventListener("click", rwTrack));
  //---------------Audio------------
})();
