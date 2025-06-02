import { Card } from "@/components/Card/cards";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableCardProps {
  id: string;
  card: Card | undefined;
  children: React.ReactNode;
}

export function SortableCard({ id, card, children }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "card",
      card,
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    // minHeight: isDragging ? 0 : "50px",
    // opacity: isDragging ? 0.5 : 1,
    // background: isDragging ? "transparent" : undefined,
    // overflow: "hidden",
    // pointerEvents: isDragging ? "none" : "auto",
    // position: "relative",

    zIndex: isDragging ? 999 : "auto",
    touchAction: "none",
  };

  return (
    <div
      // className='h-fit'
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // className={`rounded select-none`}
    >
      {children}
    </div>
  );
}
