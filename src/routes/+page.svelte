<script lang="ts">
	import '@schedule-x/theme-default/dist/index.css';
	import ScheduleXCalendar from '../lib/components/schedule-x-calendar.svelte';
	import TimeGridEvent from './components/time-grid-event.svelte';
	import LeftHeaderPrepend from './components/left-header-prepend.svelte';
	import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar';

	const calendarApp = createCalendar({
		plugins: [],
		views: [viewDay, viewWeek],
		defaultView: viewWeek.name,
		events: [
			{
				id: 1,
				title: 'Event 1',
				start: '2024-07-05 01:00',
				end: '2024-07-05 02:00'
			},
			{
				id: 2,
				title: 'Event 2',
				start: '2024-07-05 02:00',
				end: '2024-07-05 03:00'
			},
			{
				id: 3,
				title: 'Event 3',
				start: '2024-07-05 02:00',
				end: '2024-07-05 03:00'
			},
			{
				id: 4,
				title: 'Event 4',
				start: '2024-07-05',
				end: '2024-07-05'
			}
		]
	});
</script>

<div>
	<ScheduleXCalendar
		{calendarApp}
		timeGridEvent={TimeGridEvent}
		headerContentLeftPrepend={LeftHeaderPrepend}
	/>
</div>
