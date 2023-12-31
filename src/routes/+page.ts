import type { Actions, PageLoad } from './$types';

export let csr = true
export let ssr = false
export const load = (async () => {
    const url = 'https://todo.api.devcode.gethired.id/activity-groups?email=claudiofigo0303@gmail.com';

    const res = await fetch(url)

    const data = await res.json()

    return { data };
}) satisfies PageLoad;

