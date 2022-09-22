import * as THREE from 'three';
import artList from '../assets/data/art.js'

const makeFrame = (scene, frameColor, frameW, frameY, frameZ, isArt, side, i, positionX, positionY, positionZ) => {
    
    //Make a 3d frame
    let framePositionX, framePositionZ, framePositionY;
    const frameGeometry = new THREE.BoxGeometry( frameW, frameY, frameZ );
    const frameMaterial = new THREE.MeshBasicMaterial( {color: frameColor, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4 } );
    const frame = new THREE.Mesh( frameGeometry, frameMaterial );
    
    if(isArt == true){ //For art hanging on lateral walls
        framePositionX = side == "right" ? -9.9 : 9.9;
        framePositionZ = -12 + (i * 4);
        framePositionY = 1;
    }else{ //For Signs
        framePositionX = positionX;
        framePositionY = positionY;
        framePositionZ = positionZ;
    }
    
    frame.position.set(framePositionX, framePositionY, framePositionZ);
    scene.add(frame);
}

const makeSign = (scene, positionX, positionY, positionZ, picture) => {
    const signZ = positionZ > 0 ? positionZ - 0.2 : positionZ + 0.2;
    makeFrame(scene, "black", 2, 2, 0.2, false, null, null, positionX, positionY, positionZ);
    const sign = make3Dobj(1.5, 1.5, 0.05, picture, positionX, positionY, signZ, scene);
    return sign;
}

const makeArt = (i, side, scene) => {
    
    makeFrame(scene, "white", 0.3, 3, 3, true, side, i);

    //Depending on which wall the painting goes, setup art variables
    const picsIndex = side == "right" ? i : i + 7;
    const positionX = side == "right" ? -9.7 : 9.7;
    const positionZ = -12 + (i * 4);

    //Make 3d painting
    const artGeometry = new THREE.BoxGeometry( 0.1, 2, 2 );
    const artMaterial = new THREE.TextureLoader().load(artList[picsIndex].picture);
    const texture = new THREE.MeshBasicMaterial( {map: artMaterial, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4} )
    const art = new THREE.Mesh( artGeometry, texture);
    art.position.set(positionX, 1, positionZ);
    scene.add(art);

    //update the artwork object in the list with the scene ID
    artList[picsIndex]['sceneID'] = art.uuid;
}

const make3Dobj = (geoWidth, geoHeight, geoDepth, picture, positionX, positionY, positionZ, scene) => {
    const geometry = new THREE.BoxGeometry( geoWidth, geoHeight, geoDepth );
    const material = new THREE.TextureLoader().load(picture);
    const texture = new THREE.MeshBasicMaterial( {map: material, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4} )
    const obj = new THREE.Mesh( geometry, texture);
    obj.position.set(positionX, positionY, positionZ);
    scene.add(obj);
    return obj.uuid;
}

export { makeArt, make3Dobj, makeSign, makeFrame }