<template>
	<dl class="product-info">
		<dt>
			<img :src="meta.img" alt="商品图片" />
		</dt>
		<dd>
			<h3>
				<nuxt-link :to="{ path: 'detail', query: {keyword: meta.name, type: meta.module}}">
					{{ meta.name }}
				</nuxt-link>
			</h3>
			 <el-rate
		    v-model="meta.rate"
		    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
		    disabled>
		  </el-rate>
		  <span v-if="meta.rate > 4" class="info-comment">
		  	很好
		  </span>
		  <span v-if="meta.rate > 3" class="info-comment">
		  	一般
		  </span>
		  <span v-else class="info-comment">
		  	很差
		  </span>
		  <span class="info-value">{{ meta.rate }}分</span>
		  <span class="info-comment-detail">
		  	{{ meta.comment }}人评论
		  </span>
		  <p>
		  	<span class="info-type">{{ meta.type }}</span>
		  	<span class="info-addr">{{ meta.addr }}</span>
		  </p>
		  <p>
		  	<span class="info-price">￥{{ meta.price }}起</span>
		  	<b>{{ meta.status }}</b>
		  </p>
		</dd>
	</dl>
</template>

<script>
export default {
	props: {
		meta: {
			type: Object,
			default() {
				return {}
			}
		}
	}
}
</script>









