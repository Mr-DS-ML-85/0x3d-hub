# Find

> This is a quick reference list of cheatsheet for linux find command, contains common options and examples.

Category: Linux Command

## Getting Started

### Usage

```shell
$ find [path...] [options] [expression]

```

Wildcard

```shell
$ find . -name "*.txt"
$ find . -name "2020*.csv"
$ find . -name "json_*"

```

- Regex reference(cheatsheets.zip)
- Find cheatsheet(gist.github.com)

### Option Examples

| Option | Example | Description |
| --- | --- | --- |
| `-type` | find . -type d | Find only directories |
| `-name` | find . -type f -name "*.txt" | Find file by name |
| `-iname` | find . -type f -iname "hello" | Find file by name (case-insensitive) |
| `-size` | find . -size +1G | Find files larger than 1G |
| `-user` | find . -type d -user jack | Find jack's file |
| `-regex` | find /var -regex '.*/tmp/.*[0-9]*.file' | Using Regex with find. Seeregex |
| `-maxdepth` | find . -maxdepth 1 -name "a.txt" | In the current directory and subdirectories |
| `-mindepth` | find / -mindepth 3 -maxdepth 5 -name pass | Between sub-directory level 2 and 4 |

{.show-header}

### Type

|  |  |
| --- | --- |
| `-type d` | Directory |
| `-type f` | File |
| `-type l` | Symbolic link |
| `-type b` | Buffered block |
| `-type c` | Unbuffered character |
| `-type p` | Named pipe |
| `-type s` | Socket |

### Size

|  |  |
| --- | --- |
| `-size b` | 512-byte blocks (default) |
| `-size c` | Bytes |
| `-size k` | Kilobytes |
| `-size M` | Megabytes |
| `-size G` | Gigabytes |
| `-size T` | Terabytes(only BSD) |
| `-size P` | Petabytes(only BSD) |

### Size +/-

Find all bigger than 10MB files

```shell
$ find / -size +10M

```

Find all smaller than 10MB files

```shell
$ find / -size -10M

```

Find all files that are exactly 10M

```shell
$ find / -size 10M

```

Find Size between 100MB and 1GB

```shell
$ find / -size +100M -size -1G

```

The+and-prefixes signify greater than and less than, as usual.

### Names

Find files using name in current directory

```shell
$ find . -name tecmint.txt

```

Find files under home directory

```shell
$ find /home -name tecmint.txt

```

Find files using name and ignoring case

```shell
$ find /home -iname tecmint.txt

```

Find directories using name

```shell
$ find / -type d -name tecmint

```

Find php files using name

```shell
$ find . -type f -name tecmint.php

```

Find all php files in directory

```shell
$ find . -type f -name "*.php"

```

### Permissions

Find the files whose permissions are 777.

```shell
$ find . -type f -perm 0777 -print

```

Find the files without permission 777.

```shell
$ find / -type f ! -perm 777

```

Find SUID set files.

```shell
$ find / -perm /u=s

```

Find SGID set files.

```shell
$ find / -perm /g=s

```

Find Read Only files.

```shell
$ find / -perm /u=r

```

Find Executable files.

```shell
$ find / -perm /a=x

```

### Owners and Groups

Find single file based on user

```shell
$ find / -user root -name tecmint.txt

```

Find all files based on user

```shell
$ find /home -user tecmint

```

Find all files based on group

```shell
$ find /home -group developer

```

Find particular files of user

```shell
$ find /home -user tecmint -iname "*.txt"

```

### Multiple filenames

```shell
$ find . -type f \( -name "*.sh" -o -name "*.txt" \)

```

Find files with.shand.txtextensions

### Multiple dirs

```shell
$ find /opt /usr /var -name foo.scala -type f

```

Find files with multiple dirs

### Empty

```shell
$ find . -type d -empty

```

Delete all empty files in a directory

```shell
$ find . -type f -empty -delete

```

## Find Date and Time

### Means

| Option | Description |
| --- | --- |
| `atime` | access time (last time fileopened) |
| `mtime` | modified time (last time filecontents was modified) |
| `ctime` | changed time (last time fileinode was changed) |

#### Example

| Option | Description |
| --- | --- |
| `-mtime +0` | Modified greater than 24 hours ago |
| `-mtime 0` | Modified between now and 1 day ago |
| `-mtime -1` | Modified less than 1 day ago (same as `-mtime 0` ) |
| `-mtime 1` | Modified between 24 and 48 hours ago |
| `-mtime +1` | Modified more than 48 hours ago |
| `-mtime +1w` | Last modified more than 1 week ago |
| `-atime 0` | Last accessed between now and 24 hours ago |
| `-atime +0` | Accessed more than 24 hours ago |
| `-atime 1` | Accessed between 24 and 48 hours ago |
| `-atime +1` | Accessed more than 48 hours ago |
| `-atime -1` | Accessed less than 24 hours ago (same as `-atime 0` ) |
| `-ctime -6h30m` | File status changed within the last 6 hours and 30 minutes |

### Examples

Find last 50 days modified files

```shell
$ find / -mtime 50

```

find last 50 days accessed files

```shell
$ find / -atime 50

```

find last 50-100 days modified files

```shell
$ find / -mtime +50 âmtime -100

```

find changed files in last 1 hour

```shell
$ find / -cmin -60

```

find modified files in last 1 hour

```shell
$ find / -mmin -60

```

find accessed files in last 1 hour

```shell
$ find / -amin -60

```

## Find and

### Find and delete

Find and remove multiple files

```shell
$ find . -type f -name "*.mp3" -exec rm -f {} \;

```

Find and remove single file

```shell
$ find . -type f -name "tecmint.txt" -exec rm -f {} \;

```

Find and delete 100mb files

```shell
$ find / -type f -size +100m -exec rm -f {} \;

```

Find specific files and delete

```shell
$ find / -type f -name *.mp3 -size +10m -exec rm {} \;

```

### Find and replace

Find all files and modify the contentconsttolet

```shell
$ find ./ -type f -exec sed -i 's/const/let/g' {} \;

```

Find readable and writable files and modify the contentoldtonew

```shell
$ find ./ -type f -readable -writable -exec sed -i "s/old/new/g" {} \;

```

See also:sed cheatsheet

### Find and rename

Find and suffix (added.bak)

```shell
$ find . -type f -name 'file*' -exec mv {} {}.bak\;

```

Find and rename extension (.html=>.gohtml)

```shell
$ find ./ -depth -name "*.html" -exec sh -c 'mv "$1" "${1%.html}.gohtml"' _ {} \;

```

### Find and move

```shell
$ find . -name '*.mp3' -exec mv {} /tmp/music \;

```

Find and move it to a specific directory (/tmp/music)

### Find and copy

```shell
$ find . -name '*2020*.xml' -exec cp -r "{}" /tmp/backup \;

```

Find matching files and copy to a specific directory (/tmp/backup)

### Find and concatenate

Merge all csv files in the download directory intomerged.csv

```shell
$ find download -type f -iname '*.csv' | xargs cat > merged.csv

```

Merge all sorted csv files in the download directory intomerged.csv

```shell
$ find download -type f -iname '*.csv' | sort | xargs cat > merged.csv

```

### Find and sort

Find and sort in ascending

```shell
$ find . -type f | sort

```

find and sort descending

```shell
$ find . -type f | sort -r

```

### Find and chmod

Find files and set permissions to 644.

```shell
$ find / -type f -perm 0777 -print -exec chmod 644 {} \;

```

Find directories and set permissions to 755.

```shell
$ find / -type d -perm 777 -print -exec chmod 755 {} \;

```

### Find and compress

Find all.javafiles and compress it intojava.tar

```shell
$ find . -type f -name "*.java" | xargs tar cvf java.tar

```

Find all.csvfiles and compress it intocheatsheets.zip

```shell
$ find . -type f -name "*.csv" | xargs zip cheatsheets.zip

```

