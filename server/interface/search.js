import Router from 'koa-router';
import axios from './utils/axios';

let router = new Router({
	prefix: '/search'
})

const sign = 'b735ab0b3e46d12ec07336ec5195a95f'

router.get('/top', async (ctx) => {
	let { status, data: {top}} = await axios.get(`http://cp-tools.cn/search/top`, {
		params: {
			input: ctx.query.input,
			city: ctx.query.city,
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			top
		}
	} else {
		ctx.body = {
			top: []
		}
	}
})

router.get('/hotSearch', async (ctx) => {
	let { status, data: {result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
		params: {
			city: ctx.query.city,
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			result
		}
	} else {
		ctx.body = {
			result: []
		}
	}
})

router.get('/resultsByKeywords', async (ctx) => {
	let { status, data: {count, pois}} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
		params: {
			city: ctx.query.city,
			keyword: ctx.query.keyword,
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			count,
			pois
		}
	} else {
		ctx.body = {
			count: 0,
			pois: []
		}
	}
})

router.get('/products', async (ctx) => {
	let keyword = ctx.query.keyword || '旅游';
	let city = ctx.query.city || '北京';
	let { status, data: {product, more}} = await axios.get('http://cp-tools.cn/search/products', {
		params: {
			keyword,
			city,
			sign
		}
	})

	if ( status === 200) {
		ctx.body = {
			product,
			more: ctx.isAuthenticated() ? more : [],
			login: ctx.isAuthenticated()
		}
	} else {
		ctx.body = {
			product: {},
			more: ctx.isAuthenticated() ? more : [],
			login: ctx.isAuthenticated()
		}
	}
})

export default router;













