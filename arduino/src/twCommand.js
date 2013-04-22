// send simple commands to Arduino using twitter
var twit = require('twit'),
  T = new twit({
    consumer_key: '9yv5UnrPiGytziaiQOfFTg',
    consumer_secret: 'VakrbOUcPA2NQHlwbOJJ2IPLJBs4yqP9onywXWuE',
    access_token: '13205062-3qnJyAgBvbC4xK3T5WEkh0HszUJh2UVdJREhOVsG4',
    access_token_secret: 'DlBOvcm7p3V8VZAqZd2awegU0EpbVJUUaOpxtOxTo'
  });

var lastId = null,
  interval = 5200,
  timer = null,
  cmdCallback = null,
  options = {
    screen_name: 'Yang Piao',
    count: 10
  };
  // options = {
  //   q: 'from:yangpiao #test',
  //   count: 10
  // };

function getTweets() {
  // T.get('search/tweets', options, function(err, result) {
  //   if (!err) {
  //     var tweets = result.statuses;
  //     if (!tweets || !tweets.length) return;
  T.get('statuses/user_timeline', options, function(err, tweets) {
    if (!err) {
      if (!tweets || !tweets.length) return;
      var i = 0, len = tweets.length, t = tweets[0];
      lastId = t.id_str;
      while (!parse(t.text) && i < len - 1) {
        i++;
        t = tweets[i];
      }
    } else {
      console.log(err);
    }
  });
}

function start(callback) {
  if (callback) {
    cmdCallback = callback;
  }
  getTweets();
  timer = setInterval(function() {
    if (lastId) {
      options.since_id = lastId;
    }
    getTweets();
  }, interval);
}

function stop() {
  if (timer != null) {
    clearInterval(timer);
    timer = null;
  }
}

function parse(text) {
  if (!text || text.indexOf('#test') == -1) return false;
  var arr = text.split(/[, ]+/), pin, val, duration, i, len = arr.length;
  arr.forEach(function(a) {
    a.trim();
  });
  console.log(arr);
  for (i = 0; i < len; i++) {
    if (!isNaN(pin = parseInt(arr[i], 10))) {
      if (i == len) return false;
      val = '' + arr[i + 1];
      if (val.toLowerCase() === 'low') {
        val = 0;
      } else if (val.toLowerCase() === 'high') {
        val = 1;
      }
      if (i + 1 == len) duration = 0;
      else duration = parseInt(arr[i + 2], 10) || 0;
      break;
    }
  }

  cmdCallback && cmdCallback(pin, val, duration);
  return true;
}

module.exports = {
  T: T,
  start: start,
  stop: stop
};
