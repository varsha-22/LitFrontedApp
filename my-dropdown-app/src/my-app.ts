import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './dropdown-component';

@customElement('my-app')
export class App extends LitElement {

  @state() dropdownOptions = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
  @state() dropdownPosition: 'left' | 'right' = 'left';
  @state() open = false;

  toggleDropdownPosition() {
    this.dropdownPosition = this.dropdownPosition === 'left' ? 'right' : 'left';
    console.log('dropdownPosition', this.dropdownPosition)
  }

  render() {
    return html`
      <style>
        /* Add styles for the toggle button and container */
        :host {
          display: block;
          padding: 20px;
        }

        .toggle-button {
          background-color:#454545;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
          margin: 10px;
        }

        .dropdown-container {
          display: flex;
          flex-direction: column;
          gap: 20px; /* Add space between the components */
        }
      </style>

      <h1>Lit Demo DropDown </h1>
      <button class="toggle-button" @click=${this.toggleDropdownPosition}>Toggle Position</button>

      <div class="dropdown-container">
        <dropdown-component .position=${this.dropdownPosition} .options=${this.dropdownOptions} .isOpen=${this.open}></dropdown-component>
      </div>
    `;
  }
}
