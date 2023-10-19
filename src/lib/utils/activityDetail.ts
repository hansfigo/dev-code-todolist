import { writable } from "svelte/store";

interface ActivityDetail {
    title: string;
    id: string;
    created_at: string;
    todo_items: TodoItem[]
}

export interface TodoItem {
    id: number;
    title: string;
    activity_group_id: number;
    is_active: number;
    priority: string;
}


const activityDetailStore = writable<ActivityDetail>();
const activityTitleStore = writable<string>('');
const TodoListItemStore = writable<TodoItem[]>([])

const useActivityDetail = () => {
    const get = async (id: string) => {
        const url = 'https://todo.api.devcode.gethired.id/activity-groups/' + id;

        const res = await fetch(url);
        const data = await res.json();

        return data;
    }

    const update = async (title: string, id: string) => {
        // const url = "https://todo.api.devcode.gethired.id/activity-groups/" + id;
        const url = '/updateTitle'

        const data = {
            id : id,
            title: title
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Update Judul request berhasil:', responseData);

            const updatedTitle = await get(id);

            activityTitleStore.set(updatedTitle.title);
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    const updateToDoList = async (title: string, id: number, isActive : number, activityId : string, priority? :string) => {
        const url = "https://todo.api.devcode.gethired.id/todo-items/" + id;
        const data = {
            id : id,
            title: title,
            is_active : isActive,
            priority: priority
        }

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Update Judul request berhasil:', responseData);

            TodoListItemStore.set(await getToDoListItem(activityId.toString()))

        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }


    const getToDoListItem = async (id: string) => {
        const url = 'https://todo.api.devcode.gethired.id/activity-groups/' + id;

        const res = await fetch(url);
        const data = await res.json();

        const list = data

        if (list.todo_items) {
            return list.todo_items
        }

        return []

    }


    const post = async (title: string, id: string, priority: string) => {

        console.log(title, id, priority);

        const url = "https://todo.api.devcode.gethired.id/todo-items"
        const data = {
            title: title,
            activity_group_id: id,
            priority: priority
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };


        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Update Judul request berhasil:', responseData);

            const updatedList = await getToDoListItem(id)
            console.log("HASSSS",updatedList);
            
            TodoListItemStore.set(updatedList)
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }

    }

    const remove = async (id: string, activityId : string) => {
        console.log("DELETE", id);

        const url = 'https://todo.api.devcode.gethired.id/todo-items/' + id;

        fetch(url, {
            method: 'DELETE'
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const updatedList = await getToDoListItem(activityId)
                console.log(updatedList);
                
                TodoListItemStore.set(updatedList)

                console.log('Activity berhasil dihapus');
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });
    }

    return {
        update: update,
        post: post,
        updateToDoList : updateToDoList,
        delete: remove,
        get : get
    }
}

const activityDetail = useActivityDetail();

export { activityTitleStore, activityDetailStore, activityDetail, TodoListItemStore };
