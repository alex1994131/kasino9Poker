import sportConfig from "../../../configs/sportsconfig"

const initialState = {
    sports_list : [],
    current_selected_sport : {},
    current_tap : sportConfig.tab[0],
    all_matchs : [],
    currentSelectedGame : {},
    sportsSidebarData : {
        data : [],
        totalOdds : 0,
        totalMoney : 0,
    },
    all_matchs_save : [],
    current_bet_type : "single",
    bet_history_list : [],
    all_sports_list : [],
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case "SPORTS_LIST" :
            return { ...state,sports_list : action.data }
        case "CURRENT_SELECT_SPORT" :
            return { ...state,current_selected_sport : action.data }
        case "CURRENT_TAP_CHANGE" :
            return { ...state,current_tap : action.data }
        case "SET_ALL_MATCHS" :
            return { ...state,all_matchs : action.data }
        case "CURRENTSELECTEDGAME" :
            return { ...state , currentSelectedGame : action.data}
        case "SPORTS_SIDEBAR_SET_ITEM" :
            return { ...state, sportsSidebarData : action.data }
        case "SET_ALL_MATCHS_SAVE" : 
            return { ...state, all_matchs_save : action.data }
        case "CURRENT_BET_TYPE" : 
            return { ...state, current_bet_type : action.data }
        case "BET_HISTORY_LIST" : 
            return { ...state, bet_history_list : action.data }
        case "ALL_SPORT_LIST" : 
            return { ...state, all_sports_list : action.data }
        case "REFRESH_BET_ID" : 
            return { ...state, betId : action.data }
        default:
            return state
    }
  }
  
export default player
  
