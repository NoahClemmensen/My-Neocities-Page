let fromItem = false;
let inactivityTimer;

function StartInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(function() {
    $("#table").addClass("eyes");
    $("#table").addClass("from-eyes");
  }, 10000);
}

function StopInactivityTimer() {
  $("#table").removeClass("eyes");
  $("#table").removeClass("from-eyes");
  clearTimeout(inactivityTimer);
}

function onDocumentReady() {
  const table = $("#table");
  const drawer = $("#drawer");
  const drawerItems = $("#drawer ul li")
  const iframe = $("#screen_iframe");

  drawerItems.each(function (index, item) {
    $(item).on("mouseenter", function() {
      table.removeClass("animated");
      StopInactivityTimer();
      fromItem = true;
    })

    $(item).on("mouseleave", function() {
      fromItem = false;
    })
  })

  table.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
    if (table.hasClass("eyes")) {
      table.addClass("from-eyes");
    }

    if (table.hasClass("eyes")) {
      table.removeClass("eyes");
      StartInactivityTimer();
    }

    if (table.hasClass("open")) {
      $("#drawer ul").addClass("show");
    } else {
      $("#drawer ul").removeClass("show");
    }
  });

  drawer.on("mouseenter", function() {
    table.addClass("open")
    if (fromItem) {
      fromItem = false;
    } else {
      table.addClass("animated");
    }
    StopInactivityTimer();
  });

  drawer.on("mouseleave", function() {
    table.addClass("animated");
    table.removeClass("open")

    StartInactivityTimer();
  });

  $("a").on("click", function(e) {
    e.preventDefault();
    const href = $(this).attr("href");
    iframe.attr("src", href);
    togglePc(true);
  })

  StartInactivityTimer();
}

$(document).ready(onDocumentReady);
