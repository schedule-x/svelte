import type { SvelteComponent } from 'svelte';
import type { CustomComponentName } from '@schedule-x/shared';

type ComponentType<Props extends Record<string, unknown> = Record<string, unknown>> = new (
	...args: unknown[]
) => SvelteComponent<Props>;

export type CustomComponents = {
	[key in CustomComponentName]?: ComponentType;
};

export type CustomComponentMeta = {
	Component: ComponentType;
	wrapperElement: HTMLElement;
	props: Record<string, unknown>;
};

export type CustomComponentsMeta = CustomComponentMeta[];
