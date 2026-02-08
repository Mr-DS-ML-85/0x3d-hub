# SDKMAN!

> This cheatsheet provides the most commonly used SDKMAN! command line instructions

Category: Linux Command

## Getting Started

### Installing SDKMAN!

Download SDKMAN!

```shell
$ curl -s "https://get.sdkman.io" | bash

```

Install SDKMAN!

```shell
$ source "$HOME/.sdkman/bin/sdkman-init.sh"

```

Check the version

```shell
$ sdk version

```

Update

```shell
$ sdk update

```

Help

```shell
$ sdk help

```

### Installing and managing candidates

List all candidates

```shell
$ sdk list

```

List versions of a candidate

```shell
$ sdk list <candidate>

```

Install a candidate with the latest version

```shell
$ sdk install <candidate>

```

Install a candidate with specific version

```shell
$ sdk install <candidate> <version>

```

Temporarily switch between versions

```shell
$ sdk use <candidate> <version>

```

Permanently switch to version

```shell
$ sdk default <candidate> <version>

```

Display specific candidate version in use

```shell
$ sdk current <candidate>

```

Display all candidates versions in use

```shell
$ sdk current

```

Remove a candidate

```shell
$ sdk uninstall <candidate> <version>

```

