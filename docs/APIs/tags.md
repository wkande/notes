## What are Tags?

**Tags** are embedded in notes to aid in searching. A note can have one or many tags. Tags are stored in the note as a string of words.

```json
{
  "id": "-UB_Ja5Qq",
  "email": "me@mydomain",
  "content": "Saturday go to the bank and get some cash.",
  "tags": "cash Saturday",
  "ddtm": "2020-10-17T13:52:22.027Z"
}
```

<!--------------------------------------
GET USER'S TAGS
--------------------------------------->

---

## Get user's Tags

Gets a list of unique **Tags** used within a user's notes. The email address in the JWT token is used to identify the user.

<span class="method get">GET</span> /tags

---

**Parameters**

| Name           | Type    | In     | Description |
| :---           | :---    | :---   | :--- |
| Accept         | string  | header | application/json or application/xml |
| Authorization  | string  | header | ^ Bearer JWT-token |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X GET https://docs-as-code.herokuapp.com/tags | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Authorization": "Bearer 1234FRTG67",
              "Accept":"application/json"}
};

const resp = await axios.get("https://docs-as-code.herokuapp.com/tags", options)
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
  "tags": [
      "Monday",
      "Cash",
      "Node.js",
      "Doc",
      "Triumph"
  ]
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<tags>
    <value>Monday</value>
    <value>Cash</value>
    <value>Triumph</value>
    <value>Doc</value>
    <value>Triumph</value>
</tags>
```

<!-- tabs:end -->

<!--------------------------------------
UPDATE A TAG
--------------------------------------->

---

## Update a Tag

Updates a particular **Tag** within all notes of the current user. Useful to correct misspelled tags. The old tag is passed in the path and the new tag spelling is passed in the body. The email address in the JWT token is used to identify the user.

<span class="method put">PUT</span> /tag/:tag

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Content-Type | string  | header | ^ application/x-www-form-urlencoded |
| Accept       | string  | header | application/json or application/xml |
| Authorization  | string  | header | ^ Bearer JWT-token |
| tag           | string  | path   | ^ new spelling of the tag |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -d "tag=Saturday" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X PUT https://docs-as-code.herokuapp.com/tag/sartuday | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer 1234FRTG67",}
};

const resp = await axios.put("https://docs-as-code.herokuapp.com/tag/sartuday", 
  {"tag":"Saturday"}, options)
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
- 403 Forbidden
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "tag_old":"sartuday",
  "tag_new":"Saturday"
}
```

##### **XML**

```xml
none
```

<!-- tabs:end -->

<!--------------------------------------
DELETE A TAG
--------------------------------------->

---

## Delete a Tag

Deletes a particular **Tag** from all notes of the current user. The email address in the JWT token is used to identify the user.

<span class="method delete">DELETE</span> /tag/:tag

---

**Parameters**

| Name          | Type    | In     | Description |
| :---          | :---    | :---   | :--- |
| Accept        | string  | header | application/json or application/xml |
| Authorization | string  | header | ^ Bearer JWT-token |
| tag           | string  | path   | ^ a tag used in user's notes |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X DELETE https://docs-as-code.herokuapp.com/tag/tuesday | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json",
              "Authorization": "Bearer 1234FRTG67",}
};

const resp = await axios.delete("https://docs-as-code.herokuapp.com/tag/tuesday", options)
console.log(resp.data);
```
<!-- tabs:end -->

### Response

<!-- tabs:start -->

##### **Status**

```text
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
none
```

##### **XML**

```xml
none
```

<!-- tabs:end -->
