const sinon = require('sinon');

const testController = async (controller, request = {}) => {
  const result = {
    body: undefined,
    status: undefined
  }

  const response = {};  
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns();

  await controller(request, response);
  return {...result, ...response};
}

module.exports = testController;