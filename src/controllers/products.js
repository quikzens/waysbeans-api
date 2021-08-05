const { Product } = require('../../models')
const send = require('../utils/response')
const joi = require('joi')
const { v4: uuidv4 } = require('uuid')

const pathFile = process.env.PATH_FILE

exports.getProducts = async (req, res) => {
  try {
    let products = await Product.findAll({
      attributes: {
        exclude: ['_createdAt', '_updatedAt'],
      },
      // order by created at, the newest product at the top
      order: [['_createdAt', 'DESC']],
    })

    // add path file to the photo
    products = JSON.parse(JSON.stringify(products))
    products = products.map((product) => {
      return {
        ...product,
        photo: product.photo ? pathFile + product.photo : null,
      }
    })

    send.data(res, [...products])
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.getProduct = async (req, res) => {
  const id = req.params.id

  try {
    let product = await Product.findOne({
      where: {
        _id: id,
      },
      attributes: {
        exclude: ['_createdAt', '_updatedAt'],
      },
    })

    // add path file to the photo
    product = JSON.parse(JSON.stringify(product))
    product = {
      ...product,
      photo: product.photo ? pathFile + product.photo : null,
    }

    send.data(res, product)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.addProduct = async (req, res) => {
  // only admin could add a new product
  const { role } = req
  if (role !== 'admin') {
    return res.send({
      status: 'failed',
      message: "Sorry, you're not an admin",
    })
  }

  // if user not select a file
  if (!req.files.photo) {
    return res.send({
      status: 'failed',
      message: 'select a file to upload',
    })
  }

  let productData = req.body
  let photo = req.files.photo[0].filename

  try {
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      stock: joi.number().required(),
    })

    const { error } = schema.validate(productData)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    const product = await Product.create({
      _id: uuidv4(),
      ...productData,
      photo,
      _createdAt: new Date(),
      _updatedAt: new Date(),
    })

    send.data(res, product)
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}
