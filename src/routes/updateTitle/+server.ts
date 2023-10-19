import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { id, title } = await request.json();
    // let id = url.searchParams.get('id')
    // let title = url.searchParams.get('title')

    const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups/" + id;
    const data = {
        title: title
    }

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(baseUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log('Update Judul request berhasil:', responseData);


        return new Response(responseData)


    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
};


// export const load = (async ({ url }) => {


//     return {
//         title, id
//     }
