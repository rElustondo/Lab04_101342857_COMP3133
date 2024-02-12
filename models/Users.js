const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email address'
    }
  },
  address: {
    street: {
      type: String,
      required: true
    },
    suite: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return /^[a-zA-Z ]+$/.test(value);
        },
        message: 'Invalid city name'
      }
    },
    zipcode: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return /^\d{5}-\d{4}$/.test(value);
        },
        message: 'Invalid zip code format. Use DDDDD-DDDD format'
      }
    },
    geo: {
      lat: {
        type: String,
        required: true
      },
      lng: {
        type: String,
        required: true
      }
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^\d-\d{3}-\d{3}-\d{4}$/.test(value);
      },
      message: 'Invalid phone number format. Use D-DDD-DDD-DDDD format'
    }
  },
  website: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Invalid website URL'
    }
  },
  company: {
    name: {
      type: String,
      required: true
    },
    catchPhrase: {
      type: String,
      required: true
    },
    bs: {
      type: String,
      required: true
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
