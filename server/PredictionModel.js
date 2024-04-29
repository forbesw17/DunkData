import axios from "axios";

export async function predictGame(home, away) {
    url = 'http://127.0.0.1:5000/'
    try {
        var winner;
        const response = await axios.get(url+ home + '+' + away);
        winner = response.data[0];
        console.log(winner);
        return winner;
    } catch (error) {
        console.error('Error in prediction model:', error);
    }
}

//predictGame('BOS','WAS');