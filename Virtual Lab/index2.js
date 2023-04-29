function convertCartesianToSpherical() {
    const x = Number(document.getElementById("x").value);
    const y = Number(document.getElementById("y").value);
    const z = Number(document.getElementById("z").value);
  
    const r = Math.sqrt(x * x + y * y + z * z);
    const theta = Math.atan2(y, x);
    const phi = Math.acos(z / r);
  
    const result = `r = ${r.toFixed(2)}, &theta; = ${theta.toFixed(2)}, &phi; = ${phi.toFixed(2)}`;
    document.getElementById("result").innerHTML = result;
  }

  function convertCartesianToCylindrical() {
    var x1 = parseFloat(document.getElementById("x").value);
    var y1 = parseFloat(document.getElementById("y").value);
    var z1 = parseFloat(document.getElementById("z").value);
    
    var rho = Math.sqrt(x1*x1 + y1*y1);
    var phi = Math.atan2(y1, x1);
    var z_cylindrical = z1;
    
    document.getElementById("result1").innerHTML = "Cylindrical coordinates: (" + rho.toFixed(2) + ", " + phi.toFixed(2) + ", " + z_cylindrical.toFixed(2) + ")";
  }