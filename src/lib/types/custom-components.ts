import type { SvelteComponent } from 'svelte';
import type { CalendarEvent } from '@schedule-x/calendar';

type TimeGridEvent = typeof SvelteComponent<{ calendarEvent: CalendarEvent }>;
type DateGridEvent = typeof SvelteComponent<{ calendarEvent: CalendarEvent }>;
type MonthGridEvent = typeof SvelteComponent<{
	calendarEvent: CalendarEvent;
	hasStartDate: boolean;
}>;
type MonthAgendaEvent = typeof SvelteComponent<{ calendarEvent: CalendarEvent }>;
type EventModal = typeof SvelteComponent<{ calendarEvent: CalendarEvent }>;

export type CustomComponents = {
	timeGridEvent?: TimeGridEvent;
	dateGridEvent?: DateGridEvent;
	monthGridEvent?: MonthGridEvent;
	monthAgendaEvent?: MonthAgendaEvent;
	eventModal?: EventModal;
	headerContentLeftPrepend?: typeof SvelteComponent<never>;
	headerContentLeftAppend?: typeof SvelteComponent<never>;
	headerContentRightPrepend?: typeof SvelteComponent<never>;
	headerContentRightAppend?: typeof SvelteComponent<never>;
};
export type CustomComponentMeta = {
	Component: SvelteComponent;
	wrapperElement: HTMLElement;
	props: Record<string, unknown>;
};
export type CustomComponentsMeta = CustomComponentMeta[];
