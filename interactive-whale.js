var whale = (function() {
  var element = document.getElementById("whale");
  var parts = [];
  var delay = 10;
  var easy = 20;
  var maxspeed = 20;
  var fps = 60;
  var mouse = {x: 0, y: 0};

  function init() {
    document.addEventListener('mousemove', mousemove);
    setInterval(loop, 1000/fps);
  }

  function mousemove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function loop() {
    for (var i = 0; i < parts.length; i++) {
      var params = {mouse: mouse, part: parts[i]};
      setTimeout(transform, parts[i].z * delay, params);
    }
  }

  // --- CRITICAL FIX #1: ADD THE MISSING 'transform' FUNCTION ---
  function transform(params) {
    var dx = (params.mouse.x - params.part.x) / easy;
    var dy = (params.mouse.y - params.part.y) / easy;

    // Apply speed limits
    if (Math.abs(dx) > maxspeed) {
      dx = (dx > 0) ? maxspeed : -maxspeed;
    }
    if (Math.abs(dy) > maxspeed) {
      dy = (dy > 0) ? maxspeed : -maxspeed;
    }

    // Update part positions
    params.part.x += dx;
    params.part.y += dy;
  }
  // -------------------------------------------------------------

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  element.appendChild(svg);

  function createpart(x, y, z) {
    var part = {x: x, y: y, z: z};
    parts.push(part);
    return part;
  }

  function drawpart(part) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", part.x);
    circle.setAttribute("cy", part.y);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "#000000");
    svg.appendChild(circle);
    part.circle = circle;
  }

  function render() {
    requestAnimationFrame(render);
    for (var i = 0; i < parts.length; i++) {
      parts[i].circle.setAttribute("cx", parts[i].x);
      parts[i].circle.setAttribute("cy", parts[i].y);
    }
  }

  var x = 50;
  var y = 50;
  var z = 0;
  for (var i = 0; i < 20; i++) {
    var part = createpart(x + i * 10, y, z++);
    drawpart(part);
  }

  render();

  return {init: init};
})();
