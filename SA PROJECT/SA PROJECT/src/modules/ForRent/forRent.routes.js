import {Router} from 'express'
const router=Router()
import * as fr from './forRent.controller.js'
import { isAuthenticated } from '../../middlewares/auth.js'
import { asyncHandler } from '../../../utils/errorhandling.js'

router.post('/predictRent',isAuthenticated(),asyncHandler(fr.RentPredictionPrice))

export default router