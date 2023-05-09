const {google} = require('googleapis');
const path = require("path");
const fs = require("fs");
const { clear } = require('console');

const CLIENT_ID = "1084092667034-hnn19p6a4ctogur5uog6tojkhfq8aapf.apps.googleusercontent.com ";
const CLIENT_SECRET = "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 ";
const REDIRECT_URL = "https://developers.google.com/oauthplayground ";

const REFRESH_TOKEN = "1//04-61NYJPbBD4CgYIARAAGAQSNwF-L9IraT__OBx2H8HKdy23Ak0KavQ2COUx4Thu7qymJrewlzK_r-rhPEyldLBD06KNIeG-pzg ";
const ouath2client = new google.auth.OAuth2(
   CLIENT_ID,
   CLIENT_SECRET, 
   REDIRECT_URL
);

ouath2client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: ouath2client
})

const filepath = path.join(__dirname, "poster.png")

//uploading file to google drive//

async function uploadFile() {
    try{
         const response = await drive.files.create({
            requestBody: {
                name: "poster.png",
                mimeType:"image/png"
            },
            media:{
                mimeType:"image/png",
                body: fs.createReadStream(filepath)
            },
         });

         console.log(response.data);
        }catch(error){
         console.log(error.message);
    }

}
uploadFile();

// to delete the uploaded file//
//async function deleteFile(){
  //  try{
     //   const response = await drive.files.delete({
          //  fileId: " "

      //  });
      //  console.log(response.data, response.status);
 //   }catch(error){
      //  console.log(error.message)
  //  }

//}

//deleteFile();//


// generating a url//
//async function generatePublicUrl(){
   // try{
     //   const fileId = " ";
    //    await drive.permissions.create({
     //       fileId: fileId,
     //       requestbody:{
     //           role:"reader",
     //           type: "anyone"
     //       }

     //   })
 //   const result = await drive.files.get({
 //       fileId: fileId,
 //       fields: 'webViewLink, webContent'

 //   });
 //   console.log(result.data);
 //   }catch(error){
 //       console.log(error.message)
 //   }
//}

//generatePublicUrl();//

