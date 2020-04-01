export let Response = {
  UnAuthorized: {
    status: 403,
    message: {
      type: 'invalid_request_error',
      message: 'Not authorized'
    }
  },
  UserAlreadyExist: {
    status: 400,
    message: {
      type: 'invalid_request_error',
      message: 'User already exist'
    }
  },
  FireBase: {
    status: 400,
    message: {}
  },
  InvalidParam: {
    status: 400,
    message: {
      type: 'invalid_request_error',
      message: 'Invalid value of parameter'
    }
  },
  UserNotFound: {
    status: 404,
    message: {
      type: 'invalid_user_error',
      message: 'User Not Found'
    }
  },
  ServerError: {
    status: 500,
    message: {
      type: 'api_error',
      message: 'Internal server error'
    }
  },
  Success: {
    status: 200,
    message: {}
  }
};
