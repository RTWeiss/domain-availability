function checkNames(names) {
  $.get('/check/' + names.join(","), function(data) {
    if(data.ApiResponse.CommandResponse[0].DomainCheckResult !== undefined) {
      data.ApiResponse.CommandResponse[0].DomainCheckResult.forEach(function(result) {
        var splitbydots = result.$.Domain.split(".", 2);
        var name = splitbydots[0];
        var TLD = splitbydots[1];
        if(splitbydots.length > 2) {
          for(var i = 2; i < splitbydots.length; i++) {
            TLD += "." + splitbydots[i];
          }
        }

        var box = $("." + TLD).text(result.$.Domain);
        if(result.$.Available == "true") {
          box.removeClass("unknown").addClass("available");
        } else if(result.$.Available == "false") {
          box.removeClass("unknown").addClass("unavailable");
        } else {
          console.log("whut", result);
        }
      });
    } else {
      console.error("data.ApiResponse.CommandResponse[0].DomainCheckResult is undefined", data);
    }
  });
}
$(document).ready(function() {
  var tlds = [];
  $.get('/tlds', function(tldlist) {
    tlds = tldlist;
    for(var tld in tldlist) {
      if(tldlist.hasOwnProperty(tld)) {
        var box = $("<span>")
          .addClass('tld')
          .addClass('unknown')
          .addClass(tld)
          .html('<b>.' + tld + '</b>');
        $(".results").append(" ").append(box);
      }
    }
  });
  $('#name').on('blur', function(evt) {
    var name = evt.currentTarget.value;
    for(var i = 0; i < tlds.length; i++) {
      var names = [];
      for(var j = 0; j + i < tlds.length && j-10 < i; j++) {
        names.push[i + j];
      }
      checkNames(names);
    }
    console.log('Looking up', name);
  });
});
