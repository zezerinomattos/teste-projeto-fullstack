import { Router } from "express";

// -- ROTAS USER --
import { CreateUserController } from '../controllers/user/CreateUserController';
import { ListUsersController } from '../controllers/user/ListUsersController';
import { ListUsersControllerAsce } from '../controllers/user/ListUsersControllerAsce';
import { ListUsersControllerDesc } from '../controllers/user/ListUsersControllerDesc';
import { ListUsersControllerName } from '../controllers/user/ListUserControllerName';
import { ListPeriodTimeController } from '../controllers/user/ListPeriodTimeController';
import { EditUserController } from '../controllers/user/EditUserController';
import { DeleteUserController } from '../controllers/user/DeleteUserController';
import { DetailUserController } from '../controllers/user/DetailUserController';

const router = Router();

// -- ROTAS USER --
router.post('/user', new CreateUserController().handle);
router.get('/users', new ListUsersController().handle);
router.get('/users/asce', new ListUsersControllerAsce().handle);
router.get('/users/desc', new ListUsersControllerDesc().handle);
router.get('/users/name', new ListUsersControllerName().handle);
router.get('/users/date', new ListPeriodTimeController().handle);
router.put('/user', new EditUserController().handle);
router.delete('/user', new DeleteUserController().handle);
router.get('/user/detail', new DetailUserController().handle);

export {router};