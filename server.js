require('dotenv').config();
//const Constants = require('expo-constants');


const axios = require('axios');
//const { get } = require('react-native/Libraries/TurboModule/TurboModuleRegistry');

// returns map of teams and their codes 
async function getTeamCodes(){
  
  let teamCodes = new Map();

  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams',
    params: {league: 'standard'},
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    for(let item of response.data.response){
      //console.log(item.id);
      //console.log(item.name);
      teamCodes.set(item.name, item.id);
    }
   
  } catch (error) {
    console.error(error);
  }
    }

  await fetchData();
  console.log(teamCodes.get("Atlanta Hawks"));
  console.log(teamCodes.get("Boston Celtics"));
  return teamCodes;
}

//returns all players from a given team in a given year
async function getPlayers(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players',
    params: {
      team: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  playerMap = new Map();
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        console.log(item.firstname + " " + item.lastname + " " + item.id);
        playerMap.set(item.firstname + " " + item.lastname, item.id);
        return playerMap;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

//returns all player statistics for a given player in a given season
//to get sesason averages you need to average the average from total number of games
async function playerStatsPerSeason(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };


  
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.response;
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

//returns the average points per game for a given player in a given season
async function getPlayerAvgPoints(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalPoints = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalPoints += item.points;
        //console.log(item.points);
      }
      console.log(totalPoints);
      console.log(response.data.response.length);
      console.log(totalPoints/response.data.response.length);
      return totalPoints/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getPlayerAvgAssists(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalAssists = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalAssists += item.assists;
        //console.log(item.points);
      }
      console.log(totalAssists);
      console.log(response.data.response.length);
      console.log(totalAssists/response.data.response.length);
      return totalAssists/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getPlayerAvgRebounds(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalRebounds = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalRebounds += item.totReb;
        //console.log(item.points);
      }
      console.log(totalRebounds);
      console.log(response.data.response.length);
      console.log(totalRebounds/response.data.response.length);
      return totalRebounds/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getPlayerAvgSteals(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalSteals = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalSteals += item.steals;
        //console.log(item.points);
      }
      console.log(totalSteals);
      console.log(response.data.response.length);
      console.log(totalSteals/response.data.response.length);
      return totalSteals/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

async function getPlayerAvgBlocks(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalBlocks = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalBlocks += item.blocks;
        //console.log(item.points);
      }
      console.log(totalBlocks);
      console.log(response.data.response.length);
      console.log(totalBlocks/response.data.response.length);
      return totalBlocks/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

async function getPlayerAvgTurnovers(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalTurnovers = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalTurnovers += item.turnovers;
        //console.log(item.points);
      }
      console.log(totalTurnovers);
      console.log(response.data.response.length);
      console.log(totalTurnovers/response.data.response.length);
      return totalTurnovers/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

async function getPlayerAvgFouls(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalFouls = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalFouls += item.pFouls;
        //console.log(item.points);
      }
      console.log(totalFouls);
      console.log(response.data.response.length);
      console.log(totalFouls/response.data.response.length);
      return totalFouls/response.data.response.length;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getPlayerFieldGoalPercentage(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalFieldGoals = 0;
  let totalFieldGoalAttempts = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalFieldGoals += item.fgm;
        totalFieldGoalAttempts += item.fga;
        //console.log(item.points);
      }
      console.log(totalFieldGoals);
      console.log(totalFieldGoalAttempts);
      console.log(totalFieldGoals/totalFieldGoalAttempts);
      return totalFieldGoals/totalFieldGoalAttempts;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getPlayerThreePointPercentage(playerId, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      id: playerId,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let totalThreePointers = 0;
  let totalThreePointAttempts = 0;
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        totalThreePointers += item.tpm;
        totalThreePointAttempts += item.tpa;
        //console.log(item.points);
      }
      console.log(totalThreePointers);
      console.log(totalThreePointAttempts);
      console.log(totalThreePointers/totalThreePointAttempts);
      return totalThreePointers/totalThreePointAttempts;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getTeamPointsPerGame(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var totalPoints = 0;
      var totalGames = 0; 
      for(let item of response.data.response){
        //console.log(item.points);
        //console.log(item.games);
        totalPoints = item.points;  
        totalGames = item.games;
      }
      //console.log(totalPoints/totalGames);
      return totalPoints/totalGames;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getTeamFieldGoalPercentage(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var fieldGoalPercentage;
      for(let item of response.data.response){
        //console.log(item.fgm);
        //console.log(item.fga);
        fieldGoalPercentage = item.fgp;
      }
      //console.log(totalFieldGoals/totalFieldGoalAttempts);
      return fieldGoalPercentage;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getTeamFreeThrowPrecentage(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var freeThrowPercentage;
      for(let item of response.data.response){
        freeThrowPercentage = item.ftp;
      }
      
      return freeThrowPercentage;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getTeamThreePointPercentage(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var threePointPercentage;
      for(let item of response.data.response){
        threePointPercentage = item.tpp;
      }
      
      return threePointPercentage;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();
}

async function getTeamReboundsPerGame(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var totalRebounds = 0;
      var totalGames = 0; 
      for(let item of response.data.response){
        totalRebounds = item.totReb;  
        totalGames = item.games;
      }
      console.log(totalRebounds);
      console.log(totalGames);
      return totalRebounds/totalGames;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

async function getTeamAssistsPerGame(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var totalAssists = 0;
      var totalGames = 0; 
      for(let item of response.data.response){
        totalAssists = item.assists;  
        totalGames = item.games;
      }
      console.log(totalAssists);
      console.log(totalGames);
      return totalAssists/totalGames;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

async function getTeamStealsPerGame(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var totalSteals = 0;
      var totalGames = 0; 
      for(let item of response.data.response){
        totalSteals = item.steals;  
        totalGames = item.games;
      }
      console.log(totalSteals);
      console.log(totalGames);
      return totalSteals/totalGames;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

async function getTeamBlocksPerGame(teamCode, season){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamCode,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      var totalBlocks = 0;
      var totalGames = 0; 
      for(let item of response.data.response){
        totalBlocks = item.blocks;  
        totalGames = item.games;
      }
      console.log(totalBlocks);
      console.log(totalGames);
      return totalBlocks/totalGames;
      
    } catch (error) {
      console.error(error);
    }
  }

  return fetchData();

}

//returns a map of games to be played on a given date. 
//data param format: 'YYYY-MM-DD'
async function getGames(date){
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {date: date},
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_API_KEY,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  async function fetchData(){
    gameMap = new Map();
    try {
      const response = await axios.request(options);
      console.log(response.data);
      for(let item of response.data.response){
        gameName = item.teams.visitors.name + " @ " + item.teams.home.name;
        gameId = item.id;
        gameMap.set(gameId, gameName);
        console.log(item.teams.visitors.name);
        console.log(item.teams.home.name);
        console.log(item.id);
        console.log('---------------');
      }
      return gameMap;
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
}

let data1 = getGames('2024-02-06');

data1.then(data => {
  console.log(data);
})

//let data = getTeamFieldGoalPercentage('25', '2023');

/*data.then(data => {
  console.log(data);
})*/