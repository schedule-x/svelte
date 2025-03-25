<script lang="ts">
	import { onMount } from 'svelte';
	import { randomStringId } from '$lib/utils/random-string-id.js';
	import { createCustomComponentFn } from '$lib/utils/create-custom-component-fn.js';
	import Portal from '$lib/utils/Portal.svelte';

	import type { CustomComponentMeta } from '$lib/types/custom-components.js';
	import type { CalendarApp } from '@schedule-x/calendar';

	export let calendarApp: CalendarApp;

	let customComponentsMeta: CustomComponentMeta[] = [];
	$: wrapperId = randomStringId();

	const setComponent = (component: CustomComponentMeta) => {
		const newComponents = [...customComponentsMeta];
		const ccid = component.wrapperElement.dataset.ccid;
		const existing = newComponents.find((c) => c.wrapperElement.dataset.ccid === ccid);

		if (existing) {
			newComponents.splice(newComponents.indexOf(existing), 1);
		}

		customComponentsMeta = [...newComponents, component];
	};

	const setCustomComponentFns = () => {
		Object.entries($$restProps).forEach(([name, component]) => {
			if (component) {
				calendarApp._setCustomComponentFn(name, createCustomComponentFn(setComponent, component));
			}
		});
	};

	onMount(() => {
		const wrapper = document.getElementById(wrapperId);
		if (!(wrapper instanceof HTMLElement)) {
			console.warn('Could not find wrapper element to mount calendar on');
			return;
		}

		setCustomComponentFns();

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
