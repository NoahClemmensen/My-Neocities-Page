// javascript
// File: `js/pickup-able.js`
(function ($) {
  function makePickupAble($item, dropCallback) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Remove any old handlers on this element before attaching new ones
    $item.off(".pickup-able");

    $item.on("mousedown.pickup-able", function (e) {
      e.preventDefault();
      isDragging = true;

      // Get initial drag values
      const $originalParent = $item.parent();
      const originalStyles = {
        position: $item.css("position"),
        left: $item.css("left"),
        top: $item.css("top"),
        zIndex: $item.css("z-index"),
        cursor: $item.css("cursor"),
      };

      const startOffset = $item.offset();

      // Put the item in the body to fix z-index and positioning issues
      $item.appendTo("body");

      // Calculate offset between mouse position and item top-left corner
      offsetX = e.pageX - startOffset.left;
      offsetY = e.pageY - startOffset.top;

      // Set initial styles for dragging
      $item.css({
        position: "absolute",
        left: startOffset.left,
        top: startOffset.top,
        zIndex: 10000, // above #man
        cursor: "grabbing",
      });

      // Bind mousemove and mouseup to document to track dragging outside the item
      $(document)
        .on("mousemove.pickup-able", function (e2) {
          if (!isDragging) return;
          // Update item position based on mouse movement
          $item.css({
            left: e2.pageX - offsetX,
            top: e2.pageY - offsetY,
          });
        })
        .on("mouseup.pickup-able", function (e2) {
          isDragging = false;
          $(document).off(".pickup-able");

          // Call drop callback if provided
          if (typeof dropCallback === "function") {
            dropCallback($item, e2);
          }

          // Return item to its original parent
          if ($originalParent && $originalParent.length) {
            $originalParent.append($item);
          }

          // Restore original styles
          $item.css({
            position: originalStyles.position,
            left: originalStyles.left,
            top: originalStyles.top,
            zIndex: originalStyles.zIndex,
            cursor: originalStyles.cursor || "grab",
          });
        });
    });
  }

  // Public initializer: bind only to visible items in `#page-container`
  function initPickupAble() {
    $("#page-container .pickup-able").each(function () {
      makePickupAble($(this), function () {
        // optional drop handling
      });
    });
  }

  // Expose to global scope so `notebook.js` can call it
  window.initPickupAble = initPickupAble;

  // Initial bind for first page
  $(function () {
    initPickupAble();
  });
})(jQuery);
