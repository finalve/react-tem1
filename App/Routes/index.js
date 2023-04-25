const express = require('express');
const router = express.Router();

const { verifySignUp, authJwt, verify,validateReqJSON, uploadImage } = require("../Middlewares");
const { CreateProduct,Products, CreatePromotion} = require('../Controllers/Products/productController');
const login = require('../Controllers/Auth/loginController');
const register = require('../Controllers/Auth/registerController')
const update = require('../Controllers/Auth/updateController');
const { CreateStore, Stores, Shop, PurchaseItem } = require('../Controllers/Stores/storeController');
const { CreateType, Types } = require('../Controllers/Types/typeController');
const { GetImage } = require('../Controllers/Images/imageController');
const { UserData } = require('../Controllers/UsersData/usersController');
//user section
router.get('/',(req,res)=> res.send('hello api'));
router.get('/photo/:id',GetImage);
router.get('/shop',Shop);
router.get('/products',[authJwt.verifyToken],Products);
router.get('/types',[authJwt.verifyToken],Types);

//user post auth already
router.post('/purchase',[authJwt.verifyToken],PurchaseItem);

//admin section post
router.post('/login',[verify.jsonBody(['username','password'])],login);
router.post('/register',[verify.jsonBody(['username','password'])],register);
router.post('/update',[authJwt.verifyToken],update);
router.post('/create/product',[authJwt.verifyToken,authJwt.isAdmin,uploadImage.single('img')],[verify.jsonBody(['name','cost','price','type','description'])],CreateProduct);
router.post('/create/store',[authJwt.verifyToken,authJwt.isAdmin,verify.jsonBody(['product','email','password','options','createAt','expiry'])],CreateStore);
router.post('/create/type',[authJwt.verifyToken,authJwt.isAdmin,verify.jsonBody(['name','description'])],CreateType);
router.post('/create/promotion',[authJwt.verifyToken,authJwt.isAdmin,verify.jsonBody(['product','promotion'])],CreatePromotion);
//admin section get
router.get('/stores',[authJwt.verifyToken,authJwt.isAdmin],Stores);
router.get('/userdata',[authJwt.verifyToken,authJwt.isAdmin],UserData);
module.exports = router;