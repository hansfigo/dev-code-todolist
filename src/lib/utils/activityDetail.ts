import { writable } from "svelte/store";

interface ActivityDetail {
    title: string;
    id: string;
    created_at: string;
}

const activityDetailStore = writable<ActivityDetail>();
const activityTitleStore = writable<string>('');

const useActivityDetail = () => {
    const get = async (id: string) => {
        const url = 'https://todo.api.devcode.gethired.id/activity-groups/' + id;

        const res = await fetch(url);
        const data = await res.json();

        return data;
    }

    const update = async (title: string, id: string) => {
        const url = "https://todo.api.devcode.gethired.id/activity-groups/" + id;
        const data = {
            title : title
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

            const updatedTitle = await get(id);

            activityTitleStore.set(updatedTitle.title);
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    const post = async (title : string)=>{
        const url = "https://todo.api.devcode.gethired.id/todo-items"
        const data = {
            title : title
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

    }

    return {
        update: update
    }
}

const activityDetail = useActivityDetail();

export { activityTitleStore, activityDetailStore, activityDetail };
