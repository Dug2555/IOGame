import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
//const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//const cube2 = new THREE.Mesh( geometry2, material2 );
//scene.add( cube2 );

camera.position.z = 5;
var value = .01;
function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	//cube2.rotation.z += 0.01;
	//cube2.rotation.y += 0.01;
	
	//cube2.translateX(value);
	cube.translateY(value);

	renderer.render( scene, camera );
}

animate();
