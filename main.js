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

const group = new THREE.Group();
group.add(puck);
scene.add(group);
camera.position.z = 5;
var Xvalue = 0.03;
var Yvalue = 0.01;
function animate() {
	requestAnimationFrame( animate );


	for(var i = 0; i < (group.children).length; i++){
		group.children[i].translateY(Yvalue);
		group.children[i].translateX(Xvalue);
	}	

	var pos = puck.position;
	console.log(pos.x);
	console.log(Yvalue);
	if(pos.x <= -6 || pos.x >= 6){
		if(Xvalue > 0){
			Xvalue += .01
		}else{
			Xvalue += -.01
		}
		Xvalue = Xvalue * -1;
	}
	if(pos.y >= 4 || pos.y <= -4){
		if(Yvalue > 0){
			Yvalue += .01
		}else{
			Yvalue += -.01
		}
		Yvalue = Yvalue * -1;
	}

	if (Math.abs(Yvalue) + Math.abs(Xvalue) > 5){
		var cubeGeo = new THREE.BoxGeometry(1,1,1);
		var colorCube = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		var Npuck = new THREE.Mesh( cubeGeo, colorCube);
		Npuck.position.set(1,1,1);
		scene.add(Npuck);
		group.add(Npuck);
		if(Xvalue >= 0){
			Xvalue == .01
		}else{
			Xvalue == -.01
		}
		if(Yvalue >= 0){
			Yvalue == .01
		}else{
			Yvalue == -.01
		}
		
	}



	renderer.render( scene, camera );
}

animate();
