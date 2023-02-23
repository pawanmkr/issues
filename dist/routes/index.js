import express from 'express';
import { signup, login } from '../controller/auth.js';
const router = express.Router();
// router.get("/post", getAllPost);
// router.get("/post/:postId", getPostById);
// router.post("/post/add", addPost);
// router.post("/post/delete/:postId", deletePost);
// router.post("/post/:postId/like", likePost);
// router.post("/post/:postId/comment", addCommentOnPost);
// router.patch("/post/update/:postId", editPost);
// router.post("/comment/:commentId/reply", replyOnComment)
router.post("/signup", signup);
router.post("/login", login);
export default router;
//# sourceMappingURL=index.js.map