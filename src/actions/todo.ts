export interface TaskProps {
    id: string;
    title: string;
    creationDate: Date;
}

export const addTask = (task: TaskProps) => (
    {
        type: 'add', task
    }
);

export const deleteTask = (index: number) => (
    {
        type: 'delete', index
    }
);

export const updateTask = (index: number, title: string) => (
    {
        type: 'update', index, title
    }
);

export const setTasks = (tasks: TaskProps[]) => (
    {
        type: 'setAll', tasks
    }
);

export const deleteAll = () => (
    {
        type: 'deleteAll'
    }
);
