import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module!
  namespaced: true, 
  // data! 함수로 표현
  state: () => ({
      movies: [],
      message: _defaultMessage,
      loading: false,
      theMovie: {}
    }),
  // computed!
  getters: {
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  // methods!
  mutations: { // 변이 (데이터 변경은 여기서만!)
    updateState(state, payload){
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기 ( 데이터 변경이 아닌것만. )
  actions: {
    async searchMovies({state, commit}, payload) {
      if(state.loading) return // return : 함수 종료(아래 함수 실행 안함) / searchMovies 함수가 여러번 실행되는 것을 방지

      commit('updateState', {
        message: '',
        loading: true
      })

      try{
  // const {title, type, number, year} = payload 
        // const OMDB_API_KEY = '7035C60C'
        // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        
        const { Search, totalResults} = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
          // message: 'hello',
          // loading: true
        })
        console.log(totalResults) // 279 => 28
        console.log(typeof totalResults) // string

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가 요청
        if(pageLength > 1){
          for(let page = 2; page <= pageLength; page +=1) {
            if(page > payload.number / 10) break
            
            // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch(message) {
        commit('updateState', {
          movies: [], // 초기화
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },

    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return // return : 함수 종료(아래 함수 실행 안함) / searchMovies 함수가 여러번 실행되는 것을 방지

      commit('updateState', {
        theMovie: {}, // 초기화
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035C60C'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` // id가 있을 때
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` // id가 없을 때
  
  // error test
  // const url =  `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  return new Promise((resolve, reject) => {
    axios.get(url)
    .then((res) => {
      // console.log(res)
      if(res.data.Error){
        reject(res.data.Error)
      }
      resolve(res)
    }).catch(err => {
      reject(err.message)
    })
  })
}