import makeRoom from './room.js';
import { catchMouseClick, catchMouseMove } from './interactions.js';
import { moveMob, stopMoveMob, setupInitialCameraPosition, updateCamera } from './handleCamera.js';
import { makeArt, make3Dobj, makeSign, makeFrame } from './factory';

//Pictures for material
import infoPic from '../assets/materials/info.png'
import redTitle from '../assets/materials/title.png'
import doorPic from '../assets/materials/blackDoor.jpeg'
import windowPic from '../assets/materials/window.png'
import computerPic from '../assets/materials/computer2.png'
import ExplOne from '../assets/materials/explONE.png'
import ExplTwo from '../assets/materials/explTWO.png'
import devPic from '../assets/materials/dev.png'
import faqPic from '../assets/materials/faq.jpeg'
import madeInCuba from '../assets/materials/made.png'

let camera, scene, renderer;
let dev, devSign, faq;
let movement;

const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

const animate = () => {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
}

export const init3JS = () => {

    //Build Room
    const initRoom = makeRoom();
    renderer = initRoom.renderer;
    camera = initRoom.camera;
    scene = initRoom.scene;

    //Set Camara position 
    setupInitialCameraPosition(camera);

    //Set up mob controls
    const forward = document.querySelector('#forwardBTN');
    const back = document.querySelector('#backwardsBTN');
    const left = document.querySelector('#leftBTN');
    const right = document.querySelector('#rightBTN');

    if(forward){
        forward.addEventListener('touchstart', (evt) => moveMob(38, camera, evt));
        back.addEventListener('touchstart', (evt) => moveMob(40, camera, evt));
        left.addEventListener('touchstart', (evt) => moveMob(37, camera, evt));
        right.addEventListener('touchstart', (evt) => moveMob(39, camera, evt));
        forward.addEventListener('touchend', (evt) => stopMoveMob(evt));
        back.addEventListener('touchend', (evt) => stopMoveMob(evt));
        left.addEventListener('touchend', (evt) => stopMoveMob(evt));
        right.addEventListener('touchend', (evt) => stopMoveMob(evt));
    }

    //SETUP FRONT WALL
    makeSign(scene, -8, 2, -14.9, infoPic);  //Info Sign
    //Large Black Billboard
    makeFrame(scene, "black", 16, 6, 0.2, false, null, 0, 1.5, 0, -15);
    //Flat Pictures
    make3Dobj(4, 0.7, 0.2, redTitle, -3.5, 2, -14.9, scene); //Bilboard Title
    make3Dobj(7, 3, 0.4, ExplOne, -2, -0.5, -14.9, scene); //ExplainerOne
    make3Dobj(7, 4, 0.2, ExplTwo, 5.5, 0, -14.9, scene); //ExplainerTwo
    make3Dobj(2, 0.5, 0.1, madeInCuba, 0, -2, -14.7, scene); //ExplainerOne

    //Setup Back Wall
    make3Dobj(3, 6, 0.2, doorPic, 0, -1, 15, scene); //Door
    make3Dobj(3, 4, 0.2, windowPic, 6, 0, 15.1, scene); //Window1
    devSign = makeSign(scene, -3, 1, 14.9, computerPic); //DEV Sign
    faq = makeSign(scene, 3, 1, 14.9, faqPic); //FAQ Sign
    dev = make3Dobj(5, 4, 0.5, devPic, -7, 0, 15.1, scene); //Dev
    
    //Hang Paintings on the Wall, left and right
    for(let i = 0; i < 7; i++){
        makeArt(i, "right", scene);
        makeArt(i, "left", scene);
    }

    //Interact with objects (clicks and movements)
    document.addEventListener('click', (evt) => catchMouseClick(evt, scene, camera, dev, devSign, faq));
    document.addEventListener('mousemove', (evt) => catchMouseMove(evt, scene, camera, dev, devSign, faq));
    document.addEventListener('keydown', (evt) => updateCamera(evt, camera));

    //Animate
    return setInterval(() => animate(), 30)
}