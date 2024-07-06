import type { SvelteComponent } from 'svelte';

export type CustomComponents = {
  timeGridEvent?: SvelteComponent
  dateGridEvent?: SvelteComponent
  monthGridEvent?: SvelteComponent
  monthAgendaEvent?: SvelteComponent
  eventModal?: SvelteComponent
  headerContentLeftPrepend?: SvelteComponent
  headerContentLeftAppend?: SvelteComponent
  headerContentRightPrepend?: SvelteComponent
  headerContentRightAppend?: SvelteComponent
}
export type CustomComponentMeta = {
  Component: SvelteComponent
  wrapperElement: HTMLElement
  props: Record<string, unknown>
}
export type CustomComponentsMeta = CustomComponentMeta[]
