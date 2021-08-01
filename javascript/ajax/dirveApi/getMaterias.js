//**///**//** */ */ */
module.exports = function files(id){
  const fs = require("fs");
  const readline = require("readline");
  const { google } = require("googleapis");
  




  //var idFolder =  '1UTapDMpbXqAHS6F0RN7Yrh4u3g4voRui';
  ///////////////
  var folderId = "";
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = "token1.json";
  
  // Load client secrets from a local file.
  fs.readFile("credentials3.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles());
  });
  
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    // console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  
  /**
   * Lists the names and IDs of up to 10 files.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  var cursos = [];
  
  function listFiles(auth) {
    const drive = google.drive({ version: "v3", auth });
    drive.files.list(
      {
        parents: "1Ru-Mfghj-XPV3pfZ0OnNqrg0HJl8Kdb1",
        fields: "nextPageToken, files(id, name)",
        q: "'"+id + "' in parents",
        folderId: folderId,
        orderBy: "name",
      },
      (err, res) => {
        var cursoDatos;
        var orientacion = "";
        if (err) return console.log("The API returned an error: " + err);
        const files = res.data.files;
        if (files.length) {
          console.log("Files:");
          files.map((file) => {
            console.log(`${file.file} (${file.id})`);
            cursoDatos = file.name.toString().split(" ");
            // console.log(`otros file: ${cursoDatos}`);
            if (cursoDatos[1] != "EESN°62")
              orientacion = cursoDatos[1].slice(0, 3);
            cursos.push({
              id: file.id,
              curso: cursoDatos[0],
              orientacion: orientacion,
            });
          });
          console.log("curso prueba" + cursos[0].curso);
          return resultados;
        } else {
          console.log("No files found.");
        }
      }
    );
    return resultados;
  }
  console.log(`|||||||||| CURSO ${cursos.curso} (${cursos.orientacion})`);
  cursos.map((curso) => {
    console.log(`|||||||||| asdfasdf ${curso.curso} (${curso.id})`);
  });
  return listFiles();
}
//module.exports.cursos = cursos;
// console.log("Resultado::::> " + listFiles());