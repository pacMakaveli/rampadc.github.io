# README #
## Quick summary ##
The purpose of this repository is to maintain an up-to-date database for use in the EN15 Data View web application.
## Tools ##
#### Mongoose ####
[Mongoose](https://www.cesanta.com/products) is a free and light-weight local webserver. It is necessary for the compilation of the database due to one of the libraries being reliant on Web Workers. Tool included in en15db/mongoose.
#### Git client ####
[Git](https://git-scm.com/) is a version-control system. Bitbucket is a free unlimited repository hosting option for Git and thus it was chosen for the task of hosting the databases. This means that there is absolutely no server costs and that we always have a backup of our last database via the version control system.

To update the database, Git is required. Download Git with the link above. If you are on Windows, you could use [TortoiseGit](https://tortoisegit.org/) to not having to use the command-line. On a Mac, [SourceTree](https://www.sourcetreeapp.com/) is a good option. For Linux, learn to use the command-line interface. It's best if you familiarize yourself with Git. There are videos online that can help you with this.
#### Scripts ####
Additionally, to pull data down from the server, you will need some scripts. These are located in the en15db/dbScraper folder. Use the bookmark script for easy retrieval. Remember to read the README file there.

## Setting Up ##
0. Fork the repository. 
1. Install the Git client and your platform's GUI Git tool
2. Clone this repository down into a folder on your computer
3. Edit *mongoose.conf* and point the web root to the web root folder inside the cloned repository on your computer. Start *mongoose*. 
4. Sign in to the game, select the world to retrieve data. Read the script's README and start the next part.

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
10. Commit update and push.