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
} = require('../controllers/transactions')
const {
  getProducts,
  getProduct,
  addProduct,
} = require('../controllers/products')

const router = Router()

// login
router.post('/login', login)
// register
router.post('/register', register)
// get my profile
router.post('/my-profile', getMyProfile)
// update avatar
router.post('/avatar', updateAvatar)
// update profile image
router.post('/profile', updateProfileImage)

// get all products
router.post('/products', getProducts)
// get detail product
router.post('/product/:id', getProduct)
// add product
router.post('/product', addProduct)

// add transaction
router.post('/transaction', addTransaction)
// get my transactions
router.post('/my-transactions', getMyTransactions)
// get all transactions
router.post('/transactions', getTransactions)

module.exports = router
