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
  rightScrollController.innerHTML = `
    <div 
      data-right-scroll 
      class="bg-grey-light group-active:bg-primary text-[0px] w-full rounded-full m-auto h-full text-transparent pointer-events-none"
    >
    </div>`;

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

export const addRightHandleEvent = function (mdEvent) {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.add("pointer-events-none");
  frame_wrapper.classList.remove("pointer-events-auto");

  const startWidth = frame_wrapper.getBoundingClientRect().width;
  let lastX = mdEvent.clientX;

  const onMouseMove = (mvEvent) => {
    // Change drag handle pointer-events state
    frame_wrapper.classList.remove("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");
    frame_wrapper.classList.add("pointer-events-none");

    // Handle mousemove
    const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
    const maxPossibleWidth = canvasFrames.getBoundingClientRect().width;
    const deltaX = mvEvent.clientX - lastX;

    const newWidth = startWidth + 2 * deltaX;
    if (newWidth < maxPossibleWidth) {
      frame_wrapper.style.transition = "unset";
      frame_wrapper.style.width = newWidth + "px";
    }
  };

  const onMouseUp = () => {
    // Change drag handle pointer-events state
    const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
    frame_wrapper.classList.add("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");

    // Remove drag event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Add event listeners
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

export const addLeftHandleEvent = function (mdEvent) {
  const frame_wrapper = document.querySelector(".gjs-frame-wrapper");
  frame_wrapper.classList.add("pointer-events-none");
  frame_wrapper.classList.remove("pointer-events-auto");

  const startWidth = frame_wrapper.getBoundingClientRect().width;
  let lastX = mdEvent.clientX;

  const onMouseMove = (mvEvent) => {
    // Add handle's pointer events
    frame_wrapper.classList.remove("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");
    frame_wrapper.classList.add("pointer-events-none");

    // Handle mousemove
    const canvasFrames = document.querySelector(".gjs-cv-canvas__frames");
    const maxPossibleWidth = canvasFrames.getBoundingClientRect().width;
    const deltaX = lastX - mvEvent.clientX;

    const newWidth = startWidth + 2 * deltaX;
    if (newWidth < maxPossibleWidth) {
      frame_wrapper.style.transition = "unset";
      frame_wrapper.style.width = newWidth + "px";
    }
  };

  const onMouseUp = () => {
    // Remove handle's pointer events
    frame_wrapper.classList.add("pointer-events-auto");
    frame_wrapper.classList.remove("pointer-events-none");

    // Remove event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Add event listerners
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
