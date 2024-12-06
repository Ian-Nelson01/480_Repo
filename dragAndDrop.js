/***********************
 *      DRAG AND DROP   *
 ***********************/

// DO NOT TOUCH

// Link: https://github.com/TahaSh/drag-to-reorder

/**
MIT License

Copyright (c) 2023 Taha Shashtari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**/

/**
   Variables
**/

let listContainer;
let draggableItem;
let pointerStartX;
let pointerStartY;
let itemsGap = 0;
let items = [];
let prevRect = {};

/**
   Helper Functions
**/

export function getAllItems() {
  return Array.from(listContainer.querySelectorAll(".js-item"));
}

export function getIdleItems() {
  return getAllItems().filter((item) => item.classList.contains("is-idle"));
}

export function isItemAbove(item) {
  return item.hasAttribute("data-is-above");
}

export function isItemToggled(item) {
  return item.hasAttribute("data-is-toggled");
}

/**
   Setup
**/

export function setup() {
  listContainer = document.querySelector(".js-list");

  if (!listContainer) return;

  listContainer.addEventListener("mousedown", dragStart);
  listContainer.addEventListener("touchstart", dragStart);

  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("touchend", dragEnd);
}

/**
   Drag Start
**/

export function dragStart(e) {
  if (e.target.classList.contains("js-drag-handle")) {
    draggableItem = e.target.closest(".js-item");
  }

  if (!draggableItem) return;

  pointerStartX = e.clientX || e.touches?.[0]?.clientX;
  pointerStartY = e.clientY || e.touches?.[0]?.clientY;

  setItemsGap();
  disablePageScroll();
  initDraggableItem();
  initItemsState();
  prevRect = draggableItem.getBoundingClientRect();

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag, { passive: false });
}

function setItemsGap() {
  if (getIdleItems().length <= 1) {
    itemsGap = 0;
    return;
  }

  const item1 = getIdleItems()[0];
  const item2 = getIdleItems()[1];

  const item1Rect = item1.getBoundingClientRect();
  const item2Rect = item2.getBoundingClientRect();

  itemsGap = Math.abs(item1Rect.bottom - item2Rect.top);
}

function disablePageScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
  document.body.style.userSelect = "none";
}

function initItemsState() {
  getIdleItems().forEach((item, i) => {
    if (getAllItems().indexOf(draggableItem) > i) {
      item.dataset.isAbove = "";
    }
  });
}

function initDraggableItem() {
  draggableItem.classList.remove("is-idle");
  draggableItem.classList.add("is-draggable");
}

/**
   Drag
**/

export function drag(e) {
  if (!draggableItem) return;

  e.preventDefault();

  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;

  const pointerOffsetX = clientX - pointerStartX;
  const pointerOffsetY = clientY - pointerStartY;

  draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`;

  updateIdleItemsStateAndPosition();
}

function updateIdleItemsStateAndPosition() {
  const draggableItemRect = draggableItem.getBoundingClientRect();
  const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2;

  // Update state
  getIdleItems().forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemY = itemRect.top + itemRect.height / 2;
    if (isItemAbove(item)) {
      if (draggableItemY <= itemY) {
        item.dataset.isToggled = "";
      } else {
        delete item.dataset.isToggled;
      }
    } else {
      if (draggableItemY >= itemY) {
        item.dataset.isToggled = "";
      } else {
        delete item.dataset.isToggled;
      }
    }
  });

  // Update position
  getIdleItems().forEach((item) => {
    if (isItemToggled(item)) {
      const direction = isItemAbove(item) ? 1 : -1;
      item.style.transform = `translateY(${
        direction * (draggableItemRect.height + itemsGap)
      }px)`;
    } else {
      item.style.transform = "";
    }
  });
}

/**
   Drag End
**/

export function dragEnd(e) {
  if (!draggableItem) return;

  applyNewItemsOrder(e);
  cleanup();
}

function applyNewItemsOrder(e) {
  const reorderedItems = [];

  getAllItems().forEach((item, index) => {
    if (item === draggableItem) {
      return;
    }
    if (!isItemToggled(item)) {
      reorderedItems[index] = item;
      return;
    }
    const newIndex = isItemAbove(item) ? index + 1 : index - 1;
    reorderedItems[newIndex] = item;
  });

  for (let index = 0; index < getAllItems().length; index++) {
    const item = reorderedItems[index];
    if (typeof item === "undefined") {
      reorderedItems[index] = draggableItem;
    }
  }

  reorderedItems.forEach((item) => {
    listContainer.appendChild(item);
  });

  draggableItem.style.transform = "";

  requestAnimationFrame(() => {
    const rect = draggableItem.getBoundingClientRect();
    const yDiff = prevRect.y - rect.y;
    const currentPositionX = e.clientX || e.changedTouches?.[0]?.clientX;
    const currentPositionY = e.clientY || e.changedTouches?.[0]?.clientY;

    const pointerOffsetX = currentPositionX - pointerStartX;
    const pointerOffsetY = currentPositionY - pointerStartY;

    draggableItem.style.transform = `translate(${pointerOffsetX}px, ${
      pointerOffsetY + yDiff
    }px)`;
    requestAnimationFrame(() => {
      unsetDraggableItem();
    });
  });
}

function cleanup() {
  itemsGap = 0;
  items = [];
  unsetItemState();
  enablePageScroll();

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
}

function unsetDraggableItem() {
  draggableItem.style = null;
  draggableItem.classList.remove("is-draggable");
  draggableItem.classList.add("is-idle");
  draggableItem = null;
}

function unsetItemState() {
  getIdleItems().forEach((item, i) => {
    delete item.dataset.isAbove;
    delete item.dataset.isToggled;
    item.style.transform = "";
  });
}

function enablePageScroll() {
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
  document.body.style.userSelect = "";
}

export function simulateDragAndDrop() {
  const lastDragHandle = document.querySelector(".js-drag-handle:last-of-type");

  if (!lastDragHandle) return;
  const mouseDownEvent = new MouseEvent("mousedown", {
    clientX: 0, // You can adjust these values if needed
    clientY: 0,
    bubbles: true,
    cancelable: true,
  });

  lastDragHandle.dispatchEvent(mouseDownEvent);
  
  const mouseUpEvent = new MouseEvent("mouseup", {
    clientX: 0, // Adjust if needed
    clientY: 0,
    bubbles: true,
    cancelable: true,
  });

  setTimeout(() => {
    lastDragHandle.dispatchEvent(mouseUpEvent);
  });
}
