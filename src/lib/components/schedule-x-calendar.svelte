<div>
	<div class="sx-svelte-calendar-wrapper" id="{wrapperId}" />

	{#each customComponentsMeta as customComponent}
		{#if customComponent.Component}
			<Portal target="{customComponent.wrapperElement}">
				<svelte:component this={customComponent.Component} {...customComponent.props} />
			</Portal>
		{/if}
	{/each}
</div>

<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { randomStringId } from '$lib/utils/random-string-id.js';
	import { createCustomComponentFn } from '$lib/utils/create-custom-component-fn.js';
	import Portal from '$lib/utils/Portal.svelte';

	import type { CustomComponentMeta } from '$lib/types/custom-components.js';
	import type { CalendarApp } from '@schedule-x/calendar';

	export let calendarApp: CalendarApp

	export let timeGridEvent: SvelteComponent | undefined  = undefined
	export let dateGridEvent: SvelteComponent | undefined  = undefined
	export let monthGridEvent: SvelteComponent | undefined  = undefined
	export let monthAgendaEvent: SvelteComponent | undefined  = undefined
	export let eventModal: SvelteComponent | undefined  = undefined
	export let headerContentLeftPrepend: SvelteComponent | undefined  = undefined
	export let headerContentLeftAppend: SvelteComponent | undefined  = undefined
	export let headerContentRightPrepend: SvelteComponent | undefined  = undefined
	export let headerContentRightAppend: SvelteComponent | undefined  = undefined

	let customComponentsMeta: CustomComponentMeta[] = []

	$: wrapperId = randomStringId()
	$: customComponentsMeta = []

	const setComponent = (component: CustomComponentMeta) => {
		const newComponents = [...customComponentsMeta]
		const ccid = component.wrapperElement.dataset.ccid
		const existingComponent = newComponents.find(
			(c) => c.wrapperElement.dataset.ccid === ccid
		)

		if (existingComponent) {
			newComponents.splice(newComponents.indexOf(existingComponent), 1)
		}

		customComponentsMeta = [...newComponents, component]
	}

	const setCustomComponentFns = () => {
		const customComponentsAvailable = [
			{ name: 'timeGridEvent', component: timeGridEvent },
			{ name: 'dateGridEvent', component: dateGridEvent },
			{ name: 'monthGridEvent', component: monthGridEvent },
			{ name: 'monthAgendaEvent', component: monthAgendaEvent },
			{ name: 'eventModal', component: eventModal },
			{ name: 'headerContentLeftPrepend', component: headerContentLeftPrepend },
			{ name: 'headerContentLeftAppend', component: headerContentLeftAppend },
			{ name: 'headerContentRightPrepend', component: headerContentRightPrepend },
			{ name: 'headerContentRightAppend', component: headerContentRightAppend }
		]

		customComponentsAvailable.forEach(({ name, component }) => {
			if (component) {
				calendarApp._setCustomComponentFn(
					name,
					createCustomComponentFn(setComponent, component)
				)
			}
		})
	};

	onMount(() => {
		setCustomComponentFns()

		const wrapper = document.getElementById(wrapperId);
		if (!(wrapper instanceof HTMLElement)) {
			console.warn('Could not find wrapper element to mount calendar on');
			return
		}

		calendarApp.render(wrapper)
	})
</script>
