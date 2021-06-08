#!/usr/bin/env node

const aws = require('aws-sdk');
const dash = require('dashargs');
const path = require('path');
const joinURL = require('url-join');
const { readFile } = require('fs');

const args = dash.argv();

const { key, secret, file, bucket, region } = args;

if (!key) return console.log('Please provide your access key | -key key');

if (!bucket)
    return console.log('Please provide a bucket | -bucket bucket-name');

if (!secret)
    return console.log('Please provide your access secret | -secret secret');

if (!region)
    return console.log('Please provide your region | -region us-east-1');

if (!file) return console.log('Please provide a file path');

const fileName = path.basename(file);

readFile(path.resolve(file), {}, (error, data) => {
    if (error)
        return console.log('There was a error reading your file\n' + error);

    const client = new aws.S3({
        accessKeyId: key,
        secretAccessKey: secret,
        endpoint: new aws.Endpoint(
            joinURL('https://', region + '.linodeobjects.com'),
        ),
    });

    console.log('Uploading...');

    client
        .putObject({
            Bucket: bucket,
            Key: fileName,
            Body: data,
        })
        .promise()
        .then(() => console.log('Uploaded'))
        .catch(
            (e) => (console.error('Error in uploading\n' + e), process.exit(1)),
        );
});
