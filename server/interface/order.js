import Router from 'koa-router';
import axios from './utils/axios';
import Cart from '../dbs/models/cart';
import Order from '../dbs/models/order';
import md5 from 'crypto-js/md5';

let router = new Router({
	prefix: '/order'
})

router.post('/createOrder', async (ctx) => {
	let {id, price, count} = ctx.request.body
	let time = Date();
	let orderID = md5(Math.random() * 1000 + time).toString()
	if(!ctx.isAuthenticated()) {
		ctx.body = {
			code: -1,
			msg: '请登录'
		}
	} else {
		let foundCart = await Cart.findOne({cartNo: id});
		let order = new Order({
			id: orderID,
			user: ctx.session.passport.user,
			time,
			total: price * count,
			imgs: foundCart.detail[0].imgs,
			name: foundCart.detail[0].name,
			status: 0
		})
		let result = await order.save();
		if (result) {
			await foundCart.remove()
			ctx.body = {
				code: 0,
				id: orderID
			}
		} else {
			ctx.body = {
				code: -1
			}
		}
	}
})

router.post('/getOrders', async (ctx) => {
	if(!ctx.isAuthenticated()) {
		ctx.body = {
			code: -1,
			list: [],
			msg: '请登录'
		}
	} else {
		let result = await Order.find()
		if (result) {
			ctx.body = {
				code: 0,
				list: result
			}
		} else {
			ctx.body = {
				code: -1,
				list: []
			}
		}
	}
})

export default router;





