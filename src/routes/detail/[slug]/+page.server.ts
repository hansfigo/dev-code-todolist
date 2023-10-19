import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {

    const id = params.slug

    console.log(id);
    
    const url = 'https://todo.api.devcode.gethired.id/activity-groups/'+id;

    const res = await fetch(url)

    const data = await res.json()

    return { data };
}) satisfies PageServerLoad;