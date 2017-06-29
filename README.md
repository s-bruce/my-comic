# My Comic

With My Comic, users can create custom online comic books and save them to their collection.

What makes the comic books custom?
* User chooses if they want each page to have one or two panels
* User uploads their own images or illustrations to use for each panel
* User specifies what the text should be
* User chooses how many pages their comic book will have
* User gives the comic book a title

### Frontend

The component-based **JavaScript** frontend was built with **React**. I used **Semantic UI CSS** along with **Semantic UI React** to style the frontend.

### Backend

The backend API was built with **Ruby on Rails**, and I used **PostgreSQL** for the database.

### Authentication

The backend uses **BCrypt** to hash and validate passwords, and it uses **JWT** to create and decode tokens. Users must be logged in to use the site, and once logged in they only see the comic books they've created.

### Handling Image Uploads

I'm using **Cloudinary** to store all of the original images that users upload, and I'm using **superagent** to make the POST request to Cloudinary. One neat thing about Cloudinary is that it can manipulate images. For example, the comic panels are certain dimensions, so I can use Cloudinary to scale/crop the images to the right dimensions (while leaving the original images intact).

### Creating a Comic Page (as one flattened image)

Once the user fills out the form to create a panel, **HTML5 Canvas** "draws" that panel with the image and the text. The canvas is then converted into a data URL, and the data URL is saved in the database. (For a page with two panels, the two canvases are drawn onto a single canvas before being saved.) To display a comic page, we simply use this data URL as the `src` in the `img` tag.
