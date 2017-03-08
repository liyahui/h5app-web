import animationModel from '../animation/model'

export default {
  id: 0,
  name: '',
  style: {
    width: 0,
    height: 0,
    left: 0,
    top: 50,
    opacity: 1,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    borderStyle: '',
    transform: {
      rotate: 0
    }
  },

  animations: [],

  event: {
    name: '',
    target: '',
    value: ''
  },

  state: {
    visible: true,
    resize: true,
    lock: false,
    border: false,
    play: false
  }
}
