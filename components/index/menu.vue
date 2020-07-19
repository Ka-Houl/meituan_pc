<template>
	<div class="m-menu">
		<dl 
			class="nav"
			@mouseleave="handleLeave">
			<dt>全部分类</dt>
			<dd v-for="(item, idx) in $store.state.home.menu" 
					:key="idx"
					@mouseenter="handleEnter">
				<i :class="item.type"></i>
				{{ item.name }}
				<span class="arrow"></span>
			</dd>
		</dl>
		<div 
			class="detail" 
			v-if="kind"
			@mouseenter="handleDetailEnter"
			@mouseleave="handleDetailLeave">
			<template v-for="(item, idx) in curDetail.child">
				<h4 :key="idx">{{ item.title }}</h4>
				<span v-for="childItem in item.child">
					{{ childItem }}
				</span>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			kind: ''
		}
	},
	computed: {
		curDetail: function() {
			return (this.$store.state.home.menu.filter((item) => {
				return item.type === this.kind
			}))[0];
		}
	},
	methods: {
		handleEnter: function(e) {
			this.kind = e.target.getElementsByTagName('i')[0].className;
		},
		handleLeave: function() {
			var _self = this;
			_self._timer = setTimeout(function() {
				_self.kind = '';
			}, 200);
		},
		handleDetailEnter: function() {
			clearTimeout(this._timer);
		},
		handleDetailLeave: function() {
			this.kind = '';
		}
	}
}
</script>