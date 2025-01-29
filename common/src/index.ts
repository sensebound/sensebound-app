
import z from "zod";

// signup types 
export const signUpInput = z.object({
    username: z.string(),
    email: z.string().email(),
    password_hash: z.string(),
});


export type SignUpInput = z.infer<typeof signUpInput>;



// signin types
export const signInInput = z.object({
    user : z.string(),
    password: z.string(),
})

export type SignInInput = z.infer<typeof signInInput>;


// email type
export const email = z.string().email();

export type email = z.infer<typeof email>;


// word type 
export const prompt = z.object({
    word: z.string()
});


export type Prompt = z.infer<typeof prompt>


export const writingInput = z.object({
    content: z.string()
    

})


export type WritingInput = z.infer<typeof email>

// //model Writings {
//     post_id       Int @id @default(autoincrement())
//     user          User @relation(fields: [user_id], references: [id])
//     user_id       String
//     word          Word @relation(fields: [word_id], references: [id])
//     word_id       String
//     date_posted   DateTime
//     is_public     Boolean
//     likes         Int 
//   }


export const postId = z.string();

export type PostId = z.infer<typeof postId>;


export const userId = z.object({
    userId: z.string()
});

export type UserId = z.infer<typeof userId>;
  