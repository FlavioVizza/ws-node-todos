import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

/**
 * Schema definition for the User model.
 * It defines the structure of user documents in the MongoDB collection.
 * 
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} hashed_password - The hashed password of the user.
 * @property {string} salt - The salt used for hashing the password.
 * @property {Date} updated - The date when the user document was last updated.
 * @property {Date} created - The date when the user document was created.
 */

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: 'Username is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

/**
 * Virtual property for setting and getting the plain password.
 * It automatically generates a salt and hashes the plain password.
 * 
 * @type {Object}
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

/**
 * Validates the hashed password.
 */
UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 8) {
    this.invalidate('password', 'Password must be at least 8 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

/**
 * Methods associated with the User schema.
 * 
 * @type {Object}
 */
UserSchema.methods = {
  /**
   * Authenticates the user by comparing the provided plain text password with the hashed password.
   * 
   * @param {string} plainText - The plain text password to compare.
   * @returns {boolean} - True if the passwords match, false otherwise.
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Encrypts the provided password using bcrypt.
   * 
   * @param {string} password - The plain text password to encrypt.
   * @returns {string} - The hashed password.
   */
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, this.salt);
    } catch (err) {
      return '';
    }
  },

  /**
   * Generates a salt for password hashing.
   * 
   * @returns {string} - The generated salt.
   */
  makeSalt: function() {
    return bcrypt.genSaltSync(10);
  }
}

export default mongoose.model('User', UserSchema)