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


	for(var i = 0; i < (scene.children).length; i++){
		scene.children[i].translateY(Yvalue);
		scene.children[i].translateX(Xvalue);
		
		if(scene.children[i].position.x <= -6 || scene.children[i].position.x >= 6){
			if(Xvalue > 0){
				Xvalue += .01
			}else{
				Xvalue += -.01
			}
			Xvalue = Xvalue * -1;
		}
		if(scene.children[i].position.y >= 4 || scene.children[i].position.y <= -4){
			if(Yvalue > 0){
				Yvalue += .01
			}else{
				Yvalue += -.01
			}
			Yvalue = Yvalue * -1;
		}
	}
	console.log(Math.abs(Yvalue) + Math.abs(Xvalue));

	if (Math.abs(Yvalue) + Math.abs(Xvalue) > 1){
		var cubeGeo = new THREE.BoxGeometry(1,1,1);
		var colorCube = new THREE.MeshBasicMaterial( { color: 0x0fffff } );
		var Npuck = new THREE.Mesh( cubeGeo, colorCube);
		Npuck.position.set(1,1,1);
		scene.add(Npuck);
		
		if(Xvalue >= 0){
			Xvalue = .01
		}else{
			Xvalue = -.01
		}
		if(Yvalue >= 0){
			Yvalue = .01
		}else{
			Yvalue = -.01
		}
		
	}



	renderer.render( scene, camera );
}

animate();
