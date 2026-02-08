# Selenium

> This cheat sheet is a crash course for Selenium beginners and help to get the idea about the basic concepts of Selenium.

Category: Programming

## Getting Started

### Initialize Browser Drivers

| Browser | Syntax |
| --- | --- |
| `Chrome` | WebDriver driver = new ChromeDriver(); |
| `Edge` | WebDriver driver = new EdgeDriver(); |
| `Firefox` | WebDriver driver = new FirefoxDriver(); |
| `Safari` | WebDriver driver = new SafariDriver(); |

{.show-header .left-text}

### Selenium Locators

| Locator | Syntax |
| --- | --- |
| `className` | driver.findElement(By.className (âkeyâ)) |
| `cssSelector` | driver.findElement(By.cssSelector(key")) |
| `id` | driver.findElement(By.id(key")) |
| `linkText` | driver.findElement(By.linkText(key")) |
| `name` | driver.findElement(By.name(âkey")) |
| `partialLinkText` | driver.findElement(By.partialLinkText(âkey")) |
| `tagName` | driver.findElement(By.tagName (âkeyâ)) |
| `xpath` | driver.findElement(By.xpath(âkey")) |

{.show-header .left-text}

### Navigate to URL

```shell
driver.get("https://www.example.com");

```

### Close all browser windows

```shell
driver.quit();

```

### Close the current browser window

```shell
driver.close();

```

### Navigation

| Description | Syntax |
| --- | --- |
| `Navigate to a new URL` | driver.navigate().to("https://www.newsite.com"); |
| `Go forward to the next page` | driver.navigate().forward(); |
| `Go back to the previous page` | driver.navigate().back(); |
| `Refresh the current page` | driver.navigate().refresh(); |

{.show-header .left-text}

### Frame Handling

| Description | Syntax |
| --- | --- |
| `Switch to a frame` | driver.switchTo().frame("frameId"); |
| `Switch back to the main content` | driver.switchTo().defaultContent(); |

{.show-header .left-text}

### Alerts/Pop-Ups

```shell
Alert alert = driver.switchTo().alert();

// Used to click on the âOKâ button of the alert.
alert.accept();

// Used when the âCancelâ button is clicked in the alert box.
alert.dismiss();

// Used to send text to an alert
alert.sendKeys("text");

// Used to capture the alert message.
alert().getText();

```

### Mouse and Keyboard Actions

```shell
Actions actions = new Actions(driver);

// Shifts the mouse pointer to the center of the element and click on it
actions.moveToElement(element).click().build().perform();

// Performs double click on the element
actions.doubleClick(element).perform();

// Drags the element from one point and drops to another
actions.dragAndDrop(source, target).perform();

// Sends a series of keys to the element
actions.sendKeys(element, "text").perform();

```

### Page Information

```shell
// Get the page title
driver.getTitle();

// Get the current page URL
driver.getCurrentUrl();

// Get the entire page source code
driver.getPageSource();

```

### Waits

```shell
// Explicit Wait :- These are conditional waits can be applied to satisfy a particular condition
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.elementToBeClickable(element));

```

```shell
// Implicit Wait :- Once the command is run, Implicit Wait remains for the entire duration for which the browser is open.
driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

```

```shell
// Fluent Wait :- Fluent Wait in Selenium marks the maximum amount of time for Selenium WebDriver to wait for a certain condition (web element) becomes visible. It also defines how frequently WebDriver will check if the condition appears before throwing the âElementNotVisibleExceptionâ.
FluentWait wait = new FluentWait(driver);
//Specify the timeout of the wait
wait.withTimeout(5000, TimeUnit.MILLISECONDS);
//Specify polling time
wait.pollingEvery(250, TimeUnit.MILLISECONDS);
//Specify what exceptions to ignore
wait.ignoring(NoSuchElementException.class)
//This is how we specify the condition to wait on.
wait.until(ExpectedConditions.alertIsPresent());

```

