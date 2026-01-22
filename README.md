# Todo App

A modern, feature-rich todo list application built with React, TypeScript, and shadcn/ui components. Features drag-and-drop reordering, local storage persistence, and a clean, responsive interface.

## Features

- ✅ **Add, complete, and delete todos** - Manage your tasks with an intuitive interface
- 🔄 **Drag and drop reordering** - Rearrange tasks by dragging them with the grip handle
- 💾 **Local storage persistence** - Your todos are automatically saved and restored between sessions
- 📊 **Task counter** - See how many tasks you have and how many are completed
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- ⌨️ **Keyboard shortcuts** - Press Enter to add todos quickly

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (Button, Input, Card, Checkbox)
│   ├── TodoInput.tsx    # Input field for adding new todos
│   ├── TodoItem.tsx     # Individual todo item with drag handle
│   ├── TodoList.tsx     # List container with drag & drop logic
│   └── TodoStats.tsx    # Task counter component
├── hooks/
│   └── useTodos.ts      # Custom hook managing todo state and localStorage
├── types/
│   └── todo.ts          # TypeScript type definitions
├── lib/
│   └── utils.ts         # Utility functions
└── App.tsx              # Main application component
```

## How It Works

### Architecture

The application follows a component-based architecture with clear separation of concerns:

#### **Components**

- **TodoInput** - Handles user input with keyboard support (Enter key)
- **TodoItem** - Renders individual todo items with:
  - Drag handle (using @dnd-kit/sortable)
  - Checkbox for completion
  - Delete button
  - Strike-through styling for completed tasks
- **TodoList** - Manages the drag-and-drop context and renders the list of todos
- **TodoStats** - Displays task statistics (remaining/total)

#### **Custom Hook: useTodos**

The `useTodos` hook centralizes all todo-related logic:

```typescript
const { todos, addTodo, toggleTodo, deleteTodo, reorderTodos } = useTodos();
```

**Key features:**

- Initializes todos from localStorage on mount
- Saves todos to localStorage whenever they change (via useEffect)
- Provides methods for all CRUD operations
- Handles todo reordering after drag-and-drop

#### **Data Flow**

1. **Loading**: On app start, todos are loaded from localStorage
2. **User Action**: User adds, toggles, deletes, or reorders a todo
3. **State Update**: The action triggers a state update in `useTodos`
4. **Side Effect**: useEffect detects the change and saves to localStorage
5. **Re-render**: Components re-render with updated todo list

#### **Drag and Drop**

Uses **@dnd-kit** library for accessible, smooth drag-and-drop:

```typescript
// TodoList component manages DndContext
<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <SortableContext items={todoIds}>
    {todos.map(todo => <TodoItem ... />)}
  </SortableContext>
</DndContext>
```

- **PointerSensor**: Enables mouse/touch dragging
- **KeyboardSensor**: Supports keyboard-based reordering (accessibility)
- **arrayMove**: Reorders the array based on drag result

#### **Data Persistence**

LocalStorage is used for persistent storage:

```typescript
// Save
localStorage.setItem('todos', JSON.stringify(todos));

// Load
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];
```

This approach:

- Works offline
- No backend required
- Simple and fast
- Limited to ~5-10MB per origin

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **@dnd-kit** - Modern drag-and-drop toolkit
- **lucide-react** - Beautiful icon library

## Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Future Enhancements

Potential features to add:

- Categories/tags for todos
- Due dates and reminders
- Search and filter functionality
- Dark mode toggle
- Cloud sync (with backend)
- Recurring tasks
- Subtasks/nested todos

## License

MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
