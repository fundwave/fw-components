import { css } from "lit";

export const SuggestionMenuStyles = css`
  ul {
    position: relative;
    border: 1px solid var(--fe-suggestion-color, white);
    color: var(--fe-suggestion-color, #bab6c0);
    background-color: var(--fe-suggestion-background-color, white);
    box-sizing: border-box;
    width: var(--fe-suggestion-width, 20vw);
    max-height: 25vh;
    overflow-x: auto;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.13);
    border-radius: 5px;
    z-index: 99999;
  }

  li {
    margin: 0;
    padding: 0.5em 1rem;
    cursor: pointer;
    font-family: var(--theme-font);
    font-size: var(--secondary-font-size, 16px);
    color: var(--secondary-color, #bab6c0);
  }

  li:hover,
  li:focus-visible,
  li.selected {
    color: var(--fe-suggestion-focus-color, #69676c);
    background: rgba(var(--fe-suggestion-focus-background, 86, 86, 86), 0.1);
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;
