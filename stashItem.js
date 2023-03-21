export class StashItem {
  constructor(stash, order, diff, currentTime, start) {
    this.order = order;
    this.diff = diff;
    this.currentTime = currentTime;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("stopwatch-stash__item");

    const orderDiv = document.createElement("div");
    orderDiv.classList.add("stopwatch-stash__order");

    const diffDiv = document.createElement("div");
    diffDiv.classList.add("stopwatch-stash__diff");

    const currentTimeDiv = document.createElement("div");
    currentTimeDiv.classList.add("stopwatch-stash__current-time");

    orderDiv.textContent = this.order;
    diffDiv.textContent = this.diff;
    currentTimeDiv.textContent = this.currentTime;

    itemDiv.append(orderDiv);
    itemDiv.append(diffDiv);
    itemDiv.append(currentTimeDiv);

    if (!start) {
      stash.append(itemDiv);
    } else {
      const theFirstChild = stash.firstChild;

      stash.insertBefore(itemDiv, theFirstChild);
    }
  }
}
