import {Router} from 'express'
const router=Router()
import * as uc from './user.controller.js'
import { asyncHandler } from '../../../utils/errorhandling.js'
import { isAuthenticated } from '../../middlewares/auth.js'
import { validationCoreFunction } from '../../middlewares/Validatation.js'
import { ChangeInfo, ChangePass, SignUpSchema } from './user.ValidationSchemas.js'



router.post('/signup',validationCoreFunction(SignUpSchema),uc.SignUp)
router.post('/login',asyncHandler((uc.Login)))
router.patch('/ChangePassword',isAuthenticated(),validationCoreFunction(ChangePass),asyncHandler((uc.ChangePassword)))
router.delete('/DeleteUser',isAuthenticated(),asyncHandler((uc.DeleteUser)))
router.patch('/Logout',isAuthenticated(),asyncHandler((uc.LogOut)))
router.put('/ChangeUserInfo/:userID',isAuthenticated(),validationCoreFunction(ChangeInfo),asyncHandler((uc.UpdateInfo)))
router.get('/getUserInfo/:userID',isAuthenticated(),asyncHandler((uc.GetUserInfo)))



export default router