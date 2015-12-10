# README #
## Quick summary ##
The purpose of this repository is to maintain an up-to-date database for use in the EN15 Data View web application.
## Tools ##
#### Mongoose ####
[Mongoose](https://www.cesanta.com/products) is a free and light-weight local webserver. It is necessary for the compilation of the database due to one of the libraries being reliant on Web Workers. To donwload the program, click on the link, click on "Mongoose Binary" and choose to download **Mongoose + PHP** package. If you're not on a Windows machine, I'm not sure which to download.
#### Git client ####
[Git](https://git-scm.com/) is a version-control system. Bitbucket is a free unlimited repository hosting option for Git and thus it was chosen for the task of hosting the databases. This means that there is absolutely no server costs and that we always have a backup of our last database via the version control system.

To update the database, Git is required. Download Git with the link above. If you are on Windows, you could use [TortoiseGit](https://tortoisegit.org/) to not having to use the command-line. On a Mac, [SourceTree](https://www.sourcetreeapp.com/) is a good option. For Linux, learn to use the command-line interface. It's best if you familiarize yourself with Git. There are videos online that can help you with this.
#### Scripts ####
Additionally, to pull data down from the server, you will need some scripts.

1. [Get All Villages](http://pastebin.com/yCdtDEjp)
2. [Get Players DB](http://pastebin.com/1GkXmbti)
3. [Get Players Achievements DB](http://pastebin.com/eGjUPABZ)
4. [Get Top 1000 Tribes](http://pastebin.com/At8UY28M)

These scripts are to be used as [Chrome Snippets](https://developers.google.com/web/tools/chrome-devtools/debug/snippets/?hl=en) and they must be run in the order as numbered.
## Setting Up ##
0. Sign-up at Bitbucket and send Smagl or lordCoca your Bitbucket username to be added to the maintenance group here.
1. Install the Git client and your platform's GUI Git tool
2. Clone this repository down into a folder on your computer
3. Download and extract Mongoose into its own folder. Navigate to this folder and open up *mongoose.conf*. If *mongoose.conf* does not exist, run the program, the configuration file should then be created. Then exit the program and make sure that it is terminated and not hiding in the tray.
4. Edit *mongoose.conf* and point the web root to the web root folder inside the cloned repository on your computer. Start *mongoose*. 
6. If you haven't done so, copy and paste the scripts into Chrome's Snippet. 
## Database Update Procedure ##
1. Open up Chrome, sign-in into your TW2 account and go into EN15
2. Run the snippets as numbered, wait until the snippets have completed running. It will prompt you to save the map, players, players achievements and tribes JSON files. These files has names that starts with a string of numbers showing the unix timestamp. These are not the final database files. Save them into a location on your computer but do not put it into the same folder as the cloned repository.
3. If *mongoose* is not started, start *mongoose*. Right-click the tray icon and click on "Go to my address: ...". This address will be dependent on your local settings. Once the page loads up, navigate into *Compiled_EN15* folder and click on *build.html*. 
4. Wait until the last database update time has shown up. Once it has, press F12 to get into the Developer Tools view. Click on Console to view output messages.
5. Click on *Choose Files* and select both the *players* and *playersAch* JSONs. Make sure that you will only select the two most recent ones. 
6. After selection, the build process will start. This is usually rather fast, under 4 minutes. However, as more players join the world, this process can last longer.
7. Once the build has completed, save the file into the Output folder of *Compiled_EN15* folder and overwrite the existing file.
8. Copy this file into db/en15/.
9. Copy the tribe and villages JSON files that was downloaded earlier into db/en15. Delete existing Tribes.json and Villages.json. Rename the newly copied files into Tribes.json and Villages.json accordingly.
10. Use Git to commit and push the update onto Bitbucket.

## What about the GUI? ##
The GUI is seprately maintained on lordCoca's own Github repository. Due to Github's limitation, it cannot be shared. Because Github provides a static webpage hosting and rendering service, the GUI is hosted for free, forever and will always function correctly as long as the database is updated correctly.

## Who do I talk to? ##
* Repo admin: Smaglaysia

## LordCoca's Plans for the Future that will never be realized ##
1. Switch database technology to MongoDB, creating Web API to enable creation of mobile apps and significantly reduce the search time on client side
2. Fully automate the database updating and building process. Update the database every hour to build up a sizeable database to build interactive graphs to plot out individual player's activity time, in turn estimate their onlines times.
3. Use villages, tribes and combined_PA database to build a fully interactive 3D map that has all features of the current data viewer, as well as drawing tool for a mass attack planner.

The technology is there. The resources are available. It just won't ever happen.