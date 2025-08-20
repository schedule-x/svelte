<script lang="ts">
	import '@schedule-x/theme-default/dist/index.css';
	import ScheduleXCalendar from '../lib/components/schedule-x-calendar.svelte';
	import TimeGridEvent from './components/time-grid-event.svelte';
	import HeaderContent from './components/header-content.svelte';
	import WeekGridDate from './components/week-grid-date.svelte';
	import 'temporal-polyfill/global';
	import { Temporal } from 'temporal-polyfill';

	import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar';

	const calendarApp = createCalendar({
		plugins: [],
		views: [viewDay, viewWeek],
		defaultView: viewWeek.name,
		selectedDate: Temporal.PlainDate.from('2024-07-05'),
		events: [
			{
				id: 1,
				title: 'Event 1',
				start: Temporal.ZonedDateTime.from('2024-07-05T01:00:00+09:00[Asia/Tokyo]'),
				end: Temporal.ZonedDateTime.from('2024-07-05T02:00:00+09:00[Asia/Tokyo]')
			},
			{
				id: 2,
				title: 'Event 2',
				start: Temporal.ZonedDateTime.from('2024-07-05T02:00:00+09:00[Asia/Tokyo]'),
				end: Temporal.ZonedDateTime.from('2024-07-05T03:00:00+09:00[Asia/Tokyo]')
			},
			{
				id: 3,
				title: 'Event 3',
				start: Temporal.ZonedDateTime.from('2024-07-05T02:00:00+09:00[Asia/Tokyo]'),
				end: Temporal.ZonedDateTime.from('2024-07-05T03:00:00+09:00[Asia/Tokyo]')
			},
			{
				id: 4,
				title: 'Event 4',
				start: Temporal.PlainDate.from('2024-07-05'),
				end: Temporal.PlainDate.from('2024-07-05')
			}
		]
	});
</script>

<div>
	<ScheduleXCalendar
		{calendarApp}
		timeGridEvent={TimeGridEvent}
		headerContent={HeaderContent}
		weekGridDate={WeekGridDate}
	/>
</div>
