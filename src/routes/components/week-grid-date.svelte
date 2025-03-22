<script lang="ts">
	export let date: Date;

	const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
	const day = formatter.format(new Date(date)).toUpperCase();
</script>

<span class="custom-week-grid-date">
	{day}
</span>
