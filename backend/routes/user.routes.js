import express from 'express'
import { signup,login,logout, updateProfile, searchUserByQuery, getUserByID, getAllUsers, getCurrentUser, deleteUser} from '../controllers/user.controller'
const userRouter=express.Router()

userRouter.post('/signup',signup);
userRouter.post('/login', login);
userRouter.post('logout',auth,logout);
userRouter.put('updateprofile',auth,updateProfile);
userRouter.get('/search/:params',auth,searchUserByQuery);
userRouter.get('/searchId/:id',auth,getUserByID);
userRouter.get('/',auth,getAllUsers);
userRouter.get('/:id',auth,getCurrentUser);
userRouter.delete('/:id',auth,deleteUser);

export default userRouter