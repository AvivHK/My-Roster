const express = require('express')
const router = express.Router()
const request = require('request')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
    "wizards": "1610612764",
    "raptors": "1610612761",
    "spurs": "1610612759",
    "rockets": "1610612745"
}

const dreamTeam = [];

let allPlayers;

router.get(`/teams/:teamName`, function (req, res) {
    const { teamName } = req.params;
    const teamId = teamToIDs[teamName]
    request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, result) {
        players = JSON.parse(result.body).league.standard
        players = players.filter(player => player.teamId == teamId && player.isActive).map(player => {
            return { firstName: player.firstName, lastName: player.lastName, jersey: player.jersey, position: player.pos }
        })
        players.forEach(a => {
            a.img = `https://nba-players.herokuapp.com/players/${a.lastName}/${a.firstName}`
        })
        allPlayers = players
        res.send(players)
    })
})

router.put('/team/:teamName/:teamId', function (req, res) {
    const { teamName, teamId } = req.params;
    teamToIDs[teamName] = teamId
    res.send(teamToIDs)
})


router.get('/dreamTeam', function (req, res) {
    dreamTeam.forEach(a => a.onDreamTeam = true)
    res.send(dreamTeam)
})

router.post('/dreamTeam/:lastName/:firstName', function (req, res) {
    const { firstName, lastName } = req.params
    if (dreamTeam.length < 5) {
        player = allPlayers.find(a => a.firstName == firstName && a.lastName.split(' ')[0] == lastName)

        const playerToAdd = dreamTeam.find(a => a.firstName == firstName && a.lastName.split(' ')[0] == lastName)
        if (playerToAdd == null) {
            dreamTeam.push(player)
        }
    }
    res.send(dreamTeam)
})


router.delete('/dreamTeam/:lastName/:firstName', function (req, res) {
    const { firstName, lastName } = req.params
    const playerIndexToRemove = dreamTeam.findIndex(a => a.firstName == firstName && a.lastName.split(' ')[0] == lastName)
    dreamTeam.splice(playerIndexToRemove,1);
    res.send(dreamTeam)

})
    module.exports = router