# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
    "username": "arisandi",
    "password": "pass",
    "name": "Arisandi Yudiarta"
}
```

Response Body Success :

```json
{
    "username": {
        "username": "arisandi",
        "name": "Arisandi Yudiarta"
    }
}
```

Response Body Error:

```json
{
    "errors": "Username already taken"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "arisandi",
    "password": "pass"
}
```

Response Body Success :

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error :

```json
{
    "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

-   Authorization : token

Request Body :

```json
{
    "name": "Arisandi Yudiarta Updated", //optional
    "password": "new password" //optional
}
```

Response Body Success :

```json
{
    "data": {
        "username": "arisandi",
        "name": "Arisandi Yudiarta Updated"
    }
}
```

Response Body Error :

```json
{
    "errors": "Name Length Max 100!"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

-   Authorization : token

Response Body Success:

```json
{
    "data": {
        "username": "arisandi",
        "name": "Arisandi Yudiarta"
    }
}
```

Response Body Error :

```json
{
    "error": "Unauthorized Access"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

-   Authorization : token

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :

```json
{
    "errors": "Unauthourized Access"
}
```
