const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const requests = urls.map((url) => httpGet(url))
  const responses = await Promise.allSettled(requests)

  return responses.map((response) => {
    if (isSuccessfulResponse(response)) {
      return {
        'Arnie Quote':  getResponseMessage(response.value.body)
      }
    }

    return {
      'FAILURE': getResponseMessage(response.value.body)
    }
  })
};

const isSuccessfulResponse = (response) => 
  response.status === 'fulfilled' && response.value.status === 200

const getResponseMessage = (message) => JSON.parse(message).message

module.exports = {
  getArnieQuotes,
};
