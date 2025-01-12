// DrawRectangle.js
function main() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }
  
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');





    // *** STEP ONE CODE HERE: ***
  
    // ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set a blue color
    // ctx.fillRect(120, 10, 150, 150);       // Fill a rectangle with the color




    // *** STEP TWO CODE HERE: ***

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // var v1 = new Vector3([2.25, 2.25, 0]);

    // drawVector(v1, 'red');

    // STEP THREE/FOUR CODE HERE:
    document.getElementById("draw-button").addEventListener("click", handleDrawEvent);

    // STEP FIVE CODE HERE:
    document.getElementById("draw-button2").addEventListener("click", handleDrawOperationEvent);
  }
  
  function handleDrawEvent() {
    // Retrieve the <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }
  
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');
  
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Get the values from the input fields
    var x = parseFloat(document.getElementById('x-coordinate').value);
    var y = parseFloat(document.getElementById('y-coordinate').value);

    // Get the values from the other input fields
    var x2 = parseFloat(document.getElementById('x-coordinate2').value);
    var y2 = parseFloat(document.getElementById('y-coordinate2').value);

    // Instantiate vectors
    var v1 = new Vector3([x, y, 0]);
    var v2 = new Vector3([x2, y2, 0]);

    // Draw vectors :D
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
  }

  function drawVector(v, color) {
    var canvas = document.getElementById('example');
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }
  
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Scale coordinates
    var x = v.elements[0] * 20;
    var y = v.elements[1] * 20;
  
    // Line specs
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
  
    // Draw vector
    ctx.beginPath();
    ctx.moveTo(200, 200); // Start at the center
    ctx.lineTo(200 + x, 200 - y); // Draw to the vector's end point
    ctx.stroke();
  }

  function handleDrawOperationEvent(v, color)  {
    // Clear
    var canvas = document.getElementById('example');
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }
  
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Read values
    var x = parseFloat(document.getElementById('x-coordinate').value);
    var y = parseFloat(document.getElementById('y-coordinate').value);
    var x2 = parseFloat(document.getElementById('x-coordinate2').value);
    var y2 = parseFloat(document.getElementById('y-coordinate2').value);

    // Read operation & scalar
    var operation = document.getElementById('sel-operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);

    // Instantiate and draw vectors
    var v1 = new Vector3([x, y, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, 'red');
    drawVector(v2, 'blue');

    // OPERATE!
    if (operation == 'add') {
      var v3 = new Vector3(v1.elements).add(v2);
      drawVector(v3, 'green');
    } 
    else if (operation == 'sub') {
      var v3 = new Vector3(v1.elements).sub(v2);
      drawVector(v3, 'green');
    } 
    else if (operation == 'mul') {
      var v3 = new Vector3(v1.elements).mul(scalar);
      drawVector(v3, 'green');
      var v4 = new Vector3(v2.elements).mul(scalar);
      drawVector(v4, 'green');
    }
    else if (operation == 'div') {
      var v3 = new Vector3(v1.elements).div(scalar);
      drawVector(v3, 'green');
      var v4 = new Vector3(v2.elements).div(scalar);
      drawVector(v4, 'green');
    }
    else if (operation == 'mag') {
      var mag1 = v1.magnitude();
      var mag2 = v2.magnitude();
      console.log('Magnitude of v1: ' + mag1);
      console.log('Magnitude of v2: ' + mag2);
    }
    else if (operation == 'norm') {
      var v3 = new Vector3(v1.elements).normalize();
      drawVector(v3, 'green');
      var v4 = new Vector3(v2.elements).normalize();
      drawVector(v4, 'green');
    }
    else if (operation == 'angle') {
      var angle = angleBetween(v1, v2);
      console.log(angle);
    }
    else if (operation == 'area') {
      var area = areaTriangle(v1, v2);
      console.log("Area of the triangle: " + area);
    }
  }

  function angleBetween(v1, v2) {
    if (v1.magnitude() == 0 || v2.magnitude() == 0) {
      console.log('Cannot compute angle with zero vector');
      return;
    }
    const cosAlpha = (Vector3.dot(v1,v2)) / (v1.magnitude() * v2.magnitude());
    const radians = Math.acos(cosAlpha);
    return (radians * 180) / Math.PI;
  }

  function areaTriangle(v1, v2) {
    const cross = Vector3.cross(v1, v2);
    const mag = cross.magnitude();
    return mag / 2;
  }