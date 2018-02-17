'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});
var docClient = null;

exports.deleteAItem = (event, context, callback) => {

    console.log('Receive event: ', JSON.stringify(event, null, 2));
    console.log('Context: ', JSON.stringify(context, null, 2));

    if(!docClient) {
        console.log('init dynamoClient')
        docClient = new AWS.DynamoDB.DocumentClient();
    }

    const idBook = event.pathParameters.id;

    var params = {
        TableName : process.env.TABLE_NAME,
        Key: {
            id: idBook
        }
    };

    console.log(params);
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("data: " + JSON.stringify(data));
            const item = JSON.stringify(data.Item);
            console.log("item: " + item);
            const response = {
                'statusCode': 200
            };

            console.log("response: " + JSON.stringify(response));
            callback(null,response);
        }
    });
};