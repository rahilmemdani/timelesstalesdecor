const app = new Vue({
	el: '#app',
	data: {
		playingIntro: false
	},
	methods: {
		playIntro() {
			// set playingIntro to true
			this.playingIntro = !this.playingIntro
			console.log(this.playingIntro)
		}						
	}
})