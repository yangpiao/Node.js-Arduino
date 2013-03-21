Arduino Control Center
======================

Intro
-----

Node powered app that collects sensor data and sends commands to Arduino.
[Node.js, Arduino, Express, MongoDB, Backbone, D3]

- Use Firmata and Node.js to control Arduino.
- Visualize sensors' data on an Express website.

Now the two parts (Arduino control & website) are together, i.e. they should be
running on the same machine. Future plan is to seperate these two parts: 
Arduino controller use some APIs to communicate with the website. I'm still
thinking about the whole thing.

