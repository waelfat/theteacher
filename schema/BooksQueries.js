const mysqlx = require("@mysql/xdevapi");

function getBookByID(bookID) {
    return   mysqlx
     .getSession("mysqlx://root:wael@localhost:33060/graphqldb")
     .then(sess=>{
        const table= sess.getSchema('graphqldb').getTable('book');
        console.log(bookID);
       // const tablecols=table.get
         return  table.select(/* ['Book_ID', 'book_name', 'genre'] */).where('Book_ID=:Book_ID').bind('Book_ID',bookID).execute();
     })
 }
 function getAuthorByID(authorID) {
    return   mysqlx
     .getSession("mysqlx://root:wael@localhost:33060/graphqldb")
     .then(sess=>{
        const table= sess.getSchema('graphqldb').getTable('author');
        console.log(authorID);
       // const tablecols=table.get
        
  
         return  table.select(/* ['Author_ID', 'Author_Name'] */).where('Author_ID=:Author_ID').bind('Author_ID',authorID).execute();
  
         
         
     })
  }
  function getAuthorBooks(Author_ID) {
    return   mysqlx
    .getSession("mysqlx://root:wael@localhost:33060/graphqldb")
    .then(sess=>{
       const table= sess.getSchema('graphqldb').getTable('book');
       //console.log(Author_ID);
      // const tablecols=table.get
        return  table.select(/* ['Book_ID', 'book_name', 'genre'] */).where('Author_ID=:Author_ID').bind('Author_ID',Author_ID).execute();
    })
      
  }
  
  module.exports={getAuthorByID,getBookByID,getAuthorBooks}
  