import {Router} from 'express'
import { addComment, addReview, getBookReview, getComments, removeBookReview, removeComment, updateBookReview, updateComment } from '../controllers/content.controller.js';
import { verifyJWT } from '../middilewares/verifyJWT.middileware.js';

export const contentRouter=Router();

contentRouter.route("/add-review").post(verifyJWT,addReview);
contentRouter.route("/get-book-reviews").post(getBookReview);
contentRouter.route("/remove-review/:reviewId").delete(removeBookReview);
contentRouter.route("/update-review").patch(updateBookReview);
contentRouter.route("/add-comment").post(addComment);
contentRouter.route("/get-comments").post(getComments);
contentRouter.route("/remove-comment/:commentId").delete(removeComment);
contentRouter.route("/update-comment").patch(updateComment);
