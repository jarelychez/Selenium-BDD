package com.example;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import java.util.List;
import java.time.Duration;

public class TestScript {
    private static final String URL = "http://localhost:3000"; //"https://www.selenium.dev/";
    public static void main(String[] args) {
        // Set path to chromedriver executable
        // System.setProperty("webdriver.chrome.driver", "/Users/stever/Temp/chromedriver-mac-arm64/chromedriver");
        // Initialize ChromeOptions
        ChromeOptions options = new ChromeOptions();
        //options.addArguments("--remote-debugging-port=9222");
        options.addArguments("--disable-web-security");
        options.addArguments("--allow-running-insecure-content");
        options.addArguments("--disable-extensions"); // Disable extensions
        options.addArguments("--remote-allow-origins=*");
        //options.addArguments("--allowed-ips=127.0.0.1"); // Allow connections from localhost

        // Log ChromeOptions
        System.out.println("ChromeOptions: " + options.toString());

        // Initialize ChromeDriver
        WebDriver driver = null;
        try {
            driver = new ChromeDriver(options);

            // Open the URL
            System.out.println("Navigating to URL:" + URL);
            driver.get(URL);
            System.out.println("Current URL: " + driver.getCurrentUrl());

            // Wait for specific text (optional, depending on your scenario)
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            String textToFind = "Welcome to MyApp!";
            wait.until(ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), textToFind));
            System.out.println("The page contains the text: '" + textToFind + "'");


            // Get a specific element (replace with your desired locator)
            WebElement element = driver.findElement(By.tagName("main")); // replace with appropriate locator

            // Get all paragraphs within the element
            List<WebElement> elements = element.findElements(By.tagName("p"));
            System.out.println("located these <p> tags:");
            for (WebElement e : elements) {
                System.out.println(e.getText());
            }

        } catch (Exception e) {
            System.err.println("An error occurred during the execution of the script.");
            e.printStackTrace();
        } finally {
            // Ensure the browser is closed
            if (driver != null) {
                driver.quit();
            }
            System.exit(0);
        }
    }
}
