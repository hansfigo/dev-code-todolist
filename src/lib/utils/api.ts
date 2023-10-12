const useApi = () => {

    const url = 'https://todo.api.devcode.gethired.id/activity-groups?email=claudiofigo0303@gmail.com';

    const send = async () => {
        const data = {
            title: "New Activity",
            email: "claudiofigo0303@gmail.com"
        };
        
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
            console.log('POST request berhasil:', responseData);
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    const get = async ()=>{
        const res = await fetch(url)
    
        const data = await res.json()

        return data.data
    }

    return {
        send: send,
        get : get
    };
}

export default useApi