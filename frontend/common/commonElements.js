class SearchBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ``;
        this.id = "searchBar";
    }
}

class SettingsButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ``;
        this.id = "settingsButton";
    }
}

class SearchResultCategories extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ``;
        this.id = "searchResultCategories";
    }
}

customElements.define("search-bar", SearchBar);
customElements.define("settings-button", SettingsButton);
customElements.define("search-result-categories", SearchResultCategories);
