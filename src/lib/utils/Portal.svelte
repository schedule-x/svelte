<script context="module" lang="ts">
	import { tick } from 'svelte';

	/**
	 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
	 *
	 * @param el - The element to move
	 * @param target - DOM element or CSS selector
	 */
	export function portal(el: HTMLElement, target: HTMLElement | string = 'body') {
		let targetEl: HTMLElement;

		async function update(newTarget: string | HTMLElement) {
			target = newTarget;

			if (typeof target === 'string') {
				targetEl = document.querySelector(target)!;

				if (targetEl === null) {
					await tick();
					targetEl = document.querySelector(target)!;
				}

				if (targetEl === null) {
					throw new Error(`No element found matching CSS selector: "${target}"`);
				}
			} else if (target instanceof HTMLElement) {
				targetEl = target;
			} else {
				throw new TypeError(
					`Unknown portal target type: ${
						target === null ? 'null' : typeof target
					}. Allowed types: string (CSS selector) or HTMLElement.`
				);
			}

			targetEl.appendChild(el);
			el.hidden = false;
		}

		function destroy() {
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}

		update(target);

		return {
			update,
			destroy
		};
	}
</script>

<script lang="ts">
	// Accepts a DOM element or CSS selector
	export let target: HTMLElement | string = 'body';
</script>

<div style="height: 100%; width: 100%" use:portal={target} hidden>
	<slot />
</div>
