import { Hono } from "hono";

import { jwt, sign, verify} from 'hono/jwt'
import { signUpInput, email, signInInput, userId } from "senseboundtypes";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Resend } from "resend";
import emailTemplate from "./emailtemplate";
import { sha256 } from "hono/utils/crypto";





interface Bindings {
    DATABASE_URL : string
    JWT_SECRET : string
    FRONTEND_URL: string
}

const user = new Hono<{
    Bindings: Bindings
}>();

// show all users

user.get('/', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany();
    
    return c.json({
        data: users
    })


});



// signup route
user.post('/signup', async (c) => {
    
    const body = await c.req.json()
    const {success} = signUpInput.safeParse(body);
  
    
    if(!success){
        c.status(400);
        return c.json({
            inputValidationError: true
        })

    } 

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    try{

        const date  = new Date(Date.now()).toISOString();

        const emailExists = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })


        const usernameExists = await prisma.user.findFirst({
            where: {
                username: body.username
            }
        })

        if(emailExists || usernameExists){

            return c.json({
                alreadyExists: true
            })
        }


        

        const hashedPassword = await sha256(body.password_hash);
        
        
        const newUser = await prisma.user.create({
            data:{
                email: body.email,
                username: body.username,
                password_hash: hashedPassword,
                join_date: date
            }
        })


        const token = await sign({
            id: newUser.id
        }, c.env.JWT_SECRET)

        return c.json({
            token: token,
            user_id: newUser.id
        })

       
        
    } catch(e){
        console.log(e)
    }
    
    

    
})


// signin route
user.post('/signin', async (c) => {
    
    const body =  await c.req.json();
    
    const success = signInInput.safeParse(body);
    
    const isEmail = email.safeParse(body.user);


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const hashedPassword = await sha256(body.password)
    
   
    const user = isEmail.success 
    ? await prisma.user.findUnique({
        where: {
            email: body.user,
            password_hash : hashedPassword
        }
    })
    :  await prisma.user.findUnique({
            where: {
                username: body.user,
                password_hash: hashedPassword
            }
        })

    if(!user){
        c.status(400)
        return c.json({
            invalidCredentials: true
        })
    }

    console.log(user);

    

    const token = await sign({
        id: user.id
    }, c.env.JWT_SECRET)
    

    return c.json({
        token: token,
        user: user.username,
        email: user.email,
        user_id: user.id
    })

});

user.post('/password-reset', async (c)=>{

    const body = await c.req.json()

    const resend = new Resend('re_9dD36BGY_6gbjqR6vtjWz4NUfknhRM6GX')
    

    const isEmail = email.safeParse(body.email)


    if(!isEmail.success){

        throw new Error("Invalid Email")
    }
 

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const user = isEmail.success && (
        await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
    )



    if(!user){

        throw new Error("User does not exist!")
    }

    const token = await sign(
        {email: body.email}, 
        c.env.JWT_SECRET,
        
    )

    
    
    const response = await prisma.resetTokens.create({
        data:{
            user_id: String(user.id),
            email: user.email,
            token: token
        }
    });

    const  FRONTEND_URL = "http://localhost:5173"

    const emailContent = emailTemplate({frontendUrl: FRONTEND_URL, userId:user.id, token:token })

   

    const { data, error } = await resend.emails.send({
        from: 'Sensebound <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Sensebound - Password Reset Link',
        html: String(emailContent)
      });

    return c.json({
        response
    })

})


user.post('/password-reset/:userid/:token', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userId = c.req.param("userid");
    const token =  c.req.param("token");


    const checkToken = await prisma.resetTokens.findFirst({
        where:{
            user_id: userId,
            token: token
        }       
    })

    if(!checkToken){

        return c.json({
            check: false
        })
    }

    const deletedToken = await prisma.resetTokens.deleteMany({
        where:{
            token: token
        }
    })

    return c.json(
        {
            user_id: checkToken.user_id,
            check: true
        }
    )


    
    
})

user.put("/update-password/:userid", async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userId = c.req.param("userid")

    interface newPassword {
        password: string
    }

    const body : newPassword = await c.req.json()

    console.log(body.password)

    const update = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            password_hash: body.password
        }
    })

    if(!update){

        return c.json(
            {
                password: false
            }
        )
    }

    return c.json({
        password: true
    })
})

// do not use in production 
user.delete("/deleteAllUsers", async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const deleteUsers = await prisma.user.deleteMany({});


    return c.json({
        "message": deleteUsers
    })


});


user.delete('/deleteTokens', async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const deleteTokens = await prisma.resetTokens.deleteMany({});

    return c.json({
        deleteTokens
    })
})





export default user;