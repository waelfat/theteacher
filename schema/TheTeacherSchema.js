const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt,GraphQLList,GraphQLScalarType } = graphql;
const {getStudentByID,addNewStudent,getStudentTests,getTestByID} =require('./TheTeachersQueries');
 const GraphQLDate=new GraphQLScalarType({
    name:'Date',
    description:'GraphQLDate to be used',
    serialize(value){
        return value.getTime();
    },
    parseValue(value){
        return new Date(value);
    },
    parseLiteral(ast){
        if (ast.kind === Kind.INT){
            return new Date(ast.value);
        }
        return null;
    }
}); 
const StudentType=new GraphQLObjectType({
    name:'student',
    fields:()=>({
        StudentID:{type:GraphQLInt},
        StudentName:{type:GraphQLString},
        email:{type:GraphQLString},
        BirthDate:{type:GraphQLDate},
        SchoolName:{type:GraphQLString},
        governorate:{type:GraphQLInt},
        ClassName:{type:GraphQLString},
        notes:{type:GraphQLString},
        tests:{
            type:new GraphQLList(TestType),
            async resolve(parent,args){
                const tests =await getStudentTests(parent.StudentID);
                return tests;
            }
        }

    })
});
const TestType=new GraphQLObjectType({
    name:'test',
    fields:()=>({
        TestID:{type:GraphQLInt},
        StudentID:{type:GraphQLInt},
        SubjectID:{type:GraphQLInt},
        TestDate:{type:GraphQLDate},
        QuestionNumber:{type:GraphQLInt},
        Duration:{type:GraphQLInt},
        Student:{
            type:StudentType,
            async  resolve(parent,args){
                const student=await getStudentByID(parent.StudentID);
                return student;

            }
        
        }
    })
})
const rootQuery=new GraphQLObjectType({
    name:'rootQueryType',
    fields:{
        student:{
            type:StudentType,
            args:{
                id:{type:GraphQLInt}
            },
            async resolve(parent,{id}){

                const getStudent=await getStudentByID(id);
                console.log(getStudent[0])
                return getStudent[0]
            }
        
        },
        test:{
            type:TestType,
            args:{id:{type: GraphQLInt}},
            async resolve(parent,{id}){
                const getTest=await getTestByID(id);
                return getTest;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    
    
  });