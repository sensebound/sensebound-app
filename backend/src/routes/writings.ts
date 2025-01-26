import { Hono } from "hono";
import { verify } from "hono/jwt";
import {writingInput} from "senseboundtypes";
import axios from "axios";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


interface Bindings{
    DATABASE_URL: string,
    JWT_SECRET: string,
    BACKEND_URL: string

}

interface Variables {
    "userId": string,
    
}

const writings = new Hono<{
    Bindings: Bindings
    Variables: Variables
}>();



// auth middleware 
writings.use("/*", async (c, next)=>{
    try{

        const headers =  c.req.header("Authorization") as string | "";

        

        const token = headers.split(" ")[1] 

        
        
        const user = await verify(token,c.env.JWT_SECRET);


        if(user){
            c.set("userId", user.id as string);
            await next();
        }
        else{
            c.status(403);
            return c.json({
                "message": "You are not logged in."
            })
        }


        

    }catch(e){
        c.status(403);
        return c.json({
            "message": "You are not logged in."
        })
    }
    

})




writings.get("/:postId", async (c) => {
    const postId  = c.req.param('postId');
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());

      const writing = await prisma.writings.findUnique({
        where: {
            post_id: Number(postId)
      },select: {
        post_id : true,
        content: true,
        user: {
            select:{
                username: true
            }
        },
        word: {
            select:{
                word: true
            }
        },
        date_posted: true

      } })


      return c.json({
        writing
      })







})


writings.get("/user/:username", async (c) => {

    const username = c.req.param("username")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userPosts = await prisma.writings.findMany({
        where: {
            user:{
                username: username
            }
        },
        select:{
            content: true,
            user: {
                select:{
                    username: true
                }
            },
            date_posted: true,
            word:{
                select:{
                    word: true
                }
            }

        }
    })

    return c.json({
        "posts": userPosts
    })
});



writings.get("/", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const allPosts = await prisma.writings.findMany({
        include: {
            word: true,
            user: true
        },
    })


    return c.json({
        posts: allPosts
    })




})

writings.post("/post", async (c)=>{

    

    const body = await c.req.json();

    
   

    const {success} = writingInput.safeParse(body);
   

    if(!success){
        c.status(403);
        c.json({
            "message" : "INVALID Inputs"
        })
    
    }


    
      


    const date = new Date(Date.now()).toISOString()

      
    const wordId = body.wordId;
    const userId = body.userId;


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());

    

    const writing = await prisma.writings.create({
        data: {

            user_id: userId,
            content: body.content,
            word_id : wordId,
            date_posted: date
           
        },

    });


    return c.json({
        post_id:  writing.post_id,
        word_id:  writing.word_id
    });



    
    
  
})

writings.delete("/deleteAll", async (c)=> {
        

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());

    const deleteUsers = await prisma.writings.deleteMany({});

    return c.json({
        response: deleteUsers
    });

    });





export default writings;