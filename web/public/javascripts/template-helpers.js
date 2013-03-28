(function(H) {
  H.registerHelper('date', function(date) {
    if (typeof date !== 'string') return date;
    else return new Date(Date.parse(date));
  });
}(Handlebars));
