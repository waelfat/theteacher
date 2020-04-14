
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt,GraphQLList } = graphql;
//const {getBookByID,getAuthorByID,getAuthorBooks}=require('./BooksQueries')
const {getAuthorBooks,getBookByID,getAuthorByID,getAllAuthors,getAllBooks,AddAuthor,AddBook,AddPublisher,getAllPublishers,getPublisherByID,getPublisherBooks} =require('./mysql2queries')

const book = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    Book_ID: { type: GraphQLInt },
    book_name: { type: GraphQLString },
    genre: { type: GraphQLString },
    Author_ID:{type:GraphQLInt},
    Publisher_ID:{type:GraphQLInt},
    Author:{
      type: author,      
      async resolve(parent,args){
        const authorRow=await getAuthorByID(parent.Author_ID);//.then(result=>result.fetchOne());
        //const authorbooks=await getAuthorBooks(parent.Author_ID);//.then(result=>result.fetchAll());
        //console.log(authorRow);
       console.log(authorRow.length);
       console.log('length');
        return  authorRow[0];
      }
    
    },
    Publisher:{
      type:PublisherType,
      async resolve(parent,args){
        const bookPublisher=await getPublisherByID(parent.Publisher_ID);
        return bookPublisher[0];
      }
    }
  })
});
const PublisherType=new GraphQLObjectType({
  name:"publisher",
  fields:()=>({
    Publisher_ID:{type:GraphQLInt},
    Publisher_name:{type:GraphQLString},
    Books:{
      type:new GraphQLList(book),
      async resolve(parent,args){
        const PublisherBooks=await getPublisherBooks(parent.Publisher_ID);
        return PublisherBooks


      }
    }
  })
})
const author = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    Author_ID: { type: GraphQLInt },
    Author_Name: { type: GraphQLString},
    Books:{
      type:new GraphQLList(book),
      async resolve(parent,args){
        //console.log(parent);
        //console.log('parent');
        console.log(parent);
        console.log('parent');
        const AuthorBooks=await getAuthorBooks(parent.Author_ID);
        
       
        console.log('tostring');
        console.log('AuthorBooks');
        return AuthorBooks;
      }
    }
    
  })
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: book,
      args: {
        id: {
          type: GraphQLInt
          
        }
      },
      async resolve(parent, {id}) {
        //let source = data();
        const book = await getBookByID(id);//.then(result=> result.fetchOne());
        return book[0];
       
       
      }
    },
    Author:{
      type:author,
      args:{id:{type:GraphQLInt}},
      async resolve(parent,args){
        const Author=await getAuthorByID(args.id);
        //let a=[];
        
        //console.log(Author.length);
        return Author[0];
      }
      
    },
    Publisher:{
      type:PublisherType,
      args:{id:{type:GraphQLInt}},

      async resolve(parent,args){
        const Publisher=await getPublisherByID(args.id);
        //let a=[];
        //console.log(Author.length);
        return Publisher[0];
      }
    },
    AllAuthors:{
      type:new GraphQLList(author),
      async resolve(parent,args){
        let authors=await getAllAuthors();
        return authors;
      }
      
    },
    AllBooks:{
      type:new GraphQLList(book),
      async resolve(parent,args){
        let books=await getAllBooks();
        return books;
      }
    },
    AllPublishers:{
      type:new GraphQLList(PublisherType),
      async resolve(parent,args){
        let Publishers=await getAllPublishers();
        return Publishers;
      }
    }
    
  }
});
const Mutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAuthor:{
      type:author,
      args:{
        
        Author_Name:{type:GraphQLString}
      },
      async resolve (parent,args){
        try {
          let newAuthor=await AddAuthor(args);
        addedAuthor={
          Author_ID: newAuthor.insertId,
          Author_Name:args.Author_Name
          
        }
        return newAuthor
          
        } catch (error) {
          console.log(error)
          
        }
        

      }
    },
    AddBook:{
      type:book,
      args:{
        book_name:{type:GraphQLString},
        Author_ID:{type:GraphQLInt},
        Publisher_ID:{type:GraphQLInt},
        genre:{type:GraphQLString}
      },
      async resolve(parent,args){
        //const {book_name, Author_ID,PublisherID,genre}=args;
        console.log(args);

       let newBook=await AddBook(args);
       if (newBook)return newBook
      }
    },
    AddPublisher:{
      type:PublisherType,
      args:{
        Publisher_name:{type:GraphQLString}
      },
      async resolve(parent,args){
        let newPublisher=await AddPublisher(args.Publisher_name);
        return {
          Publisher_ID:newPublisher.insertId,
          Publisher_name:args.Publisher_name
        }
      }
    }
  }
})



module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation:Mutation
  
});
