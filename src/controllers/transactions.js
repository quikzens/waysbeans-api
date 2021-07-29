const { Transaction } = require('../../models')
const send = require('../utils/response')

const pathFile = process.env.PATH_FILE

const addTransaction = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const getMyTransactions = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const getTransactions = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

module.exports = {
  addTransaction,
  getMyTransactions,
  getTransactions,
}
