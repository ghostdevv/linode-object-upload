# Linode Object Storage Upload
A cli tool to upload a file to linode object storage

# Installation
```bash
npm i -g linode-upload
```

# Usage
The cli is all done via a single command.
```bash
linode-upload <file> <bucket> <region> -key key -secret secret
```

Options (all are required)<br>
`bucket` this is the bucket to put the object in to<br>
`key` this is the access key<br>
`secret` this is the access secret<br>
`region` this is the linode region, for example `eu-central-1`

# Tips
- ### Find Region
    1) Go to your [object storage manager](https://cloud.linode.com/object-storage/buckets)
    2) Under the bucket you are using it will look something like `bucket.eu-central-1.linodeobjects.com`. The bit after your bucket name and before linodeobjects.com is your region