const { Router } = require('express')

// controllers
const {
  login,
  register,
  getMyProfile,
  updateAvatar,
  updateProfileImage,
} = require('../controllers/users')
const {
  addTransaction,
  getMyTransactions,
  getTransactions,
  approveTransaction,
  cancelTransaction,
  addCart,
} = require('../controllers/transactions')
const {
  getProducts,
  getProduct,
  addProduct,
} = require('../controllers/products')

// middlewares
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const router = Router()

// login
router.post('/login', login)
// register
router.post('/register', register)
// get my profile
router.get('/my-profile', auth, getMyProfile)
// update avatar
router.patch('/avatar', auth, uploadFile('avatar'), updateAvatar)
// update profile image
router.patch('/profile', auth, uploadFile('profile'), updateProfileImage)

// get all products
router.get('/products', getProducts)
// get detail product
router.get('/product/:id', getProduct)
// add product
router.post('/product', auth, uploadFile('photo'), addProduct)

// add transaction
router.post('/transaction', auth, uploadFile('attachment'), addTransaction)
// get my transactions
router.get('/my-transactions', auth, getMyTransactions)
// get all transactions
router.get('/transactions', auth, getTransactions)
// approve transaction
router.patch('/approve-transaction', auth, approveTransaction)
// cancel transaction
router.patch('/cancel-transaction', auth, cancelTransaction)
// add cart
router.post('/cart', auth, addCart)

module.exports = router
