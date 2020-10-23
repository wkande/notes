## What are Notes?

**Notes** have a simple structure focusing on content and tags. Each note belongs to one email address and has a unique id for DML actions.

```json
{
  "id": "-UB_Ja5Qq",
  "email": "me@mydomain",
  "content": "Sent a new token.",
  "tags": "token Saturday",
  "ddtm": "2020-10-17T13:52:22.027Z"
}
```

<!--------------------------------------
GET USER'S NOTES
--------------------------------------->

---

## Get user's Notes

Gets a list of all notes associated with a user's email address. The email address in the JWT token is used to identify the user.

There is an optional search to filter the notes by content and tags. Optional pagination using skip and limit will determine the number of notes returned.

- **/notes** (all notes)
- **/notes?skip=0&limit=25** (first 25 notes, 1-25)
- **/notes?skip=25&limit=25** (notes 26-50)
- **/notes?content=Madison** (notes with Madison in the content)
- **/notes?tags=Saturday%20Tuesday** (notes with Saturday or Tuesday in the tags)
- **/notes?content=Madison&skip=0&limit=25** (first 25 notes with Madison in the content)

<span class="method get">GET</span> /notes

---

**Parameters**

| Name           | Type    | In     | Description |
| :---           | :---    | :---   | :--- |
| Accept         | string  | header | application/json or application/xml |
| Authorization  | string  | header | ^ Bearer JWT-token |
| content        | string  | query  | text to search note content by |
| tags           | string  | query  | text to search note tags by |
| skip           | integer | query  | starting number of a limited set of rows |
| limit          | integer | query  | max number of rows |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -d "email=me@mydomain.com" \
-H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X GET https://docs-as-code.herokuapp.com/notes?skip=0&limit=25 | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Authorization": "Bearer 1234FRTG67",
              "Accept":"application/json"}
};

const resp = await axios.get("https://docs-as-code.herokuapp.com/notes?skip=0&limit=25", options)
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
[
  {
    "id": "-UB_Ja5Qq",
    "email": "me@mydomain.com",
    "content": "Sent a new token.",
    "tags": "Monday",
    "dttm": "2020-10-17T13:52:22.027Z"
  },
  {
    "id": "AU7_Ja5Us",
    "email": "me@mydomain.com",
    "content": "My first note.",
    "tags": "Monday",
    "dttm": "2020-10-16T11:12:11.047Z"
  }
]

```

##### **XML**

```xml
<?xml version='1.0'?>
<notes>
  <note>
    <id>-UB_Ja5Qq</id>
    <email>me@mydomain.com</email>
    <content>Sent a new token.</content>
    <tags>Monday</tags>
    <dttm>2020-10-17T13:52:22.027Z</dttm>
  </note>
  <note>
    <id>-AU7_Ja5Us</id>
    <email>me@mydomain.com</email>
    <content>My first note.</content>
    <tags>Monday</tags>
    <dttm>2020-10-16T11:12:11.047Z</dttm>
  </note>
</notes>
```

<!-- tabs:end -->

<!--------------------------------------
GET A NOTE
--------------------------------------->

---

## Get a Note

Gets a single note. A note identified by the note's id must belong to the user. The email address in the JWT token is used to identify the user.

<span class="method get">GET</span> /note/:id

---

**Parameters**

| Name          | Type    | In      | Description |
| :---          | :---    | :---    | :--- |
| Accept        | string  | header  | application/json or application/xml |
| Authorization | string  | header  | ^ Bearer JWT-token |
| id            | string  | path    | id of the note |

^ required

---

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
-H "Accept: application/json" \
-H "Authorization: Bearer 1234FRTG67" \
curl -X GET "https://docs-as-code.herokuapp.com/note/X-CKYqQcj" \
| json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Authorization": "Bearer 1234FRTG67", 
              "Accept":"application/json"}
};

const resp = await axios.get("https://docs-as-code.herokuapp.com/note/X-CKYqQcj", {}, options)
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
  "id": "X-CKYqQcj",
  "email": "me@mydomain.com",
  "content": "Sent a new token.",
  "tags": "Monday",
  "dttm": "2020-10-17T13:52:22.027Z"
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<note>
  <id>X-CKYqQcj</id>
  <email>me@mydomain.com</email>
  <content>Sent a new token.</content>
  <tags>Monday</tags>
  <dttm>2020-10-17T13:52:22.027Z</dttm>
</note>
```

<!-- tabs:end -->

<!--------------------------------------
CREATE A NOTE
--------------------------------------->

---

## Create a Note

Creates a new **Note** using the email address in the JWT token passed in the header.

<span class="method post">POST</span> /note

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Content-Type | string  | header | ^ application/x-www-form-urlencoded |
| Accept       | string  | header | application/json or application/xml |
| Authorization  | string  | header | ^ Bearer JWT-token |
| content      | string  | body   | ^ text, the note itself |
| tags         | string  | body   | one or many words |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -d "content=Now is the time to get to the store.&tags=saturday monday" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X POST https://docs-as-code.herokuapp.com/note | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer 1234FRTG67"}
};

const resp = await axios.post("https://docs-as-code.herokuapp.com/note", 
  {"content":"Now is the time to get to the store.", "tags":"saturday monday"}, options)
console.log(resp.data);
```
<!-- tabs:end -->

### Response

<!-- tabs:start -->

##### **Status**

```text
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "id": "X-CKYqQcj",
  "email": "me@mydomain.com",
  "content": "Now is the time to get to the store.",
  "tags": "saturday monday",
  "dttm": "2020-10-17T13:52:22.027Z"
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<note>
  <id>X-CKYqQcj</id>
  <email>me@mydomain.com</email>
  <content>Now is the time to get to the store.</content>
  <tags>saturday monday</tags>
  <dttm>2020-10-17T13:52:22.027Z</dttm>
</note>
```

<!-- tabs:end -->

<!--------------------------------------
UPDATE A NOTE
--------------------------------------->

---

## Update a Note

Updates the content and/or the tags of a **Note** using the note's id and the email address. The email address in the JWT token is used to identify the user.

<span class="method put">PUT</span> /note/:id

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Content-Type | string  | header | ^ application/x-www-form-urlencoded |
| Accept       | string  | header | application/json or application/xml |
| Authorization  | string  | header | ^ Bearer JWT-token |
| id           | string  | path   | ^ id of the note |
| content      | string  | body   | ^ text, the note itself |
| tags         | string  | body   | one or many words |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -d "content=Check on loan with the bank.&tags=tuesday thursday" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67"
-X PUT https://docs-as-code.herokuapp.com/note/X-CKYqQcj | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json", 
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer 1234FRTG67"}
};

const resp = await axios.put("https://docs-as-code.herokuapp.com/note/X-CKYqQcj", 
  {"content":"Check on loan with the bank.", "tags":"tuesday thursday"}, options)
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
  "id": "4jGJC6WBR",
  "email": "me@mydomain.com",
  "content": "This is an updated note.",
  "tags": "Monday Tuesday",
  "dttm": "2020-10-22T12:14:33.914Z"
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<note>
  <id>4jGJC6WBR</id>
  <email>warren@wyosoft.com</email>
  <content>This is an updated note.</content>
  <tags>Monday Tuesday</tags>
  <dttm>Thu Oct 22 2020 06:15:42 GMT-0600 (Mountain Daylight Time)</dttm>
</note>
```

<!-- tabs:end -->

---

<!--------------------------------------
DELETE A NOTE
--------------------------------------->

## Delete a Note

Deletes a **Note** using the note's id and the email address. The email address in the JWT token is used to identify the user.

<span class="method delete">DELETE</span> /note/:id

---

**Parameters**

| Name          | Type    | In     | Description |
| :---          | :---    | :---   | :--- |
| Accept        | string  | header | application/json or application/xml |
| Authorization | string  | header | ^ Bearer JWT-token |
| id            | string  | path   | ^ id of the note |

^ required

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X DELETE https://docs-as-code.herokuapp.com/note/X-CKYqQcj | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json",
              "Authorization": "Bearer 1234FRTG67"}
};

const resp = await axios.delete("https://docs-as-code.herokuapp.com/note/X-CKYqQcj", options)
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

<!--------------------------------------
DELETE USER'S NOTEs
--------------------------------------->

---

## Delete user's Notes

Deletes all **Note** of a particular user. The email address in the JWT token is used to identify the user.

<span class="method delete">DELETE</span> /notes

---

**Parameters**

| Name          | Type    | In     | Description |
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
-X DELETE https://docs-as-code.herokuapp.com/notes | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json",
              "Authorization": "Bearer 1234FRTG67"}
};

const resp = await axios.delete("https://docs-as-code.herokuapp.com/notes", options)
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
