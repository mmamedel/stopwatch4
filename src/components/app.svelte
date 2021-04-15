<script lang="ts">
	import { time, isPaused } from '../models'
	import { timeToTimecode } from '../helpers/time'

	$: timeLabel = timeToTimecode($time)
	let interval: NodeJS.Timeout

	isPaused.subscribe(i => {
		if (!i) {
			interval = setInterval(() => time.update(t => t+1), 10)
			return
		}
		interval && clearInterval(interval)
	})

	function reset() {
		time.set(0)
	}
	function togglePaused() {
		isPaused.update(i => !i)
	}
	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === 'Space') togglePaused()
		if (e.code === 'Backspace' && isPaused) reset()
	}
</script>

<svelte:window on:keydown={handleKeyDown}/>

<main>
		<div class="timecode">{timeLabel}</div>
		<button on:click={reset} disabled={!$isPaused}>
			Reset
		</button>
		<button class="play" on:click={togglePaused}>
			{$isPaused ? 'Start' : 'Pause'}
		</button>
</main>

<style lang="scss">
	main {
		font-family: Arial, Helvetica, sans-serif;
  	text-align: center;
	}

	.timecode {
		font-size: 16vw;
  	font-weight: bold;
	}

	$button-size: 20vw;

	button {
		width: $button-size;
		height: $button-size;
		border-radius: $button-size / 2;
		font-size: $button-size / 5;
	}

	.play {
	  background: green;	
	}
</style>