module.exports  = ( data ) => {
    function padNumber(num, length) {
        return num.toString().padStart(length, '0');
    }


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = padNumber(currentDate.getMonth() + 1, 2);
    const day = padNumber(currentDate.getDate(), 2);

    if(!data) {
        return  `${year}${month}${day}-1`;
    }

    if(`${year}-${month}-${day}` === data?.createdAt.toISOString().substring(0, 10)) {
        const parts = data?.uid.split('-');
        const extractedCount = parts[1];
        return  `${year}${month}${day}-${Number(extractedCount)+1}`;
    } else {
        return  `${year}${month}${day}-1`;
    }

}