import axios from "axios";

function convertUTCtoLocal(utcDateString) {
  const dateUTC = new Date(utcDateString);
  const dateLocal = new Date(dateUTC.getTime() + dateUTC.getTimezoneOffset());
  return dateLocal.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getUpcomingGames(year, month, day) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.sportradar.us/nba/trial/v8/en/games/${year}/${month}/${day}/schedule.json?api_key=${process.env.EXPO_PUBLIC_SPORTS_RADAR_KEY}`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    let date = response.data.date;
    let games = [];

    response.data.games.forEach((game) => {
      games.push({
        id: game.id,
        status: game.status,
        scheduledTime: convertUTCtoLocal(game.scheduled),
        awayID: game.away.id,
        away: game.away.name,
        awayScore: game.away_points,
        homeID: game.home.id,
        home: game.home.name,
        homeScore: game.home_points,
      });
    });

    return { date, games };
  } catch (error) {
    console.log(error);
  }
}

export async function getGameBoxScore(gameID) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.sportradar.us/nba/trial/v8/en/games/${gameID}/boxscore.json?api_key=${process.env.EXPO_PUBLIC_SPORTS_RADAR_KEY}`,
    headers: {},
  };

  try {
    const response = await axios.request(config);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getStandings() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.sportradar.us/nba/trial/v8/en/seasons/2023/REG/standings.json?api_key=${process.env.EXPO_PUBLIC_SPORTS_RADAR_KEY}`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getGameSummary(gameID) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.sportradar.us/nba/trial/v8/en/games/400048fc-414d-4f7b-95b3-1d74867ac4ee/summary.json?api_key=${process.env.EXPO_PUBLIC_SPORTS_RADAR_KEY}`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
