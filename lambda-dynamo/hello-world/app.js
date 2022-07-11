var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

exports.lambdaHandler = async (event, context) => {

    var body;

    if (event.httpMethod === 'POST') {
        body = await createItem();
    } else if (event.httpMethod === 'GET') {
        body = await getItem();
    } else if (event.httpMethod === 'DELETE') {
        body = await deleteItem();
    }

    return {
        statusCode: 200,
        body: JSON.stringify(body),
    };
};

async function getItem() {
    var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

    var params = {
        TableName: 'PrimeiraTabela',
        Key: { 'id': "3" }
    };

    var body;

    try {
        const data = await docClient.get(params).promise();

        body = data.Item;
    } catch (err) {
        body = err;
    }

    return body;
}

async function createItem() {
    var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

    var params = {
        TableName: 'PrimeiraTabela',
        Item: {
            id: "3",
            name: "Jane Doe",
            categoria: 2
        }
    };

    var body;

    try {
        const data = await docClient.put(params).promise();

        body = data.Item;
    } catch (err) {
        body = err;
    }

    return body;
}

async function deleteItem() {
    var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

    var params = {
        TableName: 'PrimeiraTabela',
        Key: { 'id': "3" }
    };

    var body;

    try {
        const data = await docClient.delete(params).promise();

        body = data.Item;
    } catch (err) {
        body = err;
    }

    return body;
}