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

const visibleHeightAtZDepth = (depth, camera) => {
	// vertical fov in radians
	const vFOV = camera.fov * Math.PI / 180;

	// Math.abs to ensure the result is always positive
	return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

var mesh, controls;


var screenDepth;
screenDepth = findScreenDepth(camera, renderer)

const redGeom =  new THREE.BoxGeometry( 5,5,5 );
const redMat = new  THREE.MeshNormalMaterial({wireframe: true});
const redMesh = new THREE.Mesh(redGeom, redMat);
redMesh.position.set(0 /*px*/, 0, -screenDepth + 20);
redMesh.scale.set(5,5,5)
scene.add(redMesh, camera);

function findScreenDepth(camera, renderer) {
	const { near, far } = camera;
	const { height: physicalViewHeight } = renderer.getDrawingBufferSize();
	console.log(window.innerHeight, physicalViewHeight);
	const threshold = 0.00000000000001;

	return _findScreenDepth(near, far);

	function _findScreenDepth(near, far) {

		 const midpoint = (far - near) / 2 + near;
		 const midpointHeight = visibleHeightAtZDepth(-midpoint, camera);

		 if (Math.abs(physicalViewHeight / midpointHeight - 1) <= threshold)
			  return midpoint;

		 if (physicalViewHeight < midpointHeight)
			  return _findScreenDepth(near, midpoint);else
		 if (physicalViewHeight > midpointHeight)
			  return _findScreenDepth(midpoint, far);else
		 if (midpointHeight == physicalViewHeight) // almost never happens
			  return midpoint;
	}
}


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const puck = new THREE.Mesh( geometry, material );
scene.add( puck );

camera.position.z = 20;
var Xvalue = 0.03;
var Yvalue = 0.01;
function animate() {
	requestAnimationFrame( animate );


	puck.translateY(Yvalue);
	puck.translateX(Xvalue);

	var pos = puck.position;
	console.log(pos.x);
	console.log(window.innerWidth)
	redMesh.position.x += ADD;
     if (redMesh.position.x <= (-window.innerWidth/2)+20|| redMesh.position.x >= (window.innerWidth/2)-20) {
          ADD *= -1;
     }



	renderer.render( scene, camera );
}

animate();
