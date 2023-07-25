import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dropdown-component')
export class DropdownComponent extends LitElement {
  static styles = css`
    .dropdown-container {
      position: relative;
      display: inline-block;
    }

    .dropdown-button {
      background-color: #e7e2e2;
      color: #000000;
      padding: 10px;
      border: none;
      cursor: pointer;
    }

    .dropdown-content {
      position: absolute;
      background-color: #f9f9f9;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      min-width: 160px; /* Set a minimum width for the dropdown */
      padding: 8px; /* Add some padding for better spacing */
      z-index: 1; /* Ensure the dropdown appears on top of other elements */
      overflow-y: auto;
      max-height: 250px;
  }

/* Style the individual options */
.dropdown-content div {
  color: black;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s; /* Add a smooth transition on hover */
}

  .dropdown-content div:hover {
    background-color: #f1f1f1; /* Highlight the option on hover */
  }


  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
  `;
  @property({ type: String })
  private selectedOption = '';

	@property({ type: String }) position: 'left' | 'right' = 'left';
	@property({ type: Array }) options: string[] = [];
	@property({ type: Boolean }) isOpen: boolean = false;
  render() {
    return html`
      
      <div class="dropdown-container" @click=${this.toggleDropdown} style=${this.getPositionStyle()}>
        <button class="dropdown-button">${this.selectedOption || 'Select an option'}</button>
        ${this.isOpen
          ? html`
              <div class="dropdown-content">
                ${this.options.map(
                  (option) => html`<div @click=${() => this.handleOptionClick(option)}>${option}</div>`
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private getPositionStyle() {
	  if (this.position === 'right') {
		return 'float: right';
	  } else {
		return 'float: left';
	  }
	}
  private toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.requestUpdate(); // Manually trigger an update to re-render the component
  }

  private handleOptionClick(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.requestUpdate(); // Manually trigger an update to re-render the component
  }


  private handleOutsideClick = (event: Event) => {
    if (!(event.target instanceof Node && this.contains(event.target))) {
      this.isOpen = false;
      document.removeEventListener('click', this.handleOutsideClick);
      this.requestUpdate();
    }
  };
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  // To avoid multiple event listeners being added, remove and re-add the listener when properties change.
  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('isOpen')) {
      if (this.isOpen) {
        document.addEventListener('click', this.handleOutsideClick);
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }
  }

}
