const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Tentukan opsi yang sesuai
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;

    const formattedDate = date.toLocaleDateString('id-ID', options);
    
    return formattedDate;
}


export default convertDate