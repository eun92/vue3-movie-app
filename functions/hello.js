exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    // body: 'Hello World!!'
    body: JSON.stringify({
      name: 'eun',
      age: 30,
      email: 'qoo0131@gamil.com'
    })
  }
}