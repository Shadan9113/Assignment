import { useDrag } from 'react-dnd';

const DraggableWord = ({ word }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'word',
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`draggable-word ${isDragging ? 'dragging' : ''}`}
    >
      {word}
    </div>
  );
};

export default DraggableWord;