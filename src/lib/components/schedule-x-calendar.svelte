<script lang="ts">
	import { onMount } from 'svelte';
	import { randomStringId } from '$lib/utils/random-string-id.js';
	import { createCustomComponentFn } from '$lib/utils/create-custom-component-fn.js';
	import Portal from '$lib/utils/Portal.svelte';

	import type { CustomComponentMeta, CustomComponents } from '$lib/types/custom-components.js';
	import type { CalendarApp } from '@schedule-x/calendar';

	export let calendarApp: CalendarApp;

	export let timeGridEvent: CustomComponents['timeGridEvent'] | undefined = undefined;
	export let dateGridEvent: CustomComponents['dateGridEvent'] | undefined = undefined;
	export let monthGridEvent: CustomComponents['monthGridEvent'] | undefined = undefined;
	export let monthAgendaEvent: CustomComponents['monthAgendaEvent'] | undefined = undefined;
	export let eventModal: CustomComponents['eventModal'] | undefined = undefined;
	export let headerContentLeftPrepend: CustomComponents['headerContentLeftPrepend'] | undefined =
		undefined;
	export let headerContentLeftAppend: CustomComponents['headerContentLeftAppend'] | undefined =
		undefined;
	export let headerContentRightPrepend: CustomComponents['headerContentRightPrepend'] | undefined =
		undefined;
	export let headerContentRightAppend: CustomComponents['headerContentRightAppend'] | undefined =
		undefined;
	export let headerContent: CustomComponents['headerContent'] | undefined = undefined;

	let customComponentsMeta: CustomComponentMeta[] = [];

	$: wrapperId = randomStringId();
	$: customComponentsMeta = [];

	const setComponent = (component: CustomComponentMeta) => {
		const newComponents = [...customComponentsMeta];
		const ccid = component.wrapperElement.dataset.ccid;
		const existingComponent = newComponents.find((c) => c.wrapperElement.dataset.ccid === ccid);

		if (existingComponent) {
			newComponents.splice(newComponents.indexOf(existingComponent), 1);
		}

		customComponentsMeta = [...newComponents, component];
	};

	const setCustomComponentFns = () => {
		const customComponentsAvailable: {
			name: keyof CustomComponents;
			component: CustomComponents[keyof CustomComponents];
		}[] = [
			{ name: 'timeGridEvent', component: timeGridEvent },
			{ name: 'dateGridEvent', component: dateGridEvent },
			{ name: 'monthGridEvent', component: monthGridEvent },
			{ name: 'monthAgendaEvent', component: monthAgendaEvent },
			{ name: 'eventModal', component: eventModal },
			{ name: 'headerContentLeftPrepend', component: headerContentLeftPrepend },
			{ name: 'headerContentLeftAppend', component: headerContentLeftAppend },
			{ name: 'headerContentRightPrepend', component: headerContentRightPrepend },
			{ name: 'headerContentRightAppend', component: headerContentRightAppend },
			{ name: 'headerContent', component: headerContent }
		];

		customComponentsAvailable.forEach(({ name, component }) => {
			if (component) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				calendarApp._setCustomComponentFn(name, createCustomComponentFn(setComponent, component));
			}
		});
	};

	onMount(() => {
		setCustomComponentFns();

		const wrapper = document.getElementById(wrapperId);
		if (!(wrapper instanceof HTMLElement)) {
			console.warn('Could not find wrapper element to mount calendar on');
			return;
		}

		calendarApp.render(wrapper);
	});
</script>

<div>
	<div class="sx-svelte-calendar-wrapper" id={wrapperId}></div>

	{#each customComponentsMeta as customComponent}
		{#if customComponent.Component}
			<Portal target={customComponent.wrapperElement}>
				<svelte:component this={customComponent.Component} {...customComponent.props} />
			</Portal>
		{/if}
	{/each}
</div>
