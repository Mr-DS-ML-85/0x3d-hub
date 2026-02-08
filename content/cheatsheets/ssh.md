# SSH

> This quick reference cheat sheet provides various for using SSH.

Category: Linux Command

## Getting Started

### Connecting

Connect to a server (default port 22)

```shell
$ ssh [email protected]

```

Connect on a specific port

```shell
$ ssh [email protected] -p 6222

```

Connect via pem file (0400 permissions)

```shell
$ ssh -i /path/file.pem [email protected]

```

See:SSH Permissions

### Executing

Executes remote command

```shell
$ ssh [email protected] 'ls -l'

```

Invoke a local script

```shell
$ ssh [email protected] bash < script.sh

```

Compresses and downloads from a server

```shell
$ ssh [email protected] "tar cvzf - ~/source" > output.tgz

```

### SCP

Copies from remote to local

```shell
$ scp user@server:/dir/file.ext dest/

```

Copies between two servers

```shell
$ scp user@server:/file user@server:/dir

```

Copies from local to remote

```shell
$ scp dest/file.ext user@server:/dir

```

Copies a whole folder

```shell
$ scp -r user@server:/dir dest/

```

Copies all files from a folder

```shell
$ scp user@server:/dir/* dest/

```

Copies from a server folder to the current folder

```shell
$ scp user@server:/dir/* .

```

### Config location

| File Path | Description |
| --- | --- |
| `/etc/ssh/ssh_config` | System-wide config |
| `~/.ssh/config` | User-specific config |
| `~/.ssh/id_{type}` | Private key |
| `~/.ssh/id_{type}.pub` | Public key |
| `~/.ssh/known_hosts` | Known Servers |
| `~/.ssh/authorized_keys` | Authorized login key |

### SCP Options

| Options | Description |
| --- | --- |
| scp `-r` | Recursively copy entire directories |
| scp `-C` | Compresses data |
| scp `-v` | Printsverbose info |
| scp `-P` 8080 | Uses a specificPort |
| scp `-B` | Batch mode(Prevents password) |
| scp `-p` | Preserves times and modes |

### Config sample

```toml
Host server1
    HostName 192.168.1.5
    User root
    Port 22
    IdentityFile ~/.ssh/server1.key

```

Launch by alias

```shell
$ ssh server1

```

See: FullConfig Options

### ProxyJump

```shell
$ ssh -J proxy_host1 remote_host2

```

```shell
$ ssh -J user@proxy_host1 user@remote_host2

```

Multiple jumps

```shell
$ ssh -J user@proxy_host1:port1,user@proxy_host2:port2 user@remote_host3

```

### ssh-copy-id

```shell
$ ssh-copy-id user@server

```

Copy to alias server

```shell
$ ssh-copy-id server1

```

Copy specific key

```shell
$ ssh-copy-id -i ~/.ssh/id_rsa.pub user@server

```

## SSH keygen

### ssh-keygen

```shell
$ ssh-keygen -t rsa -b 4096 -C "[email protected]"

```

| - | - | - |
| --- | --- | --- |
|  | `-t` | Typeof key |
|  | `-b` | The number of bits in the key |
|  | `-C` | Provides a new comment |

{.left-text}

Generate an RSA 4096 bit key with email as a comment

### Generate

Generate a key interactively

```shell
$ ssh-keygen

```

Specify filename

```shell
$ ssh-keygen -f ~/.ssh/filename

```

Generate public key from private key

```shell
$ ssh-keygen -y -f private.key > public.pub

```

Change comment

```shell
$ ssh-keygen -c -f ~/.ssh/id_rsa

```

Change private key passphrase

```shell
$ ssh-keygen -p -f ~/.ssh/id_rsa

```

### Key type

- rsa
- ed25519
- dsa
- ecdsa

### known_hosts

Search from known_hosts

```shell
$ ssh-keygen -F <ip/hostname>

```

Remove from known_hosts

```shell
$ ssh-keygen -R <ip/hostname>

```

### Key format

- PEM
- PKCS8

## Also see

- OpenSSH Config File Examples(cyberciti.biz)
- ssh_config(linux.die.net)

