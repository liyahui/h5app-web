const animations = {
  in: [],
  on: [],
  out: []
}

const directionFactory = (out = false) => {
  return [{
    value: '',
    label: '无'
  }, {
    value: 'Down',
    label: '从上向下'
  }, {
    value: 'Up',
    label: '从下向上'
  }, {
    value: 'Left',
    label: out ? '从右向左' : '从左向右'
  }, {
    value: 'Right',
    label: out ? '从左向右' : '从右向左'
  }]
}

const rotateDirections = [{
  value: '',
  label: '无'
}, {
  value: 'UpLeft',
  label: '围绕左下点向上'
}, {
  value: 'UpRight',
  label: '围绕右下点向上'
}, {
  value: 'DownLeft',
  label: '围绕左下点向下'
}, {
  value: 'DownRight',
  label: '围绕右下点向下'
}]

const flipDirections = [{
  value: 'X',
  label: 'X轴'
}, {
  value: 'Y',
  label: 'Y轴'
}]

// in
animations.in.push({
  value: 'fadeIn$1',
  label: '淡入',
  directions: directionFactory()
})

animations.in.push({
  value: 'fadeIn$1Big',
  label: '飞入',
  directions: directionFactory()
})

animations.in.push({
  value: 'bounceIn$1',
  label: '弹入',
  directions: directionFactory()
})

animations.in.push({
  value: 'zoomIn$1',
  label: '放大出现',
  directions: directionFactory()
})

animations.in.push({
  value: 'rotateIn$1',
  label: '旋转出现',
  directions: rotateDirections
})

animations.in.push({
  value: 'flipIn$1',
  label: '翻转出现',
  directions: flipDirections
})

animations.in.push({
  value: 'lightSpeedIn',
  label: '光速出现'
})

animations.in.push({
  value: 'rollIn',
  label: '翻滚出现'
})

// on
animations.on.push({
  value: 'flash',
  label: '闪烁'
})

animations.on.push({
  value: 'rotate$1',
  label: '旋转',
  directions: [{
    value: 'East',
    label: '顺时针'
  }, {
    value: 'West',
    label: '逆时针'
  }]
})

animations.on.push({
  value: 'flip',
  label: '翻转'
})

animations.on.push({
  value: 'rubberBand',
  label: '抖动'
})

animations.on.push({
  value: 'tada',
  label: '放大抖动'
})

animations.on.push({
  value: 'wobble',
  label: '摇摆'
})

animations.on.push({
  value: 'swing',
  label: '悬摆'
})

animations.on.push({
  value: 'jello',
  label: '倾斜摆动'
})

// out
animations.out.push({
  value: 'fadeOut$1',
  label: '淡出',
  directions: directionFactory(true)
})

animations.out.push({
  value: 'fadeOut$1Big',
  label: '飞出',
  directions: directionFactory(true)
})

animations.out.push({
  value: 'bounceOut$1',
  label: '弹出',
  directions: directionFactory(true)
})

animations.out.push({
  value: 'zoomOut$1',
  label: '缩小消失',
  directions: directionFactory(true)
})

animations.out.push({
  value: 'rotateOut$1',
  label: '旋转消失',
  directions: rotateDirections
})

animations.out.push({
  value: 'flipOut$1',
  label: '翻转消失',
  directions: flipDirections
})

animations.out.push({
  value: 'lightSpeedOut',
  label: '光速消失'
})

animations.out.push({
  value: 'rollOut',
  label: '翻滚消失'
})

export default animations