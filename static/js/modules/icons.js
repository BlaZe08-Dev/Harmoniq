const Icons = {

    play: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5 L19 12 L8 19 Z" fill="currentColor"/>
        </svg>
    `,

    pause: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="5" width="3" height="14" rx="1.5" fill="currentColor"/>
            <rect x="14" y="5" width="3" height="14" rx="1.5" fill="currentColor"/>
        </svg>
    `,

    previous: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6L10 12L18 18V6Z" fill="currentColor"/>
            <path d="M10 6L2 12L10 18V6Z" fill="currentColor"/>
        </svg>
    `,

    next: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6L14 12L6 18V6Z" fill="currentColor"/>
            <path d="M14 6L22 12L14 18V6Z" fill="currentColor"/>
        </svg>
    `,

    equalizer: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <line x1="6" y1="5" x2="6" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="6" cy="9" r="2" fill="currentColor"/>

            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="15" r="2" fill="currentColor"/>

            <line x1="18" y1="5" x2="18" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="18" cy="11" r="2" fill="currentColor"/>
        </svg>
    `,

    timer: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="13" r="7"
                stroke="currentColor"
                stroke-width="2"
                fill="none"/>

            <path d="M12 13L12 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>

            <path d="M12 13L15 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>

            <path d="M9 3H15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
        </svg>
    `,

    shuffle: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 4H20V8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"/>

            <path d="M4 18L20 4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>

            <path d="M16 20H20V16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"/>

            <path d="M4 6L10 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>

            <path d="M14 12L20 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
        </svg>
    `,

    repeat: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 2L21 6L17 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"/>

            <path d="M3 11V8A2 2 0 0 1 5 6H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                fill="none"/>

            <path d="M7 22L3 18L7 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"/>

            <path d="M21 13V16A2 2 0 0 1 19 18H3"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                fill="none"/>
        </svg>
    `,

    heart: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 21s-7-4.5-9-8.5C1.5 8 4 4 8 4c2 0 3.2 1 4 2 0.8-1 2-2 4-2 4 0 6.5 4 5 8.5C19 16.5 12 21 12 21z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"/>
        </svg>
    `,

    more: `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="5" r="1.8" fill="currentColor"/>
            <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
            <circle cx="12" cy="19" r="1.8" fill="currentColor"/>
        </svg>
    `,

};

window.Icons = Icons;