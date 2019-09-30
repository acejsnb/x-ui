const dateFn = () => {
    const D=new Date();
    const year=D.getFullYear(),
        mouth=D.getMonth()+1,
        day=D.getDate();
    return `${year}-${mouth<10?'0'+mouth:mouth}-${day<10?'0'+day:day}`;
};
module.exports=dateFn;