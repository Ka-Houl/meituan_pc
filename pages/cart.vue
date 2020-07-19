<template>
	<div class="page-cart">
	  <el-row>
	  	<el-col 
	  		v-if="cartList.length"
	  		:span="24"
	  		class="m-cart">
	  		<list :cart-data="cartList" />
	  		<p>
	  			应付金额：<em class="money">￥{{ total }}</em>
	  		</p>
	  		<div class="post">
	  			<el-button type="primary" @click="handleSubmit">
	  				提交订单
	  			</el-button>
	  		</div>
	  	</el-col>
	  	<el-col 
	  		v-else
	  		:span="24"
	  		class="empty">
	  		购物车为空
	  	</el-col>
	  </el-row>
	</div>
</template>

<script>
import list from '@/components/cart/list.vue';
export default {
	components: {
		list
	},
	data() {
		return {
			cartList: []
		}
	},
	computed: {
		total: function() {
			let total = 0;
			this.cartList.forEach(item => {
				total += item.price * item.count
			})

			return total;
		}
	},
	methods: {
		handleSubmit: async function() {
			let { status, data: {code, id} } = await this.$axios.post('/order/createOrder', {
				count: this.cartList[0].count,
				price: this.cartList[0].price,
				id: this.cartNo
			})

			if (status === 200 && code === 0) {
				this.$alert(`恭喜您已经成功下单，您的订单号为：${id}`, '下单成功', {confirmButtonText: '确定',
					callback: action => {
						location.href= '/order'
					}
				})
			}
		}
	},
	async asyncData(ctx) {
		let { status, data: {code, data: {name, price}}} = await ctx.$axios.post('/cart/getCart', {
			id: ctx.query.id
		})

		if (status === 200 && code === 0 && name) {
			return {
				cartList: [{
					name,
					price,
					count: 1
				}],
				cartNo: ctx.query.id
			}
		}
	}
}
</script>

<style lang="scss">
@import "@/assets/css/cart/index.scss";
</style>