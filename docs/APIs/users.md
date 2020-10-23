## What are Users?

In **Notes** a user is synonymous with an email address. Nothing more is known about the user. Users must authenticate with their email address using the [Email-Code-Token](APIs/overview.md) mechanism.

<!--------------------------------------
CREATE A CODE
--------------------------------------->

---

## Create a Code

Collect the user's email address and send it to the [POST /user/code](#Get-A-Token) endpoint. A six digit code will be sent to the user's email account.  The code should then be sent to [GET /user/token** to receive a JWT token to use with other endpoints.

Most email gateways will accept an email address and enter it into a queue to be delivered in the future. This does not guarantee delivery. This endpoint will return a status=201 once the gateway "accepts" the email address for delivery, though it might fail in the future.

<span class="method post">POST</span> /user/code

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Content-Type | string  | header | ^ application/x-www-form-urlencoded |
| Accept       | string  | header | application/json or application/xml |
| email        | string  | body   | ^ user's email address |

^ required



### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -d "email=me@mydomain.com" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Accept:application/json" \
-X POST https://docs-as-code.herokuapp.com/user/code | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
};

const resp = await axios.post("https://docs-as-code.herokuapp.com/user/code", {"email":"me@mydomain.com"}, options)
console.log(resp.data);
```
<!-- tabs:end -->



### Response

<!-- tabs:start -->

##### **Status**

```text
- 201 Created
- 400 Bad Request
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "user": {
    "email": "me@mydomain.com",
    "message": "A code was sent to the email address."
  }
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<user>
  <email>warren@wyosoft.com</email>
  <message>A code was sent to the email address.</message>
</user>
```

<!-- tabs:end -->

<!--------------------------------------
GET A TOKEN
--------------------------------------->

---

## Get a Token

Send the code received from [POST /user/code](#Create-A-Code) to **GET /user/token**. The JWT token returned by GET /user/token is used to access other endpoints.

<span class="method get">GET</span> /user/token

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Accept       | string  | header | application/json or application/xml |
| email        | string  | query  | ^ user's email address |
| code         | string  | query  | ^ code sent to the user's email address |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -X GET "https://docs-as-code.herokuapp.com/user/token?email=me@mydomain.com&code=123456" | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json"}
};

const resp = await axios.get(
  "https://docs-as-code.herokuapp.com/user/token?email=me@mydomain.com&code=123456", 
  options
)
console.log(resp.data);
```

<!-- tabs:end -->

### Response

<!-- tabs:start -->
##### **Status**

```text
- 200 OK
- 400 Bad Request
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<token>eyJhbGciOiJIUzI1NiJ9...</token>
```

<!-- tabs:end -->

<!--------------------------------------
GET CURRENT USER
--------------------------------------->

---

## Get current User

Gets information about the current user. The email address in the JWT token is used to identify the user.

<span class="method get">GET</span> /user

---

**Parameters**

| Name          | Type    | In      | Description |
| :---          | :---    | :---    | :--- |
| Accept        | string  | header  | application/json or application/xml |
| Authorization | string  | header  | ^ Bearer JWT-token |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
-H "Accept: application/json" \
-H "Authorization: Bearer 1234FRTG67" \
curl -X GET "https://docs-as-code.herokuapp.com/user" \
| json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Authorization": "Bearer 1234FRTG67", "Accept":"application/json"}
};

const resp = await axios.get("https://docs-as-code.herokuapp.com/user", {}, options)
console.log(resp.data);
```

<!-- tabs:end -->

### Response

<!-- tabs:start -->
##### **Status**

```text
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "user": {
    "email": "me@mydoman.com",
    "notes_cnt": 55
  }
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<user>
  <email>me@mydomain.com</email>
  <notes_cnt>55</notes_cnt>
</user>
```

<!-- tabs:end -->
