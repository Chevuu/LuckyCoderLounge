const spinButton = document.getElementById("spin-button");
const numSlots = 75;
const slotsContainers = document.querySelectorAll(".slots-container");

function generateAndAppendSlotItems(
  slotsContainer,
  numSlots,
  num36,
  num37,
  num38,
  numOfSlotsContainer
) {
  slotsContainer.innerHTML = "";
  
  const slotItems = []; // Create a separate slotItems array for each container

  for (let i = 0; i < numSlots; i++) {
    const slotItem = document.createElement("div");
    slotItem.classList.add("slot-item");
    if (i === 36) {
      slotItem.textContent = num36;
    } else if (i === 37) {
      slotItem.textContent = num37;
    } else if (i === 38) {
      slotItem.textContent = num38;
    } else {
      slotItem.textContent = Math.floor(Math.random() * 8) + 1;
    }
    slotItems.push(slotItem);
    slotsContainer.appendChild(slotItem);
  }
}

function initializeSlotsContainer() {
  slotsContainers.forEach((slotsContainer, i) => {
    generateAndAppendSlotItems(
      slotsContainer,
      numSlots,
      Math.floor(Math.random() * 8) + 1,
      Math.floor(Math.random() * 8) + 1,
      Math.floor(Math.random() * 8) + 1,
      i
    );
  });
}

initializeSlotsContainer();

let spinning = false;

spinButton.addEventListener("click", () => {
    if (!spinning) {
      spinning = true;
      slotsContainers.forEach((slotsContainer, slotsContCounter) => {
        let num1, num2, num3;
        const slotItems = Array.from(slotsContainer.querySelectorAll('.slot-item')); // Get slot items for the current container
        
        // Generate a random delay between 0 and 0.2 seconds
        const randomDelay = Math.random() * 200;
        
        setTimeout(() => {
          slotItems.forEach((slotItem, i) => {
            if (i === 72) num1 = slotItem.textContent;
            if (i === 73) num2 = slotItem.textContent;
            if (i === 74) num3 = slotItem.textContent;
            setTimeout(() => {
              slotItem.style.transform = `translateY(-${36 * 70}px)`;
            });
          });
  
          setTimeout(() => {
            generateAndAppendSlotItems(slotsContainer, numSlots, num1, num2, num3, slotsContCounter);
          }, 3000);
        }, randomDelay);
      });
    }
    spinning = false;
  });
  
