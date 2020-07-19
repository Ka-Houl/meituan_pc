<template>
	<div class="m-nav">
		<ul class="nav">
			<li class="list-item">
				<nuxt-link to="/my">我的美团</nuxt-link>
				<dl>
					<dd><nuxt-link to="order">我的订单</nuxt-link></dd>
					<dd><nuxt-link to="order">我的收藏</nuxt-link></dd>
					<dd><nuxt-link to="order">抵用券</nuxt-link></dd>
					<dd><nuxt-link to="order">账户设置</nuxt-link></dd>
				</dl>
			</li>
			<li>
				<nuxt-link to="/mobile">手机APP</nuxt-link>
			</li>
			<li class="list-item bd">
				<nuxt-link to="/center">商家中心</nuxt-link>
				<dl>
					<dd><nuxt-link to="/order">登录商家中心</nuxt-link></dd>
					<dd><nuxt-link to="/order">美团智能收银</nuxt-link></dd>
					<dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
					<dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
				</dl>
			</li>
			<li class="list-item site">
				<nuxt-link to="/site">网站导航</nuxt-link>
				<div class="sub-menu">
					<dl class="hotel">
						<dt>酒店旅游</dt>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
						<dd>国际机票</dd>
					</dl>
					<dl class="food">
						<dt>吃美食</dt>
						<dd>烤鱼</dd>
						<dd>烤鱼</dd>
						<dd>烤鱼</dd>
						<dd>烤鱼</dd>
						<dd>烤鱼</dd>
						<dd>烤鱼</dd>
						<dd>烤鱼</dd>
					</dl>
					<dl class="movie">
						<dt>看电影</dt>
						<dd>热映电影</dd>
						<dd>热映电影</dd>
						<dd>热映电影</dd>
						<dd>热映电影</dd>
						<dd>热映电影</dd>
						<dd>热映电影</dd>
					</dl>
					<dl class="app">
						<dt>手机应用</dt>
						<dd>
							<a href="#">
								<img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" title="美团app" alt="美团app">
							</a>
						</dd>
						<dd>
							<a href="#">
								<img class="appicon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png" title="外卖app" alt="外卖app">
							</a>
						</dd>
						<dd>
							<a href="#">
								<img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png" title="榛果app" alt="榛果app">
							</a>
						</dd>
						<dd>
							<a href="#">
								<img class="appicon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png" title="点评app" alt="点评app">
							</a>
						</dd>
						<dd>
							<a href="#">
								<img class="appicon" src="//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png" title="猫眼app" alt="猫眼app">
							</a>
						</dd>
					</dl>
				</div>
			</li>
		</ul>
	</div>
</template>