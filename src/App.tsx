import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { TodoStats } from '@/components/TodoStats';
import { useTodos } from '@/hooks/useTodos';

function App() {
  const [inputValue, setInputValue] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo, reorderTodos } = useTodos();

  const handleAddTodo = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>Keep track of your tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TodoInput
            value={inputValue}
            onChange={setInputValue}
            onAdd={handleAddTodo}
          />
          <TodoList
            todos={todos}
            onReorder={reorderTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
          <TodoStats todos={todos} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
