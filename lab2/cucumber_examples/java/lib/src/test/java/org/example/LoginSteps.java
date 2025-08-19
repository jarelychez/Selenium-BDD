package org.example;
import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import java.util.List;
public class LoginSteps {
WebDriver driver;
@Given("the user is on the login page")
public void user_is_on_login_page() {
// Set path to chromedriver executable
//System.setProperty("webdriver.chrome.driver", "path_to_chromedriver");
ChromeOptions options = new ChromeOptions();
options.addArguments("--disable-web-security");
options.addArguments("--allow-running-insecure-content");
options.addArguments("--disable-extensions");
options.addArguments("--remote-allow-origins=*");
driver = new ChromeDriver(options);
// Replace with your login page URL
driver.get("http://localhost:3000/login");
// Wait until the login form is present on the page
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.presenceOfElementLocated(By.name("login"))); // Adjust the element as necessary
}
@When("the user enters valid credentials")
public void enter_valid_credentials() {
driver.findElement(By.name("username")).sendKeys("user");
driver.findElement(By.name("password")).sendKeys("password");
driver.findElement(By.name("login")).click();
}
@Then("the user should be redirected to the dashboard")
public void redirect_to_dashboard() {
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
// Replace with your profile (dashboard) page URL
wait.until(ExpectedConditions.urlToBe("http://localhost:3000/Wrongprofile"));
String currentUrl = driver.getCurrentUrl();
System.out.println("Current URL: " + currentUrl);
WebElement element = driver.findElement(By.tagName("main"));
List<WebElement> elements = element.findElements(By.tagName("p"));
System.out.println("Located these <p> tags:");
for (WebElement e : elements) {
System.out.println(e.getText());
}
}
@After
public void closeBrowser() {
if (driver != null) {
driver.quit();
}
}
}
