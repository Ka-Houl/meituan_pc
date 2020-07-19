import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import User from '../dbs/models/users';
import Passport from './utils/passport';
import EmailConfig from '../dbs/config';
import axios from './utils/axios';

let router = new Router({
	prefix: '/users'
})

let Store = new Redis().client;

router.post('/signup', async (ctx) => {
	const {
		username,
		password,
		email,
		code
	} = ctx.request.body;

	if (code) {
		const savedCode = await Store.hget(`nodemail: ${username}`, 'code');
		const savedExpireTime = await Store.hget(`nodemail: ${username}`, 'expire');

		if (code === savedCode) {
			if (new Date().getTime() - savedExpireTime > 0) {
				ctx.body = {
					code: -1,
					msg: '验证码已过期，请重新尝试'
				}

				return false;
			} 
		} else {
			ctx.body = {
				code: -1,
				msg: '请填写正确的验证码'
			}
		}
	} else {
		ctx.body = {
			code: -1,
			msg: '请填写验证码'
		}
	}

	let user = await User.find({
		username
	})

	if (user.length) {
		ctx.body = {
			code: -1,
			msg: '用户已存在'
		}

		return false;
	}

	let addNewUser = await User.create({
		username,
		password,
		email
	})

	if (addNewUser) {
		let res = await axios.post('/users/signin', {
			username,
			password
		})

		if (res.data && res.data.code === 0) {
			ctx.body = {
				code: 0,
				msg: '注册成功！',
				user: res.data.user
			}
		} else {
			ctx.body = {
				code: -1,
				msg: 'error'
			}
		}
	} else {
		ctx.body = {
			code: -1,
			msg: '注册失败'
		}
	}
})

router.post('/signin', async (ctx, next) => {
	return Passport.authenticate('local', function(err, user, info, status) {
		if (err) {
			ctx.body = {
				code: -1,
				msg: err
			}
		} else {
			if (user) {
				ctx.body = {
					code: 0,
					msg: '登录成功',
					user
				}
				return ctx.login(user);
			} else {
				ctx.body = {
					code: 1,
					msg: info
				}
			}
		}
	})(ctx, next);
})

router.post('/verify', async (ctx, next) => {
	let username = ctx.request.body.username;
	const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire');

	if (saveExpire && newDate.getTime() - saveExpire < 0) {
		ctx.body = {
			code: -1,
			msg: '验证请求过于频繁，1分钟内只能验证1次'
		}
		return false;
	}

	let transporter = nodeMailer.createTransport({
	  host: EmailConfig.smtp.host,
	  port: 587,
	  secure: false, 
	  auth: {
	    user: EmailConfig.smtp.user,
	    pass: EmailConfig.smtp.pass
	  }
	});

	let recvInfo = {
		code: EmailConfig.smtp.code(),
		expire: EmailConfig.smtp.expire(),
		email: ctx.request.body.email,
		user: ctx.request.body.username
	}

	let mailOptions = {
		from: `"认证邮件" <${EmailConfig.smtp.user}>`,
		to: recvInfo.email,
		subject: '《美团网》注册码',
		html: `您在美团网申请的注册码是${recvInfo.code}`
	}

	await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log('error');
		} else {
			Store.hmset(`nodemail:${recvInfo.user}`, 'code', recvInfo.code, 'expire', recvInfo.expire, 'email', recvInfo.email)
		}
	});

	ctx.body = {
		code: 0,
		msg: '验证码已发送，有效时间为1分钟'
	}
})

router.get('/exit', async (ctx, next) => {
	await ctx.logout();

	if (!ctx.isAuthenticated()) {
		ctx.body = {
			code: 0
		}
	} else {
		ctx.body = {
			code: -1
		}
	}
})

router.get('/getUser', async (ctx, next) => {
	if (ctx.isAuthenticated()) {
		const {username, email} = ctx.session.passport.user;

		ctx.body = {
			user: username,
			email
		}
	} else {
		ctx.body = {
			user: '',
			email: ''
		}
	}
})

export default router;











