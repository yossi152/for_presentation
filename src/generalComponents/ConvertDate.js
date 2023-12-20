

export default function convertDateFormat(dateStr) {
        if (dateStr.includes('/')) {  // If input format is DD/MM/YYYY
            const [day, month, year] = dateStr.split('/');
            const newDateStr = `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year.padStart(4, '0')}`;
            return <span> {newDateStr} </span>
        } else if (dateStr.includes('-')) {  // If input format is YYYY-MM-DD
            const [year, month, day] = dateStr.split('-');
            const newDateStr = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year.padStart(4, '0')}`;
            return newDateStr
        } else {
            alert("Invalid date format. Please use 'YYYY-MM-DD' or 'DD/MM/YYYY'.");
        }
}