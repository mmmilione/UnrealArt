import * as THREE from 'three';
import wall from '../assets/materials/whitewall.jpeg'
import bottomWall from '../assets/materials/bottomWall.jpeg'
import wood from '../assets/materials/floor3.jpeg'
import ceiling from '../assets/materials/cieling5.jpeg'

const makeRoom = () => {
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000 
    );

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('white', 0);

    document.querySelector('#animationBox').appendChild(renderer.domElement);
    
    //Textures of the room
    const txFT = new THREE.TextureLoader().load(wall);
    const txFloor = new THREE.TextureLoader().load(wood);
    const txCeiling = new THREE.TextureLoader().load(ceiling);
    const txBottom = new THREE.TextureLoader().load(bottomWall);

    //Materials of the Room
    const materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial( {map: txBottom} )); //lateral
    materialArray.push(new THREE.MeshBasicMaterial( {map: txBottom} )); //lateral
    materialArray.push(new THREE.MeshBasicMaterial( {map: txCeiling} )); //Ceiling
    materialArray.push(new THREE.MeshBasicMaterial( {map: txFloor} )); //Floor
    materialArray.push(new THREE.MeshBasicMaterial( {map: txFT } )); //front
    materialArray.push(new THREE.MeshBasicMaterial( {map: txFT} )); //back
    
    //Apply materials to the inner side of the BOX
    for(let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
    }

    //Make the Cube
    const geometry = new THREE.BoxGeometry( 20, 8, 30 );
    const room = new THREE.Mesh( geometry, materialArray );
    scene.add(room);

    return { scene, camera, renderer, room }
    
}

export default makeRoom;