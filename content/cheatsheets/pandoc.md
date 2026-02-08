# Pandoc

> [Pandoc](https://pandoc.org) is a document converter, this pandoc cheat sheet contains pandoc commands and some common pandoc tricks.

Category: Linux Command

## Getting Started

### Pandoc Usage

Syntax

```shell
$ pandoc -s [source file] -o [output file]

```

## Pandoc examples

### LaTeX to MS Word

Simple .tex to .docx

```shell
$ pandoc -s file.tex -o file.docx

```

.tex to .docx with default citations

```shell
$ pandoc -s file.tex --citeproc --bibliography=bib_library.bib -o file.docx

```

.tex to .docx with specific citations

```shell
$ pandoc -s file.tex --citeproc --bibliography=bib_library.bib --csl=apa.csl -o file.docx

```

Get.cslfile fromhere

.tex to .docx with cross references

```shell
$ pandoc -s file.tex --filter pandoc-crossref -o file.docx

```

Get the filterpandoc-crossreffromhere

## Also see

- pandoc examples

