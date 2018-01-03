// [START import]
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
// [END import]

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/* exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Tracker App!");
    console.log("respuesta enviada correctamente");
}); */


// [START generateThumbnail]
/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 */
// [START generateThumbnailTrigger]
exports.generateThumbnail = functions.storage.object().onChange(event => {
    // [END generateThumbnailTrigger]
    // [START eventAttributes]
    const object = event.data; // The Storage object.

    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    // [END eventAttributes]

    console.log("bucket", fileBucket);
    console.log("File Path: ", filePath);
    console.log("dirName", path.dirname(filePath));
    console.log("basename", path.basename(filePath));

    console.log("Resource State: ", resourceState);



    // [START stopConditions]
    // Exit if this is triggered on a file that is not an image.

    if (path.dirname(filePath) !== "imagenes") {
        console.log("El storage event no ha sido generado en la carpeta imagenes");
        return null;
    }

    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }

    // Get the file name.
    const fileName = path.basename(filePath);
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith('thumb_')) {
        console.log('Already a Thumbnail.');
        return null;
    }

    // Exit if this is a move or deletion event.
    if (resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return null;
    }

    // Exit if file exists but is not new and is only being triggered
    // because of a metadata change.
    if (resourceState === 'exists' && metageneration > 1) {
        console.log('This is a metadata change event.');
        return null;
    }
    // [END stopConditions]

    console.log("Se superaron todas las condiciones de Stop");


    // [START thumbnailGeneration]
    // Download file from bucket.
    const bucket = gcs.bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = { contentType: contentType, customMetadata: { thumbnail: true } };
    return bucket.file(filePath).download({
        destination: tempFilePath
    }).then(() => {
        console.log('Image downloaded locally to', tempFilePath);
        // Generate a thumbnail using ImageMagick.
        return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
    }).then(() => {
        console.log('Thumbnail created at', tempFilePath);
        // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
        const thumbFileName = `thumb_${fileName}`;
        //const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
        const thumbFilePath = path.join("thumbnails", thumbFileName);
        // Uploading the thumbnail.



        return bucket.upload(tempFilePath, { destination: thumbFilePath, metadata: metadata });
        // return bucket.upload(tempFilePath, { destination: bucket.file(filePath), metadata: metadata });
        //Once the thumbnail has been uploaded delete the local file to free up disk space.
    }).then((file) => {

        console.log("File", file);

        fs.unlinkSync(tempFilePath);
        //borramos el archivo original
        //bucket.file(filePath).delete();


    });
    // [END thumbnailGeneration]
});
    // [END generateThumbnail]