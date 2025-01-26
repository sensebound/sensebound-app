"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userId = exports.postId = exports.writingInput = exports.prompt = exports.email = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
// signup types 
exports.signUpInput = zod_1.default.object({
    username: zod_1.default.string().min(8),
    email: zod_1.default.string().email(),
    password_hash: zod_1.default.string(),
});
// signin types
exports.signInInput = zod_1.default.object({
    user: zod_1.default.string(),
    password: zod_1.default.string(),
});
// email type
exports.email = zod_1.default.string().email();
// word type 
exports.prompt = zod_1.default.object({
    word: zod_1.default.string()
});
exports.writingInput = zod_1.default.object({
    content: zod_1.default.string()
});
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
exports.postId = zod_1.default.object({
    postId: zod_1.default.string()
});
exports.userId = zod_1.default.object({
    userId: zod_1.default.string()
});
