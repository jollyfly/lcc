<template>
  <div id="loveHeart">
    <canvas id="garden"></canvas>
    <div id = 'title' class="title">亲爱的，我们在一起<br>{{times}}啦</div>
  </div>
</template>

<script>
import {Garden} from '../../Garden'
let gardenCtx = {}
let gardenCanvas
let garden
export default {
  name: 'tab',
  data () {
    return {
      heartWidth: 0,
      heartHeight: 0,
      times: ''
    }
  },
  methods: {

    setUpGarden: function () {
      gardenCanvas = document.getElementById('garden')
      let loveHeart = document.getElementById('loveHeart')
      let height = (window.innerHeight - 103) * (100 / window.innerWidth)
      loveHeart.setAttribute('style', 'height:' + height + 'vw; width:100vw;background:#ffe')
      gardenCanvas.width = loveHeart.clientWidth
      gardenCanvas.height = loveHeart.clientHeight
      this.heartHeight = gardenCanvas.height
      this.heartWidth = gardenCanvas.width
      console.log(window.innerHeight)
      gardenCtx = gardenCanvas.getContext('2d')
      gardenCtx.globalCompositeOperation = 'lighter'
      garden = new Garden(gardenCtx, gardenCanvas)
      setInterval(() => {
        garden.render()
      }, 1000 / 60)
    },
    startHeartAnimation: function () {
      this.setUpGarden()
      let interval = 50
      let angle = 10
      let heart = []
      let offsetX = this.heartWidth / 2 + 10
      let offsetY = this.heartHeight / 2 - 50
      let coefficient = this.heartWidth * 2 / 75
      let getPoint = function (angle) {
        let t = angle / Math.PI
        let x = coefficient * (16 * Math.pow(Math.sin(t), 3))
        let y = -coefficient * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        return [offsetX + x, offsetY + y]
      }
      let animationTimer = setInterval(function () {
        let bloom = getPoint(angle)
        let draw = true
        for (let i = 0; i < heart.length; i++) {
          let p = heart[i]
          let distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2))
          if (distance < Garden.Options.bloomRadius.max * 1.3) {
            draw = false
            break
          }
        }
        if (draw) {
          heart.push(bloom)
          garden.createRandomBloom(bloom[0], bloom[1])
        }
        if (angle >= 30) {
          clearInterval(animationTimer)
        } else {
          angle += 0.2
        }
      }, interval)
    },
    showTime: function () {
      const now = new Date()
      const start = new Date(2018, 1, 18)
      const times = (now - start) / 1000
      const days = Math.floor(times / (3600 * 24))
      let seconds = times % (3600 * 24)
      const hours = Math.floor(seconds / 3600)
      seconds = seconds % 3600
      let minutes = Math.floor(seconds / 60)
      seconds = Math.floor(seconds % 60)
      const timeStr = days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
      return timeStr
    }
  },
  mounted: function () {
    this.startHeartAnimation()
    setInterval(() => {
      let timeStr = this.showTime()
      this.times = timeStr
    }, 1000)
  }
}
</script>

<style scoped>
  body{
    background: #ffe;
  }
  .title{
    position: fixed;
    z-index: 100;
    top: 260px;
    left: 100px;
    font-size: 16px;
  }
</style>
