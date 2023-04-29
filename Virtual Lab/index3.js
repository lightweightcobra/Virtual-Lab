function convertCylindricalToSpherical() {
    const rho = Number(document.getElementById("rho").value);
    const phi = Number(document.getElementById("phi").value);
    const z = Number(document.getElementById("z").value);
  
    const r = Math.sqrt(rho * rho + z * z);
    const theta = phi;
    const phi_spherical = Math.atan2(rho, z);
  
    const result = `r = ${r.toFixed(2)}, &theta; = ${theta.toFixed(2)}, &phi; = ${phi_spherical.toFixed(2)}`;
    document.getElementById("spherical-result").innerHTML = result;
  }
  
  function convertCylindricalToCartesian() {
    const rho = Number(document.getElementById("rho").value);
    const phi = Number(document.getElementById("phi").value);
    const z = Number(document.getElementById("z").value);
  
    const x = rho * Math.cos(phi);
    const y = rho * Math.sin(phi);
  
    const result = `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}, z = ${z.toFixed(2)}`;
    document.getElementById("cartesian-result").innerHTML = result;
  }
  