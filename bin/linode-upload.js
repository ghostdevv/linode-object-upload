#!/usr/bin/env node

require('dotenv').config();
const aws = require('aws-sdk');
const dash = require('dashargs');
const path = require('path');
const { readFile } = require('fs');

const args = dash.argv();
const str = dash.strip(args.string);

const { bucket, key, secret, endpoint } = args;
const file = str.split(' ')[str.split(' ').length - 1];

if (!bucket) return console.log('Please provide a bucket | -bucket bucket-name');
if (!key) return console.log('Please provide your access key | -key key');
if (!secret) return console.log('Please provide your access secret | -secret secret');
if (!endpoint) return console.log('Please provide your endpoint | -endpoint https://us-east-1.linodeobjects.com');
if (!file) return console.log('Please provide a file path');

const key = path.basename(file);

readFile(path.join(process.cwd(), file), {}, (error, data) => {
    if (error) return console.log('There was a error reading your file\n' + error);

    const client = new aws.S3({
        accessKeyId: process.env.ACCESS_ID,
        secretAccessKey: process.env.ACCESS_SECRET,
        endpoint: new aws.Endpoint(process.env.ENDPOINT),
    });

    console.log('Uploading...');
    
    client.putObject({
        Bucket: bucket,
        Key: key,
        Body: data
    })
    .promise()
    .then(() => console.log('Uploaded'))
    .catch(e => console.error('Error in uploading\n' + e));
});