const { Product } = require('../../models')
const send = require('../utils/response')

const pathFile = process.env.PATH_FILE

const getProducts = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const getProduct = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const addProduct = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
}
