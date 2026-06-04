import { css, html, LitElement } from "lit";

class DnDList extends LitElement {
  static get styles() {
    return css`
      :host,
      .drag-test {
        display: block;
        height: 100%;
      }

      :host([layout="grid"]) .droppable-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    `;
  }

  static get properties() {
    return {
      headerName: String,
      dragStartElement: Object,
      endContainer: String,
      startContainer: String,
      list: Array,
      loading: Boolean,
      layout: { type: String, reflect: true } // 'horizontal', 'vertical', or 'grid'
    };
  }

  constructor() {
    super();
    this.headerName = "Table-1";
    this.list = [];
    this.loading = false;
    this.layout = "vertical"; // Default to vertical layout
    this._lastInsertPosition = null;
    this._lastDragEvent = null;
    this._dragOverThrottleId = null;
    this._lastMousePosition = { x: 0, y: 0 };
    this._movementDirection = { x: 0, y: 0 };
    this._currentRowIndex = -1; // Track current row for stability
    this._rowTransitionHysteresis = 20; // Pixels of hysteresis for row transitions
  }

  render() {
    return html`
      <style>
        .droppable-container .draggable-item {
          cursor: grabbing;
        }
        .draggable-item.dragging {
          opacity: var(--fw-drag-drop-placeholder-opacity, 0.5);
          border: var(--fw-drag-drop-placeholder-border, 1px solid var(--secondary-color-l3, #eee));
          background-color: var(--fw-drag-drop-placeholder-bgColor, "transparent");
        }
      </style>
      ${this.loading
        ? ""
        : html`
            <div class="drag-test">
              <div
                class="droppable-container"
                id=${this.headerName}
                @dragover=${(e) => this.reorderListItems(e)}
                @dragenter=${(e) => e.preventDefault()}
                @drop=${(e) => e.preventDefault()}
              >
                ${this.list &&
                this.list.map((item, index) => {
                  return html`
                    <div
                      class="draggable-item"
                      id=${index}
                      containerName=${this.headerName}
                      draggable="true"
                      @dragstart=${(e) => this.dragStart(e)}
                      @dragend=${(e) => {
                        e.currentTarget.classList.remove("dragging");
                        this.dragEnded(e);
                      }}
                    >
                      ${this.dragItemRenderer(item)}
                    </div>
                  `;
                })}
              </div>
            </div>
          `}
    `;
  }

  dragStart(e) {
    this.dragStartElement = e.target;
    e.dataTransfer.setData("text", e.target);
    setTimeout(() => {
      this.dragStartElement.classList.add("dragging");
    }, 0);

    // Reset row tracking on drag start
    this._currentRowIndex = -1;
  }

  dragEnded(e) {
    e.preventDefault();
    this.startContainer = this.dragStartElement.getAttribute("containerName");
    this.endContainer = e.currentTarget.getAttribute("containerName");
    if (this.startContainer !== this.endContainer) {
      return;
    }
    const listArray = Array.from(e.currentTarget.parentNode.childNodes);
    const [updatedList, draggedItem, newIndex] = this.updateList(listArray);
    const oldIndex = this.list.findIndex((item) => item === draggedItem);
    if (oldIndex === newIndex) return;
    this.loading = true;
    const itemReorderEvent = new CustomEvent("item-reordered", { detail: { draggedItem: draggedItem, newIndex: newIndex }, bubbles: true, composed: true });
    const event = new CustomEvent("list-updated", { detail: { data: updatedList }, bubbles: true, composed: true });
    this.list = updatedList;
    this.dispatchEvent(event);
    this.dispatchEvent(itemReorderEvent);
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  updateList(listArray) {
    const data = [];
    let draggedItem, newIndex;
    let count = 0;
    for (let i = 0; i < listArray.length; i++) {
      if (listArray[i].className === "draggable-item") {
        const id = listArray[i].id;
        if (id === this.dragStartElement.id) {
          draggedItem = this.list[id];
          newIndex = count;
        }
        data.push(this.list[id]);
        count++;
      }
    }
    return [data, draggedItem, newIndex];
  }

  reorderListItems(e) {
    e.preventDefault();

    // Calculate movement direction
    if (this._lastMousePosition.x !== 0 || this._lastMousePosition.y !== 0) {
      this._movementDirection = {
        x: e.clientX - this._lastMousePosition.x,
        y: e.clientY - this._lastMousePosition.y
      };
    }

    // Update last mouse position
    this._lastMousePosition = { x: e.clientX, y: e.clientY };

    // Store the event for throttled processing
    this._lastDragEvent = e;

    // Throttle the drag event processing to prevent too frequent updates
    if (!this._dragOverThrottleId) {
      this._dragOverThrottleId = setTimeout(() => {
        this._processDragEvent();
        this._dragOverThrottleId = null;
      }, 150); // Increased to 150ms throttle for more stability
    }
  }

  _processDragEvent() {
    if (!this._lastDragEvent) return;

    const e = this._lastDragEvent;
    const droppableContainer = this.shadowRoot.querySelector(".droppable-container");
    const draggingItem = this.shadowRoot.querySelector(".dragging");

    if (!draggingItem) return;

    const siblings = [...droppableContainer.querySelectorAll(".draggable-item:not(.dragging)")];

    if (siblings.length === 0) return;

    // Determine the dominant axis based on layout
    const isHorizontalDominant = this.layout === "horizontal";
    const isGridLayout = this.layout === "grid" || (!isHorizontalDominant && this.layout !== "vertical");

    let nextSibling;

    // Calculate the dominant movement direction
    const absX = Math.abs(this._movementDirection.x);
    const absY = Math.abs(this._movementDirection.y);
    const isMovingHorizontally = absX > absY;

    if (isGridLayout) {
      // For grid layout, we need to handle both horizontal and vertical movement

      // First, group items by rows
      const rows = this._groupItemsByRow(siblings);

      if (rows.length > 0) {
        // Find which row the cursor is in
        let cursorRowIndex = -1;

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (row.length > 0) {
            // Calculate the row's vertical bounds
            const rowTop = Math.min(...row.map((item) => item.getBoundingClientRect().top));
            const rowBottom = Math.max(...row.map((item) => item.getBoundingClientRect().bottom));

            // Check if cursor is in this row
            if (e.clientY >= rowTop && e.clientY <= rowBottom) {
              cursorRowIndex = i;
              break;
            }
          }
        }

        // If cursor is not in any row, find the closest row
        if (cursorRowIndex === -1) {
          let closestDistance = Number.MAX_VALUE;

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.length > 0) {
              // Calculate the row's center Y position
              const rowTop = Math.min(...row.map((item) => item.getBoundingClientRect().top));
              const rowBottom = Math.max(...row.map((item) => item.getBoundingClientRect().bottom));
              const rowCenterY = (rowTop + rowBottom) / 2;

              // Calculate distance to cursor
              const distance = Math.abs(e.clientY - rowCenterY);

              if (distance < closestDistance) {
                closestDistance = distance;
                cursorRowIndex = i;
              }
            }
          }
        }

        // Now that we have the row, find the position within the row
        if (cursorRowIndex >= 0 && cursorRowIndex < rows.length) {
          const currentRow = rows[cursorRowIndex];

          // Sort the row by X position
          currentRow.sort((a, b) => {
            const rectA = a.getBoundingClientRect();
            const rectB = b.getBoundingClientRect();
            return rectA.left - rectB.left;
          });

          // Find the position within the row based on X coordinate
          nextSibling = currentRow.find((sibling) => {
            const rect = sibling.getBoundingClientRect();
            return e.clientX < rect.left + rect.width * 0.5;
          });

          // If we're at the end of a row, check if we should move to the next row
          if (!nextSibling && cursorRowIndex < rows.length - 1) {
            const nextRow = rows[cursorRowIndex + 1];
            if (nextRow.length > 0) {
              // Sort the next row by X position
              nextRow.sort((a, b) => {
                const rectA = a.getBoundingClientRect();
                const rectB = b.getBoundingClientRect();
                return rectA.left - rectB.left;
              });

              // If cursor is closer to the next row than the current row
              const currentRowBottom = Math.max(...currentRow.map((item) => item.getBoundingClientRect().bottom));
              const nextRowTop = Math.min(...nextRow.map((item) => item.getBoundingClientRect().top));

              if (e.clientY > (currentRowBottom + nextRowTop) / 2) {
                nextSibling = nextRow[0]; // Insert at the beginning of the next row
              }
            }
          }
        }
      }

      // If we still don't have a nextSibling, fall back to simple Y-coordinate based positioning
      if (!nextSibling) {
        nextSibling = siblings.find((sibling) => {
          const rect = sibling.getBoundingClientRect();
          return e.clientY < rect.top + rect.height * 0.5;
        });
      }
    } else if (isHorizontalDominant) {
      // For horizontal layout, prioritize X-axis
      nextSibling = siblings.find((sibling) => {
        const rect = sibling.getBoundingClientRect();
        return e.clientX < rect.left + rect.width * 0.5;
      });
    } else {
      // For vertical layout, prioritize Y-axis
      nextSibling = siblings.find((sibling) => {
        const rect = sibling.getBoundingClientRect();
        return e.clientY < rect.top + rect.height * 0.5;
      });
    }

    // Create a position identifier to check if we need to update the DOM
    const newPosition = nextSibling ? nextSibling.id : "end";

    // Only update if position changed to prevent unnecessary DOM operations
    if (this._lastInsertPosition !== newPosition) {
      this._lastInsertPosition = newPosition;
      droppableContainer.insertBefore(draggingItem, nextSibling);
    }
  }

  // Helper method to group items by rows based on their vertical position
  _groupItemsByRow(items) {
    if (items.length === 0) return [];

    // Sort items by Y position
    const sortedByY = [...items].sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.top - rectB.top;
    });

    const rows = [];
    let currentRow = [sortedByY[0]];
    const rowTolerance = 10; // Pixels tolerance for considering items in the same row

    for (let i = 1; i < sortedByY.length; i++) {
      const currentRect = sortedByY[i].getBoundingClientRect();
      const prevRect = sortedByY[i - 1].getBoundingClientRect();

      // If Y position is similar, add to the same row
      if (Math.abs(currentRect.top - prevRect.top) < rowTolerance) {
        currentRow.push(sortedByY[i]);
      } else {
        // Start a new row
        rows.push(currentRow);
        currentRow = [sortedByY[i]];
      }
    }

    // Add the last row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  }
}

window.customElements.define("fw-dnd", DnDList);
