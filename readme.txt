--Readme document for KalaniBattson, kbattson@uci.edu, 53087316--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

9/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 1.5/2 Following good principles of mobile design
- 1.5/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?

~ 16 - 18 hours

3. What online resources did you consult when completing this assignment? (list specific URLs)

https://ionicframework.com/docs/components
https://angular.dev/guide/signals
https://www.npmjs.com/package/idb-keyval
mostly the ionic and angular docs, ionicons

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

N/A

5. Is there anything special we need to know in order to run your code?

N/A

--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?

I think if you want a sleep tracker app with ultimate customizability and every feature you could possibly want there is a million options so I definetely targeted the app design and features a towards a user who prioritizes simplicity, doesn't ask for their attention, and a lack of bloat.

7. Did you design your app specifically for iOS or Android, or both?

While I only tested on the emulator on the browser, it's designed for both as it doesn't use any device specific APIs or anything that could break on a particular OS.  It should scale well to different mobile interaces as there is no fixed widths for any particular device size.

8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?

There is a main logging page that allows the user to log bedtime and waketime for most recent night, with the ability to edit it until the next day, as well as the ability to add entries for the past in case they missed a day if they navigate to the history tab.  I wanted the day to day logging to be as seemless as possible so i had it be on the home page, but still wanted to allow users to retroactively add entries they may have missed.

9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

Below the cards for logging bedtime and wakeup on that particular day, there is a card that allows users to log sleepiness on a sliding scale as many times as they want per day.  It just takes two taps without having to navigate to an alternate tab so it's also quite seemless

10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?

There is a history tab with a list of past entries.  This seemed like the simplest way to store sleep data and allows the user to see all of their data with their sleepiness logged for each day without obscuring the details into a graph or large chart.

11. Which feature choose--using a native device resource, backing up logged data, or both?

Backed up logged data.

12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?

N/A

13. If you backed up logged data, where does it back up to?

Logged data is saved to indexedDB, which should work on web and device.  Everytime a piece of data is logged or removed, the full dataset is written to indexedDB. When the app starts or is reloaded the sleep service rebuilds the original data objects from the logs written to indexedDB.

14. How does your app implement or follow principles of good mobile design?

- The home page is very useful; it's where you log your current nights sleep data, in fact you never have to navigate off of it unless you want to check your history
- In history, you can delete entries in case of software bugs or duplicate/incorrect logging for any reason
- You may also add entries you've missed, with an "Uh oh" go back button on the top left to navigate back to history
- Buttons are ergnomically placed and the layout is very similar to what you would expect from a classic android or ios app
