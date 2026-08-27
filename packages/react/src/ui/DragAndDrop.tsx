import { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, rectIntersection, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "../utils/tailwind";

interface SortableItemProps<
  T extends {
    id: string;
  }
> {
  item: T;
  renderItem: (_item: T) => React.ReactNode;
  dragIcon?: LucideIcon;
  className?: string;
  iconClassName?: string;
}
export const SortableItem = <
  T extends {
    id: string;
  }
>(
  props: SortableItemProps<T>
) => {
  const { item, renderItem, dragIcon: DragIcon, className, iconClassName } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  if (DragIcon)
    return (
      <div ref={setNodeRef} style={style} className={cn("fwr:flex fwr:gap-1 fwr:items-center", className)}>
        {DragIcon && (
          <DragIcon
            {...attributes}
            {...listeners}
            className={cn("fwr:w-4 fwr:h-4", iconClassName)}
            style={{
              cursor: "grabbing"
            }}
          />
        )}
        {renderItem(item)}
      </div>
    );
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} role="button" className={className}>
      {renderItem(item)}
    </div>
  );
};
export const DndListContainer = <
  T extends {
    id: string;
  }
>(props: {
  id: string;
  items?: T[];
  renderItem?: (_item: T) => React.ReactNode;
  dragIcon?: LucideIcon;
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  scrollToFocus?: boolean;
  children?: React.ReactNode;
}) => {
  const { id, items, renderItem, dragIcon, className, itemClassName, iconClassName, scrollToFocus, children } = props;
  const { setNodeRef } = useDroppable({
    id
  });
  const itemsLengthRef = useRef(items?.length);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollToFocus && bottomRef.current && items?.length && itemsLengthRef.current && items?.length > itemsLengthRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
    itemsLengthRef.current = items?.length;
  }, [scrollToFocus, items?.length]);
  return (
    <SortableContext id={id} items={items?.map((item) => item.id) || []} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className={className}>
        {items?.length && renderItem
          ? items?.map((item) => <SortableItem key={item.id} item={item} renderItem={renderItem} dragIcon={dragIcon} className={itemClassName} iconClassName={iconClassName} />)
          : null}
        {children}
        <div ref={bottomRef}></div>
      </div>
    </SortableContext>
  );
};
export const DndListsContext: React.FC<{
  onDragStart?: (_dragItemId: string | number | null) => void;
  onDragOver?: (_dragItemId: string | number | null, _overItemId: string | number | null, _overContainerId?: string | number | null) => void;
  onDragEnd?: (_dragItemId: string | number | null, _overItemId: string | number | null, _overContainerId?: string | number | null) => void;
  renderOverlay?: (_dragItemId: string | number | null) => React.ReactNode;
  mountElement?: HTMLElement | null;
  children: React.ReactNode;
}> = ({ children, onDragStart, onDragEnd, onDragOver, renderOverlay, mountElement }) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);
    onDragStart?.(active.id);
  }
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const overElementId = over?.id ?? null;
    const overContainerId = over?.data?.current?.sortable?.containerId ?? over?.id ?? null;
    onDragOver?.(active.id, overElementId, overContainerId);
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const overElementId = over?.id ?? null;
    const overContainerId = over?.data?.current?.sortable?.containerId ?? over?.id ?? null;
    onDragEnd?.(active.id, overElementId, overContainerId);
  }
  return (
    <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <>
        {children}
        {createPortal(<DragOverlay>{renderOverlay?.(activeId)}</DragOverlay>, mountElement || document.body)}
      </>
    </DndContext>
  );
};
