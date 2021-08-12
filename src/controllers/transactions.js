const { Transaction, User, Cart, Product } = require('../../models')
const send = require('../utils/response')
const joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const pathFile = process.env.PATH_FILE

exports.addTransaction = async (req, res) => {
  const { userId } = req

  // if user not select a file
  if (!req.files.attachment) {
    return res.send({
      status: 'failed',
      message: 'select a file to upload',
    })
  }

  let transactionData = req.body
  let attachment = req.files.attachment[0].filename

  try {
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      phone: joi.string().required(),
      possCode: joi.string().required(),
      address: joi.string().max(250).required(),
      total: joi.number().required(),
    })

    const { error } = schema.validate(transactionData)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    const transaction = await Transaction.create({
      _id: uuidv4(),
      ...transactionData,
      userId,
      attachment,
      status: 'Waiting Approve',
      _createdAt: new Date(),
      _updatedAt: new Date(),
    })

    send.data(res, transaction)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.addCart = async (req, res) => {
  const cartData = req.body

  try {
    const cart = await Cart.create({
      _id: uuidv4(),
      ...cartData,
      _createdAt: new Date(),
      _updatedAt: new Date(),
    })

    send.data(res, cart)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.getMyTransactions = async (req, res) => {
  const { userId } = req

  try {
    let transactions = await Transaction.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: [
              '_createdAt',
              '_updatedAt',
              'password',
              'avatar',
              'profileImage',
            ],
          },
        },
        {
          model: Cart,
          as: 'products',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: {
                exclude: ['_updatedAt'],
              },
            },
          ],
          attributes: {
            exclude: ['_updatedAt', 'productId', 'transactionId'],
          },
        },
      ],
      attributes: {
        exclude: ['_createdAt', '_updatedAt', 'userId'],
      },
    })

    transactions = JSON.parse(JSON.stringify(transactions))
    transactions = transactions.map((transaction) => {
      transaction = {
        ...transaction,
        attachment: transaction.attachment
          ? pathFile + transaction.attachment
          : null,
        products: transaction.products.map((cart) => {
          cart = {
            ...cart,
            product: {
              ...cart.product,
              photo: cart.product.photo ? pathFile + cart.product.photo : null,
            },
          }

          return cart
        }),
      }

      return transaction
    })

    send.data(res, transactions)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.getTransactions = async (req, res) => {
  // only admin allowed to get this data
  const { role } = req
  if (role !== 'admin') {
    return res.send({
      status: 'failed',
      message: "Sorry, you're not an admin",
    })
  }

  try {
    let transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: [
              '_createdAt',
              '_updatedAt',
              'password',
              'avatar',
              'profileImage',
            ],
          },
        },
        {
          model: Cart,
          as: 'products',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: {
                exclude: ['_createdAt', '_updatedAt'],
              },
            },
          ],
          attributes: {
            exclude: ['_createdAt', '_updatedAt', 'productId', 'transactionId'],
          },
        },
      ],
      attributes: {
        exclude: ['_createdAt', '_updatedAt', 'userId'],
      },
      // order by created at, the newest transaction at the top
      order: [['_createdAt', 'DESC']],
    })

    transactions = JSON.parse(JSON.stringify(transactions))
    transactions = transactions.map((transaction) => {
      transaction = {
        ...transaction,
        attachment: transaction.attachment
          ? pathFile + transaction.attachment
          : null,
        products: transaction.products.map((cart) => {
          cart = {
            ...cart,
            product: {
              ...cart.product,
              photo: cart.product.photo ? pathFile + cart.product.photo : null,
            },
          }

          return cart
        }),
      }

      return transaction
    })

    send.data(res, transactions)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.approveTransaction = async (req, res) => {
  const { id } = req.body

  // only admin allowed to do this action
  const { role } = req
  if (role !== 'admin') {
    return res.send({
      status: 'failed',
      message: "Sorry, you're not an admin",
    })
  }

  // get transaction before approved
  const oldTransaction = await Transaction.findOne({
    where: { _id: id },
  })

  try {
    // make changes
    const transaction = {
      ...oldTransaction.dataValues,
      status: 'On The Way',
      _updatedAt: new Date(),
    }

    // update process
    await Transaction.update(transaction, {
      where: {
        _id: id,
      },
    })

    // get the new transaction after approved
    const newTransaction = await Transaction.findOne({
      where: { _id: id },
    })

    send.data(res, newTransaction)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.successTransaction = async (req, res) => {
  const { id } = req.body

  // only user allowed to do this action
  const { role } = req
  if (role !== 'user') {
    return res.send({
      status: 'failed',
      message: "Sorry, you're not a user",
    })
  }

  // get transaction before successed
  const oldTransaction = await Transaction.findOne({
    where: { _id: id },
  })

  try {
    // make changes
    const transaction = {
      ...oldTransaction.dataValues,
      status: 'Success',
      _updatedAt: new Date(),
    }

    // update process
    await Transaction.update(transaction, {
      where: {
        _id: id,
      },
    })

    // get the new transaction after successed
    const newTransaction = await Transaction.findOne({
      where: { _id: id },
    })

    send.data(res, newTransaction)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.cancelTransaction = async (req, res) => {
  const { id } = req.body

  // only admin allowed to do this action
  const { role } = req
  if (role !== 'admin') {
    return res.send({
      status: 'failed',
      message: "Sorry, you're not an admin",
    })
  }

  // get transaction before canceled
  const oldTransaction = await Transaction.findOne({
    where: { _id: id },
  })

  try {
    // make changes
    const transaction = {
      ...oldTransaction.dataValues,
      status: 'Canceled',
      _updatedAt: new Date(),
    }

    // update process
    await Transaction.update(transaction, {
      where: {
        _id: id,
      },
    })

    // get the new transaction after canceled
    const newTransaction = await Transaction.findOne({
      where: { _id: id },
    })

    send.data(res, newTransaction)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}
