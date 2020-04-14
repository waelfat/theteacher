const app= require('express')();
const {getBookByID} =require('./schema/mysql2queries')
const graphqlHTTP=require('express-graphql');
//const schema =require('./schema/schema');
const theTeacherSchema=require('./schema/TheTeacherSchema');
//console.log(theTeacherSchema);
const cors=require('cors');
const bodyParser=require('body-parser');
const morgan=require('morgan');
app.use(cors());
app.use(bodyParser.json())
app.use(morgan('common'));
app.use('/graphql',graphqlHTTP({
    schema:theTeacherSchema,
    graphiql:true

}))
app.use('/books',async (req,res)=>{
    const f=await getBookByID(1);
    console.log(f);
    res.json(f);
    
})
app.listen(4000,()=>{

    console.log('listen to 4000 port')

})