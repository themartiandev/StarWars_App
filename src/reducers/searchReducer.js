import {SEARCH_SUCCESS,SEARCH_FAILURE,SEARCH_NOT_REQUIRED,RESET_COUNT} from '../actions/ActionTypes'

const initialState = {
    searchError:'',
    searchResult:[],
    mySearchCount:0
  }

const searchReducer=(state = initialState, action)=>{
    switch (action.type) {
        case SEARCH_SUCCESS:
          return{...state,
            searchError:'',
            searchResult:action.payload,
            mySearchCount:state.mySearchCount+1
          }
        case SEARCH_FAILURE:
          let tempCount=state.mySearchCount; 
          if(action.payload=="No search results found!!"){
            tempCount=state.mySearchCount+1
          } 
          return{...state,
            searchError:action.payload,
            searchResult:[],
            mySearchCount:tempCount
          }
        case SEARCH_NOT_REQUIRED:
          return{...state,
            searchError:'',
            searchResult:[]
          }
        case RESET_COUNT:
          return{...state,
            mySearchCount:0
          }
        default:
          return state
      }
}

export default searchReducer;