// ---------------------------------------------------------------------------
// CANVAS WIDTH UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * finds the active device depending on which range (between the
 * available devices) the current canvas width is in. Assumes
 * Desktop first design, i.e. this function is based on "
 * min-width" media queries
 * @param {number} testValue
 * @param {[]} array
 * @returns {string} the id of the selected device
 *
 * @todo Implement correct functionality for mobile-first
 * design
 */
export const findActiveDevice = function (testValue, array) {
  let result;
  array.find((val, valIndex) => {
    if (val[0] < testValue && valIndex > 0) {
      if (valIndex - 1) {
      }
      result = array[valIndex - 1][1];
      return true;
    } else if (val[0] < testValue && valIndex == 0) {
      result = array[valIndex][1];
      return true;
    } else if (testValue <= val[0] && valIndex === array.length - 1) {
      result = array[valIndex][1];
      return true;
    }
  });
  return result;
};

/**
 * adds the handles (i.e. HTML elements) that adjust the canvas
 * width to the UI
 */
export const addCanvasWidthAdjusters = () => {
  const rightScrollController = document.querySelector(
    ".gjs-frame-wrapper__right"
  );
  rightScrollController.classList.remove("hidden");
  rightScrollController.classList.add("group");
  rightScrollController.classList.add("cursor-grab");
  rightScrollController.classList.add("active:cursor-grabbing");
  rightScrollController.innerHTML =
    '<div data-right-scroll class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
  rightScrollController.style.width = "50px";
  rightScrollController.style.padding = "0 15px";
  rightScrollController.style.height = "100px";
  rightScrollController.setAttribute("title", "Drag to adjust");

  const leftScrollController = document.querySelector(
    ".gjs-frame-wrapper__left"
  );
  leftScrollController.classList.remove("hidden");
  leftScrollController.classList.add("group");
  leftScrollController.classList.add("cursor-grab");
  leftScrollController.classList.add("active:cursor-grabbing");
  leftScrollController.innerHTML =
    '<div data-left-scroll class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"></div>';
  leftScrollController.style.width = "50px";
  leftScrollController.style.padding = "0 15px";
  leftScrollController.style.height = "100px";
  leftScrollController.setAttribute("title", "Drag to adjust");
};

/**
 * hides the handles (i.e. HTML elements) that adjust the canvas
 * width
 */
export const hideCanvasWidthAdjusters = () => {
  const rightScrollController = document.querySelector(
    ".gjs-frame-wrapper__right"
  );
  rightScrollController.classList.add("hidden");
  rightScrollController.innerHTML = "";

  const leftScrollController = document.querySelector(
    ".gjs-frame-wrapper__left"
  );
  leftScrollController.classList.add("hidden");
  leftScrollController.innerHTML = "";
};

export const addScrollEventToHandles = function () {
  addCanvasWidthAdjusters();
  const right_drag = document.querySelector(".gjs-frame-wrapper__right");
  const left_drag = document.querySelector(".gjs-frame-wrapper__left");
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  // Add event listeners
  right_drag.addEventListener("mousedown", addRightHandleEvent);
  left_drag.addEventListener("mousedown", addLeftHandleEvent);
};

export const removeScrollEventToHandles = function (editor) {
  hideCanvasWidthAdjusters();
  const right_drag = document.querySelector(".gjs-frame-wrapper__right");
  const left_drag = document.querySelector(".gjs-frame-wrapper__left");
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  // Add event listeners
  right_drag.removeEventListener("mousedown", addRightHandleEvent);
  left_drag.removeEventListener("mousedown", addLeftHandleEvent);
};

export const onRightDragHandler = (e) => {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.remove("pointer-events-auto");
  frame_wrapper.classList.remove("pointer-events-none");
  frame_wrapper.classList.add("pointer-events-none");
  const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
  const to = e.clientX;
  const newWidth = to - frame_wrapper.getBoundingClientRect().left;
  if (newWidth < canvasFrames.getBoundingClientRect().width) {
    frame_wrapper.style.transition = "unset";
    frame_wrapper.style.width = newWidth + "px";
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
    frame_wrapper.style.transition = "unset";
    frame_wrapper.style.width = newWidth + "px";
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
