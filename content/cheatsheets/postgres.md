# PostgreSQL

> The [PostgreSQL](https://www.postgresql.org/docs/current/) cheat sheet provides you with the common PostgreSQL commands and statements.

Category: Database

## Getting Started

### Getting started

Switch and connect

```shell
$ sudo -u postgres psql

```

List all databases

```shell
postgres=# \l

```

Connect to the database named postgres

```shell
postgres=# \c postgres

```

Disconnect

```shell
postgres=# \q
postgres=# \!

```

### psql commands

| Option | Example | Description |
| --- | --- | --- |
| `[-d] <database>` | psql -d mydb | Connecting to database |
| `-U` | psql -U john mydb | Connecting as a specific user |
| `-h` `-p` | psql -h localhost -p 5432 mydb | Connecting to a host/port |
| `-U` `-h` `-p` `-d` | psql -U admin -h 192.168.1.5 -p 2506 -d mydb | Connect remote PostgreSQL |
| `-W` | psql -W mydb | Force password |
| `-c` | psql -c '\c postgres' -c '\dt' | Execute a SQL query or command |
| `-H` | psql -c "\l+" -H postgres > database.html | Generate HTML report |
| `-l` | psql -l | List all databases |
| `-f` | psql mydb -f file.sql | Execute commands from a file |
| `-V` | psql -V | Print the psql version |

{.show-header}

### Getting help

| - | - |
| --- | --- |
| `\h` | Help on syntax of SQL commands |
| `\h` DELETE | DELETE SQL statement syntax |
| `\?` | List of PostgreSQL command |

Run in PostgreSQL console

## PostgreSQL Working

### Recon

Show version

```
SHOW SERVER_VERSION;

```

Show system status

```sql
\conninfo

```

Show environmental variables

```sql
SHOW ALL;

```

List users

```sql
SELECT rolname FROM pg_roles;

```

Show current user

```sql
SELECT current_user;

```

Show current user's permissions

```
\du

```

Show current database

```sql
SELECT current_database();

```

Show all tables in database

```sql
\dt

```

List functions

```sql
\df <schema>

```

### Databases

List databases

```sql
\l

```

Connect to database

```sql
\c <database_name>

```

Show current database

```sql
SELECT current_database();

```

Create database

```sql
CREATE DATABASE <database_name> WITH OWNER <username>;

```

Drop database

```sql
DROP DATABASE IF EXISTS <database_name>;

```

Rename database

```sql
ALTER DATABASE <old_name> RENAME TO <new_name>;

```

### Tables

List tables, in current db

```sql
\dt

SELECT table_schema,table_name FROM information_schema.tables ORDER BY table_schema,table_name;

```

List tables, globally

```sql
\dt *.*.

SELECT * FROM pg_catalog.pg_tables

```

List table schema

```sql
\d <table_name>
\d+ <table_name>

SELECT column_name, data_type, character_maximum_length
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name = '<table_name>';

```

Create table

```sql
CREATE TABLE <table_name>(
  <column_name> <column_type>,
  <column_name> <column_type>
);

```

Create table, with an auto-incrementing primary key

```sql
CREATE TABLE <table_name> (
  <column_name> SERIAL PRIMARY KEY
);

```

Delete table

```sql
DROP TABLE IF EXISTS <table_name> CASCADE;

```

### Permissions

Become the postgres user, if you have permission errors

```shell
sudo su - postgres
psql

```

Grantall permissions on database

```sql
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user_name>;

```

Grant connection permissions on database

```sql
GRANT CONNECT ON DATABASE <db_name> TO <user_name>;

```

Grant permissions on schema

```sql
GRANT USAGE ON SCHEMA public TO <user_name>;

```

Grant permissions to functions

```sql
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO <user_name>;

```

Grant permissions to select, update, insert, delete, on a all tables

```sql
GRANT SELECT, UPDATE, INSERT ON ALL TABLES IN SCHEMA public TO <user_name>;

```

Grant permissions, on a table

```sql
GRANT SELECT, UPDATE, INSERT ON <table_name> TO <user_name>;

```

Grant permissions, to select, on a table

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA public TO <user_name>;

```

### Columns

Add column

```sql
ALTER TABLE <table_name> IF EXISTS
ADD <column_name> <data_type> [<constraints>];

```

Update column

```sql
ALTER TABLE <table_name> IF EXISTS
ALTER <column_name> TYPE <data_type> [<constraints>];

```

Delete column

```sql
ALTER TABLE <table_name> IF EXISTS
DROP <column_name>;

```

Update column to be an auto-incrementing primary key

```sql
ALTER TABLE <table_name>
ADD COLUMN <column_name> SERIAL PRIMARY KEY;

```

Insert into a table, with an auto-incrementing primary key

```sql
INSERT INTO <table_name>
VALUES (DEFAULT, <value1>);


INSERT INTO <table_name> (<column1_name>,<column2_name>)
VALUES ( <value1>,<value2> );

```

### Data

Selectall data

```sql
SELECT * FROM <table_name>;

```

Read one row of data

```sql
SELECT * FROM <table_name> LIMIT 1;

```

Search for data

```sql
SELECT * FROM <table_name> WHERE <column_name> = <value>;

```

Insertdata

```sql
INSERT INTO <table_name> VALUES( <value_1>, <value_2> );

```

Updatedata

```sql
UPDATE <table_name>
SET <column_1> = <value_1>, <column_2> = <value_2>
WHERE <column_1> = <value>;

```

Deleteall data

```sql
DELETE FROM <table_name>;

```

Delete specific data

```sql
DELETE FROM <table_name>
WHERE <column_name> = <value>;

```

### Users

List roles

```sql
SELECT rolname FROM pg_roles;

```

Create user

```sql
CREATE USER <user_name> WITH PASSWORD '<password>';

```

Drop user

```sql
DROP USER IF EXISTS <user_name>;

```

Alteruser password

```sql
ALTER ROLE <user_name> WITH PASSWORD '<password>';

```

### Schema

List schemas

```sql
\dn

SELECT schema_name FROM information_schema.schemata;

SELECT nspname FROM pg_catalog.pg_namespace;

```

Create schema

```sql
CREATE SCHEMA IF NOT EXISTS <schema_name>;

```

Drop schema

```sql
DROP SCHEMA IF EXISTS <schema_name> CASCADE;

```

### Dates

Showcurrent dateYYYY-MM-DD

```sql
SELECT current_date;

```

Calculateagebetween two dates

```sql
SELECT age(timestamp, timestamp);

```

Showcurrent timewith time
zone

```sql
SELECT current_time;

```

Makedates using integers

```sql
SELECT make_date(2021,03,25);

```

## PostgreSQL Commands

### Tables

| - | - |
| --- | --- |
| `\d <table>` | Describe table |
| `\d+ <table>` | Describe table with details |
| `\dt` | List tables from current schema |
| `\dt *.*` | List tables from all schemas |
| `\dt <schema>.*` | List tables for a schema |
| `\dp` | List table access privileges |
| `\det[+]` | List foreign tables |

### Query buffer

| - | - |
| --- | --- |
| `\e [FILE]` | Edit the query buffer (or file) |
| `\ef [FUNC]` | Edit function definition |
| `\p` | Show the contents |
| `\r` | Reset (clear) the query buffer |
| `\s [FILE]` | Display history or save it to file |
| `\w FILE` | Write query buffer to file |

### Informational

| - | - |
| --- | --- |
| `\l[+]` | List all databases |
| `\dn[S+]` | List schemas |
| `\di[S+]` | List indexes |
| `\du[+]` | List roles |
| `\ds[S+]` | List sequences |
| `\df[antw][S+]` | List functions |
| `\deu[+]` | List user mappings |
| `\dv[S+]` | List views |
| `\dl` | List large objects |
| `\dT[S+]` | List data types |
| `\da[S]` | List aggregates |
| `\db[+]` | List tablespaces |
| `\dc[S+]` | List conversions |
| `\dC[+]` | List casts |
| `\ddp` | List default privileges |
| `\dd[S]` | Show object descriptions |
| `\dD[S+]` | List domains |
| `\des[+]` | List foreign servers |
| `\dew[+]` | List foreign-data wrappers |
| `\dF[+]` | List text search configurations |
| `\dFd[+]` | List text search dictionaries |
| `\dFp[+]` | List text search parsers |
| `\dFt[+]` | List text search templates |
| `\dL[S+]` | List procedural languages |
| `\do[S]` | List operators |
| `\dO[S+]` | List collations |
| `\drds` | List per-database role settings |
| `\dx[+]` | List extensions |

S: show system objects,+: additional detail

### Connection

| - | - |
| --- | --- |
| `\c [DBNAME]` | Connect to new database |
| `\encoding [ENCODING]` | Show or set client encoding |
| `\password [USER]` | Change the password |
| `\conninfo` | Display information |

### Formatting

| - | - |
| --- | --- |
| `\a` | Toggle between unaligned and aligned |
| `\C [STRING]` | Set table title, or unset if none |
| `\f [STRING]` | Show or set field separator for unaligned |
| `\H` | Toggle HTML output mode |
| `\t [on\|off]` | Show only rows |
| `\T [STRING]` | Set or unset HTML <table> tag attributes |
| `\x [on\|off]` | Toggle expanded output |

### Input/Output

| - | - |
| --- | --- |
| `\copy ...` | Import/export tableSee also:copy |
| `\echo [STRING]` | Print string |
| `\i FILE` | Execute file |
| `\o [FILE]` | Export all results to file |
| `\qecho [STRING]` | String to output stream |

### Variables

| - | - |
| --- | --- |
| `\prompt [TEXT] NAME` | Set variable |
| `\set [NAME [VALUE]]` | Set variable(or list all if no parameters) |
| `\unset NAME` | Delete variable |

### Misc

| - | - |
| --- | --- |
| `\cd [DIR]` | Change the directory |
| `\timing [on\|off]` | Toggle timing |
| `\! [COMMAND]` | Execute in shell |
| `\! ls -l` | List all in shell |

### Large Objects

- \lo_export LOBOID FILE
- \lo_import FILE [COMMENT]
- \lo_list
- \lo_unlink LOBOID

{.marker-none}

## Miscellaneous

### Backup

Use pg_dumpall to backup all databases

```shell
$ pg_dumpall -U postgres > all.sql

```

Use pg_dump to backup a database

```shell
$ pg_dump -d mydb -f mydb_backup.sql

```

| - | - |
| --- | --- |
| `-a` | Dump only the data, not the schema |
| `-s` | Dump only the schema, no data |
| `-c` | Drop database before recreating |
| `-C` | Create database before restoring |
| `-t` | Dump the named table(s) only |
| `-F` | Format ( `c` : custom, `d` : directory, `t` : tar) |

Usepg_dump -?to get the full list of options

### Restore

Restore a database with psql

```shell
$ psql -U user mydb < mydb_backup.sql

```

Restore a database with pg_restore

```shell
$ pg_restore -d mydb mydb_backup.sql -c

```

| - | - |
| --- | --- |
| `-U` | Specify a database user |
| `-c` | Drop database before recreating |
| `-C` | Create database before restoring |
| `-e` | Exit if an error has encountered |
| `-F` | Format ( `c` : custom, `d` : directory, `t` : tar, `p` : plain text sql(default)) |

{.marker-none}

Usepg_restore -?to get the full list of options

### Remote access

Get location of postgresql.conf

```shell
$ psql -U postgres -c 'SHOW config_file'

```

Append to postgresql.conf

```shell
listen_addresses = '*'

```

Append to pg_hba.conf (Same location as postgresql.conf)

```shell
host  all  all  0.0.0.0/0  md5
host  all  all  ::/0       md5

```

Restart PostgreSQL server

```shell
$ sudo systemctl restart postgresql

```

### Import/Export CSV

Export table into CSV file

```shell
\copy table TO '<path>' CSV
\copy table(col1,col1) TO '<path>' CSV
\copy (SELECT...) TO '<path>' CSV

```

Import CSV file into table

```shell
\copy table FROM '<path>' CSV
\copy table(col1,col1) FROM '<path>' CSV

```

See also:Copy

## Also see

- Posgres-cheatsheet(gist.github.com)

