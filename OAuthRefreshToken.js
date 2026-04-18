import xapi from 'xapi';

const CLIENT_ID = '<removed>';
const CLIENT_SECRET = '<removed>';
const SAVED_TOKEN_FILE = "OAuthSavedTokens"

async function getStoredTokens() {
  var macro = ''
  try {
    macro = await xapi.Command.Macros.Macro.Get({
      Name: SAVED_TOKEN_FILE,
      Content: 'True'
    })
  } catch (error) {
    return error
  }
  let raw = macro.Macro[0].Content.replace(/var.*memory.*=\s*{/g, '{')
  let data = JSON.parse(raw)
  return data
}

async function saveTokens(tokens) {
  let newStore = JSON.stringify(tokens, null, 4);
  xapi.Command.Macros.Macro.Save({
    Name: SAVED_TOKEN_FILE
  }, `var memory = ${newStore}`)
}

async function refreshAccessToken(refreshToken) {
  const url = "https://webexapis.com/v1/access_token"
  const header = "Content-type: application/x-www-form-urlencoded"
  const body = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

  try {
    const response = await xapi.Command.HttpClient.Post({
        AllowInsecureHTTPS: "True",
        Header: header,
        ResultBody: "PlainText",
        Url: url
      },
      body);

    let responseBody = response.Body
    let data = JSON.parse(responseBody)

    if (!data.access_token) {
      throw new Error('Invalid refresh response');
    }

    const now = Date.now();

    const tokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: now + (data.expires_in * 1000),
      refresh_expires_at: now + (data.refresh_token_expires_in * 1000)
    };

    await saveTokens(tokens);

    console.log('Token refreshed successfully');
    return tokens;

  } catch (err) {
    console.error('Refresh failed:', err);
    return null;
  }
}

async function getValidAccessToken() {
  const tokens = await getStoredTokens();

  if (!tokens) {
    throw new Error('No tokens stored');
  } else {
    console.log("gotTokens: " + tokens)
  }

  const now = Date.now();
  // Refresh 1 min before expiry
  if (now > tokens.expires_at - 60000) {
    console.log('Access token expired or about to expire, refreshing...');
    const newTokens = await refreshAccessToken(tokens.refresh_token);
    return newTokens.access_token;
  }
  console.log("current token valid")
  return tokens.access_token;
}

export{getValidAccessToken}
