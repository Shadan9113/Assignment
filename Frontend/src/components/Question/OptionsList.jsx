import DraggableWord from '../Draggable/DraggableWord';

const OptionsList = ({ options }) => {
  return (
    <div className="options-container">
      {options.map((word, i) => (
        <DraggableWord key={`option-${i}`} word={word} />
      ))}
    </div>
  );
};

export default OptionsList;