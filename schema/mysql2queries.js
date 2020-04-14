const  mysql =require('mysql2');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'wael',
    database:'graphqldb'
}); 
con.connect(err=>{
    if (err) throw err;
    console.log('conneted');
})
function getAuthorBooks(Author_ID) {
    const param=con.escape(Author_ID);
    return new Promise((resolve,reject)=>{
        con.query(`select * from Book where Author_ID =${param}`,function (err,result){
            if (err) {
                reject(err);
            }
            console.log(result);
             console.log('author books')
            resolve(result);
        })
    })
}
function getPublisherBooks(Publisher_ID) {
    const param=con.escape(Publisher_ID);
    return new Promise((resolve,reject)=>{
        con.query(`select * from Book where Publisher_ID =${param}`,function (err,result){
            if (err) {
                reject(err);
            }
            console.log(result);
             console.log('author books')
            resolve(result);
        })
    })
}
function getBookByID(bookID) {
    const param=con.escape(bookID);
    return new Promise((resolve,reject)=>{
        con.query(`select * from Book where Book_ID =${param}`,function (err,result){
           if (err) throw reject(err);
           
           
           resolve(result);
        });
    })    
}

function getAuthorByID(Author_ID) {
    const param=con.escape(Author_ID);
    return new Promise((resolve,reject)=>{
        con.query(`SELECT * FROM author where Author_ID =${param}`,function (err,result){
            if (err) reject( err)
            console.log(result);
            resolve(result)
            
        });
    })
   
}
function getPublisherByID(Publisher_ID) {
    const param=con.escape(Publisher_ID);
    return new Promise((resolve,reject)=>{
        con.query(`SELECT * FROM Publisher where Publisher_ID =${param}`,function (err,result){
            if (err) reject( err)
            console.log(result);
            resolve(result)
            
        });
    })
   
}
function getAllBooks(){
    return new Promise((resolve,reject)=>{
        con.query('SELECT * FROM Book',function(err,result){
            if (err) {
                console.log(err)
                reject(err)
                return;
            }
            resolve(result);
        })
    })
}
function getAllAuthors() {
    return new Promise((resolve,reject)=>{
        con.query('SELECT * FROM Author',function(err,result){
            if (err) {
                console.log(err)
                reject(err)
                return;
            }
            resolve(result);
        })
    })
}
function getAllPublishers() {
    return new Promise((resolve,reject)=>{
        con.query('SELECT * FROM Publisher',function(err,result){
            if (err) {
                console.log(err)
                reject(err)
                return;
            }
            resolve(result);
        })
    })
}
function AddAuthor({Author_Name}) {
    //INSERT INTO `graphqldb`.`author` (`Author_Name`) VALUES ('Jeff Gibson');
    return new Promise((resolve,reject)=>{
        con.query(`INSERT INTO author (Author_Name) VALUES ('${Author_Name}')`,(err,result)=>{
            if (err){
                console.log(err)
                reject(err)

            
            }
            let addedAuthor={
                Author_ID: result.insertId,
                Author_Name:Author_Name
            }
            console.log(result);
            resolve(addedAuthor);

    
        })

    })
    
}
function AddBook({book_name, Author_ID,Publisher_ID,genre}) {
    //INSERT INTO `graphqldb`.`author` (`Author_Name`) VALUES ('Jeff Gibson');
    return new Promise((resolve,reject)=>{
        let querystring=`INSERT INTO book (book_name, Author_ID,Publisher_ID,genre) VALUES ('${book_name}','${Author_ID}','${Publisher_ID}','${genre}')`;
        console.log(querystring);
        con.query(querystring,(err,result)=>{
            if (err){
                console.log(err)
                reject(err)

            
            }
            let addedBook={
                Book_ID: result.insertId,
                book_name,
                Author_ID,
                Publisher_ID,
                genre
            }
            console.log(result);
            resolve(addedBook);

    
        })

    })
    
}
function AddPublisher(Publisher_name) {
    //INSERT INTO `graphqldb`.`author` (`Author_Name`) VALUES ('Jeff Gibson');
    return new Promise((resolve,reject)=>{
        
        con.query(`INSERT INTO Publisher (Publisher_name) VALUES ('${Publisher_name}')`,(err,result)=>{
            if (err){
                console.log(err)
                reject(err)

            
            }
           
            console.log(result);
            resolve(result);

    
        })

    })
    
}
module.exports={getBookByID,getAuthorBooks,getAuthorByID,getAllBooks,getAllAuthors,AddAuthor,AddBook,AddPublisher,getPublisherByID,getAllPublishers,getPublisherBooks}