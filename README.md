# Macro for OAuth
These macros are for a Cisco video device that provides a means of utilizing OAuth tokens for authentication purposes to any service that leverages OAuth.

> NOTE: Because the clientID and clientSecret are stored in a macro on the device, precautions need to be made.
> Any person who has read-only access to the video device or read-only access to Control Hub, will be able to view the clientId and clientSecret.
> As such, you can look to leverage a centralised service where these values or protected or ensure the OAuth scopes are limited as not to cause any problems if compromised.

The macro's are broken into 3 seperate files:
1. Send Message - this file contains the standard API call to the required service (in the example it is a Webex message)
2. OAuthRefreshToken - this file manages the existing tokens and if needed will refresh the tokens
3. OAuthSavedToken - this file stores the current access_token, refresh_token along with the corresponding expiry value
