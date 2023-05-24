const columns = document.querySelectorAll(".column");
let draggingItem = null;

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
  draggingItem = e.target;
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  draggingItem = null;
});

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(column, e.clientY);
    const container = afterElement ? column : column.querySelector(".items");

    if (container.contains(draggingItem)) {
      return;
    }

    container.insertBefore(draggingItem, afterElement);
  });
});

function getDragAfterElement(column, y) {
  const items = [...column.querySelectorAll(".item:not(.dragging)")];
  return items.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}