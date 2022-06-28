class Filter {
    constructor() {
        this.wrapper = document.getElementById('filter-section');
    }
    render() {
        this.wrapper.insertAdjacentHTML('beforeend', `
            <input id="input-to-search" class="filter-input filter-box" placeholder="Title" type="text">
            <p class="filter-p">Urgency:</p>
            <select class="form-select filter-box" id="filter-urgency">
                <option selected>Does not matter</option>
                <option>Ordinary</option>
                <option>Priority</option>
                <option>Immediately</option>
            </select>
            <p class="filter-p">Done:</p>
            <select class="form-select filter-box" id="selectComplity">
                <option selected>Does not matter</option>
                <option class="open">Open</option>
                <option class="done">Done</option>
            </select>
        `);
    }
    filterCards() {
        const inputToSearch = document.getElementById("input-to-search");
        const selectUrgency = document.getElementById('filter-urgency');
        const selectedUrgencyValue = selectUrgency.options[selectUrgency.selectedIndex].value;
        [...document.getElementsByClassName('card__wrapper')].forEach(item => {
            // ------------------------------------------- INPUT ------------------------------------------------------
            item.style.display = 'block';
            const itemTitle = item.getElementsByClassName('card__title')[0].textContent.slice(7);
            if (!itemTitle.toLowerCase().split(' ').join('').includes(inputToSearch.value.toLowerCase().split(' ').join(''))) {
                item.style.display = 'none';
                // console.log("delete");
            }
            // ------------------------------------------- URGENCY ------------------------------------------------------
            const urgency = document.getElementById('filter-urgency');
            const urgencyValue = urgency.options[urgency.selectedIndex].value;
            if (item.getAttribute('urgency') !== urgencyValue && urgencyValue !== "Does not matter") {
                item.style.display = 'none';
            }
            // -------------------------------------------- STATUS ------------------------------------------------------
            const doneOrDoesntDoneField = document.getElementById('selectComplity');
            const selectedDone = doneOrDoesntDoneField.options[doneOrDoesntDoneField.selectedIndex].value;
            const status = item.getElementsByClassName('card__status__wrapper--span')[0].textContent;
            if (status !== selectedDone && selectedDone !== "Does not matter") {
                item.style.display = 'none';
                
            }
        })
    }
}
const filter = new Filter();
export { filter, Filter };