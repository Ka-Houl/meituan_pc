<template>
	<div class="m-geo">
		<i class="el-icon-location">
			{{ $store.state.geo.position.city }}
		</i>
		<nuxt-link 
			class="changeCity"
			to="/changeCity">
			切换城市
		</nuxt-link>
		[廊坊 河北 固安]
	</div>
</template>