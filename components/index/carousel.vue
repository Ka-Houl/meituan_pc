<template>
	<div class="carousel">
		<el-carousel height="240px">
			<el-carousel-item 
				v-for="item in list"
				:key="item.img">
				<img :src="item.img">
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					href: '#aaa',
					img: 'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg'
				},
				{
					href: '#bbb',
					img: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
				},				
				{
					href: '#ccc',
					img: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
				}
			]
		}
	}
}
</script>