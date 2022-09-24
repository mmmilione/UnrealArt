import * as THREE from 'three';
import { capturePosition } from './handleCamera.js';
import artList from '../assets/data/art.js'

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const catchMouseClick = (evt, scene, camera, dev, devSign, faq) => {

    pointer.x = (evt.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(evt.clientY / window.innerHeight) * 2  + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for(let i = 0; i < intersects.length; i++){

        if(intersects[i].object.uuid == dev || intersects[i].object.uuid == devSign){
            capturePosition(camera);
            return window.open('https://mariomazzola-64e1a.web.app/', '_blank');
        }

        if(intersects[i].object.uuid == faq){
            capturePosition(camera);
            return window.location.href = "/FAQ";
        }

        const positionInArtList = artList.find(item => item.sceneID === intersects[i].object.uuid);
        if( positionInArtList ){
            capturePosition(camera);
            window.location.href = "/art/"+positionInArtList._id;
        }
        
    }
}

const catchMouseMove = (evt, scene, camera, dev, devSign, faq) => {

    pointer.x = (evt.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(evt.clientY / window.innerHeight) * 2  + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for(let i = 0; i < intersects.length; i++){

        const positionInArtList = artList.find(item => item.sceneID === intersects[i].object.uuid);

        if(intersects[i].object.uuid == dev || intersects[i].object.uuid == devSign){
            return document.body.style.cursor = "pointer";
        }

        else if(intersects[i].object.uuid == faq){
            return document.body.style.cursor = "pointer";
        }

        else if( positionInArtList ){
            return document.body.style.cursor = "pointer";
        }

        else {
            return document.body.style.cursor = "auto";
        }
        
    }
}

export { catchMouseClick, catchMouseMove }; 