<template>
	<div :id="id"
			 :style="{width: width + 'px', height: height + 'px', margin: '34px auto'}"
			 class="m-map">
	</div>
</template>

<script>
export default {
	props: {
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 300
		},
		point: {
			type: Array,
			default() {
				return [116.39,39.9]
			}
		}
	},
	data() {
		return {
			id: 'map',
			key: ''
		}
	},
	mounted() {
		let _self = this;
		this.id = `map${Math.random().toString().slice(2, 4)}`;

		window.onmapload  = function(){
      var map = new AMap.Map(_self.id, {
      	zoom: 10,
      	center: _self.point,
      	resizeEnable: true
      });

      AMap.plugin([
		    'AMap.ToolBar'
			], function(){
			    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
			    map.addControl(new AMap.ToolBar());

			    // 创建一个 Marker 实例：
					var marker = new AMap.Marker({
					    position: _self.point
					});

					// 将创建的点标记添加到已有的地图实例：
					map.add(marker);
			});
  	}

  	var url = `https://webapi.amap.com/maps?v=1.4.14&key=${_self.id}&callback=onmapload`;
	  var jsapi = document.createElement('script');
	  jsapi.charset = 'utf-8';
	  jsapi.src = url;
	  document.head.appendChild(jsapi);
	}
}
</script>






