
<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { SIZE } from './custom-physics.js';
	/** @type {import('svelte-cubed').Position} */
	export let position;
	/** @type {import('svelte-cubed').Rotation} */
	export let rotation;
</script>

<SC.Group {position} {rotation}>
	<SC.Mesh
		geometry={new THREE.PlaneGeometry(SIZE * 2, SIZE * 2)}
		material={new THREE.MeshStandardMaterial({
			color: 0x111111
		})}
		rotation={[-Math.PI / 2, 0, 0]}
	/>
	<SC.Primitive
		object={new THREE.GridHelper(SIZE *2 , 1, 0xffffdd, 0xffffdd)}
		position={[0, 0.001, 0]}
	/>
</SC.Group>
