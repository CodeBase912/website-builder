// ---------------------------------------------------------------------------
// CANVAS WIDTH EVENT LISTENERS
// ---------------------------------------------------------------------------

export const onRightDragHandler = (e) => {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.remove("pointer-events-auto");
  frame_wrapper.classList.remove("pointer-events-none");
  frame_wrapper.classList.add("pointer-events-none");
  const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
  const to = e.clientX;
  const newWidth = to - frame_wrapper.getBoundingClientRect().left;
  if (newWidth < canvasFrames.getBoundingClientRect().width) {
    frame_wrapper.style.width = newWidth + "px";
    // Update canvas-width-input value (canvas min-width: 100)
    document.querySelector("#canvas-width-input").value =
      newWidth > 100 ? Math.ceil(frame_wrapper.style.width.split("p")[0]) : 100;
  }
};

export const onLeftDragHandler = (e) => {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.remove("pointer-events-auto");
  frame_wrapper.classList.remove("pointer-events-none");
  frame_wrapper.classList.add("pointer-events-none");
  const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
  const to = e.clientX;
  const newWidth = frame_wrapper.getBoundingClientRect().right - to;
  if (newWidth < canvasFrames.getBoundingClientRect().width) {
    frame_wrapper.style.width = newWidth + "px";
    // Update canvas-width-input value (canvas min-width: 100)
    document.querySelector("#canvas-width-input").value =
      newWidth > 100 ? Math.ceil(frame_wrapper.style.width.split("p")[0]) : 100;
  }
};

export const onDragStopHandler = () => {
  // Remove drag event listeners
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.add("pointer-events-auto");
  frame_wrapper.classList.remove("pointer-events-none");
  document.removeEventListener("mousemove", onRightDragHandler);
  document.removeEventListener("mousemove", onLeftDragHandler);
  document.removeEventListener("mouseup", onDragStopHandler);
};

export const addRightHandleEvent = function () {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.add("pointer-events-none");
  frame_wrapper.classList.remove("pointer-events-auto");
  document.addEventListener("mousemove", onRightDragHandler);
  document.addEventListener("mouseup", onDragStopHandler);
};
export const addLeftHandleEvent = function () {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.add("pointer-events-none");
  frame_wrapper.classList.remove("pointer-events-auto");
  document.addEventListener("mousemove", onLeftDragHandler);
  document.addEventListener("mouseup", onDragStopHandler);
};

// --------------------------------------------------
// TEST OBJECT
// --------------------------------------------------
const test = {
  onRightDragHandler: function (e) {
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    frame_wrapper.classList.remove("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");
    frame_wrapper.classList.add("pointer-events-none");
    const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
    const to = e.clientX;
    const newWidth = to - frame_wrapper.getBoundingClientRect().left;
    if (newWidth < canvasFrames.getBoundingClientRect().width) {
      frame_wrapper.style.width = newWidth + "px";
    }
  },
  onLeftDragHandler: function (e) {
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    frame_wrapper.classList.remove("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");
    frame_wrapper.classList.add("pointer-events-none");
    const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
    const to = e.clientX;
    const newWidth = frame_wrapper.getBoundingClientRect().right - to;
    if (newWidth < canvasFrames.getBoundingClientRect().width) {
      frame_wrapper.style.width = newWidth + "px";
    }
  },
  onDragStopHandler: function () {
    // Remove drag event listeners
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    frame_wrapper.classList.add("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");
    document.removeEventListener("mousemove", this.onRightDragHandler);
    document.removeEventListener("mousemove", this.onLeftDragHandler);
    document.removeEventListener("mouseup", this.onDragStopHandler);
  },
  addRightHandleEvent: function () {
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    frame_wrapper.classList.add("pointer-events-none");
    frame_wrapper.classList.remove("pointer-events-auto");
    document.addEventListener("mousemove", this.onRightDragHandler);
    document.addEventListener("mouseup", this.onDragStopHandler);
  },
  addLeftHandleEvent: function () {
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    frame_wrapper.classList.add("pointer-events-none");
    frame_wrapper.classList.remove("pointer-events-auto");
    document.addEventListener("mousemove", this.onLeftDragHandler);
    document.addEventListener("mouseup", this.onDragStopHandler);
  },
  addScrollEventToHandles: function () {
    const right_drag = document.querySelector(".gjs-frame-wrapper__right");
    const left_drag = document.querySelector(".gjs-frame-wrapper__left");
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    // Add event listeners
    right_drag.addEventListener("mousedown", this.addRightHandleEvent);
    left_drag.addEventListener("mousedown", this.addLeftHandleEvent);
  },
  removeScrollEventToHandles: function () {
    console.log("Removeing events >>>>>>>>>>>>");
    const right_drag = document.querySelector(".gjs-frame-wrapper__right");
    const left_drag = document.querySelector(".gjs-frame-wrapper__left");
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    // Add event listeners
    right_drag.removeEventListener("mousedown", this.addRightHandleEvent);
    left_drag.removeEventListener("mousedown", this.addLeftHandleEvent);
  },
  run: function () {
    this.addScrollEventToHandles();
  },
  stop: function () {
    this.removeScrollEventToHandles();
  },
};
