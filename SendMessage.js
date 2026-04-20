import xapi from 'xapi';
import {getValidAccessToken} from './OAuthRefreshToken';

async function sendMessage() {
  const token = await getValidAccessToken();

  let email = "email@address.com" //your webex email address
  let msg = "Successfully sent message using OAuth token: " + token
  let finalMsg = JSON.stringify({
    "toPersonEmail": email,
    "text": msg
  })

  let url = 'https://webexapis.com/v1/messages'
  let header = [
    `Authorization: Bearer ${token}`,
    'Content-Type: application/json'
  ]

  xapi.Command.HttpClient.Post({
      AllowInsecureHTTPS: "True",
      Header: header,
      ResultBody: "PlainText",
      Url: url
    },
    finalMsg);
}

sendMessage()
