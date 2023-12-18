import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const puck = new THREE.Mesh( geometry, material );
scene.add( puck );

camera.position.z = 5;
var Xvalue = 0.03;
var Yvalue = 0.01;
function animate() {
	requestAnimationFrame( animate );


	puck.translateY(Yvalue);
	puck.translateX(Xvalue);

	var pos = puck.position;
	console.log(pos.x);
	console.log(pos.y);
	if(pos.x <= -75 || pos.x >= 75){
		Xvalue = Xvalue * -1;
	}
	if(pos.y >= 75 || pos.y <= -75){
		Yvalue = Yvalue * -1;
	}



	renderer.render( scene, camera );
}

animate();
