const convertToDate = (created_at: string | null | undefined): string => {

    if (!created_at){
        return "Unknown"
    }

    const date = new Date(created_at);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    const day = date.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                   (day % 10 === 2 && day !== 12) ? "nd" :
                   (day % 10 === 3 && day !== 13) ? "rd" : "th";

    return formattedDate.replace(/\d+/, `${day}${suffix}`);
}; 

export default convertToDate;