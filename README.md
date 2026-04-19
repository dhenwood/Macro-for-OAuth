# Macro for OAuth
## Background
These macros are for a Cisco video device that provides a means of utilizing OAuth tokens for authentication purposes to any service that leverages OAuth.

> NOTE: Because the clientID and clientSecret are stored in a macro on the device, precautions need to be made.
> Any person who has read-only access to the video device or Control Hub, will be able to view the clientId and clientSecret.
> As such, you can look to leverage a centralised service where these values are protected. Alternatively ensure the OAuth scopes are limited as not to cause any problems if compromised.

The macro's are broken into 3 seperate files:
1. SendMessage.js - this file contains the standard API call to the required service (in the example it is a Webex message)
2. OAuthRefreshToken.js - this file manages the existing tokens and if needed will refresh the tokens
3. OAuthSavedTokens.js - this file stores the current access_token, refresh_token along with the corresponding expiry value

## Setup
The creation of the clientId and clientSecret will vary based on the service for which you want to integrate to - I will use a Webex Service App as an example. The steps to creating this can be found here: https://developer.webex.com/create/docs/service-apps. For the purposes of this example (sending a Webex message), you only need to enable the "spark:messages_write" scope. By creating a Webex Service App, it will generate the following. _Ensure you save each of these as these will be used in the macro_.
1. clientId
2. clientSecret
3. access_token
4. refresh_token

Upload the three macro files (.js) from this repo to your video device. Ensure they are saved locally but at this stage do not enable them.

In the OAuthRefreshToken macro, update the clientId and clientSecret to the values you obtained earlier. If you are obtaining a token from a service other than Webex, update the OBTAIN_ACCESS_TOKEN_URL value to point to the required service's URL.

In the OAuthSavedTokens macro, update the refeshToken value (the other values will get updated when we first run it) to the value you obtained earlier.

In the SendMessage macro, update the email value to your Webex address. Now enable _only_ the SendMessage macro (the other two do not need to be enabled). You should receive a Webex message from the Service App account.

If you exit the Macro Editor page (top left) and then return - opening the OAuthSavedTokens macro should now have a new access_token, refresh_token, token_expires_at and refresh_expires_at value.
