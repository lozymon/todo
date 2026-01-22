import type { Todo } from '@/types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  if (todos.length === 0) return null;

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="text-sm text-gray-500 text-center pt-2">
      {remaining} of {todos.length} tasks remaining
    </div>
  );
}
