const menuItems = [
    {
    category: "Starters",
    name: "Sweet Potato Fries",
    description: "Thick-cut sweet potato wedges fried to a rich golden-orange finish with a delicately crisp exterior. Served with a side of our signature creamy dipping sauce.",
    price: "30",
    image: "menuItems/Crispy Sweet Potato Fries.jpeg",
    tags: ["420 kcal"]
    },

    {
    category: "Starters",
    name: "French Fries",
    description: "Crispy, golden-fried classic french fries seasoned with a light dusting of sea salt and garnished with fresh basil leaves. Served with a side of our special creamy dipping sauce.",
    price: "24",
    image: "menuItems/French Fries.jpeg",
    tags: ["380 kcal"]
    },
    
    {
    category: "Starters",
    name: "Fried Tempura Prawns",
    description: "Jumbo prawns fried in a crisp, golden-brown tempura batter, alongside a portion of classic golden fries. Accompanied by a creamy, zesty dipping sauce. Perfect as a shared appetizer or a satisfying main.",
    price: "60",
    image: "menuItems/Fried Tempura Prawns.jpeg",
    tags: ["680 kcal"]
    },

    {
    category: "Starters",
    name: "Fried Calamari",
    description: "Tender calamari rings seasoned in a golden breading. Accompanied by classic crisp french fries",
    price: "55",
    image: "menuItems/Fried Calamari.png",
    tags: ["590 kcal"]
    },

    {
    category: "Soups",
    name: "Asian Beef Soup",
    description: "A comforting, aromatic clear broth packed with tender chunks of slow-cooked beef, sweet carrots, potatoes, and vine-ripened tomatoes. Garnished with fresh mint, scallions, and a sprinkle of crispy fried shallots for an authentic touch of texture. Served alongside thick slices of warm, lightly toasted baguette.",
    price: "49",
    image: "menuItems/Asian Beef Soup.jpeg",
    tags: ["420 kcal"]
    },

    {
    category: "Soups",
    name: "Tom Yum Soup",
    description: "A classic Thai favorite featuring a fiery, aromatic lemongrass and galangal broth loaded with prawns, tender squid, and half-shell green mussels. Garnished with fresh Thai basil and red chili slices for an extra kick.",
    price: "55",  
    image: "menuItems/Tom Yum Soup.png",
    tags: ["380 kcal"]
    },

    {
    category: "Main",
    name: "Starter Platter",
    description: "A sharing platter featuring a mix of best-selling starters. Crispy shrimp tempura, golden onion rings, and classic fries—perfectly fried for a crunchy, indulgent meal.",
    price: "75",
    image: "menuItems/Starter Platter.jpg",
    tags: ["750 kcal"]
    },
    {
    category: "Main",
    name: "Lemon Garlic Mussels",
    description: "Mussels sautéed in a zesty lemon garlic butter sauce, finished with herbs for a bright, aromatic flavour.",
    price: "65",
    image: "menuItems/Lemon Garlic Mussels.jfif",
    tags: ["350 kcal"]
    },

    {
    category: "Main",
    name: "Honey Glazed Chicken",
    description: "Succulent fried chicken coated in a rich, sticky honey glaze that balances sweetness with a subtle savoury depth. Finished to a glossy shine for a bold, flavour-packed bite.",
    price: "59",
    image: "menuItems/Honey Glazed Chicken.png",
    tags: ["1150 kcal"]
    },

    {
    category: "Main",
    name: "Fried Chicken",
    description: "Crispy, golden-battered chicken fried to perfection, delivering a juicy tender bite on the inside with a satisfying crunch on the outside",
    price: "55",
    image: "menuItems/Fried Chicken.png",
    tags: ["1050 kcal"]
    },




];

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

 // Show popup automatically when page loads
window.onload = function () {
  document.getElementById("popup").style.display = "flex";
};

function slugify(str){
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHTML(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function groupByCategory(items){
  const map = new Map();
  items.forEach(item => {
    if(!map.has(item.category)) map.set(item.category, []);
    map.get(item.category).push(item);
  });
  return map;
}

function render(){
  const grouped = groupByCategory(menuItems);
  const navInner = document.getElementById("catnav-inner");
  const menuEl = document.getElementById("menu");

  navInner.innerHTML = "";
  menuEl.innerHTML = "";

  let first = true;

  grouped.forEach((items, category) => {
    const slug = slugify(category);

    const a = document.createElement("a");
    a.href = "#" + slug;
    a.textContent = category;
    if(first) a.classList.add("active");
    navInner.appendChild(a);

    const section = document.createElement("section");
    section.className = "category";
    section.id = slug;

    const head = document.createElement("h2");
    head.textContent = category;
    section.appendChild(head);

    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "item";

      const media = item.image
        ? `<img src="${item.image}" alt="${item.name}">`
        : `<div class="placeholder">photo</div>`;

      const tags = item.tags?.length
        ? `<div class="tags">${item.tags.map(t => `<span>${t}</span>`).join("")}</div>`
        : "";

      row.innerHTML = `
        ${media}
        <div class="body">
          <div class="name-row">
            <span class="name">${item.name}</span>
            <span class="leader"></span>
            <span class="price">AED${item.price}</span>
          </div>
          <div class="desc">${item.description}</div>
          ${tags}
        </div>
      `;
        row.addEventListener("click", () => {

           document.querySelectorAll(".item").forEach(other => {
            if (other !== row) {
               other.classList.remove("expanded");
        }
             });

    row.classList.toggle("expanded");
    });

      section.appendChild(row);
    });

    menuEl.appendChild(section);
    first = false;
  });
}

render();