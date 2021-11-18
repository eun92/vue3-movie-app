const axios = require('axios') 
const { OMDB_API_KEY } = process.env

exports.handler = async function(event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload
  // const OMDB_API_KEY = '7035C60C'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` // id가 있을 때
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` // id가 없을 때
  
  // error test
  // const url =  `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  try {
    const { data } = await axios.get(url)
    if(data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch( error ) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }

  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //   .then((res) => {
  //     // console.log(res)
  //     if(res.data.Error){
  //       reject(res.data.Error)
  //     }
  //     resolve(res)
  //   }).catch(err => {
  //     reject(err.message)
  //   })
  // })
}