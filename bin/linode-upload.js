#!/usr/bin/env node

require('dotenv').config();
const aws = require('aws-sdk');
const dash = require('dashargs');
const path = require('path');
const joinURL = require('url-join');
const { readFile } = require('fs');

const args = dash.argv();

const { key, secret } = args;
const file = process.argv[2];
const bucket = process.argv[3];
const region = process.argv[4];

if (!bucket) return console.log('Please provide a bucket | -bucket bucket-name');
if (!key) return console.log('Please provide your access key | -key key');
if (!secret) return console.log('Please provide your access secret | -secret secret');
if (!region) return console.log('Please provide your region | -region us-east-1');
if (!file) return console.log('Please provide a file path');

const fileName = path.basename(file);

readFile(path.resolve(file), {}, (error, data) => {
    if (error) return console.log('There was a error reading your file\n' + error);

    const client = new aws.S3({
        accessKeyId: key,
        secretAccessKey: secret ,
        endpoint: new aws.Endpoint(joinURL(
            'https://',
            region + '.linodeobjects.com'
        )),
    });

    console.log('Uploading...');
    
    client.putObject({
        Bucket: bucket,
        Key: fileName,
        Body: data
    })
    .promise()
    .then(() => console.log('Uploaded'))
    .catch(e => console.error('Error in uploading\n' + e));
});