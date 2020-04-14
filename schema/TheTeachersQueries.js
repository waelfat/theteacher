const  mysql =require('mysql2');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'wael',
    database:'theteacher'
}); 
con.connect(err=>{
    if (err) throw err;
    console.log('conneted');
})
function getStudentByID(StudentID) {
    const param=con.escape(StudentID);
    return new Promise((resolve,reject)=>{
        con.query(`SELECT StudentID, StudentName, BirthDate, Pic, Studentcol, Notes, governorate, createdAt, email, SchoolName,ClassName FROM students INNER JOIN classes on students.ClassID=Classes.ClassID where StudentID =${param}`,function (err,result){
            if (err) {
                reject(err);
            }
            console.log(result);
             console.log('author books')
            resolve(result);
        })
    })
}
function addNewStudent(studentInfo) {
    //  INSERT INTO `theteacher`.`students` (`StudentName`, `BirthDate`, `ClassID`, `governorate`, `password`, `createdAt`) VALUES ('wael', '1/3/2020', '1', '1', 'wae', '4/6/2020');
    //studentName,email,birthDate,schoolName,governorate,classID,notes,password
    return new Promise((resolve,reject)=>{
        con.query('INSERT INTO `theteacher`.`students` SET ?',studentInfo,(err,result)=>{
            if (err) reject(err)
            console.log(result);
            resolve(result);
        })
    })
}
function getStudentTests(StudentID) {
    const param=con.escape(StudentID);
    return new Promise((resolve,reject)=>{
        con.query(`select * from tests where StudentID =${param}`,function (err,result){
            if (err) {
                reject(err);
            }
            console.log(result);
             console.log('author books')
            resolve(result);
        })
    })
    
}
function getTestByID(TestID) {
    const param=con.escape(TestID);
    return new Promise((resolve,reject)=>{
        return new Promise((resolve,reject)=>{
            con.query(`select * from tests where TestID =${param}`,function (err,result){
                if (err) {
                    reject(err);
                }
                console.log(result);
                console.log('test')
                resolve(result);
            })
        })
    })
}
module.exports={addNewStudent,getStudentByID,getStudentTests,getTestByID}