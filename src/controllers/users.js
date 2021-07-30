const { User, Admin } = require('../../models')
const send = require('../utils/response')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY
const pathFile = process.env.PATH_FILE

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    const schema = joi.object({
      role: joi.string(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    // check whether email user is exist in database,
    // if yes, return the user data from db
    // if not, user data will empty/null
    let userData
    if (role === 'admin') {
      userData = await Admin.findOne({
        where: {
          email,
        },
      })
    } else {
      userData = await User.findOne({
        where: {
          email,
        },
      })
    }

    if (!userData) {
      return res.send({
        status: 'failed',
        message: "Email or Password don't match",
      })
    }

    const isPasswordPassed = await bcrypt.compare(password, userData.password)

    if (!isPasswordPassed) {
      return res.send({
        status: 'failed',
        message: "Email or Password don't match",
      })
    }

    const token = jwt.sign(
      {
        id: userData._id,
        role: role ? role : 'user',
      },
      secretKey
    )

    send.data(res, {
      avatar: userData.avatar ? pathFile + userData.avatar : null,
      role: role ? role : 'user',
      token,
    })
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.register = async (req, res) => {
  try {
    const userData = req.body
    const { email, password } = req.body

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      fullname: joi.string().min(3).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    // check whether email user is exist in database,
    // if yes, return the user data from db, along with message 'email already registered'
    // if not, next
    const isEmailExist = await User.findOne({
      where: {
        email,
      },
    })
    if (isEmailExist) {
      return res.send({
        status: 'failed',
        message: 'Email already registered',
      })
    }

    const hashStrenght = 10
    const hashedPassword = await bcrypt.hash(password, hashStrenght)

    const user = await User.create({
      ...userData,
      password: hashedPassword,
      _createdAt: new Date(),
      _updatedAt: new Date(),
    })

    const token = jwt.sign(
      {
        id: user._id,
        role: 'user',
      },
      secretKey
    )

    send.data(res, {
      token,
      role: 'user',
    })
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.getMyProfile = async (req, res) => {
  const { userId, role } = req

  try {
    const userData = await User.findOne({
      where: {
        _id: userId,
      },
      attributes: {
        exclude: ['_createdAt', '_updatedAt', 'password'],
      },
    })

    send.data(res, {
      ...userData.dataValues,
      profileImage: userData.dataValues.profileImage
        ? pathFile + userData.dataValues.profileImage
        : null,
      role,
    })
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.updateAvatar = async (req, res) => {
  const { userId } = req

  // if user not select a file
  if (!req.files.avatar) {
    return res.send({
      status: 'failed',
      message: 'select a file to upload',
    })
  }

  const avatar = req.files.avatar[0].filename

  try {
    await User.update(
      {
        avatar,
      },
      {
        where: {
          _id: userId,
        },
      }
    )

    const userData = await User.findOne({
      where: {
        _id: userId,
      },
      attributes: ['avatar'],
    })

    send.data(res, {
      avatar: pathFile + userData.avatar,
    })
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}

exports.updateProfileImage = async (req, res) => {
  const { userId } = req

  // if user not select a file
  if (!req.files.profile) {
    return res.send({
      status: 'failed',
      message: 'select a file to upload',
    })
  }

  const profile = req.files.profile[0].filename

  try {
    await User.update(
      {
        profile,
      },
      {
        where: {
          _id: userId,
        },
      }
    )

    const userData = await User.findOne({
      where: {
        _id: userId,
      },
      attributes: ['profileImage'],
    })

    send.data(res, {
      profile: pathFile + userData.profileImage,
    })
  } catch (err) {
    console.log(err)
    send.serverError(res)
  }
}
