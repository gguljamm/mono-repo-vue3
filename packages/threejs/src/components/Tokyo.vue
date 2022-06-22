<template>
  <div id="container"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from "@/assets/js/RoomEnviroment";

import { GLTFLoader } from '@/assets/js/GLTFLoader.js';
import { DRACOLoader } from '@/assets/js/DRACOLoader.js';

onMounted(() => {
  let mixer;

  const clock = new THREE.Clock();
  const container = document.getElementById( 'container' );

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( 500, 500 );
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild( renderer.domElement );

  const pmremGenerator = new THREE.PMREMGenerator( renderer );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xbfe3dd );
  scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

  const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
  camera.position.set( 5, 2, 8 );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 0.5, 0 );
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( '/libs/draco/gltf/' );

  const loader = new GLTFLoader();
  loader.setDRACOLoader( dracoLoader );
  loader.load( '/models/LittlestTokyo.glb', function ( gltf ) {

    const model = gltf.scene;
    model.position.set( 1, 1, 0 );
    model.scale.set( 0.01, 0.01, 0.01 );
    scene.add( model );

    mixer = new THREE.AnimationMixer( model );
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    animate();

  }, undefined, function ( e ) {

    console.error( e );

  } );


  window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  };
  function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    mixer.update( delta );

    controls.update();

    // stats.update();

    renderer.render( scene, camera );

  }
})
</script>

<style>
#container{
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
