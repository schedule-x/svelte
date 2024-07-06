<script lang="ts">
	import type { CalendarEvent } from '@schedule-x/calendar';

	export let calendarEvent: CalendarEvent;
</script>

<div class="custom-time-grid-event">
	<p style="margin: 0;">{calendarEvent.title}</p>
</div>

<style>
	.custom-time-grid-event {
		height: 100%;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 5px;
	}
</style>
