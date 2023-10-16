const{getUsers,createUser,updateUser,deleteUser}= require('../controller/UserController');

const userRoutes = (router) => {
    router.get('/users', getUsers);
    router.post('/users', createUser);
    router.patch('/users', updateUser);
    router.delete('/users', deleteUser);
}


module.exports = { userRoutes };