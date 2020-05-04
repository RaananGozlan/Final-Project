var express = require('express');
var DButilsAzure = require('../DButils');
var Knapsack = express.Router();
var parser = require('body-parser');
const jwt = require('jsonwebtoken');

Knapsack.use(express.json());
module.exports = Knapsack;

var cors = require('cors');
Knapsack.use(cors());

/**
 * get instance of a problem by difficulty
 */
Knapsack.get('/getBoard/:dif', function (req, res) {
    var dif = req.params.dif;
    var type = req.params.type;
    DButilsAzure.execQuery("SELECT * FROM KSInstance where difficult='"+dif+"'")
    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            res.send(result)


        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})

Knapsack.post('/createNewGame', function (req, res) {
    var userID = req.body.userID;
    var puzzleID = req.body.puzzleID;
    var type = req.body.type;
    var insertQuery = "insert into KSToUser (PuzzleID, UserID, GameType) values ('"+puzzleID+"','"+userID+"','"+type+"')";
    DButilsAzure.execQuery(insertQuery)
        .then(function (result) {
            res.send(result)

        })
        .catch(function (err) {
            console.log("here errorrrrr")
            res.send(err)
        })

})

Knapsack.get('/getGameID', function (req, res) {

    // var query = "select * from SudokuToUser";
        var query = "SELECT MAX(GameID) FROM KSToUser";
    DButilsAzure.execQuery(query)
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})

Knapsack.post('/insertMove', function (req, res) {//TODO MAYBE DELETEMOVE ASWELL

    var GameID = req.body.GameID;
    console.log(GameID);
    //TODO item ID?
    var itemID= 1;
    var itemWeight = req.body.itemWeight;
    var itemValue = req.body.itemValue;
    var query = "select *  from runningKS where gameID='"+GameID+"'";
    var stepID;
    var steptype = req.body.type;
    var time = req.body.time;//TODO CLIENT SEND 4 DIGITS OF TIME LEFT/ TIME PASSED?
    DButilsAzure.execQuery(query)
        .then(function (getResult) {
            console.log("successssssssssssssssssssssssssssssssssssss");
            // stepID = getResult.rowsAffected();
            // console.log(stepID);
            stepID = getResult.length+1;
            console.log(stepID);
            var postQuery = "insert into runningKS values ('"+GameID+"','"+ stepID+"','"+ steptype+"','"+time+"','"+itemID+"','"+itemWeight +"','"+itemValue +"')";
            console.log("starting second query");
            console.log(postQuery);
            DButilsAzure.execQuery(postQuery)
                .then(function (postQueryResult) {
                    res.send(postQueryResult)
                })
                .catch(function (postQueryResult) {
                    console.log(postQueryResult)
                    res.send(postQueryResult)
                })
        })
        .catch(function (getResultErrr) {
            console.log(getResultErrr)
            res.send(getResultErrr)
        })
})

Knapsack.get('/getUserID', function (req, res) {//TODO DUPLICATED CODE

    var query = "select max (userID) as maxid from users";
    DButilsAzure.execQuery(query)
    // (intrestName, userName, date, reviewDescription, rank) values ('"+interestName+"','"+username+"','"+fullDate+"','"+description+"','"+rank+"')";

    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            console.log(result)
            console.log(result)
            res.send(result)


        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })

})
Knapsack.post('/submitFinishQuestion', function (req, res) {

    var userID = req.body.userID;
    var gameID = req.body.gameID;
    var confident = req.body.confident;
    var difficulty = req.body.difficultyRank;
    var estimatePeopleDif = req.body.estimatePeopleDif;
    var heaviestItem = req.body.heaviestItem;
    var op1= req.body.op1;
    var op2= req.body.op2;
    var op3= req.body.op3;
    var op4= req.body.op4;
    var postQuery = "update KSToUser set difficultForOthers= '"+estimatePeopleDif+"', heaviestItem= '"+heaviestItem+"', confidentInAnswer= '"+confident+"', difficultForMe= '"+difficulty+"',op1='"+op1+"',op2='"+op2+"',op3='"+op3+"',op4='"+op4+"' where UserID= '"+userID+"' and GameID= '"+gameID+"'";
    // where gameID='"+GameID+"'";

    console.log(postQuery);
    DButilsAzure.execQuery(postQuery)
    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            res.send(result)

        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})