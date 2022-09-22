const isMob = () => window.innerWidth < 800 ? true : false;

const setupInitialCameraPosition = (camera) => {

    const lastPosition = sessionStorage.getItem('position');
    const lastOrientation = sessionStorage.getItem('rotation');

    //Default values
    const defaultZ = isMob() == true ? -6 : -9;
    const defaultX = isMob() == true ? -2 : -1.5;
    const defaultY = isMob() == true ? 0 : -0.25;

    camera.position.z = lastPosition ? JSON.parse(lastPosition).z : defaultZ;
    camera.position.x = lastPosition ? JSON.parse(lastPosition).x : defaultX;
    camera.rotation.y = lastOrientation ? JSON.parse(lastOrientation) : defaultY;
    
    return camera;
    
}

const enforceSpaceLimits = (camera) => {
    if(camera.position.z > 10) camera.position.z = 10;
    if(camera.position.z < -10) camera.position.z = -10;
    if(camera.position.x < -5) camera.position.x = -5;
    if(camera.position.x > 5) camera.position.x = 5;
    return camera
}

const updateCamera = (evt, camera) => {
    const key = evt.which || evt.keyCode;
    if(key == 40) camera.translateZ(0.3);
    if(key == 38) camera.translateZ(-0.3);
    if(key == 39) camera.rotation.y -= 0.05;
    if(key == 37) camera.rotation.y += 0.05;
    camera = enforceSpaceLimits(camera);
    return camera;
}

const moveMob = (key, camera, evt) => {
    if(window.movement) clearInterval(window.movement);
    const btns = document.querySelectorAll('.controlBTN');
    btns.forEach(item => item.classList.remove('active'));
    window.movement = setInterval(() => updateCamera({keyCode: key}, camera), 100);
    evt.target.classList.add('active');
}

const stopMoveMob = evt => {
    clearInterval(window.movement);
    evt.target.classList.remove('active');
}

//Save camara position and orientation before changing page
const capturePosition = (camera) => {
    sessionStorage.setItem('position', JSON.stringify(camera.position));
    sessionStorage.setItem('rotation', camera.rotation.y);
}

export { capturePosition, updateCamera, setupInitialCameraPosition, moveMob, stopMoveMob }