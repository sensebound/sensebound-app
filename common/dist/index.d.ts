import z from "zod";
export declare const signUpInput: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password_hash: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password_hash: string;
}, {
    username: string;
    email: string;
    password_hash: string;
}>;
export type SignUpInput = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    user: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user: string;
    password: string;
}, {
    user: string;
    password: string;
}>;
export type SignInInput = z.infer<typeof signInInput>;
export declare const email: z.ZodString;
export type email = z.infer<typeof email>;
export declare const prompt: z.ZodObject<{
    word: z.ZodString;
}, "strip", z.ZodTypeAny, {
    word: string;
}, {
    word: string;
}>;
export type Prompt = z.infer<typeof prompt>;
export declare const writingInput: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export type WritingInput = z.infer<typeof email>;
export declare const postId: z.ZodObject<{
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
}, {
    postId: string;
}>;
export type PostId = z.infer<typeof postId>;
export declare const userId: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
export type UserId = z.infer<typeof userId>;
//# sourceMappingURL=index.d.ts.map