# Data Visualization Project

In this project we analyze a dataset containing information about baseball players performance. Specifically, regarding their average batting performance and number of home runs. We tried to determine if those variables depends on player's handedness, weight and height. Some data visualization techniques were employed to display our conclusions. We used the [dimple library](http://dimplejs.org/) in conjuction with [d3 library](https://d3js.org/) to load our dataset and display some beautiful charts.

# Running the Application

To run the application the user needs to close this repository or download its zip file in one directory. Inside this directory, in terminal, simply type:

* `node install -g bower` (if you don't have bower installed yet);
* `bower install` (to download third party javascript and css libraries);
* `python -m SimpleHTTPServer 8080` (to startup a webserver for our app).

After this, open `http://localhost:8080` in any modern browser (eg. Google Chrome)

# The Dataset

The analyzed dataset is a csv file: `data/baseball_data.csv`.

# The Conclusions

The conslusions draw by the charts presented on our app are: As we could see analysing the charts, player's handedness, height and weight really have an influence on its average performance. The most affected variable, according to players attributes, was the average number of home runs. Left handed players, shorter and heavier, according to the data, presented an expressive higher number of home runs, compared with other players. In contrast, both handed players, taller and lighter players, performed worse (again, according to the analysed data).