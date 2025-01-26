
import { Hono } from "hono";
import {prompt} from "senseboundtypes"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";



interface Bindings{
    DATABASE_URL: string,
    JWT_SECRET: string
    

}

const words = new Hono<{
    Bindings: Bindings
}>();


words.post("/post", async (c)=>{

    const body  = await c.req.json();
    console.log(body);
    const promptWord = prompt.safeParse(body)
    
    
    if(!promptWord.success){
        c.json("INVALID TYPES!")
    }


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const gte = new Date();
    gte.setHours(0,0,0,0);

    const lt = new Date();
    lt.setDate(gte.getDate() + 1)

    const checkWord = await prisma.word.findFirst({
        where:{
            word: body.word,
            date_posted: {
                gte: gte,
                lt: lt
            }
        }
    })


   

    if(!checkWord){

    const date  = new Date(Date.now()).toISOString();


    const postedWord = await prisma.word.create({
        data:{
            word: body.word,
            date_posted: date
        }
    });


    return c.json({
        response : true,
        "Word Posted": postedWord
    })
        
    }else{
        return c.json({
            response: false
        })
    }

    


 
  

})


words.get("/", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const allWords = await  prisma.word.findMany()


    return c.json({
        words: allWords
    })




})


words.get("/todayWord", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const gte = new Date();
    gte.setHours(0,0,0,0);

    const lt = new Date();
    lt.setDate(gte.getDate() + 1)

    const todaysWord = await prisma.word.findFirst({
        where:{
            date_posted: {
                gte: gte,
                lt: lt
            }
        }
    })


    return c.json({
        todaysWord : todaysWord
    })


})





export default words;