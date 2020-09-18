function parseToDateString(date : string | Date | number) : string {  
    return (new Date(date))
        .toLocaleDateString(undefined, {
            weekday : 'long',
            year : 'numeric',
            month : 'long',
            day : 'numeric'
        }) 
}

export default parseToDateString