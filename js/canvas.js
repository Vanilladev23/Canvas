const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const colors = ['#764ba2', '#6f86d6', '#50a7c2', '#a1c4fd', '#da4453', '#ff0080']

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

const mouse = {
  x: window.innerwidth / 2,
  y: window.innerheight / 2,
}

function Particle(x, y, radius, color, velocity) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = velocity
  this.ttl = 200
  // time to leave

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  this.update = () => {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.ttl--
  }
}
// const particle = new Particle(100, 100, 10, '#ff0000')
let particles
const particlesCount = 20
function init() {
  particles = []
  for (let i = 0; i < particlesCount; i++) {
    const radians = (Math.PI * 2) / particlesCount
    const x = canvas.width / 2
    const y = canvas.height / 2
    const velocity = {
      x: Math.cos(radians * i),
      y: Math.sin(radians * i),
    }
    particles.push(new Particle(x, y, 5, randomColor(colors), velocity))
  }
}

function generateCircles() {
  setTimeout(generateCircles, 200)
  for (let i = 0; i < particlesCount; i++) {
    const radians = (Math.PI * 2) / particlesCount
    const x = mouse.x
    const y = mouse.y
    const velocity = {
      x: Math.cos(radians * i),
      y: Math.sin(radians * i),
    }
    particles.push(new Particle(x, y, 5, randomColor(colors), velocity))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  particles.forEach((item, index) => {
    if (item.ttl === 0) {
      particles.splice(index, 1)
    }
    item.update()
  })
  // particle.update()
}
init()
animate()
generateCircles()
// particle.draw()
window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX
  mouse.y = event.clientY
})
