import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const columns = ['To Do', 'In Progress', 'Done'];

const TaskBoard = () => {
  const handleDragEnd = (result) => {
    // TODO: Implement drag and drop logic
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-900 mb-4">{column}</h3>
            <Droppable droppableId={column.toLowerCase().replace(' ', '-')}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  <TaskCard />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;