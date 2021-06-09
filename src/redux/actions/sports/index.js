import {AXIOS_REQUEST} from "../auth/index"
import {toast} from "react-toastify"
// import sportsconfig from "../../../configs/sportsconfig";
import {history} from "../../../history"

export const get_sports_lists = (EventStatus) => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("sports/load_sportslist_player" , {data : EventStatus});
        dispatch({ type : "SPORTS_LIST", data: []});
        if(rdata.status){
            dispatch({ type : "SPORTS_LIST", data: rdata.data});
        }else{
            toast.error("error");
        }
    }
}

export const current_select_sport = (data) => {
    return (dispatch) => {
        dispatch({ type : "CURRENT_SELECT_SPORT", data: data});
    }
}

export const get_odds = ( sendData ) =>{
    return async (dispatch , getState) => {
        var rdata = await AXIOS_REQUEST("sports/load_sportsodds_bysportid_player" , sendData );
        if(rdata.status){
            if(!rdata.recovery.event_id){
                var EventStatus = "";
                var currentPage = history.location.pathname.split("/")[1];
                if(currentPage !== "sportsevent"){
                    if(currentPage === "sports") {
                        EventStatus = getState().sports.current_tap.EventStatus;
                    }
                    if(currentPage === "Inplay"){
                        EventStatus = "Live";
                    }
                    if(currentPage === "Upcoming"){
                        EventStatus = "NotStarted";
                    }
                }
                if(EventStatus === rdata.recovery.EventStatus && getState().sports.current_selected_sport.sport_id === rdata.recovery.sportid){
                    if(getState().sports.current_tap.title === "Lengues"){
                        dispatch(get_odds_lengues(rdata.data));
                    }else if(getState().sports.current_tap.title === "Top-Bet Matchs"){
                        dispatch(get_odds_topbet(rdata.data));
                    }else{
                        dispatch(get_odds_(rdata.data));                        
                    }
                }
            }else{
                dispatch(get_odds_(rdata.data));
            }
        }else {
            toast.error(rdata.data);
        };
    }
}

export const get_odds_ = (allOddData) => {
    return async(dispatch) => {
        dispatch({ type : "SET_ALL_MATCHS", data: []});
        var secondSearchData = [];
        for(var a = 0 ; a < allOddData.length ; a ++){
            if(!allOddData[a].market || !allOddData[a].market.length) continue;
            var flag = false;
            var temp = {};
            if(allOddData[a].ScheduledTime){
                var date = new Date(allOddData[a].ScheduledTime);
                if(date !== "Invalid Date"){
                    // var month = date.getMonth() + 1;
                    // var day = date.getDate();
                    // var weekday = date.getDay();
                    // var index = sportsconfig['weekday'].findIndex(item=>item.id === weekday);
                    // if(index > -1){
                    //     weekday = sportsconfig.weekday[index].name;
                    //     allOddData[a].ScheduledTime = day + " / " + month + " " + weekday;
                    // }
                }
            }
            for(var b = 0 ; b < secondSearchData.length ; b ++){
                if(allOddData[a].Season){
                    if(allOddData[a].Season.Id === secondSearchData[b].id){
                        secondSearchData[b].data.push(handleMarket(allOddData[a]));
                        flag = true;
                        break;
                    }
                }else{
                    if(secondSearchData[b].name === "Other"){
                        secondSearchData[b].data.push(handleMarket(allOddData[a]));
                        flag = true;
                        break;
                    }
                }
            }
            if(!flag){
                if(allOddData[a].Season){
                    temp.id = allOddData[a].Season.Id;
                    temp.name = allOddData[a].Season.Name;
                    temp.data = [handleMarket(allOddData[a])];
                    secondSearchData.push(temp);
                }else{
                    temp.id = Date.now();
                    temp.name = "Other";
                    temp.data = [handleMarket(allOddData[a])];
                    secondSearchData.push(temp);                    
                }
            }
        }
        secondSearchData.sort(function(a, b){
            return a.name === "Other" ? 1 : (a.name < b.name ? -1 : 1)
        });
        dispatch({ type : "SET_ALL_MATCHS", data: secondSearchData});
        dispatch({ type : "SET_ALL_MATCHS_SAVE", data: allOddData});
    }
}

export const get_odds_lengues = (allOddData) => {
    return async(dispatch) => {
        dispatch({ type : "SET_ALL_MATCHS", data: []});
        var secondSearchData = [];
        for(var a = 0 ; a < allOddData.length ; a ++){
            if(!allOddData[a].market || !allOddData[a].market.length) continue;
            var flag = false;
            var temp = {};
            if(allOddData[a].ScheduledTime){
                // var date = new Date(allOddData[a].ScheduledTime);
                // var month = date.getMonth() + 1;
                // var day = date.getDate();
                // var weekday = date.getDay();
                // var index = sportsconfig.weekday.findIndex(item=>item.id === weekday);
                // if(index > -1){
                //     weekday = sportsconfig.weekday[index].name;
                //     allOddData[a].ScheduledTime = day + " / " + month + " " + weekday;
                // }
            }
            for(var b = 0 ; b < secondSearchData.length ; b ++){
                if(allOddData[a].Venue){
                    if(allOddData[a].Venue.country === secondSearchData[b].name){
                        secondSearchData[b].data.push(handleMarket(allOddData[a]));
                        flag = true;
                        break;
                    }
                }else{
                    if(secondSearchData[b].name === "Other"){
                        secondSearchData[b].data.push(handleMarket(allOddData[a]));
                        flag = true;
                        break;
                    }
                }
            }
            if(!flag){
                if(allOddData[a].Venue){
                    temp.id = allOddData[a].Venue.id;
                    temp.name = allOddData[a].Venue.country;
                    temp.data = [handleMarket(allOddData[a])];
                    secondSearchData.push(temp);
                }else{
                    temp.id = Date.now();
                    temp.name = "Other";
                    temp.data = [handleMarket(allOddData[a])];
                    secondSearchData.push(temp);
                }
            }
        }
        secondSearchData.sort(function(a, b){
            return a.name === "Other" ? 1 : (a.name < b.name ? -1 : 1)
        });
        dispatch({ type : "SET_ALL_MATCHS", data: secondSearchData});
        dispatch({ type : "SET_ALL_MATCHS_SAVE", data: allOddData});
    }
}

export const get_odds_topbet = (allOddData) => {
    return async(dispatch) => {
        dispatch({ type : "SET_ALL_MATCHS", data: []});
        var secondSearchData = [
            {
                id : Date.now(),
                name : "Top Bet",
                data : []
            }
        ];
        for(var a = 0 ; a < allOddData.length ; a ++){
            if(!allOddData[a].market || !allOddData[a].market.length) continue;
            if(allOddData[a].ScheduledTime){
                // var date = new Date(allOddData[a].ScheduledTime);
                // var month = date.getMonth() + 1;
                // var day = date.getDate();
                // var weekday = date.getDay();
                // var index = sportsconfig.weekday.findIndex(item=>item.id === weekday);
                // if(index > -1){
                //     weekday = sportsconfig.weekday[index].name;
                //     allOddData[a].ScheduledTime = day + " / " + month + " " + weekday;
                // }
            }
            secondSearchData[0].data.push(handleMarket(allOddData[a]));
            if(secondSearchData[0].data.length === 5 || a + 1 === allOddData.length){
                dispatch({ type : "SET_ALL_MATCHS", data: secondSearchData});
                dispatch({ type : "SET_ALL_MATCHS_SAVE", data: allOddData});
                return;
            }
        }
    }
}

export const TapChange = (item) => {
    return (dispatch) => {
        dispatch({ type : "CURRENT_TAP_CHANGE", data : item })
    }
}

export const remove_all_match = (item) => {
    return (dispatch) => {
        dispatch({ type : "SET_ALL_MATCHS", data : [] });
        dispatch({ type : "CURRENT_SELECT_SPORT", data: []});
    }
}

export const currentSelectedGame = (data) => {
    return (dispatch) => {
        dispatch({ type : "CURRENTSELECTEDGAME", data : {} })
        dispatch({ type : "CURRENTSELECTEDGAME", data : data })
    }
}

export const setItem = (data)=>{
    return async (dispatch , getState) =>{
        let rdata = get(getState().sports.sportsSidebarData , data , getState().sports.current_bet_type);
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data: {data : []} });
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data: rdata });
    }
}

export const removeItem = (data)=>{
    return async (dispatch , getState) =>{
        let rdata = remove(getState().sports.sportsSidebarData , data , getState().sports.current_bet_type);
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data: {data : []} });
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data: rdata });
    }
}

export const removeAllItem = () => {
    return async (dispatch) =>{
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data: {
            data : [],
            totalMoney : 0,
            totalStack : 0, 
            totalOdds : 0
        }});
    }
}

export const updateSportsSidebar = (data ) => {
    return async (dispatch) =>{
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data: {data : []} });
        dispatch({ type : "SPORTS_SIDEBAR_SET_ITEM", data : data });
    }
}

export const changeBetType = (data ) => {
    return async (dispatch) =>{
        dispatch({ type : "CURRENT_BET_TYPE", data : data });
    }
}

export const placeBet = (sendData) => {
    return async (dispatch) => {
        var result = await AXIOS_REQUEST("sports/place_bet" , sendData)
        if(result.status){
            dispatch(removeAllItem());
            toast.success("Successfuly bet!");
        }else{
            toast.error("Server connection is failed!")
        }
    }
}

export const get_bet_history = (sendData) => {
    return async (dispatch) => {
        var result = await AXIOS_REQUEST("sports/get_bet_history" , sendData)
        if(result.status){
            dispatch({type : "BET_HISTORY_LIST" , data : result.data});
        }else{
            toast.error("Server connection is failed!")
        }
    }
}

export const get_all_sports_list = () => {
    return async(dispatch) => {
        var result = await AXIOS_REQUEST("sports/load_sportsdata");
        if(result.status){
            dispatch({type : "ALL_SPORT_LIST" , data : result.data});
        }else{
            toast.error("Server connection is failed!")
        }
    }
}

export const cashOut = (data) => {
    return async(dispatch , getState) => {
        var result = await AXIOS_REQUEST("sports/cashout" , data);
        if(result.status){
            var betHistory = getState().sports.bet_history_list;
            var realBetHistory = [];
            for(var i = 0 ; i < betHistory.length ; i ++){
                if(betHistory[i].transactionId !== data.transactionId){
                    realBetHistory.push(betHistory[i]);
                }
            }
            dispatch({type : "BET_HISTORY_LIST" , data : realBetHistory});
        }else{
            toast.error("Server connection is failed!")
        }
    }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function handleMarket(data){
    var pushData = data;
    pushData.oneTotwo = {}
    pushData.handicap = {}
    pushData.total = {}

    if(pushData.market){
        if(pushData.market.length){
            for(var f = pushData.market.length-1 ;f >= 0 ; f --){
                if(pushData.market[f].MarketName.toLowerCase() === "1x2"){
                    if(!pushData.market[f].Outcomes) break;
                    if(!pushData.market[f].Outcomes.length) break;
                    pushData.oneTotwo.MarketId = pushData.market[f].MarketId;
                    pushData.oneTotwo.MarketName = pushData.market[f].MarketName;
                    pushData.oneTotwo.MarketStatus = pushData.market[f].MarketStatus;
                    pushData.oneTotwo.MarketSpecifiers = pushData.market[f].MarketSpecifiers;
                    pushData.oneTotwo.one = {
                        OutcomeId : pushData.market[f].Outcomes[0].OutcomeId,
                        OutcomeName : pushData.market[f].Outcomes[0].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[f].Outcomes[0].OutcomeOdds).toFixed(2),
                    }
                    pushData.oneTotwo.draw = {
                        OutcomeId : pushData.market[f].Outcomes[1].OutcomeId,
                        OutcomeName : pushData.market[f].Outcomes[1].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[f].Outcomes[1].OutcomeOdds).toFixed(2),
                    }
                    pushData.oneTotwo.two = {
                        OutcomeId : pushData.market[f].Outcomes[2].OutcomeId,
                        OutcomeName : pushData.market[f].Outcomes[2].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[f].Outcomes[2].OutcomeOdds).toFixed(2),
                    }
                    break;
                }
            }

            for(var g = pushData.market.length-1 ;g >= 0 ; g --){
                if(pushData.market[g].MarketName.toLowerCase() === "handicap"){
                    if(!pushData.market[g].Outcomes) break;
                    if(!pushData.market[g].Outcomes.length) break;
                    pushData.handicap.MarketId = pushData.market[g].MarketId;
                    pushData.handicap.MarketName = pushData.market[g].MarketName;
                    pushData.handicap.MarketSpecifiers = pushData.market[g].MarketSpecifiers;
                    pushData.handicap.MarketStatus = pushData.market[g].MarketStatus;
                    pushData.handicap.one = {
                        OutcomeId : pushData.market[g].Outcomes[0].OutcomeId,
                        OutcomeName : pushData.market[g].Outcomes[0].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[g].Outcomes[0].OutcomeOdds).toFixed(2),
                    }
                    pushData.handicap.two = {
                        OutcomeId : pushData.market[g].Outcomes[1].OutcomeId,
                        OutcomeName : pushData.market[g].Outcomes[1].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[g].Outcomes[1].OutcomeOdds).toFixed(2),
                    }
                    pushData.handicap.spec = parseFloat(pushData.market[g].MarketSpecifiers.slice(4,pushData.market[g].MarketSpecifiers.length)).toFixed(2)
                    break;
                }
            }

            for(var h = pushData.market.length-1 ;h >= 0 ; h --){
                if(pushData.market[h].MarketName.toLowerCase() === "total"){
                    if(!pushData.market[h].Outcomes) break;
                    if(!pushData.market[h].Outcomes.length) break;
                    pushData.total.MarketId = pushData.market[h].MarketId;
                    pushData.total.MarketName = pushData.market[h].MarketName;
                    pushData.total.MarketSpecifiers = pushData.market[h].MarketSpecifiers;
                    pushData.total.MarketStatus = pushData.market[h].MarketStatus;
                    pushData.total.one = {
                        OutcomeId : pushData.market[h].Outcomes[0].OutcomeId,
                        OutcomeName : pushData.market[h].Outcomes[0].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[h].Outcomes[0].OutcomeOdds).toFixed(2),
                    }
                    pushData.total.two = {
                        OutcomeId : pushData.market[h].Outcomes[1].OutcomeId,
                        OutcomeName : pushData.market[h].Outcomes[1].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[h].Outcomes[1].OutcomeOdds).toFixed(2),
                    }
                    pushData.total.spec = parseFloat(pushData.market[h].MarketSpecifiers.slice(6,pushData.market[h].MarketSpecifiers.length)).toFixed(2)
                    break;
                }
            }
        }
    }
    return pushData;
}

function get(p1, p2 , betType){
    var index = p1.data.findIndex(data => data.OutcomeId === p2.OutcomeId && data.OutcomeName === p2.OutcomeName && data.MarketId === p2.MarketId && data.MarketName === p2.MarketName && data.MarketSpecifiers === p2.MarketSpecifiers && data.event_id === p2.event_id );
    if(index > -1){
        if(p1.data[index].OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) - parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
        if(betType === "single"){
            if(p1.data[index].amount) p1.totalMoney = (parseFloat(p1.totalMoney) - parseFloat(p1.data[index].amount)).toFixed(2);
            if(p1.data[index].amount) p1.totalStack = (parseFloat(p1.totalStack) - (parseFloat(p1.data[index].amount) * parseFloat(p1.data[index].OutcomeOdds))).toFixed(2);
        }else if(betType === "multi"){
            if(p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) / parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
        }
        p1.data.splice(index, 1);
    }else{
        if(p2.OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) + parseFloat(p2.OutcomeOdds)).toFixed(2);
        if(betType === "multi"){
            if(p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) * parseFloat(p2.OutcomeOdds)).toFixed(2);
        }
        if(p2.MarketStatus === "Suspended"){
            p2.message = "This market is Suspended.";
        }
        p1.data.push(p2);
    }
    return p1;
}

function remove(p1, p2 , betType){
    var index = p1.data.findIndex(data => data.OutcomeId === p2.OutcomeId && data.OutcomeName === p2.OutcomeName && data.MarketId === p2.MarketId && data.MarketName === p2.MarketName && data.MarketSpecifiers === p2.MarketSpecifiers && data.event_id === p2.event_id );
    if(p1.data[index].OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) - parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
    if(betType === "single"){
        if(p1.data[index].amount) p1.totalMoney = (parseFloat(p1.totalMoney) - parseFloat(p1.data[index].amount)).toFixed(2);
        if(p1.data[index].amount) p1.totalStack = (parseFloat(p1.totalStack) - (parseFloat(p1.data[index].amount) * parseFloat(p1.data[index].OutcomeOdds))).toFixed(2);
    }else if(betType === "multi"){
        if(p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) / parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
    }
    p1.data.splice(index, 1);
    return p1;
}