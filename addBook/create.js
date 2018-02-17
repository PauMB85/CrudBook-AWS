'use strict';

var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
AWS.config.update({region: process.env.REGION});
var docClient = null;

exports.putAItem = (event, context, callback) => {

    console.log('Receive event: ', JSON.stringify(event, null, 2));
    console.log('Context: ', JSON.stringify(context, null, 2));

    if(!docClient) {
        docClient = new AWS.DynamoDB.DocumentClient();
    }

    var body = JSON.parse(event.body);

    body["id"] = uuidv4();

    console.log('The request\'s body', event.body);

    var params = {
        TableName : process.env.TABLE_NAME,
        Item: body
    };

    console.log('The params is: ', params);

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("data: " + JSON.stringify(data));
            const response = {
                'statusCode': 200
            };
            console.log("response: " + JSON.stringify(response));
            callback(null,response);
        }
    });
};