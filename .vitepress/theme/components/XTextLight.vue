<template>
    <span class="text-highlight">
        <slot></slot>
    </span>
</template>


<style>
:root {
    --text-highlight-color: #f9edc7;
}

/* drak mode */
html.dark {
    --text-highlight-color: #fb8c00;
}

.text-highlight {
    background-color: var(--text-highlight-color);
    color: var(--vp-c-text-1);
    font-weight: bolder;
}
</style>
