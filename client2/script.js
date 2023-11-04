const spinButton = document.getElementById("spin-button");
const numSlots = 99;
const slotsContainers = document.querySelectorAll(".slots-container");

function generateAndAppendSlotItems(
  slotsContainer,
  numSlots,
  num48,
  num49,
  num50,
  numOfSlotsContainer
) {
  console.log("Number of slots container is: ", numOfSlotsContainer + 1);
  console.log("num48:", num48);
  console.log("num49:", num49);
  console.log("num50:", num50);
  slotsContainer.innerHTML = "";
  
  const slotItems = []; // Create a separate slotItems array for each container

  for (let i = 0; i < numSlots; i++) {
    const slotItem = document.createElement("div");
    slotItem.classList.add("slot-item");
    if (i === 48) {
      slotItem.textContent = num48;
    } else if (i === 49) {
      slotItem.textContent = num49;
    } else if (i === 50) {
      slotItem.textContent = num50;
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
            if (i === 96) num1 = slotItem.textContent;
            if (i === 97) num2 = slotItem.textContent;
            if (i === 98) num3 = slotItem.textContent;
            setTimeout(() => {
              slotItem.style.transform = `translateY(-${48 * 70}px)`;
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
  
