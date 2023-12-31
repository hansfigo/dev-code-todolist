import { writable } from "svelte/store";

interface activity {
    title : string,
    id : string
    created_at : string
}

const activityList = writable<activity[]>();
export const sortByStore = writable('newest')
export const isDeleted = writable(false)


export const activityTitleStore = writable('')
export const activityIdStore = writable('')


export default activityList

