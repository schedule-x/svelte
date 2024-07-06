import type { CustomComponentMeta } from '$lib/types/custom-components.js';
import type { SvelteComponent } from 'svelte';

export const createCustomComponentFn =
	(
		setCustomComponent: (component: CustomComponentMeta) => void,
		customComponent: SvelteComponent
	) =>
		(wrapperElement: HTMLElement, props: Record<string, unknown>) => {
			setCustomComponent({
				Component: customComponent,
				wrapperElement,
				props
			})
		}
