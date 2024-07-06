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
	headerContentLeftPrepend?: typeof SvelteComponent<{ [x: string]: never }>;
	headerContentLeftAppend?: typeof SvelteComponent<{ [x: string]: never }>;
	headerContentRightPrepend?: typeof SvelteComponent<{ [x: string]: never }>;
	headerContentRightAppend?: typeof SvelteComponent<{ [x: string]: never }>;
};
export type CustomComponentMeta = {
	Component: SvelteComponent;
	wrapperElement: HTMLElement;
	props: Record<string, unknown>;
};
export type CustomComponentsMeta = CustomComponentMeta[];
