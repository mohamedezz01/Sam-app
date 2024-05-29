import {Router} from 'express'
const router=Router()
import * as fb from './forbuy.controller.js'
import { isAuthenticated } from '../../middlewares/auth.js'
import { asyncHandler } from '../../../utils/errorhandling.js'

router.post('/predict',isAuthenticated(),asyncHandler(fb.PredictPrice))

export default router