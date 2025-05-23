
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable({ id, children }: { id: string; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id
    });
    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined, cursor: "grab",
    }


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </button>
    );
}