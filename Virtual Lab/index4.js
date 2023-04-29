function convertSphericalToCylindrical() {
    const r = Number(document.getElementById("r").value);
    const theta = Number(document.getElementById("theta").value);
    const phi = Number(document.getElementById("phi").value);
  
    const rho = r * Math.sin(phi);
    const z = r * Math.cos(phi);
  
    const result = `ρ = ${rho.toFixed(2)}, φ = ${theta.toFixed(2)}, z = ${z.toFixed(2)}`;
    document.getElementById("cylindrical-result").innerHTML = result;
  }
  
  function convertSphericalToCartesian() {
    const r = Number(document.getElementById("r").value);
    const theta = Number(document.getElementById("theta").value);
    const phi = Number(document.getElementById("phi").value);
  
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
  
    const result = `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}, z = ${z.toFixed(2)}`;
    document.getElementById("cartesian-result").innerHTML = result;
  }
  