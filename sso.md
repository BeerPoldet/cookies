# MessageSpring Single Sign On Documentation

## Before you start

You will need to have `api_key` from MessageSpring team. This `api_key` must be kept securely secret in the backend. An `api_key` is associated to a place. This means, an `api_key` is used to sign on users from the same place.

## 1. Getting User One Time Token

Making HTTP request to get one time token. This must be request from backend where the environment is better secure than the frontend.

##### HTTP URL: 
```
https://open-api.ifyoucan.com/v1/api/teams/member/token
```
##### Request Method: 
```
POST
```
  
##### Request Headers: 
```
'Content-Type': "application/json"
```

##### Request Body: `(application/json)`
```
{
  "email": "{email}",
  "apiKey": "{api_key}"
}
```

##### Request Body Example:
```
{
  "email": "email@email.com",
  "apiKey": "ABC.lerumipsum"
}
```

##### Response Body: (JSON)

Code: **200** (Success)
```
{
  "hash": "{one_time_token}"
}
```

Code: **401** (Error)
```
{
  "status": 401,
  "details": {
    "code": 401,
    "message": "The user credentials were incorrect"
  }
}
```

## 2. Redirect to MessageSpring

In the case of successfully getting the one time token, redirect the web page to:
```
https://notifyme-qa.ifyoucan.com/sso?token={one_time_token}
```

Where you substitute `{one_time_token}` with the token received from the #1. MessageSpring will automatially sign the user on.
