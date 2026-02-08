# MySQL

> The SQL cheat sheet provides you with the most commonly used SQL statements for your reference.

Category: Database

## Getting Started

### Connect MySQL

```
mysql -u <user> -p

mysql [db_name]

mysql -h <host> -P <port> -u <user> -p [db_name]

mysql -h <host> -u <user> -p [db_name]

```

### Commons

#### Database

| - | - |
| --- | --- |
| `CREATE DATABASE` db `;` | Create database |
| `SHOW DATABASES;` | List databases |
| `USE` db `;` | Switch to db |
| `CONNECT` db `;` | Switch to db |
| `DROP DATABASE` db `;` | Delete db |

#### Table

| - | - |
| --- | --- |
| `SHOW TABLES;` | List tables for current db |
| `SHOW FIELDS FROM` t `;` | List fields for a table |
| `DESC` t `;` | Show table structure |
| `SHOW CREATE TABLE` t `;` | Show create table sql |
| `TRUNCATE TABLE` t `;` | Remove all data in a table |
| `DROP TABLE` t `;` | Delete table |

#### Process

| - | - |
| --- | --- |
| `show processlist;` | List processes |
| `kill` pid `;` | kill process |

#### Other

| - | - |
| --- | --- |
| `exit` or `\q` | Exit MySQL session |

### Backups

Create a backup

```sql
mysqldump -u user -p db_name > db.sql

```

Export db without schema

```{.wrap}
mysqldump -u user -p db_name --no-data=true --add-drop-table=false > db.sql

```

Restore a backup

```
mysql -u user -p db_name < db.sql

```

## MySQL Examples

### Managing tables

Create a new table with three columns

```sql
CREATE TABLE t (
     id    INT,
     name  VARCHAR DEFAULT NOT NULL,
     price INT DEFAULT 0
     PRIMARY KEY(id)
);

```

Delete the table from the database

```sql
DROP TABLE t ;

```

Add a new column to the table

```sql
ALTER TABLE t ADD column;

```

Drop column c from the table

```sql
ALTER TABLE t DROP COLUMN c ;

```

Add a constraint

```sql
ALTER TABLE t ADD constraint;

```

Drop a constraint

```sql
ALTER TABLE t DROP constraint;

```

Rename a table from t1 to t2

```sql
ALTER TABLE t1 RENAME TO t2;

```

Rename column c1 to c2

```sql
ALTER TABLE t1 RENAME c1 TO c2 ;

```

Remove all data in a table

```sql
TRUNCATE TABLE t;

```

### Querying data from a table

Query data in columns c1, c2 from a table

```sql
SELECT c1, c2 FROM t

```

Query all rows and columns from a table

```sql
SELECT * FROM t

```

Query data and filter rows with a condition

```sql
SELECT c1, c2 FROM t
WHERE condition

```

Query distinct rows from a table

```sql
SELECT DISTINCT c1 FROM t
WHERE condition

```

Sort the result set in ascending or descending order

```sql
SELECT c1, c2 FROM t
ORDER BY c1 ASC [DESC]

```

Skip offset of rows and return the next n rows

```sql
SELECT c1, c2 FROM t
ORDER BY c1
LIMIT n OFFSET offset

```

Group rows using an aggregate function

```sql
SELECT c1, aggregate(c2)
FROM t
GROUP BY c1

```

Filter groups using HAVING clause

```sql
SELECT c1, aggregate(c2)
FROM t
GROUP BY c1
HAVING condition

```

### Querying from multiple tables

Inner join t1 and t2

```sql
SELECT c1, c2
FROM t1
INNER JOIN t2 ON condition

```

Left join t1 and t1

```sql
SELECT c1, c2
FROM t1
LEFT JOIN t2 ON condition

```

Right join t1 and t2

```sql
SELECT c1, c2
FROM t1
RIGHT JOIN t2 ON condition

```

Perform full outer join

```sql
SELECT c1, c2
FROM t1
FULL OUTER JOIN t2 ON condition

```

Produce a Cartesian product of rows in tables

```sql
SELECT c1, c2
FROM t1
CROSS JOIN t2

```

Another way to perform cross join

```sql
SELECT c1, c2
FROM t1, t2

```

Join t1 to itself using INNER JOIN clause

```sql
SELECT c1, c2
FROM t1 A
INNER JOIN t1 B ON condition

```

Using SQL Operators Combine rows from two queries

```sql
SELECT c1, c2 FROM t1
UNION [ALL]
SELECT c1, c2 FROM t2

```

Return the intersection of two queries

```sql
SELECT c1, c2 FROM t1
INTERSECT
SELECT c1, c2 FROM t2

```

Subtract a result set from another result set

```sql
SELECT c1, c2 FROM t1
MINUS
SELECT c1, c2 FROM t2

```

Query rows using pattern matching %, _

```sql
SELECT c1, c2 FROM t1
WHERE c1 [NOT] LIKE pattern

```

Query rows in a list

```sql
SELECT c1, c2 FROM t
WHERE c1 [NOT] IN value_list

```

Query rows between two values

```sql
SELECT c1, c2 FROM t
WHERE  c1 BETWEEN low AND high

```

Check if values in a table is NULL or not

```sql
SELECT c1, c2 FROM t
WHERE  c1 IS [NOT] NULL

```

### Using SQL constraints

Set c1 and c2 as a primary key

```sql
CREATE TABLE t(
    c1 INT, c2 INT, c3 VARCHAR,
    PRIMARY KEY (c1,c2)
);

```

Set c2 column as a foreign key

```sql
CREATE TABLE t1(
    c1 INT PRIMARY KEY,
    c2 INT,
    FOREIGN KEY (c2) REFERENCES t2(c2)
);

```

Make the values in c1 and c2 unique

```sql
CREATE TABLE t(
    c1 INT, c1 INT,
    UNIQUE(c2,c3)
);

```

Ensure c1 > 0 and values in c1 >= c2

```sql
CREATE TABLE t(
  c1 INT, c2 INT,
  CHECK(c1> 0 AND c1 >= c2)
);

```

Set values in c2 column not NULL

```sql
CREATE TABLE t(
     c1 INT PRIMARY KEY,
     c2 VARCHAR NOT NULL
);

```

### Modifying Data

Insert one row into a table

```sql
INSERT INTO t(column_list)
VALUES(value_list);

```

Insert multiple rows into a table

```sql
INSERT INTO t(column_list)
VALUES (value_list),
       (value_list), â¦;

```

Insert rows from t2 into t1

```sql
INSERT INTO t1(column_list)
SELECT column_list
FROM t2;

```

Update new value in the column c1 for all rows

```sql
UPDATE t
SET c1 = new_value;

```

Update values in the column c1, c2 that match the condition

```sql
UPDATE t
SET c1 = new_value,
        c2 = new_value
WHERE condition;

```

Delete all data in a table

```sql
DELETE FROM t;

```

Delete subset of rows in a table

```sql
DELETE FROM t
WHERE condition;

```

### Managing Views

Create a new view that consists of c1 and c2

```sql
CREATE VIEW v(c1,c2)
AS
SELECT c1, c2
FROM t;

```

Create a new view with check option

```sql
CREATE VIEW v(c1,c2)
AS
SELECT c1, c2
FROM t;
WITH [CASCADED | LOCAL] CHECK OPTION;

```

Create a recursive view

```sql
CREATE RECURSIVE VIEW v
AS
select-statement -- anchor part
UNION [ALL]
select-statement; -- recursive part

```

Create a temporary view

```sql
CREATE TEMPORARY VIEW v
AS
SELECT c1, c2
FROM t;

```

Delete a view

```sql
DROP VIEW view_name;

```

### Managing triggers

Create or modify a trigger

```sql
CREATE OR MODIFY TRIGGER trigger_name
WHEN EVENT
ON table_name TRIGGER_TYPE
EXECUTE stored_procedure;

```

#### WHEN

| - | - |
| --- | --- |
| `BEFORE` | invoke before the event occurs |
| `AFTER` | invoke after the event occurs |

#### EVENT

| - | - |
| --- | --- |
| `INSERT` | invoke for INSERT |
| `UPDATE` | invoke for UPDATE |
| `DELETE` | invoke for DELETE |

#### TRIGGER_TYPE

| - | - |
| --- | --- |
| `FOR EACH ROW` |  |
| `FOR EACH STATEMENT` |  |

### Managing indexes

Create an index on c1 and c2 of the t table

```sql
CREATE INDEX idx_name
ON t(c1,c2);

```

Create a unique index on c3, c4 of the t table

```sql
CREATE UNIQUE INDEX idx_name
ON t(c3,c4)

```

Drop an index

```sql
DROP INDEX idx_name ON t;

```

## MySQL Data Types

### Strings

| - | - |
| --- | --- |
| `CHAR` | String (0 - 255) |
| `VARCHAR` | String (0 - 255) |
| `TINYTEXT` | String (0 - 255) |
| `TEXT` | String (0 - 65535) |
| `BLOB` | String (0 - 65535) |
| `MEDIUMTEXT` | String (0 - 16777215) |
| `MEDIUMBLOB` | String (0 - 16777215) |
| `LONGTEXT` | String (0 - 429496Â­7295) |
| `LONGBLOB` | String (0 - 429496Â­7295) |
| `ENUM` | One of preset options |
| `SET` | Selection of preset options |

### Date & time

| Data Type | Format |
| --- | --- |
| `DATE` | yyyy-MM-dd |
| `TIME` | hh:mm:ss |
| `DATETIME` | yyyy-MM-dd hh:mm:ss |
| `TIMESTAMP` | yyyy-MM-dd hh:mm:ss |
| `YEAR` | yyyy |

### Numeric

| - | - |
| --- | --- |
| `TINYINT x` | Integer (-128 to 127) |
| `SMALLINT x` | Integer (-32768 to 32767) |
| `MEDIUMINT x` | Integer (-8388608 to 8388607) |
| `INT x` | Integer (-2147Â­483648 to 214748Â­3647) |
| `BIGINT x` | Integer (-9223Â­372Â­036Â­854Â­775808 to 922337Â­203Â­685Â­477Â­5807) |
| `FLOAT` | Decimal (precise to 23 digits) |
| `DOUBLE` | Decimal (24 to 53 digits) |
| `DECIMAL` | "Â­DOUÂ­BLEÂ­" stored as string |

## MySQL Functions & Operators

### Strings

- ASCII(){data-tooltip="Return numeric value of left-most character"}
- BIN(){data-tooltip="Return a string containing binary representation of a number"}
- BIT_LENGTH(){data-tooltip="Return length of argument in bits"}
- CHAR(){data-tooltip="Return the character for each integer passed"}
- CHARACTER_LENGTH(){data-tooltip="Synonym for CHAR_LENGTH()"}
- CHAR_LENGTH(){data-tooltip="Return number of characters in argument"}
- CONCAT(){data-tooltip="Return concatenated string"}
- CONCAT_WS(){data-tooltip="Return concatenate with separator"}
- ELT(){data-tooltip="Return string at index number"}
- EXPORT_SET(){data-tooltip="Return a string such that for every bit set in the value bits, you get an on string and for every unset bit, you get an off string"}
- FIELD(){data-tooltip="Index (position) of first argument in subsequent arguments"}
- FIND_IN_SET(){data-tooltip="Index (position) of first argument within second argument"}
- FORMAT(){data-tooltip="Return a number formatted to specified number of decimal places"}
- FROM_BASE64(){data-tooltip="Decode base64 encoded string and return result"}
- HEX(){data-tooltip="Hexadecimal representation of decimal or string value"}
- INSERT(){data-tooltip="Insert substring at specified position up to specified number of characters"}
- INSTR(){data-tooltip="Return the index of the first occurrence of substring"}
- LCASE(){data-tooltip="Synonym for LOWER()"}
- LEFT(){data-tooltip="Return the leftmost number of characters as specified"}
- LENGTH(){data-tooltip="Return the length of a string in bytes"}
- LIKE{data-tooltip="Simple pattern matching"}
- LOAD_FILE(){data-tooltip="Load the named file"}
- LOCATE(){data-tooltip="Return the position of the first occurrence of substring"}
- LOWER(){data-tooltip="Return the argument in lowercase"}
- LPAD(){data-tooltip="Return the string argument, left-padded with the specified string"}
- LTRIM(){data-tooltip="Remove leading spaces"}
- MAKE_SET(){data-tooltip="Return a set of comma-separated strings that have the corresponding bit in bits set"}
- MATCH{data-tooltip="Perform full-text search"}
- MID(){data-tooltip="Return a substring starting from the specified position"}
- NOT LIKE{data-tooltip="Negation of simple pattern matching"}
- NOT REGEXP{data-tooltip="Negation of REGEXP"}
- OCT(){data-tooltip="Return a string containing octal representation of a number"}
- OCTET_LENGTH(){data-tooltip="Synonym for LENGTH()"}
- ORD(){data-tooltip="Return character code for leftmost character of the argument"}
- POSITION(){data-tooltip="Synonym for LOCATE()"}
- QUOTE(){data-tooltip="Escape the argument for use in an SQL statement"}
- REGEXP{data-tooltip="Whether string matches regular expression"}
- REGEXP_INSTR(){data-tooltip="Starting index of substring matching regular expression"}
- REGEXP_LIKE(){data-tooltip="Whether string matches regular expression"}
- REGEXP_REPLACE(){data-tooltip="Replace substrings matching regular expression"}
- REGEXP_SUBSTR(){data-tooltip="Return substring matching regular expression"}
- REPEAT(){data-tooltip="Repeat a string the specified number of times"}
- REPLACE(){data-tooltip="Replace occurrences of a specified string"}
- REVERSE(){data-tooltip="Reverse the characters in a string"}
- RIGHT(){data-tooltip="Return the specified rightmost number of characters"}
- RLIKE{data-tooltip="Whether string matches regular expression"}
- RPAD(){data-tooltip="Append string the specified number of times"}
- RTRIM(){data-tooltip="Remove trailing spaces"}
- SOUNDEX(){data-tooltip="Return a soundex string"}
- SOUNDS LIKE{data-tooltip="Compare sounds"}
- SPACE(){data-tooltip="Return a string of the specified number of spaces"}
- STRCMP(){data-tooltip="Compare two strings"}
- SUBSTR(){data-tooltip="Return the substring as specified"}
- SUBSTRING(){data-tooltip="Return the substring as specified"}
- SUBSTRING_INDEX(){data-tooltip="Return a substring from a string before the specified number of occurrences of the delimiter"}
- TO_BASE64(){data-tooltip="Return the argument converted to a base-64 string"}
- TRIM(){data-tooltip="Remove leading and trailing spaces"}
- UCASE(){data-tooltip="Synonym for UPPER()"}
- UNHEX(){data-tooltip="Return a string containing hex representation of a number"}
- UPPER(){data-tooltip="Convert to uppercase"}
- WEIGHT_STRING(){data-tooltip="Return the weight string for a string"}

{.cols-2 .marker-none}

### Date and Time

- ADDDATE(){data-tooltip="Add time values (intervals) to a date value"}
- ADDTIME(){data-tooltip="Add time"}
- CONVERT_TZ(){data-tooltip="Convert from one time zone to another"}
- CURDATE(){data-tooltip="Return the current date"}
- CURRENT_DATE(){data-tooltip="Synonyms for CURDATE()"}
- CURRENT_TIME(){data-tooltip="Synonyms for CURTIME()"}
- CURRENT_TIMESTAMP(){data-tooltip="Synonyms for NOW()"}
- CURTIME(){data-tooltip="Return the current time"}
- DATE(){data-tooltip="Extract the date part of a date or datetime expression"}
- DATE_ADD(){data-tooltip="Add time values (intervals) to a date value"}
- DATE_FORMAT(){data-tooltip="Format date as specified"}
- DATE_SUB(){data-tooltip="Subtract a time value (interval) from a date"}
- DATEDIFF(){data-tooltip="Subtract two dates"}
- DAY(){data-tooltip="Synonym for DAYOFMONTH()"}
- DAYNAME(){data-tooltip="Return the name of the weekday"}
- DAYOFMONTH(){data-tooltip="Return the day of the month (0-31)"}
- DAYOFWEEK(){data-tooltip="Return the weekday index of the argument"}
- DAYOFYEAR(){data-tooltip="Return the day of the year (1-366)"}
- EXTRACT(){data-tooltip="Extract part of a date"}
- FROM_DAYS(){data-tooltip="Convert a day number to a date"}
- FROM_UNIXTIME(){data-tooltip="Format Unix timestamp as a date"}
- GET_FORMAT(){data-tooltip="Return a date format string"}
- HOUR(){data-tooltip="Extract the hour"}
- LAST_DAY{data-tooltip="Return the last day of the month for the argument"}
- LOCALTIME(){data-tooltip="Synonym for NOW()"}
- LOCALTIMESTAMP(){data-tooltip="Synonym for NOW()"}
- MAKEDATE(){data-tooltip="Create a date from the year and day of year"}
- MAKETIME(){data-tooltip="Create time from hour, minute, second"}
- MICROSECOND(){data-tooltip="Return the microseconds from argument"}
- MINUTE(){data-tooltip="Return the minute from the argument"}
- MONTH(){data-tooltip="Return the month from the date passed"}
- MONTHNAME(){data-tooltip="Return the name of the month"}
- NOW(){data-tooltip="Return the current date and time"}
- PERIOD_ADD(){data-tooltip="Add a period to a year-month"}
- PERIOD_DIFF(){data-tooltip="Return the number of months between periods"}
- QUARTER(){data-tooltip="Return the quarter from a date argument"}
- SEC_TO_TIME(){data-tooltip="Converts seconds to 'hh:mm:ss' format"}
- SECOND(){data-tooltip="Return the second (0-59)"}
- STR_TO_DATE(){data-tooltip="Convert a string to a date"}
- SUBDATE(){data-tooltip="Synonym for DATE_SUB() when invoked with three arguments"}
- SUBTIME(){data-tooltip="Subtract times"}
- SYSDATE(){data-tooltip="Return the time at which the function executes"}
- TIME(){data-tooltip="Extract the time portion of the expression passed"}
- TIME_FORMAT(){data-tooltip="Format as time"}
- TIME_TO_SEC(){data-tooltip="Return the argument converted to seconds"}
- TIMEDIFF(){data-tooltip="Subtract time"}
- TIMESTAMP(){data-tooltip="With a single argument, this function returns the date or datetime expression; with two arguments, the sum of the arguments"}
- TIMESTAMPADD(){data-tooltip="Add an interval to a datetime expression"}
- TIMESTAMPDIFF(){data-tooltip="Subtract an interval from a datetime expression"}
- TO_DAYS(){data-tooltip="Return the date argument converted to days"}
- TO_SECONDS(){data-tooltip="Return the date or datetime argument converted to seconds since Year 0"}
- UNIX_TIMESTAMP(){data-tooltip="Return a Unix timestamp"}
- UTC_DATE(){data-tooltip="Return the current UTC date"}
- UTC_TIME(){data-tooltip="Return the current UTC time"}
- UTC_TIMESTAMP(){data-tooltip="Return the current UTC date and time"}
- WEEK(){data-tooltip="Return the week number"}
- WEEKDAY(){data-tooltip="Return the weekday index"}
- WEEKOFYEAR(){data-tooltip="Return the calendar week of the date (1-53)"}
- YEAR(){data-tooltip="Return the year"}
- YEARWEEK(){data-tooltip="Return the year and week"}
- GET_FORMAT(){data-tooltip="'%m.%d.%Y'"}

{.cols-2 .marker-none}

### Numeric

- %, MOD{data-tooltip="Modulo operator"}
- *{data-tooltip="Multiplication operator"}
- +{data-tooltip="Addition operator"}
- -{data-tooltip="Minus operator"}
- -{data-tooltip="Change the sign of the argument"}
- /{data-tooltip="Division operator"}
- ABS(){data-tooltip="Return the absolute value"}
- ACOS(){data-tooltip="Return the arc cosine"}
- ASIN(){data-tooltip="Return the arc sine"}
- ATAN(){data-tooltip="Return the arc tangent"}
- ATAN2(), ATAN(){data-tooltip="Return the arc tangent of the two arguments"}
- CEIL(){data-tooltip="Return the smallest integer value not less than the argument"}
- CEILING(){data-tooltip="Return the smallest integer value not less than the argument"}
- CONV(){data-tooltip="Convert numbers between different number bases"}
- COS(){data-tooltip="Return the cosine"}
- COT(){data-tooltip="Return the cotangent"}
- CRC32(){data-tooltip="Compute a cyclic redundancy check value"}
- DEGREES(){data-tooltip="Convert radians to degrees"}
- DIV{data-tooltip="Integer division"}
- EXP(){data-tooltip="Raise to the power of"}
- FLOOR(){data-tooltip="Return the largest integer value not greater than the argument"}
- LN(){data-tooltip="Return the natural logarithm of the argument"}
- LOG(){data-tooltip="Return the natural logarithm of the first argument"}
- LOG10(){data-tooltip="Return the base-10 logarithm of the argument"}
- LOG2(){data-tooltip="Return the base-2 logarithm of the argument"}
- MOD(){data-tooltip="Return the remainder"}
- PI(){data-tooltip="Return the value of pi"}
- POW(){data-tooltip="Return the argument raised to the specified power"}
- POWER(){data-tooltip="Return the argument raised to the specified power"}
- RADIANS(){data-tooltip="Return argument converted to radians"}
- RAND(){data-tooltip="Return a random floating-point value"}
- ROUND(){data-tooltip="Round the argument"}
- SIGN(){data-tooltip="Return the sign of the argument"}
- SIN(){data-tooltip="Return the sine of the argument"}
- SQRT(){data-tooltip="Return the square root of the argument"}
- TAN(){data-tooltip="Return the tangent of the argument"}
- TRUNCATE(){data-tooltip="Truncate to specified number of decimal places"}

{.cols-2 .marker-none}

### Aggregate

- AVG(){data-tooltip="Return the average value of the argument"}
- BIT_AND(){data-tooltip="Return bitwise AND"}
- BIT_OR(){data-tooltip="Return bitwise OR"}
- BIT_XOR(){data-tooltip="Return bitwise XOR"}
- COUNT(){data-tooltip="Return a count of the number of rows returned"}
- COUNT(DISTINCT){data-tooltip="Return the count of a number of different values"}
- GROUP_CONCAT(){data-tooltip="Return a concatenated string"}
- JSON_ARRAYAGG(){data-tooltip="Return result set as a single JSON array"}
- JSON_OBJECTAGG(){data-tooltip="Return result set as a single JSON object"}
- MAX(){data-tooltip="Return the maximum value"}
- MIN(){data-tooltip="Return the minimum value"}
- STD(){data-tooltip="Return the population standard deviation"}
- STDDEV(){data-tooltip="Return the population standard deviation"}
- STDDEV_POP(){data-tooltip="Return the population standard deviation"}
- STDDEV_SAMP(){data-tooltip="Return the sample standard deviation"}
- SUM(){data-tooltip="Return the sum"}
- VAR_POP(){data-tooltip="Return the population standard variance"}
- VAR_SAMP(){data-tooltip="Return the sample variance"}
- VARIANCE(){data-tooltip="Return the population standard variance"}

{.cols-2 .marker-none}

### JSON

- ->{data-tooltip="Return value from JSON column after evaluating path; equivalent to JSON_EXTRACT()."}
- ->>{data-tooltip="Return value from JSON column after evaluating path and unquoting the result; equivalent to JSON_UNQUOTE(JSON_EXTRACT())."}
- JSON_ARRAY(){data-tooltip="Create JSON array"}
- JSON_ARRAY_APPEND(){data-tooltip="Append data to JSON document"}
- JSON_ARRAY_INSERT(){data-tooltip="Insert into JSON array"}
- JSON_CONTAINS(){data-tooltip="Whether JSON document contains specific object at path"}
- JSON_CONTAINS_PATH(){data-tooltip="Whether JSON document contains any data at path"}
- JSON_DEPTH(){data-tooltip="Maximum depth of JSON document"}
- JSON_EXTRACT(){data-tooltip="Return data from JSON document"}
- JSON_INSERT(){data-tooltip="Insert data into JSON document"}
- JSON_KEYS(){data-tooltip="Array of keys from JSON document"}
- JSON_LENGTH(){data-tooltip="Number of elements in JSON document"}
- JSON_MERGE() (deprecated){data-tooltip="Merge JSON documents, preserving duplicate keys. Deprecated synonym for JSON_MERGE_PRESERVE()"}
- JSON_MERGE_PATCH(){data-tooltip="Merge JSON documents, replacing values of duplicate keys"}
- JSON_MERGE_PRESERVE(){data-tooltip="Merge JSON documents, preserving duplicate keys"}
- JSON_OBJECT(){data-tooltip="Create JSON object"}
- JSON_OVERLAPS() (introduced 8.0.17){data-tooltip="Compares two JSON documents, returns TRUE (1) if these have any key-value pairs or array elements in common, otherwise FALSE (0)"}
- JSON_PRETTY(){data-tooltip="Print a JSON document in human-readable format"}
- JSON_QUOTE(){data-tooltip="Quote JSON document"}
- JSON_REMOVE(){data-tooltip="Remove data from JSON document"}
- JSON_REPLACE(){data-tooltip="Replace values in JSON document"}
- JSON_SCHEMA_VALID() (introduced 8.0.17){data-tooltip="Validate JSON document against JSON schema; returns TRUE/1 if document validates against schema, or FALSE/0 if it does not"}
- JSON_SCHEMA_VALIDATION_REPORT() (introduced 8.0.17){data-tooltip="Validate JSON document against JSON schema; returns report in JSON format on outcome on validation including success or failure and reasons for failure"}
- JSON_SEARCH(){data-tooltip="Path to value within JSON document"}
- JSON_SET(){data-tooltip="Insert data into JSON document"}
- JSON_STORAGE_FREE(){data-tooltip="Freed space within binary representation of JSON column value following partial update"}
- JSON_STORAGE_SIZE(){data-tooltip="Space used for storage of binary representation of a JSON document"}
- JSON_TABLE(){data-tooltip="Return data from a JSON expression as a relational table"}
- JSON_TYPE(){data-tooltip="Type of JSON value"}
- JSON_UNQUOTE(){data-tooltip="Unquote JSON value"}
- JSON_VALID(){data-tooltip="Whether JSON value is valid"}
- JSON_VALUE() (introduced 8.0.21){data-tooltip="Extract value from JSON document at location pointed to by path provided; return this value as VARCHAR(512) or specified type"}
- MEMBER OF() (introduced 8.0.17){data-tooltip="Returns true (1) if first operand matches any element of JSON array passed as second operand, otherwise returns false (0)"}

{.cols-1 .marker-none}

### Cast

- BINARY{data-tooltip="Cast a string to a binary string"}
- CAST(){data-tooltip="Cast a value as a certain type"}
- CONVERT(){data-tooltip="Cast a value as a certain type"}

{.cols-2 .marker-none}

### Flow Control

- CASE{data-tooltip="Case operator"}
- IF(){data-tooltip="If/else construct"}
- IFNULL(){data-tooltip="Null if/else construct"}
- NULLIF(){data-tooltip="Return NULL if expr1 = expr2"}

{.cols-2 .marker-none}

### Information

- BENCHMARK(){data-tooltip="Repeatedly execute an expression"}
- CHARSET(){data-tooltip="Return the character set of the argument"}
- COERCIBILITY(){data-tooltip="Return the collation coercibility value of the string argument"}
- COLLATION(){data-tooltip="Return the collation of the string argument"}
- CONNECTION_ID(){data-tooltip="Return the connection ID (thread ID) for the connection"}
- CURRENT_ROLE(){data-tooltip="Return the current active roles"}
- CURRENT_USER(){data-tooltip="The authenticated user name and host name"}
- DATABASE(){data-tooltip="Return the default (current) database name"}
- FOUND_ROWS(){data-tooltip="For a SELECT with a LIMIT clause, the number of rows that would be returned were there no LIMIT clause"}
- ICU_VERSION(){data-tooltip="ICU library version"}
- LAST_INSERT_ID(){data-tooltip="Value of the AUTOINCREMENT column for the last INSERT"}
- ROLES_GRAPHML(){data-tooltip="Return a GraphML document representing memory role subgraphs"}
- ROW_COUNT(){data-tooltip="The number of rows updated"}
- SCHEMA(){data-tooltip="Synonym for DATABASE()"}
- SESSION_USER(){data-tooltip="Synonym for USER()"}
- SYSTEM_USER(){data-tooltip="Synonym for USER()"}
- USER(){data-tooltip="The user name and host name provided by the client"}
- VERSION(){data-tooltip="Return a string that indicates the MySQL server version"}

{.cols-2 .marker-none}

### Encryption and Compression

- AES_DECRYPT(){data-tooltip="Decrypt using AES"}
- AES_ENCRYPT(){data-tooltip="Encrypt using AES"}
- COMPRESS(){data-tooltip="Return result as a binary string"}
- MD5(){data-tooltip="Calculate MD5 checksum"}
- RANDOM_BYTES(){data-tooltip="Return a random byte vector"}
- SHA1(), SHA(){data-tooltip="Calculate an SHA-1 160-bit checksum"}
- SHA2(){data-tooltip="Calculate an SHA-2 checksum"}
- STATEMENT_DIGEST(){data-tooltip="Compute statement digest hash value"}
- STATEMENT_DIGEST_TEXT(){data-tooltip="Compute normalized statement digest"}
- UNCOMPRESS(){data-tooltip="Uncompress a string compressed"}
- UNCOMPRESSED_LENGTH(){data-tooltip="Return the length of a string before compression"}
- VALIDATE_PASSWORD_STRENGTH(){data-tooltip="Determine strength of password"}

{.cols-1 .marker-none}

### Locking

- GET_LOCK(){data-tooltip="Get a named lock"}
- IS_FREE_LOCK(){data-tooltip="Whether the named lock is free"}
- IS_USED_LOCK(){data-tooltip="Whether the named lock is in use; return connection identifier if true"}
- RELEASE_ALL_LOCKS(){data-tooltip="Release all current named locks"}
- RELEASE_LOCK(){data-tooltip="Release the named lock"}

{.cols-1 .marker-none}

### Bit

- &{data-tooltip="Bitwise AND"}
- >>{data-tooltip="Right shift"}
- <<{data-tooltip="Left shift"}
- ^{data-tooltip="Bitwise XOR"}
- BIT_COUNT(){data-tooltip="Return the number of bits that are set"}
- |{data-tooltip="Bitwise OR"}
- ~{data-tooltip="Bitwise inversion"}

{.cols-2 .marker-none}

### Miscellaneous

- ANY_VALUE(){data-tooltip="Suppress ONLY_FULL_GROUP_BY value rejection"}
- BIN_TO_UUID(){data-tooltip="Convert binary UUID to string"}
- DEFAULT(){data-tooltip="Return the default value for a table column"}
- GROUPING(){data-tooltip="Distinguish super-aggregate ROLLUP rows from regular rows"}
- INET_ATON(){data-tooltip="Return the numeric value of an IP address"}
- INET_NTOA(){data-tooltip="Return the IP address from a numeric value"}
- INET6_ATON(){data-tooltip="Return the numeric value of an IPv6 address"}
- INET6_NTOA(){data-tooltip="Return the IPv6 address from a numeric value"}
- IS_IPV4(){data-tooltip="Whether argument is an IPv4 address"}
- IS_IPV4_COMPAT(){data-tooltip="Whether argument is an IPv4-compatible address"}
- IS_IPV4_MAPPED(){data-tooltip="Whether argument is an IPv4-mapped address"}
- IS_IPV6(){data-tooltip="Whether argument is an IPv6 address"}
- IS_UUID(){data-tooltip="Whether argument is a valid UUID"}
- MASTER_POS_WAIT(){data-tooltip="Block until the replica has read and applied all updates up to the specified position"}
- NAME_CONST(){data-tooltip="Cause the column to have the given name"}
- SLEEP(){data-tooltip="Sleep for a number of seconds"}
- UUID(){data-tooltip="Return a Universal Unique Identifier (UUID)"}
- UUID_SHORT(){data-tooltip="Return an integer-valued universal identifier"}
- UUID_TO_BIN(){data-tooltip="Convert string UUID to binary"}
- VALUES(){data-tooltip="Define the values to be used during an INSERT"}

{.cols-2 .marker-none}

## Also see

- Regex in MySQL(cheatsheets.zip)

