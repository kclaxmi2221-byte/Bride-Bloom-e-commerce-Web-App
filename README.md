# Bride Bloom – Jewellery E-Commerce Website
 
A single-page website for a jewellery brand, featuring a hero banner, product showcase with a working shopping cart, an about section, and a contact form.
 
**🔗 Live site:** https://kclaxmi2221-byte.github.io/Bride-Bloom-e-commerce-Web-App/
 
## Features
 
- **Hero Section** – Banner with call-to-action ("Shop Now") button and hero image.
- **Products Section** – Grid of featured jewellery items (Gold Ring, Necklace, Earrings, Bridal Set), each with a fixed-size image and an "Add to Cart" button aligned to the bottom of the card.
- **Working Shopping Cart** – Clicking "Add to Cart" adds the item to the Cart section, tracks quantity if added again, updates the running total, and lets you remove individual items. Powered by `script.js`.
- **About Section** – Brand description.
- **Contact Section** – Styled contact form (name, email, message). Not yet wired to a backend — see To Do.
- **Responsive Navigation** – Anchor-linked nav bar (Home, About, Products, Contact, Cart).
- Styled cart, about, and contact sections as boxed cards matching the site's brown/gold/cream color scheme.
## Project Structure
 
```
.
├── index.html      # Main HTML file
├── styles.css       # All styling
├── script.js         # Cart logic (add/remove items, update total)
└── Photo.jpg           # Hero section image
```
 
## Getting Started
 
1. Clone this repository.
2. Open `index.html` directly in your browser — no build step, server, or dependencies required.
## Deployment
 
This site is hosted for free with **GitHub Pages**, deployed from the `main` branch, root folder. Any push to `main` automatically updates the live site within a minute or two.
 
To push changes:
```
git add .
git commit -m "your message here"
git push origin main
```
 
## To Do
 
- [ ] Replace remaining `placehold.co` product images (Necklace, Earrings, Bridal Set) with real product photos.
- [ ] Wire up the contact form to a backend or form service (e.g. Formspree, Netlify Forms) since it currently has no `action` and doesn't send anywhere yet.
- [ ] Persist the cart across page reloads (e.g. with `localStorage`) — currently resets on refresh.
- [ ] Add mobile responsiveness polish (media queries for header, hero, and product grid on small screens).
- [ ] Optional: add product filtering/search, and a real checkout flow with payment integration.
## License
 
© 2026 Bride Bloom. All Rights Reserved.
 
