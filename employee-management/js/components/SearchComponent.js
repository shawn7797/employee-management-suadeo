export default class SearchComponent {
  constructor(inputId, onSearch) {
    this.input = document.getElementById(inputId);
    this.input.addEventListener("input", (e) => {
      onSearch(e.target.value);
    });
  }
}
