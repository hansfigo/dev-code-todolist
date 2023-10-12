import { writable } from "svelte/store";

interface activity {
    title : string,
    id : string
    created_at : string
}

const activityList = writable<activity[]>();

export default activityList
