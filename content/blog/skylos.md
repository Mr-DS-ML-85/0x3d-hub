BANNER: img/logo.png

# 🔍 **Beginner’s Guide to Skylos — Python Static Analysis & Dead Code Cleanup**

🗓️ **February 9, 2026**

[Audio-Blog (Listen for 5 mins)](Audio/tmpb7wdaa9k.mp3)

**Skylos** is a Python static code analysis tool aimed at helping programmers eliminate _dead code_, identify _security vulnerabilities_, and optimize _code quality_. It is more than a linter, as it provides confidence scores, support for frameworks, and security/quality checks in one command-line tool. **[Github](https://github.com/duriantaco/skylos)**

---

## 🚀 What Skylos Does

Skylos is a tool for optimizing Python code by analyzing your code without executing it.

### Key Features

✔ **Unused code detection** — unused functions, imports, classes, variables, and unused parameters.  
✔ **Security vulnerabilities** (optional flags) — potential SQL injection or unsafe `eval/exec` usage.  
✔ **Code quality** — excessive nesting and high cyclomatic complexity.  
✔ Confidence scores — measure the likelihood of unused code. ([GitHub][1])

In addition to basic dead code analysis, Skylos offers:

- Searching for hardcoded **secrets/API keys** (optional).
    
- Identifying potential security holes such as `pickle.load`, `os.system(... shell=True)`, weak hashes, and more.
    
- Integration with VS Code or CI/CD pipelines. **[Github](https://github.com/duriantaco/skylos)**
    

---

## 🛠️ How to Install Skylos

Installing Skylos is a breeze using **pip**:

```bash
pip install skylos
```

If you need a particular version (for example, if you need it for backward compatibility):

```bash
pip install skylos==2.1.2
```

This will install the latest stable version of the Skylos CLI. 

---

## 🏁 Quick Start — Analyze Your Project

After installation, Skylos can be run on any Python project directory:

### 🔎 Basic Dead Code Scan

```bash
skylos /path/to/your/project
```

This will scan your code for unused functions, classes, imports, and more. ([GitHub][1])

### 🚨 Including Security Checks

```bash
skylos /path/to/your/project --danger
```

This will scan your code for dangerous patterns such as SQL injection and unsafe subprocess usage. ([GitHub][1])

### 🔐 Secret Scanning

```bash
skylos /path/to/your/project --secrets
```

This will scan your code for API keys and other secrets. **[Github](https://github.com/duriantaco/skylos)**

### 📊 Combined Scan

For a complete scan including quality and danger checks:

```bash
skylos /path/to/your/project --secrets --danger --quality
```

This is the best option for a deep code health scan. **[Github](https://github.com/duriantaco/skylos)**

---

## 🎛️ Confidence Levels

Skylos uses a **confidence value** (`--confidence`) to determine how aggressively it will mark code. Higher is more aggressive (fewer false positives), lower will show more potential unused code:

```bash
skylos /path/to/your/file --confidence 60   # more aggressive
skylos /path/to/your/file --confidence 20   # shows more potential unused code
```

This is useful when analyzing codebases that use frameworks such as Flask or Django, which can make static analysis difficult. ([GitHub][1])

---

## 🎮 Interactive Mode

Skylos also has an interactive mode for code cleanup:

```bash
skylos --interactive /path/to/your/project
```

This will launch an interactive interface where you can choose to remove or comment out flagged code. This is useful if you want to have control over the automated code cleanup process. ([GitHub][1])

---

## 🧪 Other Useful Options

|Command|Purpose|
|---|---|
|`--dry-run`|Shows what would be removed without changing code|
|`--json`|Outputs results in machine-readable JSON|
|`--no-default-excludes`|Include normally excluded folders|
|`--include-folder` / `--exclude-folder`|Fine-tune which directories Skylos scans|

---

## 🔁 Integrating Skylos with Your Workflow

### 🔹 CI/CD (GitHub Actions)

You can integrate Skylos in your CI pipeline to check code quality before merging or releasing. For example, you can use a GitHub Action to run Skylos and automatically fail the build if problems are found.

(This is already described in the Skylos README — you can apply it to your projects.) ([GitHub][1])

---

## 🧑‍💻 Editor Support

There’s a **VS Code extension** — install “Skylos” from the marketplace to get live feedback while coding. This is useful to immediately spot problems. **[Github](https://github.com/duriantaco/skylos)**

---

## 🧠 Tips for Best Results

- **Always manually inspect flagged code** — static analysis is not foolproof.
    
- Adjust confidence levels depending on your project type.
    
- Use `--dry-run` before automated changes.
    
- Integrate Skylos with pre-commit hooks for more strict code quality. **[Github](https://github.com/duriantaco/skylos)**
    

---

## 🏁 Summary

Skylos is a **flexible, powerful static code analysis tool for Python developers**. It helps remove unused code, identify risky code, and keep your code quality high — all from the command line or your editor. ([GitHub][1])

**Useful commands at a glance:**

```bash
pip install skylos
skylos /path/to/project
skylos /path/to/project --secrets --danger --quality
skylos --interactive /path/to/project
```

🚀 Try it out on your next Python project to detect unused code and make your codebase more maintainable! **[Skylos](https://github.com/duriantaco/skylos)**