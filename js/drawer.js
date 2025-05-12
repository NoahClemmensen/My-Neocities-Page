let fromItem = false;

function onDocumentReady() {
  const table = $("#table");
  const drawer = $("#drawer");
  const drawerItems = $("#drawer ul li")
  const iframe = $("#screen_iframe");

  drawerItems.each(function (index, item) {
    $(item).on("mouseenter", function() {
      table.removeClass("animated");
      fromItem = true;
    })

    $(item).on("mouseleave", function() {
      fromItem = false;
    })
  })

  table.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
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
  });

  drawer.on("mouseleave", function() {
    table.removeClass("open")
  });

  $("a").on("click", function(e) {
    e.preventDefault();
    console.log("clicked");
    const href = $(this).attr("href");
    console.log(href);
    iframe.attr("src", href);
  })
}

$(document).ready(onDocumentReady);
