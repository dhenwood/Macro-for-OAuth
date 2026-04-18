# Macro for OAuth
This macro for a Cisco video device provides a means of utilizing OAuth tokens for authentication purposes to any service that leverages OAuth.

> NOTE: Because the clientID and clientSecret are stored in a macro on the device, precautions need to be made.
> Any person who has read-only access to the video device or even read-only access to Control Hub, will be able to view the clientId and clientSecret.
> As such, ensure the OAuth scopes are limited if there is any concern over these attributes being accessed by unknown people.

