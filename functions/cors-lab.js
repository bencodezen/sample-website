// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async event => {
  console.log('--------', event)
  if (event.httpMethod === 'OPTIONS') {
    const netlifyDomainRegex = /netlify.app$/

    if (netlifyDomainRegex.test(event.headers.origin)) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': event.headers.origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers':
            'Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-test'
        }
      }
    }
  }

  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello World`
      })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
