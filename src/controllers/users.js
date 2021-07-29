const { User, Admin } = require('../../models')
const send = require('../utils/response')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY
const pathFile = process.env.PATH_FILE

const login = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const register = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const getMyProfile = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const updateAvatar = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

const updateProfileImage = async (req, res) => {
  try {
    //
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.module = {
  login,
  register,
  getMyProfile,
  updateAvatar,
  updateProfileImage,
}
