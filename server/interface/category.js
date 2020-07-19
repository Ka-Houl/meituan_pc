import Router from 'koa-router';
import axios from './utils/axios';

let router = new Router({
	prefix: '/category'
})

const sign = 'b735ab0b3e46d12ec07336ec5195a95f';

router.get('/crumbs', async (ctx) => {
	let { status, data: {areas, types}} = await axios.get('http://cp-tools.cn/categroy/crumbs', {
		params: {
			city: ctx.query.city.replace('市', '') || '北京',
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			areas,
			types
		}
	} else {
		ctx.body = {
			areas: [],
			types: []
		}
	}
})

export default router;