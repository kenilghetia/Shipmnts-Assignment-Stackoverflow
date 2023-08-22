const userDetails = require("../models/User.js");
const answerDetails = require("../models/Answer.js");
const questionDetails = require("../models/Question.js");
const commentDetails = require("../models/Comment.js");

const sc = require("../config/status_code.js");
const jwt = require("jsonwebtoken");
const { key } = require("../config/jwt_config.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await userDetails.findOne({ email });

      if (existingUser) {
        return res.status(409).send({
          statuscode: sc.Conflict.code,
          message: sc.Conflict.message,
          data: "user already exists with this email",
        });
      }

      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          const x = await userDetails.create({
            name,
            email,
            password: hash,
          });
          return res.status(200).send({
            statuscode: sc.Created.code,
            message: sc.Created.message,
            data: x,
          });
        });
      });
    } catch (error) {
      return res.status(500).send({
        statuscode: sc.Internal_Server_Error.code,
        message: sc.Internal_Server_Error.message,
        data: error,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await userDetails.findOne({ email });

      const id = existingUser._id.toString();
      const role = existingUser.role;

      if (!existingUser) {
        return res.status(409).send({
          statuscode: sc.Conflict.code,
          message: sc.Conflict.message,
          data: "user does not exists with this email",
        });
      } else {
        const compare = await bcrypt.compare(password, existingUser.password);

        if (!compare) {
          return res.status(401).send({
            statuscode: sc.Unauthorized.code,
            message: sc.Unauthorized.message,
            data: "Incorrect password!",
          });
        } else {
          const token = jwt.sign({ id, email, role }, key, {
            expiresIn: "10h",
          });
          return res.status(200).send({
            statuscode: sc.OK.code,
            message: "Successfully logged in",
            data: token,
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        statuscode: sc.Internal_Server_Error.code,
        message: sc.Internal_Server_Error.message,
        data: error,
      });
    }
  },

  addQuestion: async (req, res) => {
    try {
      const { question } = req.body;
      const userId = req.user.id;
      const x = await questionDetails.create({
        question,
        created_by: userId,
      });
      return res.status(200).send({
        statuscode: sc.Created.code,
        message: sc.Created.message,
        data: x,
      });
    } catch (error) {
      return res.status(500).send({
        statuscode: sc.Internal_Server_Error.code,
        message: sc.Internal_Server_Error.message,
        data: error,
      });
    }
  },

  getAllQuestions: async (req, res) => {
    try {
      const x = await questionDetails.find();
      return res.status(200).send({
        statuscode: sc.OK.code,
        message: sc.OK.message,
        data: x,
      });
    } catch (error) {
      return res.status(500).send({
        statuscode: sc.Internal_Server_Error.code,
        message: sc.Internal_Server_Error.message,
        data: error,
      });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const { questionId } = req.params;
      const { question } = req.body;

      const x = await questionDetails.findByIdAndUpdate(
        questionId,
        { question },
        { new: true }
      );
      return res
        .status(200)
        .send({ statuscode: sc.OK.code, message: sc.OK.message, data: x });
    } catch (error) {
      return res.status(500).send({
        statuscode: sc.Internal_Server_Error.code,
        message: sc.Internal_Server_Error.message,
        data: error,
      });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const { questionId } = req.params;
      const x = await questionDetails.findByIdAndDelete(questionId);
    } catch (error) {
      return res.status(500).send({
        statuscode: sc.Internal_Server_Error.code,
        message: sc.Internal_Server_Error.message,
        data: error,
      });
    }
  },
};
